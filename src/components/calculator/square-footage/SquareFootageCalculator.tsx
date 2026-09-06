"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Plus,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  LinearUnit,
  PriceUnit,
  RectangleResult,
  CircleResult,
  RingResult,
  SectorResult,
  TriangleResult,
  RectangleBorderResult,
  RoomSection,
  calculateRectangleArea,
  calculateMultiRoomArea,
  calculateCircleArea,
  calculateRingArea,
  calculateSectorArea,
  calculateTriangleHeron,
  calculateTriangleBaseHeight,
  calculateTrapezoidArea,
  calculateParallelogramArea,
  calculateRectangleBorderArea,
  estimateMaterials,
  MaterialEstimation,
} from "@/lib/calculator-engine/formulas/square-footage";

// ─── Clipboard Helper with Fallback ──────────────────────────────────────────

async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fallback
    }
  }
  if (typeof document !== "undefined") {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    } catch {
      return false;
    }
  }
  return false;
}

// ─── Types & Local Storage Hook ─────────────────────────────────────────────

interface SavedAreaEstimate<T> {
  id: string;
  timestamp: string;
  inputSummary: string;
  result: T;
  notes: string;
  rawInputs: Record<string, any>;
}

const LINEAR_UNITS: { value: LinearUnit; label: string }[] = [
  { value: "feet", label: "feet" },
  { value: "inches", label: "inches" },
  { value: "yards", label: "yards" },
  { value: "meters", label: "meters" },
  { value: "centimeters", label: "cm" },
];

const PRICE_UNITS: { value: PriceUnit; label: string }[] = [
  { value: "per_sq_ft", label: "per square feet" },
  { value: "per_sq_yd", label: "per square yard" },
  { value: "per_sq_m", label: "per square meter" },
];

function flashSave(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T>(storageKey: string) {
  const [saved, setSaved] = useState<SavedAreaEstimate<T>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, result: T, rawInputs: Record<string, any>, notes = "") => {
      const entry: SavedAreaEstimate<T> = {
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
    <div className="print-card border border-blue-600/30 dark:border-blue-500/30 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all print:break-inside-avoid print:shadow-none print:border-zinc-300">
      <div className="bg-blue-600 text-white px-3.5 py-1.5 flex items-center justify-between print:bg-zinc-100 print:text-zinc-900 print:border-b print:border-zinc-300">
        <h3 className="font-bold text-xs tracking-wide text-white print:text-zinc-900">{title}</h3>
        {hasResult && onSave && (
          <div className="no-print flex items-center gap-1.5">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[10px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="View saved calculations"
                aria-label={`View ${savedCount} saved calculations`}
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              aria-label={`Save ${title} calculation`}
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
  id,
  label,
  value,
  onChange,
  unit,
  onUnitChange,
  unitOptions = LINEAR_UNITS,
  min = 0,
  max,
  step = 0.5,
  showUnit = true,
}: {
  id?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit?: string;
  onUnitChange?: (u: any) => void;
  unitOptions?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  showUnit?: boolean;
}) {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  return (
    <div className="grid grid-cols-12 gap-2 items-center text-xs">
      <label
        htmlFor={inputId}
        className="col-span-5 font-medium text-zinc-700 dark:text-zinc-300 truncate cursor-pointer"
      >
        {label}
      </label>
      <div className={showUnit && unitOptions ? "col-span-4" : "col-span-7"}>
        <Input
          id={inputId}
          name={inputId}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step}
          className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
        />
      </div>
      {showUnit && unitOptions && onUnitChange && (
        <div className="col-span-3">
          <select
            id={`${inputId}-unit`}
            value={unit}
            onChange={(e) => onUnitChange(e.target.value)}
            aria-label={`${label} unit`}
            className="w-full h-7 text-xs rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 font-medium text-zinc-700 dark:text-zinc-300"
          >
            {unitOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
  onRestore,
}: {
  saved: SavedAreaEstimate<T>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore?: (rawInputs: Record<string, any>) => void;
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
    a.download = `square_footage_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_estimates.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="no-print mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
      <div className="flex items-center justify-between pb-1 border-b border-zinc-200 dark:border-zinc-800">
        <span className="font-bold text-zinc-700 dark:text-zinc-300">
          Saved {cardTitle} History ({saved.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 cursor-pointer"
            aria-label={`Export ${cardTitle} calculations to CSV`}
          >
            <Download className="w-3 h-3" /> CSV
          </button>
          <button
            type="button"
            onClick={clear}
            className="text-[10px] text-zinc-400 hover:text-red-500 cursor-pointer"
            aria-label={`Clear all ${cardTitle} saved calculations`}
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="space-y-1.5 max-h-44 overflow-y-auto">
        {saved.map((item) => (
          <div
            key={item.id}
            className="p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[11px] font-sans tabular-nums gap-2"
          >
            <div className="truncate pr-1 flex-1">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">
                {formatSummary(item.result)}
              </span>
              <span className="text-zinc-400 ml-1.5">({item.inputSummary})</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {onRestore && item.rawInputs && (
                <button
                  type="button"
                  onClick={() => onRestore(item.rawInputs)}
                  className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800 cursor-pointer flex items-center gap-0.5"
                  title="Restore calculation"
                  aria-label={`Restore ${item.inputSummary}`}
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
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultDisplay({
  shapeName,
  latexFormula,
  summaryText,
  sqFt,
  sqYd,
  sqM,
  acres,
  wasteSqFt,
  wastePercent = 0,
  cost = 0,
  secondaryLabel,
  secondaryValue,
}: {
  shapeName: string;
  latexFormula: string;
  summaryText: string;
  sqFt: number;
  sqYd: number;
  sqM: number;
  acres: number;
  wasteSqFt?: number;
  wastePercent?: number;
  cost?: number;
  secondaryLabel?: string;
  secondaryValue?: string;
}) {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopyFeedback(label);
      setTimeout(() => setCopyFeedback(null), 2000);
    }
  };

  const resultString = `${shapeName} area = ${sqFt.toLocaleString()} ft²`;

  return (
    <div
      aria-live="polite"
      className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 space-y-2 print:border-zinc-300 print:bg-transparent"
    >
      <div className="text-center">
        <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300 block">
          Total Area
        </span>
        <div className="text-2xl font-black text-blue-900 dark:text-blue-100 font-sans tabular-nums">
          {sqFt.toLocaleString()}{" "}
          <span className="text-xs font-normal text-blue-700 dark:text-blue-300">sq ft</span>
        </div>
        <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mt-0.5">
          {sqYd.toLocaleString()} sq yd · {sqM.toLocaleString()} m² ·{" "}
          {acres > 0.001 ? `${acres.toFixed(3)} acres` : `${acres} acres`}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-blue-200/60 dark:border-blue-800/60 print:border-zinc-300">
        {wastePercent > 0 && wasteSqFt !== undefined && (
          <div className="p-1.5 bg-white/70 dark:bg-zinc-900/60 rounded text-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
              With {wastePercent}% Waste
            </span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-xs">
              {wasteSqFt.toLocaleString()} sq ft
            </span>
          </div>
        )}
        {cost > 0 && (
          <div className="p-1.5 bg-white/70 dark:bg-zinc-900/60 rounded text-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
              Estimated Material Cost
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-sans tabular-nums text-xs">
              ${cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
        {secondaryLabel && secondaryValue && (
          <div className="col-span-2 p-1.5 bg-white/70 dark:bg-zinc-900/60 rounded text-center">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
              {secondaryLabel}
            </span>
            <span className="font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums text-xs">
              {secondaryValue}
            </span>
          </div>
        )}
      </div>

      {/* Copy Result / Summary / LaTeX Action Controls */}
      <div className="no-print pt-2 flex flex-wrap items-center justify-between gap-1.5 border-t border-blue-200/60 dark:border-blue-800/60">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleCopy(resultString, "Result Copied!")}
            className="text-[11px] px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
            title="Copy standard area result"
            aria-label="Copy result"
          >
            <Copy className="w-3 h-3 text-blue-500" />
            <span>Copy Result</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(summaryText, "Summary Copied!")}
            className="text-[11px] px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
            title="Copy full input & calculation summary"
            aria-label="Copy summary"
          >
            <Copy className="w-3 h-3 text-blue-500" />
            <span>Copy Summary</span>
          </button>
          <button
            type="button"
            onClick={() => handleCopy(latexFormula, "LaTeX Copied!")}
            className="text-[11px] px-2 py-1 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
            title="Copy mathematical LaTeX formula"
            aria-label="Copy LaTeX"
          >
            <Copy className="w-3 h-3 text-blue-500" />
            <span>Copy LaTeX</span>
          </button>
        </div>

        {copyFeedback && (
          <span
            role="status"
            className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-fadeIn"
          >
            <Check className="w-3 h-3" /> {copyFeedback}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Dynamic 2D SVG Diagrams with Proportional Scaling & Real Labels ─────────

function RectangleSvg({ l, w, unit }: { l: number; w: number; unit: string }) {
  const safeL = l > 0 ? l : 30;
  const safeW = w > 0 ? w : 20;
  const ratio = Math.max(0.35, Math.min(2.8, safeL / safeW));

  let boxW = 100;
  let boxH = Math.round(boxW / ratio);
  if (boxH > 58) {
    boxH = 58;
    boxW = Math.round(boxH * ratio);
  }
  boxW = Math.max(30, Math.min(115, boxW));
  boxH = Math.max(20, Math.min(58, boxH));

  const startX = Math.round((160 - boxW) / 2);
  const startY = Math.round((95 - boxH) / 2) + 2;

  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Rectangle diagram: length ${safeL} ${unit}, width ${safeW} ${unit}`}
    >
      <rect
        x={startX}
        y={startY}
        width={boxW}
        height={boxH}
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Top dimension label: Length */}
      <text
        x="80"
        y={Math.max(12, startY - 4)}
        textAnchor="middle"
        className="text-[9px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        L = {safeL} {unit}
      </text>
      {/* Left dimension label: Width */}
      <text
        x={Math.max(6, startX - 4)}
        y={startY + boxH / 2 + 3}
        textAnchor="end"
        className="text-[9px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        W = {safeW} {unit}
      </text>
    </svg>
  );
}

function RectangleBorderSvg({
  outerL,
  outerW,
  border,
  unit,
  isValid,
}: {
  outerL: number;
  outerW: number;
  border: number;
  unit: string;
  isValid?: boolean;
}) {
  if (isValid === false) {
    return (
      <svg
        viewBox="0 0 160 110"
        className="w-full max-w-[150px] mx-auto select-none"
        aria-label="Invalid geometry diagram"
      >
        <rect
          x="20"
          y="20"
          width="120"
          height="70"
          fill="rgba(239, 68, 68, 0.05)"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text
          x="80"
          y="58"
          textAnchor="middle"
          className="text-[10px] fill-red-600 dark:fill-red-400 font-bold"
        >
          Invalid Border Geometry
        </text>
      </svg>
    );
  }

  const safeL = outerL > 0 ? outerL : 30;
  const safeW = outerW > 0 ? outerW : 20;
  const safeB = border > 0 ? border : 2;

  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Rectangle border diagram: ${safeL} by ${safeW} ${unit}, border ${safeB} ${unit}`}
    >
      <defs>
        <marker id="rb-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M1,0.5 L5,3 L1,5.5 Z" fill="#2563eb" className="dark:fill-blue-400" />
        </marker>
      </defs>
      {/* Outer Rectangle */}
      <rect
        x="15"
        y="15"
        width="100"
        height="70"
        fill="rgba(59, 130, 246, 0.1)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Inner Rectangle */}
      <rect
        x="30"
        y="28"
        width="70"
        height="44"
        fill="white"
        stroke="#2563eb"
        strokeWidth="1"
        strokeDasharray="2 2"
        className="dark:fill-zinc-900 dark:stroke-blue-400"
      />
      {/* Bottom label */}
      <text
        x="65"
        y="98"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium"
      >
        {safeL} × {safeW} {unit}
      </text>
      {/* Border dimension indicator */}
      <line
        x1="140"
        y1="50"
        x2="102"
        y2="50"
        stroke="#2563eb"
        strokeWidth="1"
        markerEnd="url(#rb-arrow)"
        className="dark:stroke-blue-400"
      />
      <text
        x="105"
        y="42"
        textAnchor="start"
        className="text-[8px] fill-zinc-800 dark:fill-zinc-200 font-medium"
      >
        Border: {safeB} {unit}
      </text>
    </svg>
  );
}

function CircleSvg({ diameter, unit }: { diameter: number; unit: string }) {
  const safeD = diameter > 0 ? diameter : 30;
  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Circle diagram: diameter ${safeD} ${unit}`}
    >
      <defs>
        <marker id="circ-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M1,0.5 L4,2.5 L1,4.5 Z" fill="#2563eb" className="dark:fill-blue-400" />
        </marker>
        <marker id="circ-arr-l" markerWidth="5" markerHeight="5" refX="1" refY="2.5" orient="auto">
          <path d="M4,0.5 L1,2.5 L4,4.5 Z" fill="#2563eb" className="dark:fill-blue-400" />
        </marker>
      </defs>
      <circle
        cx="80"
        cy="52"
        r="42"
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Diameter dimension line across center */}
      <line
        x1="38"
        y1="52"
        x2="122"
        y2="52"
        stroke="#2563eb"
        strokeWidth="1"
        strokeDasharray="2 2"
        markerStart="url(#circ-arr-l)"
        markerEnd="url(#circ-arr)"
        className="dark:stroke-blue-400"
      />
      <circle cx="80" cy="52" r="2" fill="#2563eb" className="dark:fill-blue-400" />
      <text
        x="80"
        y="47"
        textAnchor="middle"
        className="text-[9px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        d = {safeD} {unit}
      </text>
      <text
        x="80"
        y="105"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-500 dark:text-zinc-400"
      >
        radius r = {safeD / 2} {unit}
      </text>
    </svg>
  );
}

function RingSvg({
  outerDia,
  border,
  unit,
  isValid,
}: {
  outerDia: number;
  border: number;
  unit: string;
  isValid?: boolean;
}) {
  if (isValid === false) {
    return (
      <svg
        viewBox="0 0 170 120"
        className="w-full max-w-[150px] mx-auto select-none"
        aria-label="Invalid geometry diagram"
      >
        <circle
          cx="85"
          cy="60"
          r="45"
          fill="rgba(239, 68, 68, 0.05)"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text
          x="85"
          y="64"
          textAnchor="middle"
          className="text-[10px] fill-red-600 dark:fill-red-400 font-bold"
        >
          Invalid Ring Geometry
        </text>
      </svg>
    );
  }

  const safeD = outerDia > 0 ? outerDia : 30;
  const safeB = border > 0 ? border : 2;
  const innerD = Math.max(0, safeD - 2 * safeB);

  return (
    <svg
      viewBox="0 0 170 120"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Ring diagram: outer diameter ${safeD} ${unit}, border ${safeB} ${unit}`}
    >
      <defs>
        <marker id="ring-arr" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M1,0.5 L4,2.5 L1,4.5 Z" fill="#2563eb" className="dark:fill-blue-400" />
        </marker>
        <marker id="ring-arr-l" markerWidth="5" markerHeight="5" refX="1" refY="2.5" orient="auto">
          <path d="M4,0.5 L1,2.5 L4,4.5 Z" fill="#2563eb" className="dark:fill-blue-400" />
        </marker>
      </defs>
      {/* Outer Circle */}
      <circle
        cx="65"
        cy="55"
        r="44"
        fill="rgba(59, 130, 246, 0.12)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Inner Circle hole */}
      <circle
        cx="65"
        cy="55"
        r="24"
        fill="white"
        stroke="#2563eb"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        className="dark:fill-zinc-900 dark:stroke-blue-400"
      />
      {/* Dimension Line across bottom */}
      <line
        x1="21"
        y1="108"
        x2="109"
        y2="108"
        stroke="#2563eb"
        strokeWidth="1"
        markerStart="url(#ring-arr-l)"
        markerEnd="url(#ring-arr)"
        className="dark:stroke-blue-400"
      />
      <text
        x="65"
        y="117"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-medium"
      >
        Outer D = {safeD} {unit}
      </text>
      {/* Border Width Callout */}
      <text
        x="115"
        y="50"
        textAnchor="start"
        className="text-[8px] fill-zinc-800 dark:fill-zinc-200 font-medium"
      >
        Border = {safeB} {unit}
      </text>
      <text
        x="115"
        y="62"
        textAnchor="start"
        className="text-[7.5px] fill-zinc-500 dark:fill-zinc-400"
      >
        Inner D = {innerD} {unit}
      </text>
    </svg>
  );
}

function TriangleEdgesSvg({
  a,
  b,
  c,
  unit,
}: {
  a: number;
  b: number;
  c: number;
  unit: string;
}) {
  const safeA = a > 0 ? a : 30;
  const safeB = b > 0 ? b : 45;
  const safeC = c > 0 ? c : 50;

  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Triangle Heron diagram: sides ${safeA}, ${safeB}, ${safeC} ${unit}`}
    >
      <polygon
        points="45,22 135,92 18,92"
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Side a (left) */}
      <text
        x="24"
        y="52"
        textAnchor="end"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        a = {safeA} {unit}
      </text>
      {/* Side b (right) */}
      <text
        x="98"
        y="52"
        textAnchor="start"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        b = {safeB} {unit}
      </text>
      {/* Side c (bottom) */}
      <text
        x="76"
        y="104"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        c = {safeC} {unit}
      </text>
    </svg>
  );
}

