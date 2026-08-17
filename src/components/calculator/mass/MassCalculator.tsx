"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Scale,
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  ArrowRightLeft,
  Globe,
  Waves,
  Zap,
  Atom,
  Coins,
  Apple,
  Smartphone,
  Droplets,
  User,
  Car,
  Plane,
  Building,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  MASS_UNITS,
  DENSITY_UNITS_CATALOG,
  VOLUME_UNITS_CATALOG,
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
    [storageKey]
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
    [storageKey]
  );

  const clear = useCallback(() => {
    setSaved([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }, [storageKey]);

  return { saved, isOpen, setIsOpen, save, remove, clear };
}

// ─── Compact Card Container Layout ──────────────────────────────────────────

function CompactCardWrapper({
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 transition-all">
      <div className="bg-blue-600 text-white px-3 py-1 flex items-center justify-between">
        <h3 className="font-bold text-[11px] tracking-wide text-white">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[9px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.2 rounded cursor-pointer transition-colors"
                title="View saved calculations"
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              className={`text-[10px] font-bold px-1.5 py-0.2 rounded cursor-pointer transition-all ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50"
              }`}
            >
              {isSaved ? "Saved!" : "Save"}
            </button>
          </div>
        )}
      </div>
      <div className="p-2.5 space-y-2">{children}</div>
    </div>
  );
}

