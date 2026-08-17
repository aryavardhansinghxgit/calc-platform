"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Scale,
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  Search,
  ArrowRightLeft,
  Sparkles,
  Layers,
  ShieldCheck,
  Globe,
  Waves,
  Zap,
  HardDrive,
  Fuel,
  TrendingUp,
  Atom,
  Coins,
  Apple,
  Smartphone,
  Droplets,
  User,
  Car,
  Plane,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  MASS_UNITS,
  REAL_WORLD_REFERENCES,
  convertMass,
  formatMassPrecision,
  calculateMassFromDensity,
  calculateCelestialWeight,
  MassConversionResult,
  MassFromDensityResult,
  CelestialWeightResult,
  MassUnitDefinition,
  RealWorldMassReference,
} from "@/lib/calculator-engine/formulas/mass";
import { MATERIAL_DATABASE } from "@/lib/calculator-engine/formulas/density";

// ─── Local Storage Persistence Hook ─────────────────────────────────────────

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
      ["Timestamp", "Input Summary", "Conversion Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mass_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} Conversions ({saved.length})
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

// ─── Real-World Mass Scale Visualizer ───────────────────────────────────────

function RealWorldMassVisualizer({
  massInKg,
  closestRef,
}: {
  massInKg: number;
  closestRef: RealWorldMassReference;
}) {
  return (
    <div className="w-full space-y-2 bg-slate-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <span>REAL-WORLD SCALE PERSPECTIVE</span>
        <span>{massInKg >= 1000 ? `${(massInKg / 1000).toFixed(2)} tonnes` : `${massInKg.toFixed(3)} kg`}</span>
      </div>

      <div className="p-2 bg-white dark:bg-zinc-900 rounded-md border border-blue-200 dark:border-blue-800 flex items-center gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-full text-blue-600 dark:text-blue-400">
          <Scale className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <span className="text-[10px] text-zinc-400 block font-medium">Closest Everyday Mass Anchor</span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
            {closestRef.name}
          </span>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
            {closestRef.description}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function MassCalculator() {
  // ─── CARD 1: UNIVERSAL CONVERTER ───
  const [inputValue, setInputValue] = useState<string>("100");
  const [fromUnitId, setFromUnitId] = useState<string>("kg");
  const [toUnitId, setToUnitId] = useState<string>("lb");
  const [precision, setPrecision] = useState<number>(4);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [fromSearch, setFromSearch] = useState<string>("");
  const [toSearch, setToSearch] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [card1Result, setCard1Result] = useState<MassConversionResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<MassConversionResult>("saved_mass_converter");

  // ─── CARD 2: MASS FROM DENSITY & VOLUME ───
  const [densityVal, setDensityVal] = useState<string>("7850"); // Steel
  const [volumeVal, setVolumeVal] = useState<string>("0.5");
  const [selectedMatId, setSelectedMatId] = useState<string>("iron_steel");
  const [card2Result, setCard2Result] = useState<MassFromDensityResult | null>(null);
  const [card2SaveSuccess, setCard2SaveSuccess] = useState(false);
  const card2Saved = useCardSaved<MassFromDensityResult>("saved_mass_density");

  // ─── CARD 3: CELESTIAL WEIGHT CALCULATOR ───
  const [celestialMassKg, setCelestialMassKg] = useState<string>("70");
  const [card3Result, setCard3Result] = useState<CelestialWeightResult | null>(null);
  const [card3SaveSuccess, setCard3SaveSuccess] = useState(false);
  const card3Saved = useCardSaved<CelestialWeightResult>("saved_mass_celestial");

  // ─── CARD 4: QUICK HUB (KG TO LBS) ───
  const [quickKg, setQuickKg] = useState<string>("75");
  const [quickLbs, setQuickLbs] = useState<string>("165.35");
  const [quickGrams, setQuickGrams] = useState<string>("500");
  const [quickOz, setQuickOz] = useState<string>("17.64");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Swap Units
  const handleSwapUnits = () => {
    const prevFrom = fromUnitId;
    const prevTo = toUnitId;
    setFromUnitId(prevTo);
    setToUnitId(prevFrom);
  };

  // Calculations
  const computeCard1 = useCallback(() => {
    const num = Number(inputValue) || 0;
    const res = convertMass(fromUnitId, toUnitId, num, precision, isScientific);
    setCard1Result(res);
  }, [fromUnitId, toUnitId, inputValue, precision, isScientific]);

  const computeCard2 = useCallback(() => {
    const rho = Number(densityVal) || 0;
    const vol = Number(volumeVal) || 0;
    const res = calculateMassFromDensity({ densityKgM3: rho, volumeM3: vol });
    setCard2Result(res);
  }, [densityVal, volumeVal]);

  const computeCard3 = useCallback(() => {
    const m = Number(celestialMassKg) || 70;
    const res = calculateCelestialWeight(m);
    setCard3Result(res);
  }, [celestialMassKg]);

  useEffect(() => {
    computeCard1();
  }, [computeCard1]);

  useEffect(() => {
    computeCard2();
  }, [computeCard2]);

  useEffect(() => {
    computeCard3();
  }, [computeCard3]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filteredFromUnits = MASS_UNITS.filter((u) =>
    u.name.toLowerCase().includes(fromSearch.toLowerCase()) || u.symbol.toLowerCase().includes(fromSearch.toLowerCase())
  );
  const filteredToUnits = MASS_UNITS.filter((u) =>
    u.name.toLowerCase().includes(toSearch.toLowerCase()) || u.symbol.toLowerCase().includes(toSearch.toLowerCase())
  );

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result) {
      sections.push({
        title: "Primary Mass & Weight Conversion",
        items: [
          { label: "Input Stated", value: `${card1Result.inputValue} ${card1Result.fromUnit.name} (${card1Result.fromUnit.symbol})` },
          { label: "Primary Converted Result", value: `${formatMassPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.name} (${card1Result.toUnit.symbol})` },
          { label: "Equivalent SI Mass", value: `${card1Result.massInKg.toLocaleString()} kg` },
          { label: "Formula Multiplier", value: card1Result.formulaDescription },
          { label: "Real-World Equivalent", value: `${card1Result.closestReference.name} (${card1Result.closestReference.description})` },
        ],
      });

      sections.push({
        title: "All Supported Mass Units Conversion Matrix",
        items: card1Result.allConversions.map((c) => ({
          label: `${c.unit.name} (${c.unit.symbol})`,
          value: c.formatted,
        })),
      });
    }

    if (card2Result) {
      sections.push({
        title: "Mass from Density & Volume (m = ρ × V)",
        items: [
          { label: "Density Input", value: `${densityVal} kg/m³` },
          { label: "Volume Input", value: `${volumeVal} m³` },
          { label: "Calculated Mass (kg)", value: `${card2Result.massKg.toLocaleString()} kg` },
          { label: "Calculated Mass (lbs)", value: `${card2Result.massLbs.toFixed(2)} lbs` },
          { label: "Calculated Mass (Metric Tons)", value: `${card2Result.massMetricTons.toFixed(4)} tonnes` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Mass & Weight Calculator",
        reportTitle: "Mass Metrology, Unit Conversions & Gravitational Takeoff",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Input Stated", value: card1Result ? `${card1Result.inputValue} ${card1Result.fromUnit.symbol}` : "—" },
        { label: "Converted Value", value: card1Result ? `${formatMassPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol}` : "—", highlight: true },
        { label: "SI Base Kilograms", value: card1Result ? `${card1Result.massInKg.toLocaleString()} kg` : "—" },
      ],
      sections,
    };
  }, [card1Result, card2Result, precision, isScientific, densityVal, volumeVal]);

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: UNIVERSAL MASS CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Universal Mass &amp; Weight Converter"
        hasResult={!!card1Result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result) return;
          card1Saved.save(
            `${card1Result.inputValue} ${card1Result.fromUnit.symbol} = ${formatMassPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol}`,
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-zinc-600 dark:text-zinc-400">Decimals:</span>
              <select
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                className="h-6 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                <option value={2}>2 Decimals</option>
                <option value={3}>3 Decimals</option>
                <option value={4}>4 Decimals</option>
                <option value={6}>6 Decimals</option>
                <option value={8}>8 Decimals</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <label className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 cursor-pointer font-medium">
                <input
                  type="checkbox"
                  checked={isScientific}
                  onChange={(e) => setIsScientific(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600"
                />
                Scientific Notation (Exp)
              </label>
            </div>
          </div>

          {/* Main Dual Column Selector */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Left Box: FROM UNIT */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">From:</label>
                <div className="relative w-28">
                  <Search className="w-3 h-3 absolute left-1.5 top-1.5 text-zinc-400" />
                  <input
                    type="text"
                    value={fromSearch}
                    onChange={(e) => setFromSearch(e.target.value)}
                    placeholder="Search unit..."
                    className="w-full h-6 pl-5 pr-1 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-8 text-sm font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="Enter mass"
              />

              <div className="h-36 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-1 space-y-0.5">
                {filteredFromUnits.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setFromUnitId(unit.id)}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-all flex items-center justify-between cursor-pointer ${
                      fromUnitId === unit.id
                        ? "bg-blue-600 text-white font-bold"
                        : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <span>{unit.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">({unit.symbol})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Middle: Swap Button */}
            <div className="md:col-span-2 flex flex-col items-center justify-center gap-2 py-2">
              <button
                type="button"
                onClick={handleSwapUnits}
                className="p-2 rounded-full bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 hover:bg-blue-100 dark:hover:bg-zinc-700 text-blue-600 dark:text-blue-400 cursor-pointer shadow-xs transition-all"
                title="Swap From and To Units"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                SWAP
              </span>
            </div>

            {/* Right Box: TO UNIT */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">To:</label>
                <div className="relative w-28">
                  <Search className="w-3 h-3 absolute left-1.5 top-1.5 text-zinc-400" />
                  <input
                    type="text"
                    value={toSearch}
                    onChange={(e) => setToSearch(e.target.value)}
                    placeholder="Search unit..."
                    className="w-full h-6 pl-5 pr-1 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="h-8 px-3 rounded border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-between text-sm font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                <span>{card1Result ? formatMassPrecision(card1Result.outputValue, precision, isScientific) : "0"}</span>
                <span className="text-xs text-blue-700 dark:text-blue-300">{card1Result?.toUnit.symbol}</span>
              </div>

              <div className="h-36 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-1 space-y-0.5">
                {filteredToUnits.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    onClick={() => setToUnitId(unit.id)}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-all flex items-center justify-between cursor-pointer ${
                      toUnitId === unit.id
                        ? "bg-blue-600 text-white font-bold"
                        : "hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <span>{unit.name}</span>
                    <span className="text-[10px] opacity-75 font-mono">({unit.symbol})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Primary Result Banner & Real-World Visualizer */}
          {card1Result && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                    CONVERTED MASS RESULT &amp; MULTIPLIER
                  </span>
                  <div className="text-base font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {card1Result.inputValue} {card1Result.fromUnit.symbol} ={" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      {formatMassPrecision(card1Result.outputValue, precision, isScientific)}
                    </span>{" "}
                    {card1Result.toUnit.symbol}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {card1Result.formulaDescription}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `${card1Result.inputValue} ${card1Result.fromUnit.symbol} = ${formatMassPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol}`,
                      "primary"
                    )
                  }
                  className="h-7 text-xs font-semibold gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  {copiedId === "primary" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  {copiedId === "primary" ? "Copied" : "Copy Result"}
                </Button>
              </div>

              <RealWorldMassVisualizer massInKg={card1Result.massInKg} closestRef={card1Result.closestReference} />

              {/* All Units Matrix */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL MASS &amp; WEIGHT UNITS MATRIX
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                  {card1Result.allConversions.map((c) => (
                    <div
                      key={c.unit.id}
                      className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs font-sans tabular-nums"
                    >
                      <div className="truncate pr-1">
                        <span className="font-medium text-zinc-600 dark:text-zinc-400 text-[10px] block">
                          {c.unit.name} ({c.unit.symbol})
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px]">
                          {c.formatted}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${c.formatted} ${c.unit.symbol}`, c.unit.id)}
                        className="text-zinc-400 hover:text-blue-600 p-1 cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === c.unit.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
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
          cardTitle="Mass Converter"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatMassPrecision(r.outputValue, 4)} ${r.toUnit.symbol}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: MASS FROM DENSITY & VOLUME ═══════════════════ */}
      <CardWrapper
        title="Calculate Mass from Density &amp; Volume (m = ρ × V)"
        hasResult={!!card2Result}
        isSaved={card2SaveSuccess}
        savedCount={card2Saved.saved.length}
        onToggleSaved={() => card2Saved.setIsOpen(!card2Saved.isOpen)}
        onSave={() => {
          if (!card2Result) return;
          card2Saved.save(
            `ρ=${densityVal}kg/m³, V=${volumeVal}m³: Mass = ${card2Result.massKg.toLocaleString()} kg (${card2Result.massLbs.toFixed(2)} lbs)`,
            card2Result
          );
          flashSave(setCard2SaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Material Preset</label>
              <select
                value={selectedMatId}
                onChange={(e) => {
                  setSelectedMatId(e.target.value);
                  const mat = MATERIAL_DATABASE.find((m) => m.id === e.target.value);
                  if (mat) setDensityVal(mat.densityKgM3.toString());
                }}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
              >
                {MATERIAL_DATABASE.map((m) => (
                  <option key={m.id} value={m.id}>{m.name} ({m.densityKgM3} kg/m³)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Density (kg/m³)</label>
              <Input
                type="number"
                value={densityVal}
                onChange={(e) => {
                  setDensityVal(e.target.value);
                  setSelectedMatId("custom");
                }}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Volume (m³)</label>
              <Input
                type="number"
                value={volumeVal}
                onChange={(e) => setVolumeVal(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={computeCard2}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
            >
              Calculate Mass
            </Button>
          </div>

          {card2Result && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 block font-medium">Mass (Kilograms)</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {card2Result.massKg.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">kg</span>
              </div>

              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800">
                <span className="text-[10px] text-zinc-500 block font-medium">Mass (Pounds)</span>
                <span className="text-xl font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {card2Result.massLbs.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 block">lbs</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 block font-medium">Metric Tons</span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {card2Result.massMetricTons.toFixed(3)}
                </span>
                <span className="text-[10px] text-zinc-400 block">tonnes</span>
              </div>

              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                <span className="text-[10px] text-zinc-500 block font-medium">Short Tons (US)</span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {card2Result.massShortTons.toFixed(3)}
                </span>
                <span className="text-[10px] text-zinc-400 block">US tons</span>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...card2Saved}
          cardTitle="Density Mass"
          formatSummary={(r) => `m = ${r.massKg.toLocaleString()} kg (${r.massLbs.toFixed(2)} lbs)`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: CELESTIAL WEIGHT CALCULATOR ═══════════════════ */}
      <CardWrapper
        title="True Mass vs. Gravitational Weight on Other Celestial Worlds (W = m · g)"
        hasResult={!!card3Result}
        isSaved={card3SaveSuccess}
        savedCount={card3Saved.saved.length}
        onToggleSaved={() => card3Saved.setIsOpen(!card3Saved.isOpen)}
        onSave={() => {
          if (!card3Result) return;
          card3Saved.save(
            `Mass ${celestialMassKg} kg: Earth=${card3Result.bodyResults[0].weightNewtons}N, Moon=${card3Result.bodyResults[1].weightNewtons}N, Mars=${card3Result.bodyResults[2].weightNewtons}N`,
            card3Result
          );
          flashSave(setCard3SaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <label className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
              Enter Invariant Mass (kg):
            </label>
            <Input
              type="number"
              value={celestialMassKg}
              onChange={(e) => setCelestialMassKg(e.target.value)}
              className="w-32 h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
              placeholder="70"
            />
            <span className="text-zinc-500 font-semibold">kg</span>
          </div>

          {card3Result && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {card3Result.bodyResults.map((item) => (
                <div
                  key={item.body.id}
                  className="p-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 space-y-0.5 text-center text-xs font-sans tabular-nums"
                >
                  <span className="font-bold text-zinc-800 dark:text-zinc-200 block text-[11px]">
                    {item.body.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-mono">
                    g = {item.body.surfaceGravity} m/s²
                  </span>
                  <span className="text-base font-black text-blue-700 dark:text-blue-300 block">
                    {item.weightNewtons} N
                  </span>
                  <span className="text-[10px] text-zinc-500 block font-medium">
                    ({item.weightLbf} lbs force / {item.weightKgEquivalent} kg scale)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <SavedDrawer
          {...card3Saved}
          cardTitle="Celestial Weight"
          formatSummary={(r) => `Mass ${r.massKg}kg: Earth ${r.bodyResults[0].weightNewtons}N, Moon ${r.bodyResults[1].weightNewtons}N`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: QUICK WEIGHT CONVERSION HUB ═══════════════════ */}
      <CardWrapper title="Quick Weight Conversion Hub (Dual Pairs)">
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            {/* Kilograms to Pounds */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                Kilograms (kg) ⟷ Pounds (lbs)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <span className="text-[10px] text-zinc-400 block">Kilograms</span>
                  <Input
                    type="number"
                    value={quickKg}
                    onChange={(e) => {
                      const kg = Number(e.target.value) || 0;
                      setQuickKg(e.target.value);
                      setQuickLbs((kg / 0.45359237).toFixed(2));
                    }}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Pounds</span>
                  <Input
                    type="number"
                    value={quickLbs}
                    onChange={(e) => {
                      const lbs = Number(e.target.value) || 0;
                      setQuickLbs(e.target.value);
                      setQuickKg((lbs * 0.45359237).toFixed(2));
                    }}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>

            {/* Grams to Ounces */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                Grams (g) ⟷ Ounces (oz)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <div>
                  <span className="text-[10px] text-zinc-400 block">Grams</span>
                  <Input
                    type="number"
                    value={quickGrams}
                    onChange={(e) => {
                      const g = Number(e.target.value) || 0;
                      setQuickGrams(e.target.value);
                      setQuickOz((g / 28.349523125).toFixed(2));
                    }}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Ounces</span>
                  <Input
                    type="number"
                    value={quickOz}
                    onChange={(e) => {
                      const oz = Number(e.target.value) || 0;
                      setQuickOz(e.target.value);
                      setQuickGrams((oz * 28.349523125).toFixed(2));
                    }}
                    className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Mass Metrology Report
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
