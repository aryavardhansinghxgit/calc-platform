"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Scale,
  Download,
  Trash2,
  FileSpreadsheet,
  FileText,
  Copy,
  Check,
  ArrowRightLeft,
  RotateCcw,
  Sigma,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  MASS_UNITS,
  DENSITY_UNITS_CATALOG,
  VOLUME_UNITS_CATALOG,
  formatMassPrecision,
  calculateMassFromDensity,
  convertMass,
  calculateCelestialWeight,
  MassConversionResult,
  MassFromDensityResult,
  CelestialWeightResult,
} from "@/lib/calculator-engine/formulas/mass";
import { MATERIAL_DATABASE } from "@/lib/calculator-engine/formulas/density";

// ─── Input Parsing Helper ───────────────────────────────────────────────────

interface ParseResult {
  valid: boolean;
  value: number | null;
  error: string | null;
}

function parseNumericInput(raw: string, fieldName: string, allowNegative = false): ParseResult {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return {
      valid: false,
      value: null,
      error: `Please enter a valid numeric value for ${fieldName}.`,
    };
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return {
      valid: false,
      value: null,
      error: `Please enter a valid numeric value for ${fieldName}.`,
    };
  }

  if (!allowNegative && value < 0) {
    return {
      valid: false,
      value: null,
      error: `${fieldName} cannot be negative.`,
    };
  }

  return {
    valid: true,
    value,
    error: null,
  };
}

// ─── Local Storage Persistence Hook ─────────────────────────────────────────

