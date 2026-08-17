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
                title="View saved conversions"
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
    a.download = `unit_conversion_${cardTitle.toLowerCase().replace(/\s+/g, "_")}.csv`;
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

// ─── Relative Unit Magnitude Visualizer ─────────────────────────────────────

function UnitMagnitudeVisualizer({
  result,
}: {
  result: ConversionResult;
}) {
  const topConversions = result.allConversions.slice(0, 6);
  const maxVal = Math.max(...topConversions.map((c) => Math.abs(c.value) || 1));

  return (
    <div className="w-full space-y-1.5 bg-slate-50 dark:bg-zinc-800/40 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700">
      <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        <span>RELATIVE MAGNITUDE SCALE</span>
        <span>{result.inputValue} {result.fromUnit.symbol}</span>
      </div>
      <div className="space-y-1.5">
        {topConversions.map((item) => {
          const pct = Math.max(4, Math.min(100, (Math.abs(item.value) / maxVal) * 100));
          const isTarget = item.unit.id === result.toUnit.id;
          return (
            <div key={item.unit.id} className="space-y-0.5 text-[10px] font-sans">
              <div className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                <span className={`truncate font-medium ${isTarget ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}>
                  {item.unit.name} ({item.unit.symbol})
                </span>
                <span className="tabular-nums font-mono font-semibold ml-2">
                  {item.formatted}
                </span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    isTarget ? "bg-blue-600 dark:bg-blue-400" : "bg-blue-300 dark:bg-blue-700"
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

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

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

  const [card1Result, setCard1Result] = useState<ConversionResult | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<ConversionResult>("saved_conversion_universal");

  // ─── CARD 2: QUICK LENGTH CONVERTER ───
  const [lenVal, setLenVal] = useState("10");
  const [lenFrom, setLenFrom] = useState("meter");
  const [lenTo, setLenTo] = useState("foot");
  const [lenResult, setLenResult] = useState<ConversionResult | null>(null);
  const [lenSaveSuccess, setLenSaveSuccess] = useState(false);
  const lenSaved = useCardSaved<ConversionResult>("saved_conversion_length");

  // ─── CARD 3: QUICK WEIGHT CONVERTER ───
  const [wtVal, setWtVal] = useState("150");
  const [wtFrom, setWtFrom] = useState("pound");
  const [wtTo, setWtTo] = useState("kilogram");
  const [wtResult, setWtResult] = useState<ConversionResult | null>(null);
  const [wtSaveSuccess, setWtSaveSuccess] = useState(false);
  const wtSaved = useCardSaved<ConversionResult>("saved_conversion_weight");

  // ─── CARD 4: QUICK TEMPERATURE CONVERTER ───
  const [tempVal, setTempVal] = useState("100");
  const [tempFrom, setTempFrom] = useState("celsius");
  const [tempTo, setTempTo] = useState("fahrenheit");
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

  // Calculations
  const computeCard1 = useCallback(() => {
    const num = Number(inputValue) || 0;
    const res = convertUnit(category, fromUnitId, toUnitId, num, precision, isScientific);
    setCard1Result(res);
  }, [category, fromUnitId, toUnitId, inputValue, precision, isScientific]);

  const computeCard2 = useCallback(() => {
    const num = Number(lenVal) || 0;
    const res = convertUnit("length", lenFrom, lenTo, num, 4, false);
    setLenResult(res);
  }, [lenVal, lenFrom, lenTo]);

  const computeCard3 = useCallback(() => {
    const num = Number(wtVal) || 0;
    const res = convertUnit("weight", wtFrom, wtTo, num, 4, false);
    setWtResult(res);
  }, [wtVal, wtFrom, wtTo]);

  const computeCard4 = useCallback(() => {
    const num = Number(tempVal) || 0;
    const res = convertUnit("temperature", tempFrom, tempTo, num, 2, false);
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Report Data
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result) {
      sections.push({
        title: `Universal Conversion — ${CONVERSION_CATEGORIES[category].name}`,
        items: [
          { label: "Input Value", value: `${card1Result.inputValue} ${card1Result.fromUnit.name} (${card1Result.fromUnit.symbol})` },
          { label: "Primary Converted Value", value: `${formatNumberPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.name} (${card1Result.toUnit.symbol})` },
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
        { label: "Input Stated", value: card1Result ? `${card1Result.inputValue} ${card1Result.fromUnit.symbol}` : "—" },
        { label: "Primary Conversion", value: card1Result ? `${formatNumberPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol}` : "—", highlight: true },
        { label: "Active Category", value: CONVERSION_CATEGORIES[category].name },
      ],
      sections,
    };
  }, [card1Result, category, precision, isScientific]);

  const currentCatDef = CONVERSION_CATEGORIES[category];
  const filteredFromUnits = currentCatDef.units.filter((u) =>
    u.name.toLowerCase().includes(fromSearch.toLowerCase()) || u.symbol.toLowerCase().includes(fromSearch.toLowerCase())
  );
  const filteredToUnits = currentCatDef.units.filter((u) =>
    u.name.toLowerCase().includes(toSearch.toLowerCase()) || u.symbol.toLowerCase().includes(toSearch.toLowerCase())
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
            `${card1Result.inputValue} ${card1Result.fromUnit.symbol} ➔ ${formatNumberPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol} (${currentCatDef.name})`,
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-3">
          {/* Category Tabs */}
          <div className="overflow-x-auto pb-1">
            <div className="flex gap-1 min-w-max">
              {(Object.keys(CONVERSION_CATEGORIES) as UnitCategory[]).map((catKey) => {
                const cat = CONVERSION_CATEGORIES[catKey];
                const isActive = category === catKey;
                return (
                  <button
                    key={catKey}
                    type="button"
                    onClick={() => handleCategoryChange(catKey)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Precision & Notation */}
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

          {/* Main Dual Column Selector & Value Input */}
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
                    placeholder="Search..."
                    className="w-full h-6 pl-5 pr-1 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="h-8 text-sm font-bold font-sans tabular-nums bg-white dark:bg-zinc-800"
                placeholder="Enter value"
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
                    placeholder="Search..."
                    className="w-full h-6 pl-5 pr-1 text-[10px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  />
                </div>
              </div>

              <div className="h-8 px-3 rounded border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/30 flex items-center justify-between text-sm font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                <span>{card1Result ? formatNumberPrecision(card1Result.outputValue, precision, isScientific) : "0"}</span>
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

          {/* Result Formula Banner & Magnitude Visualizer */}
          {card1Result && (
            <div className="space-y-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800 flex flex-wrap items-center justify-between gap-2">
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

                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(
                      `${card1Result.inputValue} ${card1Result.fromUnit.symbol} = ${formatNumberPrecision(card1Result.outputValue, precision, isScientific)} ${card1Result.toUnit.symbol}`,
                      "primary"
                    )
                  }
                  className="h-7 text-xs font-semibold gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                >
                  {copiedId === "primary" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                  {copiedId === "primary" ? "Copied" : "Copy Result"}
                </Button>
              </div>

              <UnitMagnitudeVisualizer result={card1Result} />

              {/* All Units Matrix */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                  ALL {currentCatDef.name.toUpperCase()} UNITS MATRIX
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
          cardTitle="Universal"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 4)} ${r.toUnit.symbol}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 2: QUICK LENGTH & DISTANCE CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Quick Length &amp; Distance Converter"
        hasResult={!!lenResult}
        isSaved={lenSaveSuccess}
        savedCount={lenSaved.saved.length}
        onToggleSaved={() => lenSaved.setIsOpen(!lenSaved.isOpen)}
        onSave={() => {
          if (!lenResult) return;
          lenSaved.save(
            `${lenResult.inputValue} ${lenResult.fromUnit.symbol} = ${formatNumberPrecision(lenResult.outputValue, 4)} ${lenResult.toUnit.symbol}`,
            lenResult
          );
          flashSave(setLenSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Value</label>
              <Input
                type="number"
                value={lenVal}
                onChange={(e) => setLenVal(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">From</label>
              <select
                value={lenFrom}
                onChange={(e) => setLenFrom(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                {CONVERSION_CATEGORIES.length.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">To</label>
              <select
                value={lenTo}
                onChange={(e) => setLenTo(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                {CONVERSION_CATEGORIES.length.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          {lenResult && (
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
              <span className="font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                {lenResult.inputValue} {lenResult.fromUnit.symbol} = {formatNumberPrecision(lenResult.outputValue, 4)} {lenResult.toUnit.symbol}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {lenResult.formulaDescription}
              </span>
            </div>
          )}
        </div>

        <SavedDrawer
          {...lenSaved}
          cardTitle="Length"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 4)} ${r.toUnit.symbol}`}
        />
      </CardWrapper>

      {/* ═══════════════════ CARD 3: QUICK WEIGHT & MASS CONVERTER ═══════════════════ */}
      <CardWrapper
        title="Quick Weight &amp; Mass Converter"
        hasResult={!!wtResult}
        isSaved={wtSaveSuccess}
        savedCount={wtSaved.saved.length}
        onToggleSaved={() => wtSaved.setIsOpen(!wtSaved.isOpen)}
        onSave={() => {
          if (!wtResult) return;
          wtSaved.save(
            `${wtResult.inputValue} ${wtResult.fromUnit.symbol} = ${formatNumberPrecision(wtResult.outputValue, 4)} ${wtResult.toUnit.symbol}`,
            wtResult
          );
          flashSave(setWtSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Value</label>
              <Input
                type="number"
                value={wtVal}
                onChange={(e) => setWtVal(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">From</label>
              <select
                value={wtFrom}
                onChange={(e) => setWtFrom(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                {CONVERSION_CATEGORIES.weight.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">To</label>
              <select
                value={wtTo}
                onChange={(e) => setWtTo(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                {CONVERSION_CATEGORIES.weight.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          {wtResult && (
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
              <span className="font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                {wtResult.inputValue} {wtResult.fromUnit.symbol} = {formatNumberPrecision(wtResult.outputValue, 4)} {wtResult.toUnit.symbol}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {wtResult.formulaDescription}
              </span>
            </div>
          )}
        </div>

        <SavedDrawer
          {...wtSaved}
          cardTitle="Weight"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 4)} ${r.toUnit.symbol}`}
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
            `${tempResult.inputValue} ${tempResult.fromUnit.symbol} = ${formatNumberPrecision(tempResult.outputValue, 2)} ${tempResult.toUnit.symbol}`,
            tempResult
          );
          flashSave(setTempSaveSuccess);
        }}
      >
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-slate-200 dark:border-zinc-700">
            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">Temperature</label>
              <Input
                type="number"
                value={tempVal}
                onChange={(e) => setTempVal(e.target.value)}
                className="h-7 text-xs font-sans tabular-nums bg-white dark:bg-zinc-800"
              />
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">From</label>
              <select
                value={tempFrom}
                onChange={(e) => setTempFrom(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                {CONVERSION_CATEGORIES.temperature.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-zinc-600 dark:text-zinc-400 block font-medium">To</label>
              <select
                value={tempTo}
                onChange={(e) => setTempTo(e.target.value)}
                className="w-full h-7 text-xs rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 text-zinc-700 dark:text-zinc-300 font-sans"
              >
                {CONVERSION_CATEGORIES.temperature.units.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                ))}
              </select>
            </div>
          </div>

          {tempResult && (
            <div className="space-y-2">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 rounded border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-950 dark:text-blue-100 font-sans tabular-nums">
                  {tempResult.inputValue} {tempResult.fromUnit.symbol} = {formatNumberPrecision(tempResult.outputValue, 2)} {tempResult.toUnit.symbol}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {tempResult.formulaDescription}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-[10px] font-sans">
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Water Freezing</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">0°C / 32°F / 273.15K</span>
                </div>
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Room Temp</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">20°C / 68°F / 293.15K</span>
                </div>
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Human Body</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">37°C / 98.6°F / 310.15K</span>
                </div>
                <div className="p-1.5 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700">
                  <span className="text-zinc-400 block">Water Boiling</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">100°C / 212°F / 373.15K</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <SavedDrawer
          {...tempSaved}
          cardTitle="Temperature"
          formatSummary={(r) => `${r.inputValue} ${r.fromUnit.symbol} = ${formatNumberPrecision(r.outputValue, 2)} ${r.toUnit.symbol}`}
        />
      </CardWrapper>

      {/* ═══════════════════ REPORT MODAL TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-1">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-8 text-xs font-semibold gap-1.5 cursor-pointer"
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
