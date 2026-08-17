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
  Truck,
  AlertTriangle,
  CheckCircle2,
  CircleDot,
  DollarSign,
  Boxes,
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

// ─── Local Storage Hook ─────────────────────────────────────────────────────

interface SavedGravelEstimate<T> {
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
  const [saved, setSaved] = useState<SavedGravelEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedGravelEstimate<T> = {
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
  saved: SavedGravelEstimate<T>[];
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
    a.download = `gravel_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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

// ─── 2D Scaled Sub-Base Cross-Section Visualizer ────────────────────────────

function GravelCrossSectionVisualizer2D({
  depthInches,
  depthCm,
  gravelName,
}: {
  depthInches: number;
  depthCm: number;
  gravelName: string;
}) {
  const gravelH = Math.min(50, Math.max(15, depthInches * 7));

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
        <rect x="0" y="0" width="240" height="25" fill="#e0f2fe" dark-fill="#1e293b" />
        <text x="120" y="16" textAnchor="middle" className="text-[8px] fill-blue-900 dark:fill-blue-200 font-bold uppercase tracking-wider">
          SURFACE GRADE
        </text>

        {/* Top Gravel Layer */}
        <rect x="15" y={25} width="210" height={gravelH} rx="1" fill="url(#gravelPattern)" stroke="#475569" strokeWidth="1" />
        
        {/* Geotextile Membrane Line */}
        <line x1="15" y1={25 + gravelH} x2="225" y2={25 + gravelH} stroke="#1e3a8a" strokeWidth="2" strokeDasharray="4 2" />

        {/* Compacted Base Course */}
        <rect x="15" y={25 + gravelH} width="210" height="35" fill="url(#basePattern)" stroke="#a8a29e" strokeWidth="0.8" />

        {/* Subgrade Native Soil */}
        <rect x="15" y={60 + gravelH} width="210" height={80 - gravelH} fill="url(#subgradePattern)" />

        {/* Depth Dimension Badge */}
        <rect x="155" y={18 + gravelH / 2} width="70" height="20" rx="3" fill="#0f172a" fillOpacity="0.9" />
        <text x="190" y={31.5 + gravelH / 2} textAnchor="middle" className="text-[8.5px] fill-white font-bold">
          {depthInches}&quot; ({depthCm} cm)
        </text>

        {/* Subgrade Label */}
        <text x="25" y="130" className="text-[7.5px] fill-zinc-300 font-semibold tracking-wider">
          COMPACTED SUBGRADE SOIL
        </text>
      </svg>
    </div>
  );
}

// ─── 2D French Drain Trench Visualizer ──────────────────────────────────────

function FrenchDrainVisualizer2D({
  lengthFt,
  widthIn,
  depthIn,
  pipeDiaIn,
  netTons,
}: {
  lengthFt: number;
  widthIn: number;
  depthIn: number;
  pipeDiaIn: number;
  netTons: number;
}) {
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

        {/* Excavated Trench Box */}
        <rect x="55" y="15" width="130" height="110" fill="url(#trenchGravel)" stroke="#1e3a8a" strokeWidth="2.5" strokeDasharray="3 2" />

        {/* Perforated Pipe */}
        {pipeDiaIn > 0 ? (
          <g transform="translate(120, 85)">
            <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
            <circle cx="0" cy="0" r="14" fill="#0284c7" />
            <circle cx="-7" cy="-7" r="1.5" fill="#ffffff" />
            <circle cx="7" cy="-7" r="1.5" fill="#ffffff" />
            <circle cx="-7" cy="7" r="1.5" fill="#ffffff" />
            <circle cx="7" cy="7" r="1.5" fill="#ffffff" />
            <text x="0" y="3" textAnchor="middle" className="text-[7.5px] fill-white font-bold">
              {pipeDiaIn}&quot; PIPE
            </text>
          </g>
        ) : null}

        {/* Top Grass Cap */}
        <rect x="0" y="0" width="240" height="15" fill="#15803d" />

        {/* Dimension Callouts */}
        <text x="120" y="132" textAnchor="middle" className="text-[8px] fill-white font-bold">
          {widthIn}&quot; W × {depthIn}&quot; D Trench ({netTons} Tons Stone)
        </text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function GravelCalculator() {
  // ─── CARD 1: RECTANGULAR, CIRCULAR & TRIANGULAR ESTIMATOR ───
  const [shape, setShape] = useState<GravelShape>("rectangle");
  const [length, setLength] = useState("30");
  const [lengthUnit, setLengthUnit] = useState<DimensionUnit>("feet");
  const [width, setWidth] = useState("10");
  const [widthUnit, setWidthUnit] = useState<DimensionUnit>("feet");
  const [diameter, setDiameter] = useState("16");
  const [diameterUnit, setDiameterUnit] = useState<DimensionUnit>("feet");
  const [totalAreaSqFt, setTotalAreaSqFt] = useState("");

  const [depth, setDepth] = useState("4");
  const [depthUnit, setDepthUnit] = useState<DepthUnit>("inches");
  const [gravelType, setGravelType] = useState<GravelType>("crushed_stone_57");
  const [customDensity, setCustomDensity] = useState("2840");

  const [compactionPct, setCompactionPct] = useState("8");
  const [wastePct, setWastePct] = useState("5");

  const [pricePerUnit, setPricePerUnit] = useState("45.00");
  const [pricingType, setPricingType] = useState<"per_ton" | "per_yard" | "per_bag">("per_ton");

  const [gravelResult, setGravelResult] = useState<GravelEstimatorResult | null>(null);
  const [gravelSaveSuccess, setGravelSaveSuccess] = useState(false);
  const gravelSaved = useCardSaved<GravelEstimatorResult>("saved_gravel_estimator");

  // ─── CARD 2: GRAVEL COST & DELIVERY BUDGET ───
  const [costTons, setCostTons] = useState("12");
  const [costYards, setCostYards] = useState("8.5");
  const [costPricingBasis, setCostPricingBasis] = useState<"per_ton" | "per_yard">("per_ton");
  const [materialUnitPrice, setMaterialUnitPrice] = useState("45.00");
  const [deliveryFlatFee, setDeliveryFlatFee] = useState("75.00");
  const [laborCostPerTon, setLaborCostPerTon] = useState("20.00");
  const [salesTaxPct, setSalesTaxPct] = useState("7");
  const [costResult, setCostResult] = useState<GravelCostResult | null>(null);
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);
  const costSaved = useCardSaved<GravelCostResult>("saved_gravel_cost");

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
  const [multiResult, setMultiResult] = useState<MultiZoneGravelResult | null>(null);
  const [multiSaveSuccess, setMultiSaveSuccess] = useState(false);
  const multiSaved = useCardSaved<MultiZoneGravelResult>("saved_gravel_multizone");

  // ─── CARD 4: SUB-BASE & FRENCH DRAIN / DRAINAGE TRENCH ───
  const [trenchLength, setTrenchLength] = useState("50");
  const [trenchWidth, setTrenchWidth] = useState("12"); // inches
  const [trenchDepth, setTrenchDepth] = useState("18"); // inches
  const [pipeDiameter, setPipeDiameter] = useState(4); // inches
  const [trenchGravelType, setTrenchGravelType] = useState<GravelType>("crushed_stone_57");
  const [trenchResult, setTrenchResult] = useState<DrainageTrenchResult | null>(null);
  const [trenchSaveSuccess, setTrenchSaveSuccess] = useState(false);
  const trenchSaved = useCardSaved<DrainageTrenchResult>("saved_gravel_trench");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Calculation Handlers ───

  const handleGravelCalc = useCallback(() => {
    const res = calculateGravelEstimator({
      shape,
      length: Number(length) || 30,
      lengthUnit,
      width: Number(width) || 10,
      widthUnit,
      diameter: Number(diameter) || 16,
      diameterUnit,
      totalAreaSqFt: Number(totalAreaSqFt) || 0,
      depth: Number(depth) || 4,
      depthUnit,
      gravelType,
      customDensityLbsPerCuYd: Number(customDensity) || 2840,
      compactionPct: Number(compactionPct) || 8,
      wastePct: Number(wastePct) || 5,
      pricePerUnit: Number(pricePerUnit) || 0,
      pricingType,
    });
    setGravelResult(res);
    setCostTons(String(res.weightShortTons));
    setCostYards(String(res.adjustedVolumeCuYards));
  }, [
    shape,
    length,
    lengthUnit,
    width,
    widthUnit,
    diameter,
    diameterUnit,
    totalAreaSqFt,
    depth,
    depthUnit,
    gravelType,
    customDensity,
    compactionPct,
    wastePct,
    pricePerUnit,
    pricingType,
  ]);

  const handleCostCalc = useCallback(() => {
    const res = calculateGravelCost({
      totalTons: Number(costTons) || 12,
      totalCuYards: Number(costYards) || 8.5,
      pricingBasis: costPricingBasis,
      materialUnitPrice: Number(materialUnitPrice) || 45,
      deliveryFlatFee: Number(deliveryFlatFee) || 75,
      salesTaxPct: Number(salesTaxPct) || 7,
      laborCostPerTon: Number(laborCostPerTon) || 20,
      totalSqFt: gravelResult ? gravelResult.areaSqFt : 300,
    });
    setCostResult(res);
  }, [costTons, costYards, costPricingBasis, materialUnitPrice, deliveryFlatFee, salesTaxPct, laborCostPerTon, gravelResult]);

  const handleMultiCalc = useCallback(() => {
    const res = calculateMultiZoneGravel({
      zones,
      compactionPct: Number(multiCompaction) || 10,
      wastePct: Number(multiWaste) || 5,
      pricePerTon: Number(multiPricePerTon) || 45,
      deliveryFee: Number(multiDeliveryFee) || 75,
    });
    setMultiResult(res);
  }, [zones, multiCompaction, multiWaste, multiPricePerTon, multiDeliveryFee]);

  const handleTrenchCalc = useCallback(() => {
    const res = calculateDrainageTrench({
      trenchLengthFt: Number(trenchLength) || 50,
      trenchWidthInches: Number(trenchWidth) || 12,
      totalDepthInches: Number(trenchDepth) || 18,
      pipeDiameterInches: pipeDiameter,
      gravelBeddingDepthInches: Number(trenchDepth) || 18,
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

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (gravelResult) {
      sections.push({
        title: "Gravel Tonnage & Volume Takeoff",
        items: [
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
          { label: "Pipe Displacement Offset", value: `${trenchResult.pipeDisplacementCuYards} yd³ (${pipeDiameter}\" perforated pipe)` },
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
      {/* ═══════════════════ CARD 1: RECTANGULAR, CIRCULAR & TRIANGULAR ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Rectangular, Circular &amp; Triangular Gravel Estimator"
        hasResult={!!gravelResult}
        isSaved={gravelSaveSuccess}
        savedCount={gravelSaved.saved.length}
        onToggleSaved={() => gravelSaved.setIsOpen(!gravelSaved.isOpen)}
        onSave={() => {
          if (!gravelResult) return;
          gravelSaved.save(
            `${gravelResult.weightShortTons} Tons (${gravelResult.weightMetricTonnes} t), ${gravelResult.adjustedVolumeCuYards} cu yd, Area: ${gravelResult.areaSqFt} sq ft`,
            gravelResult
          );
          flashSave(setGravelSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Shape Selector Sub-Tabs */}
          <div className="flex flex-wrap gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setShape("rectangle")}
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
              onClick={() => setShape("circle")}
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
              onClick={() => setShape("triangle")}
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
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Diameter</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
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
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      {shape === "triangle" ? "Base Length" : "Length"}
                    </label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
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
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                      {shape === "triangle" ? "Perpendicular Height" : "Width"}
                    </label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
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
                </div>
              )}

