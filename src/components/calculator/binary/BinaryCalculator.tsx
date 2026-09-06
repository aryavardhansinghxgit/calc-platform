"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Copy,
  Check,
  ArrowRightLeft,
  Bookmark,
  Trash2,
  HelpCircle,
  Download,
  FileText,
  RotateCcw,
} from "lucide-react";
import {
  Operation,
  BitWidth,
  RepMode,
  executeBinaryOperation,
  executeBaseConversion,
  formatBinaryLatex,
} from "@/app/calculators/binary-calculator/binary-logic";
import { BitVisualizer } from "./BitVisualizer";

export interface SavedBinaryItem {
  id: string;
  module: "arithmetic" | "conversion";
  title: string;
  rawInputs: {
    inputA?: string;
    inputB?: string;
    operation?: Operation;
    bitWidth?: BitWidth;
    repMode?: RepMode;
    shiftAmount?: number;
    inputAMode?: "bin" | "dec";
    inputBMode?: "bin" | "dec";
    sourceValue?: string;
    sourceBase?: number;
    targetBase?: number;
  };
  result?: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function BinaryCalculator() {
  // Card 1 State (Arithmetic & Bitwise)
  const [inputA, setInputA] = useState<string>("10101010");
  const [inputB, setInputB] = useState<string>("00001111");
  const [operation, setOperation] = useState<Operation>("+");
  const [bitWidth, setBitWidth] = useState<BitWidth>(8);
  const [repMode, setRepMode] = useState<RepMode>("unsigned");
  const [shiftAmount, setShiftAmount] = useState<number>(1);
  const [inputAMode, setInputAMode] = useState<"bin" | "dec">("bin");
  const [inputBMode, setInputBMode] = useState<"bin" | "dec">("bin");

  // Card 2 State (Arbitrary Multi-Base Conversion)
  const [baseInput, setBaseInput] = useState<string>("255");
  const [sourceBase, setSourceBase] = useState<number>(10);
  const [targetBase, setTargetBase] = useState<number>(2);

  // Persistence State
  const [savedBinaryItems, setSavedBinaryItems] = useState<SavedBinaryItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [savedDecItems, setSavedDecItems] = useState<SavedBinaryItem[]>([]);
  const [justSavedDec, setJustSavedDec] = useState<boolean>(false);

  // Copy Feedback State
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedBin = localStorage.getItem("saved_binary_calculations_v2");
      if (storedBin) setSavedBinaryItems(JSON.parse(storedBin));

      const storedDec = localStorage.getItem("saved_dec_conversions_v2");
      if (storedDec) setSavedDecItems(JSON.parse(storedDec));
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const triggerCopyFeedback = (label: string) => {
    setCopiedAction(label);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      triggerCopyFeedback(label);
    } catch {
      // Fallback
    }
  };

  // Card 1 Calculation Memo
  const calculation = useMemo(() => {
    return executeBinaryOperation(
      inputA,
      inputB,
      operation,
      bitWidth,
      repMode,
      shiftAmount,
      inputAMode,
      inputBMode
    );
  }, [inputA, inputB, operation, bitWidth, repMode, shiftAmount, inputAMode, inputBMode]);

  // Card 2 Base Conversion Memo (Completely decoupled from bitWidth)
  const baseConversionResult = useMemo(() => {
    return executeBaseConversion(baseInput, sourceBase, targetBase);
  }, [baseInput, sourceBase, targetBase]);

