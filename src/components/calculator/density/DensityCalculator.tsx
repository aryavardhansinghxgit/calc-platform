"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  Search,
  Sparkles,
  Layers,
  ShieldCheck,
  Scale,
  Thermometer,
  Ruler,
  Maximize,
  Clock,
  Gauge,
  Zap,
  HardDrive,
  Fuel,
  TrendingUp,
  Waves,
  FlaskConical,
  Wind,
  Droplets,
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

// ─── Local Storage Hook ─────────────────────────────────────────────────────

interface SavedEstimate<T> {
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
  const [saved, setSaved] = useState<SavedEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, notes = "") => {
      const entry: SavedEstimate<T> = {
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

function SavedDrawer<T>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
}: {
  saved: SavedEstimate<T>[];
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
    a.download = `density_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
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

// ─── Interactive Buoyancy Water Tank Visualizer ─────────────────────────────

function BuoyancyWaterTankVisualizer({
  specificGravity,
  densityKgM3,
}: {
  specificGravity: number;
  densityKgM3: number;
}) {
  const isFloating = specificGravity < 1.0;
  const isNeutral = Math.abs(specificGravity - 1.0) < 0.001;

  // Water level is at y = 50 in a 160h viewBox
  // Block height = 40, width = 50
  // If floating: submerged depth = 40 * specificGravity
  // top of block y = 50 - (40 - submerged) = 10 + 40*(1 - SG)
  let blockY = 50 - 40 * (1 - specificGravity);
  if (!isFloating) {
    // Sunk to the bottom (floor at y = 135)
    blockY = 135 - 40;
  }
  blockY = Math.max(12, Math.min(95, blockY));

  return (
    <div className="w-full flex flex-col items-center select-none">
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
            fill={isFloating ? "#fbbf24" : "#f87171"}
            stroke={isFloating ? "#d97706" : "#dc2626"}
            strokeWidth="1.5"
            className="shadow-sm"
          />
          <text x="25" y="18" textAnchor="middle" className="text-[7.5px] fill-zinc-950 font-black">
            OBJECT
          </text>
          <text x="25" y="29" textAnchor="middle" className="text-[7px] fill-zinc-900 font-bold">
            {densityKgM3 >= 10000 ? `${(densityKgM3 / 1000).toFixed(1)}k` : Math.round(densityKgM3)} kg/m³
          </text>
        </g>

        {/* Bottom Tank Floor Status Text */}
        <rect x="30" y="125" width="180" height="12" rx="3" fill="#1e293b" opacity="0.8" />
        <text x="120" y="134" textAnchor="middle" className="text-[7px] fill-white font-extrabold tracking-wider">
          {isFloating
            ? `FLOATS (${(specificGravity * 100).toFixed(1)}% SUBMERGED)`
            : isNeutral
            ? "NEUTRALLY BUOYANT (SUSPENDED)"
            : `SINKS RAPIDLY (SG = ${specificGravity.toFixed(2)})`}
        </text>
      </svg>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function DensityCalculator() {
  // ─── CARD 1: TRI-MODAL SOLVER ───
  const [calcMode, setCalcMode] = useState<DensityCalcMode>("density");
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("custom");

  // Inputs
  const [massInput, setMassInput] = useState<string>("8900");
  const [massUnit, setMassUnit] = useState<string>("kg");
  const [volumeInput, setVolumeInput] = useState<string>("1");
  const [volumeUnit, setVolumeUnit] = useState<string>("m3");
  const [densityInput, setDensityInput] = useState<string>("8900");
  const [densityUnit, setDensityUnit] = useState<string>("kg_m3");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [card1Result, setCard1Result] = useState<DensitySolverResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<DensitySolverResult>("saved_density_solver");

  // ─── CARD 2: MATERIAL DATABASE EXPLORER ───
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // ─── CARD 3: GAS DENSITY (IDEAL GAS LAW) ───
  const [gasMolarMass, setGasMolarMass] = useState<string>("28.97"); // Air
  const [gasPressure, setGasPressure] = useState<string>("101.325"); // 1 atm in kPa
  const [gasTempC, setGasTempC] = useState<string>("20"); // 20°C
  const [gasResult, setGasResult] = useState<GasDensityResult | null>(null);
  const [gasSaveSuccess, setGasSaveSuccess] = useState(false);
  const gasSaved = useCardSaved<GasDensityResult>("saved_density_gas");

  // ─── CARD 4: HYDROSTATIC PRESSURE ───
  const [hydroDensity, setHydroDensity] = useState<string>("1000");
  const [hydroDepth, setHydroDepth] = useState<string>("10");
  const [hydroResult, setHydroResult] = useState<HydrostaticResult | null>(null);
  const [hydroSaveSuccess, setHydroSaveSuccess] = useState(false);
  const hydroSaved = useCardSaved<HydrostaticResult>("saved_density_hydro");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Handle Material Preset Load
  const handleLoadMaterial = (mat: MaterialDensityItem) => {
    setSelectedMaterialId(mat.id);
    setDensityInput(mat.densityKgM3.toString());
    setDensityUnit("kg_m3");

    if (calcMode === "density") {
      // In Find Density mode, update mass to match the preset density: mass = density * volume
      const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
      const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
      const volM3 = (Number(volumeInput) || 1) * vFact.toM3;
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
          const volM3 = (Number(volumeInput) || 1) * vFact.toM3;
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
      massValue: Number(massInput) || 0,
      massUnit,
      volumeValue: Number(volumeInput) || 0,
      volumeUnit,
      densityValue: Number(densityInput) || 0,
      densityUnit,
    });
    setCard1Result(res);
  }, [calcMode, massInput, massUnit, volumeInput, volumeUnit, densityInput, densityUnit]);

  const computeGas = useCallback(() => {
    const res = calculateGasDensity({
      molarMassGPerMol: Number(gasMolarMass) || 28.97,
      pressureKPa: Number(gasPressure) || 101.325,
      temperatureCelsius: Number(gasTempC) || 20,
    });
    setGasResult(res);
  }, [gasMolarMass, gasPressure, gasTempC]);

  const computeHydro = useCallback(() => {
    const res = calculateHydrostatic({
      densityKgM3: Number(hydroDensity) || 1000,
      depthMeters: Number(hydroDepth) || 10,
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
    setTimeout(() => setCopiedKey(null), 1500);
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

    if (card1Result) {
      sections.push({
        title: "Density & Buoyancy Analysis",
        items: [
          { label: "Calculation Mode", value: card1Result.mode.toUpperCase() },
          { label: "Density (SI)", value: `${card1Result.densityKgM3.toLocaleString()} kg/m³` },
          { label: "Density (g/cm³)", value: `${card1Result.densityGCm3.toFixed(4)} g/cm³` },
          { label: "Density (Imperial)", value: `${card1Result.densityLbFt3.toFixed(2)} lb/ft³` },
          { label: "Specific Gravity (SG)", value: `${card1Result.specificGravity.toFixed(4)}` },
          { label: "Water Buoyancy Status", value: card1Result.buoyancyWater.toUpperCase() },
          { label: "Total Mass", value: `${card1Result.massKg.toLocaleString()} kg` },
          { label: "Total Volume", value: `${card1Result.volumeM3.toFixed(4)} m³` },
        ],
      });
    }

    if (gasResult) {
      sections.push({
        title: "Ideal Gas Density (STP/NTP Correction)",
        items: [
          { label: "Gas Density", value: `${gasResult.densityKgM3} kg/m³ (${gasResult.densityGCm3} g/cm³)` },
          { label: "Temperature", value: `${gasTempC} °C (${gasResult.temperatureKelvin} K)` },
          { label: "Atmospheric Status", value: gasResult.isLighterThanAir ? "Lighter than Air (Buoyant)" : "Heavier than Air" },
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
        { label: "Density (kg/m³)", value: card1Result ? `${card1Result.densityKgM3.toLocaleString()} kg/m³` : "—", highlight: true },
        { label: "Density (g/cm³)", value: card1Result ? `${card1Result.densityGCm3.toFixed(3)} g/cm³` : "—" },
        { label: "Specific Gravity", value: card1Result ? `${card1Result.specificGravity.toFixed(3)}` : "—" },
      ],
      sections,
    };
  }, [card1Result, gasResult, gasTempC]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: TRI-MODAL DENSITY SOLVER ═══════════════════ */}
      <CardWrapper
        title="Density, Mass &amp; Volume Solver (ρ = m / V)"
        hasResult={!!card1Result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result) return;
          card1Saved.save(
            `Mode ${calcMode.toUpperCase()}: ρ = ${card1Result.densityKgM3.toLocaleString()} kg/m³ (${card1Result.densityGCm3.toFixed(3)} g/cm³), SG = ${card1Result.specificGravity.toFixed(2)}`,
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Mode Switcher Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Calculate:</span>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5">
                <button
                  type="button"
                  onClick={() => handleModeChange("density")}
                  className={`px-3 py-0.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    calcMode === "density"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
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
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
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
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Find Volume (V)
                </button>
              </div>
            </div>

            {/* Material Preset Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-medium">Preset:</span>
              <select
                value={selectedMaterialId}
                onChange={(e) => {
                  const mat = MATERIAL_DATABASE.find((m) => m.id === e.target.value);
                  if (mat) handleLoadMaterial(mat);
                  else setSelectedMaterialId("custom");
                }}
                className="h-6 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                <option value="custom">-- Custom Material --</option>
                {MATERIAL_DATABASE.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.densityKgM3} kg/m³)
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
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Material Density (ρ)
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <Input
                      type="number"
                      value={densityInput}
                      onChange={(e) => {
                        setDensityInput(e.target.value);
                        setSelectedMaterialId("custom");
                      }}
                      className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      value={densityUnit}
                      onChange={(e) => setDensityUnit(e.target.value)}
                      className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
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
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Object Mass (m)
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <Input
                      type="number"
                      value={massInput}
                      onChange={(e) => {
                        setMassInput(e.target.value);
                        setSelectedMaterialId("custom");
                      }}
                      className="col-span-7 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                    <select
                      value={massUnit}
                      onChange={(e) => {
                        const newUnit = e.target.value;
                        setMassUnit(newUnit);
                        if (selectedMaterialId !== "custom" && calcMode === "density") {
                          const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
                          if (mat) {
                            const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
                            const mFact = MASS_FACTORS[newUnit] || MASS_FACTORS.kg;
                            const volM3 = (Number(volumeInput) || 1) * vFact.toM3;
                            const targetMassKg = mat.densityKgM3 * volM3;
                            const targetMassVal = targetMassKg / mFact.toKg;
                            setMassInput(targetMassVal >= 10000 ? Math.round(targetMassVal).toString() : parseFloat(targetMassVal.toFixed(4)).toString());
                          }
                        }
                      }}
                      className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
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
                  <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                    Displaced Volume (V)
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <Input
                      type="number"
                      value={volumeInput}
                      onChange={(e) => {
                        const newVol = e.target.value;
                        setVolumeInput(newVol);
                        if (selectedMaterialId !== "custom" && calcMode === "density") {
                          const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
                          if (mat) {
                            const vFact = VOLUME_FACTORS[volumeUnit] || VOLUME_FACTORS.m3;
                            const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
                            const volM3 = (Number(newVol) || 1) * vFact.toM3;
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
                      value={volumeUnit}
                      onChange={(e) => {
                        const newVUnit = e.target.value;
                        setVolumeUnit(newVUnit);
                        if (selectedMaterialId !== "custom" && calcMode === "density") {
                          const mat = MATERIAL_DATABASE.find((m) => m.id === selectedMaterialId);
                          if (mat) {
                            const vFact = VOLUME_FACTORS[newVUnit] || VOLUME_FACTORS.m3;
                            const mFact = MASS_FACTORS[massUnit] || MASS_FACTORS.kg;
                            const volM3 = (Number(volumeInput) || 1) * vFact.toM3;
                            const targetMassKg = mat.densityKgM3 * volM3;
                            const targetMassVal = targetMassKg / mFact.toKg;
                            setMassInput(targetMassVal >= 10000 ? Math.round(targetMassVal).toString() : parseFloat(targetMassVal.toFixed(4)).toString());
                          }
                        }
                      }}
                      className="col-span-5 h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
                    >
                      {Object.entries(VOLUME_FACTORS).map(([k, d]) => (
                        <option key={k} value={k}>{d.symbol} ({d.name})</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={computeCard1}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
                >
                  Calculate {calcMode === "density" ? "Density (ρ)" : calcMode === "mass" ? "Mass (m)" : "Volume (V)"}
                </Button>
                <Button
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
              </div>
            </div>

            {/* Right: Buoyancy Simulation Water Tank */}
            <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                BUOYANCY EQUILIBRIUM SIMULATION
              </span>
              <BuoyancyWaterTankVisualizer
                specificGravity={card1Result ? card1Result.specificGravity : 8.9}
                densityKgM3={card1Result ? card1Result.densityKgM3 : 8900}
              />
            </div>
          </div>

          {/* Results Metric Badges */}
          {card1Result && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">Density (SI)</span>
                  <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card1Result.densityKgM3.toLocaleString(undefined, { maximumFractionDigits: 2 })}
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
                  <span className={`text-base font-bold uppercase font-sans ${card1Result.buoyancyWater === "floats" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                    {card1Result.buoyancyWater === "floats" ? "Floats" : "Sinks"}
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
                        onClick={() => copyToClipboard(`${u.formatted} ${u.symbol}`, u.unitKey)}
                        className="text-zinc-400 hover:text-blue-600 p-1 cursor-pointer"
                        title="Copy"
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
          formatSummary={(r) => `ρ = ${r.densityKgM3.toLocaleString()} kg/m³ (${r.densityGCm3.toFixed(2)} g/cm³), SG = ${r.specificGravity.toFixed(2)}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: MATERIAL DENSITY DATABASE EXPLORER ═══════════════════ */}
      <CardWrapper title="Material Density Database &amp; Searchable Explorer">
        <div className="space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Search Bar */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search metal, liquid, wood, gas (e.g. Gold, Seawater, Oak)..."
                className="w-full h-7 pl-7 pr-2 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-1">
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
          <div className="max-h-56 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold sticky top-0">
                <tr>
                  <th className="p-1.5">Material</th>
                  <th className="p-1.5">Density (kg/m³)</th>
                  <th className="p-1.5">Density (g/cm³)</th>
                  <th className="p-1.5">Specific Gravity</th>
                  <th className="p-1.5 text-right">Action</th>
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
                      {mat.densityKgM3.toLocaleString()}
                    </td>
                    <td className="p-1.5 font-mono">
                      {(mat.densityKgM3 / 1000).toFixed(3)}
                    </td>
                    <td className="p-1.5 font-mono">
                      {mat.specificGravity}
                    </td>
                    <td className="p-1.5 text-right">
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
        hasResult={!!gasResult}
        isSaved={gasSaveSuccess}
        savedCount={gasSaved.saved.length}
        onToggleSaved={() => gasSaved.setIsOpen(!gasSaved.isOpen)}
        onSave={() => {
          if (!gasResult) return;
          gasSaved.save(
            `Gas M=${gasMolarMass}g/mol at ${gasTempC}°C, ${gasPressure}kPa: ρ = ${gasResult.densityKgM3} kg/m³`,
            gasResult
          );
          flashSave(setGasSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Gas Molar Mass (g/mol)
              </label>
              <select
                value={gasMolarMass}
                onChange={(e) => setGasMolarMass(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
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
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Pressure (kPa)
              </label>
              <Input
                type="number"
                value={gasPressure}
                onChange={(e) => setGasPressure(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="101.325"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Temperature (°C)
              </label>
              <Input
                type="number"
                value={gasTempC}
                onChange={(e) => setGasTempC(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="20"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={computeGas}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Gas Density
            </Button>
          </div>

          {gasResult && (
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between text-xs font-sans tabular-nums">
              <span className="font-bold text-blue-950 dark:text-blue-100">
                Gas Density: <span className="text-blue-700 dark:text-blue-300">{gasResult.densityKgM3} kg/m³</span> ({gasResult.densityGCm3} g/cm³)
              </span>
              <span className={`text-[11px] font-semibold ${gasResult.isLighterThanAir ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600"}`}>
                {gasResult.isLighterThanAir ? "Lighter than Air (Buoyant in Atmosphere)" : "Heavier than Air (Settles at Ground)"}
              </span>
            </div>
          )}
        </div>

        <SavedDrawer
          {...gasSaved}
          cardTitle="Gas Density"
          formatSummary={(r) => `ρ = ${r.densityKgM3} kg/m³ (${r.isLighterThanAir ? "Lighter than Air" : "Heavier than Air"})`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: HYDROSTATIC PRESSURE ═══════════════════ */}
      <CardWrapper
        title="Hydrostatic Pressure &amp; API Gravity Calculator"
        hasResult={!!hydroResult}
        isSaved={hydroSaveSuccess}
        savedCount={hydroSaved.saved.length}
        onToggleSaved={() => hydroSaved.setIsOpen(!hydroSaved.isOpen)}
        onSave={() => {
          if (!hydroResult) return;
          hydroSaved.save(
            `Depth ${hydroDepth}m in ρ=${hydroDensity}kg/m³: P = ${hydroResult.gaugePressureKPa} kPa (${hydroResult.gaugePressurePsi} psi)`,
            hydroResult
          );
          flashSave(setHydroSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Fluid Density (kg/m³)
              </label>
              <Input
                type="number"
                value={hydroDensity}
                onChange={(e) => setHydroDensity(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="1000 for water"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Submerged Depth (meters)
              </label>
              <Input
                type="number"
                value={hydroDepth}
                onChange={(e) => setHydroDepth(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="10"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={computeHydro}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Hydrostatic Pressure
            </Button>
          </div>

          {hydroResult && (
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between text-xs font-sans tabular-nums">
              <span className="font-bold text-blue-950 dark:text-blue-100">
                Gauge Pressure: <span className="text-blue-700 dark:text-blue-300">{hydroResult.gaugePressureKPa} kPa</span> ({hydroResult.gaugePressurePsi} psi / {hydroResult.gaugePressureBar} bar)
              </span>
              <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                API Gravity: {hydroResult.apiGravity}° API
              </span>
            </div>
          )}
        </div>

        <SavedDrawer
          {...hydroSaved}
          cardTitle="Hydrostatic"
          formatSummary={(r) => `P = ${r.gaugePressureKPa} kPa (${r.gaugePressurePsi} psi)`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
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
