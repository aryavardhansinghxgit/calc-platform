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
  Grid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  LengthUnit,
  TileUnit,
  GroutUnit,
  TilePattern,
  GroutType,
  PATTERN_RECOMMENDED_WASTE,
  calculateTileQuantity,
  calculateTileCost,
  calculateMultiRoomTiles,
  calculateGroutAndMortar,
  TileQuantityResult,
  TileCostResult,
  MultiRoomResult,
  GroutMortarResult,
  RoomSection,
} from "@/lib/calculator-engine/formulas/tile";

// ─── Local Storage Hook ─────────────────────────────────────────────────────

interface SavedTileEstimate<T> {
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
  const [saved, setSaved] = useState<SavedTileEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedTileEstimate<T> = {
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
  min = 0,
  max,
  step = 1,
  showUnit = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
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
      <div className={showUnit && unit ? "col-span-4" : "col-span-7"}>
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
      {showUnit && unit && (
        <div className="col-span-3 text-[11px] text-zinc-500 font-medium truncate flex items-center">
          {unit}
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
  saved: SavedTileEstimate<T>[];
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
    a.download = `tile_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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

// ─── 2D Scaled Tile Pattern Visualizer ──────────────────────────────────────

function TilePatternVisualizer2D({
  pattern,
  tileLengthIn,
  tileWidthIn,
  groutIn,
}: {
  pattern: TilePattern;
  tileLengthIn: number;
  tileWidthIn: number;
  groutIn: number;
}) {
  const isRectangular = Math.abs(tileLengthIn - tileWidthIn) > 0.5;

  return (
    <div className="w-full flex flex-col items-center select-none">
      <svg
        viewBox="0 0 240 160"
        className="w-full max-w-[230px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="2D Tile Pattern Visualizer"
      >
        <defs>
          <pattern
            id={`pat-grid-${tileLengthIn}-${tileWidthIn}`}
            width={isRectangular ? "60" : "40"}
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width={isRectangular ? "58" : "38"} height="38" fill="#3b82f6" fillOpacity="0.85" stroke="#1d4ed8" strokeWidth="1" />
            <rect x={isRectangular ? "58" : "38"} y="0" width="2" height="40" fill="#cbd5e1" />
            <rect x="0" y="38" width={isRectangular ? "60" : "40"} height="2" fill="#cbd5e1" />
          </pattern>

          <pattern
            id={`pat-running-${tileLengthIn}-${tileWidthIn}`}
            width="60"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="58" height="18" fill="#3b82f6" fillOpacity="0.85" stroke="#1d4ed8" strokeWidth="0.8" />
            <rect x="-30" y="20" width="58" height="18" fill="#3b82f6" fillOpacity="0.85" stroke="#1d4ed8" strokeWidth="0.8" />
            <rect x="30" y="20" width="58" height="18" fill="#3b82f6" fillOpacity="0.85" stroke="#1d4ed8" strokeWidth="0.8" />
          </pattern>

          <pattern
            id={`pat-diagonal-${tileLengthIn}-${tileWidthIn}`}
            width="40"
            height="40"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <rect width="38" height="38" fill="#2563eb" fillOpacity="0.85" stroke="#1e40af" strokeWidth="1" />
          </pattern>
        </defs>

        {pattern === "grid" && <rect width="240" height="160" fill={`url(#pat-grid-${tileLengthIn}-${tileWidthIn})`} />}
        {pattern === "running_bond" && <rect width="240" height="160" fill={`url(#pat-running-${tileLengthIn}-${tileWidthIn})`} />}
        {pattern === "offset_third" && <rect width="240" height="160" fill={`url(#pat-running-${tileLengthIn}-${tileWidthIn})`} />}
        {pattern === "diagonal" && <rect width="240" height="160" fill={`url(#pat-diagonal-${tileLengthIn}-${tileWidthIn})`} />}
        {pattern === "herringbone" && (
          <g transform="translate(10, 10)">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 4 }).map((_, c) => (
                <g key={`${r}-${c}`} transform={`translate(${c * 50}, ${r * 30}) rotate(45)`}>
                  <rect x="0" y="0" width="30" height="12" fill="#3b82f6" fillOpacity="0.9" stroke="#1e3a8a" strokeWidth="0.8" />
                  <rect x="12" y="12" width="30" height="12" fill="#2563eb" fillOpacity="0.9" stroke="#1e3a8a" strokeWidth="0.8" />
                </g>
              ))
            )}
          </g>
        )}

