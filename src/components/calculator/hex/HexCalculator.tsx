"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Bookmark,
  Trash2,
  ArrowRightLeft,
  Check,
  Copy,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Download,
  FileSpreadsheet,
  FileText,
  Code2
} from "lucide-react";
import {
  HexOperator,
  BitWidth,
  CalculationResult,
  decodeBaseExact,
  encodeBaseExact,
  executeHexArithmetic,
  parseHexColor,
  inspectIEEE754Float,
  generateBaseDerivationSteps
} from "@/app/calculators/hex-calculator/hex-logic";
import { HexBitVisualizer } from "./HexBitVisualizer";

export interface SavedHexItem {
  id: string;
  title: string;
  timestamp: string;
  type: "arithmetic" | "conversion";
  rawInputs: {
    inputA?: string;
    inputB?: string;
    operator?: HexOperator;
    bitWidth?: BitWidth;
    isSigned?: boolean;
    baseInput?: string;
    sourceBase?: number;
    targetBase?: number;
  };
  summary: string;
  resultsList: string[];
}

export function HexCalculator() {
  // --- CARD 1 STATE (HEX ARITHMETIC & REGISTER ENGINE) ---
  const [inputA, setInputA] = useState<string>("8AB");
  const [inputB, setInputB] = useState<string>("B78");
  const [operator, setOperator] = useState<HexOperator>("+");
  const [bitWidth, setBitWidth] = useState<BitWidth>(32);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [activeInputSlot, setActiveInputSlot] = useState<"A" | "B">("A");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [restoreFeedback, setRestoreFeedback] = useState<string | null>(null);

  // References to input elements for cursor-aware keypad editing
  const inputARef = useRef<HTMLInputElement>(null);
  const inputBRef = useRef<HTMLInputElement>(null);

  // --- CARD 2 STATE (DECOUPLED MULTI-BASE CONVERTER) ---
  const [baseInput, setBaseInput] = useState<string>("FF");
  const [sourceBase, setSourceBase] = useState<number>(16);
  const [targetBase, setTargetBase] = useState<number>(10);

  // --- SAVED / PERSISTENCE STATE ---
  const [savedHexItems, setSavedHexItems] = useState<SavedHexItem[]>([]);
  const [savedDecItems, setSavedDecItems] = useState<SavedHexItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [justSavedDec, setJustSavedDec] = useState<boolean>(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const storedHex = localStorage.getItem("saved_hex_calculations");
      if (storedHex) setSavedHexItems(JSON.parse(storedHex));
      const storedDec = localStorage.getItem("saved_hex_conversions");
      if (storedDec) setSavedDecItems(JSON.parse(storedDec));
    } catch (e) {
      // LocalStorage access failover
    }
  }, []);

  // Validation helpers
  const cleanHex = (val: string) => val.replace(/^0x/i, "").replace(/\s+/g, "").toUpperCase();
  const cleanA = cleanHex(inputA);
  const cleanB = cleanHex(inputB);

  const isHexValid = (val: string) => {
    const c = cleanHex(val);
    return c.length === 0 || /^[0-9A-F]+$/.test(c);
  };

  const isValidA = cleanA.length > 0 && isHexValid(inputA);
  const isValidB = operator === "NOT" ? true : (cleanB.length > 0 && isHexValid(inputB));

  // Color Swatch Inspector
  const colorSwatch = useMemo(() => {
    return parseHexColor(cleanA);
  }, [cleanA]);

  // IEEE 754 Floating-Point Inspector
  const ieee754Float = useMemo(() => {
    return inspectIEEE754Float(cleanA);
  }, [cleanA]);

  // --- CARD 1 ARITHMETIC EXECUTION ---
  const calculation: CalculationResult = useMemo(() => {
    if (!isValidA || !isValidB) {
      return {
        mathematicalResult: 0n,
        registerResult: 0n,
        carryOut: 0,
        borrowOut: 0,
        unsignedOverflow: false,
        signedOverflow: false,
        hexResult: "",
        decResult: "",
        binResult: "",
        octResult: "",
        signedDecResult: "",
        unsignedDecResult: "",
        steps: [],
        error: "Please enter valid Hexadecimal values (0-9, A-F)."
      };
    }

    const result = executeHexArithmetic(cleanA, cleanB, operator, bitWidth, isSigned);
    return result;
  }, [cleanA, cleanB, operator, bitWidth, isSigned, isValidA, isValidB]);

  // Safe BigInt conversions for visualizer
  const { bigValA, bigValB, bigResVal } = useMemo(() => {
    try {
      const a = decodeBaseExact(cleanA, 16);
      const b = operator === "NOT" ? 0n : decodeBaseExact(cleanB, 16);
      const res = calculation.registerResult ?? 0n;
      return { bigValA: a, bigValB: b, bigResVal: res };
    } catch {
      return { bigValA: 0n, bigValB: 0n, bigResVal: 0n };
    }
  }, [cleanA, cleanB, operator, calculation.registerResult]);

  // --- CARD 2 MULTI-BASE CONVERSION (COMPLETELY DECOUPLED FROM CARD 1 BITWIDTH) ---
  const baseConversionResult = useMemo(() => {
    const raw = baseInput.trim();
    if (!raw) {
      return {
        error: "Please enter a valid number.",
        binResult: "",
        hexResult: "",
        octResult: "",
        decResult: "",
        targetResult: "",
        steps: []
      };
    }

    try {
      // Exact BigInt decoding without Card 1 bitWidth mask
      const decVal = decodeBaseExact(raw, sourceBase);

      const targetResult = encodeBaseExact(decVal, targetBase);
      const hexResult = `0x${encodeBaseExact(decVal, 16)}`;
      const decResult = decVal.toString();

      // Formatted binary with 4-bit nibble groupings
      const binRaw = encodeBaseExact(decVal, 2);
      const binResult = binRaw.replace(/(.{4})/g, "$1 ").trim();
      const octResult = `0o${encodeBaseExact(decVal, 8)}`;

      const steps = [
        `Decoded Base-${sourceBase} input (${raw}) to Decimal Base-10 &rarr; ${decResult}`,
        `Converting Decimal ${decResult} to Target Base-${targetBase}:`,
        ...generateBaseDerivationSteps(decVal, targetBase, 32)
      ];

      return {
        decVal,
        hexResult,
        binResult,
        octResult,
        decResult,
        targetResult,
        steps,
        error: null
      };
    } catch (err: any) {
      return {
        error: err.message || "Invalid number for the selected source base.",
        binResult: "",
        hexResult: "",
        octResult: "",
        decResult: "",
        targetResult: "",
        steps: []
      };
    }
  }, [baseInput, sourceBase, targetBase]);

  // --- CARD 1 SAVE HANDLER ---
  const handleSaveResult = () => {
    if (calculation.error || !calculation.hexResult) return;

    const summary = `0x${cleanA} ${operator} 0x${cleanB} = 0x${calculation.hexResult}`;
    const resList = [
      `Hex Result: 0x${calculation.hexResult}`,
      `Decimal Result: ${calculation.decResult}`,
      `Binary Result: ${calculation.binResult}`,
      `Octal Result: 0o${calculation.octResult}`,
      `Mathematical Result: ${calculation.mathematicalResult?.toString()}`,
      `Carry-Out: ${calculation.carryOut}`,
      `Borrow: ${calculation.borrowOut}`,
      `Unsigned Overflow: ${calculation.unsignedOverflow ? "YES" : "NO"}`,
      `Signed Overflow: ${calculation.signedOverflow ? "YES" : "NO"}`
    ];

    const newItem: SavedHexItem = {
      id: Date.now().toString(),
      title: "Hexadecimal Operation",
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      type: "arithmetic",
      rawInputs: {
        inputA,
        inputB,
        operator,
        bitWidth,
        isSigned
      },
      summary,
      resultsList: resList
    };

    const updated = [newItem, ...savedHexItems].slice(0, 15);
    setSavedHexItems(updated);
    try {
      localStorage.setItem("saved_hex_calculations", JSON.stringify(updated));
    } catch {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // --- CARD 2 SAVE HANDLER ---
  const handleSaveDecConversion = () => {
    if (!baseConversionResult || baseConversionResult.error) return;

    const summary = `Base-${sourceBase} (${baseInput}) → Base-${targetBase} (${baseConversionResult.targetResult})`;
    const resList = [
      `Target Base-${targetBase}: ${baseConversionResult.targetResult}`,
      `Hexadecimal: ${baseConversionResult.hexResult}`,
      `Decimal: ${baseConversionResult.decResult}`,
      `Binary: ${baseConversionResult.binResult}`,
      `Octal: ${baseConversionResult.octResult}`
    ];

    const newItem: SavedHexItem = {
      id: Date.now().toString(),
      title: `Base Conversion (${sourceBase} → ${targetBase})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      type: "conversion",
      rawInputs: {
        baseInput,
        sourceBase,
        targetBase
      },
      summary,
      resultsList: resList
    };

    const updated = [newItem, ...savedDecItems].slice(0, 15);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_hex_conversions", JSON.stringify(updated));
    } catch {}

    setJustSavedDec(true);
    setTimeout(() => setJustSavedDec(false), 2000);
  };

  // --- RESTORE HANDLER ---
  const handleRestoreItem = (item: SavedHexItem) => {
    if (item.type === "arithmetic" && item.rawInputs) {
      if (item.rawInputs.inputA !== undefined) setInputA(item.rawInputs.inputA);
      if (item.rawInputs.inputB !== undefined) setInputB(item.rawInputs.inputB);
      if (item.rawInputs.operator) setOperator(item.rawInputs.operator);
      if (item.rawInputs.bitWidth) setBitWidth(item.rawInputs.bitWidth);
      if (item.rawInputs.isSigned !== undefined) setIsSigned(item.rawInputs.isSigned);
      setRestoreFeedback(`Restored Arithmetic Calculation: ${item.summary}`);
    } else if (item.type === "conversion" && item.rawInputs) {
      if (item.rawInputs.baseInput !== undefined) setBaseInput(item.rawInputs.baseInput);
      if (item.rawInputs.sourceBase !== undefined) setSourceBase(item.rawInputs.sourceBase);
      if (item.rawInputs.targetBase !== undefined) setTargetBase(item.rawInputs.targetBase);
      setRestoreFeedback(`Restored Multi-Base Conversion: ${item.summary}`);
    }
    setTimeout(() => setRestoreFeedback(null), 3000);
  };

  // Delete handlers
  const handleDeleteSavedHex = (id: string) => {
    const updated = savedHexItems.filter((item) => item.id !== id);
    setSavedHexItems(updated);
    try {
      localStorage.setItem("saved_hex_calculations", JSON.stringify(updated));
    } catch {}
  };

  const handleClearAllSavedHex = () => {
    setSavedHexItems([]);
    try {
      localStorage.removeItem("saved_hex_calculations");
    } catch {}
  };

  const handleDeleteSavedDec = (id: string) => {
    const updated = savedDecItems.filter((item) => item.id !== id);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_hex_conversions", JSON.stringify(updated));
    } catch {}
  };

  const handleClearAllSavedDec = () => {
    setSavedDecItems([]);
    try {
      localStorage.removeItem("saved_hex_conversions");
    } catch {}
  };

  const handleSwap = () => {
    const temp = inputA;
    setInputA(inputB);
    setInputB(temp);
  };

  // Cursor-aware Keypad Insertion
  const handleKeypadPress = (char: string) => {
    const targetInput = activeInputSlot === "A" ? inputARef.current : inputBRef.current;
    const currentVal = activeInputSlot === "A" ? inputA : inputB;
    const setVal = activeInputSlot === "A" ? setInputA : setInputB;

    if (char === "CLEAR") {
      setVal("");
      if (targetInput) targetInput.focus();
      return;
    }

    if (!targetInput) {
      if (char === "BACKSPACE") {
        setVal((prev) => prev.slice(0, -1));
      } else {
        setVal((prev) => prev + char);
      }
      return;
    }

    const start = targetInput.selectionStart ?? currentVal.length;
    const end = targetInput.selectionEnd ?? currentVal.length;

    if (char === "BACKSPACE") {
      if (start === end && start > 0) {
        const nextVal = currentVal.slice(0, start - 1) + currentVal.slice(end);
        setVal(nextVal);
        setTimeout(() => {
          targetInput.setSelectionRange(start - 1, start - 1);
          targetInput.focus();
        }, 0);
      } else if (start !== end) {
        const nextVal = currentVal.slice(0, start) + currentVal.slice(end);
        setVal(nextVal);
        setTimeout(() => {
          targetInput.setSelectionRange(start, start);
          targetInput.focus();
        }, 0);
      }
    } else {
      const nextVal = currentVal.slice(0, start) + char + currentVal.slice(end);
      setVal(nextVal);
      setTimeout(() => {
        targetInput.setSelectionRange(start + char.length, start + char.length);
        targetInput.focus();
      }, 0);
    }
  };

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {}
  };

  // Export LaTeX
  const handleCopyLatex = () => {
    if (calculation.error || !calculation.hexResult) return;
    let latex = "";
    if (operator === "MOD") {
      latex = `0\\text{x}${cleanA} \\bmod 0\\text{x}${cleanB} = 0\\text{x}${calculation.hexResult}`;
    } else if (operator === "NOT") {
      latex = `\\neg 0\\text{x}${cleanA} = 0\\text{x}${calculation.hexResult}`;
    } else {
      const opSym = operator === "*" ? "\\times" : operator === "/" ? "\\div" : operator;
      latex = `0\\text{x}${cleanA} ${opSym} 0\\text{x}${cleanB} = 0\\text{x}${calculation.hexResult}`;
    }
    handleCopy(latex, "latex");
  };

  // Export Comprehensive Summary
  const handleCopySummary = () => {
    if (calculation.error || !calculation.hexResult) return;
    const summaryText = [
      `Hexadecimal Operation: 0x${cleanA} ${operator} 0x${cleanB} = 0x${calculation.hexResult}`,
      `Register Width: ${bitWidth}-Bit (${isSigned ? "Signed 2's Complement" : "Unsigned"})`,
      `Decimal Equivalent: ${calculation.decResult}`,
      `Binary Equivalent: ${calculation.binResult}`,
      `Octal Equivalent: 0o${calculation.octResult}`,
      `Mathematical (Unclipped): ${calculation.mathematicalResult?.toString()}`,
      `Carry-Out: ${calculation.carryOut} | Borrow: ${calculation.borrowOut}`,
      `Overflow: Unsigned = ${calculation.unsignedOverflow ? "YES" : "NO"}, Signed = ${calculation.signedOverflow ? "YES" : "NO"}`
    ].join("\n");
    handleCopy(summaryText, "summary");
  };

  // Export CSV (RFC-4180)
  const handleExportCSV = () => {
    if (calculation.error || !calculation.hexResult) return;
    const headers = [
      "Module",
      "Operation",
      "Operand A",
      "Operand B",
      "Register Width",
      "Representation",
      "Mathematical Result",
      "Register Result",
      "Hex Result",
      "Decimal Result",
      "Binary Result",
      "Octal Result",
      "Carry Out",
      "Borrow",
      "Unsigned Overflow",
      "Signed Overflow",
      "Timestamp"
    ];

    const values = [
      "Hex Calculator",
      operator,
      `0x${cleanA}`,
      `0x${cleanB}`,
      `${bitWidth}-Bit`,
      isSigned ? "Signed 2's Comp" : "Unsigned",
      calculation.mathematicalResult?.toString() || "",
      `0x${calculation.hexResult}`,
      `0x${calculation.hexResult}`,
      calculation.decResult || "",
      `"${calculation.binResult || ""}"`,
      `0o${calculation.octResult || ""}`,
      calculation.carryOut?.toString() || "0",
      calculation.borrowOut?.toString() || "0",
      calculation.unsignedOverflow ? "YES" : "NO",
      calculation.signedOverflow ? "YES" : "NO",
      new Date().toISOString()
    ];

    const csvContent = `${headers.join(",")}\n${values.join(",")}\n`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hex_calculation_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download TXT Report
  const handleDownloadTXT = () => {
    if (calculation.error || !calculation.hexResult) return;
    const txtContent = `======================================================
CALCPLATFORM — HEXADECIMAL CALCULATION REPORT
======================================================
Generated: ${new Date().toLocaleString()}

CALCULATION SPECIFICATION:
• Operation: 0x${cleanA} ${operator} 0x${cleanB}
• Register Width: ${bitWidth}-Bit Word
• Mode: ${isSigned ? "Signed Two's Complement" : "Unsigned"}

RESULTS:
• Stored Register Result (Hex): 0x${calculation.hexResult}
• Decimal Interpretation:      ${calculation.decResult}
• Binary (Grouped Nibbles):    ${calculation.binResult}
• Octal Representation:        0o${calculation.octResult}
• Mathematical Result:         ${calculation.mathematicalResult?.toString()}

HARDWARE REGISTER FLAGS:
• Carry-Out:         ${calculation.carryOut}
• Borrow:            ${calculation.borrowOut}
• Unsigned Overflow: ${calculation.unsignedOverflow ? "YES" : "NO"}
• Signed Overflow:   ${calculation.signedOverflow ? "YES" : "NO"}

STEP-BY-STEP DERIVATION:
${calculation.steps?.map((s, i) => `${i + 1}. ${s}`).join("\n") || "N/A"}

======================================================
`;
    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hex_calculation_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* RESTORE NOTIFICATION BANNER */}
      {restoreFeedback && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs transition-all">
          <span>{restoreFeedback}</span>
          <button
            type="button"
            onClick={() => setRestoreFeedback(null)}
            className="text-emerald-600 hover:text-emerald-800 text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 1: HEXADECIMAL CALCULATOR & BITWISE OPERATIONS */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold tracking-wide">Hexadecimal Calculator &amp; Bitwise Operations</span>
          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleSaveResult}
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Save Calculation"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSaved ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: CONTROLS & VIRTUAL KEYPAD */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Hexadecimal Inputs &amp; Controls
                </h2>

                {/* BIT REGISTER SIZE & SIGNED MODE */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="hex-bit-width-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Word Register Size
                    </label>
                    <select
                      id="hex-bit-width-select"
                      value={bitWidth}
                      onChange={(e) => setBitWidth(Number(e.target.value) as BitWidth)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value={8}>8-Bit (Byte)</option>
                      <option value={16}>16-Bit (WORD)</option>
                      <option value={32}>32-Bit (DWORD)</option>
                      <option value={64}>64-Bit (QWORD)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="hex-representation-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Representation
                    </label>
                    <select
                      id="hex-representation-select"
                      value={isSigned ? "signed" : "unsigned"}
                      onChange={(e) => setIsSigned(e.target.value === "signed")}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="unsigned">Unsigned Hex</option>
                      <option value="signed">Signed 2&apos;s Complement</option>
                    </select>
                  </div>
                </div>

                {/* OPERATOR SELECTOR */}
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Arithmetic / Bitwise Operator
                  </label>
                  <div
                    role="radiogroup"
                    aria-label="Arithmetic and Bitwise Operators"
                    className="grid grid-cols-6 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums print:hidden"
                  >
                    {(["+", "-", "*", "/", "MOD", "AND", "OR", "XOR", "NOT", "<<", ">>", ">>>"] as HexOperator[]).map((op) => (
                      <button
                        key={op}
                        type="button"
                        role="radio"
                        aria-checked={operator === op}
                        aria-label={`Operator ${op}`}
                        onClick={() => setOperator(op)}
                        className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                          operator === op ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                </div>

                {/* INPUT A */}
                <div onClick={() => setActiveInputSlot("A")}>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="hex-input-a" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      Hex Input A {activeInputSlot === "A" && <span className="text-[10px] text-blue-600 font-extrabold">(Active)</span>}
                    </label>
                    {!isValidA && cleanA.length > 0 && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        Invalid Hex (0-9, A-F only)
                      </span>
                    )}
                  </div>
                  <input
                    id="hex-input-a"
                    ref={inputARef}
                    type="text"
                    value={inputA}
                    onFocus={() => setActiveInputSlot("A")}
                    onChange={(e) => setInputA(e.target.value)}
                    placeholder="e.g. 8AB or 0x8AB"
                    className={`w-full h-10 px-3 rounded-xl border ${
                      activeInputSlot === "A" ? "border-blue-600 ring-2 ring-blue-600/30" : "border-slate-300 dark:border-slate-700"
                    } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none`}
                  />
                </div>

                {/* SWAP BUTTON */}
                {operator !== "NOT" && (
                  <div className="flex items-center justify-center py-1 print:hidden">
                    <button
                      type="button"
                      onClick={handleSwap}
                      aria-label="Swap Inputs A and B"
                      className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/80 cursor-pointer transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Swap A ↔ B
                    </button>
                  </div>
                )}

                {/* INPUT B */}
                {operator !== "NOT" && (
                  <div onClick={() => setActiveInputSlot("B")}>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor="hex-input-b" className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        Hex Input B {activeInputSlot === "B" && <span className="text-[10px] text-blue-600 font-extrabold">(Active)</span>}
                      </label>
                      {!isValidB && cleanB.length > 0 && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          Invalid Hex (0-9, A-F only)
                        </span>
                      )}
                    </div>
                    <input
                      id="hex-input-b"
                      ref={inputBRef}
                      type="text"
                      value={inputB}
                      onFocus={() => setActiveInputSlot("B")}
                      onChange={(e) => setInputB(e.target.value)}
                      placeholder="e.g. B78 or 0xB78"
                      className={`w-full h-10 px-3 rounded-xl border ${
                        activeInputSlot === "B" ? "border-blue-600 ring-2 ring-blue-600/30" : "border-slate-300 dark:border-slate-700"
                      } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none`}
                    />
                  </div>
                )}

                {/* ON-SCREEN HEX VIRTUAL KEYPAD */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 print:hidden">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    Hex Virtual Keypad (Slot {activeInputSlot})
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 font-sans tabular-nums font-extrabold text-xs">
                    {["A", "B", "C", "D", "E", "F", "7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((k) => (
                      <button
                        key={k}
                        type="button"
                        aria-label={`Hex digit ${k}`}
                        onClick={() => handleKeypadPress(k)}
                        className="py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-300 cursor-pointer transition-colors active:scale-95 shadow-xs"
                      >
                        {k}
                      </button>
                    ))}
                    <button
                      type="button"
                      aria-label="Clear active operand"
                      onClick={() => handleKeypadPress("CLEAR")}
                      className="py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-100 cursor-pointer"
                    >
                      CLR
                    </button>
                    <button
                      type="button"
                      aria-label="Backspace active operand"
                      onClick={() => handleKeypadPress("BACKSPACE")}
                      className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-300 cursor-pointer col-span-3"
                    >
                      ⌫ Backspace
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD, REGISTER STATUS, VISUALIZER & EXPORTS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                {/* HERO RESULT DISPLAY */}
                <div
                  aria-live="polite"
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Calculated Hex Result ({bitWidth}-Bit Word)
                    </span>

                    {/* EXPORT SUITE BUTTONS */}
                    <div className="flex items-center gap-1.5 print:hidden">
                      <button
                        type="button"
                        aria-label="Copy Hex Result"
                        onClick={() => handleCopy(calculation.hexResult ? `0x${calculation.hexResult}` : "", "res")}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                        title="Copy Hex Result"
                      >
                        {copiedKey === "res" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                        <span>{copiedKey === "res" ? "Copied!" : "Copy"}</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Copy Summary"
                        onClick={handleCopySummary}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                        title="Copy Comprehensive Summary"
                      >
                        {copiedKey === "summary" ? <Check className="w-3 h-3 text-emerald-500" /> : <FileText className="w-3 h-3 text-blue-600" />}
                        <span>{copiedKey === "summary" ? "Copied!" : "Summary"}</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Copy LaTeX Formula"
                        onClick={handleCopyLatex}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                        title="Copy LaTeX formula"
                      >
                        {copiedKey === "latex" ? <Check className="w-3 h-3 text-emerald-500" /> : <Code2 className="w-3 h-3 text-blue-600" />}
                        <span>LaTeX</span>
                      </button>

                      <button
                        type="button"
                        aria-label="Export CSV"
                        onClick={handleExportCSV}
                        className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-colors"
                        title="Export CSV"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                      </button>

                      <button
                        type="button"
                        aria-label="Download TXT Report"
                        onClick={handleDownloadTXT}
                        className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-colors"
                        title="Download Plain Text Report"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                    </div>
                  </div>

                  {calculation.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {calculation.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        0x{calculation.hexResult}
                      </div>

                      {/* MULTI-BASE SYNCHRONIZATION MATRIX */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold pt-1">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">
                            Decimal ({isSigned ? "Signed" : "Unsigned"})
                          </span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">
                            {calculation.decResult}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Binary (Base-2)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 break-all">
                            {calculation.binResult}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Octal (Base-8)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">
                            0o{calculation.octResult}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Hardware Carry</span>
                          <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">
                            Carry: {calculation.carryOut} | Borrow: {calculation.borrowOut}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* HARDWARE REGISTER STATUS & OVERFLOW BADGE PANEL */}
                {!calculation.error && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        Hardware Register Status &amp; Flags
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Mask: 0x{((1n << BigInt(bitWidth)) - 1n).toString(16).toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">Unsigned Overflow</span>
                        <span className={calculation.unsignedOverflow ? "text-red-600 dark:text-red-400 font-extrabold" : "text-slate-700 dark:text-slate-300"}>
                          {calculation.unsignedOverflow ? "YES (Exceeded)" : "NO"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">Signed Overflow</span>
                        <span className={calculation.signedOverflow ? "text-amber-600 dark:text-amber-400 font-extrabold" : "text-slate-700 dark:text-slate-300"}>
                          {calculation.signedOverflow ? "YES (Sign Flip)" : "NO"}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">Carry-Out Bit</span>
                        <span className={calculation.carryOut === 1 ? "text-amber-600 dark:text-amber-400 font-extrabold" : "text-slate-700 dark:text-slate-300"}>
                          {calculation.carryOut}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 block uppercase">Borrow Bit</span>
                        <span className={calculation.borrowOut === 1 ? "text-amber-600 dark:text-amber-400 font-extrabold" : "text-slate-700 dark:text-slate-300"}>
                          {calculation.borrowOut}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans tabular-nums pt-1">
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Exact Mathematical Result (Unclipped)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {calculation.mathematicalResult?.toString()} (0x{calculation.mathematicalResult ? (calculation.mathematicalResult >= 0n ? calculation.mathematicalResult.toString(16).toUpperCase() : `-${(-calculation.mathematicalResult).toString(16).toUpperCase()}`) : "0"})
                        </span>
                      </div>

                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Signed Two&apos;s Complement Value</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {calculation.signedDecResult}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* INTERACTIVE BIT & REGISTER VISUALIZER */}
                {!calculation.error && (
                  <HexBitVisualizer
                    valA={bigValA}
                    valB={bigValB}
                    resVal={bigResVal}
                    operator={operator}
                    width={bitWidth}
                    isSigned={isSigned}
                    carryOut={calculation.carryOut}
                    borrowOut={calculation.borrowOut}
                  />
                )}

                {/* HEX COLOR SWATCH PREVIEWER */}
                {colorSwatch && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner shrink-0"
                      style={{ backgroundColor: colorSwatch.css }}
                    />
                    <div className="space-y-1 text-xs font-bold">
                      <span className="text-blue-600 dark:text-blue-400 uppercase tracking-wider block text-[10px]">
                        Live Hex Color Swatch Inspector
                      </span>
                      <div className="text-slate-900 dark:text-slate-100 font-sans tabular-nums text-sm">
                        {colorSwatch.hexFormatted}
                      </div>
                      <div className="text-slate-500 font-sans tabular-nums">
                        {colorSwatch.rgb}
                      </div>
                    </div>
                  </div>
                )}

                {/* IEEE 754 FLOATING POINT INSPECTOR */}
                {ieee754Float && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider block text-[10px]">
                      IEEE 754 Single-Precision 32-Bit Float Breakdown
                    </span>
                    <div className="text-lg font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100">
                      Float Value: {ieee754Float.floatVal}
                    </div>
                    <div className="grid grid-cols-3 gap-2 font-bold font-sans tabular-nums">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Sign Bit (1-Bit)</span>
                        {ieee754Float.signBit} ({ieee754Float.signBit === 0 ? "Positive +" : "Negative -"})
                      </div>
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Exponent (8-Bits)</span>
                        {ieee754Float.exponentBits} (Bias-127 = {ieee754Float.exponentDec})
                      </div>
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Mantissa (23-Bits)</span>
                        0x{ieee754Float.mantissaBits}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP-BY-STEP BREAKDOWN */}
                <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Verification Breakdown
                  </h3>

                  {!calculation.error && calculation.steps && (
                    <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                      {calculation.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">{idx + 1}.</span>
                          <span className="font-sans tabular-nums">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED HEX CALCULATIONS */}
          {savedHexItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Hex Calculations ({savedHexItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleClearAllSavedHex}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedHexItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestoreItem(item)}
                            className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
                            title="Restore Calculation to Inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSavedHex(item.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Saved Calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.summary}</span>
                        </div>

                        {/* RESTORE BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleRestoreItem(item)}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Restore Inputs &amp; Flags
                        </button>

                        {/* EXPAND TOGGLE */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {item.resultsList.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 2: HEX & MULTI-BASE CONVERTER (DECOUPLED FROM CARD 1) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span className="font-extrabold tracking-wide">Hex &amp; Multi-Base Arbitrary-Precision Converter</span>
          <button
            type="button"
            onClick={handleSaveDecConversion}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer print:hidden"
            title="Save Conversion"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedDec ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Converter Configuration
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="source-base-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Source Base
                  </label>
                  <select
                    id="source-base-select"
                    value={sourceBase}
                    onChange={(e) => setSourceBase(Number(e.target.value))}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value={16}>Hexadecimal (Base 16)</option>
                    <option value={10}>Decimal (Base 10)</option>
                    <option value={2}>Binary (Base 2)</option>
                    <option value={8}>Octal (Base 8)</option>
                    <option value={3}>Ternary (Base 3)</option>
                    <option value={5}>Quinary (Base 5)</option>
                    <option value={12}>Duodecimal (Base 12)</option>
                    <option value={20}>Vigesimal (Base 20)</option>
                    <option value={36}>Base 36 (Alphanumeric)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="target-base-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Target Base
                  </label>
                  <select
                    id="target-base-select"
                    value={targetBase}
                    onChange={(e) => setTargetBase(Number(e.target.value))}
                    className="w-full h-9 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value={10}>Decimal (Base 10)</option>
                    <option value={16}>Hexadecimal (Base 16)</option>
                    <option value={2}>Binary (Base 2)</option>
                    <option value={8}>Octal (Base 8)</option>
                    <option value={3}>Ternary (Base 3)</option>
                    <option value={5}>Quinary (Base 5)</option>
                    <option value={12}>Duodecimal (Base 12)</option>
                    <option value={36}>Base 36</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="converter-source-input" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Source Number / String
                </label>
                <input
                  id="converter-source-input"
                  type="text"
                  value={baseInput}
                  onChange={(e) => setBaseInput(e.target.value)}
                  placeholder={`Enter Base-${sourceBase} value...`}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE CONVERTED OUTPUT MATRIX & DERIVATION STEPS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div
                  aria-live="polite"
                  className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Converted Result (Base-{targetBase})
                  </span>
                  {baseConversionResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {baseConversionResult.error}
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {baseConversionResult.targetResult}
                    </div>
                  )}
                </div>

                {!baseConversionResult.error && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold font-sans tabular-nums">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Hexadecimal</span>
                      <span className="text-blue-600 dark:text-blue-400 break-all">{baseConversionResult.hexResult}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Decimal</span>
                      <span className="text-slate-900 dark:text-slate-100 break-all">{baseConversionResult.decResult}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Binary</span>
                      <span className="text-slate-900 dark:text-slate-100 break-all">{baseConversionResult.binResult}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Octal</span>
                      <span className="text-slate-900 dark:text-slate-100">{baseConversionResult.octResult}</span>
                    </div>
                  </div>
                )}

                {/* STEP-BY-STEP DERIVATION */}
                {baseConversionResult.steps && baseConversionResult.steps.length > 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Base Conversion Derivation
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {baseConversionResult.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                        >
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED HEX CONVERSIONS */}
          {savedDecItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4 print:hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Base Conversions ({savedDecItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={handleClearAllSavedDec}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedDecItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleRestoreItem(item)}
                            className="p-1 text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
                            title="Restore Conversion to Inputs"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSavedDec(item.id)}
                            className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete Saved Conversion"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Conversion: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.summary}</span>
                        </div>

                        {/* RESTORE BUTTON */}
                        <button
                          type="button"
                          onClick={() => handleRestoreItem(item)}
                          className="w-full py-1.5 px-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Restore Parameters
                        </button>

                        {/* EXPAND TOGGLE */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {item.resultsList.map((resLine, idx) => (
                                <div
                                  key={idx}
                                  className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug"
                                >
                                  {resLine}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HexCalculator;
