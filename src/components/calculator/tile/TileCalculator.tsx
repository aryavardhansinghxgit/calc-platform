"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Plus,
  FileSpreadsheet,
  RotateCcw,
  Copy,
  Check,
  FileText,
  Sparkles,
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

// ─── Raw Input Interfaces for Full Persistence & Restore ────────────────────

export interface TileQuantityRawInputs {
  inputMode: "dimensions" | "total_area";
  roomLength: string;
  roomLengthUnit: LengthUnit;
  roomWidth: string;
  roomWidthUnit: LengthUnit;
  totalAreaSqFt: string;
  tileLength: string;
  tileWidth: string;
  tileUnit: TileUnit;
  tileThickness: string;
  groutJointWidth: string;
  groutJointUnit: GroutUnit;
  pattern: TilePattern;
  wastePercent: string;
  tilesPerBox: string;
  pricePerUnit: string;
  pricingType: "per_tile" | "per_sqft" | "per_box";
}

export interface TileCostRawInputs {
  costSqFt: string;
  tileCostRate: string;
  groutBagCost: string;
  mortarBagCost: string;
  sundriesCost: string;
  laborRatePerSqFt: string;
  salesTaxRate: string;
}

export interface TileMultiRoomRawInputs {
  rooms: RoomSection[];
  multiRoomWaste: string;
}

export interface TileGroutRawInputs {
  groutArea: string;
  groutType: GroutType;
  tileThickness: string;
  groutJointWidth: string;
}

// ─── Local Storage Hook with Typed Raw Input Restoration ────────────────────

export interface SavedTileEstimate<TInput, TResult> {
  id: string;
  timestamp: string;
  inputSummary: string;
  rawInputs: TInput;
  result: TResult;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<TInput, TResult>(storageKey: string) {
  const [saved, setSaved] = useState<SavedTileEstimate<TInput, TResult>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, rawInputs: TInput, result: TResult, notes = "") => {
      const entry: SavedTileEstimate<TInput, TResult> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        rawInputs,
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

// ─── RFC-4180 CSV Download Helper ───────────────────────────────────────────

function downloadCsv(filename: string, rows: string[][]) {
  const escapeCell = (cell: string) => {
    if (cell.includes(",") || cell.includes("\"") || cell.includes("\n")) {
      return `"${cell.replace(/"/g, '""')}"`;
    }
    return cell;
  };
  const csvContent = rows.map((r) => r.map(escapeCell).join(",")).join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Card Wrapper Component ─────────────────────────────────────────────────

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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:break-inside-avoid print:border-zinc-300 print:shadow-none">
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
              aria-label={isSaved ? "Saved to history" : "Save calculation"}
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

// ─── Saved Estimates Drawer with Restore Action ─────────────────────────────

function SavedEstimatesDrawer<TInput, TResult>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedTileEstimate<TInput, TResult>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: TResult) => string;
  onRestore: (raw: TInput) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportSavedCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Result Summary"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    downloadCsv(`tile_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`, rows);
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
            onClick={exportSavedCsv}
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
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onRestore(item.rawInputs)}
                className="p-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer transition-colors"
                title="Restore calculation"
                aria-label="Restore saved calculation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="p-1 rounded text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer transition-colors"
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
  const patternLabel = pattern.replace("_", " ");

  return (
    <div className="w-full flex flex-col items-center select-none print:max-h-[140px]">
      <svg
        viewBox="0 0 240 160"
        className="w-full max-w-[230px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        role="img"
        aria-label={`2D Tile Layout Pattern Visualizer: ${patternLabel} layout with ${tileLengthIn} by ${tileWidthIn} inch tiles and ${groutIn} inch grout joint.`}
      >
        <title>{`2D Pattern: ${patternLabel}`}</title>
        <defs>
          <pattern
            id={`pat-grid-${tileLengthIn}-${tileWidthIn}`}
            width={isRectangular ? "60" : "40"}
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width={isRectangular ? "58" : "38"} height="38" fill="#3b82f6" fillOpacity="0.85" stroke="#1d4ed8" strokeWidth="1" />
            {groutIn > 0 && (
              <>
                <rect x={isRectangular ? "58" : "38"} y="0" width="2" height="40" fill="#cbd5e1" />
                <rect x="0" y="38" width={isRectangular ? "60" : "40"} height="2" fill="#cbd5e1" />
              </>
            )}
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
          {patternLabel} ({tileLengthIn}&quot; × {tileWidthIn}&quot; Tile, {groutIn}&quot; Grout)
        </text>
      </svg>
    </div>
  );
}