function TriangleBaseHeightSvg({
  base,
  height,
  unit,
}: {
  base: number;
  height: number;
  unit: string;
}) {
  const safeB = base > 0 ? base : 30;
  const safeH = height > 0 ? height : 20;

  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Triangle Base/Height diagram: base ${safeB} ${unit}, height ${safeH} ${unit}`}
    >
      <polygon
        points="55,22 138,92 18,92"
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Dashed altitude height line */}
      <line
        x1="55"
        y1="22"
        x2="55"
        y2="92"
        stroke="#2563eb"
        strokeWidth="1"
        strokeDasharray="3 2"
        className="dark:stroke-blue-400"
      />
      {/* Right angle indicator */}
      <rect
        x="55"
        y="84"
        width="8"
        height="8"
        fill="none"
        stroke="#2563eb"
        strokeWidth="0.8"
        className="dark:stroke-blue-400"
      />
      <text
        x="50"
        y="58"
        textAnchor="end"
        className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold"
      >
        h = {safeH} {unit}
      </text>
      <text
        x="78"
        y="104"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        b = {safeB} {unit}
      </text>
    </svg>
  );
}

function TrapezoidSvg({
  b1,
  b2,
  h,
  unit,
}: {
  b1: number;
  b2: number;
  h: number;
  unit: string;
}) {
  const safeB1 = b1 > 0 ? b1 : 30;
  const safeB2 = b2 > 0 ? b2 : 45;
  const safeH = h > 0 ? h : 20;

  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Trapezoid diagram: b1 ${safeB1} ${unit}, b2 ${safeB2} ${unit}, height ${safeH} ${unit}`}
    >
      <polygon
        points="45,28 115,28 145,88 15,88"
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Dashed height line */}
      <line
        x1="45"
        y1="28"
        x2="45"
        y2="88"
        stroke="#2563eb"
        strokeWidth="1"
        strokeDasharray="2 2"
        className="dark:stroke-blue-400"
      />
      <text
        x="80"
        y="22"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        b₁ = {safeB1} {unit}
      </text>
      <text
        x="80"
        y="102"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        b₂ = {safeB2} {unit}
      </text>
      <text
        x="40"
        y="58"
        textAnchor="end"
        className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold"
      >
        h = {safeH} {unit}
      </text>
    </svg>
  );
}

