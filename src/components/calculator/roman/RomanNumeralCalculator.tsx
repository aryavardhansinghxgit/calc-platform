"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Copy,
  Check,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { CalculatorReportData } from "@/components/report/types";
import {
  arabicToRoman,
  romanToArabic,
  convertDateToRoman,
  calculateRomanArithmetic,
  RomanConversionResult,
  RomanDateResult,
  RomanArithmeticResult,
} from "@/lib/calculator-engine/formulas/roman";

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
    a.download = `roman_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
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

export function RomanNumeralCalculator() {
  // ─── CARD 1: UNIVERSAL CONVERTER ───
  const [inputVal, setInputVal] = useState<string>("LXIII");
  const [useVinculum, setUseVinculum] = useState<boolean>(true);
  const [card1Result, setCard1Result] = useState<RomanConversionResult | null>(null);
  const [card1Error, setCard1Error] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const card1Saved = useCardSaved<RomanConversionResult>("saved_roman_converter");

  // ─── CARD 2: ROMAN DATE CONVERTER ───
  const [selectedDate, setSelectedDate] = useState<string>("2026-08-17");
  const [dateSeparator, setDateSeparator] = useState<string>(" • ");
  const [dateResult, setDateResult] = useState<RomanDateResult | null>(null);
  const [dateSaveSuccess, setDateSaveSuccess] = useState(false);
  const dateSaved = useCardSaved<RomanDateResult>("saved_roman_date");

  // ─── CARD 3: ROMAN ARITHMETIC ───
  const [arithOp1, setArithOp1] = useState<string>("XLV");
  const [arithOp2, setArithOp2] = useState<string>("XVIII");
  const [arithOperator, setArithOperator] = useState<"+" | "-" | "×" | "÷">("+");
  const [arithResult, setArithResult] = useState<RomanArithmeticResult | null>(null);
  const [arithSaveSuccess, setArithSaveSuccess] = useState(false);
  const arithSaved = useCardSaved<RomanArithmeticResult>("saved_roman_arithmetic");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Conversion logic for Card 1
  const computeCard1 = useCallback(() => {
    const raw = inputVal.trim();
    if (!raw) {
      setCard1Result(null);
      setCard1Error(null);
      return;
    }

    if (/^\d+$/.test(raw)) {
      const num = parseInt(raw, 10);
      if (num < 1 || num > 3999999) {
        setCard1Error("Enter a number between 1 and 3,999,999.");
        setCard1Result(null);
        return;
      }
      setCard1Error(null);
      setCard1Result(arabicToRoman(num, useVinculum));
    } else {
      const parsed = romanToArabic(raw);
      if (!parsed.isValid) {
        setCard1Error(parsed.errorMessage || "Invalid Roman numeral format.");
        setCard1Result(null);
        return;
      }
      setCard1Error(null);
      setCard1Result(arabicToRoman(parsed.arabicNumber, useVinculum));
    }
  }, [inputVal, useVinculum]);

  // Conversion logic for Card 2
  const computeDate = useCallback(() => {
    if (!selectedDate) return;
    const parts = selectedDate.split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      setDateResult(convertDateToRoman(y, m, d, dateSeparator));
    }
  }, [selectedDate, dateSeparator]);

  // Conversion logic for Card 3
  const computeArithmetic = useCallback(() => {
    if (!arithOp1 || !arithOp2) return;
    const res = calculateRomanArithmetic(arithOp1, arithOp2, arithOperator);
    setArithResult(res);
  }, [arithOp1, arithOp2, arithOperator]);

  useEffect(() => {
    computeCard1();
  }, [computeCard1]);

  useEffect(() => {
    computeDate();
  }, [computeDate]);

  useEffect(() => {
    computeArithmetic();
  }, [computeArithmetic]);

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
        title: "Roman Numeral Conversion Analysis",
        items: [
          { label: "Arabic Integer Value", value: card1Result.arabicNumber.toLocaleString("en-US") },
          { label: "Roman Numeral (Unicode)", value: card1Result.romanUnicode },
          { label: "Roman Numeral (ASCII)", value: card1Result.romanAscii },
          { label: "Additive Place Expansion", value: card1Result.stepByStepFormula },
        ],
      });
    }

    if (dateResult) {
      sections.push({
        title: "Roman Numeral Date Formats",
        items: [
          { label: "Selected Date", value: selectedDate },
          { label: "MM • DD • YYYY Format", value: dateResult.formattedMDY },
          { label: "DD • MM • YYYY Format", value: dateResult.formattedDMY },
          { label: "YYYY • MM • DD Format", value: dateResult.formattedYMD },
        ],
      });
    }

    if (arithResult) {
      sections.push({
        title: "Roman Numeral Arithmetic Calculation",
        items: [
          { label: "Operand 1", value: `${arithResult.op1Roman} (${arithResult.op1Arabic})` },
          { label: "Operator", value: arithResult.operator },
          { label: "Operand 2", value: `${arithResult.op2Roman} (${arithResult.op2Arabic})` },
          { label: "Resulting Roman Numeral", value: `${arithResult.resultRoman} (${arithResult.resultArabic})` },
          { label: "Step Explanation", value: arithResult.stepsExplanation },
        ],
      });
    }

    return {
      meta: {
        calculatorName: "Roman Numeral Converter & Arithmetic Suite",
        reportTitle: "Classical Roman Numeral Metrology Sheet",
        generatedDate: new Date().toLocaleDateString(),
        generatedTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: [
        { label: "Roman Numeral", value: card1Result ? card1Result.romanUnicode : "—", highlight: true },
        { label: "Arabic Decimal", value: card1Result ? card1Result.arabicNumber.toLocaleString("en-US") : "—" },
        { label: "Date in Roman", value: dateResult ? dateResult.formattedMDY : "—" },
      ],
      sections,
    };
  }, [card1Result, dateResult, arithResult, selectedDate]);

  const baseSymbols = [
    { s: "I", val: 1 },
    { s: "V", val: 5 },
    { s: "X", val: 10 },
    { s: "L", val: 50 },
    { s: "C", val: 100 },
    { s: "D", val: 500 },
    { s: "M", val: 1000 },
  ];

  return (
    <div className="space-y-3">
      {/* ═══════════════════ CARD 1: UNIVERSAL ROMAN NUMERAL CONVERTER ═══════════════════ */}
      <CompactCardWrapper
        title="Roman Numeral Converter"
        hasResult={!!card1Result}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result) return;
          card1Saved.save(
            `${inputVal} ➔ ${card1Result.romanUnicode} (${card1Result.arabicNumber.toLocaleString("en-US")})`,
            card1Result
          );
          flashSave(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          {/* Direct Compact Input Row */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5">
            <div className="relative flex-1">
              <Input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value.toUpperCase())}
                placeholder="Enter Number (e.g. 2026) or Roman (e.g. LXIII)"
                className="h-7.5 text-xs font-bold font-mono tracking-wider bg-white dark:bg-zinc-800 uppercase pl-2 pr-14"
              />
              <span className="absolute right-2 top-1.5 text-[9px] text-zinc-400 font-sans pointer-events-none">
                Auto
              </span>
            </div>

            <Button
              onClick={computeCard1}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-7.5 px-3 cursor-pointer"
            >
              Convert
            </Button>
            <Button
              variant="outline"
              onClick={() => setInputVal("")}
              className="h-7.5 text-xs px-2 cursor-pointer"
            >
              Clear
            </Button>
          </div>

          {/* Inline Vinculum Toggle */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useVinculum}
                onChange={(e) => setUseVinculum(e.target.checked)}
                className="rounded text-blue-600 h-3.5 w-3.5 cursor-pointer"
              />
              <span>Vinculum Overlines (&ge;4,000)</span>
            </label>

            {/* Quick Roman Symbols Reference Strip */}
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {baseSymbols.map((item) => {
                const isActive = card1Result?.activeSymbols.includes(item.s);
                return (
                  <span
                    key={item.s}
                    className={`px-1 py-0.2 rounded ${
                      isActive
                        ? "bg-blue-600 text-white font-bold"
                        : "text-zinc-400 bg-zinc-100 dark:bg-zinc-800"
                    }`}
                    title={`${item.s} = ${item.val}`}
                  >
                    {item.s}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Error message */}
          {card1Error && (
            <div className="p-1.5 px-2 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded text-[11px] font-medium">
              {card1Error}
            </div>
          )}

          {/* Compact Primary Result Display */}
          {card1Result && (
            <div className="space-y-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-blue-50/70 dark:bg-blue-950/30 rounded border border-blue-200/60 dark:border-blue-800/60">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-blue-950 dark:text-blue-100 font-mono tracking-wider">
                    {card1Result.romanUnicode}
                  </span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-sans">
                    = {card1Result.arabicNumber.toLocaleString("en-US")}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(card1Result.romanUnicode, "rom_uni")}
                    className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
                  >
                    {copiedId === "rom_uni" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
                    {copiedId === "rom_uni" ? "Copied" : "Copy"}
                  </Button>
                </div>
              </div>

              {/* Compact Place Value Equation & Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-500">Expansion:</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300">{card1Result.stepByStepFormula}</span>
              </div>
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...card1Saved}
          cardTitle="Roman Converter"
          formatSummary={(r) => `${r.romanUnicode} = ${r.arabicNumber.toLocaleString("en-US")}`}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 2: ROMAN NUMERAL DATE CONVERTER ═══════════════════ */}
      <CompactCardWrapper
        title="Roman Numeral Date Converter"
        hasResult={!!dateResult}
        isSaved={dateSaveSuccess}
        savedCount={dateSaved.saved.length}
        onToggleSaved={() => dateSaved.setIsOpen(!dateSaved.isOpen)}
        onSave={() => {
          if (!dateResult) return;
          dateSaved.save(
            `${selectedDate} ➔ ${dateResult.formattedMDY}`,
            dateResult
          );
          flashSave(setDateSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
            <div className="sm:col-span-6 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-7 text-xs font-sans bg-white dark:bg-zinc-800"
              />
            </div>

            <div className="sm:col-span-6">
              <select
                value={dateSeparator}
                onChange={(e) => setDateSeparator(e.target.value)}
                className="w-full h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-700 dark:text-zinc-300"
              >
                <option value=" • ">Bullet ( • ) — VIII • XVII • MMXXVI</option>
                <option value="/">Slash ( / ) — VIII/XVII/MMXXVI</option>
                <option value="-">Hyphen ( - ) — VIII-XVII-MMXXVI</option>
                <option value=".">Dot ( . ) — VIII.XVII.MMXXVI</option>
                <option value=" ">Space (   ) — VIII XVII MMXXVI</option>
              </select>
            </div>
          </div>

          {dateResult && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
              {/* Format 1: MM/DD/YYYY */}
              <div className="p-1.5 px-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="truncate pr-1">
                  <span className="text-[9px] text-zinc-400 block">MM • DD • YYYY</span>
                  <span className="text-xs font-bold text-blue-900 dark:text-blue-200 font-mono">
                    {dateResult.formattedMDY}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(dateResult.formattedMDY, "date_mdy")}
                  className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Copy"
                >
                  {copiedId === "date_mdy" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* Format 2: DD/MM/YYYY */}
              <div className="p-1.5 px-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="truncate pr-1">
                  <span className="text-[9px] text-zinc-400 block">DD • MM • YYYY</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                    {dateResult.formattedDMY}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(dateResult.formattedDMY, "date_dmy")}
                  className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Copy"
                >
                  {copiedId === "date_dmy" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {/* Format 3: YYYY/MM/DD */}
              <div className="p-1.5 px-2 bg-slate-50 dark:bg-zinc-800/60 rounded border border-slate-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="truncate pr-1">
                  <span className="text-[9px] text-zinc-400 block">YYYY • MM • DD</span>
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 font-mono">
                    {dateResult.formattedYMD}
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard(dateResult.formattedYMD, "date_ymd")}
                  className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer"
                  title="Copy"
                >
                  {copiedId === "date_ymd" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...dateSaved}
          cardTitle="Roman Date"
          formatSummary={(r) => r.formattedMDY}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 3: ROMAN NUMERAL ARITHMETIC SOLVER ═══════════════════ */}
      <CompactCardWrapper
        title="Roman Numeral Calculator (Arithmetic)"
        hasResult={!!arithResult}
        isSaved={arithSaveSuccess}
        savedCount={arithSaved.saved.length}
        onToggleSaved={() => arithSaved.setIsOpen(!arithSaved.isOpen)}
        onSave={() => {
          if (!arithResult) return;
          arithSaved.save(
            `${arithResult.op1Roman} ${arithResult.operator} ${arithResult.op2Roman} = ${arithResult.resultRoman}`,
            arithResult
          );
          flashSave(setArithSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5">
            {/* Op 1 */}
            <Input
              type="text"
              value={arithOp1}
              onChange={(e) => setArithOp1(e.target.value.toUpperCase())}
              placeholder="e.g. XLV"
              className="h-7 text-xs font-mono font-bold uppercase bg-white dark:bg-zinc-800 flex-1 min-w-[70px]"
            />

            {/* Operator Buttons */}
            <div className="inline-flex rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-0.5 gap-0.5">
              {(["+", "-", "×", "÷"] as const).map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => setArithOperator(op)}
                  className={`w-6 h-5.5 rounded text-xs font-bold transition-all cursor-pointer ${
                    arithOperator === op
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Op 2 */}
            <Input
              type="text"
              value={arithOp2}
              onChange={(e) => setArithOp2(e.target.value.toUpperCase())}
              placeholder="e.g. XVIII"
              className="h-7 text-xs font-mono font-bold uppercase bg-white dark:bg-zinc-800 flex-1 min-w-[70px]"
            />

            <Button
              onClick={computeArithmetic}
              className="h-7 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
            >
              =
            </Button>
          </div>

          {arithResult && (
            <div className="flex items-center justify-between p-1.5 px-2 bg-blue-50/70 dark:bg-blue-950/30 rounded border border-blue-200/60 dark:border-blue-800/60">
              <div className="truncate">
                <span className="font-mono font-black text-sm text-blue-950 dark:text-blue-100">
                  {arithResult.op1Roman} {arithResult.operator} {arithResult.op2Roman} = {arithResult.resultRoman}
                </span>
                <span className="text-[11px] text-zinc-500 font-sans ml-1.5">
                  ({arithResult.resultArabic})
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  {arithResult.stepsExplanation}
                </span>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  copyToClipboard(
                    `${arithResult.op1Roman} ${arithResult.operator} ${arithResult.op2Roman} = ${arithResult.resultRoman} (${arithResult.resultArabic})`,
                    "arith_res"
                  )
                }
                className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer"
              >
                {copiedId === "arith_res" ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5 text-zinc-400" />}
                {copiedId === "arith_res" ? "Copied" : "Copy"}
              </Button>
            </div>
          )}
        </div>

        <CompactSavedDrawer
          {...arithSaved}
          cardTitle="Arithmetic"
          formatSummary={(r) => `${r.op1Roman} ${r.operator} ${r.op2Roman} = ${r.resultRoman}`}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ REPORT TRIGGER ═══════════════════ */}
      <div className="flex items-center justify-end pt-0.5">
        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-7 text-[11px] font-semibold gap-1 cursor-pointer"
        >
          <FileSpreadsheet className="h-3 w-3 text-blue-500" /> Generate Metrology Sheet
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