  // Card 1 Save Handler
  const handleSaveResult = () => {
    if (calculation.error || !calculation.multiBaseRes) return;

    let inputsSummary = `A: ${inputA}, B: ${inputB} (${bitWidth}-Bit)`;
    let opSummary = `Operation: ${operation} (${repMode})`;
    if (operation === "NOT") {
      inputsSummary = `A: ${inputA} (${bitWidth}-Bit)`;
      opSummary = `Bitwise NOT (~) (${repMode})`;
    } else if (operation === "<<" || operation === ">>") {
      inputsSummary = `A: ${inputA}, Shift: ${shiftAmount} (${bitWidth}-Bit)`;
      opSummary = `Shift ${operation} (${repMode})`;
    }

    const resList = [
      `Binary (Base-2) = ${calculation.multiBaseRes.binGrouped}`,
      `Decimal (Base-10) = ${calculation.multiBaseRes.decStr}`,
      `Hexadecimal (Base-16) = 0x${calculation.multiBaseRes.hexRaw}`,
      `Octal (Base-8) = 0o${calculation.multiBaseRes.octRaw}`,
      `ASCII Character = ${calculation.multiBaseRes.asciiChar}`,
      `Mathematical Result = ${calculation.mathResultVal.toString()}`,
      `Register Result = ${calculation.multiBaseRes.binRaw}`,
      `Overflow = ${calculation.isOverflow ? "YES" : "NO"}`,
      `Carry Out = ${calculation.carryOut ? "1" : "0"}`,
    ];
    if (calculation.remainderMultiBase) {
      resList.push(
        `Remainder = ${calculation.remainderMultiBase.binGrouped} (Dec: ${calculation.remainderMultiBase.decStr})`
      );
    }

    const newItem: SavedBinaryItem = {
      id: Date.now().toString(),
      module: "arithmetic",
      title: `${bitWidth}-Bit ${operation} Calculation`,
      rawInputs: {
        inputA,
        inputB,
        operation,
        bitWidth,
        repMode,
        shiftAmount,
        inputAMode,
        inputBMode,
      },
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${inputA} ${operation} ${operation === "NOT" ? "" : inputB}`,
      timestamp: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newItem, ...savedBinaryItems.filter((i) => i.id !== newItem.id)].slice(0, 20);
    setSavedBinaryItems(updated);
    try {
      localStorage.setItem("saved_binary_calculations_v2", JSON.stringify(updated));
    } catch {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Restore Card 1
  const handleRestoreBinary = (item: SavedBinaryItem) => {
    if (item.rawInputs) {
      if (item.rawInputs.inputA !== undefined) setInputA(item.rawInputs.inputA);
      if (item.rawInputs.inputB !== undefined) setInputB(item.rawInputs.inputB);
      if (item.rawInputs.operation !== undefined) setOperation(item.rawInputs.operation);
      if (item.rawInputs.bitWidth !== undefined) setBitWidth(item.rawInputs.bitWidth);
      if (item.rawInputs.repMode !== undefined) setRepMode(item.rawInputs.repMode);
      if (item.rawInputs.shiftAmount !== undefined) setShiftAmount(item.rawInputs.shiftAmount);
      if (item.rawInputs.inputAMode !== undefined) setInputAMode(item.rawInputs.inputAMode);
      if (item.rawInputs.inputBMode !== undefined) setInputBMode(item.rawInputs.inputBMode);
    }
  };

  const handleDeleteSavedBinary = (id: string) => {
    const updated = savedBinaryItems.filter((item) => item.id !== id);
    setSavedBinaryItems(updated);
    try {
      localStorage.setItem("saved_binary_calculations_v2", JSON.stringify(updated));
    } catch {}
  };

  const handleClearAllSavedBinary = () => {
    setSavedBinaryItems([]);
    try {
      localStorage.removeItem("saved_binary_calculations_v2");
    } catch {}
  };

  // Card 2 Save Handler
  const handleSaveDecConversion = () => {
    if (!baseConversionResult || baseConversionResult.error) return;

    const resList = [
      `Target Base-${targetBase} = ${baseConversionResult.targetResult}`,
      `Binary (Base-2) = ${baseConversionResult.binResult}`,
      `Decimal (Base-10) = ${baseConversionResult.decResult}`,
      `Hexadecimal (Base-16) = ${baseConversionResult.hexResult}`,
      `Octal (Base-8) = ${baseConversionResult.octResult}`,
    ];

    const newItem: SavedBinaryItem = {
      id: Date.now().toString(),
      module: "conversion",
      title: `Base Conversion (Base-${sourceBase} → Base-${targetBase})`,
      rawInputs: {
        sourceValue: baseInput,
        sourceBase,
        targetBase,
      },
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${baseInput} (Base-${sourceBase}) → Base-${targetBase}`,
      timestamp: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = [newItem, ...savedDecItems.filter((i) => i.id !== newItem.id)].slice(0, 20);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_dec_conversions_v2", JSON.stringify(updated));
    } catch {}

    setJustSavedDec(true);
    setTimeout(() => setJustSavedDec(false), 2000);
  };

