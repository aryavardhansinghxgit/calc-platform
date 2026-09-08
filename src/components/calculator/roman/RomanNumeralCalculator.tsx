"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Download,
  Trash2,
  Copy,
  Check,
  Calendar,
  FileSpreadsheet,
  FileText,
  Printer,
  RotateCcw,
  Code,
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

// ─── Local Storage Persistence Hook with Full Raw State Restore ─────────────

interface SavedRecord<T, R> {
  id: string;
  timestamp: string;
  inputSummary: string;
  rawState: R;
  result: T;
  notes: string;
}

function flashNotification(setter: React.Dispatch<React.SetStateAction<boolean>>) {
  setter(true);
  setTimeout(() => setter(false), 1500);
}

function useCardSaved<T, R>(storageKey: string) {
  const [saved, setSaved] = useState<SavedRecord<T, R>[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setSaved(JSON.parse(raw));
    } catch {}
  }, [storageKey]);

  const save = useCallback(
    (inputSummary: string, rawState: R, result: T, notes = "") => {
      const entry: SavedRecord<T, R> = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        inputSummary,
        rawState,
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
    <div className="border border-blue-600/30 dark:border-blue-500/30 rounded-lg overflow-hidden bg-white dark:bg-zinc-900 transition-all shadow-xs print:border-none print:shadow-none">
      <div className="bg-blue-600 text-white px-3 py-1 flex items-center justify-between no-print">
        <h3 className="font-bold text-[11px] tracking-wide text-white">{title}</h3>
        {hasResult && onSave && (
          <div className="flex items-center gap-1.5">
            {savedCount !== undefined && savedCount > 0 && onToggleSaved && (
              <button
                type="button"
                onClick={onToggleSaved}
                className="text-[9px] bg-white/20 hover:bg-white/30 text-white font-bold px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                title="View saved calculations"
              >
                {savedCount} saved
              </button>
            )}
            <button
              type="button"
              onClick={onSave}
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded cursor-pointer transition-all ${
                isSaved ? "bg-emerald-500 text-white" : "bg-white text-blue-700 hover:bg-blue-50"
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

function CompactSavedDrawer<T, R>({
  saved,
  isOpen,
  remove,
  clear,
  cardTitle,
  formatSummary,
  onRestore,
}: {
  saved: SavedRecord<T, R>[];
  isOpen: boolean;
  remove: (id: string) => void;
  clear: () => void;
  cardTitle: string;
  formatSummary: (result: T) => string;
  onRestore: (raw: R) => void;
}) {
  if (!isOpen || saved.length === 0) return null;

  const exportCsv = () => {
    const rows = [
      ["Timestamp", "Input Summary", "Calculated Result"],
      ...saved.map((e) => [e.timestamp, e.inputSummary, formatSummary(e.result)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roman_${cardTitle.toLowerCase().replace(/\s+/g, "_")}_history.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-2 p-2 bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-200 dark:border-zinc-800 space-y-1.5 text-xs no-print">
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
            Clear All
          </button>
        </div>
      </div>
      <div className="space-y-1 max-h-36 overflow-y-auto">
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
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onRestore(item.rawState)}
                className="text-[9px] bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-semibold px-1.5 py-0.5 rounded cursor-pointer flex items-center gap-0.5"
                title="Restore this calculation"
              >
                <RotateCcw className="w-2.5 h-2.5" /> Restore
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-zinc-400 hover:text-red-500 p-0.5 cursor-pointer"
                title="Delete"
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

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export function RomanNumeralCalculator() {
  // ─── CARD 1: UNIVERSAL CONVERTER ───
  const [inputVal, setInputVal] = useState<string>("LXIII");
  const [useVinculum, setUseVinculum] = useState<boolean>(true);
  const [card1Result, setCard1Result] = useState<RomanConversionResult | null>(null);
  const [card1Error, setCard1Error] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [card1SaveSuccess, setCard1SaveSuccess] = useState(false);
  const [card1RestoreSuccess, setCard1RestoreSuccess] = useState(false);

  const card1Saved = useCardSaved<RomanConversionResult, { input: string; vinculum: boolean }>(
    "saved_roman_converter"
  );

  // ─── CARD 2: ROMAN DATE CONVERTER ───
  const [selectedDate, setSelectedDate] = useState<string>("2026-08-17");
  const [dateSeparator, setDateSeparator] = useState<string>(" • ");
  const [dateResult, setDateResult] = useState<RomanDateResult | null>(null);
  const [dateSaveSuccess, setDateSaveSuccess] = useState(false);
  const [dateRestoreSuccess, setDateRestoreSuccess] = useState(false);

  const dateSaved = useCardSaved<RomanDateResult, { date: string; separator: string }>(
    "saved_roman_date"
  );

  // ─── CARD 3: ROMAN ARITHMETIC ───
  const [arithOp1, setArithOp1] = useState<string>("XLV");
  const [arithOp2, setArithOp2] = useState<string>("XVIII");
  const [arithOperator, setArithOperator] = useState<"+" | "-" | "×" | "÷">("+");
  const [arithResult, setArithResult] = useState<RomanArithmeticResult | null>(null);
  const [arithSaveSuccess, setArithSaveSuccess] = useState(false);
  const [arithRestoreSuccess, setArithRestoreSuccess] = useState(false);

  const arithSaved = useCardSaved<
    RomanArithmeticResult,
    { op1: string; op2: string; operator: "+" | "-" | "×" | "÷" }
  >("saved_roman_arithmetic");

  // ─── GLOBAL REPORT MODAL ───
  const [isReportOpen, setIsReportOpen] = useState(false);

  // Conversion logic for Card 1 (Decoupled)
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
        setCard1Error("Enter an integer between 1 and 3,999,999.");
        setCard1Result(null);
        return;
      }
      const res = arabicToRoman(num, useVinculum);
      if (!res.isValid) {
        setCard1Error(res.errorMessage || "Invalid number format.");
        setCard1Result(null);
      } else {
        setCard1Error(null);
        setCard1Result(res);
      }
    } else {
      const parsed = romanToArabic(raw);
      if (!parsed.isValid) {
        setCard1Error(parsed.errorMessage || "Invalid Roman numeral format.");
        setCard1Result(null);
        return;
      }
      const canon = arabicToRoman(parsed.arabicNumber, useVinculum);
      setCard1Error(null);
      setCard1Result(canon);
    }
  }, [inputVal, useVinculum]);

  // Conversion logic for Card 2 (Decoupled)
  const computeDate = useCallback(() => {
    if (!selectedDate) {
      setDateResult(null);
      return;
    }
    const parts = selectedDate.split("-");
    if (parts.length === 3) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      const res = convertDateToRoman(y, m, d, dateSeparator);
      setDateResult(res);
    }
  }, [selectedDate, dateSeparator]);

  // Conversion logic for Card 3 (Decoupled)
  const computeArithmetic = useCallback(() => {
    if (!arithOp1 || !arithOp2) {
      setArithResult(null);
      return;
    }
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

  // Restore Handlers
  const handleRestoreCard1 = (raw: { input: string; vinculum: boolean }) => {
    setInputVal(raw.input);
    setUseVinculum(raw.vinculum);
    flashNotification(setCard1RestoreSuccess);
  };

  const handleRestoreDate = (raw: { date: string; separator: string }) => {
    setSelectedDate(raw.date);
    setDateSeparator(raw.separator);
    flashNotification(setDateRestoreSuccess);
  };

  const handleRestoreArith = (raw: { op1: string; op2: string; operator: "+" | "-" | "×" | "÷" }) => {
    setArithOp1(raw.op1);
    setArithOp2(raw.op2);
    setArithOperator(raw.operator);
    flashNotification(setArithRestoreSuccess);
  };

  // Summary Text
  const summaryText = useMemo(() => {
    const lines = [
      "=== ROMAN NUMERAL CALCULATION SUMMARY ===",
      `Timestamp: ${new Date().toLocaleString()}`,
      "",
    ];
    if (card1Result && card1Result.isValid) {
      lines.push("1. ROMAN NUMERAL CONVERTER");
      lines.push(`Input: ${inputVal}`);
      lines.push(`Arabic Decimal: ${card1Result.arabicNumber.toLocaleString("en-US")}`);
      lines.push(`Roman Numeral: ${card1Result.romanUnicode}`);
      lines.push(`Expansion: ${card1Result.stepByStepFormula}`);
      lines.push("");
    }
    if (dateResult && dateResult.isValid) {
      lines.push("2. ROMAN DATE CONVERTER");
      lines.push(`Calendar Date: ${selectedDate}`);
      lines.push(`MM • DD • YYYY: ${dateResult.formattedMDY}`);
      lines.push(`DD • MM • YYYY: ${dateResult.formattedDMY}`);
      lines.push(`YYYY • MM • DD: ${dateResult.formattedYMD}`);
      lines.push("");
    }
    if (arithResult && arithResult.isValid) {
      lines.push("3. ROMAN ARITHMETIC");
      lines.push(`Operation: ${arithResult.op1Roman} ${arithResult.operator} ${arithResult.op2Roman}`);
      lines.push(`Result: ${arithResult.resultRoman} (${arithResult.resultArabic})`);
      lines.push(`Steps: ${arithResult.stepsExplanation}`);
      lines.push("");
    }
    return lines.join("\n");
  }, [card1Result, inputVal, dateResult, selectedDate, arithResult]);

  // LaTeX export string
  const latexText = useMemo(() => {
    const lines: string[] = [];
    if (card1Result && card1Result.isValid) {
      lines.push(`\\text{${card1Result.romanAscii}} = ${card1Result.arabicNumber}`);
    }
    if (dateResult && dateResult.isValid) {
      lines.push(`\\text{${dateResult.monthRoman}} \\cdot \\text{${dateResult.dayRoman}} \\cdot \\text{${dateResult.yearRoman}}`);
    }
    if (arithResult && arithResult.isValid) {
      const opSym = arithResult.operator === "×" ? "\\times" : arithResult.operator === "÷" ? "\\div" : arithResult.operator;
      lines.push(`\\text{${arithResult.op1Roman}} ${opSym} \\text{${arithResult.op2Roman}} = \\text{${arithResult.resultRoman}} \\quad (${arithResult.resultArabic})`);
    }
    return lines.join("\n\n");
  }, [card1Result, dateResult, arithResult]);

  // Download CSV Export
  const downloadCsv = () => {
    const rows = [
      ["Module", "Input Description", "Decimal Value", "Roman Value", "Details", "Timestamp"],
    ];
    const ts = new Date().toISOString();
    if (card1Result && card1Result.isValid) {
      rows.push(["Converter", inputVal, card1Result.arabicNumber.toString(), card1Result.romanUnicode, card1Result.stepByStepFormula, ts]);
    }
    if (dateResult && dateResult.isValid) {
      rows.push(["Date", selectedDate, selectedDate, dateResult.formattedMDY, dateResult.formattedDMY, ts]);
    }
    if (arithResult && arithResult.isValid) {
      rows.push(["Arithmetic", `${arithResult.op1Roman} ${arithResult.operator} ${arithResult.op2Roman}`, arithResult.resultArabic.toString(), arithResult.resultRoman, arithResult.stepsExplanation, ts]);
    }
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roman_numeral_suite_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download TXT Export
  const downloadTxt = () => {
    const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roman_numeral_summary_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print PDF Trigger
  const handlePrint = () => {
    window.print();
  };

  // Report Data for Metrology Sheet
  const reportData: CalculatorReportData = useMemo(() => {
    const sections = [];

    if (card1Result && card1Result.isValid) {
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

    if (dateResult && dateResult.isValid) {
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

    if (arithResult && arithResult.isValid) {
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
        { label: "Roman Numeral", value: card1Result && card1Result.isValid ? card1Result.romanUnicode : "—", highlight: true },
        { label: "Arabic Decimal", value: card1Result && card1Result.isValid ? card1Result.arabicNumber.toLocaleString("en-US") : "—" },
        { label: "Date in Roman", value: dateResult && dateResult.isValid ? dateResult.formattedMDY : "—" },
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
        hasResult={!!card1Result && card1Result.isValid}
        isSaved={card1SaveSuccess}
        savedCount={card1Saved.saved.length}
        onToggleSaved={() => card1Saved.setIsOpen(!card1Saved.isOpen)}
        onSave={() => {
          if (!card1Result || !card1Result.isValid) return;
          card1Saved.save(
            `${inputVal} ➔ ${card1Result.romanUnicode} (${card1Result.arabicNumber.toLocaleString("en-US")})`,
            { input: inputVal, vinculum: useVinculum },
            card1Result
          );
          flashNotification(setCard1SaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          {/* Direct Compact Input Row */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 no-print">
            <div className="relative flex-1">
              <label htmlFor="roman-converter-input" className="sr-only">
                Enter Number or Roman Numeral
              </label>
              <Input
                id="roman-converter-input"
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
          <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-0.5 no-print">
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

          {card1RestoreSuccess && (
            <div className="p-1 px-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded text-[10px] font-semibold">
              Calculation restored from saved history!
            </div>
          )}

          {/* Error message */}
          {card1Error && (
            <div
              role="alert"
              className="p-1.5 px-2 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded text-[11px] font-medium"
            >
              {card1Error}
            </div>
          )}

          {/* Compact Primary Result Display */}
          {card1Result && card1Result.isValid && (
            <div className="space-y-1.5 pt-1.5 border-t border-zinc-100 dark:border-zinc-800" aria-live="polite">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-blue-50/70 dark:bg-blue-950/30 rounded border border-blue-200/60 dark:border-blue-800/60">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-blue-950 dark:text-blue-100 font-mono tracking-wider">
                    {card1Result.romanUnicode}
                  </span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-sans">
                    = {card1Result.arabicNumber.toLocaleString("en-US")}
                  </span>
                </div>

                <div className="flex items-center gap-1 no-print">
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

              {/* Compact Place Value Equation */}
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
          onRestore={handleRestoreCard1}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 2: ROMAN NUMERAL DATE CONVERTER ═══════════════════ */}
      <CompactCardWrapper
        title="Roman Numeral Date Converter"
        hasResult={!!dateResult && dateResult.isValid}
        isSaved={dateSaveSuccess}
        savedCount={dateSaved.saved.length}
        onToggleSaved={() => dateSaved.setIsOpen(!dateSaved.isOpen)}
        onSave={() => {
          if (!dateResult || !dateResult.isValid) return;
          dateSaved.save(
            `${selectedDate} ➔ ${dateResult.formattedMDY}`,
            { date: selectedDate, separator: dateSeparator },
            dateResult
          );
          flashNotification(setDateSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center no-print">
            <div className="sm:col-span-6 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <label htmlFor="roman-date-input" className="sr-only">
                Calendar Date Input
              </label>
              <Input
                id="roman-date-input"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-7 text-xs font-sans bg-white dark:bg-zinc-800"
              />
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="roman-date-separator" className="sr-only">
                Date Separator Style
              </label>
              <select
                id="roman-date-separator"
                value={dateSeparator}
                onChange={(e) => setDateSeparator(e.target.value)}
                className="w-full h-7 text-[11px] rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2 font-sans text-zinc-700 dark:text-zinc-300 cursor-pointer"
              >
                <option value=" • ">Bullet ( • ) — VIII • XVII • MMXXVI</option>
                <option value="/">Slash ( / ) — VIII/XVII/MMXXVI</option>
                <option value="-">Hyphen ( - ) — VIII-XVII-MMXXVI</option>
                <option value=".">Dot ( . ) — VIII.XVII.MMXXVI</option>
                <option value=" ">Space (   ) — VIII XVII MMXXVI</option>
              </select>
            </div>
          </div>

          {dateRestoreSuccess && (
            <div className="p-1 px-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded text-[10px] font-semibold">
              Date restored from saved history!
            </div>
          )}

          {/* Date Error Display */}
          {dateResult && !dateResult.isValid && (
            <div
              role="alert"
              className="p-1.5 px-2 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded text-[11px] font-medium"
            >
              {dateResult.errorMessage}
            </div>
          )}

          {dateResult && dateResult.isValid && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1" aria-live="polite">
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
                  className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer no-print"
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
                  className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer no-print"
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
                  className="text-zinc-400 hover:text-blue-600 p-0.5 cursor-pointer no-print"
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
          onRestore={handleRestoreDate}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ CARD 3: ROMAN NUMERAL ARITHMETIC SOLVER ═══════════════════ */}
      <CompactCardWrapper
        title="Roman Numeral Calculator (Arithmetic)"
        hasResult={!!arithResult && arithResult.isValid}
        isSaved={arithSaveSuccess}
        savedCount={arithSaved.saved.length}
        onToggleSaved={() => arithSaved.setIsOpen(!arithSaved.isOpen)}
        onSave={() => {
          if (!arithResult || !arithResult.isValid) return;
          arithSaved.save(
            `${arithResult.op1Roman} ${arithResult.operator} ${arithResult.op2Roman} = ${arithResult.resultRoman}`,
            { op1: arithOp1, op2: arithOp2, operator: arithOperator },
            arithResult
          );
          flashNotification(setArithSaveSuccess);
        }}
      >
        <div className="space-y-2 text-xs">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 no-print">
            {/* Op 1 */}
            <label htmlFor="arith-op1" className="sr-only">First Roman Operand</label>
            <Input
              id="arith-op1"
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
                  aria-label={`Select ${op} operator`}
                >
                  {op}
                </button>
              ))}
            </div>

            {/* Op 2 */}
            <label htmlFor="arith-op2" className="sr-only">Second Roman Operand</label>
            <Input
              id="arith-op2"
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

          {arithRestoreSuccess && (
            <div className="p-1 px-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded text-[10px] font-semibold">
              Arithmetic calculation restored from saved history!
            </div>
          )}

          {/* Arithmetic Error Display */}
          {arithResult && !arithResult.isValid && (
            <div
              role="alert"
              className="p-1.5 px-2 bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 rounded text-[11px] font-medium"
            >
              {arithResult.errorMessage}
            </div>
          )}

          {arithResult && arithResult.isValid && (
            <div
              className="flex items-center justify-between p-1.5 px-2 bg-blue-50/70 dark:bg-blue-950/30 rounded border border-blue-200/60 dark:border-blue-800/60"
              aria-live="polite"
            >
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
                className="h-6 text-[10px] px-2 gap-1 bg-white dark:bg-zinc-800 cursor-pointer no-print"
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
          onRestore={handleRestoreArith}
        />
      </CompactCardWrapper>

      {/* ═══════════════════ EXPORT & METROLOGY TOOLBAR ═══════════════════ */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-zinc-800/40 rounded-lg border border-slate-200 dark:border-zinc-800 text-xs no-print">
        <div className="flex flex-wrap items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(summaryText, "export_sum")}
            className="h-7 text-[11px] font-medium gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            {copiedId === "export_sum" ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-zinc-500" />}
            {copiedId === "export_sum" ? "Copied" : "Copy Summary"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(latexText, "export_latex")}
            className="h-7 text-[11px] font-medium gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            {copiedId === "export_latex" ? <Check className="h-3 w-3 text-emerald-500" /> : <Code className="h-3 w-3 text-zinc-500" />}
            {copiedId === "export_latex" ? "Copied LaTeX" : "LaTeX"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={downloadCsv}
            className="h-7 text-[11px] font-medium gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <Download className="h-3 w-3 text-zinc-500" /> CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={downloadTxt}
            className="h-7 text-[11px] font-medium gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <FileText className="h-3 w-3 text-zinc-500" /> TXT
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="h-7 text-[11px] font-medium gap-1 cursor-pointer bg-white dark:bg-zinc-800"
          >
            <Printer className="h-3 w-3 text-zinc-500" /> Print
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsReportOpen(true)}
          className="h-7 text-[11px] font-semibold gap-1 cursor-pointer bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100"
        >
          <FileSpreadsheet className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Generate Metrology Sheet
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
