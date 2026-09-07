"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ArrowRightLeft,
  Download,
  Trash2,
  FileSpreadsheet,
  Copy,
  Check,
  Search,
  RotateCcw,
  FileText,
  Code2,
  Bookmark,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  UnitCategory,
  CONVERSION_CATEGORIES,
  convertUnit,
  formatNumberPrecision,
  ConversionResult,
  UnitDefinition,
} from "@/lib/calculator-engine/formulas/conversion";

// ─── Input Validation Helper ────────────────────────────────────────────────

export function parseNumericInput(raw: string): {
  valid: boolean;
  value: number | null;
  error: string | null;
} {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return {
      valid: false,
      value: null,
      error: "Please enter a valid numeric value.",
    };
  }

  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return {
      valid: false,
      value: null,
      error: "Please enter a valid numeric value.",
    };
  }

  return {
    valid: true,
    value,
    error: null,
  };
}

// ─── Local Storage Persistence Hook with Complete Raw State ─────────────────

export interface SavedEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes?: string;
  rawInputs: {
    category: string;
    inputValue: string;
    fromUnit: string;
    toUnit: string;
    precision: number;
    scientificNotation: boolean;
  };
}

function flashNotification(setter: React.Dispatch<React.SetStateAction<string | null>>, msg: string) {
  setter(msg);
  setTimeout(() => setter(null), 2000);
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
    (inputSummary: string, result: T, rawInputs: SavedEstimate<T>["rawInputs"], notes = "") => {
      const entry: SavedEstimate<T> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        result,
        notes,
        rawInputs,
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

// ─── Clipboard Helper with Fallback ─────────────────────────────────────────

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback below
    }
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
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
    <div
      className="border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:border-zinc-300 print:shadow-none"
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      <div className="bg-blue-600 text-white px-3.5 py-2 flex items-center justify-between print:bg-zinc-800 print:text-white">
        <h3 className="font-bold text-xs tracking-wide text-white">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5 no-print">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                title="View saved conversions"
                aria-label={`View ${savedCount} saved conversions`}
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-white ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-white text-blue-700 hover:bg-blue-50 shadow-xs"
              }`}
              aria-label="Save current conversion"
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
  onRestore,
}: {
  saved: SavedEstimate<T>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore?: (item: SavedEstimate<T>) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Conversion Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `unit_conversion_${cardTitle.toLowerCase().replace(/\s+/g, "_")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs no-print">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} Conversions ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
            title="Download CSV of saved conversions"
            aria-label="Download CSV of saved conversions"
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
            title="Clear all saved conversions"
            aria-label="Clear all saved conversions"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-40 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums hover:border-blue-300 transition-colors"
          >
            <div className="truncate pr-2 flex-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block truncate">
                {formatSummary(item.result)}
              </span>
              <span className="text-[10px] text-zinc-400 truncate block">
                {item.inputSummary} • {item.timestamp}
              </span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {onRestore && (
                <button
                  type="button"
                  onClick={() => onRestore(item)}
                  className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800 rounded cursor-pointer transition-colors"
                  title="Restore saved conversion"
                  aria-label="Restore saved conversion"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 rounded cursor-pointer transition-colors"
                title="Delete saved conversion"
                aria-label="Delete saved conversion"
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

// ─── ACTION TOOLBAR COMPONENT ───────────────────────────────────────────────

interface ActionToolbarProps {
  categoryName: string;
  inputValue: number;
  fromUnit: UnitDefinition;
  toUnit: UnitDefinition;
  outputValue: number;
  precision: number;
  isScientific: boolean;
  formulaDescription: string;
  allConversions?: ConversionResult["allConversions"];
  isQuick?: boolean;
}

function CardActionBar({
  categoryName,
  inputValue,
  fromUnit,
  toUnit,
  outputValue,
  precision,
  isScientific,
  formulaDescription,
  allConversions,
  isQuick = false,
}: ActionToolbarProps) {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const formattedOutput = formatNumberPrecision(outputValue, precision, isScientific);

  const copyResult = async () => {
    const text = `${inputValue} ${fromUnit.symbol} = ${formattedOutput} ${toUnit.symbol}`;
    const success = await copyTextToClipboard(text);
    if (success) flashNotification(setToastMsg, "Copied Result!");
  };

  const copySummary = async () => {
    const summary = [
      `Conversion Takeoff:`,
      `Category: ${categoryName}`,
      `Input: ${inputValue} ${fromUnit.name} (${fromUnit.symbol})`,
      `Result: ${formattedOutput} ${toUnit.name} (${toUnit.symbol})`,
      `Formula: ${formulaDescription}`,
      `Precision: ${precision} Decimals${isScientific ? " (Scientific Exponential)" : ""}`,
      `Timestamp: ${new Date().toLocaleString()}`,
    ].join("\n");
    const success = await copyTextToClipboard(summary);
    if (success) flashNotification(setToastMsg, "Copied Summary!");
  };

  const copyLatex = async () => {
    let latex = "";
    const catLower = categoryName.toLowerCase();

    if (catLower.includes("temp")) {
      if (fromUnit.id === "celsius" && toUnit.id === "fahrenheit") {
        latex = `^\\circ\\mathrm{F} = (^\\circ\\mathrm{C} \\times \\frac{9}{5}) + 32 \\implies ${inputValue}^\\circ\\mathrm{C} = ${formattedOutput}^\\circ\\mathrm{F}`;
      } else if (fromUnit.id === "fahrenheit" && toUnit.id === "celsius") {
        latex = `^\\circ\\mathrm{C} = (^\\circ\\mathrm{F} - 32) \\times \\frac{5}{9} \\implies ${inputValue}^\\circ\\mathrm{F} = ${formattedOutput}^\\circ\\mathrm{C}`;
      } else if (fromUnit.id === "celsius" && toUnit.id === "kelvin") {
        latex = `\\mathrm{K} = ^\\circ\\mathrm{C} + 273.15 \\implies ${inputValue}^\\circ\\mathrm{C} = ${formattedOutput}\\,\\mathrm{K}`;
      } else {
        latex = `${inputValue}\\,\\mathrm{${fromUnit.symbol}} = ${formattedOutput}\\,\\mathrm{${toUnit.symbol}}`;
      }
    } else if (catLower.includes("fuel")) {
      if (fromUnit.id === "l_100km" || toUnit.id === "l_100km") {
        latex = `\\mathrm{L/100km} = \\frac{235.214583}{\\mathrm{MPG}} \\implies ${inputValue}\\,\\mathrm{${fromUnit.symbol}} = ${formattedOutput}\\,\\mathrm{${toUnit.symbol}}`;
      } else {
        latex = `${inputValue}\\,\\mathrm{${fromUnit.symbol}} = ${formattedOutput}\\,\\mathrm{${toUnit.symbol}}`;
      }
    } else {
      latex = `${inputValue}\\,\\mathrm{${fromUnit.symbol}} = ${formattedOutput}\\,\\mathrm{${toUnit.symbol}}`;
    }

    const success = await copyTextToClipboard(latex);
    if (success) flashNotification(setToastMsg, "Copied LaTeX!");
  };

  const exportCsv = () => {
    const rows = [
      ["Category", "Input Value", "From Unit", "To Unit", "Result", "Precision", "Scientific Notation", "Formula", "Timestamp"],
      [
        categoryName,
        inputValue.toString(),
        `${fromUnit.name} (${fromUnit.symbol})`,
        `${toUnit.name} (${toUnit.symbol})`,
        formattedOutput,
        precision.toString(),
        isScientific ? "YES" : "NO",
        formulaDescription,
        new Date().toISOString(),
      ],
    ];

    if (allConversions && allConversions.length > 0) {
      rows.push([]);
      rows.push(["Full Category Conversion Matrix", "", "", "", "", "", "", "", ""]);
      rows.push(["Unit Name", "Symbol", "Converted Value", "", "", "", "", "", ""]);
      allConversions.forEach((c) => {
        rows.push([c.unit.name, c.unit.symbol, c.formatted, "", "", "", "", "", ""]);
      });
    }

    const csvContent = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversion_${categoryName.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    flashNotification(setToastMsg, "CSV Downloaded!");
  };

  const downloadTxt = () => {
    const lines = [
      "============================================================",
      "UNIVERSAL MULTI-CATEGORY CONVERSION REPORT",
      "CalcPlatform Metrology Engine",
      `Timestamp: ${new Date().toLocaleString()}`,
      "============================================================",
      `Category:             ${categoryName}`,
      `Input Quantity:       ${inputValue} ${fromUnit.name} (${fromUnit.symbol})`,
      `Target Result:        ${formattedOutput} ${toUnit.name} (${toUnit.symbol})`,
      `Mathematical Formula: ${formulaDescription}`,
      `Display Precision:    ${precision} Decimals`,
      `Exponential Notation: ${isScientific ? "Active" : "Disabled"}`,
      "",
    ];

    if (allConversions && allConversions.length > 0) {
      lines.push("------------------------------------------------------------");
      lines.push(`ALL ${categoryName.toUpperCase()} UNITS MATRIX:`);
      lines.push("------------------------------------------------------------");
      allConversions.forEach((c) => {
        lines.push(`${c.unit.name.padEnd(25)} (${c.unit.symbol.padEnd(8)}): ${c.formatted}`);
      });
      lines.push("------------------------------------------------------------");
    }

    lines.push("Generated by CalcPlatform Universal Unit Converter.");
    lines.push("Reference Standards: SI BIPM / NIST SP 811 / ISO 80000-1.");

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversion_${categoryName.toLowerCase().replace(/\s+/g, "_")}_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    flashNotification(setToastMsg, "TXT Downloaded!");
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800 text-[11px] no-print">
      <div className="flex flex-wrap items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copyResult}
          className="h-6 text-[11px] px-2 font-medium gap-1 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
          title="Copy converted result to clipboard"
          aria-label="Copy result"
        >
          <Copy className="w-3 h-3 text-zinc-400" />
          Copy
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={copySummary}
          className="h-6 text-[11px] px-2 font-medium gap-1 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
          title="Copy detailed summary to clipboard"
          aria-label="Copy conversion summary"
        >
          <FileText className="w-3 h-3 text-zinc-400" />
          Summary
        </Button>

        {!isQuick && (
          <>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={copyLatex}
              className="h-6 text-[11px] px-2 font-medium gap-1 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
              title="Copy mathematical LaTeX formula"
              aria-label="Copy LaTeX formula"
            >
              <Code2 className="w-3 h-3 text-zinc-400" />
              LaTeX
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={exportCsv}
              className="h-6 text-[11px] px-2 font-medium gap-1 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
              title="Export complete conversion matrix as CSV"
              aria-label="Export CSV"
            >
              <Download className="w-3 h-3 text-zinc-400" />
              CSV
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={downloadTxt}
              className="h-6 text-[11px] px-2 font-medium gap-1 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 cursor-pointer"
              title="Download text conversion report"
              aria-label="Download TXT report"
            >
              <FileSpreadsheet className="w-3 h-3 text-zinc-400" />
              TXT
            </Button>
          </>
        )}
      </div>

      {toastMsg && (
        <span
          role="status"
          className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 animate-in fade-in"
        >
          <CheckCircle2 className="w-3 h-3" />
          {toastMsg}
        </span>
      )}
    </div>
  );
}

// ─── RELATIVE UNIT MAGNITUDE VISUALIZER ──────────────────────────────────────

function UnitMagnitudeVisualizer({
  result,
}: {
  result: ConversionResult;
}) {
  // Guarantee active fromUnit and toUnit are ALWAYS present
  const activeFrom = result.fromUnit;
  const activeTo = result.toUnit;

  // Curate a compact list (up to 7 units) that always includes fromUnit and toUnit
  const curatedList = useMemo(() => {
    const includedMap = new Map<string, ConversionResult["allConversions"][0]>();

    // 1. Always add active fromUnit
    const fromConv = result.allConversions.find((c) => c.unit.id === activeFrom.id);
    if (fromConv) includedMap.set(fromConv.unit.id, fromConv);

    // 2. Always add active toUnit
    const toConv = result.allConversions.find((c) => c.unit.id === activeTo.id);
    if (toConv) includedMap.set(toConv.unit.id, toConv);

    // 3. Fill up to 7 items using prominent units from allConversions
    for (const conv of result.allConversions) {
      if (includedMap.size >= 7) break;
      if (!includedMap.has(conv.unit.id)) {
        includedMap.set(conv.unit.id, conv);
      }
    }

    return Array.from(includedMap.values());
  }, [result, activeFrom, activeTo]);

  // Logarithmic Normalization to prevent 4% flatlines across 15 orders of magnitude
  const { minLog, maxLog, hasPositives } = useMemo(() => {
    const nonZeroAbs = curatedList
      .map((c) => Math.abs(c.value))
      .filter((v) => Number.isFinite(v) && v > 0);

    if (nonZeroAbs.length === 0) {
      return { minLog: 0, maxLog: 1, hasPositives: false };
    }

    const minL = Math.min(...nonZeroAbs.map((v) => Math.log10(v)));
    const maxL = Math.max(...nonZeroAbs.map((v) => Math.log10(v)));
    return { minLog: minL, maxLog: maxL, hasPositives: true };
  }, [curatedList]);

  return (
    <div className="w-full space-y-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
        <span>RELATIVE MAGNITUDE SCALE (NORMALIZED)</span>
        <span className="font-mono">
          Baseline: {result.inputValue} {result.fromUnit.symbol}
        </span>
      </div>

      <div className="space-y-1.5">
        {curatedList.map((item) => {
          const absVal = Math.abs(item.value);
          let pct = 50;

          if (absVal === 0) {
            pct = 6;
          } else if (!hasPositives || maxLog === minLog) {
            pct = 50;
          } else {
            const logVal = Math.log10(absVal);
            pct = Math.max(12, Math.min(100, 12 + ((logVal - minLog) / (maxLog - minLog)) * 88));
          }

          const isTarget = item.unit.id === result.toUnit.id;
          const isSource = item.unit.id === result.fromUnit.id;

          return (
            <div key={item.unit.id} className="space-y-0.5 text-[10px] font-sans">
              <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                <span
                  className={`truncate flex items-center gap-1 ${
                    isTarget
                      ? "font-bold text-blue-600 dark:text-blue-400"
                      : isSource
                      ? "font-semibold text-zinc-900 dark:text-zinc-100"
                      : "font-normal"
                  }`}
                >
                  <span className="truncate">{item.unit.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({item.unit.symbol})</span>
                  {isTarget && (
                    <span className="ml-1 px-1 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-[9px] font-extrabold uppercase">
                      Target
                    </span>
                  )}
                  {isSource && !isTarget && (
                    <span className="ml-1 px-1 py-0.2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[9px] font-medium uppercase">
                      Source
                    </span>
                  )}
                </span>
                <span className="tabular-nums font-mono font-semibold ml-2 shrink-0">
                  {item.formatted}
                </span>
              </div>

              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isTarget
                      ? "bg-blue-600 dark:bg-blue-400 shadow-xs"
                      : isSource
                      ? "bg-blue-400 dark:bg-blue-500"
                      : "bg-blue-300/80 dark:bg-blue-700/60"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN CONVERTER COMPONENT ───────────────────────────────────────────────

export function ConversionCalculator() {
  // ─── CARD 1: UNIVERSAL MULTI-CATEGORY CONVERTER ───
  const [category, setCategory] = useState<UnitCategory>("length");
  const [inputValue, setInputValue] = useState<string>("100");
  const [fromUnitId, setFromUnitId] = useState<string>("meter");
  const [toUnitId, setToUnitId] = useState<string>("foot");
  const [precision, setPrecision] = useState<number>(4);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [fromSearch, setFromSearch] = useState<string>("");
  const [toSearch, setToSearch] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [card1Error, setCard1Error] = useState<string | null>(null);

  const [card1Result, setCard1Result] = useState<ConversionResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const [card1RestoreToast, setCard1RestoreToast] = useState<string | null>(null);
  const card1Saved = useCardSaved<ConversionResult>("saved_conversion_universal");

  // ─── CARD 2: QUICK LENGTH CONVERTER ───
  const [lenVal, setLenVal] = useState("10");
  const [lenFrom, setLenFrom] = useState("meter");
  const [lenTo, setLenTo] = useState("foot");
  const [lenError, setLenError] = useState<string | null>(null);
  const [lenResult, setLenResult] = useState<ConversionResult | null>(null);
  const [lenSaveSuccess, setLenSaveSuccess] = useState(false);
  const lenSaved = useCardSaved<ConversionResult>("saved_conversion_length");

  // ─── CARD 3: QUICK WEIGHT CONVERTER ───
  const [wtVal, setWtVal] = useState("150");
  const [wtFrom, setWtFrom] = useState("pound");
  const [wtTo, setWtTo] = useState("kilogram");
  const [wtError, setWtError] = useState<string | null>(null);
  const [wtResult, setWtResult] = useState<ConversionResult | null>(null);
  const [wtSaveSuccess, setWtSaveSuccess] = useState(false);
  const wtSaved = useCardSaved<ConversionResult>("saved_conversion_weight");

  // ─── CARD 4: QUICK TEMPERATURE CONVERTER ───
  const [tempVal, setTempVal] = useState("100");
  const [tempFrom, setTempFrom] = useState("celsius");
  const [tempTo, setTempTo] = useState("fahrenheit");
  const [tempError, setTempError] = useState<string | null>(null);
  const [tempResult, setTempResult] = useState<ConversionResult | null>(null);
  const [tempSaveSuccess, setTempSaveSuccess] = useState(false);
  const tempSaved = useCardSaved<ConversionResult>("saved_conversion_temp");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Category change handler
  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const catDef = CONVERSION_CATEGORIES[newCat];
    if (catDef && catDef.units.length >= 2) {
      setFromUnitId(catDef.units[0].id);
      setToUnitId(catDef.units[1].id);
    }
  };

  // Swap Units
  const handleSwapUnits = () => {
    const prevFrom = fromUnitId;
    const prevTo = toUnitId;
    setFromUnitId(prevTo);
    setToUnitId(prevFrom);
  };

  // Calculations with explicit input validation
  const computeCard1 = useCallback(() => {
    const parsed = parseNumericInput(inputValue);
    if (!parsed.valid || parsed.value === null) {
      setCard1Error(parsed.error);
      setCard1Result(null);
      return;
    }
    setCard1Error(null);
    const res = convertUnit(category, fromUnitId, toUnitId, parsed.value, precision, isScientific);
    setCard1Result(res);
  }, [category, fromUnitId, toUnitId, inputValue, precision, isScientific]);

  const computeCard2 = useCallback(() => {
    const parsed = parseNumericInput(lenVal);
    if (!parsed.valid || parsed.value === null) {
      setLenError(parsed.error);
      setLenResult(null);
      return;
    }
    setLenError(null);
    const res = convertUnit("length", lenFrom, lenTo, parsed.value, 4, false);
    setLenResult(res);
  }, [lenVal, lenFrom, lenTo]);

  const computeCard3 = useCallback(() => {
    const parsed = parseNumericInput(wtVal);
    if (!parsed.valid || parsed.value === null) {
      setWtError(parsed.error);
      setWtResult(null);
      return;
    }
    setWtError(null);
    const res = convertUnit("weight", wtFrom, wtTo, parsed.value, 4, false);
    setWtResult(res);
  }, [wtVal, wtFrom, wtTo]);

  const computeCard4 = useCallback(() => {
    const parsed = parseNumericInput(tempVal);
    if (!parsed.valid || parsed.value === null) {
      setTempError(parsed.error);
      setTempResult(null);
      return;
    }
    setTempError(null);
    const res = convertUnit("temperature", tempFrom, tempTo, parsed.value, 2, false);
    setTempResult(res);
  }, [tempVal, tempFrom, tempTo]);

  useEffect(() => {
    computeCard1();
  }, [computeCard1]);

  useEffect(() => {
    computeCard2();
  }, [computeCard2]);

  useEffect(() => {
    computeCard3();
  }, [computeCard3]);

  useEffect(() => {
    computeCard4();
  }, [computeCard4]);

  const copyToClipboard = async (text: string, id: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  // Restore Handlers
  const handleRestoreCard1 = (item: SavedEstimate<ConversionResult>) => {
    if (item.rawInputs) {
      setCategory(item.rawInputs.category as UnitCategory);
      setInputValue(item.rawInputs.inputValue);
      setFromUnitId(item.rawInputs.fromUnit);
      setToUnitId(item.rawInputs.toUnit);
      setPrecision(item.rawInputs.precision);
      setIsScientific(item.rawInputs.scientificNotation);
      flashNotification(setCard1RestoreToast, "Conversion restored");
    }
  };

  const handleRestoreCard2 = (item: SavedEstimate<ConversionResult>) => {
    if (item.rawInputs) {
      setLenVal(item.rawInputs.inputValue);
      setLenFrom(item.rawInputs.fromUnit);
      setLenTo(item.rawInputs.toUnit);
    }
  };

  const handleRestoreCard3 = (item: SavedEstimate<ConversionResult>) => {
    if (item.rawInputs) {
      setWtVal(item.rawInputs.inputValue);
      setWtFrom(item.rawInputs.fromUnit);
      setWtTo(item.rawInputs.toUnit);
    }
  };

  const handleRestoreCard4 = (item: SavedEstimate<ConversionResult>) => {
    if (item.rawInputs) {
      setTempVal(item.rawInputs.inputValue);
      setTempFrom(item.rawInputs.fromUnit);
      setTempTo(item.rawInputs.toUnit);
    }
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result) {
      sections.push({
        title: `Universal Conversion — ${CONVERSION_CATEGORIES[category].name}`,
        items: [
          {
            label: "Input Value",
            value: `${card1Result.inputValue} ${card1Result.fromUnit.name} (${card1Result.fromUnit.symbol})`,
          },
          {
            label: "Primary Converted Value",
            value: `${formatNumberPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.name} (${card1Result.toUnit.symbol})`,
          },
          { label: "Formula Step", value: card1Result.formulaDescription },
        ],
      });

      sections.push({
        title: `All ${CONVERSION_CATEGORIES[category].name} Units Matrix`,
        items: card1Result.allConversions.map((c) => ({
          label: `${c.unit.name} (${c.unit.symbol})`,
          value: c.formatted,
        })),
      });
    }

    return {
      meta: {
        calculatorName: "Conversion Calculator",
        reportTitle: "Universal Unit Metrology & Conversion Takeoff",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        {
          label: "Input Stated",
          value: card1Result ? `${card1Result.inputValue} ${card1Result.fromUnit.symbol}` : "—",
        },
        {
          label: "Primary Conversion",
          value: card1Result
            ? `${formatNumberPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol}`
            : "—",
          highlight: true,
        },
        { label: "Active Category", value: CONVERSION_CATEGORIES[category].name },
      ],
      sections,
    };
  }, [card1Result, category, precision, isScientific]);

  const currentCatDef = CONVERSION_CATEGORIES[category];
  const filteredFromUnits = currentCatDef.units.filter(
    (u) =>
      u.name.toLowerCase().includes(fromSearch.toLowerCase()) ||
      u.symbol.toLowerCase().includes(fromSearch.toLowerCase())
  );
  const filteredToUnits = currentCatDef.units.filter(
    (u) =>
      u.name.toLowerCase().includes(toSearch.toLowerCase()) ||
      u.symbol.toLowerCase().includes(toSearch.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* ═══════════════════ CARD 1: UNIVERSAL MULTI-CATEGORY CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Universal Multi-Category Unit Converter"
        hasResult={!!card1Result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result) return;
          card1Saved.save(
            `${card1Result.inputValue} ${card1Result.fromUnit.symbol} ➔ ${formatNumberPrecision(
              card1Result.outputValue,
              precision,
              isScientific
            )} ${card1Result.toUnit.symbol} (${currentCatDef.name})`,
            card1Result,
            {
              category,
              inputValue,
              fromUnit: fromUnitId,
              toUnit: toUnitId,
              precision,
              scientificNotation: isScientific,
            }
          );
          setCard1SaveSuccess(true);
          setTimeout(() => setCard1SaveSuccess(false), 1500);
        }}
      >
        <div className="space-y-3">
          {/* Category Tabs (Hidden in Print) */}
          <div className="overflow-x-auto pb-1 no-print">
            <div className="flex gap-1 min-w-max" role="tablist" aria-label="Conversion categories">
              {(Object.keys(CONVERSION_CATEGORIES) as UnitCategory[]).map((catKey) => {
                const cat = CONVERSION_CATEGORIES[catKey];
                const isActive = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(catKey)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Precision & Notation (Hidden in Print) */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-zinc-100 dark:border-zinc-800 text-xs no-print">
            <div className="flex items-center gap-2">
              <label
                htmlFor="conversion-precision-select"
                className="font-semibold text-zinc-600 dark:text-zinc-400 text-xs"
              >
                Decimals:
              </label>
              <select
                id="conversion-precision-select"
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value))}
                aria-label="Decimal precision selector"
                className="h-6 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={2}>2 Decimals</option>
                <option value={3}>3 Decimals</option>
                <option value={4}>4 Decimals</option>
                <option value={6}>6 Decimals</option>
                <option value={8}>8 Decimals</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <label
                htmlFor="conversion-scientific-checkbox"
                className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 cursor-pointer font-medium text-xs"
              >
                <input
                  id="conversion-scientific-checkbox"
                  type="checkbox"
                  checked={isScientific}
                  onChange={(e) => setIsScientific(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                Scientific Notation (Exp)
              </label>
            </div>
          </div>

          {/* Main Dual Column Selector & Value Input (Interactive - Hidden in Print) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 no-print">
            {/* Left Box: FROM UNIT */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="conversion-source-input"
                  className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300"
                >
                  From:
                </label>
                <div className="relative w-28">
                  <Search className="w-3 h-3 absolute left-1.5 top-1.5 text-zinc-400" />
                  <input
                    id="conversion-from-search"
                    type="text"
                    value={fromSearch}
                    onChange={(e) => setFromSearch(e.target.value)}
                    placeholder="Search..."
                    aria-label="Search source units"
                    className="w-full h-6 pl-5 pr-1 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
                  />
                </div>
              </div>

              <Input
                id="conversion-source-input"
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={`h-8 text-sm font-bold font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  card1Error ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                placeholder="Enter value"
                aria-invalid={!!card1Error}
                aria-describedby={card1Error ? "conversion-source-error" : undefined}
              />

              {card1Error && (
                <p id="conversion-source-error" role="alert" className="text-[11px] text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {card1Error}
                </p>
              )}

              <div
                role="listbox"
                aria-label="Select source unit"
                className="h-36 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-1 space-y-0.5"
              >
                {filteredFromUnits.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    role="option"
                    aria-selected={fromUnitId === unit.id}
                    onClick={() => setFromUnitId(unit.id)}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-all flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${
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
                aria-label="Swap source and target units"
                className="p-2 rounded-full bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-700 hover:bg-blue-100 dark:hover:bg-zinc-700 text-blue-600 dark:text-blue-400 cursor-pointer shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <label
                  htmlFor="conversion-target-display"
                  className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300"
                >
                  To:
                </label>
                <div className="relative w-28">
                  <Search className="w-3 h-3 absolute left-1.5 top-1.5 text-zinc-400" />
                  <input
                    id="conversion-to-search"
                    type="text"
                    value={toSearch}
                    onChange={(e) => setToSearch(e.target.value)}
                    placeholder="Search..."
                    aria-label="Search target units"
                    className="w-full h-6 pl-5 pr-1 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
                  />
                </div>
              </div>

              <div
                id="conversion-target-display"
                className="h-8 px-3 rounded border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-between text-sm font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums"
                aria-live="polite"
              >
                <span>
                  {card1Result
                    ? formatNumberPrecision(card1Result.outputValue, precision, isScientific)
                    : "—"}
                </span>
                <span className="text-xs text-blue-700 dark:text-blue-300">
                  {card1Result?.toUnit.symbol}
                </span>
              </div>

              <div
                role="listbox"
                aria-label="Select target unit"
                className="h-36 overflow-y-auto rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-1 space-y-0.5"
              >
                {filteredToUnits.map((unit) => (
                  <button
                    key={unit.id}
                    type="button"
                    role="option"
                    aria-selected={toUnitId === unit.id}
                    onClick={() => setToUnitId(unit.id)}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-all flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 ${
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

          {/* Clean Presentation Block for Print View */}
          {card1Result && (
            <div className="hidden print:block my-3 p-3 bg-zinc-50 border border-zinc-300 rounded text-xs">
              <span className="font-bold text-zinc-600 uppercase text-[10px] block mb-1">
                Active Conversion ({currentCatDef.name})
              </span>
              <div className="text-base font-bold text-zinc-900">
                {card1Result.inputValue} {card1Result.fromUnit.name} ({card1Result.fromUnit.symbol}) ={" "}
                {formatNumberPrecision(card1Result.outputValue, precision, isScientific)}{" "}
                {card1Result.toUnit.name} ({card1Result.toUnit.symbol})
              </div>
              <div className="text-[11px] font-mono text-zinc-600 mt-1">
                Formula: {card1Result.formulaDescription}
              </div>
            </div>
          )}

          {/* Result Formula Banner & Magnitude Visualizer */}
          {card1Result && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div
                className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2"
                aria-live="polite"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                      CONVERSION RESULT &amp; MULTIPLIER EQUATION
                    </span>
                    <div className="text-base font-black text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                      {card1Result.inputValue} {card1Result.fromUnit.symbol} ={" "}
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatNumberPrecision(card1Result.outputValue, precision, isScientific)}
                      </span>{" "}
                      {card1Result.toUnit.symbol}
                    </div>
                    <div className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {card1Result.formulaDescription}
                    </div>
                  </div>
                </div>

                <CardActionBar
                  categoryName={currentCatDef.name}
                  inputValue={card1Result.inputValue}
                  fromUnit={card1Result.fromUnit}
                  toUnit={card1Result.toUnit}
                  outputValue={card1Result.outputValue}
                  precision={precision}
                  isScientific={isScientific}
                  formulaDescription={card1Result.formulaDescription}
                  allConversions={card1Result.allConversions}
                />
              </div>

              {/* Relative Magnitude Scale */}
              <UnitMagnitudeVisualizer result={card1Result} />

              {/* All Units Matrix */}
              <div
                className="space-y-1.5"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL {currentCatDef.name.toUpperCase()} UNITS MATRIX
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto print:max-h-none print:overflow-visible">
                  {card1Result.allConversions.map((c) => (
                    <div
                      key={c.unit.id}
                      className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between text-xs font-sans tabular-nums print:bg-white print:border-zinc-300"
                    >
                      <div className="truncate pr-1">
                        <span className="font-medium text-zinc-600 dark:text-zinc-400 text-[10px] block truncate">
                          {c.unit.name} ({c.unit.symbol})
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono text-[11px]">
                          {c.formatted}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(`${c.formatted} ${c.unit.symbol}`, c.unit.id)}
                        className="text-zinc-400 hover:text-blue-600 p-1 cursor-pointer no-print focus:outline-none focus:ring-1 focus:ring-blue-500 rounded"
                        title={`Copy ${c.unit.name} value`}
                        aria-label={`Copy ${c.unit.name} value`}
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

        {card1RestoreToast && (
          <div className="mt-2 p-1.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs rounded font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {card1RestoreToast}
          </div>
        )}

        <SavedDrawer
          {...card1Saved}
          cardTitle="Universal"
          formatSummary={(r) =>
            `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 4)} ${
              r.toUnit.symbol
            }`
          }
          onRestore={handleRestoreCard1}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: QUICK LENGTH & DISTANCE CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Quick Length & Distance Converter"
        hasResult={!!lenResult}
        isSaved={lenSaveSuccess}
        savedCount={lenSaved.saved.length}
        onToggleSaved={() => lenSaved.setIsOpen(!lenSaved.isOpen)}
        onSave={() => {
          if (!lenResult) return;
          lenSaved.save(
            `${lenResult.inputValue} ${lenResult.fromUnit.symbol} = ${formatNumberPrecision(
              lenResult.outputValue,
              4
            )} ${lenResult.toUnit.symbol}`,
            lenResult,
            {
              category: "length",
              inputValue: lenVal,
              fromUnit: lenFrom,
              toUnit: lenTo,
              precision: 4,
              scientificNotation: false,
            }
          );
          setLenSaveSuccess(true);
          setTimeout(() => setLenSaveSuccess(false), 1500);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700 no-print">
            <div>
              <label
                htmlFor="quick-len-value"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                Value
              </label>
              <Input
                id="quick-len-value"
                type="text"
                inputMode="decimal"
                value={lenVal}
                onChange={(e) => setLenVal(e.target.value)}
                className={`h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  lenError ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                placeholder="Length"
                aria-invalid={!!lenError}
              />
              {lenError && (
                <p role="alert" className="text-[10px] text-red-600 dark:text-red-400 mt-0.5">
                  {lenError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quick-len-from"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                From
              </label>
              <select
                id="quick-len-from"
                value={lenFrom}
                onChange={(e) => setLenFrom(e.target.value)}
                aria-label="Quick length source unit"
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CONVERSION_CATEGORIES.length.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quick-len-to"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                To
              </label>
              <select
                id="quick-len-to"
                value={lenTo}
                onChange={(e) => setLenTo(e.target.value)}
                aria-label="Quick length target unit"
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CONVERSION_CATEGORIES.length.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {lenResult && (
            <div
              className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 space-y-1.5"
              aria-live="polite"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {lenResult.inputValue} {lenResult.fromUnit.symbol} ={" "}
                  {formatNumberPrecision(lenResult.outputValue, 4)} {lenResult.toUnit.symbol}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {lenResult.formulaDescription}
                </span>
              </div>

              <CardActionBar
                categoryName="Length"
                inputValue={lenResult.inputValue}
                fromUnit={lenResult.fromUnit}
                toUnit={lenResult.toUnit}
                outputValue={lenResult.outputValue}
                precision={4}
                isScientific={false}
                formulaDescription={lenResult.formulaDescription}
                isQuick
              />
            </div>
          )}
        </div>

        <SavedDrawer
          {...lenSaved}
          cardTitle="Length"
          formatSummary={(r) =>
            `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 4)} ${
              r.toUnit.symbol
            }`
          }
          onRestore={handleRestoreCard2}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: QUICK WEIGHT & MASS CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Quick Weight & Mass Converter"
        hasResult={!!wtResult}
        isSaved={wtSaveSuccess}
        savedCount={wtSaved.saved.length}
        onToggleSaved={() => wtSaved.setIsOpen(!wtSaved.isOpen)}
        onSave={() => {
          if (!wtResult) return;
          wtSaved.save(
            `${wtResult.inputValue} ${wtResult.fromUnit.symbol} = ${formatNumberPrecision(
              wtResult.outputValue,
              4
            )} ${wtResult.toUnit.symbol}`,
            wtResult,
            {
              category: "weight",
              inputValue: wtVal,
              fromUnit: wtFrom,
              toUnit: wtTo,
              precision: 4,
              scientificNotation: false,
            }
          );
          setWtSaveSuccess(true);
          setTimeout(() => setWtSaveSuccess(false), 1500);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700 no-print">
            <div>
              <label
                htmlFor="quick-wt-value"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                Value
              </label>
              <Input
                id="quick-wt-value"
                type="text"
                inputMode="decimal"
                value={wtVal}
                onChange={(e) => setWtVal(e.target.value)}
                className={`h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  wtError ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                placeholder="Weight"
                aria-invalid={!!wtError}
              />
              {wtError && (
                <p role="alert" className="text-[10px] text-red-600 dark:text-red-400 mt-0.5">
                  {wtError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quick-wt-from"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                From
              </label>
              <select
                id="quick-wt-from"
                value={wtFrom}
                onChange={(e) => setWtFrom(e.target.value)}
                aria-label="Quick weight source unit"
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CONVERSION_CATEGORIES.weight.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quick-wt-to"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                To
              </label>
              <select
                id="quick-wt-to"
                value={wtTo}
                onChange={(e) => setWtTo(e.target.value)}
                aria-label="Quick weight target unit"
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CONVERSION_CATEGORIES.weight.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {wtResult && (
            <div
              className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 space-y-1.5"
              aria-live="polite"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {wtResult.inputValue} {wtResult.fromUnit.symbol} ={" "}
                  {formatNumberPrecision(wtResult.outputValue, 4)} {wtResult.toUnit.symbol}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {wtResult.formulaDescription}
                </span>
              </div>

              <CardActionBar
                categoryName="Weight"
                inputValue={wtResult.inputValue}
                fromUnit={wtResult.fromUnit}
                toUnit={wtResult.toUnit}
                outputValue={wtResult.outputValue}
                precision={4}
                isScientific={false}
                formulaDescription={wtResult.formulaDescription}
                isQuick
              />
            </div>
          )}
        </div>

        <SavedDrawer
          {...wtSaved}
          cardTitle="Weight"
          formatSummary={(r) =>
            `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 4)} ${
              r.toUnit.symbol
            }`
          }
          onRestore={handleRestoreCard3}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: QUICK TEMPERATURE CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Quick Temperature Scale Converter"
        hasResult={!!tempResult}
        isSaved={tempSaveSuccess}
        savedCount={tempSaved.saved.length}
        onToggleSaved={() => tempSaved.setIsOpen(!tempSaved.isOpen)}
        onSave={() => {
          if (!tempResult) return;
          tempSaved.save(
            `${tempResult.inputValue} ${tempResult.fromUnit.symbol} = ${formatNumberPrecision(
              tempResult.outputValue,
              2
            )} ${tempResult.toUnit.symbol}`,
            tempResult,
            {
              category: "temperature",
              inputValue: tempVal,
              fromUnit: tempFrom,
              toUnit: tempTo,
              precision: 2,
              scientificNotation: false,
            }
          );
          setTempSaveSuccess(true);
          setTimeout(() => setTempSaveSuccess(false), 1500);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700 no-print">
            <div>
              <label
                htmlFor="quick-temp-value"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                Temperature
              </label>
              <Input
                id="quick-temp-value"
                type="text"
                inputMode="decimal"
                value={tempVal}
                onChange={(e) => setTempVal(e.target.value)}
                className={`h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800 ${
                  tempError ? "border-red-500 focus-visible:ring-red-500" : ""
                }`}
                placeholder="Temperature"
                aria-invalid={!!tempError}
              />
              {tempError && (
                <p role="alert" className="text-[10px] text-red-600 dark:text-red-400 mt-0.5">
                  {tempError}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="quick-temp-from"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                From
              </label>
              <select
                id="quick-temp-from"
                value={tempFrom}
                onChange={(e) => setTempFrom(e.target.value)}
                aria-label="Quick temperature source unit"
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CONVERSION_CATEGORIES.temperature.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quick-temp-to"
                className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium"
              >
                To
              </label>
              <select
                id="quick-temp-to"
                value={tempTo}
                onChange={(e) => setTempTo(e.target.value)}
                aria-label="Quick temperature target unit"
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CONVERSION_CATEGORIES.temperature.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {tempResult && (
            <div className="space-y-2">
              <div
                className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 space-y-1.5"
                aria-live="polite"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                    {tempResult.inputValue} {tempResult.fromUnit.symbol} ={" "}
                    {formatNumberPrecision(tempResult.outputValue, 2)} {tempResult.toUnit.symbol}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {tempResult.formulaDescription}
                  </span>
                </div>

                <CardActionBar
                  categoryName="Temperature"
                  inputValue={tempResult.inputValue}
                  fromUnit={tempResult.fromUnit}
                  toUnit={tempResult.toUnit}
                  outputValue={tempResult.outputValue}
                  precision={2}
                  isScientific={false}
                  formulaDescription={tempResult.formulaDescription}
                  isQuick
                />
              </div>

              {/* Reference Points Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-[10px] font-sans">
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Water Freezing</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    0°C / 32°F / 273.15K
                  </span>
                </div>
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Room Temp</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    20°C / 68°F / 293.15K
                  </span>
                </div>
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Human Body</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    37°C / 98.6°F / 310.15K
                  </span>
                </div>
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Water Boiling</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">
                    100°C / 212°F / 373.15K
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...tempSaved}
          cardTitle="Temperature"
          formatSummary={(r) =>
            `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 2)} ${
              r.toUnit.symbol
            }`
          }
          onRestore={handleRestoreCard4}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER (Hidden in Print) ═══════════════════ */}
      <div className="flex items-center justify-end pt-1 no-print">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Open conversion reference report sheet"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Conversion Reference Sheet
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