  // Restore Card 2
  const handleRestoreDec = (item: SavedBinaryItem) => {
    if (item.rawInputs) {
      if (item.rawInputs.sourceValue !== undefined) setBaseInput(item.rawInputs.sourceValue);
      if (item.rawInputs.sourceBase !== undefined) setSourceBase(item.rawInputs.sourceBase);
      if (item.rawInputs.targetBase !== undefined) setTargetBase(item.rawInputs.targetBase);
    }
  };

  const handleDeleteSavedDec = (id: string) => {
    const updated = savedDecItems.filter((item) => item.id !== id);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_dec_conversions_v2", JSON.stringify(updated));
    } catch {}
  };

  const handleClearAllSavedDec = () => {
    setSavedDecItems([]);
    try {
      localStorage.removeItem("saved_dec_conversions_v2");
    } catch {}
  };

  // Copy Result Text
  const handleCopyResult = () => {
    if (calculation.error || !calculation.multiBaseRes) return;
    const text = [
      `=== Binary Calculation Result ===`,
      `Input A: ${inputA} (${inputAMode})`,
      operation !== "NOT" ? `Input B: ${inputB} (${inputBMode})` : null,
      `Operation: ${operation}`,
      `Register Width: ${bitWidth}-Bit`,
      `Representation: ${repMode === "twos" ? "Signed 2's Complement" : "Unsigned"}`,
      `Binary Result: ${calculation.multiBaseRes.binGrouped}`,
      `Decimal Result: ${calculation.multiBaseRes.decStr}`,
      `Hex Result: 0x${calculation.multiBaseRes.hexRaw}`,
      `Octal Result: 0o${calculation.multiBaseRes.octRaw}`,
      `ASCII Result: ${calculation.multiBaseRes.asciiChar}`,
      `Mathematical Result: ${calculation.mathResultVal.toString()}`,
      `Overflow: ${calculation.isOverflow ? "YES" : "NO"}`,
      `Carry-Out: ${calculation.carryOut ? "1" : "0"}`,
    ]
      .filter(Boolean)
      .join("\n");

    copyToClipboard(text, "copy-result");
  };

  // Copy Summary
  const handleCopySummary = () => {
    if (calculation.error || !calculation.multiBaseRes) return;
    const summary = `${inputA} ${operation} ${operation === "NOT" ? "" : inputB} = ${
      calculation.multiBaseRes.binRaw
    } (${calculation.multiBaseRes.decStr}) [${bitWidth}-Bit ${repMode}]`;
    copyToClipboard(summary, "copy-summary");
  };

  // Copy LaTeX
  const handleCopyLatex = () => {
    if (calculation.error || !calculation.multiBaseRes) return;
    const latex = formatBinaryLatex(
      calculation.multiBaseA.binRaw,
      calculation.multiBaseB.binRaw,
      operation,
      calculation.multiBaseRes.binRaw,
      calculation.multiBaseRes.decStr
    );
    copyToClipboard(latex, "copy-latex");
  };

  // Export CSV
  const handleExportCSV = () => {
    if (calculation.error || !calculation.multiBaseRes) return;

    const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const headers = [
      "Module",
      "Input A",
      "Input B",
      "Operation",
      "Bit Width",
      "Representation",
      "Binary Result",
      "Decimal Result",
      "Hex Result",
      "Octal Result",
      "ASCII Result",
      "Mathematical Result",
      "Overflow",
      "Carry Out",
      "Timestamp",
    ];

    const row = [
      escapeCsv("Binary Arithmetic"),
      escapeCsv(inputA),
      escapeCsv(operation === "NOT" ? "N/A" : inputB),
      escapeCsv(operation),
      escapeCsv(`${bitWidth}-bit`),
      escapeCsv(repMode),
      escapeCsv(calculation.multiBaseRes.binRaw),
      escapeCsv(calculation.multiBaseRes.decStr),
      escapeCsv(`0x${calculation.multiBaseRes.hexRaw}`),
      escapeCsv(`0o${calculation.multiBaseRes.octRaw}`),
      escapeCsv(calculation.multiBaseRes.asciiChar),
      escapeCsv(calculation.mathResultVal.toString()),
      escapeCsv(calculation.isOverflow ? "YES" : "NO"),
      escapeCsv(calculation.carryOut ? "1" : "0"),
      escapeCsv(new Date().toISOString()),
    ];

    const csvContent = `${headers.join(",")}\n${row.join(",")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `binary_calculation_${bitWidth}bit_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download TXT
  const handleDownloadTXT = () => {
    if (calculation.error || !calculation.multiBaseRes) return;

    const report = [
      "============================================================",
      "ADVANCED BINARY ARITHMETIC & COMPUTER ARCHITECTURE REPORT",
      "============================================================",
      `Generated: ${new Date().toLocaleString()}`,
      `Register Width: ${bitWidth}-Bit`,
      `Representation Mode: ${repMode === "twos" ? "Signed 2's Complement" : "Unsigned Binary"}`,
      `Operation: ${operation}`,
      "",
      "--- OPERANDS ---",
      `Input A (Raw): ${inputA} (${inputAMode})`,
      `Input A (Binary): ${calculation.multiBaseA.binRaw} (Dec: ${calculation.multiBaseA.decStr})`,
      operation !== "NOT"
        ? `Input B (Raw): ${inputB} (${inputBMode})\nInput B (Binary): ${calculation.multiBaseB.binRaw} (Dec: ${calculation.multiBaseB.decStr})`
        : "Input B: N/A (Unary NOT operation)",
      "",
      "--- REGISTER & MATHEMATICAL RESULTS ---",
      `Exact Mathematical Result: ${calculation.mathResultVal.toString()}`,
      `Represented Register Bits: ${calculation.multiBaseRes.binRaw}`,
      `Decimal Value: ${calculation.multiBaseRes.decStr}`,
      `Hexadecimal Value: 0x${calculation.multiBaseRes.hexRaw}`,
      `Octal Value: 0o${calculation.multiBaseRes.octRaw}`,
      `ASCII Character: ${calculation.multiBaseRes.asciiChar}`,
      `Overflow Detected: ${calculation.isOverflow ? "YES" : "NO"}${
        calculation.overflowReason ? ` (${calculation.overflowReason})` : ""
      }`,
      `Carry-Out Produced: ${calculation.carryOut ? "1" : "0"}`,
      "",
      "--- STEP-BY-STEP DERIVATION ---",
      ...calculation.steps.map((step, idx) => `${idx + 1}. ${step}`),
      "",
      "============================================================",
      "End of Calculation Report",
      "============================================================",
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `binary_report_${bitWidth}bit_${Date.now()}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Swap Inputs
  const handleSwap = () => {
    const temp = inputA;
    setInputA(inputB);
    setInputB(temp);
  };

  // Reset
  const handleReset = () => {
    setInputA("10101010");
    setInputB("00001111");
    setOperation("+");
    setBitWidth(8);
    setRepMode("unsigned");
    setShiftAmount(1);
    setInputAMode("bin");
    setInputBMode("bin");
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ======================================================== */}
      {/* 1. MAIN BINARY ARITHMETIC & BITWISE CALCULATOR CARD      */}
      {/* ======================================================== */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Binary Calculator &amp; Bitwise Operations</span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handleReset}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Reset calculator to default values"
            >
              <RotateCcw className="w-3 h-3 text-white" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={handleSaveResult}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Save current binary calculation"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: CONTROLS & INPUTS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Binary &amp; Register Settings
                </h2>

                {/* REGISTER WIDTH & SIGNED MODE */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="binary-bit-width"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1"
                    >
                      Bit Register Size
                    </label>
                    <select
                      id="binary-bit-width"
                      value={bitWidth}
                      onChange={(e) => setBitWidth(Number(e.target.value) as BitWidth)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value={8}>8-Bit Register</option>
                      <option value={16}>16-Bit Register</option>
                      <option value={32}>32-Bit Register</option>
                      <option value={64}>64-Bit Register</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="binary-rep-mode"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1"
                    >
                      Signed Representation
                    </label>
                    <select
                      id="binary-rep-mode"
                      value={repMode}
                      onChange={(e) => setRepMode(e.target.value as RepMode)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="unsigned">Unsigned Binary</option>
                      <option value="twos">Signed 2&apos;s Complement</option>
                    </select>
                  </div>
                </div>

                {/* OPERATION SELECTOR (Including Modulo %) */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Operation / Function
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums no-print">
                    {(
                      [
                        "+",
                        "-",
                        "*",
                        "/",
                        "%",
                        "AND",
                        "OR",
                        "XOR",
                        "NOT",
                        "<<",
                        ">>",
                      ] as Operation[]
                    ).map((op) => (
                      <button
                        key={op}
                        type="button"
                        onClick={() => setOperation(op)}
                        aria-pressed={operation === op}
                        className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                          operation === op
                            ? "bg-blue-600 text-white shadow-xs font-extrabold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50"
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                {/* INPUT A */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="binary-input-a"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      First Input (A)
                    </label>
                    <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold no-print">
                      <button
                        type="button"
                        onClick={() => {
                          setInputAMode("bin");
                          setInputA("10101010");
                        }}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                          inputAMode === "bin"
                            ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        Binary
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInputAMode("dec");
                          setInputA("170");
                        }}
                        className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                          inputAMode === "dec"
                            ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                            : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        Decimal
                      </button>
                    </div>
                  </div>
                  <input
                    id="binary-input-a"
                    type="text"
                    value={inputA}
                    onChange={(e) => setInputA(e.target.value)}
                    placeholder={inputAMode === "dec" ? "e.g. 170" : "e.g. 10101010"}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {inputAMode === "dec" && (
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 block font-sans tabular-nums">
                      Normalized Binary: {calculation.multiBaseA.binGrouped}
                    </span>
                  )}
                </div>

                {/* SWAP BUTTON */}
                {operation !== "NOT" && operation !== "<<" && operation !== ">>" && (
                  <div className="flex items-center justify-center py-0.5 no-print">
                    <button
                      type="button"
                      onClick={handleSwap}
                      className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/80 cursor-pointer transition-all flex items-center gap-1.5 shadow-xs"
                      aria-label="Swap Input A and Input B"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Swap A ↔ B
                    </button>
                  </div>
                )}

                {/* INPUT B (Binary or Shift Amount) */}
                {operation !== "NOT" && operation !== "<<" && operation !== ">>" && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label
                        htmlFor="binary-input-b"
                        className="text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        Second Input (B)
                      </label>
                      <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold no-print">
                        <button
                          type="button"
                          onClick={() => {
                            setInputBMode("bin");
                            setInputB("00001111");
                          }}
                          className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                            inputBMode === "bin"
                              ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          Binary
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setInputBMode("dec");
                            setInputB("15");
                          }}
                          className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                            inputBMode === "dec"
                              ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                              : "text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          Decimal
                        </button>
                      </div>
                    </div>
                    <input
                      id="binary-input-b"
                      type="text"
                      value={inputB}
                      onChange={(e) => setInputB(e.target.value)}
                      placeholder={inputBMode === "dec" ? "e.g. 15" : "e.g. 00001111"}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {inputBMode === "dec" && (
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 block font-sans tabular-nums">
                        Normalized Binary: {calculation.multiBaseB.binGrouped}
                      </span>
                    )}
                  </div>
                )}

                {(operation === "<<" || operation === ">>") && (
                  <div>
                    <label
                      htmlFor="binary-shift-amount"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1"
                    >
                      Shift Count (Bit Positions)
                    </label>
                    <input
                      id="binary-shift-amount"
                      type="number"
                      min={1}
                      max={bitWidth}
                      value={shiftAmount}
                      onChange={(e) =>
                        setShiftAmount(Math.max(1, parseInt(e.target.value, 10) || 1))
                      }
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE RESULTS, MULTI-BASE GRID & VISUALIZER */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                {/* HERO RESULT CARD */}
                <div
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Calculated Register Output ({bitWidth}-Bit)
                    </span>

                    {/* OVERFLOW & CARRY BADGES */}
                    <div className="flex items-center gap-1.5">
                      {calculation.isOverflow ? (
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800">
                          OVERFLOW
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          NO OVERFLOW
                        </span>
                      )}

                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                          calculation.carryOut
                            ? "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border-amber-300"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                        }`}
                      >
                        Carry: {calculation.carryOut ? "1" : "0"}
                      </span>
                    </div>
                  </div>

                  {calculation.error ? (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl text-xs font-bold text-amber-800 dark:text-amber-300">
                      ⚠️ {calculation.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-2xl sm:text-3xl font-mono tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        {calculation.multiBaseRes.binGrouped}
                      </div>

                      {/* MATHEMATICAL VS REGISTER EXPLANATION */}
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1 font-sans">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400 font-bold">
                            Exact Mathematical Value:
                          </span>
                          <span className="font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
                            {calculation.mathResultVal.toString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400 font-bold">
                            Register Bit Pattern:
                          </span>
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                            {calculation.multiBaseRes.binRaw}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-500 dark:text-slate-400 font-bold">
                            {repMode === "twos"
                              ? "Signed 2's Complement Value:"
                              : "Unsigned Binary Value:"}
                          </span>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {calculation.multiBaseRes.decStr}
                          </span>
                        </div>
                        {calculation.overflowReason && (
                          <div className="text-[11px] text-red-600 dark:text-red-400 font-bold pt-1 border-t border-slate-200 dark:border-slate-700">
                            {calculation.overflowReason}
                          </div>
                        )}
                      </div>

                      {calculation.remainderMultiBase && (
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/50 flex justify-between">
                          <span>Remainder:</span>
                          <span className="font-mono tabular-nums">
                            {calculation.remainderMultiBase.binGrouped} (Dec:{" "}
                            {calculation.remainderMultiBase.decStr})
                          </span>
                        </div>
                      )}

                      {/* MULTI-BASE GRID */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold pt-1">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">
                            Decimal (Base-10)
                          </span>
                          <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                            {calculation.multiBaseRes.decStr}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">
                            Hex (Base-16)
                          </span>
                          <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                            0x{calculation.multiBaseRes.hexRaw}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">
                            Octal (Base-8)
                          </span>
                          <span className="font-mono tabular-nums text-slate-900 dark:text-slate-100">
                            0o{calculation.multiBaseRes.octRaw}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">ASCII</span>
                          <span className="font-mono tabular-nums text-blue-600 dark:text-blue-400">
                            {calculation.multiBaseRes.asciiChar}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ACCESSIBLE ACTION BUTTONS BAR */}
                <div className="flex flex-wrap items-center gap-2 pt-1 no-print">
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedAction === "copy-result" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>{copiedAction === "copy-result" ? "Copied Result!" : "Copy Result"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedAction === "copy-summary" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>
                      {copiedAction === "copy-summary" ? "Copied Summary!" : "Copy Summary"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyLatex}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedAction === "copy-latex" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    <span>{copiedAction === "copy-latex" ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadTXT}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Download TXT</span>
                  </button>
                </div>

                {/* INTERACTIVE BIT VISUALIZER */}
                {!calculation.error && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <BitVisualizer
                      bitWidth={bitWidth}
                      operation={operation}
                      cleanA={calculation.multiBaseA.binRaw}
                      cleanB={calculation.multiBaseB.binRaw}
                      resBin={calculation.multiBaseRes.binRaw}
                      repMode={repMode}
                      carryChain={calculation.carryChain}
                      shiftAmount={shiftAmount}
                      isOverflow={calculation.isOverflow}
                      carryOut={calculation.carryOut}
                      subtractionDetail={calculation.subtractionDetail}
                    />
                  </div>
                )}

                {/* STEP-BY-STEP DERIVATION */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 print:break-inside-avoid">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Execution Breakdown
                  </h3>

                  {!calculation.error && calculation.steps && (
                    <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                      {calculation.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">
                            {idx + 1}.
                          </span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SAVED BINARY CALCULATIONS INSIDE CARD 1 */}
          {savedBinaryItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 mt-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Binary Calculations ({savedBinaryItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleClearAllSavedBinary}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedBinaryItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-sans tabular-nums">
                          {item.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedBinary(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer no-print"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Expression:{" "}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {item.expression}
                        </span>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        <span className="font-extrabold text-slate-500 dark:text-slate-400 block text-[11px]">
                          Complete Results:
                        </span>
                        <div className="space-y-1 text-xs font-sans tabular-nums max-h-36 overflow-y-auto">
                          {item.resultsList?.map((resLine, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug text-[11px]"
                            >
                              {resLine}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RESTORE BUTTON */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                      <button
                        type="button"
                        onClick={() => handleRestoreBinary(item)}
                        className="w-full py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Load / Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. DEDICATED MULTI-BASE & DECIMAL CONVERTER CARD         */}
      {/* (Completely decoupled mathematically from Card 1)        */}
      {/* ======================================================== */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Arbitrary Multi-Base Converter (Base 2 to Base 36)</span>
          <button
            type="button"
            onClick={handleSaveDecConversion}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer no-print"
            aria-label="Save multi-base conversion"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedDec ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: BASE SELECTION & INPUT */}
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="base-select-source"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1"
                  >
                    Source Base
                  </label>
                  <select
                    id="base-select-source"
                    value={sourceBase}
                    onChange={(e) => setSourceBase(Number(e.target.value))}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value={10}>Decimal (Base 10)</option>
                    <option value={2}>Binary (Base 2)</option>
                    <option value={16}>Hexadecimal (Base 16)</option>
                    <option value={8}>Octal (Base 8)</option>
                    <option value={3}>Ternary (Base 3)</option>
                    <option value={5}>Quinary (Base 5)</option>
                    <option value={12}>Duodecimal (Base 12)</option>
                    <option value={20}>Vigesimal (Base 20)</option>
                    <option value={36}>Base 36 (Alphanumeric)</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="base-select-target"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1"
                  >
                    Target Base
                  </label>
                  <select
                    id="base-select-target"
                    value={targetBase}
                    onChange={(e) => setTargetBase(Number(e.target.value))}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value={2}>Binary (Base 2)</option>
                    <option value={8}>Octal (Base 8)</option>
                    <option value={10}>Decimal (Base 10)</option>
                    <option value={16}>Hexadecimal (Base 16)</option>
                    <option value={3}>Base 3</option>
                    <option value={5}>Base 5</option>
                    <option value={12}>Base 12</option>
                    <option value={20}>Base 20</option>
                    <option value={36}>Base 36</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="base-input-source"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1"
                >
                  Source Value (Base-{sourceBase})
                </label>
                <input
                  id="base-input-source"
                  type="text"
                  value={baseInput}
                  onChange={(e) => setBaseInput(e.target.value)}
                  placeholder="e.g. 256"
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {baseConversionResult?.error ? (
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {baseConversionResult.error}
                </div>
              ) : (
                <div className="pt-1 space-y-1.5 text-xs font-bold">
                  <div className="flex justify-between items-center bg-blue-100/70 dark:bg-blue-900/40 p-2.5 rounded-lg text-blue-900 dark:text-blue-200">
                    <span>Target Base-{targetBase} Result:</span>
                    <span className="font-mono tabular-nums font-extrabold text-sm break-all">
                      {baseConversionResult.targetResult}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/40 p-2 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <span className="text-slate-600 dark:text-slate-300">Binary (Base-2):</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono tabular-nums font-extrabold break-all">
                      {baseConversionResult.binResult}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-500">Decimal (Base-10):</span>
                    <span className="text-slate-900 dark:text-slate-100 font-mono tabular-nums break-all">
                      {baseConversionResult.decResult}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-500">Hexadecimal (Base-16):</span>
                    <span className="text-slate-900 dark:text-slate-100 font-mono tabular-nums break-all">
                      {baseConversionResult.hexResult}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-500">Octal (Base-8):</span>
                    <span className="text-slate-900 dark:text-slate-100 font-mono tabular-nums break-all">
                      {baseConversionResult.octResult}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: DIVISION-BY-BASE STEPS */}
            <div className="md:col-span-7 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Division by Base-{targetBase} Step-by-Step Derivation
              </span>
              {baseConversionResult?.steps && (
                <div className="space-y-1 text-xs font-mono tabular-nums bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60 max-h-72 overflow-y-auto">
                  {baseConversionResult.steps.map((step, idx) => (
                    <div key={idx} className="text-slate-800 dark:text-slate-200 font-medium py-0.5">
                      <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">
                        {idx + 1}.
                      </span>{" "}
                      {step}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SAVED BASE CONVERSIONS INSIDE CARD 2 */}
          {savedDecItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 mt-4 print:break-inside-avoid">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Multi-Base Conversions ({savedDecItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleClearAllSavedDec}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 no-print"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedDecItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-sans tabular-nums">
                          {item.timestamp}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedDec(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer no-print"
                          title="Delete saved conversion"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">
                          Conversion:{" "}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {item.expression}
                        </span>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        <span className="font-extrabold text-slate-500 dark:text-slate-400 block text-[11px]">
                          Complete Results:
                        </span>
                        <div className="space-y-1 text-xs font-sans tabular-nums max-h-36 overflow-y-auto">
                          {item.resultsList?.map((resLine, idx) => (
                            <div
                              key={idx}
                              className="bg-slate-50 dark:bg-slate-800/80 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug text-[11px]"
                            >
                              {resLine}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RESTORE BUTTON */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 no-print">
                      <button
                        type="button"
                        onClick={() => handleRestoreDec(item)}
                        className="w-full py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" /> Load / Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BinaryCalculator;