function SectorSvg({
  radius,
  angle,
  unit,
  isValid,
}: {
  radius: number;
  angle: number;
  unit: string;
  isValid?: boolean;
}) {
  if (isValid === false) {
    return (
      <svg
        viewBox="0 0 160 115"
        className="w-full max-w-[150px] mx-auto select-none"
        aria-label="Invalid sector angle diagram"
      >
        <circle
          cx="80"
          cy="58"
          r="40"
          fill="rgba(239, 68, 68, 0.05)"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        <text
          x="80"
          y="62"
          textAnchor="middle"
          className="text-[10px] fill-red-600 dark:fill-red-400 font-bold"
        >
          Invalid Angle (0°–360°)
        </text>
      </svg>
    );
  }

  const safeR = radius > 0 ? radius : 30;
  const safeA = Number.isFinite(angle) ? Math.max(0, Math.min(360, angle)) : 90;

  // Render arc according to angle
  const rad = (safeA * Math.PI) / 180;
  const rPx = 65;
  const cx = 35;
  const cy = 60;
  const xEnd = cx + rPx * Math.cos(-rad / 2);
  const yEnd = cy + rPx * Math.sin(-rad / 2);
  const xStart = cx + rPx * Math.cos(rad / 2);
  const yStart = cy + rPx * Math.sin(rad / 2);
  const largeArcFlag = safeA > 180 ? 1 : 0;

  const pathD =
    safeA >= 360
      ? `M ${cx - rPx},${cy} A ${rPx},${rPx} 0 1,0 ${cx + rPx},${cy} A ${rPx},${rPx} 0 1,0 ${cx - rPx},${cy}`
      : `M ${cx},${cy} L ${xEnd},${yEnd} A ${rPx},${rPx} 0 ${largeArcFlag},1 ${xStart},${yStart} Z`;

  return (
    <svg
      viewBox="0 0 160 115"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Sector diagram: radius ${safeR} ${unit}, central angle ${safeA}°`}
    >
      <path
        d={pathD}
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="dark:stroke-blue-400"
      />
      {/* Angle label */}
      <text
        x={cx + 18}
        y={cy + 3}
        textAnchor="start"
        className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-bold"
      >
        {safeA}°
      </text>
      {/* Radius label */}
      <text
        x="95"
        y="102"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        r = {safeR} {unit}
      </text>
    </svg>
  );
}

function ParallelogramSvg({
  base,
  height,
  unit,
}: {
  base: number;
  height: number;
  unit: string;
}) {
  const safeB = base > 0 ? base : 30;
  const safeH = height > 0 ? height : 20;

  return (
    <svg
      viewBox="0 0 160 110"
      className="w-full max-w-[150px] mx-auto select-none"
      aria-label={`Parallelogram diagram: base ${safeB} ${unit}, height ${safeH} ${unit}`}
    >
      <polygon
        points="50,28 145,28 115,88 20,88"
        fill="rgba(59, 130, 246, 0.08)"
        stroke="#2563eb"
        strokeWidth="1.5"
        className="dark:stroke-blue-400"
      />
      {/* Dashed height indicator */}
      <line
        x1="50"
        y1="28"
        x2="50"
        y2="88"
        stroke="#2563eb"
        strokeWidth="1"
        strokeDasharray="2 2"
        className="dark:stroke-blue-400"
      />
      <text
        x="45"
        y="58"
        textAnchor="end"
        className="text-[8.5px] fill-blue-600 dark:fill-blue-400 font-semibold"
      >
        h = {safeH} {unit}
      </text>
      <text
        x="68"
        y="102"
        textAnchor="middle"
        className="text-[8.5px] fill-zinc-800 dark:fill-zinc-200 font-semibold"
      >
        b = {safeB} {unit}
      </text>
    </svg>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function SquareFootageCalculator() {
  // Global feedback message for restored calculations
  const [restoredToast, setRestoredToast] = useState<string | null>(null);

  const showRestored = (msg: string) => {
    setRestoredToast(msg);
    setTimeout(() => setRestoredToast(null), 2500);
  };

  // ─── CARD 1: RECTANGLE ───
  const [rectMode, setRectMode] = useState<"single" | "multi">("single");
  const [rectLength, setRectLength] = useState("30");
  const [rectWidth, setRectWidth] = useState("20");
  const [rectUnit, setRectUnit] = useState<LinearUnit>("feet");
  const [rectQty, setRectQty] = useState("1");
  const [rectPrice, setRectPrice] = useState("");
  const [rectPriceUnit, setRectPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [rectResult, setRectResult] = useState<RectangleResult | null>(null);
  const [rectSaveSuccess, setRectSaveSuccess] = useState(false);
  const rectSaved = useCardSaved<RectangleResult>("saved_sqft_rect");

  // Multi-room state
  const [rooms, setRooms] = useState<RoomSection[]>([
    { id: "1", name: "Living Room", length: 20, width: 16, unit: "feet", quantity: 1 },
    { id: "2", name: "Dining Room", length: 12, width: 10, unit: "feet", quantity: 1 },
  ]);
  const [multiWaste, setMultiWaste] = useState("10");
  const [multiPrice, setMultiPrice] = useState("");
  const [multiPriceUnit, setMultiPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [multiResult, setMultiResult] = useState<any>(null);

  // ─── CARD 2: RECTANGLE BORDER ───
  const [borderLength, setBorderLength] = useState("30");
  const [borderWidthVal, setBorderWidthVal] = useState("20");
  const [borderThickness, setBorderThickness] = useState("2");
  const [borderUnit, setBorderUnit] = useState<LinearUnit>("feet");
  const [borderQty, setBorderQty] = useState("1");
  const [borderPrice, setBorderPrice] = useState("");
  const [borderPriceUnit, setBorderPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [borderResult, setBorderResult] = useState<RectangleBorderResult | null>(null);
  const [borderSaveSuccess, setBorderSaveSuccess] = useState(false);
  const borderSaved = useCardSaved<RectangleBorderResult>("saved_sqft_border");

  // ─── CARD 3: CIRCLE ───
  const [circDiameter, setCircDiameter] = useState("30");
  const [circUnit, setCircUnit] = useState<LinearUnit>("feet");
  const [circQty, setCircQty] = useState("1");
  const [circPrice, setCircPrice] = useState("");
  const [circPriceUnit, setCircPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [circResult, setCircResult] = useState<CircleResult | null>(null);
  const [circSaveSuccess, setCircSaveSuccess] = useState(false);
  const circSaved = useCardSaved<CircleResult>("saved_sqft_circle");

  // ─── CARD 4: RING ───
  const [ringOuterDia, setRingOuterDia] = useState("30");
  const [ringBorderWidth, setRingBorderWidth] = useState("2");
  const [ringUnit, setRingUnit] = useState<LinearUnit>("feet");
  const [ringQty, setRingQty] = useState("1");
  const [ringPrice, setRingPrice] = useState("");
  const [ringPriceUnit, setRingPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [ringResult, setRingResult] = useState<RingResult | null>(null);
  const [ringSaveSuccess, setRingSaveSuccess] = useState(false);
  const ringSaved = useCardSaved<RingResult>("saved_sqft_ring");

  // ─── CARD 5: TRIANGLE (EDGE LENGTHS & BASE/HEIGHT) ───
  const [triMode, setTriMode] = useState<"edges" | "base_height">("edges");
  const [triEdge1, setTriEdge1] = useState("30");
  const [triEdge2, setTriEdge2] = useState("45");
  const [triEdge3, setTriEdge3] = useState("50");
  const [triBase, setTriBase] = useState("30");
  const [triHeight, setTriHeight] = useState("20");
  const [triUnit, setTriUnit] = useState<LinearUnit>("feet");
  const [triQty, setTriQty] = useState("1");
  const [triPrice, setTriPrice] = useState("");
  const [triPriceUnit, setTriPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [triResult, setTriResult] = useState<any>(null);
  const [triSaveSuccess, setTriSaveSuccess] = useState(false);
  const triSaved = useCardSaved<any>("saved_sqft_triangle");

  // ─── CARD 6: TRAPEZOID ───
  const [trapBase1, setTrapBase1] = useState("30");
  const [trapBase2, setTrapBase2] = useState("45");
  const [trapHeight, setTrapHeight] = useState("20");
  const [trapUnit, setTrapUnit] = useState<LinearUnit>("feet");
  const [trapQty, setTrapQty] = useState("1");
  const [trapPrice, setTrapPrice] = useState("");
  const [trapPriceUnit, setTrapPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [trapResult, setTrapResult] = useState<any>(null);
  const [trapSaveSuccess, setTrapSaveSuccess] = useState(false);
  const trapSaved = useCardSaved<any>("saved_sqft_trapezoid");

  // ─── CARD 7: SECTOR ───
  const [sectorRadius, setSectorRadius] = useState("30");
  const [sectorAngle, setSectorAngle] = useState("90");
  const [sectorUnit, setSectorUnit] = useState<LinearUnit>("feet");
  const [sectorQty, setSectorQty] = useState("1");
  const [sectorPrice, setSectorPrice] = useState("");
  const [sectorPriceUnit, setSectorPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [sectorResult, setSectorResult] = useState<SectorResult | null>(null);
  const [sectorSaveSuccess, setSectorSaveSuccess] = useState(false);
  const sectorSaved = useCardSaved<SectorResult>("saved_sqft_sector");

  // ─── CARD 8: PARALLELOGRAM ───
  const [paraBase, setParaBase] = useState("30");
  const [paraHeight, setParaHeight] = useState("20");
  const [paraUnit, setParaUnit] = useState<LinearUnit>("feet");
  const [paraQty, setParaQty] = useState("1");
  const [paraPrice, setParaPrice] = useState("");
  const [paraPriceUnit, setParaPriceUnit] = useState<PriceUnit>("per_sq_ft");
  const [paraResult, setParaResult] = useState<any>(null);
  const [paraSaveSuccess, setParaSaveSuccess] = useState(false);
  const paraSaved = useCardSaved<any>("saved_sqft_parallelogram");

  // ─── MATERIAL PRESET STATE ───
  const [materialPresetSqFt, setMaterialPresetSqFt] = useState("600");
  const [materials, setMaterials] = useState<MaterialEstimation | null>(null);

  // ─── GLOBAL REPORT MODAL STATE ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // ─── Handlers ───

  const handleRectCalc = useCallback(() => {
    if (rectMode === "single") {
      const res = calculateRectangleArea({
        length: Number(rectLength) || 0,
        width: Number(rectWidth) || 0,
        unit: rectUnit,
        quantity: Number(rectQty) || 1,
        wastePercent: 0,
        price: Number(rectPrice) || 0,
        priceUnit: rectPriceUnit,
      });
      setRectResult(res);
      if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    } else {
      const res = calculateMultiRoomArea(
        rooms,
        Number(multiWaste) || 0,
        Number(multiPrice) || 0,
        multiPriceUnit,
      );
      setMultiResult(res);
      if (res.isValid) setMaterialPresetSqFt(String(res.wasteSquareFeet || res.squareFeet));
    }
  }, [
    rectMode,
    rectLength,
    rectWidth,
    rectUnit,
    rectQty,
    rectPrice,
    rectPriceUnit,
    rooms,
    multiWaste,
    multiPrice,
    multiPriceUnit,
  ]);

  const handleBorderCalc = useCallback(() => {
    const res = calculateRectangleBorderArea({
      outerLength: Number(borderLength) || 0,
      outerWidth: Number(borderWidthVal) || 0,
      borderWidth: Number(borderThickness) || 0,
      unit: borderUnit,
      quantity: Number(borderQty) || 1,
      wastePercent: 0,
      price: Number(borderPrice) || 0,
      priceUnit: borderPriceUnit,
    });
    setBorderResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
  }, [borderLength, borderWidthVal, borderThickness, borderUnit, borderQty, borderPrice, borderPriceUnit]);

  const handleCircCalc = useCallback(() => {
    const res = calculateCircleArea({
      diameter: Number(circDiameter) || 0,
      unit: circUnit,
      quantity: Number(circQty) || 1,
      wastePercent: 0,
      price: Number(circPrice) || 0,
      priceUnit: circPriceUnit,
    });
    setCircResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
  }, [circDiameter, circUnit, circQty, circPrice, circPriceUnit]);

  const handleRingCalc = useCallback(() => {
    const res = calculateRingArea({
      outerDiameter: Number(ringOuterDia) || 0,
      borderWidth: Number(ringBorderWidth) || 0,
      unit: ringUnit,
      quantity: Number(ringQty) || 1,
      wastePercent: 0,
      price: Number(ringPrice) || 0,
      priceUnit: ringPriceUnit,
    });
    setRingResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
  }, [ringOuterDia, ringBorderWidth, ringUnit, ringQty, ringPrice, ringPriceUnit]);

  const handleTriCalc = useCallback(() => {
    if (triMode === "edges") {
      const res = calculateTriangleHeron({
        sideA: Number(triEdge1) || 0,
        sideB: Number(triEdge2) || 0,
        sideC: Number(triEdge3) || 0,
        unit: triUnit,
        quantity: Number(triQty) || 1,
        wastePercent: 0,
        price: Number(triPrice) || 0,
        priceUnit: triPriceUnit,
      });
      setTriResult(res);
      if (res && res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    } else {
      const res = calculateTriangleBaseHeight({
        base: Number(triBase) || 0,
        height: Number(triHeight) || 0,
        unit: triUnit,
        quantity: Number(triQty) || 1,
        wastePercent: 0,
        price: Number(triPrice) || 0,
        priceUnit: triPriceUnit,
      });
      setTriResult(res);
      if (res && res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    }
  }, [triMode, triEdge1, triEdge2, triEdge3, triBase, triHeight, triUnit, triQty, triPrice, triPriceUnit]);

  const handleTrapCalc = useCallback(() => {
    const res = calculateTrapezoidArea({
      base1: Number(trapBase1) || 0,
      base2: Number(trapBase2) || 0,
      height: Number(trapHeight) || 0,
      unit: trapUnit,
      quantity: Number(trapQty) || 1,
      wastePercent: 0,
      price: Number(trapPrice) || 0,
      priceUnit: trapPriceUnit,
    });
    setTrapResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
  }, [trapBase1, trapBase2, trapHeight, trapUnit, trapQty, trapPrice, trapPriceUnit]);

  const handleSectorCalc = useCallback(() => {
    const res = calculateSectorArea({
      radius: Number(sectorRadius) || 0,
      angleDegrees: Number(sectorAngle) || 0,
      unit: sectorUnit,
      quantity: Number(sectorQty) || 1,
      wastePercent: 0,
      price: Number(sectorPrice) || 0,
      priceUnit: sectorPriceUnit,
    });
    setSectorResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
  }, [sectorRadius, sectorAngle, sectorUnit, sectorQty, sectorPrice, sectorPriceUnit]);

  const handleParaCalc = useCallback(() => {
    const res = calculateParallelogramArea({
      base: Number(paraBase) || 0,
      height: Number(paraHeight) || 0,
      unit: paraUnit,
      quantity: Number(paraQty) || 1,
      wastePercent: 0,
      price: Number(paraPrice) || 0,
      priceUnit: paraPriceUnit,
    });
    setParaResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
  }, [paraBase, paraHeight, paraUnit, paraQty, paraPrice, paraPriceUnit]);

  // Recalculate material presets
  useEffect(() => {
    const sqFt = Number(materialPresetSqFt) || 0;
    setMaterials(estimateMaterials(sqFt));
  }, [materialPresetSqFt]);

  // Run initial calculations on mount
  useEffect(() => {
    handleRectCalc();
    handleBorderCalc();
    handleCircCalc();
    handleRingCalc();
    handleTriCalc();
    handleTrapCalc();
    handleSectorCalc();
    handleParaCalc();
  }, [
    handleRectCalc,
    handleBorderCalc,
    handleCircCalc,
    handleRingCalc,
    handleTriCalc,
    handleTrapCalc,
    handleSectorCalc,
    handleParaCalc,
  ]);

  // Multi-room row handlers
  const addRoomRow = () => {
    setRooms((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        name: `Section ${prev.length + 1}`,
        length: 12,
        width: 10,
        unit: "feet",
        quantity: 1,
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

  // ─── Restore Handlers for All 8 Geometric Modules ───

  const handleRestoreRect = (raw: Record<string, any>) => {
    if (raw.mode === "single") {
      setRectMode("single");
      setRectLength(String(raw.length ?? "30"));
      setRectWidth(String(raw.width ?? "20"));
      setRectUnit(raw.unit ?? "feet");
      setRectQty(String(raw.quantity ?? "1"));
      setRectPrice(String(raw.price ?? ""));
      setRectPriceUnit(raw.priceUnit ?? "per_sq_ft");
      const res = calculateRectangleArea({
        length: Number(raw.length) || 0,
        width: Number(raw.width) || 0,
        unit: raw.unit ?? "feet",
        quantity: Number(raw.quantity) || 1,
        wastePercent: 0,
        price: Number(raw.price) || 0,
        priceUnit: raw.priceUnit ?? "per_sq_ft",
      });
      setRectResult(res);
      if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    } else {
      setRectMode("multi");
      if (Array.isArray(raw.rooms)) setRooms(raw.rooms);
      setMultiWaste(String(raw.waste ?? "10"));
      setMultiPrice(String(raw.price ?? ""));
      setMultiPriceUnit(raw.priceUnit ?? "per_sq_ft");
      const res = calculateMultiRoomArea(
        raw.rooms ?? rooms,
        Number(raw.waste) || 0,
        Number(raw.price) || 0,
        raw.priceUnit ?? "per_sq_ft",
      );
      setMultiResult(res);
      if (res.isValid) setMaterialPresetSqFt(String(res.wasteSquareFeet || res.squareFeet));
    }
    showRestored("Rectangle calculation restored");
  };

  const handleRestoreBorder = (raw: Record<string, any>) => {
    setBorderLength(String(raw.length ?? "30"));
    setBorderWidthVal(String(raw.width ?? "20"));
    setBorderThickness(String(raw.borderThickness ?? "2"));
    setBorderUnit(raw.unit ?? "feet");
    setBorderQty(String(raw.quantity ?? "1"));
    setBorderPrice(String(raw.price ?? ""));
    setBorderPriceUnit(raw.priceUnit ?? "per_sq_ft");
    const res = calculateRectangleBorderArea({
      outerLength: Number(raw.length) || 0,
      outerWidth: Number(raw.width) || 0,
      borderWidth: Number(raw.borderThickness) || 0,
      unit: raw.unit ?? "feet",
      quantity: Number(raw.quantity) || 1,
      wastePercent: 0,
      price: Number(raw.price) || 0,
      priceUnit: raw.priceUnit ?? "per_sq_ft",
    });
    setBorderResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Rectangle border calculation restored");
  };

  const handleRestoreCirc = (raw: Record<string, any>) => {
    setCircDiameter(String(raw.diameter ?? "30"));
    setCircUnit(raw.unit ?? "feet");
    setCircQty(String(raw.quantity ?? "1"));
    setCircPrice(String(raw.price ?? ""));
    setCircPriceUnit(raw.priceUnit ?? "per_sq_ft");
    const res = calculateCircleArea({
      diameter: Number(raw.diameter) || 0,
      unit: raw.unit ?? "feet",
      quantity: Number(raw.quantity) || 1,
      wastePercent: 0,
      price: Number(raw.price) || 0,
      priceUnit: raw.priceUnit ?? "per_sq_ft",
    });
    setCircResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Circle calculation restored");
  };

  const handleRestoreRing = (raw: Record<string, any>) => {
    setRingOuterDia(String(raw.outerDia ?? "30"));
    setRingBorderWidth(String(raw.borderWidth ?? "2"));
    setRingUnit(raw.unit ?? "feet");
    setRingQty(String(raw.quantity ?? "1"));
    setRingPrice(String(raw.price ?? ""));
    setRingPriceUnit(raw.priceUnit ?? "per_sq_ft");
    const res = calculateRingArea({
      outerDiameter: Number(raw.outerDia) || 0,
      borderWidth: Number(raw.borderWidth) || 0,
      unit: raw.unit ?? "feet",
      quantity: Number(raw.quantity) || 1,
      wastePercent: 0,
      price: Number(raw.price) || 0,
      priceUnit: raw.priceUnit ?? "per_sq_ft",
    });
    setRingResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Ring calculation restored");
  };

  const handleRestoreTri = (raw: Record<string, any>) => {
    const mode = raw.mode ?? "edges";
    setTriMode(mode);
    setTriEdge1(String(raw.edge1 ?? "30"));
    setTriEdge2(String(raw.edge2 ?? "45"));
    setTriEdge3(String(raw.edge3 ?? "50"));
    setTriBase(String(raw.base ?? "30"));
    setTriHeight(String(raw.height ?? "20"));
    setTriUnit(raw.unit ?? "feet");
    setTriQty(String(raw.quantity ?? "1"));
    setTriPrice(String(raw.price ?? ""));
    setTriPriceUnit(raw.priceUnit ?? "per_sq_ft");
    let res: any;
    if (mode === "edges") {
      res = calculateTriangleHeron({
        sideA: Number(raw.edge1) || 0,
        sideB: Number(raw.edge2) || 0,
        sideC: Number(raw.edge3) || 0,
        unit: raw.unit ?? "feet",
        quantity: Number(raw.quantity) || 1,
        wastePercent: 0,
        price: Number(raw.price) || 0,
        priceUnit: raw.priceUnit ?? "per_sq_ft",
      });
    } else {
      res = calculateTriangleBaseHeight({
        base: Number(raw.base) || 0,
        height: Number(raw.height) || 0,
        unit: raw.unit ?? "feet",
        quantity: Number(raw.quantity) || 1,
        wastePercent: 0,
        price: Number(raw.price) || 0,
        priceUnit: raw.priceUnit ?? "per_sq_ft",
      });
    }
    setTriResult(res);
    if (res && res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Triangle calculation restored");
  };

  const handleRestoreTrap = (raw: Record<string, any>) => {
    setTrapBase1(String(raw.base1 ?? "30"));
    setTrapBase2(String(raw.base2 ?? "45"));
    setTrapHeight(String(raw.height ?? "20"));
    setTrapUnit(raw.unit ?? "feet");
    setTrapQty(String(raw.quantity ?? "1"));
    setTrapPrice(String(raw.price ?? ""));
    setTrapPriceUnit(raw.priceUnit ?? "per_sq_ft");
    const res = calculateTrapezoidArea({
      base1: Number(raw.base1) || 0,
      base2: Number(raw.base2) || 0,
      height: Number(raw.height) || 0,
      unit: raw.unit ?? "feet",
      quantity: Number(raw.quantity) || 1,
      wastePercent: 0,
      price: Number(raw.price) || 0,
      priceUnit: raw.priceUnit ?? "per_sq_ft",
    });
    setTrapResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Trapezoid calculation restored");
  };

  const handleRestoreSector = (raw: Record<string, any>) => {
    setSectorRadius(String(raw.radius ?? "30"));
    setSectorAngle(String(raw.angle ?? "90"));
    setSectorUnit(raw.unit ?? "feet");
    setSectorQty(String(raw.quantity ?? "1"));
    setSectorPrice(String(raw.price ?? ""));
    setSectorPriceUnit(raw.priceUnit ?? "per_sq_ft");
    const res = calculateSectorArea({
      radius: Number(raw.radius) || 0,
      angleDegrees: Number(raw.angle) || 0,
      unit: raw.unit ?? "feet",
      quantity: Number(raw.quantity) || 1,
      wastePercent: 0,
      price: Number(raw.price) || 0,
      priceUnit: raw.priceUnit ?? "per_sq_ft",
    });
    setSectorResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Sector calculation restored");
  };

  const handleRestorePara = (raw: Record<string, any>) => {
    setParaBase(String(raw.base ?? "30"));
    setParaHeight(String(raw.height ?? "20"));
    setParaUnit(raw.unit ?? "feet");
    setParaQty(String(raw.quantity ?? "1"));
    setParaPrice(String(raw.price ?? ""));
    setParaPriceUnit(raw.priceUnit ?? "per_sq_ft");
    const res = calculateParallelogramArea({
      base: Number(raw.base) || 0,
      height: Number(raw.height) || 0,
      unit: raw.unit ?? "feet",
      quantity: Number(raw.quantity) || 1,
      wastePercent: 0,
      price: Number(raw.price) || 0,
      priceUnit: raw.priceUnit ?? "per_sq_ft",
    });
    setParaResult(res);
    if (res.isValid) setMaterialPresetSqFt(String(res.squareFeet));
    showRestored("Parallelogram calculation restored");
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];
    if (rectResult && rectResult.isValid) {
      sections.push({
        title: "Rectangle",
        items: [
          { label: "Total Area", value: `${rectResult.squareFeet.toLocaleString()} sq ft` },
          { label: "Square Yards", value: `${rectResult.squareYards} sq yd` },
          { label: "Square Meters", value: `${rectResult.squareMeters} m²` },
        ],
      });
    }
    if (borderResult && borderResult.isValid) {
      sections.push({
        title: "Rectangle Border",
        items: [
          { label: "Border Area", value: `${borderResult.squareFeet.toLocaleString()} sq ft` },
          { label: "Outer Area", value: `${borderResult.outerAreaSqFt} sq ft` },
        ],
      });
    }
    if (circResult && circResult.isValid) {
      sections.push({
        title: "Circle",
        items: [
          { label: "Circle Area", value: `${circResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (ringResult && ringResult.isValid) {
      sections.push({
        title: "Ring",
        items: [
          { label: "Ring Area", value: `${ringResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (triResult && triResult.isValid) {
      sections.push({
        title: "Triangle",
        items: [
          { label: "Triangle Area", value: `${triResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (trapResult && trapResult.isValid) {
      sections.push({
        title: "Trapezoid",
        items: [
          { label: "Trapezoid Area", value: `${trapResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (sectorResult && sectorResult.isValid) {
      sections.push({
        title: "Sector",
        items: [
          { label: "Sector Area", value: `${sectorResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }
    if (paraResult && paraResult.isValid) {
      sections.push({
        title: "Parallelogram",
        items: [
          { label: "Parallelogram Area", value: `${paraResult.squareFeet.toLocaleString()} sq ft` },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Square Footage Calculator",
        reportTitle: "Square Footage & Area Estimation Report",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
        currencySymbol: "$",
      },
      keyMetrics: [
        {
          label: "Rectangle Area",
          value: rectResult && rectResult.isValid ? `${rectResult.squareFeet.toLocaleString()} sq ft` : "—",
          highlight: true,
        },
        {
          label: "Trapezoid Area",
          value: trapResult && trapResult.isValid ? `${trapResult.squareFeet.toLocaleString()} sq ft` : "—",
        },
        {
          label: "Sector Area",
          value: sectorResult && sectorResult.isValid ? `${sectorResult.squareFeet.toLocaleString()} sq ft` : "—",
        },
      ],
      sections,
    };
  }, [rectResult, borderResult, circResult, ringResult, triResult, trapResult, sectorResult, paraResult]);

  return (
    <div className="space-y-4">
      {/* Global Restore Confirmation Banner */}
      {restoredToast && (
        <div
          role="status"
          aria-live="polite"
          className="no-print p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-lg flex items-center gap-2 shadow-xs transition-all animate-fadeIn"
        >
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{restoredToast}</span>
        </div>
      )}

      {/* ═══════════════════ CARD 1: RECTANGLE ═══════════════════ */}
      <CardWrapper
        title="Rectangle"
        hasResult={rectMode === "single" ? !!(rectResult && rectResult.isValid) : !!(multiResult && multiResult.isValid)}
        isSaved={rectSaveSuccess}
        savedCount={rectSaved.saved.length}
        onToggleSaved={() => rectSaved.setIsOpen(!rectSaved.isOpen)}
        onSave={() => {
          if (rectMode === "single" && rectResult && rectResult.isValid) {
            rectSaved.save(
              `${rectLength}×${rectWidth} ${rectUnit}, Qty: ${rectQty}`,
              rectResult,
              {
                mode: "single",
                length: rectLength,
                width: rectWidth,
                unit: rectUnit,
                quantity: rectQty,
                price: rectPrice,
                priceUnit: rectPriceUnit,
              },
            );
            flashSave(setRectSaveSuccess);
          } else if (rectMode === "multi" && multiResult && multiResult.isValid) {
            rectSaved.save(
              `Multi-room (${rooms.length} sections)`,
              multiResult,
              {
                mode: "multi",
                rooms: [...rooms],
                waste: multiWaste,
                price: multiPrice,
                priceUnit: multiPriceUnit,
              },
            );
            flashSave(setRectSaveSuccess);
          }
        }}
      >
        <div className="no-print flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setRectMode("single")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              rectMode === "single"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Single Rectangle
          </button>
          <button
            type="button"
            onClick={() => setRectMode("multi")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
              rectMode === "multi"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Multi-Room Aggregator
          </button>
        </div>

        {rectMode === "single" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <InputRow
                id="rect-length"
                label="Length"
                value={rectLength}
                onChange={setRectLength}
                unit={rectUnit}
                onUnitChange={setRectUnit}
              />
              <InputRow
                id="rect-width"
                label="Width"
                value={rectWidth}
                onChange={setRectWidth}
                unit={rectUnit}
                onUnitChange={setRectUnit}
              />
              <InputRow
                id="rect-qty"
                label="Quantity"
                value={rectQty}
                onChange={setRectQty}
                min={1}
                step={1}
                showUnit={false}
              />
              <InputRow
                id="rect-price"
                label="Price (optional)"
                value={rectPrice}
                onChange={setRectPrice}
                unit={rectPriceUnit}
                onUnitChange={setRectPriceUnit}
                unitOptions={PRICE_UNITS}
                min={0}
              />

              <div className="no-print flex gap-2 pt-1">
                <Button
                  onClick={handleRectCalc}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
                >
                  Calculate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRectLength("30");
                    setRectWidth("20");
                    setRectQty("1");
                    setRectPrice("");
                  }}
                  className="text-xs font-semibold h-8 px-3 cursor-pointer"
                >
                  Clear
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <RectangleSvg l={Number(rectLength)} w={Number(rectWidth)} unit={rectUnit} />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="space-y-2">
              {rooms.map((room, idx) => (
                <div
                  key={room.id}
                  className="grid grid-cols-12 gap-2 items-center bg-slate-50 dark:bg-zinc-800/40 p-2 rounded-lg border border-slate-200 dark:border-zinc-700 text-xs"
                >
                  <div className="col-span-3">
                    <label htmlFor={`room-name-${room.id}`} className="sr-only">
                      Room Name
                    </label>
                    <Input
                      id={`room-name-${room.id}`}
                      type="text"
                      value={room.name}
                      onChange={(e) => updateRoomRow(room.id, "name", e.target.value)}
                      placeholder="Room Name"
                      className="h-7 text-xs bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor={`room-length-${room.id}`} className="sr-only">
                      Room Length
                    </label>
                    <Input
                      id={`room-length-${room.id}`}
                      type="number"
                      value={room.length}
                      onChange={(e) => updateRoomRow(room.id, "length", Number(e.target.value))}
                      placeholder="Length"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <label htmlFor={`room-width-${room.id}`} className="sr-only">
                      Room Width
                    </label>
                    <Input
                      id={`room-width-${room.id}`}
                      type="number"
                      value={room.width}
                      onChange={(e) => updateRoomRow(room.id, "width", Number(e.target.value))}
                      placeholder="Width"
                      className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      id={`room-unit-${room.id}`}
                      value={room.unit}
                      aria-label={`Room ${idx + 1} unit`}
                      onChange={(e) => updateRoomRow(room.id, "unit", e.target.value)}
                      className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1 text-zinc-700 dark:text-zinc-300"
                    >
                      {LINEAR_UNITS.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 flex justify-end no-print">
                    <button
                      type="button"
                      onClick={() => removeRoomRow(room.id)}
                      disabled={rooms.length <= 1}
                      className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 cursor-pointer"
                      aria-label={`Remove room ${room.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 no-print">
              <Button
                variant="outline"
                size="sm"
                onClick={addRoomRow}
                className="text-xs h-7 gap-1 font-semibold text-blue-600 dark:text-blue-400 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Room / Section
              </Button>
              <Button
                onClick={handleRectCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7 px-4 cursor-pointer"
              >
                Calculate Total
              </Button>
            </div>
          </div>
        )}

        {rectMode === "single" && rectResult && rectResult.isValid && (
          <ResultDisplay
            shapeName="Rectangle"
            latexFormula="A = L \times W"
            summaryText={`Rectangle: Length = ${rectLength} ${rectUnit}, Width = ${rectWidth} ${rectUnit}, Quantity = ${rectQty}, Area = ${rectResult.squareFeet.toLocaleString()} sq ft (${rectResult.squareYards} sq yd, ${rectResult.squareMeters} m²), Perimeter = ${rectResult.perimeterFt} ft${rectPrice ? `, Cost = $${rectResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={rectResult.squareFeet}
            sqYd={rectResult.squareYards}
            sqM={rectResult.squareMeters}
            acres={rectResult.acres}
            cost={rectResult.estimatedCost}
            secondaryLabel="Perimeter"
            secondaryValue={`${rectResult.perimeterFt} ft`}
          />
        )}

        {rectMode === "multi" && multiResult && multiResult.isValid && (
          <ResultDisplay
            shapeName="Multi-Room Aggregator"
            latexFormula="A_{\text{total}} = \sum_{i=1}^{n} (L_i \times W_i)"
            summaryText={`Multi-Room: ${rooms.length} sections, Total Area = ${multiResult.squareFeet.toLocaleString()} sq ft (with ${multiWaste}% waste: ${multiResult.wasteSquareFeet.toLocaleString()} sq ft)`}
            sqFt={multiResult.squareFeet}
            sqYd={multiResult.squareYards}
            sqM={multiResult.squareMeters}
            acres={multiResult.acres}
            wasteSqFt={multiResult.wasteSquareFeet}
            wastePercent={Number(multiWaste)}
            cost={multiResult.estimatedCost}
            secondaryLabel="Sections Summed"
            secondaryValue={`${multiResult.sectionsCount} rooms`}
          />
        )}

        <SavedEstimatesDrawer
          {...rectSaved}
          cardTitle="Rectangle"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreRect}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: RECTANGLE BORDER ═══════════════════ */}
      <CardWrapper
        title="Rectangle Border"
        hasResult={!!(borderResult && borderResult.isValid)}
        isSaved={borderSaveSuccess}
        savedCount={borderSaved.saved.length}
        onToggleSaved={() => borderSaved.setIsOpen(!borderSaved.isOpen)}
        onSave={() => {
          if (!borderResult || !borderResult.isValid) return;
          borderSaved.save(
            `Outer: ${borderLength}×${borderWidthVal}, Border: ${borderThickness} ${borderUnit}`,
            borderResult,
            {
              length: borderLength,
              width: borderWidthVal,
              borderThickness,
              unit: borderUnit,
              quantity: borderQty,
              price: borderPrice,
              priceUnit: borderPriceUnit,
            },
          );
          flashSave(setBorderSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="border-outer-length"
              label="Length"
              value={borderLength}
              onChange={setBorderLength}
              unit={borderUnit}
              onUnitChange={setBorderUnit}
            />
            <InputRow
              id="border-outer-width"
              label="Width"
              value={borderWidthVal}
              onChange={setBorderWidthVal}
              unit={borderUnit}
              onUnitChange={setBorderUnit}
            />
            <InputRow
              id="border-thickness"
              label="Border Width"
              value={borderThickness}
              onChange={setBorderThickness}
              unit={borderUnit}
              onUnitChange={setBorderUnit}
            />
            <InputRow
              id="border-qty"
              label="Quantity"
              value={borderQty}
              onChange={setBorderQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="border-price"
              label="Price (optional)"
              value={borderPrice}
              onChange={setBorderPrice}
              unit={borderPriceUnit}
              onUnitChange={setBorderPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleBorderCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setBorderLength("30");
                  setBorderWidthVal("20");
                  setBorderThickness("2");
                  setBorderQty("1");
                  setBorderPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <RectangleBorderSvg
              outerL={Number(borderLength)}
              outerW={Number(borderWidthVal)}
              border={Number(borderThickness)}
              unit={borderUnit}
              isValid={borderResult ? borderResult.isValid : true}
            />
          </div>
        </div>

        {/* Validation Error Banner */}
        {borderResult && !borderResult.isValid && (
          <div
            role="alert"
            className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-lg text-xs text-red-800 dark:text-red-200 flex items-start gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Invalid Geometry</div>
              <div>{borderResult.error}</div>
            </div>
          </div>
        )}

        {borderResult && borderResult.isValid && (
          <ResultDisplay
            shapeName="Rectangle Border"
            latexFormula="A = (L \times W) - ((L - 2b) \times (W - 2b))"
            summaryText={`Rectangle Border: Outer = ${borderLength}×${borderWidthVal} ${borderUnit}, Border Width = ${borderThickness} ${borderUnit}, Net Border Area = ${borderResult.squareFeet.toLocaleString()} sq ft, Outer Area = ${borderResult.outerAreaSqFt} sq ft, Inner Area = ${borderResult.innerAreaSqFt} sq ft${borderPrice ? `, Cost = $${borderResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={borderResult.squareFeet}
            sqYd={borderResult.squareYards}
            sqM={borderResult.squareMeters}
            acres={borderResult.acres}
            cost={borderResult.estimatedCost}
            secondaryLabel="Outer vs Inner Area"
            secondaryValue={`Outer: ${borderResult.outerAreaSqFt} sq ft | Inner: ${borderResult.innerAreaSqFt} sq ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...borderSaved}
          cardTitle="Border"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreBorder}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: CIRCLE ═══════════════════ */}
      <CardWrapper
        title="Circle"
        hasResult={!!(circResult && circResult.isValid)}
        isSaved={circSaveSuccess}
        savedCount={circSaved.saved.length}
        onToggleSaved={() => circSaved.setIsOpen(!circSaved.isOpen)}
        onSave={() => {
          if (!circResult || !circResult.isValid) return;
          circSaved.save(
            `Diameter: ${circDiameter} ${circUnit}`,
            circResult,
            {
              diameter: circDiameter,
              unit: circUnit,
              quantity: circQty,
              price: circPrice,
              priceUnit: circPriceUnit,
            },
          );
          flashSave(setCircSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="circ-diameter"
              label="Diameter"
              value={circDiameter}
              onChange={setCircDiameter}
              unit={circUnit}
              onUnitChange={setCircUnit}
            />
            <InputRow
              id="circ-qty"
              label="Quantity"
              value={circQty}
              onChange={setCircQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="circ-price"
              label="Price (optional)"
              value={circPrice}
              onChange={setCircPrice}
              unit={circPriceUnit}
              onUnitChange={setCircPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleCircCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCircDiameter("30");
                  setCircQty("1");
                  setCircPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <CircleSvg diameter={Number(circDiameter)} unit={circUnit} />
          </div>
        </div>

        {circResult && circResult.isValid && (
          <ResultDisplay
            shapeName="Circle"
            latexFormula="A = \pi r^2"
            summaryText={`Circle: Diameter = ${circDiameter} ${circUnit} (radius = ${Number(circDiameter) / 2} ${circUnit}), Area = ${circResult.squareFeet.toLocaleString()} sq ft, Circumference = ${circResult.circumferenceFt} ft${circPrice ? `, Cost = $${circResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={circResult.squareFeet}
            sqYd={circResult.squareYards}
            sqM={circResult.squareMeters}
            acres={circResult.acres}
            cost={circResult.estimatedCost}
            secondaryLabel="Circumference"
            secondaryValue={`${circResult.circumferenceFt} ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...circSaved}
          cardTitle="Circle"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreCirc}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 4: RING ═══════════════════ */}
      <CardWrapper
        title="Ring"
        hasResult={!!(ringResult && ringResult.isValid)}
        isSaved={ringSaveSuccess}
        savedCount={ringSaved.saved.length}
        onToggleSaved={() => ringSaved.setIsOpen(!ringSaved.isOpen)}
        onSave={() => {
          if (!ringResult || !ringResult.isValid) return;
          ringSaved.save(
            `Outer Dia: ${ringOuterDia}, Border: ${ringBorderWidth} ${ringUnit}`,
            ringResult,
            {
              outerDia: ringOuterDia,
              borderWidth: ringBorderWidth,
              unit: ringUnit,
              quantity: ringQty,
              price: ringPrice,
              priceUnit: ringPriceUnit,
            },
          );
          flashSave(setRingSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="ring-outer-dia"
              label="Outer Diameter"
              value={ringOuterDia}
              onChange={setRingOuterDia}
              unit={ringUnit}
              onUnitChange={setRingUnit}
            />
            <InputRow
              id="ring-border-width"
              label="Border Width"
              value={ringBorderWidth}
              onChange={setRingBorderWidth}
              unit={ringUnit}
              onUnitChange={setRingUnit}
            />
            <InputRow
              id="ring-qty"
              label="Quantity"
              value={ringQty}
              onChange={setRingQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="ring-price"
              label="Price (optional)"
              value={ringPrice}
              onChange={setRingPrice}
              unit={ringPriceUnit}
              onUnitChange={setRingPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleRingCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setRingOuterDia("30");
                  setRingBorderWidth("2");
                  setRingQty("1");
                  setRingPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <RingSvg
              outerDia={Number(ringOuterDia)}
              border={Number(ringBorderWidth)}
              unit={ringUnit}
              isValid={ringResult ? ringResult.isValid : true}
            />
          </div>
        </div>

        {/* Validation Error Banner */}
        {ringResult && !ringResult.isValid && (
          <div
            role="alert"
            className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-lg text-xs text-red-800 dark:text-red-200 flex items-start gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Invalid Geometry</div>
              <div>{ringResult.error}</div>
            </div>
          </div>
        )}

        {ringResult && ringResult.isValid && (
          <ResultDisplay
            shapeName="Ring"
            latexFormula="A = \pi(R^2 - r^2)"
            summaryText={`Ring: Outer Diameter = ${ringOuterDia} ${ringUnit}, Border Width = ${ringBorderWidth} ${ringUnit}, Inner Diameter = ${ringResult.innerDiameterFt} ft, Area = ${ringResult.squareFeet.toLocaleString()} sq ft${ringPrice ? `, Cost = $${ringResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={ringResult.squareFeet}
            sqYd={ringResult.squareYards}
            sqM={ringResult.squareMeters}
            acres={ringResult.acres}
            cost={ringResult.estimatedCost}
            secondaryLabel="Inner Diameter"
            secondaryValue={`${ringResult.innerDiameterFt} ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...ringSaved}
          cardTitle="Ring"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreRing}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 5: TRIANGLE ═══════════════════ */}
      <CardWrapper
        title="Triangle with Edge Lengths & Base/Height"
        hasResult={!!(triResult && triResult.isValid)}
        isSaved={triSaveSuccess}
        savedCount={triSaved.saved.length}
        onToggleSaved={() => triSaved.setIsOpen(!triSaved.isOpen)}
        onSave={() => {
          if (!triResult || !triResult.isValid) return;
          triSaved.save(
            `Triangle (${triMode}): ${triResult.squareFeet.toLocaleString()} sq ft`,
            triResult,
            {
              mode: triMode,
              edge1: triEdge1,
              edge2: triEdge2,
              edge3: triEdge3,
              base: triBase,
              height: triHeight,
              unit: triUnit,
              quantity: triQty,
              price: triPrice,
              priceUnit: triPriceUnit,
            },
          );
          flashSave(setTriSaveSuccess);
        }}
      >
        <div className="no-print flex gap-2 text-xs pb-1 border-b border-zinc-100 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setTriMode("edges")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              triMode === "edges"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Triangle with Edge Lengths
          </button>
          <button
            type="button"
            onClick={() => setTriMode("base_height")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer ${
              triMode === "base_height"
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Triangle with Base &amp; Height
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {triMode === "edges" ? (
              <>
                <InputRow
                  id="tri-edge1"
                  label="Edge 1 (a)"
                  value={triEdge1}
                  onChange={setTriEdge1}
                  unit={triUnit}
                  onUnitChange={setTriUnit}
                />
                <InputRow
                  id="tri-edge2"
                  label="Edge 2 (b)"
                  value={triEdge2}
                  onChange={setTriEdge2}
                  unit={triUnit}
                  onUnitChange={setTriUnit}
                />
                <InputRow
                  id="tri-edge3"
                  label="Edge 3 (c)"
                  value={triEdge3}
                  onChange={setTriEdge3}
                  unit={triUnit}
                  onUnitChange={setTriUnit}
                />
              </>
            ) : (
              <>
                <InputRow
                  id="tri-base"
                  label="Base"
                  value={triBase}
                  onChange={setTriBase}
                  unit={triUnit}
                  onUnitChange={setTriUnit}
                />
                <InputRow
                  id="tri-height"
                  label="Height"
                  value={triHeight}
                  onChange={setTriHeight}
                  unit={triUnit}
                  onUnitChange={setTriUnit}
                />
              </>
            )}

            <InputRow
              id="tri-qty"
              label="Quantity"
              value={triQty}
              onChange={setTriQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="tri-price"
              label="Price (optional)"
              value={triPrice}
              onChange={setTriPrice}
              unit={triPriceUnit}
              onUnitChange={setTriPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleTriCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTriEdge1("30");
                  setTriEdge2("45");
                  setTriEdge3("50");
                  setTriBase("30");
                  setTriHeight("20");
                  setTriQty("1");
                  setTriPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {triMode === "edges" ? (
              <TriangleEdgesSvg
                a={Number(triEdge1)}
                b={Number(triEdge2)}
                c={Number(triEdge3)}
                unit={triUnit}
              />
            ) : (
              <TriangleBaseHeightSvg
                base={Number(triBase)}
                height={Number(triHeight)}
                unit={triUnit}
              />
            )}
          </div>
        </div>

        {triResult && triResult.isValid && (
          <ResultDisplay
            shapeName={`Triangle (${triMode === "edges" ? "3 Sides" : "Base & Height"})`}
            latexFormula={
              triMode === "edges"
                ? "A = \\sqrt{s(s-a)(s-b)(s-c)}"
                : "A = \\frac{1}{2}bh"
            }
            summaryText={
              triMode === "edges"
                ? `Triangle (Heron): a = ${triEdge1}, b = ${triEdge2}, c = ${triEdge3} ${triUnit}, Area = ${triResult.squareFeet.toLocaleString()} sq ft${triPrice ? `, Cost = $${triResult.estimatedCost.toFixed(2)}` : ""}`
                : `Triangle (Base/Height): Base = ${triBase}, Height = ${triHeight} ${triUnit}, Area = ${triResult.squareFeet.toLocaleString()} sq ft${triPrice ? `, Cost = $${triResult.estimatedCost.toFixed(2)}` : ""}`
            }
            sqFt={triResult.squareFeet}
            sqYd={triResult.squareYards}
            sqM={triResult.squareMeters}
            acres={triResult.acres}
            cost={triResult.estimatedCost}
          />
        )}

        <SavedEstimatesDrawer
          {...triSaved}
          cardTitle="Triangle"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreTri}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 6: TRAPEZOID ═══════════════════ */}
      <CardWrapper
        title="Trapezoid"
        hasResult={!!(trapResult && trapResult.isValid)}
        isSaved={trapSaveSuccess}
        savedCount={trapSaved.saved.length}
        onToggleSaved={() => trapSaved.setIsOpen(!trapSaved.isOpen)}
        onSave={() => {
          if (!trapResult || !trapResult.isValid) return;
          trapSaved.save(
            `Base1: ${trapBase1}, Base2: ${trapBase2}, H: ${trapHeight} ${trapUnit}`,
            trapResult,
            {
              base1: trapBase1,
              base2: trapBase2,
              height: trapHeight,
              unit: trapUnit,
              quantity: trapQty,
              price: trapPrice,
              priceUnit: trapPriceUnit,
            },
          );
          flashSave(setTrapSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="trap-base1"
              label="Base 1"
              value={trapBase1}
              onChange={setTrapBase1}
              unit={trapUnit}
              onUnitChange={setTrapUnit}
            />
            <InputRow
              id="trap-base2"
              label="Base 2"
              value={trapBase2}
              onChange={setTrapBase2}
              unit={trapUnit}
              onUnitChange={setTrapUnit}
            />
            <InputRow
              id="trap-height"
              label="Height"
              value={trapHeight}
              onChange={setTrapHeight}
              unit={trapUnit}
              onUnitChange={setTrapUnit}
            />
            <InputRow
              id="trap-qty"
              label="Quantity"
              value={trapQty}
              onChange={setTrapQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="trap-price"
              label="Price (optional)"
              value={trapPrice}
              onChange={setTrapPrice}
              unit={trapPriceUnit}
              onUnitChange={setTrapPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleTrapCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setTrapBase1("30");
                  setTrapBase2("45");
                  setTrapHeight("20");
                  setTrapQty("1");
                  setTrapPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <TrapezoidSvg
              b1={Number(trapBase1)}
              b2={Number(trapBase2)}
              h={Number(trapHeight)}
              unit={trapUnit}
            />
          </div>
        </div>

        {trapResult && trapResult.isValid && (
          <ResultDisplay
            shapeName="Trapezoid"
            latexFormula="A = \\frac{b_1 + b_2}{2}h"
            summaryText={`Trapezoid: Base 1 = ${trapBase1} ${trapUnit}, Base 2 = ${trapBase2} ${trapUnit}, Height = ${trapHeight} ${trapUnit}, Area = ${trapResult.squareFeet.toLocaleString()} sq ft${trapPrice ? `, Cost = $${trapResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={trapResult.squareFeet}
            sqYd={trapResult.squareYards}
            sqM={trapResult.squareMeters}
            acres={trapResult.acres}
            cost={trapResult.estimatedCost}
          />
        )}

        <SavedEstimatesDrawer
          {...trapSaved}
          cardTitle="Trapezoid"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreTrap}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 7: SECTOR ═══════════════════ */}
      <CardWrapper
        title="Sector"
        hasResult={!!(sectorResult && sectorResult.isValid)}
        isSaved={sectorSaveSuccess}
        savedCount={sectorSaved.saved.length}
        onToggleSaved={() => sectorSaved.setIsOpen(!sectorSaved.isOpen)}
        onSave={() => {
          if (!sectorResult || !sectorResult.isValid) return;
          sectorSaved.save(
            `Radius: ${sectorRadius} ${sectorUnit}, Angle: ${sectorAngle}°`,
            sectorResult,
            {
              radius: sectorRadius,
              angle: sectorAngle,
              unit: sectorUnit,
              quantity: sectorQty,
              price: sectorPrice,
              priceUnit: sectorPriceUnit,
            },
          );
          flashSave(setSectorSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="sector-radius"
              label="Radius"
              value={sectorRadius}
              onChange={setSectorRadius}
              unit={sectorUnit}
              onUnitChange={setSectorUnit}
            />
            <InputRow
              id="sector-angle"
              label="Angle (degree °)"
              value={sectorAngle}
              onChange={setSectorAngle}
              min={0}
              max={360}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="sector-qty"
              label="Quantity"
              value={sectorQty}
              onChange={setSectorQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="sector-price"
              label="Price (optional)"
              value={sectorPrice}
              onChange={setSectorPrice}
              unit={sectorPriceUnit}
              onUnitChange={setSectorPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleSectorCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSectorRadius("30");
                  setSectorAngle("90");
                  setSectorQty("1");
                  setSectorPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <SectorSvg
              radius={Number(sectorRadius)}
              angle={Number(sectorAngle)}
              unit={sectorUnit}
              isValid={sectorResult ? sectorResult.isValid : true}
            />
          </div>
        </div>

        {/* Validation Error Banner */}
        {sectorResult && !sectorResult.isValid && (
          <div
            role="alert"
            className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-lg text-xs text-red-800 dark:text-red-200 flex items-start gap-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Invalid Geometry</div>
              <div>{sectorResult.error}</div>
            </div>
          </div>
        )}

        {sectorResult && sectorResult.isValid && (
          <ResultDisplay
            shapeName="Sector"
            latexFormula="A = \\frac{\\theta}{360}\\pi r^2"
            summaryText={`Sector: Radius = ${sectorRadius} ${sectorUnit}, Angle = ${sectorAngle}°, Area = ${sectorResult.squareFeet.toLocaleString()} sq ft, Arc Length = ${sectorResult.arcLengthFt} ft${sectorPrice ? `, Cost = $${sectorResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={sectorResult.squareFeet}
            sqYd={sectorResult.squareYards}
            sqM={sectorResult.squareMeters}
            acres={sectorResult.acres}
            cost={sectorResult.estimatedCost}
            secondaryLabel="Arc Length"
            secondaryValue={`${sectorResult.arcLengthFt} ft`}
          />
        )}

        <SavedEstimatesDrawer
          {...sectorSaved}
          cardTitle="Sector"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestoreSector}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 8: PARALLELOGRAM ═══════════════════ */}
      <CardWrapper
        title="Parallelogram"
        hasResult={!!(paraResult && paraResult.isValid)}
        isSaved={paraSaveSuccess}
        savedCount={paraSaved.saved.length}
        onToggleSaved={() => paraSaved.setIsOpen(!paraSaved.isOpen)}
        onSave={() => {
          if (!paraResult || !paraResult.isValid) return;
          paraSaved.save(
            `Base: ${paraBase}, Height: ${paraHeight} ${paraUnit}`,
            paraResult,
            {
              base: paraBase,
              height: paraHeight,
              unit: paraUnit,
              quantity: paraQty,
              price: paraPrice,
              priceUnit: paraPriceUnit,
            },
          );
          flashSave(setParaSaveSuccess);
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <InputRow
              id="para-base"
              label="Base"
              value={paraBase}
              onChange={setParaBase}
              unit={paraUnit}
              onUnitChange={setParaUnit}
            />
            <InputRow
              id="para-height"
              label="Height"
              value={paraHeight}
              onChange={setParaHeight}
              unit={paraUnit}
              onUnitChange={setParaUnit}
            />
            <InputRow
              id="para-qty"
              label="Quantity"
              value={paraQty}
              onChange={setParaQty}
              min={1}
              step={1}
              showUnit={false}
            />
            <InputRow
              id="para-price"
              label="Price (optional)"
              value={paraPrice}
              onChange={setParaPrice}
              unit={paraPriceUnit}
              onUnitChange={setParaPriceUnit}
              unitOptions={PRICE_UNITS}
              min={0}
            />

            <div className="no-print flex gap-2 pt-1">
              <Button
                onClick={handleParaCalc}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-8 px-4 cursor-pointer"
              >
                Calculate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setParaBase("30");
                  setParaHeight("20");
                  setParaQty("1");
                  setParaPrice("");
                }}
                className="text-xs font-semibold h-8 px-3 cursor-pointer"
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ParallelogramSvg
              base={Number(paraBase)}
              height={Number(paraHeight)}
              unit={paraUnit}
            />
          </div>
        </div>

        {paraResult && paraResult.isValid && (
          <ResultDisplay
            shapeName="Parallelogram"
            latexFormula="A = bh"
            summaryText={`Parallelogram: Base = ${paraBase} ${paraUnit}, Height = ${paraHeight} ${paraUnit}, Area = ${paraResult.squareFeet.toLocaleString()} sq ft${paraPrice ? `, Cost = $${paraResult.estimatedCost.toFixed(2)}` : ""}`}
            sqFt={paraResult.squareFeet}
            sqYd={paraResult.squareYards}
            sqM={paraResult.squareMeters}
            acres={paraResult.acres}
            cost={paraResult.estimatedCost}
          />
        )}

        <SavedEstimatesDrawer
          {...paraSaved}
          cardTitle="Parallelogram"
          formatSummary={(r) => `${r.squareFeet.toLocaleString()} sq ft`}
          onRestore={handleRestorePara}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 9: MATERIAL ESTIMATOR ═══════════════════ */}
      <CardWrapper title="Material Packaging & Trade Estimator">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <label
                htmlFor="target-surface-area"
                className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                Target Surface Area:
              </label>
              <Input
                id="target-surface-area"
                name="target-surface-area"
                type="number"
                value={materialPresetSqFt}
                onChange={(e) => setMaterialPresetSqFt(e.target.value)}
                min={1}
                className="w-28 h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
              <span className="text-xs text-zinc-500 font-medium">sq ft</span>
            </div>

            <div className="no-print flex items-center gap-1.5 text-[11px] text-zinc-500">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Auto-synced from latest calculation</span>
            </div>
          </div>

          {materials && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  Tile Boxes
                </span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.tileBoxes}
                </span>
                <span className="text-[10px] text-zinc-400 block">@ 10 sq ft/box</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  Hardwood Flooring
                </span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.hardwoodCartons}
                </span>
                <span className="text-[10px] text-zinc-400 block">@ 20 sq ft/carton</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  Wall Paint
                </span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.paintGallons}
                </span>
                <span className="text-[10px] text-zinc-400 block">gallons (1 coat)</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  Lawn Sod Turf
                </span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.sodRolls}
                </span>
                <span className="text-[10px] text-zinc-400 block">rolls (10 sq ft/roll)</span>
              </div>
              <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700/60">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-medium">
                  Carpet Area
                </span>
                <span className="text-base font-bold text-zinc-800 dark:text-zinc-200 font-sans tabular-nums">
                  {materials.carpetYards}
                </span>
                <span className="text-[10px] text-zinc-400 block">square yards (yd²)</span>
              </div>
            </div>
          )}
        </div>
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="no-print flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
          aria-label="Generate Full Square Footage Estimation Report"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-500" /> Generate Full Report
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