        {/* Grout & Dimension Overlay Banner */}
        <rect x="10" y="132" width="220" height="20" rx="4" fill="#0f172a" fillOpacity="0.9" />
        <text x="120" y="145.5" textAnchor="middle" className="text-[8.5px] fill-white font-bold capitalize">
          {pattern.replace("_", " ")} ({tileLengthIn}&quot; × {tileWidthIn}&quot; Tile, {groutIn}&quot; Grout)
        </text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function TileCalculator() {
  // ─── CARD 1: FLOOR & WALL TILE QUANTITY ───
  const [inputMode, setInputMode] = useState<"dimensions" | "total_area">("dimensions");
  const [roomLength, setRoomLength] = useState("20");
  const [roomLengthUnit, setRoomLengthUnit] = useState<LengthUnit>("feet");
  const [roomWidth, setRoomWidth] = useState("15");
  const [roomWidthUnit, setRoomWidthUnit] = useState<LengthUnit>("feet");
  const [totalAreaSqFt, setTotalAreaSqFt] = useState("300");

  const [tileLength, setTileLength] = useState("12");
  const [tileWidth, setTileWidth] = useState("12");
  const [tileUnit, setTileUnit] = useState<TileUnit>("inches");
  const [tileThickness, setTileThickness] = useState("0.375"); // 3/8"

  const [groutJointWidth, setGroutJointWidth] = useState("0.125"); // 1/8"
  const [groutJointUnit, setGroutJointUnit] = useState<GroutUnit>("inches");
  const [pattern, setPattern] = useState<TilePattern>("grid");
  const [wastePercent, setWastePercent] = useState("10");
  const [tilesPerBox, setTilesPerBox] = useState("12");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [pricingType, setPricingType] = useState<"per_tile" | "per_sqft" | "per_box">("per_sqft");

  const [tileResult, setTileResult] = useState<TileQuantityResult | null>(null);
  const [tileSaveSuccess, setTileSaveSuccess] = useState(false);
  const tileSaved = useCardSaved<TileQuantityResult>("saved_tile_quantity");

  // ─── CARD 2: TILE COST & BUDGET ESTIMATOR ───
  const [costSqFt, setCostSqFt] = useState("300");
  const [tileCostRate, setTileCostRate] = useState("4.50"); // $/sq ft
  const [groutBagCost, setGroutBagCost] = useState("18.00"); // $/25-lb bag
  const [mortarBagCost, setMortarBagCost] = useState("22.00"); // $/50-lb bag
  const [sundriesCost, setSundriesCost] = useState("35.00"); // spacers & sealer
  const [laborRatePerSqFt, setLaborRatePerSqFt] = useState("9.00"); // $/sq ft
  const [salesTaxRate, setSalesTaxRate] = useState("7");
  const [costResult, setCostResult] = useState<TileCostResult | null>(null);
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);
  const costSaved = useCardSaved<TileCostResult>("saved_tile_cost");

  // ─── CARD 3: MULTI-ROOM AGGREGATOR ───
  const [rooms, setRooms] = useState<RoomSection[]>([
    { id: "1", name: "Master Bathroom", lengthFt: 12, widthFt: 10, deductionSqFt: 15 },
    { id: "2", name: "Kitchen Floor", lengthFt: 18, widthFt: 14, deductionSqFt: 25 },
    { id: "3", name: "Backsplash", lengthFt: 15, widthFt: 2.5, deductionSqFt: 0 },
  ]);
  const [multiRoomWaste, setMultiRoomWaste] = useState("10");
  const [multiRoomResult, setMultiRoomResult] = useState<MultiRoomResult | null>(null);
  const [multiRoomSaveSuccess, setMultiRoomSaveSuccess] = useState(false);
  const multiRoomSaved = useCardSaved<MultiRoomResult>("saved_tile_multiroom");

  // ─── CARD 4: GROUT & MORTAR CALCULATOR ───
  const [groutArea, setGroutArea] = useState("300");
  const [groutType, setGroutType] = useState<GroutType>("sanded");
  const [groutResult, setGroutResult] = useState<GroutMortarResult | null>(null);
  const [groutSaveSuccess, setGroutSaveSuccess] = useState(false);
  const groutSaved = useCardSaved<GroutMortarResult>("saved_tile_grout");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Preset Tile Dimensions
  const setTilePreset = (l: string, w: string) => {
    setTileLength(l);
    setTileWidth(w);
    setTileUnit("inches");
  };