function CompactSavedDrawer<T>({
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
      ["Timestamp", "Input Summary", "Calculated Result"],
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
    <div className="mt-2 p-2 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-[10px] text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[9px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <Download className="w-2.5 h-2.5" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[9px] text-zinc-400 hover:text-red-500 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="space-y-1 max-h-28 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-1 px-1.5 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] font-sans tabular-nums"
          >
            <div className="truncate pr-2">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1">({item.inputSummary})</span>
            </div>
            <button
              onClick={() => remove(item.id)}
              className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
              title="Delete"
            >
              <Trash2 className="w-2.5 h-2.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function MassCalculator() {
  // ─── CARD 1: MASS FROM DENSITY & VOLUME (PRIMARY LIKE SCREENSHOT) ───
  const [densityInput, setDensityInput] = useState<string>("8900");
  const [densityUnit, setDensityUnit] = useState<string>("kg_m3");
  const [volumeInput, setVolumeInput] = useState<string>("1");
  const [volumeUnit, setVolumeUnit] = useState<string>("m3");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Copper");
  const [card1Result, setCard1Result] = useState<MassFromDensityResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<MassFromDensityResult>("saved_mass_from_density");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ─── CARD 2: UNIVERSAL MASS CONVERTER ───
  const [convertVal, setConvertVal] = useState<string>("1");
  const [convertFrom, setConvertFrom] = useState<string>("kg");
  const [convertTo, setConvertTo] = useState<string>("lb");
  const [convertResult, setConvertResult] = useState<MassConversionResult | null>(null);
  const [convertSaveSuccess, setConvertSaveSuccess] = useState(false);
  const convertSaved = useCardSaved<MassConversionResult>("saved_mass_converter");

  // ─── CARD 3: CELESTIAL PLANETARY WEIGHT ───
  const [celestialMassKg, setCelestialMassKg] = useState<string>("70");
  const [celestialResult, setCelestialResult] = useState<CelestialWeightResult | null>(null);
  const [celestialSaveSuccess, setCelestialSaveSuccess] = useState(false);
  const celestialSaved = useCardSaved<CelestialWeightResult>("saved_celestial_weight");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Computations
  const computeCard1 = useCallback(() => {
    const res = calculateMassFromDensity({
      densityValue: Number(densityInput) || 0,
      densityUnitId: densityUnit,
      volumeValue: Number(volumeInput) || 0,
      volumeUnitId: volumeUnit,
    });
    setCard1Result(res);
  }, [densityInput, densityUnit, volumeInput, volumeUnit]);

  const computeConverter = useCallback(() => {
    const res = convertMass(convertFrom, convertTo, Number(convertVal) || 0, 4);
    setConvertResult(res);
  }, [convertFrom, convertTo, convertVal]);

  const computeCelestial = useCallback(() => {
    const res = calculateCelestialWeight(Number(celestialMassKg) || 0);
    setCelestialResult(res);
  }, [celestialMassKg]);

  useEffect(() => {
    computeCard1();
  }, [computeCard1]);

  useEffect(() => {
    computeConverter();
  }, [computeConverter]);

  useEffect(() => {
    computeCelestial();
  }, [computeCelestial]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleMaterialPreset = (matName: string) => {
    setSelectedMaterial(matName);
    const mat = MATERIAL_DATABASE.find((m) => m.name === matName);
    if (mat) {
      setDensityInput(mat.densityKgM3.toString());
      setDensityUnit("kg_m3");
    }
  };

  const handleSwapConverter = () => {
    const prevFrom = convertFrom;
    const prevTo = convertTo;
    setConvertFrom(prevTo);
    setConvertTo(prevFrom);
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result) {
      sections.push({
        title: "Mass Calculation Analysis (Density × Volume)",
        items: [
          { label: "Density Input", value: `${densityInput} (${densityUnit})` },
          { label: "Volume Input", value: `${volumeInput} (${volumeUnit})` },
          { label: "Calculated Mass (kg)", value: `${formatMassPrecision(card1Result.massKg, 4)} kg` },
          { label: "Calculated Mass (lbs)", value: `${formatMassPrecision(card1Result.massLbs, 4)} lbs` },
          { label: "Calculated Mass (grams)", value: `${formatMassPrecision(card1Result.massGrams, 4)} g` },
          { label: "Calculated Mass (Metric Tons)", value: `${formatMassPrecision(card1Result.massMetricTons, 4)} t` },
          { label: "Formula Breakdown", value: card1Result.formulaDescription },
        ],
      });
    }

    if (convertResult) {
      sections.push({
        title: "Mass & Weight Multi-Unit Conversion",
        items: [
          { label: "Input Value", value: `${convertResult.inputValue} ${convertResult.fromUnit.symbol}` },
          { label: "Converted Value", value: `${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}` },
          { label: "SI Base Kilograms", value: `${convertResult.massInKg.toFixed(4)} kg` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Mass Calculator & Weight Suite",
        reportTitle: "Mass, Density & Gravitational Weight Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Mass (kg)", value: card1Result ? `${formatMassPrecision(card1Result.massKg, 4)} kg` : "—", highlight: true },
        { label: "Mass (lbs)", value: card1Result ? `${formatMassPrecision(card1Result.massLbs, 4)} lbs` : "—" },
        { label: "Density", value: `${densityInput} kg/m³` },
      ],
      sections,
    };
  }, [card1Result, convertResult, densityInput, densityUnit, volumeInput, volumeUnit]);

  return (
    <div className="space-y-3">
      {/* ═══════════════════ CARD 1: MASS CALCULATOR (DENSITY × VOLUME) ═══════════════════ */}
      <CompactCardWrapper
        title="Mass Calculator (m = Density × Volume)"
        hasResult={!!card1Result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result) return;
          card1Saved.save(
            `Density ${densityInput} × Vol ${volumeInput} ➔ ${formatMassPrecision(card1Result.massKg, 3)} kg (${formatMassPrecision(card1Result.massLbs, 3)} lbs)`,
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
            This mass calculator computes mass based on density and volume across 40+ density units and 18+ volume units.
          </p>

          {/* Presets Bar */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-zinc-500 shrink-0 font-medium">Material Preset:</span>
            <select
              value={selectedMaterial}
              onChange={(e) => handleMaterialPreset(e.target.value)}
              className="h-6 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-sans text-zinc-700 dark:text-zinc-300"
            >
              {MATERIAL_DATABASE.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name} ({m.densityKgM3.toLocaleString("en-US")} kg/m³)
                </option>
              ))}
            </select>
          </div>

          {/* Density & Volume Inputs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Density Input */}
            <div className="space-y-0.5">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Density:
              </label>
              <div className="grid grid-cols-12 gap-1">
                <Input
                  type="number"
                  value={densityInput}
                  onChange={(e) => setDensityInput(e.target.value)}
                  className="col-span-6 h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="8900"
                />
                <select
                  value={densityUnit}
                  onChange={(e) => setDensityUnit(e.target.value)}
                  className="col-span-6 h-7 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 truncate"
                >
                  {DENSITY_UNITS_CATALOG.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} [{u.symbol}]
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Volume Input */}
            <div className="space-y-0.5">
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Volume:
              </label>
              <div className="grid grid-cols-12 gap-1">
                <Input
                  type="number"
                  value={volumeInput}
                  onChange={(e) => setVolumeInput(e.target.value)}
                  className="col-span-6 h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="1"
                />
                <select
                  value={volumeUnit}
                  onChange={(e) => setVolumeUnit(e.target.value)}
                  className="col-span-6 h-7 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300 truncate"
                >
                  {VOLUME_UNITS_CATALOG.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} [{u.symbol}]
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <Button
              onClick={computeCard1}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-3 cursor-pointer"
            >
              Calculate
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDensityInput("8900");
                setDensityUnit("kg_m3");
                setVolumeInput("1");
                setVolumeUnit("m3");
              }}
              className="h-7 text-xs px-2 cursor-pointer"
            >
              Clear
            </Button>
          </div>

          {/* Primary Result Banner */}
          {card1Result && (
            <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-2 bg-blue-50/70 dark:bg-blue-950/30 rounded border border-blue-200/60 dark:border-blue-800/60 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[9px] text-zinc-400 block uppercase font-medium">
                    Calculated Mass Result
                  </span>
                  <div className="text-lg font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {formatMassPrecision(card1Result.massKg, 4)}{" "}
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300">kg</span>{" "}
                    <span className="text-xs text-zinc-500 font-normal">
                      ({formatMassPrecision(card1Result.massLbs, 4)} lbs | {formatMassPrecision(card1Result.massGrams, 4)} g)
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {card1Result.formulaDescription}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `${formatMassPrecision(card1Result.massKg, 4)} kg (${formatMassPrecision(card1Result.massLbs, 4)} lbs)`,
                      "c1_res"
                    )
                  }
                  className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  {copiedId === "c1_res" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
                  {copiedId === "c1_res" ? "Copied" : "Copy"}
                </Button>
              </div>

              {/* All Units Mass Matrix Table */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL UNITS MASS CONVERSION MATRIX
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 max-h-36 overflow-y-auto">
                  {card1Result.allConversions.map((c) => (
                    <div
                      key={c.unit.id}
                      className="p-1 px-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-[11px] font-sans tabular-nums"
                    >
                      <div className="truncate pr-1">
                        <span className="text-[9px] text-zinc-400 block">{c.unit.name} [{c.unit.symbol}]</span>
                        <span className="font-bold text-zinc-800 dark:text-zinc-200 font-mono text-[10px]">
                          {c.formatted}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`${c.formatted} ${c.unit.symbol}`, c.unit.id)}
                        className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer"
                        title="Copy"
                      >
                        {copiedId === c.unit.id ? (
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-2.5 h-2.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...card1Saved}
          cardTitle="Mass Calculation"
          formatSummary={(r) => `${formatMassPrecision(r.massKg, 3)} kg (${formatMassPrecision(r.massLbs, 3)} lbs)`}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 2: UNIVERSAL MASS & WEIGHT CONVERTER ═══════════════════ */}
      <CompactCardWrapper
        title="Universal Mass &amp; Weight Converter"
        hasResult={!!convertResult}
        isSaved={convertSaveSuccess}
        savedCount={convertSaved.saved.length}
        onToggleSaved={() => convertSaved.setIsOpen(!convertSaved.isOpen)}
        onSave={() => {
          if (!convertResult) return;
          convertSaved.save(
            `${convertResult.inputValue} ${convertResult.fromUnit.symbol} ➔ ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
            convertResult
          );
          flashSave(setConvertSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5">
            <Input
              type="number"
              value={convertVal}
              onChange={(e) => setConvertVal(e.target.value)}
              placeholder="Amount"
              className="h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800 flex-1 min-w-[70px]"
            />

            <select
              value={convertFrom}
              onChange={(e) => setConvertFrom(e.target.value)}
              className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
            >
              {MASS_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSwapConverter}
              className="h-7 px-2 cursor-pointer"
              title="Swap From and To"
            >
              <ArrowRightLeft className="w-3 h-3" />
            </Button>

            <select
              value={convertTo}
              onChange={(e) => setConvertTo(e.target.value)}
              className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
            >
              {MASS_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {convertResult && (
            <div className="flex items-center justify-between p-1.5 px-2 bg-blue-50/70 dark:bg-blue-950/30 rounded border border-blue-200/60 dark:border-blue-800/60">
              <div>
                <span className="font-bold text-xs text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {convertResult.inputValue} {convertResult.fromUnit.symbol} ={" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    {formatMassPrecision(convertResult.outputValue, 4)}
                  </span>{" "}
                  {convertResult.toUnit.symbol}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  {convertResult.formulaDescription}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  copyToClipboard(
                    `${convertResult.inputValue} ${convertResult.fromUnit.symbol} = ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
                    "conv_res"
                  )
                }
                className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
              >
                {copiedId === "conv_res" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
                {copiedId === "conv_res" ? "Copied" : "Copy"}
              </Button>
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...convertSaved}
          cardTitle="Mass Converter"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatMassPrecision(r.outputValue, 3)} ${r.toUnit.symbol}`}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 3: CELESTIAL PLANETARY WEIGHT (W = m * g) ═══════════════════ */}
      <CompactCardWrapper
        title="Planetary Weight Visualizer (W = m × g)"
        hasResult={!!celestialResult}
        isSaved={celestialSaveSuccess}
        savedCount={celestialSaved.saved.length}
        onToggleSaved={() => celestialSaved.setIsOpen(!celestialSaved.isOpen)}
        onSave={() => {
          if (!celestialResult) return;
          celestialSaved.save(
            `${celestialMassKg} kg mass ➔ Moon: ${(Number(celestialMassKg) * 0.1654).toFixed(1)} kg | Jupiter: ${(Number(celestialMassKg) * 2.528).toFixed(1)} kg`,
            celestialResult
          );
          flashSave(setCelestialSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">Mass in Kilograms:</span>
            <Input
              type="number"
              value={celestialMassKg}
              onChange={(e) => setCelestialMassKg(e.target.value)}
              className="h-7 w-28 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
              placeholder="70"
            />
            <span className="text-[10px] text-zinc-400">kg (or {(Number(celestialMassKg) * 2.20462).toFixed(1)} lbs)</span>
          </div>

          {celestialResult && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 pt-1">
              {celestialResult.bodyResults.slice(0, 6).map((b) => (
                <div
                  key={b.body.id}
                  className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 text-center font-sans tabular-nums"
                >
                  <span className="text-[9px] text-zinc-400 block font-medium">{b.body.name}</span>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">
                    {b.weightLbf.toFixed(1)} lbs
                  </span>
                  <span className="text-[9px] text-zinc-500 block">{b.weightNewtons.toFixed(0)} N</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...celestialSaved}
          cardTitle="Planetary Weight"
          formatSummary={(r) => `${r.massKg} kg on Earth`}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ REPORT TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-0.5">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-7 text-[11px] font-semibold gap-1 cursor-pointer"
        >
          <FileSpreadsheet className="h-3 w-3 text-blue-500" /> Generate Mass Metrology Sheet
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
