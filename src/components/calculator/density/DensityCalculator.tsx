"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  Search,
  RotateCcw,
  FileText,
  Printer,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  DensityCalcMode,
  MATERIAL_DATABASE,
  MASS_FACTORS,
  VOLUME_FACTORS,
  DENSITY_FACTORS,
  calculateDensitySolver,
  calculateGasDensity,
  calculateHydrostatic,
  DensitySolverResult,
  GasDensityResult,
  HydrostaticResult,
  MaterialDensityItem,
} from "@/lib/calculator-engine/formulas/density";

// ─── Local Storage Hook with Full Raw State & Restore ───────────────────────

interface SavedRecord<S, R> {
  id: string;
  timestamp: string;
  inputSummary: string;
  state: S;
  result: R;
  notes?: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<S, R>(storageKey: string) {
  const [saved, setSaved] = useState<SavedRecord<S, R>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, state: S, result: R, notes = "") => {
      const entry: SavedRecord<S, R> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        state,
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:border-zinc-300 print:shadow-none print:break-inside-avoid">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between print:bg-slate-100 print:text-slate-900 print:border-b print:border-slate-300">
        <h3 className="font-bold text-xs tracking-wide text-white print:text-slate-900">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5 print:hidden">
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

function SavedDrawer<S, R>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedRecord<S, R>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: R) => string;
  onRestore?: (state: S) => void;
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
    a.download = `density_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs print:hidden">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} History ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
          >
            Clear All
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
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1.5">({item.inputSummary})</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {onRestore && (
                <button
                  type="button"
                  onClick={() => onRestore(item.state)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 p-0.5 rounded hover:bg-blue-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center gap-0.5 text-[10px] font-semibold"
                  title="Restore exact inputs"
                >
                  <RotateCcw className="w-3 h-3" /> Restore
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                title="Delete"
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

// ─── Interactive Buoyancy Water Tank Visualizer ─────────────────────────────

function BuoyancyWaterTankVisualizer({
  specificGravity,
  densityKgM3,
  buoyancyWater,
  submergedFractionPct,
}: {
  specificGravity: number;
  densityKgM3: number;
  buoyancyWater: "floats" | "sinks" | "neutral";
  submergedFractionPct: number;
}) {
  const isNeutral = buoyancyWater === "neutral" || Math.abs(specificGravity - 1.0) <= 0.0001;
  const isFloating = buoyancyWater === "floats" || (!isNeutral && specificGravity < 1.0);

  // Water level line is at y = 50 in a 150h viewBox
  // Block height = 40, width = 50
  // Tank floor is at y = 135 (bottom limit for block top: y = 95)
  let blockY = 95;
  if (isNeutral) {
    blockY = 70; // Neutrally suspended mid-column
  } else if (isFloating) {
    const fraction = Math.max(0, Math.min(1, specificGravity));
    blockY = 50 - 40 * (1 - fraction);
    blockY = Math.max(12, Math.min(88, blockY));
  }

  const safeDensity = isNaN(densityKgM3) || densityKgM3 < 0 ? 0 : densityKgM3;
  const safeSG = isNaN(specificGravity) || specificGravity < 0 ? 0 : specificGravity;

  return (
    <div className="w-full flex flex-col items-center select-none print:break-inside-avoid">
      <svg
        viewBox="0 0 240 150"
        className="w-full max-w-[240px] rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 shadow-xs"
        aria-label="Buoyancy Simulation Tank"
      >
        {/* Tank Container Outline */}
        <rect x="20" y="20" width="200" height="120" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" className="dark:fill-zinc-900" />

        {/* Water Fluid Fill (from y=50 to y=140) */}
        <rect x="21" y="50" width="198" height="89" fill="#93c5fd" opacity="0.65" className="dark:fill-blue-900 dark:opacity-60" />

        {/* Water Surface Line */}
        <line x1="21" y1="50" x2="219" y2="50" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />
        <text x="120" y="44" textAnchor="middle" className="text-[7.5px] fill-blue-700 dark:fill-blue-300 font-bold tracking-wider">
          WATER LEVEL (ρ = 1,000 kg/m³)
        </text>

        {/* Submerged / Floating Object Block */}
        <g transform={`translate(95, ${blockY})`}>
          <rect
            x="0"
            y="0"
            width="50"
            height="40"
            rx="4"
            fill={isFloating ? "#fbbf24" : isNeutral ? "#60a5fa" : "#f87171"}
            stroke={isFloating ? "#d97706" : isNeutral ? "#2563eb" : "#dc2626"}
            strokeWidth="1.5"
            className="shadow-sm"
          />
          <text x="25" y="18" textAnchor="middle" className="text-[7.5px] fill-zinc-950 font-black">
            OBJECT
          </text>
          <text x="25" y="29" textAnchor="middle" className="text-[7px] fill-zinc-900 font-bold">
            {safeDensity >= 10000 ? `${(safeDensity / 1000).toFixed(1)}k` : Math.round(safeDensity)} kg/m³
          </text>
        </g>

        {/* Bottom Tank Floor Status Text */}
        <rect x="30" y="125" width="180" height="12" rx="3" fill="#1e293b" opacity="0.85" />
        <text x="120" y="134" textAnchor="middle" className="text-[7px] fill-white font-extrabold tracking-wider">
          {isFloating
            ? `FLOATS (${submergedFractionPct.toFixed(1)}% SUBMERGED)`
            : isNeutral
            ? "NEUTRALLY BUOYANT (SUSPENDED)"
            : `SINKS RAPIDLY (SG = ${safeSG.toFixed(2)})`}
        </text>
      </svg>
    </div>
  );
}

// ─── Helper for strict numeric input parsing (rejects empty/spaces/malformed) ──

function parseInputNumber(val: string): number {
  const trimmed = val.trim();
  if (trimmed === "") return NaN;
  return Number(trimmed);
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function DensityCalculator() {
  // ─── CARD 1: TRI-MODAL SOLVER ───
  const [calcMode, setCalcMode] = useState<DensityCalcMode>("density");
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("custom");

  // Inputs (Raw string state)
  const [massInput, setMassInput] = useState<string>("8900");
  const [massUnit, setMassUnit] = useState<string>("kg");
  const [volumeInput, setVolumeInput] = useState<string>("1");
  const [volumeUnit, setVolumeUnit] = useState<string>("m3");
  const [densityInput, setDensityInput] = useState<string>("8900");
  const [densityUnit, setDensityUnit] = useState<string>("kg_m3");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [card1Result, setCard1Result] = useState<DensitySolverResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);

  // Saved calculation states
  const card1Saved = useCardSaved<
    {
      mode: DensityCalcMode;
      massInput: string;
      massUnit: string;
      volumeInput: string;
      volumeUnit: string;
      densityInput: string;
      densityUnit: string;
      selectedMaterialId: string;
    },
    DensitySolverResult
  >("saved_density_solver");

  // ─── CARD 2: MATERIAL DATABASE EXPLORER ───
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // ─── CARD 3: GAS DENSITY (IDEAL GAS LAW) ───
  const [gasMolarMass, setGasMolarMass] = useState<string>("28.97"); // Dry air
  const [gasPressure, setGasPressure] = useState<string>("101.325"); // 1 atm in kPa
  const [gasTempC, setGasTempC] = useState<string>("20"); // 20°C
  const [gasResult, setGasResult] = useState<GasDensityResult | null>(null);
  const [gasSaveSuccess, setGasSaveSuccess] = useState(false);
  const gasSaved = useCardSaved<
    {
      gasMolarMass: string;
      gasPressure: string;
      gasTempC: string;
    },
    GasDensityResult
  >("saved_density_gas");

  // ─── CARD 4: HYDROSTATIC PRESSURE ───
  const [hydroDensity, setHydroDensity] = useState<string>("1000");
  const [hydroDepth, setHydroDepth] = useState<string>("10");
  const [hydroResult, setHydroResult] = useState<HydrostaticResult | null>(null);
  const [hydroSaveSuccess, setHydroSaveSuccess] = useState(false);
  const hydroSaved = useCardSaved<
    {
      hydroDensity: string;
      hydroDepth: string;
    },
    HydrostaticResult
  >("saved_density_hydro");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Handle Material Preset Load
  const handleLoadMaterial = (mat: MaterialDensityItem) => {
    setSelectedMaterialId(mat.id);
    setDensityInput(mat.densityKgM3.toString());
    setDensityUnit("kg_m3");

    if (calcMode === "density") {
      const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
      const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
      const volNum = parseInputNumber(volumeInput);
      const volM3 = (isNaN(volNum) || volNum <= 0 ? 1 : volNum) * vFact.toM3;
      const targetMassKg = mat.densityKgM3 * volM3;
      const targetMassVal = targetMassKg / mFact.toKg;
      const formatted =
        targetMassVal >= 10000
          ? Math.round(targetMassVal).toString()
          : parseFloat(targetMassVal.toFixed(4)).toString();
      setMassInput(formatted);
    }
  };

  const handleModeChange = (newMode: DensityCalcMode) => {
    setCalcMode(newMode);
    if (selectedMaterialId !== "custom") {
      const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
      if (mat) {
        setDensityInput(mat.densityKgM3.toString());
        setDensityUnit("kg_m3");
        if (newMode === "density") {
          const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
          const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
          const volNum = parseInputNumber(volumeInput);
          const volM3 = (isNaN(volNum) || volNum <= 0 ? 1 : volNum) * vFact.toM3;
          const targetMassKg = mat.densityKgM3 * volM3;
          const targetMassVal = targetMassKg / mFact.toKg;
          setMassInput(
            targetMassVal >= 10000
              ? Math.round(targetMassVal).toString()
              : parseFloat(targetMassVal.toFixed(4)).toString()
          );
        }
      }
    }
  };

  // Calculations
  const computeCard1 = useCallback(() => {
    const res = calculateDensitySolver({
      mode: calcMode,
      massValue: parseInputNumber(massInput),
      massUnit,
      volumeValue: parseInputNumber(volumeInput),
      volumeUnit,
      densityValue: parseInputNumber(densityInput),
      densityUnit,
    });
    setCard1Result(res);
  }, [calcMode, massInput, massUnit, volumeInput, volumeUnit, densityInput, densityUnit]);

  const computeGas = useCallback(() => {
    const res = calculateGasDensity({
      molarMassGPerMol: parseInputNumber(gasMolarMass),
      pressureKPa: parseInputNumber(gasPressure),
      temperatureCelsius: parseInputNumber(gasTempC),
    });
    setGasResult(res);
  }, [gasMolarMass, gasPressure, gasTempC]);

  const computeHydro = useCallback(() => {
    const res = calculateHydrostatic({
      densityKgM3: parseInputNumber(hydroDensity),
      depthMeters: parseInputNumber(hydroDepth),
    });
    setHydroResult(res);
  }, [hydroDensity, hydroDepth]);

  useEffect(() => {
    computeCard1();
  }, [computeCard1]);

  useEffect(() => {
    computeGas();
  }, [computeGas]);

  useEffect(() => {
    computeHydro();
  }, [computeHydro]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setActionFeedback(`Copied ${id}!`);
    setTimeout(() => {
      setCopiedKey(null);
      setActionFeedback(null);
    }, 1500);
  };

  // Copy Result
  const handleCopyResult = () => {
    if (!card1Result || card1Result.error) return;
    const text = `Density: ${card1Result.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })} kg/m³ (${card1Result.densityGCm3.toFixed(4)} g/cm³, ${card1Result.densityLbFt3.toFixed(2)} lb/ft³), Specific Gravity: ${card1Result.specificGravity.toFixed(3)}, Buoyancy: ${card1Result.buoyancyWater}`;
    copyToClipboard(text, "Result");
  };

  // Copy Summary
  const handleCopySummary = () => {
    if (!card1Result || card1Result.error) return;
    const summary = [
      `=== DENSITY CALCULATION SUMMARY ===`,
      `Calculation Mode: ${calcMode.toUpperCase()}`,
      `Object Mass: ${card1Result.massKg.toLocaleString("en-US")} kg`,
      `Displaced Volume: ${card1Result.volumeM3.toFixed(4)} m³`,
      `Density (SI): ${card1Result.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })} kg/m³`,
      `Density (CGS): ${card1Result.densityGCm3.toFixed(4)} g/cm³`,
      `Density (Imperial): ${card1Result.densityLbFt3.toFixed(2)} lb/ft³`,
      `Specific Gravity: ${card1Result.specificGravity.toFixed(4)} (relative to water at 4°C)`,
      `Water Buoyancy: ${card1Result.buoyancyWater.toUpperCase()} (${card1Result.submergedFractionPct.toFixed(1)}% submerged)`,
      `Air Buoyancy: ${card1Result.buoyancyAir.toUpperCase()}`,
      `Generated by CalcPlatform Density Calculator`,
    ].join("\n");
    copyToClipboard(summary, "Summary");
  };

  // Copy LaTeX Formula
  const handleCopyLatex = () => {
    if (!card1Result || card1Result.error) return;
    let latex = "";
    if (calcMode === "density") {
      latex = `\\rho = \\frac{m}{V} = \\frac{${card1Result.massKg}\\text{ kg}}{${card1Result.volumeM3}\\text{ m}^3} = ${card1Result.densityKgM3.toFixed(2)}\\text{ kg/m}^3`;
    } else if (calcMode === "mass") {
      latex = `m = \\rho \\cdot V = ${card1Result.densityKgM3.toFixed(2)}\\text{ kg/m}^3 \\times ${card1Result.volumeM3}\\text{ m}^3 = ${card1Result.massKg.toFixed(2)}\\text{ kg}`;
    } else {
      latex = `V = \\frac{m}{\\rho} = \\frac{${card1Result.massKg}\\text{ kg}}{${card1Result.densityKgM3.toFixed(2)}\\text{ kg/m}^3} = ${card1Result.volumeM3.toFixed(4)}\\text{ m}^3`;
    }
    copyToClipboard(latex, "LaTeX");
  };

  // Export CSV (RFC-4180 compliant)
  const handleExportCsv = () => {
    if (!card1Result || card1Result.error) return;
    const headers = [
      "Module",
      "Mode",
      "Mass (kg)",
      "Volume (m³)",
      "Density (kg/m³)",
      "Density (g/cm³)",
      "Density (lb/ft³)",
      "Specific Gravity",
      "Buoyancy in Water",
      "Submerged Fraction (%)",
      "Timestamp",
    ];
    const values = [
      "Density Solver",
      calcMode,
      card1Result.massKg.toString(),
      card1Result.volumeM3.toString(),
      card1Result.densityKgM3.toString(),
      card1Result.densityGCm3.toString(),
      card1Result.densityLbFt3.toString(),
      card1Result.specificGravity.toString(),
      card1Result.buoyancyWater,
      card1Result.submergedFractionPct.toString(),
      new Date().toISOString(),
    ];
    const csvContent = [
      headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(","),
      values.map((v) => `"${v.replace(/"/g, '""')}"`).join(","),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `density_takeoff_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setActionFeedback("Downloaded CSV!");
    setTimeout(() => setActionFeedback(null), 1500);
  };

  // Export TXT Takeoff
  const handleExportTxt = () => {
    if (!card1Result || card1Result.error) return;
    const txtContent = [
      "============================================================",
      "DENSITY CALCULATOR — CALCULATION REPORT & TAKEOFF",
      "============================================================",
      `Date/Time: ${new Date().toLocaleString()}`,
      `Calculation Mode: ${calcMode.toUpperCase()}`,
      "",
      "--- INPUT PARAMETERS ---",
      `Mass Input: ${massInput} ${massUnit}`,
      `Volume Input: ${volumeInput} ${volumeUnit}`,
      `Density Input: ${densityInput} ${densityUnit}`,
      `Material Preset: ${selectedMaterialId}`,
      "",
      "--- NORMALIZED PHYSICAL VALUES (SI) ---",
      `Normalized Mass (m): ${card1Result.massKg} kg`,
      `Normalized Volume (V): ${card1Result.volumeM3} m³`,
      `Resulting Density (ρ): ${card1Result.densityKgM3} kg/m³`,
      "",
      "--- DERIVED METRICS & BUOYANCY ---",
      `Density (g/cm³): ${card1Result.densityGCm3} g/cm³`,
      `Density (lb/ft³): ${card1Result.densityLbFt3} lb/ft³`,
      `Specific Gravity (SG): ${card1Result.specificGravity}`,
      `Buoyancy in Water (4°C): ${card1Result.buoyancyWater.toUpperCase()}`,
      `Submerged Fraction: ${card1Result.submergedFractionPct.toFixed(2)}%`,
      `Atmospheric Buoyancy (Air at 20°C): ${card1Result.buoyancyAir.toUpperCase()}`,
      "",
      "--- GOVERNING FORMULA ---",
      calcMode === "density"
        ? "ρ = m / V"
        : calcMode === "mass"
        ? "m = ρ × V"
        : "V = m / ρ",
      "Archimedes Principle: F_b = ρ_fluid × V_displaced × g",
      "============================================================",
    ].join("\n");

    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `density_calculation_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setActionFeedback("Downloaded TXT!");
    setTimeout(() => setActionFeedback(null), 1500);
  };

  // Filtered Material Database
  const filteredMaterials = useMemo(() => {
    return MATERIAL_DATABASE.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === "all" || item.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, categoryFilter]);

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result && !card1Result.error) {
      sections.push({
        title: "Density & Buoyancy Analysis",
        items: [
          { label: "Calculation Mode", value: card1Result.mode.toUpperCase() },
          { label: "Density (SI)", value: `${card1Result.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })} kg/m³` },
          { label: "Density (g/cm³)", value: `${card1Result.densityGCm3.toFixed(4)} g/cm³` },
          { label: "Density (Imperial)", value: `${card1Result.densityLbFt3.toFixed(2)} lb/ft³` },
          { label: "Specific Gravity (SG)", value: `${card1Result.specificGravity.toFixed(4)}` },
          { label: "Water Buoyancy Status", value: card1Result.buoyancyWater.toUpperCase() },
          { label: "Total Mass", value: `${card1Result.massKg.toLocaleString("en-US")} kg` },
          { label: "Total Volume", value: `${card1Result.volumeM3.toFixed(4)} m³` },
        ],
      });
    }

    if (gasResult && !gasResult.error) {
      sections.push({
        title: "Ideal Gas Density (STP/NTP Correction)",
        items: [
          { label: "Gas Density", value: `${gasResult.densityKgM3.toFixed(4)} kg/m³ (${gasResult.densityGCm3.toFixed(6)} g/cm³)` },
          { label: "Temperature", value: `${gasTempC} °C (${gasResult.temperatureKelvin.toFixed(2)} K)` },
          { label: "Pressure", value: `${gasPressure} kPa` },
          { label: "Atmospheric Status", value: gasResult.isLighterThanAir ? "Lighter than Air (Buoyant)" : "Heavier than Air (Settles)" },
        ],
      });
    }

    if (hydroResult && !hydroResult.error) {
      sections.push({
        title: "Hydrostatic Pressure & Fluid Statics",
        items: [
          { label: "Fluid Density", value: `${hydroDensity} kg/m³` },
          { label: "Submerged Depth", value: `${hydroDepth} m` },
          { label: "Gauge Pressure", value: `${hydroResult.gaugePressureKPa.toFixed(2)} kPa (${hydroResult.gaugePressurePsi.toFixed(2)} psi / ${hydroResult.gaugePressureBar.toFixed(3)} bar)` },
          { label: "API Gravity", value: hydroResult.apiGravity !== null ? `${hydroResult.apiGravity.toFixed(1)}° API` : "N/A" },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Density Calculator",
        reportTitle: "Material Density, Buoyancy & Fluid Statics Takeoff",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Density (kg/m³)", value: card1Result && !card1Result.error ? `${card1Result.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })} kg/m³` : "—", highlight: true },
        { label: "Density (g/cm³)", value: card1Result && !card1Result.error ? `${card1Result.densityGCm3.toFixed(3)} g/cm³` : "—" },
        { label: "Specific Gravity", value: card1Result && !card1Result.error ? `${card1Result.specificGravity.toFixed(3)}` : "—" },
      ],
      sections,
    };
  }, [card1Result, gasResult, gasTempC, gasPressure, hydroResult, hydroDensity, hydroDepth]);

  return (
    <div className="space-y-4">
      {/* Accessible global status toast / banner */}
      {statusMessage && (
        <div role="status" aria-live="polite" className="p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs rounded-lg flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* ═══════════════════ CARD 1: TRI-MODAL DENSITY SOLVER ═══════════════════ */}
      <CardWrapper
        title="Density, Mass &amp; Volume Solver (ρ = m / V)"
        hasResult={!!card1Result && !card1Result.error}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result || card1Result.error) return;
          card1Saved.save(
            `Mode ${calcMode.toUpperCase()}: ρ = ${card1Result.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })} kg/m³ (${card1Result.densityGCm3.toFixed(3)} g/cm³), SG = ${card1Result.specificGravity.toFixed(2)}`,
            {
              mode: calcMode,
              massInput,
              massUnit,
              volumeInput,
              volumeUnit,
              densityInput,
              densityUnit,
              selectedMaterialId,
            },
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Calculate:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5" role="group" aria-label="Calculation Mode">
                <button
                  type="button"
                  onClick={() => handleModeChange("density")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "density"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Find Density (ρ)
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("mass")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "mass"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Find Mass (m)
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("volume")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "volume"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  Find Volume (V)
                </button>
              </div>
            </div>

            {/* Material Preset Selector */}
            <div className="flex items-center gap-1.5">
              <label htmlFor="density-material-preset-select" className="text-zinc-500 font-medium">Preset:</label>
              <select
                id="density-material-preset-select"
                value={selectedMaterialId}
                onChange={(e) => {
                  const mat = MATERIAL_DATABASE.find((m) => m.id === e.target.value);
                  if (mat) handleLoadMaterial(mat);
                  else setSelectedMaterialId("custom");
                }}
                className="h-6 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans cursor-pointer"
              >
                <option value="custom">-- Custom Material --</option>
                {MATERIAL_DATABASE.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.densityKgM3.toLocaleString()} kg/m³)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Left Inputs Column */}
            <div className="md:col-span-7 space-y-2.5 text-xs">
              {/* Density Input (if mode is mass or volume) */}
              {calcMode !== "density" && (
                <div className="space-y-1">
                  <label htmlFor="density-density-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Material Density (ρ)
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <Input
                      id="density-density-input"
                      type="number"
                      step="any"
                      value={densityInput}
                      onChange={(e) => {
                        setDensityInput(e.target.value);
                        setSelectedMaterialId("custom");
                      }}
                      className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      id="density-density-unit-select"
                      aria-label="Density Unit"
                      value={densityUnit}
                      onChange={(e) => setDensityUnit(e.target.value)}
                      className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
                    >
                      {Object.entries(DENSITY_FACTORS).map(([k, d]) => (
                        <option key={k} value={k}>{d.symbol} ({d.name})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Mass Input (if mode is density or volume) */}
              {calcMode !== "mass" && (
                <div className="space-y-1">
                  <label htmlFor="density-mass-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Object Mass (m)
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <Input
                      id="density-mass-input"
                      type="number"
                      step="any"
                      value={massInput}
                      onChange={(e) => {
                        setMassInput(e.target.value);
                        setSelectedMaterialId("custom");
                      }}
                      className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      id="density-mass-unit-select"
                      aria-label="Mass Unit"
                      value={massUnit}
                      onChange={(e) => {
                        const newUnit = e.target.value;
                        setMassUnit(newUnit);
                        if (selectedMaterialId !== "custom" && calcMode === "density") {
                          const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
                          if (mat) {
                            const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
                            const mFact = MASS_FACTORS[newUnit] || MASS_FACTORS.kg;
                            const volM3 = (parseInputNumber(volumeInput) || 1) * vFact.toM3;
                            const targetMassKg = mat.densityKgM3 * volM3;
                            const targetMassVal = targetMassKg / mFact.toKg;
                            setMassInput(targetMassVal >= 10000 ? Math.round(targetMassVal).toString() : parseFloat(targetMassVal.toFixed(4)).toString());
                          }
                        }
                      }}
                      className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
                    >
                      {Object.entries(MASS_FACTORS).map(([k, d]) => (
                        <option key={k} value={k}>{d.symbol} ({d.name})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Volume Input (if mode is density or mass) */}
              {calcMode !== "volume" && (
                <div className="space-y-1">
                  <label htmlFor="density-volume-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Displaced Volume (V)
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <Input
                      id="density-volume-input"
                      type="number"
                      step="any"
                      value={volumeInput}
                      onChange={(e) => {
                        const newVol = e.target.value;
                        setVolumeInput(newVol);
                        if (selectedMaterialId !== "custom" && calcMode === "density") {
                          const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
                          if (mat) {
                            const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
                            const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
                            const volM3 = (parseInputNumber(newVol) || 1) * vFact.toM3;
                            const targetMassKg = mat.densityKgM3 * volM3;
                            const targetMassVal = targetMassKg / mFact.toKg;
                            setMassInput(targetMassVal >= 10000 ? Math.round(targetMassVal).toString() : parseFloat(targetMassVal.toFixed(4)).toString());
                          }
                        } else {
                          setSelectedMaterialId("custom");
                        }
                      }}
                      className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      id="density-volume-unit-select"
                      aria-label="Volume Unit"
                      value={volumeUnit}
                      onChange={(e) => {
                        const newVUnit = e.target.value;
                        setVolumeUnit(newVUnit);
                        if (selectedMaterialId !== "custom" && calcMode === "density") {
                          const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
                          if (mat) {
                            const vFact = VOLUME_FACTORS[newVUnit] || VOLUME_FACTORS.m3;
                            const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
                            const volM3 = (parseInputNumber(volumeInput) || 1) * vFact.toM3;
                            const targetMassKg = mat.densityKgM3 * volM3;
                            const targetMassVal = targetMassKg / mFact.toKg;
                            setMassInput(targetMassVal >= 10000 ? Math.round(targetMassVal).toString() : parseFloat(targetMassVal.toFixed(4)).toString());
                          }
                        }
                      }}
                      className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
                    >
                      {Object.entries(VOLUME_FACTORS).map(([k, d]) => (
                        <option key={k} value={k}>{d.symbol} ({d.name})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Validation Alert Message */}
              {card1Result?.error && (
                <div role="alert" className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-xs font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>{card1Result.error}</span>
                </div>
              )}

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2 pt-1 print:hidden">
                <Button
                  type="button"
                  onClick={computeCard1}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
                >
                  Calculate {calcMode === "density" ? "Density (ρ)" : calcMode === "mass" ? "Mass (m)" : "Volume (V)"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSelectedMaterialId("custom");
                    setMassInput("8900");
                    setVolumeInput("1");
                    setDensityInput("8900");
                    setMassUnit("kg");
                    setVolumeUnit("m3");
                    setDensityUnit("kg_m3");
                  }}
                  className="text-xs font-semibold h-7 px-3 cursor-pointer"
                >
                  Reset
                </Button>

                {/* Export & Copy Toolbar */}
                {card1Result && !card1Result.error && (
                  <div className="flex items-center gap-1 ml-auto text-[11px]">
                    <button
                      type="button"
                      onClick={handleCopyResult}
                      className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1"
                      title="Copy result string"
                    >
                      <Copy className="w-3 h-3" /> Result
                    </button>
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1"
                      title="Copy complete summary"
                    >
                      <Copy className="w-3 h-3" /> Summary
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyLatex}
                      className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1"
                      title="Copy formula in LaTeX"
                    >
                      <Copy className="w-3 h-3" /> LaTeX
                    </button>
                    <button
                      type="button"
                      onClick={handleExportCsv}
                      className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1"
                      title="Export CSV"
                    >
                      <Download className="w-3 h-3" /> CSV
                    </button>
                    <button
                      type="button"
                      onClick={handleExportTxt}
                      className="px-2 py-1 rounded border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-700 dark:text-zinc-300 cursor-pointer flex items-center gap-1"
                      title="Export TXT Report"
                    >
                      <FileText className="w-3 h-3" /> TXT
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Buoyancy Simulation Water Tank */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                BUOYANCY EQUILIBRIUM SIMULATION
              </span>
              <BuoyancyWaterTankVisualizer
                specificGravity={card1Result && !card1Result.error ? card1Result.specificGravity : 8.9}
                densityKgM3={card1Result && !card1Result.error ? card1Result.densityKgM3 : 8900}
                buoyancyWater={card1Result && !card1Result.error ? card1Result.buoyancyWater : "sinks"}
                submergedFractionPct={card1Result && !card1Result.error ? card1Result.submergedFractionPct : 100}
              />
            </div>
          </div>

          {/* Results Metric Badges */}
          {card1Result && !card1Result.error && (
            <div aria-live="polite" className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Density (SI)</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card1Result.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    kg/m³
                  </span>
                </div>

                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Density (CGS)</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card1Result.densityGCm3.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 block font-semibold">
                    g/cm³ (or g/mL)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Specific Gravity</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                    {card1Result.specificGravity.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">
                    (relative to pure water)
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-[10px] text-zinc-500 block font-medium">Water Buoyancy</span>
                  <span className={`text-base font-bold uppercase font-sans ${card1Result.buoyancyWater === "floats" ? "text-emerald-600 dark:text-emerald-400" : card1Result.buoyancyWater === "neutral" ? "text-blue-600 dark:text-blue-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {card1Result.buoyancyWater === "floats" ? "Floats" : card1Result.buoyancyWater === "neutral" ? "Neutral" : "Sinks"}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">
                    {card1Result.densityLbFt3.toFixed(1)} lb/ft³
                  </span>
                </div>
              </div>

              {/* All Density Units Matrix */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL DENSITY UNITS CONVERSION MATRIX
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {card1Result.allDensityUnits.map((u) => (
                    <div
                      key={u.unitKey}
                      className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs font-sans tabular-nums"
                    >
                      <div className="truncate pr-1">
                        <span className="font-medium text-zinc-500 text-[10px] block">
                          {u.name}
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px]">
                          {u.formatted} {u.symbol}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`${u.formatted} ${u.symbol}`, u.unitKey)}
                        className="text-zinc-400 hover:text-blue-600 p-1 cursor-pointer print:hidden"
                        title={`Copy ${u.name}`}
                      >
                        {copiedKey === u.unitKey ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...card1Saved}
          cardTitle="Density Solver"
          formatSummary={(r) => `ρ = ${r.densityKgM3.toLocaleString("en-US", { maximumFractionDigits: 2 })} kg/m³ (${r.densityGCm3.toFixed(2)} g/cm³), SG = ${r.specificGravity.toFixed(2)}`}
          onRestore={(st) => {
            setCalcMode(st.mode);
            setMassInput(st.massInput);
            setMassUnit(st.massUnit);
            setVolumeInput(st.volumeInput);
            setVolumeUnit(st.volumeUnit);
            setDensityInput(st.densityInput);
            setDensityUnit(st.densityUnit);
            setSelectedMaterialId(st.selectedMaterialId);
            setStatusMessage("Restored saved Density calculation inputs!");
            setTimeout(() => setStatusMessage(null), 3000);
          }}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: MATERIAL DENSITY DATABASE EXPLORER ═══════════════════ */}
      <CardWrapper title="Material Density Database &amp; Searchable Explorer">
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 print:hidden">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-zinc-400" />
              <input
                id="material-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search metal, liquid, wood, gas (e.g. Gold, Seawater, Oak)..."
                aria-label="Search Material Database"
                className="w-full h-7 pl-7 pr-2 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1" role="group" aria-label="Category Filters">
              {["all", "metal", "solid", "liquid", "gas"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Materials Table */}
          <div className="max-h-56 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800 print:max-h-none">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold sticky top-0">
                <tr>
                  <th scope="col" className="p-1.5">Material</th>
                  <th scope="col" className="p-1.5">Density (kg/m³)</th>
                  <th scope="col" className="p-1.5">Density (g/cm³)</th>
                  <th scope="col" className="p-1.5">Specific Gravity</th>
                  <th scope="col" className="p-1.5 text-right print:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                {filteredMaterials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-blue-50/50 dark:hover:bg-zinc-800/50">
                    <td className="p-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                      {mat.name}
                      {mat.notes && <span className="text-[10px] text-zinc-400 ml-1.5 block">({mat.notes})</span>}
                    </td>
                    <td className="p-1.5 font-mono font-bold text-blue-700 dark:text-blue-300">
                      {mat.densityKgM3.toLocaleString("en-US")}
                    </td>
                    <td className="p-1.5 font-mono">
                      {(mat.densityKgM3 / 1000).toFixed(3)}
                    </td>
                    <td className="p-1.5 font-mono">
                      {mat.specificGravity}
                    </td>
                    <td className="p-1.5 text-right print:hidden">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLoadMaterial(mat)}
                        className="h-5 px-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Load
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardWrapper>

      {/* ═══════════════════ CARD 3: GAS DENSITY & IDEAL GAS LAW ═══════════════════ */}
      <CardWrapper
        title="Gas Density &amp; Ideal Gas Law Solver (ρ = PM / RT)"
        hasResult={!!gasResult && !gasResult.error}
        isSaved={gasSaveSuccess}
        savedCount={gasSaved.saved.length}
        onToggleSaved={() => gasSaved.setIsOpen(!gasSaved.isOpen)}
        onSave={() => {
          if (!gasResult || gasResult.error) return;
          gasSaved.save(
            `Gas M=${gasMolarMass}g/mol at ${gasTempC}°C, ${gasPressure}kPa: ρ = ${gasResult.densityKgM3.toFixed(4)} kg/m³`,
            {
              gasMolarMass,
              gasPressure,
              gasTempC,
            },
            gasResult
          );
          flashSave(setGasSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label htmlFor="gas-molar-mass-select" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Gas Molar Mass (g/mol)
              </label>
              <select
                id="gas-molar-mass-select"
                value={gasMolarMass}
                onChange={(e) => setGasMolarMass(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <option value="28.97">Air (Dry atmospheric - 28.97 g/mol)</option>
                <option value="44.01">Carbon Dioxide (CO₂ - 44.01 g/mol)</option>
                <option value="32.00">Oxygen (O₂ - 32.00 g/mol)</option>
                <option value="28.01">Nitrogen (N₂ - 28.01 g/mol)</option>
                <option value="16.04">Methane (CH₄ - 16.04 g/mol)</option>
                <option value="4.003">Helium (He - 4.003 g/mol)</option>
                <option value="2.016">Hydrogen (H₂ - 2.016 g/mol)</option>
              </select>
            </div>

            <div>
              <label htmlFor="gas-pressure-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Absolute Pressure (kPa)
              </label>
              <Input
                id="gas-pressure-input"
                type="number"
                step="any"
                value={gasPressure}
                onChange={(e) => setGasPressure(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="101.325"
              />
            </div>

            <div>
              <label htmlFor="gas-temperature-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Temperature (°C)
              </label>
              <Input
                id="gas-temperature-input"
                type="number"
                step="any"
                value={gasTempC}
                onChange={(e) => setGasTempC(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="20"
              />
            </div>
          </div>

          {gasResult?.error && (
            <div role="alert" className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-xs font-medium flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{gasResult.error}</span>
            </div>
          )}

          <div className="flex gap-2 print:hidden">
            <Button
              type="button"
              onClick={computeGas}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Gas Density
            </Button>
          </div>

          {gasResult && !gasResult.error && (
            <div aria-live="polite" className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between text-xs font-sans tabular-nums">
              <span className="font-bold text-blue-950 dark:text-blue-100">
                Gas Density: <span className="text-blue-700 dark:text-blue-300">{gasResult.densityKgM3.toFixed(4)} kg/m³</span> ({gasResult.densityGCm3.toFixed(6)} g/cm³)
              </span>
              <span className={`text-[11px] font-semibold ${gasResult.isLighterThanAir ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-400"}`}>
                {gasResult.isLighterThanAir ? "Lighter than Air (Buoyant in Atmosphere)" : "Heavier than Air (Settles at Ground)"}
              </span>
            </div>
          )}
        </div>

        <SavedDrawer
          {...gasSaved}
          cardTitle="Gas Density"
          formatSummary={(r) => `ρ = ${r.densityKgM3.toFixed(4)} kg/m³ (${r.isLighterThanAir ? "Lighter than Air" : "Heavier than Air"})`}
          onRestore={(st) => {
            setGasMolarMass(st.gasMolarMass);
            setGasPressure(st.gasPressure);
            setGasTempC(st.gasTempC);
            setStatusMessage("Restored saved Gas Density inputs!");
            setTimeout(() => setStatusMessage(null), 3000);
          }}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: HYDROSTATIC PRESSURE ═══════════════════ */}
      <CardWrapper
        title="Hydrostatic Pressure &amp; API Gravity Calculator"
        hasResult={!!hydroResult && !hydroResult.error}
        isSaved={hydroSaveSuccess}
        savedCount={hydroSaved.saved.length}
        onToggleSaved={() => hydroSaved.setIsOpen(!hydroSaved.isOpen)}
        onSave={() => {
          if (!hydroResult || hydroResult.error) return;
          hydroSaved.save(
            `Depth ${hydroDepth}m in ρ=${hydroDensity}kg/m³: P = ${hydroResult.gaugePressureKPa.toFixed(2)} kPa (${hydroResult.gaugePressurePsi.toFixed(2)} psi)`,
            {
              hydroDensity,
              hydroDepth,
            },
            hydroResult
          );
          flashSave(setHydroSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label htmlFor="hydro-density-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Fluid Density (kg/m³)
              </label>
              <Input
                id="hydro-density-input"
                type="number"
                step="any"
                value={hydroDensity}
                onChange={(e) => setHydroDensity(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="1000 for water"
              />
            </div>

            <div>
              <label htmlFor="hydro-depth-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Submerged Depth (meters)
              </label>
              <Input
                id="hydro-depth-input"
                type="number"
                step="any"
                value={hydroDepth}
                onChange={(e) => setHydroDepth(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="10"
              />
            </div>
          </div>

          {hydroResult?.error && (
            <div role="alert" className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 text-xs font-medium flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{hydroResult.error}</span>
            </div>
          )}

          <div className="flex gap-2 print:hidden">
            <Button
              type="button"
              onClick={computeHydro}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Hydrostatic Pressure
            </Button>
          </div>

          {hydroResult && !hydroResult.error && (
            <div aria-live="polite" className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between text-xs font-sans tabular-nums">
              <span className="font-bold text-blue-950 dark:text-blue-100">
                Gauge Pressure: <span className="text-blue-700 dark:text-blue-300">{hydroResult.gaugePressureKPa.toFixed(2)} kPa</span> ({hydroResult.gaugePressurePsi.toFixed(2)} psi / {hydroResult.gaugePressureBar.toFixed(3)} bar)
              </span>
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                API Gravity: {hydroResult.apiGravity !== null ? `${hydroResult.apiGravity.toFixed(1)}° API` : "N/A"}
              </span>
            </div>
          )}
        </div>

        <SavedDrawer
          {...hydroSaved}
          cardTitle="Hydrostatic"
          formatSummary={(r) => `P = ${r.gaugePressureKPa.toFixed(2)} kPa (${r.gaugePressurePsi.toFixed(2)} psi)`}
          onRestore={(st) => {
            setHydroDensity(st.hydroDensity);
            setHydroDepth(st.hydroDepth);
            setStatusMessage("Restored saved Hydrostatic inputs!");
            setTimeout(() => setStatusMessage(null), 3000);
          }}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER & PRINT TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end gap-2 pt-1 print:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.print()}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer text-zinc-600 dark:text-zinc-300"
        >
          <Printer className="h-3.5 w-3.5" /> Print Takeoff Sheet
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Density Takeoff Report
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