  // ─── Calculation Handlers ───

  const handleTileCalc = useCallback(() => {
    const res = calculateTileQuantity({
      inputMode,
      roomLength: Number(roomLength) || 20,
      roomLengthUnit,
      roomWidth: Number(roomWidth) || 15,
      roomWidthUnit,
      totalAreaSqFt: Number(totalAreaSqFt) || 300,

      tileLength: Number(tileLength) || 12,
      tileWidth: Number(tileWidth) || 12,
      tileUnit,
      tileThicknessInches: Number(tileThickness) || 0.375,

      groutJointWidth: Number(groutJointWidth) || 0.125,
      groutJointUnit,
      pattern,
      wastePercent: Number(wastePercent) || 10,
      tilesPerBox: Number(tilesPerBox) || 12,
      pricePerUnit: Number(pricePerUnit) || 0,
      pricingType,
    });
    setTileResult(res);
    setCostSqFt(String(res.roomAreaSqFt));
    setGroutArea(String(res.roomAreaSqFt));
  }, [
    inputMode,
    roomLength,
    roomLengthUnit,
    roomWidth,
    roomWidthUnit,
    totalAreaSqFt,
    tileLength,
    tileWidth,
    tileUnit,
    tileThickness,
    groutJointWidth,
    groutJointUnit,
    pattern,
    wastePercent,
    tilesPerBox,
    pricePerUnit,
    pricingType,
  ]);

  const handleCostCalc = useCallback(() => {
    const sqFt = Number(costSqFt) || 300;
    const groutBags = tileResult ? tileResult.groutBagsNeeded : Math.ceil((sqFt * 0.45) / 25);
    const mortarBags = tileResult ? tileResult.mortarBagsNeeded : Math.ceil(sqFt / 40);

    const res = calculateTileCost({
      totalSqFt: sqFt,
      tileCostPerSqFt: Number(tileCostRate) || 4.5,
      groutCostPerBag: Number(groutBagCost) || 18,
      groutBags,
      mortarCostPerBag: Number(mortarBagCost) || 22,
      mortarBags,
      spacersAndSealerCost: Number(sundriesCost) || 35,
      laborCostPerSqFt: Number(laborRatePerSqFt) || 9,
      salesTaxPercent: Number(salesTaxRate) || 7,
    });
    setCostResult(res);
  }, [costSqFt, tileCostRate, groutBagCost, mortarBagCost, sundriesCost, laborRatePerSqFt, salesTaxRate, tileResult]);

  const handleMultiRoomCalc = useCallback(() => {
    const res = calculateMultiRoomTiles({
      rooms,
      tileLengthIn: Number(tileLength) || 12,
      tileWidthIn: Number(tileWidth) || 12,
      tilesPerBox: Number(tilesPerBox) || 12,
      wastePercent: Number(multiRoomWaste) || 10,
    });
    setMultiRoomResult(res);
  }, [rooms, tileLength, tileWidth, tilesPerBox, multiRoomWaste]);

  const handleGroutCalc = useCallback(() => {
    const res = calculateGroutAndMortar({
      surfaceAreaSqFt: Number(groutArea) || 300,
      tileLengthInches: Number(tileLength) || 12,
      tileWidthInches: Number(tileWidth) || 12,
      tileThicknessInches: Number(tileThickness) || 0.375,
      groutJointWidthInches: Number(groutJointWidth) || 0.125,
      groutType,
    });
    setGroutResult(res);
  }, [groutArea, tileLength, tileWidth, tileThickness, groutJointWidth, groutType]);

  // Reactive Calculation on state changes
  useEffect(() => {
    handleTileCalc();
  }, [handleTileCalc]);

  useEffect(() => {
    handleCostCalc();
  }, [handleCostCalc]);

  useEffect(() => {
    handleMultiRoomCalc();
  }, [handleMultiRoomCalc]);

  useEffect(() => {
    handleGroutCalc();
  }, [handleGroutCalc]);

