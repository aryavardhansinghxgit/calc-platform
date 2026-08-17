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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  PITCH_TABLE,
  ShingleType,
  UnderlaymentType,
  RoofStyle,
  RoofPlane,
  getPitchInfo,
  getPitchFromAngle,
  calculateFootprintArea,
  calculateMultiPitchRoof,
  calculateRoofingMaterials,
  calculateRoofingCost,
  FootprintAreaResult,
  MultiPitchResult,
  MaterialEstimateResult,
  RoofingCostResult,
} from "@/lib/calculator-engine/formulas/roofing";

// ─── Types & Local Storage Hook ─────────────────────────────────────────────

interface SavedRoofEstimate<T> {
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
  const [saved, setSaved] = useState<SavedRoofEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedRoofEstimate<T> = {
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
  saved: SavedRoofEstimate<T>[];
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
    a.download = `roofing_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
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

// ─── 2D SVG Scaled Roof Diagrams ────────────────────────────────────────────

function RoofPitchDiagram2D({ pitchRise, style = "gable" }: { pitchRise: number; style?: RoofStyle }) {
  const pitch = getPitchInfo(pitchRise);
  const risePx = Math.min(65, Math.max(15, pitch.rise * 5.5));

  return (
    <svg
      viewBox="0 0 280 180"
      className="w-full max-w-[270px] mx-auto select-none"
      aria-label="Roof Pitch and Overhang 2D Scaled Diagram"
    >
      <defs>
        <marker id="roof-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
        <marker id="roof-arr-l" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
          <path d="M5,0.5 L1,3 L5,5.5 Z" fill="#27272a" className="dark:fill-zinc-300" />
        </marker>
      </defs>

      {/* House Base Box (Grey) */}
      <rect x="55" y="115" width="170" height="45" fill="#3b82f6" fillOpacity="0.15" stroke="#2563eb" strokeWidth="1.2" />
      <text x="140" y="142" textAnchor="middle" className="text-[9.5px] fill-blue-900 dark:fill-blue-200 font-bold">
        base area
      </text>

      {/* Dynamic Roof Shape based on style */}
      {style === "shed" ? (
        <polygon
          points={`35,${115 - risePx} 245,115 245,115 35,115`}
          fill="#2563eb"
          fillOpacity="0.85"
          stroke="#1d4ed8"
          strokeWidth="1.5"
        />
      ) : style === "hip" ? (
        <polygon
          points={`35,115 90,${115 - risePx} 190,${115 - risePx} 245,115`}
          fill="#2563eb"
          fillOpacity="0.85"
          stroke="#1d4ed8"
          strokeWidth="1.5"
        />
      ) : (
        <polygon
          points={`35,115 140,${115 - risePx} 245,115`}
          fill="#2563eb"
          fillOpacity="0.85"
          stroke="#1d4ed8"
          strokeWidth="1.5"
        />
      )}

      {/* Pitch Triangle Helper (Rise/Run) on right slope */}
      <polygon
        points={`140,${115 - risePx} 190,${115 - risePx} 190,${115 - risePx + (risePx * 50) / 105}`}
        fill="white"
        fillOpacity="0.9"
        stroke="#1e293b"
        strokeWidth="0.8"
      />
      <text x="165" y={`${112 - risePx}`} textAnchor="middle" className="text-[7.5px] fill-zinc-800 font-bold">
        run (12")
      </text>
      <text x="194" y={`${115 - risePx + (risePx * 25) / 105}`} textAnchor="start" className="text-[7.5px] fill-zinc-800 font-bold">
        rise ({pitch.rise}")
      </text>

      {/* Angle Arc on right */}
      <path d={`M 225,115 A 20,20 0 0,0 230,${115 - 8}`} fill="none" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="210" y="105" textAnchor="end" className="text-[8px] fill-amber-700 dark:fill-amber-300 font-bold">
        {pitch.angleDegrees}°
      </text>

      {/* Eaves Stick Out (Overhang) Dimension Line on left */}
      <line x1="35" y1="125" x2="55" y2="125" stroke="#18181b" strokeWidth="0.9" markerStart="url(#roof-arr-l)" markerEnd="url(#roof-arr)" className="dark:stroke-zinc-300" />
      <text x="45" y="136" textAnchor="middle" className="text-[7.5px] fill-zinc-700 dark:fill-zinc-300 font-medium">
        eaves
      </text>

      {/* Eaves Stick Out Dimension Line on right */}
      <line x1="225" y1="125" x2="245" y2="125" stroke="#18181b" strokeWidth="0.9" markerStart="url(#roof-arr-l)" markerEnd="url(#roof-arr)" className="dark:stroke-zinc-300" />
      <text x="235" y="136" textAnchor="middle" className="text-[7.5px] fill-zinc-700 dark:fill-zinc-300 font-medium">
        stick out
      </text>

      {/* Pitch Notation Banner */}
      <rect x="70" y="162" width="140" height="15" rx="3" fill="#1e293b" />
      <text x="140" y="172.5" textAnchor="middle" className="text-[8px] fill-white font-bold capitalize">
        {style} Roof: {pitch.pitchString} ({pitch.multiplier}x)
      </text>
    </svg>
  );
}

function RoofStyleWireframeDiagram({ style }: { style: RoofStyle }) {
  if (style === "gable") {
    return (
      <svg viewBox="0 0 200 110" className="w-full max-w-[190px] mx-auto select-none" aria-label="Gable Roof Wireframe">
        <polygon points="20,80 100,25 180,80" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="100" y1="25" x2="100" y2="80" stroke="#1e3a8a" strokeWidth="1" strokeDasharray="3,3" />
        <rect x="25" y="80" width="150" height="18" fill="#cbd5e1" fillOpacity="0.5" stroke="#64748b" strokeWidth="1" />
        <text x="60" y="55" className="text-[8.5px] fill-blue-900 dark:fill-blue-200 font-bold">Front Slope</text>
        <text x="140" y="55" className="text-[8.5px] fill-blue-900 dark:fill-blue-200 font-bold">Rear Slope</text>
        <text x="100" y="18" textAnchor="middle" className="text-[7.5px] fill-zinc-700 dark:fill-zinc-300 font-bold">Ridge Line</text>
      </svg>
    );
  }

  if (style === "hip") {
    return (
      <svg viewBox="0 0 200 110" className="w-full max-w-[190px] mx-auto select-none" aria-label="Hip Roof Wireframe">
        <polygon points="20,85 60,35 140,35 180,85" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
        <polygon points="20,85 60,35 20,85" fill="#60a5fa" fillOpacity="0.3" stroke="#2563eb" strokeWidth="1.2" />
        <polygon points="180,85 140,35 180,85" fill="#60a5fa" fillOpacity="0.3" stroke="#2563eb" strokeWidth="1.2" />
        <line x1="60" y1="35" x2="140" y2="35" stroke="#1e3a8a" strokeWidth="2" />
        <rect x="20" y="85" width="160" height="16" fill="#cbd5e1" fillOpacity="0.5" stroke="#64748b" strokeWidth="1" />
        <text x="100" y="62" textAnchor="middle" className="text-[8.5px] fill-blue-900 dark:fill-blue-200 font-bold">Front &amp; Rear (4 Hips)</text>
        <text x="100" y="28" textAnchor="middle" className="text-[7.5px] fill-zinc-700 dark:fill-zinc-300 font-bold">Center Ridge</text>
      </svg>
    );
  }

  if (style === "shed") {
    return (
      <svg viewBox="0 0 200 110" className="w-full max-w-[190px] mx-auto select-none" aria-label="Shed Roof Wireframe">
        <polygon points="25,40 175,75 175,95 25,95" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="25" y1="40" x2="175" y2="75" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="25" y="95" width="150" height="10" fill="#cbd5e1" stroke="#64748b" strokeWidth="1" />
        <text x="100" y="60" textAnchor="middle" className="text-[8.5px] fill-blue-900 dark:fill-blue-200 font-bold">Single Mono-Pitch Slope</text>
        <text x="100" y="32" textAnchor="middle" className="text-[7.5px] fill-zinc-700 dark:fill-zinc-300 font-bold">High Eave / Single Ridge</text>
      </svg>
    );
  }

  if (style === "gambrel") {
    return (
      <svg viewBox="0 0 200 110" className="w-full max-w-[190px] mx-auto select-none" aria-label="Gambrel Barn Roof Wireframe">
        <polygon points="25,80 50,45 100,20 150,45 175,80" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
        <rect x="25" y="80" width="150" height="18" fill="#cbd5e1" fillOpacity="0.5" stroke="#64748b" strokeWidth="1" />
        <text x="100" y="35" textAnchor="middle" className="text-[7.5px] fill-blue-900 dark:fill-blue-200 font-bold">Upper Shallow (5/12)</text>
        <text x="35" y="65" textAnchor="middle" className="text-[7px] fill-blue-950 dark:fill-blue-100 font-bold">Lower Steep</text>
        <text x="165" y="65" textAnchor="middle" className="text-[7px] fill-blue-950 dark:fill-blue-100 font-bold">Lower Steep</text>
      </svg>
    );
  }

  // Mansard
  return (
    <svg viewBox="0 0 200 110" className="w-full max-w-[190px] mx-auto select-none" aria-label="Mansard Roof Wireframe">
      <polygon points="20,80 45,35 155,35 180,80" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="1.5" />
      <line x1="45" y1="35" x2="155" y2="35" stroke="#1e3a8a" strokeWidth="1.5" />
      <rect x="20" y="80" width="160" height="18" fill="#cbd5e1" fillOpacity="0.5" stroke="#64748b" strokeWidth="1" />
      <text x="100" y="30" textAnchor="middle" className="text-[7.5px] fill-blue-900 dark:fill-blue-200 font-bold">Upper Flat Deck (1/12)</text>
      <text x="100" y="60" textAnchor="middle" className="text-[8px] fill-blue-950 dark:fill-blue-100 font-bold">Steep Mansard Curb (18/12)</text>
    </svg>
  );
}

// ─── Roof Style Presets ─────────────────────────────────────────────────────

const DEFAULT_STYLE_PLANES: Record<RoofStyle, { planes: RoofPlane[]; ridge: string; valley: string }> = {
  gable: {
    planes: [
      { id: "1", name: "Front Slope", lengthFt: 50, widthFt: 22, pitchRise: 6 },
      { id: "2", name: "Rear Slope", lengthFt: 50, widthFt: 22, pitchRise: 6 },
    ],
    ridge: "50",
    valley: "0",
  },
  hip: {
    planes: [
      { id: "1", name: "Front Slope (Trapezoid)", lengthFt: 50, widthFt: 22, pitchRise: 6 },
      { id: "2", name: "Rear Slope (Trapezoid)", lengthFt: 50, widthFt: 22, pitchRise: 6 },
      { id: "3", name: "Left Hip (Triangle)", lengthFt: 40, widthFt: 22, pitchRise: 6 },
      { id: "4", name: "Right Hip (Triangle)", lengthFt: 40, widthFt: 22, pitchRise: 6 },
    ],
    ridge: "30",
    valley: "0",
  },
  shed: {
    planes: [
      { id: "1", name: "Main Mono-Pitch Slope", lengthFt: 50, widthFt: 42, pitchRise: 4 },
    ],
    ridge: "0",
    valley: "0",
  },
  gambrel: {
    planes: [
      { id: "1", name: "Lower Front Slope (Steep)", lengthFt: 50, widthFt: 12, pitchRise: 14 },
      { id: "2", name: "Upper Front Slope (Shallow)", lengthFt: 50, widthFt: 14, pitchRise: 5 },
      { id: "3", name: "Upper Rear Slope (Shallow)", lengthFt: 50, widthFt: 14, pitchRise: 5 },
      { id: "4", name: "Lower Rear Slope (Steep)", lengthFt: 50, widthFt: 12, pitchRise: 14 },
    ],
    ridge: "50",
    valley: "0",
  },
  mansard: {
    planes: [
      { id: "1", name: "Lower Front Mansard", lengthFt: 50, widthFt: 12, pitchRise: 18 },
      { id: "2", name: "Lower Rear Mansard", lengthFt: 50, widthFt: 12, pitchRise: 18 },
      { id: "3", name: "Lower Left Mansard", lengthFt: 40, widthFt: 12, pitchRise: 18 },
      { id: "4", name: "Lower Right Mansard", lengthFt: 40, widthFt: 12, pitchRise: 18 },
      { id: "5", name: "Upper Deck / Flat Roof", lengthFt: 40, widthFt: 30, pitchRise: 1 },
    ],
    ridge: "40",
    valley: "0",
  },
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function RoofingCalculator() {
  // ─── CARD 1: HOUSE FOOTPRINT & PITCH AREA ───
  const [footprintStyle, setFootprintStyle] = useState<RoofStyle>("gable");
  const [footprintMode, setFootprintMode] = useState<"dimensions" | "base_area">("dimensions");
  const [pitchInputMode, setPitchInputMode] = useState<"pitch" | "angle">("pitch");
  const [houseLength, setHouseLength] = useState("50");
  const [houseWidth, setHouseWidth] = useState("40");
  const [baseArea, setBaseArea] = useState("2000");
  const [eaveOverhang, setEaveOverhang] = useState("12"); // inches
  const [gableOverhang, setGableOverhang] = useState("12"); // inches
  const [selectedPitchRise, setSelectedPitchRise] = useState("6"); // 6/12
  const [roofAngleDeg, setRoofAngleDeg] = useState("26.6");
  const [wastePercent, setWastePercent] = useState("10");
  const [pricePerSqFt, setPricePerSqFt] = useState("");
  const [footprintResult, setFootprintResult] = useState<FootprintAreaResult | null>(null);
  const [footprintSaveSuccess, setFootprintSaveSuccess] = useState(false);
  const footprintSaved = useCardSaved<FootprintAreaResult>("saved_roof_footprint");

  // ─── CARD 2: MULTI-PITCH & ROOF STYLE ───
  const [roofStyle, setRoofStyle] = useState<RoofStyle>("gable");
  const [planes, setPlanes] = useState<RoofPlane[]>(DEFAULT_STYLE_PLANES.gable.planes);
  const [valleyLength, setValleyLength] = useState("0");
  const [ridgeLength, setRidgeLength] = useState("50");
  const [deductionArea, setDeductionArea] = useState("0");
  const [multiPitchWaste, setMultiPitchWaste] = useState("10");
  const [multiPitchResult, setMultiPitchResult] = useState<MultiPitchResult | null>(null);
  const [multiPitchSaveSuccess, setMultiPitchSaveSuccess] = useState(false);
  const multiPitchSaved = useCardSaved<MultiPitchResult>("saved_roof_multipitch");

  // Handler to switch style and auto-populate standard plane presets
  const handleRoofStyleChange = useCallback((newStyle: RoofStyle) => {
    setRoofStyle(newStyle);
    const preset = DEFAULT_STYLE_PLANES[newStyle];
    if (preset) {
      const newPlanes = preset.planes.map((p, idx) => ({
        ...p,
        id: `${newStyle}-${idx + 1}-${Date.now()}`,
      }));
      setPlanes(newPlanes);
      setRidgeLength(preset.ridge);
      setValleyLength(preset.valley);

      // Direct synchronous recalculation on style change
      const res = calculateMultiPitchRoof({
        style: newStyle,
        planes: newPlanes,
        valleyLengthFt: Number(preset.valley) || 0,
        ridgeLengthFt: Number(preset.ridge) || 0,
        deductionAreaSqFt: Number(deductionArea) || 0,
        wastePercent: Number(multiPitchWaste) || 10,
      });
      setMultiPitchResult(res);
      setMaterialTargetArea(String(Math.round(res.grossCoveredAreaSqFt)));
      setCostSquares(String(res.roofingSquares));
    }
  }, [deductionArea, multiPitchWaste]);

  // ─── CARD 3: MATERIAL & BUNDLE ESTIMATOR ───
  const [materialTargetArea, setMaterialTargetArea] = useState("2686");
  const [shingleType, setShingleType] = useState<ShingleType>("architectural");
  const [underlaymentType, setUnderlaymentType] = useState<UnderlaymentType>("synthetic");
  const [iceShieldMargin, setIceShieldMargin] = useState("3"); // 3ft or 6ft
  const [isHighWindZone, setIsHighWindZone] = useState(false);
  const [materialResult, setMaterialResult] = useState<MaterialEstimateResult | null>(null);
  const [materialSaveSuccess, setMaterialSaveSuccess] = useState(false);
  const materialSaved = useCardSaved<MaterialEstimateResult>("saved_roof_materials");

  // ─── CARD 4: ROOFING COST & CONTRACTOR QUOTE ───
  const [costSquares, setCostSquares] = useState("27");
  const [pricePerSquare, setPricePerSquare] = useState("160"); // $/sq architectural
  const [tearOffCost, setTearOffCost] = useState("50"); // $/sq removal
  const [laborCost, setLaborCost] = useState("200"); // $/sq labor
  const [permitAndDumpster, setPermitAndDumpster] = useState("650"); // lump sum
  const [salesTaxRate, setSalesTaxRate] = useState("7");
  const [costResult, setCostResult] = useState<RoofingCostResult | null>(null);
  const [costSaveSuccess, setCostSaveSuccess] = useState(false);
  const costSaved = useCardSaved<RoofingCostResult>("saved_roof_cost");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Calculation Handlers ───

  const handleFootprintCalc = useCallback(() => {
    let rise = Number(selectedPitchRise) || 6;
    if (pitchInputMode === "angle") {
      const angle = Number(roofAngleDeg) || 26.6;
      rise = getPitchFromAngle(angle).rise;
    }

    const res = calculateFootprintArea({
      style: footprintStyle,
      inputMode: footprintMode,
      houseLengthFt: Number(houseLength) || 50,
      houseWidthFt: Number(houseWidth) || 40,
      baseAreaSqFt: Number(baseArea) || 2000,
      eaveOverhangInches: Number(eaveOverhang) || 12,
      gableOverhangInches: Number(gableOverhang) || 12,
      pitchRise: rise,
      wastePercent: Number(wastePercent) || 10,
      pricePerSqFt: Number(pricePerSqFt) || 0,
    });
    setFootprintResult(res);
    setMaterialTargetArea(String(Math.round(res.totalCoveredAreaSqFt)));
    setCostSquares(String(res.roofingSquares));
  }, [
    footprintStyle,
    footprintMode,
    pitchInputMode,
    houseLength,
    houseWidth,
    baseArea,
    eaveOverhang,
    gableOverhang,
    selectedPitchRise,
    roofAngleDeg,
    wastePercent,
    pricePerSqFt,
  ]);

  const handleMultiPitchCalc = useCallback(() => {
    const res = calculateMultiPitchRoof({
      style: roofStyle,
      planes,
      valleyLengthFt: Number(valleyLength) || 0,
      ridgeLengthFt: Number(ridgeLength) || 0,
      deductionAreaSqFt: Number(deductionArea) || 0,
      wastePercent: Number(multiPitchWaste) || 10,
    });
    setMultiPitchResult(res);
    setMaterialTargetArea(String(Math.round(res.grossCoveredAreaSqFt)));
    setCostSquares(String(res.roofingSquares));
  }, [roofStyle, planes, valleyLength, ridgeLength, deductionArea, multiPitchWaste]);

  const handleMaterialCalc = useCallback(() => {
    const targetArea = Number(materialTargetArea) || 2000;
    const res = calculateRoofingMaterials({
      targetAreaSqFt: targetArea,
      shingleType,
      underlaymentType,
      iceShieldMarginFt: Number(iceShieldMargin) || 3,
      eavesLengthFt: footprintResult ? footprintResult.eavesPerimeterFt : 100,
      valleysLengthFt: Number(valleyLength) || 0,
      ridgeLengthFt: footprintResult ? footprintResult.estimatedRidgeFt : 50,
      isHighWindZone,
    });
    setMaterialResult(res);
  }, [
    materialTargetArea,
    shingleType,
    underlaymentType,
    iceShieldMargin,
    footprintResult,
    valleyLength,
    isHighWindZone,
  ]);

  const handleCostCalc = useCallback(() => {
    const res = calculateRoofingCost({
      roofingSquares: Number(costSquares) || 20,
      materialCostPerSquare: Number(pricePerSquare) || 160,
      tearOffCostPerSquare: Number(tearOffCost) || 50,
      laborCostPerSquare: Number(laborCost) || 200,
      dumpsterAndPermitCost: Number(permitAndDumpster) || 650,
      salesTaxPercent: Number(salesTaxRate) || 7,
    });
    setCostResult(res);
  }, [costSquares, pricePerSquare, tearOffCost, laborCost, permitAndDumpster, salesTaxRate]);

  // Reactive Calculation on input changes
  useEffect(() => {
    handleFootprintCalc();
  }, [handleFootprintCalc]);

  useEffect(() => {
    handleMultiPitchCalc();
  }, [handleMultiPitchCalc]);

  useEffect(() => {
    handleMaterialCalc();
  }, [handleMaterialCalc]);

  useEffect(() => {
    handleCostCalc();
  }, [handleCostCalc]);

  // Plane row modifiers for Card 2
  const addPlaneRow = () => {
    setPlanes((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Roof Slope ${prev.length + 1}`,
        lengthFt: 30,
        widthFt: 18,
        pitchRise: 6,
      },
    ]);
  };

  const removePlaneRow = (id: string) => {
    if (planes.length <= 1) return;
    setPlanes((prev) => prev.filter((p) => p.id !== id));
  };

  const updatePlaneRow = (id: string, field: keyof RoofPlane, value: any) => {
    setPlanes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (footprintResult) {
      sections.push({
        title: "Roof Surface Area & Squares",
        items: [
          { label: "Ground Footprint", value: `${footprintResult.flatFootprintSqFt} sq ft` },
          { label: "Pitch Factor", value: `${footprintResult.pitchString} (${footprintResult.pitchMultiplier}x)` },
          { label: "True Roof Surface", value: `${footprintResult.trueRoofSurfaceAreaSqFt} sq ft` },
          { label: "Waste-Adjusted Area", value: `${footprintResult.totalCoveredAreaSqFt} sq ft (+${footprintResult.wastePercent}%)` },
          { label: "Total Roofing Squares", value: `${footprintResult.roofingSquares} Squares (100 sq ft/sq)` },
          { label: "Estimated Ridge Length", value: `${footprintResult.estimatedRidgeFt} ft` },
        ],
      });
    }
    if (materialResult) {
      sections.push({
        title: "Materials & Bundles Required",
        items: [
          { label: "Shingle Type", value: materialResult.shingleType.replace("_", " ").toUpperCase() },
          { label: "Shingle Bundles Needed", value: `${materialResult.shingleBundlesNeeded} Bundles` },
          { label: "Underlayment Rolls", value: `${materialResult.underlaymentRollsNeeded} Rolls (${materialResult.underlaymentType})` },
          { label: "Ice & Water Shield", value: `${materialResult.iceShieldRollsNeeded} Rolls (${materialResult.iceShieldCoverageSqFt} sq ft)` },
          { label: "Ridge Cap Bundles", value: `${materialResult.ridgeCapBundlesNeeded} Bundles` },
          { label: "Roofing Nails Required", value: `${materialResult.nailsCountTotal} nails (~${materialResult.nailsPoundsNeeded} lbs)` },
        ],
      });
    }
    if (costResult) {
      sections.push({
        title: "Roofing Cost & Contractor Bid Range",
        items: [
          { label: "Materials Subtotal", value: `$${costResult.materialSubtotal}` },
          { label: "Tear-off / Disposal", value: `$${costResult.tearOffSubtotal}` },
          { label: "Professional Labor", value: `$${costResult.laborSubtotal}` },
          { label: "Permit & Dumpster", value: `$${costResult.dumpsterAndPermits}` },
          { label: "Total Estimated Investment", value: `$${costResult.totalEstimatedCost}` },
          { label: "Estimated Contractor Bid Range", value: `$${costResult.lowEstimateCost.toLocaleString()} – $${costResult.highEstimateCost.toLocaleString()}` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Roofing Calculator",
        reportTitle: "Roofing Takeoff & Material Estimation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        { label: "Roofing Squares", value: footprintResult ? `${footprintResult.roofingSquares} Squares` : "—", highlight: true },
        { label: "Shingle Bundles", value: materialResult ? `${materialResult.shingleBundlesNeeded} Bundles` : "—" },
        { label: "Estimated Project Cost", value: costResult ? `$${costResult.totalEstimatedCost.toLocaleString()}` : "—" },
      ],
      sections,
    };
  }, [footprintResult, materialResult, costResult]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: HOUSE FOOTPRINT & PITCH AREA ═══════════════════ */}
      <CardWrapper
        title="Roofing Area Calculator (Footprint, Pitch &amp; Squares)"
        hasResult={!!footprintResult}
        isSaved={footprintSaveSuccess}
        savedCount={footprintSaved.saved.length}
        onToggleSaved={() => footprintSaved.setIsOpen(!footprintSaved.isOpen)}
        onSave={() => {
          if (!footprintResult) return;
          footprintSaved.save(
            `Footprint: ${footprintResult.flatFootprintSqFt} sq ft, Pitch: ${footprintResult.pitchString}, ${footprintResult.roofingSquares} sq`,
            footprintResult
          );
          flashSave(setFootprintSaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Sub-Tabs: Pitch vs Angle */}
          <div className="flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setPitchInputMode("pitch")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                pitchInputMode === "pitch"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Roof Pitch (Rise/12)
            </button>
            <button
              type="button"
              onClick={() => setPitchInputMode("angle")}
              className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
                pitchInputMode === "angle"
                  ? "bg-blue-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              Roof Angle (Degrees °)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Inputs Column */}
            <div className="md:col-span-7 space-y-2.5">
              {/* Roof Style Selector for Card 1 */}
              <div className="space-y-1">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-xs">Roof Style:</span>
                <div className="flex flex-wrap items-center gap-1">
                  {(["gable", "hip", "shed", "gambrel", "mansard"] as RoofStyle[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setFootprintStyle(st);
                        handleRoofStyleChange(st); // Also sync Card 2
                      }}
                      className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize cursor-pointer transition-colors ${
                        footprintStyle === st
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-50"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Footprint Mode */}
              <div className="flex items-center gap-3 text-xs">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Input Mode:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="footprintMode"
                    checked={footprintMode === "dimensions"}
                    onChange={() => setFootprintMode("dimensions")}
                  />
                  <span>House Dimensions (L × W)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="footprintMode"
                    checked={footprintMode === "base_area"}
                    onChange={() => setFootprintMode("base_area")}
                  />
                  <span>Ground Base Area (sq ft)</span>
                </label>
              </div>

              {footprintMode === "dimensions" ? (
                <>
                  <InputRow label="House Length" value={houseLength} onChange={setHouseLength} unit="feet" />
                  <InputRow label="House Width" value={houseWidth} onChange={setHouseWidth} unit="feet" />
                </>
              ) : (
                <InputRow label="House Base Area" value={baseArea} onChange={setBaseArea} unit="square feet" />
              )}

              {/* Pitch Selector */}
              {pitchInputMode === "pitch" ? (
                <div className="grid grid-cols-12 gap-2 items-center text-xs">
                  <label className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300">
                    Roof Pitch (Rise/12)
                  </label>
                  <div className="col-span-7">
                    <select
                      value={selectedPitchRise}
                      onChange={(e) => setSelectedPitchRise(e.target.value)}
                      className="w-full h-7 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-medium text-zinc-700 dark:text-zinc-300 font-sans tabular-nums"
                    >
                      {PITCH_TABLE.map((p) => (
                        <option key={p.rise} value={p.rise}>
                          {p.pitchString} ({p.angleDegrees}° — {p.multiplier}x Multiplier)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <InputRow
                  label="Roof Incline Angle"
                  value={roofAngleDeg}
                  onChange={setRoofAngleDeg}
                  unit="degrees (°)"
                  min={1}
                  max={75}
                  step={0.5}
                />
              )}

              {/* Overhangs */}
              <div className="grid grid-cols-2 gap-2">
                <InputRow label="Eaves Overhang" value={eaveOverhang} onChange={setEaveOverhang} unit="inches" />
                <InputRow label="Gable Overhang" value={gableOverhang} onChange={setGableOverhang} unit="inches" />
              </div>

              {/* Waste Allowance */}
              <div className="grid grid-cols-12 gap-2 items-center text-xs">
                <label className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300">
                  Waste Allowance
                </label>
                <div className="col-span-7">
                  <select
                    value={wastePercent}
                    onChange={(e) => setWastePercent(e.target.value)}
                    className="w-full h-7 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
                  >
                    <option value="5">5% (Simple Gable Roof)</option>
                    <option value="10">10% (Standard Residential Gable/Hip)</option>
                    <option value="15">15% (Hip Roof with Valleys)</option>
                    <option value="20">20% (Complex Cut-up Roof with Dormers)</option>
                  </select>
                </div>
              </div>

              <InputRow
                label="Price per Sq Ft (optional)"
                value={pricePerSqFt}
                onChange={setPricePerSqFt}
                unit="$/sq ft"
                min={0}
                step={0.25}
              />

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleFootprintCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate Area
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setHouseLength("50");
                    setHouseWidth("40");
                    setBaseArea("2000");
                    setSelectedPitchRise("6");
                    setPricePerSqFt("");
                  }}
                  className="text-xs font-semibold h-8 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>

              {/* Quick 1/12 to 12/12 Pitch Selector Grid */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 block mb-1">
                  Quick Pitch Selection Buttons:
                </span>
                <div className="grid grid-cols-6 gap-1 text-[10px] font-mono">
                  {PITCH_TABLE.slice(0, 12).map((p) => (
                    <button
                      key={p.rise}
                      type="button"
                      onClick={() => {
                        setSelectedPitchRise(String(p.rise));
                        setPitchInputMode("pitch");
                      }}
                      className={`p-1 rounded border text-center cursor-pointer transition-colors ${
                        selectedPitchRise === String(p.rise)
                          ? "bg-blue-600 text-white border-blue-600 font-bold"
                          : "bg-slate-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50"
                      }`}
                    >
                      {p.pitchString}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: 2D Scaled SVG Diagram */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <RoofPitchDiagram2D pitchRise={Number(selectedPitchRise) || 6} style={footprintStyle} />
            </div>
          </div>

          {/* Results Summary */}
          {footprintResult && (
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Total Roofing Squares</span>
                  <span className="text-2xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {footprintResult.roofingSquares}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">({footprintResult.roofingSquaresRaw} raw sq)</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">True Roof Surface Area</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {footprintResult.trueRoofSurfaceAreaSqFt.toLocaleString()}{" "}
                    <span className="text-xs font-normal">sq ft</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">Flat: {footprintResult.flatFootprintSqFt} sq ft</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">With {footprintResult.wastePercent}% Waste</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {footprintResult.totalCoveredAreaSqFt.toLocaleString()}{" "}
                    <span className="text-xs font-normal">sq ft</span>
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">Waste: +{footprintResult.wasteAreaSqFt} sq ft</span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Pitch Factor Multiplier</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {footprintResult.pitchMultiplier}x
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">{footprintResult.pitchAngleDeg}° Incline</span>
                </div>
              </div>

              {/* Secondary Linear Dimensions */}
              <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700 text-[11px] font-sans tabular-nums flex flex-wrap items-center justify-between gap-2">
                <span>• Estimated Ridge Length: <strong>{footprintResult.estimatedRidgeFt} ft</strong></span>
                <span>• Total Eaves Perimeter: <strong>{footprintResult.eavesPerimeterFt} ft</strong></span>
                <span>• Total Rakes Perimeter: <strong>{footprintResult.rakesPerimeterFt} ft</strong></span>
                {footprintResult.estimatedCost > 0 && (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    • Total Cost: ${footprintResult.estimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...footprintSaved}
          cardTitle="Roof Area"
          formatSummary={(r) => `${r.roofingSquares} sq (${r.totalCoveredAreaSqFt} sq ft), ${r.pitchString}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: MULTI-PITCH & ROOF STYLE ═══════════════════ */}
      <CardWrapper
        title="Multi-Pitch &amp; Complex Roof Plane Calculator"
        hasResult={!!multiPitchResult}
        isSaved={multiPitchSaveSuccess}
        savedCount={multiPitchSaved.saved.length}
        onToggleSaved={() => multiPitchSaved.setIsOpen(!multiPitchSaved.isOpen)}
        onSave={() => {
          if (!multiPitchResult) return;
          multiPitchSaved.save(
            `${roofStyle.toUpperCase()} Roof (${planes.length} planes), ${multiPitchResult.roofingSquares} sq`,
            multiPitchResult
          );
          flashSave(setMultiPitchSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          {/* Top: Roof Style Selector (Quick Buttons + Dropdown) */}
          <div className="space-y-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Select Roof Architecture Style:</span>
              <div className="flex items-center gap-1">
                {(["gable", "hip", "shed", "gambrel", "mansard"] as RoofStyle[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleRoofStyleChange(st)}
                    className={`px-2 py-1 rounded text-[11px] font-bold capitalize cursor-pointer transition-colors ${
                      roofStyle === st
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-blue-50"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-500 font-medium">Dropdown:</span>
                <select
                  value={roofStyle}
                  onChange={(e) => handleRoofStyleChange(e.target.value as RoofStyle)}
                  className="h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-semibold text-xs cursor-pointer"
                >
                  <option value="gable">Gable Roof (2 Slopes, Standard)</option>
                  <option value="hip">Hip Roof (4 Slopes, Pyramid/Hips)</option>
                  <option value="shed">Shed Roof (1 Mono-Pitch Slope)</option>
                  <option value="gambrel">Gambrel Barn Roof (4 Dual-Pitch Slopes)</option>
                  <option value="mansard">Mansard Roof (4 Steep Slopes + Flat Deck)</option>
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={addPlaneRow}
                className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Slope Plane
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left: Dynamic Plane Rows */}
            <div className="md:col-span-8 space-y-2">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 block">
                Surface Slope Planes ({planes.length}):
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {planes.map((plane) => (
                  <div
                    key={plane.id}
                    className="grid grid-cols-12 gap-1.5 items-center bg-slate-50 dark:bg-zinc-800/40 p-1.5 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
                  >
                    <div className="col-span-4">
                      <Input
                        type="text"
                        value={plane.name}
                        onChange={(e) => updatePlaneRow(plane.id, "name", e.target.value)}
                        className="h-7 text-xs bg-white dark:bg-zinc-800"
                        placeholder="Plane Name"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={plane.lengthFt}
                        onChange={(e) => updatePlaneRow(plane.id, "lengthFt", Number(e.target.value))}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="Length (ft)"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={plane.widthFt}
                        onChange={(e) => updatePlaneRow(plane.id, "widthFt", Number(e.target.value))}
                        className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                        placeholder="Width (ft)"
                      />
                    </div>
                    <div className="col-span-2">
                      <select
                        value={plane.pitchRise}
                        onChange={(e) => updatePlaneRow(plane.id, "pitchRise", Number(e.target.value))}
                        className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans tabular-nums"
                      >
                        {PITCH_TABLE.slice(0, 18).map((p) => (
                          <option key={p.rise} value={p.rise}>
                            {p.pitchString}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removePlaneRow(plane.id)}
                        disabled={planes.length <= 1}
                        className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                        title="Delete plane"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deductions & Linear Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                <InputRow label="Deduction Area" value={deductionArea} onChange={setDeductionArea} unit="sq ft" />
                <InputRow label="Ridge Length" value={ridgeLength} onChange={setRidgeLength} unit="ft" />
                <InputRow label="Valley Length" value={valleyLength} onChange={setValleyLength} unit="ft" />
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={handleMultiPitchCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
                >
                  Calculate Multi-Pitch Total
                </Button>
              </div>
            </div>

            {/* Right: Architectural 2D Wireframe */}
            <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                {roofStyle.toUpperCase()} ARCHITECTURE
              </span>
              <RoofStyleWireframeDiagram style={roofStyle} />
            </div>
          </div>

          {/* Results Summary */}
          {multiPitchResult && (
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Total Squares</span>
                  <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                    {multiPitchResult.roofingSquares} sq
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{multiPitchResult.grossCoveredAreaSqFt} sq ft</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Net True Area</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiPitchResult.netTrueAreaSqFt} sq ft
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Deductions: -{multiPitchResult.deductionsSqFt} sq ft</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Starter Strip Length</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiPitchResult.starterStripLengthFt} ft
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Eaves &amp; Rakes</span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Drip Edge Metal</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {multiPitchResult.dripEdgePieces} pcs
                  </span>
                  <span className="text-[10px] text-zinc-400 block">@ 10-ft pieces</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...multiPitchSaved}
          cardTitle="Multi-Pitch"
          formatSummary={(r) => `${r.roofingSquares} sq (${r.grossCoveredAreaSqFt} sq ft), ${r.style}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: MATERIAL & BUNDLE ESTIMATOR ═══════════════════ */}
      <CardWrapper
        title="Roofing Material, Bundles &amp; Fasteners Estimator"
        hasResult={!!materialResult}
        isSaved={materialSaveSuccess}
        savedCount={materialSaved.saved.length}
        onToggleSaved={() => materialSaved.setIsOpen(!materialSaved.isOpen)}
        onSave={() => {
          if (!materialResult) return;
          materialSaved.save(
            `${materialResult.shingleBundlesNeeded} bundles (${materialResult.shingleType}), ${materialResult.underlaymentRollsNeeded} underlayment rolls`,
            materialResult
          );
          flashSave(setMaterialSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Target Surface Area (sq ft):
              </label>
              <Input
                type="number"
                value={materialTargetArea}
                onChange={(e) => setMaterialTargetArea(e.target.value)}
                min={100}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Shingle Type:
              </label>
              <select
                value={shingleType}
                onChange={(e) => setShingleType(e.target.value as any)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="architectural">Architectural / Dimensional (3 bundles/sq)</option>
                <option value="three_tab">3-Tab Asphalt Shingles (3 bundles/sq)</option>
                <option value="presidential">Heavyweight Designer / Presidential (4 bundles/sq)</option>
                <option value="tile">Spanish Clay / Concrete Tile (90 pcs/sq)</option>
                <option value="metal">Standing Seam Metal Panels</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                Underlayment Type:
              </label>
              <select
                value={underlaymentType}
                onChange={(e) => setUnderlaymentType(e.target.value as any)}
                className="w-full h-7 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="synthetic">Synthetic Membrane (10 sq / 1000 sq ft roll)</option>
                <option value="felt_15">#15 Asphalt Saturated Felt (4 sq / 400 sq ft roll)</option>
                <option value="felt_30">#30 Heavy Duty Felt (2 sq / 200 sq ft roll)</option>
              </select>
            </div>
          </div>

          {/* Freezing Zone & High Wind Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Ice &amp; Water Barrier (IRC R905.1.2)
              </label>
              <select
                value={iceShieldMargin}
                onChange={(e) => setIceShieldMargin(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300"
              >
                <option value="3">3 Feet Eaves Margin (Standard Mild Zone)</option>
                <option value="6">6 Feet Eaves Margin (Severe Snow &amp; Ice Dam Zone)</option>
                <option value="0">None (Southern / Warm Climates)</option>
              </select>
            </div>

            <div className="space-y-1 flex flex-col justify-center">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Hammer className="w-3.5 h-3.5 text-blue-500" /> Fastener Pattern
              </label>
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="windZone"
                    checked={!isHighWindZone}
                    onChange={() => setIsHighWindZone(false)}
                  />
                  <span>Standard (4 nails/shingle)</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="windZone"
                    checked={isHighWindZone}
                    onChange={() => setIsHighWindZone(true)}
                  />
                  <span>High-Wind (6 nails/shingle)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleMaterialCalc}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Material Quantities
            </Button>
          </div>

          {materialResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 block">Shingle Bundles</span>
                  <span className="text-xl font-bold text-blue-900 dark:text-blue-100 font-sans tabular-nums">
                    {materialResult.shingleBundlesNeeded}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block">@ {materialResult.bundlesPerSquare} bundles/sq</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Underlayment</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {materialResult.underlaymentRollsNeeded} rolls
                  </span>
                  <span className="text-[10px] text-zinc-400 block">{materialResult.underlaymentType}</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Ice &amp; Water Shield</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {materialResult.iceShieldRollsNeeded} rolls
                  </span>
                  <span className="text-[10px] text-zinc-400 block">({materialResult.iceShieldCoverageSqFt} sq ft)</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Ridge Cap Bundles</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {materialResult.ridgeCapBundlesNeeded} bundles
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Ridge &amp; Hip Caps</span>
                </div>

                <div className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block">Roofing Nails</span>
                  <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    ~{materialResult.nailsPoundsNeeded} lbs
                  </span>
                  <span className="text-[10px] text-zinc-400 block">({materialResult.nailsCountTotal.toLocaleString()} nails)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...materialSaved}
          cardTitle="Material Bundles"
          formatSummary={(r) => `${r.shingleBundlesNeeded} bundles (${r.shingleType}), ${r.underlaymentRollsNeeded} underlayment rolls`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: ROOFING COST & CONTRACTOR QUOTE ═══════════════════ */}
      <CardWrapper
        title="Roofing Cost &amp; Contractor Quote Estimator"
        hasResult={!!costResult}
        isSaved={costSaveSuccess}
        savedCount={costSaved.saved.length}
        onToggleSaved={() => costSaved.setIsOpen(!costSaved.isOpen)}
        onSave={() => {
          if (!costResult) return;
          costSaved.save(
            `${costResult.roofingSquares} sq, Total: $${costResult.totalEstimatedCost}`,
            costResult
          );
          flashSave(setCostSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-700 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-xs">
                Editable Material, Labor &amp; Disposal Rates
              </span>
              <button
                type="button"
                onClick={() => {
                  setPricePerSquare("160");
                  setTearOffCost("50");
                  setLaborCost("200");
                  setPermitAndDumpster("650");
                  setSalesTaxRate("7");
                }}
                className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                Reset Default Market Rates
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Roofing Squares</label>
                <Input
                  type="number"
                  value={costSquares}
                  onChange={(e) => setCostSquares(e.target.value)}
                  min={1}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Material Cost ($/sq)</label>
                <Input
                  type="number"
                  value={pricePerSquare}
                  onChange={(e) => setPricePerSquare(e.target.value)}
                  min={0}
                  step={10}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Tear-Off Old Roof ($/sq)</label>
                <Input
                  type="number"
                  value={tearOffCost}
                  onChange={(e) => setTearOffCost(e.target.value)}
                  min={0}
                  step={5}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Labor Rate ($/sq)</label>
                <Input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  min={0}
                  step={10}
                  className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Dumpster &amp; Permits ($)</label>
                <Input
                  type="number"
                  value={permitAndDumpster}
                  onChange={(e) => setPermitAndDumpster(e.target.value)}
                  min={0}
                  step={50}
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
              Calculate Total Investment
            </Button>
          </div>

          {costResult && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              {/* Itemized Cost Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-sans tabular-nums border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 font-semibold">
                      <th className="py-1">Cost Component</th>
                      <th className="py-1">Basis / Quantity</th>
                      <th className="py-1">Rate</th>
                      <th className="py-1 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Shingles &amp; Roofing Materials</td>
                      <td className="py-1">{costResult.roofingSquares} Squares</td>
                      <td className="py-1">${pricePerSquare}/sq</td>
                      <td className="py-1 text-right font-semibold">${costResult.materialSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Tear-Off Old Layers &amp; Disposal</td>
                      <td className="py-1">{costResult.roofingSquares} Squares</td>
                      <td className="py-1">${tearOffCost}/sq</td>
                      <td className="py-1 text-right font-semibold">${costResult.tearOffSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Professional Installation Labor</td>
                      <td className="py-1">{costResult.roofingSquares} Squares</td>
                      <td className="py-1">${laborCost}/sq</td>
                      <td className="py-1 text-right font-semibold">${costResult.laborSubtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium text-zinc-800 dark:text-zinc-200">Municipal Permit &amp; Dumpster Rental</td>
                      <td className="py-1">Lump Sum</td>
                      <td className="py-1">—</td>
                      <td className="py-1 text-right font-semibold">${costResult.dumpsterAndPermits.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-slate-50/70 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400">
                      <td colSpan={3} className="py-1">Material Sales Tax ({salesTaxRate}%)</td>
                      <td className="py-1 text-right">${costResult.salesTaxAmount.toFixed(2)}</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-950/40 font-bold text-xs">
                      <td colSpan={3} className="py-1.5 text-blue-900 dark:text-blue-100">Estimated Total Roof Replacement Cost</td>
                      <td className="py-1.5 text-right text-emerald-600 dark:text-emerald-400 text-sm">
                        ${costResult.totalEstimatedCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Contractor Quote Range (Low / Avg / High) */}
              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-900 dark:text-blue-200">
                  Estimated Contractor Bid Range:
                </span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100 font-sans tabular-nums">
                  ${costResult.lowEstimateCost.toLocaleString()} (Competitive) — ${costResult.highEstimateCost.toLocaleString()} (Premium)
                </span>
              </div>
            </div>
          )}
        </div>

        <SavedEstimatesDrawer
          {...costSaved}
          cardTitle="Roofing Cost"
          formatSummary={(r) => `${r.roofingSquares} sq, Total: $${r.totalEstimatedCost.toLocaleString()}`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Roofing Takeoff Report
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