              {/* Depth & Gravel Material Type */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Gravel Layer Depth</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      step={0.5}
                      min={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
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
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Gravel / Aggregate Type</label>
                  <select
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
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block">
                    Compaction / Settling (%)
                  </label>
                  <div className="flex gap-1 items-center">
                    <Input
                      type="number"
                      value={compactionPct}
                      onChange={(e) => setCompactionPct(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-500 font-medium">%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block">
                    Waste Allowance (%)
                  </label>
                  <div className="flex gap-1 items-center">
                    <Input
                      type="number"
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
                <label className="col-span-4 font-medium text-zinc-700 dark:text-zinc-300">
                  Unit Price (optional)
                </label>
                <div className="col-span-4">
                  <Input
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

              <div className="flex gap-2 pt-1">
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

            {/* Right: Live 2D Scaled Sub-Base Cross-Section */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                SUB-BASE LAYER CROSS-SECTION
              </span>
              <GravelCrossSectionVisualizer2D
                depthInches={Number(depth) || 4}
                depthCm={gravelResult ? gravelResult.depthCm : 10.2}
                gravelName={GRAVEL_TYPES[gravelType].name}
              />
            </div>
          </div>

          {/* Results Metric Cards (With Dual SI / Metric & Imperial Units) */}
          {gravelResult && (
            <div className="space-y-2 pt-2">
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
                <span>• Compaction factored in: <strong>+{compactionPct}% settling</strong></span>
                {gravelResult.estimatedCost > 0 && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    • Estimated Material Cost: ${gravelResult.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...gravelSaved}
          cardTitle="Gravel Estimator"
          formatSummary={(r) => `${r.weightShortTons} Tons (${r.weightMetricTonnes} t), ${r.adjustedVolumeCuYards} yd³, ${r.areaSqM} m²`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: GRAVEL COST & DELIVERY BUDGET ═══════════════════ */}
      <CardWrapper
        title="Gravel Cost &amp; Delivery Freight Budget Calculator"
        hasResult={!!costResult}
        isSaved={costSaveSuccess}
        savedCount={costSaved.saved.length}
        onToggleSaved={() => costSaved.setIsOpen(!costSaved.isOpen)}
        onSave={() => {
          if (!costResult) return;
          costSaved.save(
            `${costTons} Tons: Total $${costResult.grandTotalCost} ($${costResult.costPerSqFt}/sq ft)`,
            costResult
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Total Tons Needed</label>
                <Input
                  type="number"
                  value={costTons}
                  onChange={(e) => setCostTons(e.target.value)}
                  min={0.5}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Quarry Price ($/ton)</label>
                <Input
                  type="number"
                  value={materialUnitPrice}
                  onChange={(e) => setMaterialUnitPrice(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Delivery Fee ($)</label>
                <Input
                  type="number"
                  value={deliveryFlatFee}
                  onChange={(e) => setDeliveryFlatFee(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Spreading Labor ($/ton)</label>
                <Input
                  type="number"
                  value={laborCostPerTon}
                  onChange={(e) => setLaborCostPerTon(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Sales Tax (%)</label>
                <Input
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

          <div className="flex gap-2">
            <Button
              onClick={handleCostCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Project Budget
            </Button>
          </div>

          {costResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
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

        <SavedEstimatesDrawer
          {...costSaved}
          cardTitle="Gravel Cost"
          formatSummary={(r) => `$${r.grandTotalCost.toLocaleString()} ($${r.costPerSqFt}/sq ft)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: MULTI-ZONE MASTER AGGREGATOR ═══════════════════ */}
      <CardWrapper
        title="Multi-Zone Project Master Aggregator &amp; Quarry Order Sheet"
        hasResult={!!multiResult}
        isSaved={multiSaveSuccess}
        savedCount={multiSaved.saved.length}
        onToggleSaved={() => multiSaved.setIsOpen(!multiSaved.isOpen)}
        onSave={() => {
          if (!multiResult) return;
          multiSaved.save(
            `${zones.length} Zones: ${multiResult.totalShortTons} Tons (${multiResult.totalMetricTonnes} t), ${multiResult.totalCuYards} yd³, Total: $${multiResult.grandTotalCost}`,
            multiResult
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
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
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
            <div className="col-span-1 text-right">Del</div>
          </div>

          {/* Dynamic Zone Rows */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-3">
                  <Input
                    type="text"
                    value={zone.name}
                    onChange={(e) => updateZoneRow(zone.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="Zone Name"
                  />
                </div>
                <div className="col-span-2">
                  <select
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
                    type="number"
                    value={zone.dim1}
                    onChange={(e) => updateZoneRow(zone.id, "dim1", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="L (ft)"
                    title="Length or Diameter in feet"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={zone.dim2}
                    onChange={(e) => updateZoneRow(zone.id, "dim2", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="W (ft)"
                    title="Width in feet"
                  />
                </div>
                <div className="col-span-2">
                  <select
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
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeZoneRow(zone.id)}
                    disabled={zones.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete Zone"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleMultiCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Consolidate Quarry Order
            </Button>
          </div>

          {multiResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
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

        <SavedEstimatesDrawer
          {...multiSaved}
          cardTitle="Multi-Zone"
          formatSummary={(r) => `${r.totalShortTons} Tons (${r.totalMetricTonnes} t), ${r.totalCuYards} yd³, ${r.totalSqM} m²`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: SUB-BASE & DRAINAGE TRENCH ═══════════════════ */}
      <CardWrapper
        title="French Drain &amp; Drainage Trench Gravel Calculator"
        hasResult={!!trenchResult}
        isSaved={trenchSaveSuccess}
        savedCount={trenchSaved.saved.length}
        onToggleSaved={() => trenchSaved.setIsOpen(!trenchSaved.isOpen)}
        onSave={() => {
          if (!trenchResult) return;
          trenchSaved.save(
            `Trench: ${trenchLength}ft L × ${trenchWidth}\" W, Gravel: ${trenchResult.gravelWeightShortTons} Tons (${trenchResult.gravelWeightMetricTonnes} t), Fabric: ${trenchResult.fabricAreaSqFt} sq ft`,
            trenchResult
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
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Trench Length (ft)</label>
                  <Input
                    type="number"
                    value={trenchLength}
                    onChange={(e) => setTrenchLength(e.target.value)}
                    min={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Trench Width (in)</label>
                  <Input
                    type="number"
                    value={trenchWidth}
                    onChange={(e) => setTrenchWidth(e.target.value)}
                    min={4}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Total Depth (in)</label>
                  <Input
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
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Drain Pipe Diameter</label>
                  <select
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
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Drainage Rock Type</label>
                  <select
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

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleTrenchCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
                >
                  Calculate Trench Gravel &amp; Fabric
                </Button>
              </div>
            </div>

            {/* Right: 2D French Drain Diagram */}
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
              />
            </div>
          </div>

          {/* Results Metric Cards */}
          {trenchResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
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

        <SavedEstimatesDrawer
          {...trenchSaved}
          cardTitle="Trench Gravel"
          formatSummary={(r) => `${r.gravelWeightShortTons} Tons (${r.gravelWeightMetricTonnes} t), ${r.fabricAreaSqFt} sq ft fabric`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
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