  // Multi-room row actions
  const addRoomRow = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Room Area ${prev.length + 1}`,
        lengthFt: 12,
        widthFt: 10,
        deductionSqFt: 0,
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
    if (tileResult) {
      sections.push({
        title: "Tile Quantity & Packaging Details",
        items: [
          { label: "Room Surface Area", value: `${tileResult.roomAreaSqFt} sq ft (${tileResult.roomAreaSqM} m²)` },
          { label: "Tile Dimensions", value: `${tileResult.tileLengthInches}\" × ${tileResult.tileWidthInches}\" (${tileResult.singleTileAreaSqFt} sq ft/tile)` },
          { label: "Grout Joint Width", value: `${tileResult.groutWidthInches}\"` },
          { label: "Layout Pattern", value: tileResult.pattern.replace("_", " ").toUpperCase() },
          { label: "Net Tiles Needed", value: `${tileResult.netTilesNeeded} tiles` },
          { label: "Total Tiles with Waste", value: `${tileResult.totalTilesNeeded} tiles (+${tileResult.wastePercent}%)` },
          { label: "Total Boxes Needed", value: `${tileResult.totalBoxesNeeded} Boxes (${tileResult.tilesPerBox} tiles/box)` },
          { label: "Grout Required", value: `${tileResult.estimatedGroutLbs} lbs (~${tileResult.groutBagsNeeded} × 25-lb bags)` },
          { label: "Thin-Set Mortar", value: `${tileResult.mortarBagsNeeded} Bags (50-lb each)` },
          { label: "Recommended Trowel", value: tileResult.recommendedTrowel },
        ],
      });
    }
    if (costResult) {
      sections.push({
        title: "Tile Installation Cost Estimate",
        items: [
          { label: "Tile Materials Subtotal", value: `$${costResult.tileMaterialSubtotal}` },
          { label: "Grout & Mortar", value: `$${(costResult.groutSubtotal + costResult.mortarSubtotal).toFixed(2)}` },
          { label: "Sundries & Spacers", value: `$${costResult.sundriesSubtotal}` },
          { label: "Labor Subtotal", value: `$${costResult.laborSubtotal}` },
          { label: "Grand Total Project Cost", value: `$${costResult.grandTotalProjectCost}` },
          { label: "Average Cost per Sq Ft", value: `$${costResult.costPerSquareFoot.toFixed(2)}/sq ft` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Tile Calculator",
        reportTitle: "Tile Material Takeoff & Cost Estimation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Total Tiles Needed", value: tileResult ? `${tileResult.totalTilesNeeded} Tiles` : "—", highlight: true },
        { label: "Total Boxes Needed", value: tileResult ? `${tileResult.totalBoxesNeeded} Boxes` : "—" },
        { label: "Estimated Project Cost", value: costResult ? `$${costResult.grandTotalProjectCost.toLocaleString()}` : "—" },
      ],
      sections,
    };
  }, [tileResult, costResult]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: FLOOR & WALL TILE QUANTITY ═══════════════════ */}
      <CardWrapper
        title="Floor &amp; Wall Tile Quantity Calculator"
        hasResult={!!tileResult}
        isSaved={tileSaveSuccess}
        savedCount={tileSaved.saved.length}
        onToggleSaved={() => tileSaved.setIsOpen(!tileSaved.isOpen)}
        onSave={() => {
          if (!tileResult) return;
          tileSaved.save(
            `${tileResult.totalTilesNeeded} tiles (${tileResult.totalBoxesNeeded} boxes), Area: ${tileResult.roomAreaSqFt} sq ft`,
            tileResult
          );
          flashSave(setTileSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Sub-Tabs: Dimensions vs Total Area */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setInputMode("dimensions")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                inputMode === "dimensions"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Room Dimensions (L × W)
            </button>
            <button
              type="button"
              onClick={() => setInputMode("total_area")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                inputMode === "total_area"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Direct Surface Area (sq ft)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Inputs Column */}
            <div className="md:col-span-7 space-y-2.5">
              {/* Room Size Inputs */}
              {inputMode === "dimensions" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Room Length</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={roomLength}
                        onChange={(e) => setRoomLength(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        value={roomLengthUnit}
                        onChange={(e) => setRoomLengthUnit(e.target.value as LengthUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="inches">in</option>
                        <option value="meters">m</option>
                        <option value="centimeters">cm</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300">Room Width</label>
                    <div className="flex gap-1">
                      <Input
                        type="number"
                        value={roomWidth}
                        onChange={(e) => setRoomWidth(e.target.value)}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        value={roomWidthUnit}
                        onChange={(e) => setRoomWidthUnit(e.target.value as LengthUnit)}
                        className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                      >
                        <option value="feet">ft</option>
                        <option value="inches">in</option>
                        <option value="meters">m</option>
                        <option value="centimeters">cm</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                <InputRow label="Total Surface Area" value={totalAreaSqFt} onChange={setTotalAreaSqFt} unit="sq ft" />
              )}

              {/* Tile Size Inputs & Presets */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Tile Dimensions:</span>
                  <div className="flex items-center gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setTilePreset("12", "12")}
                      className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 cursor-pointer"
                    >
                      12&quot;×12&quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => setTilePreset("12", "24")}
                      className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 cursor-pointer"
                    >
                      12&quot;×24&quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => setTilePreset("24", "24")}
                      className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 cursor-pointer"
                    >
                      24&quot;×24&quot;
                    </button>
                    <button
                      type="button"
                      onClick={() => setTilePreset("3", "6")}
                      className="px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 cursor-pointer"
                    >
                      3&quot;×6&quot; Subway
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-zinc-500 block">Length</label>
                    <Input
                      type="number"
                      value={tileLength}
                      onChange={(e) => setTileLength(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block">Width</label>
                    <Input
                      type="number"
                      value={tileWidth}
                      onChange={(e) => setTileWidth(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 block">Unit</label>
                    <select
                      value={tileUnit}
                      onChange={(e) => setTileUnit(e.target.value as TileUnit)}
                      className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                    >
                      <option value="inches">Inches (in)</option>
                      <option value="centimeters">Centimeters (cm)</option>
                      <option value="millimeters">Millimeters (mm)</option>
                      <option value="feet">Feet (ft)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Grout Joint Spacing & Pattern */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Grout Joint Gap Width:
                  </label>
                  <select
                    value={groutJointWidth}
                    onChange={(e) => setGroutJointWidth(e.target.value)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="0.0625">1/16&quot; (1.6 mm) — Rectified / Narrow</option>
                    <option value="0.125">1/8&quot; (3.2 mm) — Standard Floor/Wall</option>
                    <option value="0.1875">3/16&quot; (4.8 mm) — Standard</option>
                    <option value="0.25">1/4&quot; (6.4 mm) — Wide Joint</option>
                    <option value="0.375">3/8&quot; (9.5 mm) — Rustic/Quarry</option>
                    <option value="0">0&quot; (No Grout / Edge-to-Edge)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Layout Pattern:
                  </label>
                  <select
                    value={pattern}
                    onChange={(e) => {
                      const p = e.target.value as TilePattern;
                      setPattern(p);
                      setWastePercent(String(PATTERN_RECOMMENDED_WASTE[p] || 10));
                    }}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="grid">Straight Grid / Stacked</option>
                    <option value="running_bond">Running Bond / Brick (50% Offset)</option>
                    <option value="offset_third">1/3 Offset (Large Format)</option>
                    <option value="diagonal">Diagonal / Diamond (45° Angle)</option>
                    <option value="herringbone">Herringbone Pattern</option>
                  </select>
                </div>
              </div>

              {/* Waste Allowance & Box Size */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Waste Factor (%):
                  </label>
                  <div className="flex gap-1 items-center">
                    <Input
                      type="number"
                      value={wastePercent}
                      onChange={(e) => setWastePercent(e.target.value)}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-500 font-medium">%</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Box Size (Tiles / Box):
                  </label>
                  <Input
                    type="number"
                    value={tilesPerBox}
                    onChange={(e) => setTilesPerBox(e.target.value)}
                    min={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              {/* Price Row (optional) */}
              <div className="grid grid-cols-12 gap-2 items-center text-xs pt-1">
                <label className="col-span-4 font-medium text-zinc-700 dark:text-zinc-300">
                  Tile Price (optional)
                </label>
                <div className="col-span-4">
                  <Input
                    type="number"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(e.target.value)}
                    placeholder="$0.00"
                    min={0}
                    step={0.25}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div className="col-span-4">
                  <select
                    value={pricingType}
                    onChange={(e) => setPricingType(e.target.value as any)}
                    className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="per_sqft">per sq ft</option>
                    <option value="per_tile">per tile</option>
                    <option value="per_box">per box</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleTileCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate Tiles
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRoomLength("20");
                    setRoomWidth("15");
                    setTileLength("12");
                    setTileWidth("12");
                    setGroutJointWidth("0.125");
                    setWastePercent("10");
                    setPricePerUnit("");
                  }}
                  className="text-xs font-semibold h-8 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>

            {/* Right: Live 2D Scaled Pattern Visualizer */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                LIVE PATTERN PREVIEW
              </span>
              <TilePatternVisualizer2D
                pattern={pattern}
                tileLengthIn={Number(tileLength) || 12}
                tileWidthIn={Number(tileWidth) || 12}
                groutIn={Number(groutJointWidth) || 0.125}
              />
            </div>
          </div>

          {/* Results Summary */}
          {tileResult && (
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Tiles Needed</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {tileResult.totalTilesNeeded}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    (Net: {tileResult.netTilesNeeded} + {tileResult.wasteTilesCount} scrap)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Tile Boxes Required</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {tileResult.totalBoxesNeeded}{" "}
                    <span className="text-xs font-normal">Boxes</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    @{tileResult.tilesPerBox} pcs/box ({tileResult.boxCoverageSqFt} sq ft)
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Surface Area</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {tileResult.roomAreaSqFt}{" "}
                    <span className="text-xs font-normal">sq ft</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({tileResult.roomAreaSqM} m²)</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Grout &amp; Mortar</span>
                  <span className="text-base font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {tileResult.estimatedGroutLbs} lbs Grout
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">
                    {tileResult.mortarBagsNeeded} bags Thin-Set (50-lb)
                  </span>
                </div>
              </div>

              {/* Trowel Recommendation Banner */}
              <div className="p-2 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[11px] font-sans flex flex-wrap items-center justify-between gap-2">
                <span>• Recommended Trowel Notch: <strong>{tileResult.recommendedTrowel}</strong></span>
                <span>• Purchased Box Coverage: <strong>{tileResult.totalPurchasedAreaSqFt} sq ft</strong></span>
                {tileResult.estimatedCost > 0 && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    • Total Tile Cost: ${tileResult.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...tileSaved}
          cardTitle="Tile Quantity"
          formatSummary={(r) => `${r.totalTilesNeeded} tiles (${r.totalBoxesNeeded} boxes), ${r.roomAreaSqFt} sq ft`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: TILE COST & BUDGET ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Tile Project Cost &amp; Installation Budget Estimator"
        hasResult={!!costResult}
        isSaved={costSaveSuccess}
        savedCount={costSaved.saved.length}
        onToggleSaved={() => costSaved.setIsOpen(!costSaved.isOpen)}
        onSave={() => {
          if (!costResult) return;
          costSaved.save(
            `Area: ${costSqFt} sq ft, Total: $${costResult.grandTotalProjectCost} ($${costResult.costPerSquareFoot}/sq ft)`,
            costResult
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                Editable Tile Material, Grout, Mortar &amp; Labor Rates
              </span>
              <button
                type="button"
                onClick={() => {
                  setTileCostRate("4.50");
                  setGroutBagCost("18.00");
                  setMortarBagCost("22.00");
                  setSundriesCost("35.00");
                  setLaborRatePerSqFt("9.00");
                  setSalesTaxRate("7");
                }}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Reset Default Rates
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Tile Area (sq ft)</label>
                <Input
                  type="number"
                  value={costSqFt}
                  onChange={(e) => setCostSqFt(e.target.value)}
                  min={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Tile Cost ($/sq ft)</label>
                <Input
                  type="number"
                  value={tileCostRate}
                  onChange={(e) => setTileCostRate(e.target.value)}
                  min={0}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Grout ($/bag)</label>
                <Input
                  type="number"
                  value={groutBagCost}
                  onChange={(e) => setGroutBagCost(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Thin-Set ($/bag)</label>
                <Input
                  type="number"
                  value={mortarBagCost}
                  onChange={(e) => setMortarBagCost(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Tile Setter Labor ($/sq ft)</label>
                <Input
                  type="number"
                  value={laborRatePerSqFt}
                  onChange={(e) => setLaborRatePerSqFt(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Sales Tax (%)</label>
                <Input
                  type="number"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(e.target.value)}
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
              Calculate Project Cost
            </Button>
          </div>

          {costResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              {/* Itemized Cost Breakdown */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-sans tabular-nums border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 font-semibold">
                      <th className="py-1">Material / Labor Item</th>
                      <th className="py-1">Quantity</th>
                      <th className="py-1">Unit Rate</th>
                      <th className="py-1 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Tiles (Porcelain / Ceramic)</td>
                      <td className="py-1">{costSqFt} sq ft</td>
                      <td className="py-1">${tileCostRate}/sq ft</td>
                      <td className="py-1 text-right font-semibold">${costResult.tileMaterialSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Grout (25-lb Bags)</td>
                      <td className="py-1">{tileResult ? tileResult.groutBagsNeeded : 1} bags</td>
                      <td className="py-1">${groutBagCost}/bag</td>
                      <td className="py-1 text-right font-semibold">${costResult.groutSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Thin-Set Mortar (50-lb Bags)</td>
                      <td className="py-1">{tileResult ? tileResult.mortarBagsNeeded : 2} bags</td>
                      <td className="py-1">${mortarBagCost}/bag</td>
                      <td className="py-1 text-right font-semibold">${costResult.mortarSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Spacers, Sponge &amp; Sealant</td>
                      <td className="py-1">Sundries Kit</td>
                      <td className="py-1">—</td>
                      <td className="py-1 text-right font-semibold">${costResult.sundriesSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Professional Tile Setter Labor</td>
                      <td className="py-1">{costSqFt} sq ft</td>
                      <td className="py-1">${laborRatePerSqFt}/sq ft</td>
                      <td className="py-1 text-right font-semibold">${costResult.laborSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-slate-50/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400">
                      <td colSpan={3} className="py-1">Material Sales Tax ({salesTaxRate}%)</td>
                      <td className="py-1 text-right">${costResult.salesTaxAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-950/40 font-bold text-xs">
                      <td colSpan={3} className="py-1.5 text-blue-900 dark:text-blue-100">Estimated Total Project Investment</td>
                      <td className="py-1.5 text-right text-emerald-600 dark:text-emerald-400 text-sm">
                        ${costResult.grandTotalProjectCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-900 dark:text-blue-200">Total Unit Investment:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  ${costResult.costPerSquareFoot.toFixed(2)} per Square Foot
                </span>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...costSaved}
          cardTitle="Tile Cost"
          formatSummary={(r) => `$${r.grandTotalProjectCost.toLocaleString()} ($${r.costPerSquareFoot.toFixed(2)}/sq ft)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: MULTI-ROOM / COMPLEX LAYOUT ═══════════════════ */}
      <CardWrapper
        title="Multi-Room &amp; Complex Layout Aggregator"
        hasResult={!!multiRoomResult}
        isSaved={multiRoomSaveSuccess}
        savedCount={multiRoomSaved.saved.length}
        onToggleSaved={() => multiRoomSaved.setIsOpen(!multiRoomSaved.isOpen)}
        onSave={() => {
          if (!multiRoomResult) return;
          multiRoomSaved.save(
            `${rooms.length} Rooms, Total: ${multiRoomResult.totalNetSqFt} sq ft, ${multiRoomResult.totalTilesWithWaste} tiles`,
            multiRoomResult
          );
          flashSave(setMultiRoomSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Rooms &amp; Sections ({rooms.length}):
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addRoomRow}
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Room Section
            </Button>
          </div>

          {/* Table Column Headers / Reference Labels */}
          <div className="grid grid-cols-12 gap-1.5 px-2 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-md border border-blue-200/70 dark:border-blue-900/50 text-[11px] font-bold text-blue-900 dark:text-blue-200">
            <div className="col-span-4">Room / Area Name</div>
            <div className="col-span-3">Length (ft)</div>
            <div className="col-span-2">Width (ft)</div>
            <div className="col-span-2 truncate" title="Deductions: Kitchen Islands, Bathtubs, Vanities, Fireplaces">
              Deduct (sq ft)
            </div>
            <div className="col-span-1 text-right">Del</div>
          </div>

          {/* Dynamic Rooms List */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-4">
                  <Input
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoomRow(room.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="e.g. Master Bath"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    value={room.lengthFt}
                    onChange={(e) => updateRoomRow(room.id, "lengthFt", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Length (ft)"
                    title="Length in feet"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={room.widthFt}
                    onChange={(e) => updateRoomRow(room.id, "widthFt", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Width (ft)"
                    title="Width in feet"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={room.deductionSqFt}
                    onChange={(e) => updateRoomRow(room.id, "deductionSqFt", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Deduct (sq ft)"
                    title="Deductions in square feet (Kitchen Island, Tub, Vanity)"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeRoomRow(room.id)}
                    disabled={rooms.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete Room"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              onClick={handleMultiRoomCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Aggregate All Rooms
            </Button>
          </div>

          {multiRoomResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Net Area</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {multiRoomResult.totalNetSqFt} sq ft
                  </span>
                  <span className="text-[10px] text-zinc-400 block">({multiRoomResult.totalNetSqM} m²)</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Total Tiles</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiRoomResult.totalTilesWithWaste} pcs
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(with {multiRoomWaste}% waste)</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Total Boxes</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiRoomResult.totalBoxesNeeded} Boxes
                  </span>
                  <span className="text-[10px] text-zinc-400 block">@{tilesPerBox} pcs/box</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Grout &amp; Mortar</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiRoomResult.totalGroutBagsNeeded} Grout / {multiRoomResult.totalMortarBagsNeeded} Mortar
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Bags</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...multiRoomSaved}
          cardTitle="Multi-Room"
          formatSummary={(r) => `${r.totalNetSqFt} sq ft, ${r.totalTilesWithWaste} tiles (${r.totalBoxesNeeded} boxes)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: GROUT & MORTAR REQUIREMENT ═══════════════════ */}
      <CardWrapper
        title="Grout &amp; Thin-Set Mortar Requirement Calculator"
        hasResult={!!groutResult}
        isSaved={groutSaveSuccess}
        savedCount={groutSaved.saved.length}
        onToggleSaved={() => groutSaved.setIsOpen(!groutSaved.isOpen)}
        onSave={() => {
          if (!groutResult) return;
          groutSaved.save(
            `${groutResult.groutLbs} lbs Grout (${groutResult.groutType}), ${groutResult.mortarBags50lb} Mortar Bags`,
            groutResult
          );
          flashSave(setGroutSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Surface Area to Grout (sq ft):
              </label>
              <Input
                type="number"
                value={groutArea}
                onChange={(e) => setGroutArea(e.target.value)}
                min={1}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Grout Formulation Type:
              </label>
              <select
                value={groutType}
                onChange={(e) => setGroutType(e.target.value as GroutType)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="sanded">Sanded Portland Cement Grout (Joints ≥ 1/8&quot;)</option>
                <option value="unsanded">Unsanded Grout (Narrow Joints &lt; 1/8&quot; / Glass / Marble)</option>
                <option value="epoxy">Epoxy Grout (100% Waterproof / Stainproof)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Tile Thickness / Depth (in):
              </label>
              <select
                value={tileThickness}
                onChange={(e) => setTileThickness(e.target.value)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans tabular-nums"
              >
                <option value="0.25">1/4&quot; (6.4 mm) — Wall / Subway Tiles</option>
                <option value="0.3125">5/16&quot; (8 mm) — Standard Porcelain</option>
                <option value="0.375">3/8&quot; (9.5 mm) — Floor Tiles</option>
                <option value="0.5">1/2&quot; (12.7 mm) — Quarry / Paver Tiles</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleGroutCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Grout &amp; Mortar
            </Button>
          </div>

          {groutResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Grout Weight</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {groutResult.groutLbs} lbs
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({groutResult.groutKg} kg)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">25-lb Grout Bags</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {groutResult.bags25lb} Bags
                  </span>
                  <span className="text-[10px] text-zinc-400 block">(or {groutResult.bags10lb} × 10-lb bags)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Thin-Set Mortar</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {groutResult.mortarBags50lb} Bags
                  </span>
                  <span className="text-[10px] text-zinc-400 block">50-lb Bags</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Recommended Trowel</span>
                  <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 block truncate">
                    {groutResult.trowelRecommendation}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">~{groutResult.trowelCoverageSqFtPerBag} sq ft/bag</span>
                </div>
              </div>

              {/* TCNA Recommendation Note */}
              <div className="p-2 bg-blue-50/70 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800 text-[11px] text-blue-900 dark:text-blue-200 font-medium">
                • TCNA Recommendation: <strong>{groutResult.recommendedGroutType}</strong>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...groutSaved}
          cardTitle="Grout & Mortar"
          formatSummary={(r) => `${r.groutLbs} lbs Grout (${r.bags25lb} × 25-lb bags), ${r.mortarBags50lb} Mortar Bags`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Tile Takeoff Report
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