// ─── MAIN TILE CALCULATOR COMPONENT ─────────────────────────────────────────

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
  const [card1Error, setCard1Error] = useState<string | null>(null);
  const [tileSaveSuccess, setTileSaveSuccess] = useState(false);
  const tileSaved = useCardSaved<TileQuantityRawInputs, TileQuantityResult>("saved_tile_quantity");

  // ─── CARD 2: TILE COST & BUDGET ESTIMATOR ───
  const [costSqFt, setCostSqFt] = useState("300");
  const [tileCostRate, setTileCostRate] = useState("4.50"); // $/sq ft
  const [groutBagCost, setGroutBagCost] = useState("18.00"); // $/25-lb bag
  const [mortarBagCost, setMortarBagCost] = useState("22.00"); // $/50-lb bag
  const [sundriesCost, setSundriesCost] = useState("35.00"); // spacers & sealer
  const [laborRatePerSqFt, setLaborRatePerSqFt] = useState("9.00"); // $/sq ft
  const [salesTaxRate, setSalesTaxRate] = useState("7");
  const [costResult, setCostResult] = useState<TileCostResult | null>(null);
  const [card2Error, setCard2Error] = useState<string | null>(null);
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);
  const costSaved = useCardSaved<TileCostRawInputs, TileCostResult>("saved_tile_cost");

  // ─── CARD 3: MULTI-ROOM AGGREGATOR ───
  const [rooms, setRooms] = useState<RoomSection[]>([
    { id: "1", name: "Master Bathroom", lengthFt: 12, widthFt: 10, deductionSqFt: 15 },
    { id: "2", name: "Kitchen Floor", lengthFt: 18, widthFt: 14, deductionSqFt: 25 },
    { id: "3", name: "Backsplash", lengthFt: 15, widthFt: 2.5, deductionSqFt: 0 },
  ]);
  const [multiRoomWaste, setMultiRoomWaste] = useState("10");
  const [multiRoomResult, setMultiRoomResult] = useState<MultiRoomResult | null>(null);
  const [card3Error, setCard3Error] = useState<string | null>(null);
  const [multiRoomSaveSuccess, setMultiRoomSaveSuccess] = useState(false);
  const multiRoomSaved = useCardSaved<TileMultiRoomRawInputs, MultiRoomResult>("saved_tile_multiroom");

  // ─── CARD 4: GROUT & MORTAR CALCULATOR ───
  const [groutArea, setGroutArea] = useState("300");
  const [groutType, setGroutType] = useState<GroutType>("sanded");
  const [groutResult, setGroutResult] = useState<GroutMortarResult | null>(null);
  const [card4Error, setCard4Error] = useState<string | null>(null);
  const [groutSaveSuccess, setGroutSaveSuccess] = useState(false);
  const groutSaved = useCardSaved<TileGroutRawInputs, GroutMortarResult>("saved_tile_grout");

  // Global Report Modal
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Copy & Action Feedback
  const [actionFeedback, setActionFeedback] = useState<Record<string, string>>({});

  const setFeedback = (key: string, msg: string) => {
    setActionFeedback((prev) => ({ ...prev, [key]: msg }));
    setTimeout(() => {
      setActionFeedback((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }, 1500);
  };

  const copyToClipboard = async (key: string, text: string, msg = "Copied!") => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setFeedback(key, msg);
    } catch {
      setFeedback(key, "Error");
    }
  };

  // Preset Tile Dimensions
  const setTilePreset = (l: string, w: string) => {
    setTileLength(l);
    setTileWidth(w);
    setTileUnit("inches");
  };

  // ─── Calculation Handlers ──────────────────────────────────────────────────

  const handleTileCalc = useCallback(() => {
    // Explicit Validation
    if (inputMode === "dimensions") {
      if (!roomLength.trim() || Number(roomLength) <= 0) {
        setCard1Error("Room length must be greater than 0.");
        setTileResult(null);
        return;
      }
      if (!roomWidth.trim() || Number(roomWidth) <= 0) {
        setCard1Error("Room width must be greater than 0.");
        setTileResult(null);
        return;
      }
    } else {
      if (!totalAreaSqFt.trim() || Number(totalAreaSqFt) <= 0) {
        setCard1Error("Surface area must be greater than 0.");
        setTileResult(null);
        return;
      }
    }

    if (!tileLength.trim() || Number(tileLength) <= 0) {
      setCard1Error("Tile length must be greater than 0.");
      setTileResult(null);
      return;
    }
    if (!tileWidth.trim() || Number(tileWidth) <= 0) {
      setCard1Error("Tile width must be greater than 0.");
      setTileResult(null);
      return;
    }
    if (wastePercent.trim() === "" || Number(wastePercent) < 0 || Number(wastePercent) > 100) {
      setCard1Error("Waste percentage must be between 0 and 100%.");
      setTileResult(null);
      return;
    }
    const boxCount = Number(tilesPerBox);
    if (!tilesPerBox.trim() || boxCount < 1 || !Number.isInteger(boxCount)) {
      setCard1Error("Tiles per box must be a positive whole number (≥ 1).");
      setTileResult(null);
      return;
    }
    if (pricePerUnit.trim() !== "" && Number(pricePerUnit) < 0) {
      setCard1Error("Tile price cannot be negative.");
      setTileResult(null);
      return;
    }

    setCard1Error(null);

    // Grout width handling: explicit 0 preservation
    const gWidth = groutJointWidth.trim() === "" ? 0.125 : Number(groutJointWidth);

    const res = calculateTileQuantity({
      inputMode,
      roomLength: Number(roomLength),
      roomLengthUnit,
      roomWidth: Number(roomWidth),
      roomWidthUnit,
      totalAreaSqFt: Number(totalAreaSqFt),

      tileLength: Number(tileLength),
      tileWidth: Number(tileWidth),
      tileUnit,
      tileThicknessInches: Number(tileThickness) || 0.375,

      groutJointWidth: gWidth,
      groutJointUnit,
      pattern,
      wastePercent: Number(wastePercent),
      tilesPerBox: boxCount,
      pricePerUnit: pricePerUnit.trim() !== "" ? Number(pricePerUnit) : 0,
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
    if (!costSqFt.trim() || Number(costSqFt) <= 0) {
      setCard2Error("Tile area must be greater than 0.");
      setCostResult(null);
      return;
    }
    if (Number(tileCostRate) < 0) {
      setCard2Error("Tile cost rate cannot be negative.");
      setCostResult(null);
      return;
    }
    if (Number(groutBagCost) < 0) {
      setCard2Error("Grout bag cost cannot be negative.");
      setCostResult(null);
      return;
    }
    if (Number(mortarBagCost) < 0) {
      setCard2Error("Mortar bag cost cannot be negative.");
      setCostResult(null);
      return;
    }
    if (Number(sundriesCost) < 0) {
      setCard2Error("Sundries cost cannot be negative.");
      setCostResult(null);
      return;
    }
    if (Number(laborRatePerSqFt) < 0) {
      setCard2Error("Labor rate cannot be negative.");
      setCostResult(null);
      return;
    }
    if (Number(salesTaxRate) < 0 || Number(salesTaxRate) > 100) {
      setCard2Error("Sales tax rate must be between 0 and 100%.");
      setCostResult(null);
      return;
    }

    setCard2Error(null);

    const sqFt = Number(costSqFt);
    const groutBags = tileResult ? tileResult.groutBagsNeeded : Math.ceil((sqFt * 0.45) / 25);
    const mortarBags = tileResult ? tileResult.mortarBagsNeeded : Math.ceil(sqFt / 40);

    const res = calculateTileCost({
      totalSqFt: sqFt,
      tileCostPerSqFt: Number(tileCostRate) || 0,
      groutCostPerBag: Number(groutBagCost) || 0,
      groutBags,
      mortarCostPerBag: Number(mortarBagCost) || 0,
      mortarBags,
      spacersAndSealerCost: Number(sundriesCost) || 0,
      laborCostPerSqFt: Number(laborRatePerSqFt) || 0,
      salesTaxPercent: Number(salesTaxRate) || 0,
    });
    setCostResult(res);
  }, [costSqFt, tileCostRate, groutBagCost, mortarBagCost, sundriesCost, laborRatePerSqFt, salesTaxRate, tileResult]);

  const handleMultiRoomCalc = useCallback(() => {
    for (const r of rooms) {
      if (r.lengthFt <= 0 || r.widthFt <= 0) {
        setCard3Error(`Room "${r.name || "Area"}" length and width must be greater than 0.`);
        setMultiRoomResult(null);
        return;
      }
      if (r.deductionSqFt < 0) {
        setCard3Error(`Deduction for "${r.name || "Area"}" cannot be negative.`);
        setMultiRoomResult(null);
        return;
      }
      const gross = r.lengthFt * r.widthFt;
      if (r.deductionSqFt > gross) {
        setCard3Error(`Deduction (${r.deductionSqFt} sq ft) cannot exceed gross area (${gross} sq ft) for "${r.name || "Area"}".`);
        setMultiRoomResult(null);
        return;
      }
    }
    if (multiRoomWaste.trim() === "" || Number(multiRoomWaste) < 0 || Number(multiRoomWaste) > 100) {
      setCard3Error("Waste percentage must be between 0 and 100%.");
      setMultiRoomResult(null);
      return;
    }

    setCard3Error(null);

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
    if (!groutArea.trim() || Number(groutArea) <= 0) {
      setCard4Error("Surface area to grout must be greater than 0.");
      setGroutResult(null);
      return;
    }
    if (!tileThickness.trim() || Number(tileThickness) <= 0) {
      setCard4Error("Tile thickness must be greater than 0.");
      setGroutResult(null);
      return;
    }

    setCard4Error(null);

    const gWidth = groutJointWidth.trim() === "" ? 0.125 : Number(groutJointWidth);

    const res = calculateGroutAndMortar({
      surfaceAreaSqFt: Number(groutArea),
      tileLengthInches: Number(tileLength) || 12,
      tileWidthInches: Number(tileWidth) || 12,
      tileThicknessInches: Number(tileThickness) || 0.375,
      groutJointWidthInches: gWidth,
      groutType,
    });
    setGroutResult(res);
  }, [groutArea, tileLength, tileWidth, tileThickness, groutJointWidth, groutType]);

  // Reactive Calculation on State Changes
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

  // ─── State Restoration Handlers ────────────────────────────────────────────

  const restoreCard1 = (raw: TileQuantityRawInputs) => {
    setInputMode(raw.inputMode);
    setRoomLength(raw.roomLength);
    setRoomLengthUnit(raw.roomLengthUnit);
    setRoomWidth(raw.roomWidth);
    setRoomWidthUnit(raw.roomWidthUnit);
    setTotalAreaSqFt(raw.totalAreaSqFt);
    setTileLength(raw.tileLength);
    setTileWidth(raw.tileWidth);
    setTileUnit(raw.tileUnit);
    setTileThickness(raw.tileThickness);
    setGroutJointWidth(raw.groutJointWidth);
    setGroutJointUnit(raw.groutJointUnit);
    setPattern(raw.pattern);
    setWastePercent(raw.wastePercent);
    setTilesPerBox(raw.tilesPerBox);
    setPricePerUnit(raw.pricePerUnit);
    setPricingType(raw.pricingType);
    setFeedback("c1_restore", "Restored!");
  };

  const restoreCard2 = (raw: TileCostRawInputs) => {
    setCostSqFt(raw.costSqFt);
    setTileCostRate(raw.tileCostRate);
    setGroutBagCost(raw.groutBagCost);
    setMortarBagCost(raw.mortarBagCost);
    setSundriesCost(raw.sundriesCost);
    setLaborRatePerSqFt(raw.laborRatePerSqFt);
    setSalesTaxRate(raw.salesTaxRate);
    setFeedback("c2_restore", "Restored!");
  };

  const restoreCard3 = (raw: TileMultiRoomRawInputs) => {
    setRooms(raw.rooms);
    setMultiRoomWaste(raw.multiRoomWaste);
    setFeedback("c3_restore", "Restored!");
  };

  const restoreCard4 = (raw: TileGroutRawInputs) => {
    setGroutArea(raw.groutArea);
    setGroutType(raw.groutType);
    setTileThickness(raw.tileThickness);
    setGroutJointWidth(raw.groutJointWidth);
    setFeedback("c4_restore", "Restored!");
  };

  // ─── Export & Copy Generators ──────────────────────────────────────────────

  const exportCard1Csv = () => {
    if (!tileResult) return;
    const rows = [
      ["Parameter", "Value"],
      ["Module", "Floor & Wall Tile Quantity"],
      ["Surface Area (sq ft)", String(tileResult.roomAreaSqFt)],
      ["Surface Area (m²)", String(tileResult.roomAreaSqM)],
      ["Tile Length (in)", String(tileResult.tileLengthInches)],
      ["Tile Width (in)", String(tileResult.tileWidthInches)],
      ["Grout Width (in)", String(tileResult.groutWidthInches)],
      ["Pattern", tileResult.pattern],
      ["Waste Percent", `${tileResult.wastePercent}%`],
      ["Net Tiles Needed", String(tileResult.netTilesNeeded)],
      ["Waste Scrap Tiles", String(tileResult.wasteTilesCount)],
      ["Total Purchased Tiles", String(tileResult.totalTilesNeeded)],
      ["Tiles Per Box", String(tileResult.tilesPerBox)],
      ["Total Boxes Needed", String(tileResult.totalBoxesNeeded)],
      ["Total Purchased Coverage (sq ft)", String(tileResult.totalPurchasedAreaSqFt)],
      ["Grout Required (lbs)", String(tileResult.estimatedGroutLbs)],
      ["Thin-Set Mortar Bags (50-lb)", String(tileResult.mortarBagsNeeded)],
      ["Recommended Trowel", tileResult.recommendedTrowel],
      ["Estimated Tile Cost ($)", tileResult.estimatedCost ? `$${tileResult.estimatedCost.toFixed(2)}` : "N/A"],
      ["Export Timestamp", new Date().toISOString()],
    ];
    downloadCsv("tile_quantity_takeoff.csv", rows);
    setFeedback("c1_csv", "CSV Exported!");
  };

  const exportCard2Csv = () => {
    if (!costResult) return;
    const rows = [
      ["Cost Component", "Quantity", "Rate", "Subtotal ($)"],
      ["Tiles (Porcelain / Ceramic)", `${costSqFt} sq ft`, `$${tileCostRate}/sq ft`, costResult.tileMaterialSubtotal.toFixed(2)],
      ["Grout (25-lb Bags)", `${tileResult ? tileResult.groutBagsNeeded : 1} bags`, `$${groutBagCost}/bag`, costResult.groutSubtotal.toFixed(2)],
      ["Thin-Set Mortar (50-lb Bags)", `${tileResult ? tileResult.mortarBagsNeeded : 2} bags`, `$${mortarBagCost}/bag`, costResult.mortarSubtotal.toFixed(2)],
      ["Spacers, Sponge & Sealant", "Sundries Kit", "—", costResult.sundriesSubtotal.toFixed(2)],
      ["Professional Setter Labor", `${costSqFt} sq ft`, `$${laborRatePerSqFt}/sq ft`, costResult.laborSubtotal.toFixed(2)],
      ["Material Sales Tax", `${salesTaxRate}%`, "—", costResult.salesTaxAmount.toFixed(2)],
      ["Grand Total Project Investment", `${costSqFt} sq ft`, `$${costResult.costPerSquareFoot.toFixed(2)}/sq ft`, costResult.grandTotalProjectCost.toFixed(2)],
      ["Timestamp", "", "", new Date().toISOString()],
    ];
    downloadCsv("tile_installation_budget.csv", rows);
    setFeedback("c2_csv", "CSV Exported!");
  };

  const exportCard3Csv = () => {
    if (!multiRoomResult) return;
    const rows = [
      ["Room / Area Name", "Length (ft)", "Width (ft)", "Gross Area (sq ft)", "Deduction (sq ft)", "Net Area (sq ft)"],
      ...rooms.map((r) => [
        r.name,
        String(r.lengthFt),
        String(r.widthFt),
        String(r.lengthFt * r.widthFt),
        String(r.deductionSqFt),
        String(Math.max(0, r.lengthFt * r.widthFt - r.deductionSqFt)),
      ]),
      ["TOTALS", "", "", String(multiRoomResult.totalGrossSqFt), String(multiRoomResult.totalDeductionsSqFt), String(multiRoomResult.totalNetSqFt)],
      ["Total Tiles with Waste", String(multiRoomResult.totalTilesWithWaste)],
      ["Total Boxes Needed", String(multiRoomResult.totalBoxesNeeded)],
      ["Grout Bags (25-lb)", String(multiRoomResult.totalGroutBagsNeeded)],
      ["Mortar Bags (50-lb)", String(multiRoomResult.totalMortarBagsNeeded)],
      ["Timestamp", new Date().toISOString()],
    ];
    downloadCsv("tile_multi_room_takeoff.csv", rows);
    setFeedback("c3_csv", "CSV Exported!");
  };

  const exportCard4Csv = () => {
    if (!groutResult) return;
    const rows = [
      ["Parameter", "Value"],
      ["Surface Area (sq ft)", groutArea],
      ["Grout Formulation", groutResult.recommendedGroutType],
      ["Total Grout Weight (lbs)", String(groutResult.groutLbs)],
      ["Total Grout Weight (kg)", String(groutResult.groutKg)],
      ["25-lb Grout Bags", String(groutResult.bags25lb)],
      ["10-lb Grout Bags", String(groutResult.bags10lb)],
      ["50-lb Thin-Set Bags", String(groutResult.mortarBags50lb)],
      ["Recommended Trowel", groutResult.trowelRecommendation],
      ["Timestamp", new Date().toISOString()],
    ];
    downloadCsv("tile_grout_mortar_takeoff.csv", rows);
    setFeedback("c4_csv", "CSV Exported!");
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
          { label: "Tile Materials Subtotal", value: `$${costResult.tileMaterialSubtotal.toFixed(2)}` },
          { label: "Grout & Mortar", value: `$${(costResult.groutSubtotal + costResult.mortarSubtotal).toFixed(2)}` },
          { label: "Sundries & Spacers", value: `$${costResult.sundriesSubtotal.toFixed(2)}` },
          { label: "Labor Subtotal", value: `$${costResult.laborSubtotal.toFixed(2)}` },
          { label: "Material Sales Tax", value: `$${costResult.salesTaxAmount.toFixed(2)}` },
          { label: "Grand Total Project Cost", value: `$${costResult.grandTotalProjectCost.toFixed(2)}` },
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
        { label: "Estimated Project Cost", value: costResult ? `$${costResult.grandTotalProjectCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—" },
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
          const raw: TileQuantityRawInputs = {
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
          };
          tileSaved.save(
            `${tileResult.totalTilesNeeded} tiles (${tileResult.totalBoxesNeeded} boxes), ${tileResult.roomAreaSqFt} sq ft`,
            raw,
            tileResult
          );
          flashSave(setTileSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Sub-Tabs: Dimensions vs Total Area */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800 no-print">
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

          {/* Validation Alert */}
          {card1Error && (
            <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 font-medium">
              {card1Error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Inputs Column */}
            <div className="md:col-span-7 space-y-2.5">
              {/* Room Size Inputs */}
              {inputMode === "dimensions" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="tile-room-length" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block">
                      Room Length
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="tile-room-length"
                        type="number"
                        value={roomLength}
                        onChange={(e) => setRoomLength(e.target.value)}
                        min={0.1}
                        step={0.5}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="tile-room-length-unit"
                        aria-label="Room length unit"
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
                    <label htmlFor="tile-room-width" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block">
                      Room Width
                    </label>
                    <div className="flex gap-1">
                      <Input
                        id="tile-room-width"
                        type="number"
                        value={roomWidth}
                        onChange={(e) => setRoomWidth(e.target.value)}
                        min={0.1}
                        step={0.5}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                      />
                      <select
                        id="tile-room-width-unit"
                        aria-label="Room width unit"
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
                <div className="grid grid-cols-12 gap-2 items-center text-xs">
                  <label htmlFor="tile-total-area" className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate">
                    Total Surface Area
                  </label>
                  <div className="col-span-4">
                    <Input
                      id="tile-total-area"
                      type="number"
                      value={totalAreaSqFt}
                      onChange={(e) => setTotalAreaSqFt(e.target.value)}
                      min={0.1}
                      step={1}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-3 text-[11px] text-zinc-500 font-medium">sq ft</div>
                </div>
              )}

              {/* Tile Size Inputs & Presets */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">Tile Dimensions:</span>
                  <div className="flex items-center gap-1 text-[10px] no-print">
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
                    <label htmlFor="tile-length" className="text-[10px] text-zinc-500 block">Length</label>
                    <Input
                      id="tile-length"
                      type="number"
                      value={tileLength}
                      onChange={(e) => setTileLength(e.target.value)}
                      min={0.1}
                      step={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="tile-width" className="text-[10px] text-zinc-500 block">Width</label>
                    <Input
                      id="tile-width"
                      type="number"
                      value={tileWidth}
                      onChange={(e) => setTileWidth(e.target.value)}
                      min={0.1}
                      step={0.5}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="tile-unit" className="text-[10px] text-zinc-500 block">Unit</label>
                    <select
                      id="tile-unit"
                      aria-label="Tile unit of measurement"
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
                  <label htmlFor="tile-grout-width" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Grout Joint Gap Width:
                  </label>
                  <select
                    id="tile-grout-width"
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
                  <label htmlFor="tile-pattern" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Layout Pattern:
                  </label>
                  <select
                    id="tile-pattern"
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
                  <label htmlFor="tile-waste-percent" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Waste Factor (%):
                  </label>
                  <div className="flex gap-1 items-center">
                    <Input
                      id="tile-waste-percent"
                      type="number"
                      value={wastePercent}
                      onChange={(e) => setWastePercent(e.target.value)}
                      min={0}
                      max={100}
                      step={1}
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <span className="text-xs text-zinc-500 font-medium">%</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="tile-box-size" className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-0.5">
                    Box Size (Tiles / Box):
                  </label>
                  <Input
                    id="tile-box-size"
                    type="number"
                    value={tilesPerBox}
                    onChange={(e) => setTilesPerBox(e.target.value)}
                    min={1}
                    step={1}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              {/* Price Row (optional) */}
              <div className="grid grid-cols-12 gap-2 items-center text-xs pt-1">
                <label htmlFor="tile-price-per-unit" className="col-span-4 font-medium text-zinc-700 dark:text-zinc-300">
                  Tile Price (optional)
                </label>
                <div className="col-span-4">
                  <Input
                    id="tile-price-per-unit"
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
                    id="tile-pricing-type"
                    aria-label="Pricing unit"
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

              {/* Calculate / Clear Buttons */}
              <div className="flex gap-2 pt-1 no-print">
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
                    setCard1Error(null);
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
                groutIn={groutJointWidth.trim() !== "" ? Number(groutJointWidth) : 0.125}
              />
            </div>
          </div>

          {/* Results Summary */}
          {tileResult && (
            <div className="space-y-2 pt-2" aria-live="polite">
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

              {/* Card 1 Action Toolbar: Copy & CSV */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs no-print">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c1_res",
                        `${tileResult.totalTilesNeeded} Tiles (${tileResult.totalBoxesNeeded} Boxes) for ${tileResult.roomAreaSqFt} sq ft (${tileResult.estimatedGroutLbs} lbs Grout, ${tileResult.mortarBagsNeeded} Mortar Bags)`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy result to clipboard"
                  >
                    {actionFeedback["c1_res"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {actionFeedback["c1_res"] || "Copy Result"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c1_sum",
                        `Tile Takeoff Summary:
• Surface Area: ${tileResult.roomAreaSqFt} sq ft (${tileResult.roomAreaSqM} m²)
• Tile Dimensions: ${tileResult.tileLengthInches}" × ${tileResult.tileWidthInches}" (${tileResult.singleTileAreaSqFt} sq ft/tile)
• Grout Joint: ${tileResult.groutWidthInches}"
• Layout Pattern: ${tileResult.pattern.replace("_", " ")}
• Net Tiles: ${tileResult.netTilesNeeded}
• Purchased Tiles (+${tileResult.wastePercent}% waste): ${tileResult.totalTilesNeeded} (${tileResult.wasteTilesCount} scrap)
• Packaging: ${tileResult.totalBoxesNeeded} Boxes (@${tileResult.tilesPerBox} pcs/box)
• Grout Required: ${tileResult.estimatedGroutLbs} lbs (~${tileResult.groutBagsNeeded} × 25-lb bags)
• Mortar Required: ${tileResult.mortarBagsNeeded} Bags (50-lb)
• Recommended Trowel: ${tileResult.recommendedTrowel}`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy detailed summary to clipboard"
                  >
                    {actionFeedback["c1_sum"] ? <Check className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3" />}
                    {actionFeedback["c1_sum"] || "Copy Summary"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c1_latex",
                        `A = ${tileResult.roomAreaSqFt}\\text{ ft}^2, \\quad A_{\\text{eff}} = (${tileResult.tileLengthInches} + ${tileResult.groutWidthInches})(${tileResult.tileWidthInches} + ${tileResult.groutWidthInches}) = ${(
                          (tileResult.tileLengthInches + tileResult.groutWidthInches) *
                          (tileResult.tileWidthInches + tileResult.groutWidthInches)
                        ).toFixed(3)}\\text{ in}^2 \\\\
N_{\\text{net}} = \\left\\lceil \\frac{A \\times 144}{A_{\\text{eff}}} \\right\\rceil = ${tileResult.netTilesNeeded} \\\\
N_{\\text{total}} = \\left\\lceil N_{\\text{net}} \\times \\left(1 + \\frac{${tileResult.wastePercent}}{100}\\right) \\right\\rceil = ${tileResult.totalTilesNeeded} \\\\
\\text{Boxes} = \\left\\lceil \\frac{N_{\\text{total}}}{${tileResult.tilesPerBox}} \\right\\rceil = ${tileResult.totalBoxesNeeded}\\text{ boxes}`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy calculation formulas in LaTeX format"
                  >
                    {actionFeedback["c1_latex"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3" />}
                    {actionFeedback["c1_latex"] || "Copy LaTeX"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={exportCard1Csv}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-[11px] font-bold cursor-pointer transition-colors"
                  aria-label="Export active tile quantity takeoff as CSV"
                >
                  <Download className="w-3 h-3" />
                  {actionFeedback["c1_csv"] || "Export CSV"}
                </button>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...tileSaved}
          cardTitle="Tile Quantity"
          formatSummary={(r) => `${r.totalTilesNeeded} tiles (${r.totalBoxesNeeded} boxes), ${r.roomAreaSqFt} sq ft`}
          onRestore={restoreCard1}
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
          const raw: TileCostRawInputs = {
            costSqFt,
            tileCostRate,
            groutBagCost,
            mortarBagCost,
            sundriesCost,
            laborRatePerSqFt,
            salesTaxRate,
          };
          costSaved.save(
            `Area: ${costSqFt} sq ft, Total: $${costResult.grandTotalProjectCost.toFixed(2)} ($${costResult.costPerSquareFoot.toFixed(2)}/sq ft)`,
            raw,
            costResult
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {card2Error && (
            <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 font-medium">
              {card2Error}
            </div>
          )}

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
                  setCard2Error(null);
                }}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer no-print"
                aria-label="Reset cost rates to standard defaults"
              >
                Reset Default Rates
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <div>
                <label htmlFor="cost-tile-area" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Tile Area (sq ft)
                </label>
                <Input
                  id="cost-tile-area"
                  type="number"
                  value={costSqFt}
                  onChange={(e) => setCostSqFt(e.target.value)}
                  min={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="cost-tile-rate" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Tile Cost ($/sq ft)
                </label>
                <Input
                  id="cost-tile-rate"
                  type="number"
                  value={tileCostRate}
                  onChange={(e) => setTileCostRate(e.target.value)}
                  min={0}
                  step={0.5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="cost-grout-cost" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Grout ($/bag)
                </label>
                <Input
                  id="cost-grout-cost"
                  type="number"
                  value={groutBagCost}
                  onChange={(e) => setGroutBagCost(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="cost-mortar-cost" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Thin-Set ($/bag)
                </label>
                <Input
                  id="cost-mortar-cost"
                  type="number"
                  value={mortarBagCost}
                  onChange={(e) => setMortarBagCost(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="cost-labor-rate" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Setter Labor ($/sq ft)
                </label>
                <Input
                  id="cost-labor-rate"
                  type="number"
                  value={laborRatePerSqFt}
                  onChange={(e) => setLaborRatePerSqFt(e.target.value)}
                  min={0}
                  step={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label htmlFor="cost-sales-tax" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                  Sales Tax (%)
                </label>
                <Input
                  id="cost-sales-tax"
                  type="number"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(e.target.value)}
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
              onClick={handleCostCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Project Cost
            </Button>
          </div>

          {costResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
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
                      <td className="py-1">${Number(tileCostRate).toFixed(2)}/sq ft</td>
                      <td className="py-1 text-right font-semibold">${costResult.tileMaterialSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Grout (25-lb Bags)</td>
                      <td className="py-1">{tileResult ? tileResult.groutBagsNeeded : 1} bags</td>
                      <td className="py-1">${Number(groutBagCost).toFixed(2)}/bag</td>
                      <td className="py-1 text-right font-semibold">${costResult.groutSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Thin-Set Mortar (50-lb Bags)</td>
                      <td className="py-1">{tileResult ? tileResult.mortarBagsNeeded : 2} bags</td>
                      <td className="py-1">${Number(mortarBagCost).toFixed(2)}/bag</td>
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
                      <td className="py-1">${Number(laborRatePerSqFt).toFixed(2)}/sq ft</td>
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

              {/* Card 2 Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs no-print">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c2_res",
                        `Total Project Investment: $${costResult.grandTotalProjectCost.toFixed(2)} ($${costResult.costPerSquareFoot.toFixed(2)}/sq ft for ${costSqFt} sq ft)`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy project cost to clipboard"
                  >
                    {actionFeedback["c2_res"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {actionFeedback["c2_res"] || "Copy Result"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c2_sum",
                        `Tile Installation Budget (${costSqFt} sq ft):
• Tile Materials: $${costResult.tileMaterialSubtotal.toFixed(2)}
• Grout: $${costResult.groutSubtotal.toFixed(2)}
• Thin-Set Mortar: $${costResult.mortarSubtotal.toFixed(2)}
• Sundries: $${costResult.sundriesSubtotal.toFixed(2)}
• Total Materials: $${costResult.materialsTotal.toFixed(2)}
• Setter Labor: $${costResult.laborSubtotal.toFixed(2)}
• Sales Tax (${salesTaxRate}% on materials): $${costResult.salesTaxAmount.toFixed(2)}
• Grand Total: $${costResult.grandTotalProjectCost.toFixed(2)} ($${costResult.costPerSquareFoot.toFixed(2)}/sq ft)`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy itemized budget summary to clipboard"
                  >
                    {actionFeedback["c2_sum"] ? <Check className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3" />}
                    {actionFeedback["c2_sum"] || "Copy Summary"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c2_latex",
                        `\\text{Materials} = \\$${costResult.materialsTotal.toFixed(2)}, \\quad \\text{Labor} = \\$${costResult.laborSubtotal.toFixed(2)}, \\quad \\text{Tax} = \\$${costResult.salesTaxAmount.toFixed(2)} \\\\
\\text{Total Cost} = \\text{Materials} + \\text{Labor} + \\text{Tax} = \\$${costResult.grandTotalProjectCost.toFixed(2)} \\\\
\\text{Unit Investment} = \\frac{\\$${costResult.grandTotalProjectCost.toFixed(2)}}{${costSqFt}\\text{ ft}^2} = \\$${costResult.costPerSquareFoot.toFixed(2)}/\\text{ft}^2`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy budget formulas in LaTeX format"
                  >
                    {actionFeedback["c2_latex"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Sparkles className="w-3 h-3" />}
                    {actionFeedback["c2_latex"] || "Copy LaTeX"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={exportCard2Csv}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-[11px] font-bold cursor-pointer transition-colors"
                  aria-label="Export budget breakdown as CSV"
                >
                  <Download className="w-3 h-3" />
                  {actionFeedback["c2_csv"] || "Export CSV"}
                </button>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...costSaved}
          cardTitle="Tile Cost"
          formatSummary={(r) => `$${r.grandTotalProjectCost.toFixed(2)} ($${r.costPerSquareFoot.toFixed(2)}/sq ft)`}
          onRestore={restoreCard2}
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
          const raw: TileMultiRoomRawInputs = {
            rooms,
            multiRoomWaste,
          };
          multiRoomSaved.save(
            `${rooms.length} Rooms, Net Area: ${multiRoomResult.totalNetSqFt} sq ft, ${multiRoomResult.totalTilesWithWaste} tiles`,
            raw,
            multiRoomResult
          );
          flashSave(setMultiRoomSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {card3Error && (
            <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 font-medium">
              {card3Error}
            </div>
          )}

          <div className="flex items-center justify-between no-print">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">
              Rooms &amp; Sections ({rooms.length}):
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={addRoomRow}
              className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
              aria-label="Add new room or floor section"
            >
              <Plus className="w-3.5 h-3.5" /> Add Room Section
            </Button>
          </div>

          {/* Table Column Headers */}
          <div className="grid grid-cols-12 gap-1.5 px-2 py-1.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-md border border-blue-200/70 dark:border-blue-900/50 text-[11px] font-bold text-blue-900 dark:text-blue-200">
            <div className="col-span-4">Room / Area Name</div>
            <div className="col-span-3">Length (ft)</div>
            <div className="col-span-2">Width (ft)</div>
            <div className="col-span-2 truncate" title="Deductions: Kitchen Islands, Bathtubs, Vanities, Fireplaces">
              Deduct (sq ft)
            </div>
            <div className="col-span-1 text-right no-print">Del</div>
          </div>

          {/* Dynamic Rooms List */}
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {rooms.map((room, idx) => (
              <div
                key={room.id}
                className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
              >
                <div className="col-span-4">
                  <Input
                    id={`room-name-${idx}`}
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoomRow(room.id, "name", e.target.value)}
                    className="h-7 text-xs bg-white dark:bg-zinc-800"
                    placeholder="e.g. Master Bath"
                    aria-label={`Room ${idx + 1} Name`}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    id={`room-length-${idx}`}
                    type="number"
                    value={room.lengthFt}
                    onChange={(e) => updateRoomRow(room.id, "lengthFt", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Length (ft)"
                    min={0.1}
                    step={0.5}
                    aria-label={`Room ${idx + 1} Length in feet`}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id={`room-width-${idx}`}
                    type="number"
                    value={room.widthFt}
                    onChange={(e) => updateRoomRow(room.id, "widthFt", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Width (ft)"
                    min={0.1}
                    step={0.5}
                    aria-label={`Room ${idx + 1} Width in feet`}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    id={`room-deduct-${idx}`}
                    type="number"
                    value={room.deductionSqFt}
                    onChange={(e) => updateRoomRow(room.id, "deductionSqFt", Number(e.target.value))}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    placeholder="Deduct (sq ft)"
                    min={0}
                    step={1}
                    aria-label={`Room ${idx + 1} Deduction area in square feet`}
                  />
                </div>
                <div className="col-span-1 flex justify-end no-print">
                  <button
                    type="button"
                    onClick={() => removeRoomRow(room.id)}
                    disabled={rooms.length <= 1}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                    title="Delete Room"
                    aria-label={`Delete ${room.name || "Room"}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-1 no-print">
            <Button
              onClick={handleMultiRoomCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Aggregate All Rooms
            </Button>
          </div>

          {multiRoomResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
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

              {/* Card 3 Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs no-print">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c3_res",
                        `${multiRoomResult.totalNetSqFt} sq ft Net Area, ${multiRoomResult.totalTilesWithWaste} Tiles (${multiRoomResult.totalBoxesNeeded} Boxes) across ${rooms.length} rooms`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy multi-room result to clipboard"
                  >
                    {actionFeedback["c3_res"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {actionFeedback["c3_res"] || "Copy Result"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c3_sum",
                        `Multi-Room Tile Aggregation (${rooms.length} areas):
${rooms
  .map(
    (r) =>
      `• ${r.name}: ${r.lengthFt}×${r.widthFt} ft = ${r.lengthFt * r.widthFt} sq ft (Deduct ${r.deductionSqFt} sq ft) = ${Math.max(
        0,
        r.lengthFt * r.widthFt - r.deductionSqFt
      )} sq ft net`
  )
  .join("\n")}
Total Gross: ${multiRoomResult.totalGrossSqFt} sq ft | Deductions: ${multiRoomResult.totalDeductionsSqFt} sq ft
Total Net Area: ${multiRoomResult.totalNetSqFt} sq ft (${multiRoomResult.totalNetSqM} m²)
Total Tiles (+${multiRoomWaste}% waste): ${multiRoomResult.totalTilesWithWaste} pcs (${multiRoomResult.totalBoxesNeeded} Boxes)
Materials: ${multiRoomResult.totalGroutBagsNeeded} Grout Bags / ${multiRoomResult.totalMortarBagsNeeded} Mortar Bags`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy multi-room summary to clipboard"
                  >
                    {actionFeedback["c3_sum"] ? <Check className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3" />}
                    {actionFeedback["c3_sum"] || "Copy Summary"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={exportCard3Csv}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-[11px] font-bold cursor-pointer transition-colors"
                  aria-label="Export multi-room breakdown as CSV"
                >
                  <Download className="w-3 h-3" />
                  {actionFeedback["c3_csv"] || "Export CSV"}
                </button>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...multiRoomSaved}
          cardTitle="Multi-Room"
          formatSummary={(r) => `${r.totalNetSqFt} sq ft, ${r.totalTilesWithWaste} tiles (${r.totalBoxesNeeded} boxes)`}
          onRestore={restoreCard3}
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
          const raw: TileGroutRawInputs = {
            groutArea,
            groutType,
            tileThickness,
            groutJointWidth,
          };
          groutSaved.save(
            `${groutResult.groutLbs} lbs Grout (${groutResult.groutType}), ${groutResult.mortarBags50lb} Mortar Bags for ${groutArea} sq ft`,
            raw,
            groutResult
          );
          flashSave(setGroutSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {card4Error && (
            <div role="alert" className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-700 dark:text-red-300 font-medium">
              {card4Error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="grout-surface-area" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Surface Area to Grout (sq ft):
              </label>
              <Input
                id="grout-surface-area"
                type="number"
                value={groutArea}
                onChange={(e) => setGroutArea(e.target.value)}
                min={1}
                step={1}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label htmlFor="grout-type-select" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Grout Formulation Type:
              </label>
              <select
                id="grout-type-select"
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
              <label htmlFor="grout-tile-thickness" className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Tile Thickness / Depth (in):
              </label>
              <select
                id="grout-tile-thickness"
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

          <div className="flex gap-2 no-print">
            <Button
              onClick={handleGroutCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Grout &amp; Mortar
            </Button>
          </div>

          {groutResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
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

              {/* Card 4 Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 text-xs no-print">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c4_res",
                        `${groutResult.groutLbs} lbs Grout (${groutResult.bags25lb} × 25-lb bags), ${groutResult.mortarBags50lb} Thin-Set Bags (50-lb) for ${groutArea} sq ft`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy grout result to clipboard"
                  >
                    {actionFeedback["c4_res"] ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    {actionFeedback["c4_res"] || "Copy Result"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        "c4_sum",
                        `TCNA Grout & Mortar Estimate (${groutArea} sq ft):
• Total Grout Weight: ${groutResult.groutLbs} lbs (${groutResult.groutKg} kg)
• Packaging: ${groutResult.bags25lb} × 25-lb bags (or ${groutResult.bags10lb} × 10-lb bags)
• Thin-Set Mortar: ${groutResult.mortarBags50lb} × 50-lb bags
• Recommended Trowel: ${groutResult.trowelRecommendation} (~${groutResult.trowelCoverageSqFtPerBag} sq ft/bag)
• TCNA Formulation: ${groutResult.recommendedGroutType}`
                      )
                    }
                    className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold cursor-pointer transition-colors"
                    aria-label="Copy grout summary to clipboard"
                  >
                    {actionFeedback["c4_sum"] ? <Check className="w-3 h-3 text-emerald-600" /> : <FileText className="w-3 h-3" />}
                    {actionFeedback["c4_sum"] || "Copy Summary"}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={exportCard4Csv}
                  className="flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 text-[11px] font-bold cursor-pointer transition-colors"
                  aria-label="Export grout and mortar estimate as CSV"
                >
                  <Download className="w-3 h-3" />
                  {actionFeedback["c4_csv"] || "Export CSV"}
                </button>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...groutSaved}
          cardTitle="Grout &amp; Mortar"
          formatSummary={(r) => `${r.groutLbs} lbs Grout (${r.bags25lb} × 25-lb bags), ${r.mortarBags50lb} Mortar Bags`}
          onRestore={restoreCard4}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 no-print">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
          aria-label="Generate full printable tile takeoff report"
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
export default TileCalculator;