interface SavedEstimate<T, S = any> {
  id: string;
  timestamp: string;
  inputSummary: string;
  inputState: S;
  result: T;
  notes: string;
}

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T, S = any>(storageKey: string) {
  const [saved, setSaved] = useState<SavedEstimate<T, S>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, inputState: S, notes = "") => {
      const entry: SavedEstimate<T, S> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        inputState,
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 transition-all print:border-zinc-300 print:shadow-none print:break-inside-avoid">
      <div className="bg-blue-600 text-white px-3 py-1 flex items-center justify-between print:bg-zinc-800 print:text-white">
        <h3 className="font-bold text-[11px] tracking-wide">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5 no-print print:hidden">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[9px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.2 rounded cursor-pointer transition-colors"
                title="View saved calculations"
                aria-label={`View ${savedCount} saved calculations`}
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
              aria-label="Save current calculation"
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

function CompactSavedDrawer<T, S = any>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedEstimate<T, S>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore?: (state: S) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Calculated Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mass_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-2 p-2 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs no-print print:hidden">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-[10px] text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[9px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            aria-label="Export history to CSV"
          >
            <Download className="w-2.5 h-2.5" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[9px] text-zinc-400 hover:text-red-500 cursor-pointer"
            aria-label="Clear all saved calculations"
          >
            Clear All
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
            <div className="flex items-center gap-1 shrink-0">
              {onRestore && (
                <button
                  type="button"
                  onClick={() => onRestore(item.inputState)}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 p-0.5 flex items-center gap-0.5 text-[9px] font-medium cursor-pointer"
                  title="Restore calculation"
                  aria-label="Restore saved calculation"
                >
                  <RotateCcw className="w-2.5 h-2.5" /> Restore
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                title="Delete"
                aria-label="Delete saved calculation"
              >
                <Trash2 className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Standardized Action Toolbar Component ──────────────────────────────────

interface ActionToolbarProps {
  onCopyResult: () => void;
  onCopySummary: () => void;
  onCopyLatex: () => void;
  onExportCsv: () => void;
  onDownloadTxt: () => void;
  copiedType: string | null;
}

function ActionToolbar({
  onCopyResult,
  onCopySummary,
  onCopyLatex,
  onExportCsv,
  onDownloadTxt,
  copiedType,
}: ActionToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-zinc-100 dark:border-zinc-800 no-print print:hidden">
      <Button
        variant="outline"
        size="sm"
        onClick={onCopyResult}
        className="h-6 text-[9px] px-1.5 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Copy primary result"
      >
        {copiedType === "result" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
        {copiedType === "result" ? "Copied" : "Copy"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onCopySummary}
        className="h-6 text-[9px] px-1.5 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Copy calculation summary"
      >
        {copiedType === "summary" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
        {copiedType === "summary" ? "Copied Summary" : "Summary"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onCopyLatex}
        className="h-6 text-[9px] px-1.5 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Copy LaTeX formula"
      >
        {copiedType === "latex" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Sigma className="w-2.5 h-2.5 text-zinc-400" />}
        {copiedType === "latex" ? "Copied LaTeX" : "LaTeX"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onExportCsv}
        className="h-6 text-[9px] px-1.5 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Export calculation as CSV"
      >
        <FileSpreadsheet className="w-2.5 h-2.5 text-blue-500" /> CSV
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={onDownloadTxt}
        className="h-6 text-[9px] px-1.5 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
        aria-label="Download calculation as TXT report"
      >
        <FileText className="w-2.5 h-2.5 text-indigo-500" /> TXT
      </Button>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

interface Card1State {
  densityInput: string;
  densityUnit: string;
  volumeInput: string;
  volumeUnit: string;
  selectedMaterial: string;
}

interface Card2State {
  convertVal: string;
  convertFrom: string;
  convertTo: string;
}

interface Card3State {
  celestialMassKg: string;
}

export function MassCalculator() {
  // ─── CARD 1: MASS FROM DENSITY & VOLUME ───
  const [densityInput, setDensityInput] = useState<string>("8900");
  const [densityUnit, setDensityUnit] = useState<string>("kg_m3");
  const [volumeInput, setVolumeInput] = useState<string>("1");
  const [volumeUnit, setVolumeUnit] = useState<string>("m3");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("Copper");
  const [card1Result, setCard1Result] = useState<MassFromDensityResult | null>(null);
  const [card1Error, setCard1Error] = useState<string | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<MassFromDensityResult, Card1State>("saved_mass_from_density");

  // ─── CARD 2: UNIVERSAL MASS CONVERTER ───
  const [convertVal, setConvertVal] = useState<string>("1");
  const [convertFrom, setConvertFrom] = useState<string>("kg");
  const [convertTo, setConvertTo] = useState<string>("lb");
  const [convertResult, setConvertResult] = useState<MassConversionResult | null>(null);
  const [convertError, setConvertError] = useState<string | null>(null);
  const [convertSaveSuccess, setConvertSaveSuccess] = useState(false);
  const convertSaved = useCardSaved<MassConversionResult, Card2State>("saved_mass_converter");

  // ─── CARD 3: CELESTIAL PLANETARY WEIGHT ───
  const [celestialMassKg, setCelestialMassKg] = useState<string>("70");
  const [celestialResult, setCelestialResult] = useState<CelestialWeightResult | null>(null);
  const [celestialError, setCelestialError] = useState<string | null>(null);
  const [celestialSaveSuccess, setCelestialSaveSuccess] = useState(false);
  const celestialSaved = useCardSaved<CelestialWeightResult, Card3State>("saved_celestial_weight");

  // Feedback notifications
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [restoreFeedback, setRestoreFeedback] = useState<string | null>(null);

  // Global Report Modal
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── COMPUTATIONS ───

  const computeCard1 = useCallback(() => {
    const dParsed = parseNumericInput(densityInput, "Density");
    const vParsed = parseNumericInput(volumeInput, "Volume");

    if (!dParsed.valid) {
      setCard1Error(dParsed.error);
      setCard1Result(null);
      return;
    }
    if (!vParsed.valid) {
      setCard1Error(vParsed.error);
      setCard1Result(null);
      return;
    }

    setCard1Error(null);
    const res = calculateMassFromDensity({
      densityValue: dParsed.value!,
      densityUnitId: densityUnit,
      volumeValue: vParsed.value!,
      volumeUnitId: volumeUnit,
    });

    if (!res.valid) {
      setCard1Error(res.error || "Calculation error");
      setCard1Result(null);
    } else {
      setCard1Result(res);
    }
  }, [densityInput, densityUnit, volumeInput, volumeUnit]);

  const computeConverter = useCallback(() => {
    const parsed = parseNumericInput(convertVal, "Mass value");
    if (!parsed.valid) {
      setConvertError(parsed.error);
      setConvertResult(null);
      return;
    }

    setConvertError(null);
    const res = convertMass(convertFrom, convertTo, parsed.value!, 4);
    if (!res.valid) {
      setConvertError(res.error || "Conversion error");
      setConvertResult(null);
    } else {
      setConvertResult(res);
    }
  }, [convertFrom, convertTo, convertVal]);

  const computeCelestial = useCallback(() => {
    const parsed = parseNumericInput(celestialMassKg, "Mass");
    if (!parsed.valid) {
      setCelestialError(parsed.error);
      setCelestialResult(null);
      return;
    }

    setCelestialError(null);
    const res = calculateCelestialWeight(parsed.value!);
    if (!res.valid) {
      setCelestialError(res.error || "Planetary calculation error");
      setCelestialResult(null);
    } else {
      setCelestialResult(res);
    }
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

  // ─── RESTORE HANDLERS ───

  const handleRestoreCard1 = (state: Card1State) => {
    setDensityInput(state.densityInput);
    setDensityUnit(state.densityUnit);
    setVolumeInput(state.volumeInput);
    setVolumeUnit(state.volumeUnit);
    setSelectedMaterial(state.selectedMaterial);
    setRestoreFeedback("Mass from Density calculation restored!");
    setTimeout(() => setRestoreFeedback(null), 2000);
  };

  const handleRestoreCard2 = (state: Card2State) => {
    setConvertVal(state.convertVal);
    setConvertFrom(state.convertFrom);
    setConvertTo(state.convertTo);
    setRestoreFeedback("Converter calculation restored!");
    setTimeout(() => setRestoreFeedback(null), 2000);
  };

  const handleRestoreCard3 = (state: Card3State) => {
    setCelestialMassKg(state.celestialMassKg);
    setRestoreFeedback("Planetary calculation restored!");
    setTimeout(() => setRestoreFeedback(null), 2000);
  };

  // ─── EXPORT HELPERS ───

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Card 1 Exports
  const handleCard1CopySummary = () => {
    if (!card1Result) return;
    const dUnitDef = DENSITY_UNITS_CATALOG.find((u) => u.id === densityUnit);
    const vUnitDef = VOLUME_UNITS_CATALOG.find((u) => u.id === volumeUnit);
    const summary = [
      "CALCULATOR: Mass from Density & Volume",
      `Material Preset: ${selectedMaterial}`,
      `Density: ${densityInput} ${dUnitDef?.symbol || ""}`,
      `Volume: ${volumeInput} ${vUnitDef?.symbol || ""}`,
      `Formula: ${card1Result.formulaDescription}`,
      `Mass (kg): ${formatMassPrecision(card1Result.massKg, 4)} kg`,
      `Mass (lbs): ${formatMassPrecision(card1Result.massLbs, 4)} lbs`,
      `Mass (grams): ${formatMassPrecision(card1Result.massGrams, 4)} g`,
      `Mass (tonnes): ${formatMassPrecision(card1Result.massMetricTons, 4)} t`,
      `Timestamp: ${new Date().toLocaleString()}`,
    ].join("\n");
    copyToClipboard(summary, "c1_summary");
  };

  const handleCard1CopyLatex = () => {
    if (!card1Result) return;
    const dUnitDef = DENSITY_UNITS_CATALOG.find((u) => u.id === densityUnit);
    const vUnitDef = VOLUME_UNITS_CATALOG.find((u) => u.id === volumeUnit);
    const latex = `m = \\rho \\cdot V = (${densityInput}\\,\\mathrm{${dUnitDef?.symbol || "kg/m^3"}}) \\cdot (${volumeInput}\\,\\mathrm{${vUnitDef?.symbol || "m^3"}}) = ${formatMassPrecision(card1Result.massKg, 4)}\\,\\mathrm{kg}`;
    copyToClipboard(latex, "c1_latex");
  };

  const handleCard1ExportCsv = () => {
    if (!card1Result) return;
    const dUnitDef = DENSITY_UNITS_CATALOG.find((u) => u.id === densityUnit);
    const vUnitDef = VOLUME_UNITS_CATALOG.find((u) => u.id === volumeUnit);
    const headers = [
      "Module",
      "Material",
      "Density Input",
      "Density Unit",
      "Volume Input",
      "Volume Unit",
      "Formula",
      "Mass (kg)",
      "Mass (lbs)",
      "Mass (grams)",
      "Mass (metric tonnes)",
      "Timestamp",
    ];
    const row = [
      "Mass from Density",
      selectedMaterial,
      densityInput,
      dUnitDef?.symbol || "",
      volumeInput,
      vUnitDef?.symbol || "",
      card1Result.formulaDescription,
      card1Result.massKg,
      card1Result.massLbs,
      card1Result.massGrams,
      card1Result.massMetricTons,
      new Date().toISOString(),
    ];
    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      row.map((r) => `"${String(r).replace(/"/g, '""')}"`).join(","),
    ].join("\n");
    downloadFile(csvContent, "mass_density_calculation.csv", "text/csv;charset=utf-8;");
  };

  const handleCard1DownloadTxt = () => {
    if (!card1Result) return;
    const dUnitDef = DENSITY_UNITS_CATALOG.find((u) => u.id === densityUnit);
    const vUnitDef = VOLUME_UNITS_CATALOG.find((u) => u.id === volumeUnit);
    const txt = `=====================================================
MASS CALCULATION METROLOGY REPORT
Generated: ${new Date().toLocaleString()}
=====================================================
Module: Mass from Density & Volume (m = rho * V)
Material Preset: ${selectedMaterial}
Density: ${densityInput} ${dUnitDef?.symbol || ""}
Volume: ${volumeInput} ${vUnitDef?.symbol || ""}
Formula: ${card1Result.formulaDescription}

PRIMARY RESULTS:
- Mass in Kilograms (SI Base): ${formatMassPrecision(card1Result.massKg, 4)} kg
- Mass in Pounds (Avoirdupois): ${formatMassPrecision(card1Result.massLbs, 4)} lbs
- Mass in Grams: ${formatMassPrecision(card1Result.massGrams, 4)} g
- Mass in Metric Tonnes: ${formatMassPrecision(card1Result.massMetricTons, 4)} t
- Mass in Short Tons (US): ${formatMassPrecision(card1Result.massShortTons, 4)} ton (US)

CONVERSION MATRIX:
${card1Result.allConversions.map((c) => `  * ${c.unit.name} [${c.unit.symbol}]: ${c.formatted}`).join("\n")}
=====================================================`;
    downloadFile(txt, "mass_density_report.txt", "text/plain;charset=utf-8;");
  };

  // Card 2 Exports
  const handleCard2CopySummary = () => {
    if (!convertResult) return;
    const summary = [
      "CALCULATOR: Universal Mass & Weight Converter",
      `Input Value: ${convertResult.inputValue} ${convertResult.fromUnit.symbol}`,
      `Converted Value: ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
      `SI Base Equivalent: ${convertResult.massInKg.toFixed(4)} kg`,
      `Formula: ${convertResult.formulaDescription}`,
      `Timestamp: ${new Date().toLocaleString()}`,
    ].join("\n");
    copyToClipboard(summary, "c2_summary");
  };

  const handleCard2CopyLatex = () => {
    if (!convertResult) return;
    const factor = convertResult.fromUnit.toKg / convertResult.toUnit.toKg;
    const latex = `${convertResult.inputValue}\\,\\mathrm{${convertResult.fromUnit.symbol}} \\times ${formatMassPrecision(factor, 6)} = ${formatMassPrecision(convertResult.outputValue, 4)}\\,\\mathrm{${convertResult.toUnit.symbol}}`;
    copyToClipboard(latex, "c2_latex");
  };

  const handleCard2ExportCsv = () => {
    if (!convertResult) return;
    const headers = [
      "Module",
      "Input Value",
      "From Unit",
      "Output Value",
      "To Unit",
      "SI Base Mass (kg)",
      "Formula",
      "Timestamp",
    ];
    const row = [
      "Universal Mass Converter",
      convertResult.inputValue,
      convertResult.fromUnit.symbol,
      convertResult.outputValue,
      convertResult.toUnit.symbol,
      convertResult.massInKg,
      convertResult.formulaDescription,
      new Date().toISOString(),
    ];
    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      row.map((r) => `"${String(r).replace(/"/g, '""')}"`).join(","),
    ].join("\n");
    downloadFile(csvContent, "mass_conversion.csv", "text/csv;charset=utf-8;");
  };

  const handleCard2DownloadTxt = () => {
    if (!convertResult) return;
    const txt = `=====================================================
UNIVERSAL MASS CONVERSION REPORT
Generated: ${new Date().toLocaleString()}
=====================================================
Input: ${convertResult.inputValue} ${convertResult.fromUnit.name} (${convertResult.fromUnit.symbol})
Output: ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.name} (${convertResult.toUnit.symbol})
SI Base: ${convertResult.massInKg.toFixed(4)} kg
Formula: ${convertResult.formulaDescription}

ALL UNITS COMPARISON:
${convertResult.allConversions.map((c) => `  * ${c.unit.name} [${c.unit.symbol}]: ${c.formatted}`).join("\n")}
=====================================================`;
    downloadFile(txt, "mass_conversion_report.txt", "text/plain;charset=utf-8;");
  };

  // Card 3 Exports
  const handleCard3CopySummary = () => {
    if (!celestialResult) return;
    const summary = [
      "CALCULATOR: Planetary Gravitational Weight Visualizer (W = m * g)",
      `Constant Mass Input: ${celestialMassKg} kg (${(Number(celestialMassKg) * 2.20462).toFixed(2)} lbs mass)`,
      "CELESTIAL WEIGHT FORCE BREAKDOWN:",
      ...celestialResult.bodyResults.map(
        (b) => `  * ${b.body.name}: ${b.weightLbf.toFixed(1)} lbf | ${b.weightNewtons.toFixed(0)} N (g = ${b.body.surfaceGravity} m/s²)`
      ),
      "NOTE: Mass remains constant across planets; gravitational weight force varies according to local gravity.",
      `Timestamp: ${new Date().toLocaleString()}`,
    ].join("\n");
    copyToClipboard(summary, "c3_summary");
  };

  const handleCard3CopyLatex = () => {
    if (!celestialResult) return;
    const earth = celestialResult.bodyResults.find((b) => b.body.id === "earth");
    const latex = `W_{\\mathrm{Earth}} = m \\cdot g_{\\oplus} = (${celestialMassKg}\\,\\mathrm{kg}) \\cdot (9.80665\\,\\mathrm{m/s^2}) = ${earth?.weightNewtons.toFixed(2) || "0"}\\,\\mathrm{N} \\approx ${earth?.weightLbf.toFixed(1) || "0"}\\,\\mathrm{lbf}`;
    copyToClipboard(latex, "c3_latex");
  };

  const handleCard3ExportCsv = () => {
    if (!celestialResult) return;
    const headers = [
      "Constant Mass (kg)",
      "Celestial Body",
      "Surface Gravity (m/s²)",
      "Gravity vs Earth (%)",
      "Weight Force (N)",
      "Weight Force (lbf)",
      "Earth Scale Equivalent (kg)",
      "Timestamp",
    ];
    const rows = celestialResult.bodyResults.map((b) => [
      celestialMassKg,
      b.body.name,
      b.body.surfaceGravity,
      (b.body.relativeToEarth * 100).toFixed(1) + "%",
      b.weightNewtons,
      b.weightLbf,
      b.weightKgEquivalent,
      new Date().toISOString(),
    ]);
    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");
    downloadFile(csvContent, "planetary_weight_analysis.csv", "text/csv;charset=utf-8;");
  };

  const handleCard3DownloadTxt = () => {
    if (!celestialResult) return;
    const txt = `=====================================================
PLANETARY WEIGHT FORCE ANALYSIS (W = m * g)
Generated: ${new Date().toLocaleString()}
=====================================================
Invariant Mass: ${celestialMassKg} kg (${(Number(celestialMassKg) * 2.20462).toFixed(2)} lbs)
Physical Principle: Mass represents the quantity of matter and resistance to inertia, remaining unchanged across all planets. Weight is a gravitational force vector (W = m * g) that changes with local acceleration.

PLANETARY FORCES:
${celestialResult.bodyResults.map((b) => `  * ${b.body.name.padEnd(22)}: ${b.weightLbf.toFixed(1).padStart(7)} lbf  |  ${b.weightNewtons.toFixed(0).padStart(6)} N  (g = ${b.body.surfaceGravity} m/s²)`).join("\n")}
=====================================================`;
    downloadFile(txt, "planetary_weight_report.txt", "text/plain;charset=utf-8;");
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

    if (celestialResult) {
      sections.push({
        title: "Planetary Gravitational Weight Force (W = m × g)",
        items: [
          { label: "Invariant Mass", value: `${celestialMassKg} kg` },
          ...celestialResult.bodyResults.slice(0, 6).map((b) => ({
            label: `${b.body.name} Weight`,
            value: `${b.weightLbf.toFixed(1)} lbf (${b.weightNewtons.toFixed(0)} N)`,
          })),
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
  }, [card1Result, convertResult, celestialResult, celestialMassKg, densityInput, densityUnit, volumeInput, volumeUnit]);

  return (
    <div className="space-y-3">
      {/* Toast Notification Banner */}
      {restoreFeedback && (
        <div
          role="status"
          className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 rounded text-xs font-semibold flex items-center justify-between no-print print:hidden"
        >
          <span>{restoreFeedback}</span>
        </div>
      )}

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
            card1Result,
            { densityInput, densityUnit, volumeInput, volumeUnit, selectedMaterial }
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
            <label htmlFor="weight-material-preset" className="text-zinc-500 shrink-0 font-medium">
              Material Preset:
            </label>
            <select
              id="weight-material-preset"
              value={selectedMaterial}
              onChange={(e) => handleMaterialPreset(e.target.value)}
              aria-label="Material preset"
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
              <label htmlFor="weight-density-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Density:
              </label>
              <div className="grid grid-cols-12 gap-1">
                <Input
                  id="weight-density-input"
                  type="number"
                  value={densityInput}
                  onChange={(e) => setDensityInput(e.target.value)}
                  className="col-span-6 h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="8900"
                  aria-describedby={card1Error ? "weight-density-error" : undefined}
                />
                <select
                  id="weight-density-unit"
                  value={densityUnit}
                  onChange={(e) => setDensityUnit(e.target.value)}
                  aria-label="Density unit"
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
              <label htmlFor="weight-volume-input" className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">
                Volume:
              </label>
              <div className="grid grid-cols-12 gap-1">
                <Input
                  id="weight-volume-input"
                  type="number"
                  value={volumeInput}
                  onChange={(e) => setVolumeInput(e.target.value)}
                  className="col-span-6 h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                  placeholder="1"
                  aria-describedby={card1Error ? "weight-volume-error" : undefined}
                />
                <select
                  id="weight-volume-unit"
                  value={volumeUnit}
                  onChange={(e) => setVolumeUnit(e.target.value)}
                  aria-label="Volume unit"
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

          {/* Validation Alert */}
          {card1Error && (
            <div
              id="weight-density-error"
              role="alert"
              className="p-1.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded text-[11px] flex items-center gap-1.5"
            >
              <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
              <span>{card1Error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 pt-0.5 no-print print:hidden">
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
                setSelectedMaterial("Copper");
              }}
              className="h-7 text-xs px-2 cursor-pointer"
            >
              Clear
            </Button>
          </div>

          {/* Primary Result Banner */}
          {card1Result && (
            <div
              aria-live="polite"
              className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800 print:break-inside-avoid"
            >
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

                <div className="no-print print:hidden">
                  <Button
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `${formatMassPrecision(card1Result.massKg, 4)} kg (${formatMassPrecision(card1Result.massLbs, 4)} lbs)`,
                        "c1_res"
                      )
                    }
                    className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                    aria-label="Copy mass result"
                  >
                    {copiedId === "c1_res" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
                    {copiedId === "c1_res" ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Standardized Action Toolbar */}
              <ActionToolbar
                onCopyResult={() =>
                  copyToClipboard(
                    `${formatMassPrecision(card1Result.massKg, 4)} kg (${formatMassPrecision(card1Result.massLbs, 4)} lbs)`,
                    "result"
                  )
                }
                onCopySummary={handleCard1CopySummary}
                onCopyLatex={handleCard1CopyLatex}
                onExportCsv={handleCard1ExportCsv}
                onDownloadTxt={handleCard1DownloadTxt}
                copiedType={copiedId}
              />

              {/* All Units Mass Matrix Table */}
              <div className="space-y-1 print:break-inside-avoid">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL UNITS MASS CONVERSION MATRIX
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 max-h-36 overflow-y-auto print:max-h-none">
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
                        className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer no-print print:hidden"
                        title="Copy"
                        aria-label={`Copy value in ${c.unit.symbol}`}
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
          onRestore={handleRestoreCard1}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 2: UNIVERSAL MASS & WEIGHT CONVERTER ═══════════════════ */}
      <CompactCardWrapper
        title="Universal Mass & Weight Converter"
        hasResult={!!convertResult}
        isSaved={convertSaveSuccess}
        savedCount={convertSaved.saved.length}
        onToggleSaved={() => convertSaved.setIsOpen(!convertSaved.isOpen)}
        onSave={() => {
          if (!convertResult) return;
          convertSaved.save(
            `${convertResult.inputValue} ${convertResult.fromUnit.symbol} ➔ ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
            convertResult,
            { convertVal, convertFrom, convertTo }
          );
          flashSave(setConvertSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5">
            <label htmlFor="weight-converter-input" className="sr-only">
              Amount to convert
            </label>
            <Input
              id="weight-converter-input"
              type="number"
              value={convertVal}
              onChange={(e) => setConvertVal(e.target.value)}
              placeholder="Amount"
              aria-label="Amount to convert"
              className="h-7 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800 flex-1 min-w-[70px]"
            />

            <label htmlFor="weight-converter-from" className="sr-only">
              Convert from unit
            </label>
            <select
              id="weight-converter-from"
              value={convertFrom}
              onChange={(e) => setConvertFrom(e.target.value)}
              aria-label="Convert from unit"
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
              className="h-7 px-2 cursor-pointer no-print print:hidden"
              title="Swap From and To"
              aria-label="Swap from and to units"
            >
              <ArrowRightLeft className="w-3 h-3" />
            </Button>

            <label htmlFor="weight-converter-to" className="sr-only">
              Convert to unit
            </label>
            <select
              id="weight-converter-to"
              value={convertTo}
              onChange={(e) => setConvertTo(e.target.value)}
              aria-label="Convert to unit"
              className="h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-sans text-zinc-700 dark:text-zinc-300"
            >
              {MASS_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Validation Alert */}
          {convertError && (
            <div
              role="alert"
              className="p-1.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded text-[11px] flex items-center gap-1.5"
            >
              <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
              <span>{convertError}</span>
            </div>
          )}

          {convertResult && (
            <div
              aria-live="polite"
              className="space-y-1.5 print:break-inside-avoid"
            >
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

                <div className="no-print print:hidden">
                  <Button
                    variant="outline"
                    onClick={() =>
                      copyToClipboard(
                        `${convertResult.inputValue} ${convertResult.fromUnit.symbol} = ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
                        "conv_res"
                      )
                    }
                    className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                    aria-label="Copy conversion result"
                  >
                    {copiedId === "conv_res" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
                    {copiedId === "conv_res" ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Standardized Action Toolbar */}
              <ActionToolbar
                onCopyResult={() =>
                  copyToClipboard(
                    `${convertResult.inputValue} ${convertResult.fromUnit.symbol} = ${formatMassPrecision(convertResult.outputValue, 4)} ${convertResult.toUnit.symbol}`,
                    "result"
                  )
                }
                onCopySummary={handleCard2CopySummary}
                onCopyLatex={handleCard2CopyLatex}
                onExportCsv={handleCard2ExportCsv}
                onDownloadTxt={handleCard2DownloadTxt}
                copiedType={copiedId}
              />
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...convertSaved}
          cardTitle="Mass Converter"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatMassPrecision(r.outputValue, 3)} ${r.toUnit.symbol}`}
          onRestore={handleRestoreCard2}
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
            celestialResult,
            { celestialMassKg }
          );
          flashSave(setCelestialSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <label htmlFor="weight-celestial-mass" className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
              Mass in Kilograms:
            </label>
            <Input
              id="weight-celestial-mass"
              type="number"
              value={celestialMassKg}
              onChange={(e) => setCelestialMassKg(e.target.value)}
              className="h-7 w-28 text-xs font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
              placeholder="70"
              aria-label="Mass in Kilograms"
            />
            {Number.isFinite(Number(celestialMassKg)) && Number(celestialMassKg) >= 0 && (
              <span className="text-[10px] text-zinc-400 font-mono">
                kg (or {(Number(celestialMassKg) * 2.20462).toFixed(1)} lbs mass)
              </span>
            )}
          </div>

          <p className="text-[10px] text-zinc-500 italic">
            Mass remains constant ({celestialMassKg || "0"} kg everywhere); gravitational weight force varies with local gravity ($W = m \cdot g$). Displayed in pound-force (lbf) and Newtons (N).
          </p>

          {/* Validation Alert */}
          {celestialError && (
            <div
              role="alert"
              className="p-1.5 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded text-[11px] flex items-center gap-1.5"
            >
              <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
              <span>{celestialError}</span>
            </div>
          )}

          {celestialResult && (
            <div
              aria-live="polite"
              className="space-y-1.5 print:break-inside-avoid"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 pt-1">
                {celestialResult.bodyResults.slice(0, 6).map((b) => (
                  <div
                    key={b.body.id}
                    className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 text-center font-sans tabular-nums"
                  >
                    <span className="text-[9px] text-zinc-400 block font-medium">{b.body.name}</span>
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">
                      {b.weightLbf.toFixed(1)} lbf
                    </span>
                    <span className="text-[9px] text-zinc-500 block">{b.weightNewtons.toFixed(0)} N</span>
                  </div>
                ))}
              </div>

              {/* Standardized Action Toolbar */}
              <ActionToolbar
                onCopyResult={() => {
                  const earth = celestialResult.bodyResults.find((b) => b.body.id === "earth");
                  copyToClipboard(
                    `${celestialMassKg} kg mass = ${earth?.weightLbf.toFixed(1) || 0} lbf (${earth?.weightNewtons.toFixed(0) || 0} N) on Earth`,
                    "result"
                  );
                }}
                onCopySummary={handleCard3CopySummary}
                onCopyLatex={handleCard3CopyLatex}
                onExportCsv={handleCard3ExportCsv}
                onDownloadTxt={handleCard3DownloadTxt}
                copiedType={copiedId}
              />
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...celestialSaved}
          cardTitle="Planetary Weight"
          formatSummary={(r) => `${r.massKg} kg on Earth`}
          onRestore={handleRestoreCard3}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ REPORT TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-0.5 no-print print:hidden">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-7 text-[11px] font-semibold gap-1 cursor-pointer"
          aria-label="Generate Mass Metrology Sheet"
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
