"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, ArrowRightLeft, Sparkles, HelpCircle, RefreshCw, Layers, Bookmark, Trash2 } from "lucide-react";

export interface SavedBinaryItem {
  id: string;
  title: string;
  expression: string;
  result: string;
  timestamp: string;
}

type Operation = "+" | "-" | "*" | "/" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>";
type BitWidth = 8 | 16 | 32 | 64;
type RepMode = "unsigned" | "twos" | "ones" | "signed_magnitude";

export function BinaryCalculator() {
  const [inputA, setInputA] = useState<string>("10101010");
  const [inputB, setInputB] = useState<string>("00001111");
  const [operation, setOperation] = useState<Operation>("+");
  const [bitWidth, setBitWidth] = useState<BitWidth>(8);
  const [repMode, setRepMode] = useState<RepMode>("unsigned");
  const [grouping, setGrouping] = useState<number>(4); // 0 = none, 4 = 4-bit, 8 = 8-bit
  const [shiftAmount, setShiftAmount] = useState<number>(2);

  // Decimal to Binary & Input format modes
  const [inputAMode, setInputAMode] = useState<"bin" | "dec">("bin");
  const [inputBMode, setInputBMode] = useState<"bin" | "dec">("bin");
  const [decInput, setDecInput] = useState<string>("255");

  // Saved calculations state
  const [savedItems, setSavedItems] = useState<SavedBinaryItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("saved_binary_calculations");
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Quick Preset Handlers
  const applyPreset = (preset: "add" | "sub" | "and" | "xor" | "shift") => {
    if (preset === "add") {
      setInputA("10101010");
      setInputB("00001111");
      setOperation("+");
    } else if (preset === "sub") {
      setInputA("11110000");
      setInputB("00111100");
      setOperation("-");
    } else if (preset === "and") {
      setInputA("11001100");
      setInputB("10101010");
      setOperation("AND");
    } else if (preset === "xor") {
      setInputA("11110000");
      setInputB("10101010");
      setOperation("XOR");
    } else if (preset === "shift") {
      setInputA("00001111");
      setShiftAmount(2);
      setOperation("<<");
    }
  };

  // Helper Validation
  const isBinaryValid = (val: string) => /^[01\s]*$/.test(val);

  // Format Helper: Bit Grouping
  const formatBitString = (binStr: string, groupSize: number) => {
    if (groupSize === 0 || !binStr) return binStr;
    const padLen = Math.ceil(binStr.length / groupSize) * groupSize;
    const padded = binStr.padStart(padLen, "0");
    const regex = new RegExp(`.{1,${groupSize}}`, "g");
    return padded.match(regex)?.join(" ") || binStr;
  };

  // Compute clean binary strings considering decimal or binary modes
  const cleanA = useMemo(() => {
    if (inputAMode === "dec") {
      const dec = parseInt(inputA.trim(), 10);
      if (isNaN(dec)) return "";
      const big = BigInt(dec);
      const mask = (1n << BigInt(bitWidth)) - 1n;
      const uVal = big < 0n ? (big + (1n << BigInt(bitWidth))) & mask : big & mask;
      return uVal.toString(2).padStart(bitWidth, "0");
    }
    return inputA.replace(/\s+/g, "");
  }, [inputA, inputAMode, bitWidth]);

  const cleanB = useMemo(() => {
    if (inputBMode === "dec") {
      const dec = parseInt(inputB.trim(), 10);
      if (isNaN(dec)) return "";
      const big = BigInt(dec);
      const mask = (1n << BigInt(bitWidth)) - 1n;
      const uVal = big < 0n ? (big + (1n << BigInt(bitWidth))) & mask : big & mask;
      return uVal.toString(2).padStart(bitWidth, "0");
    }
    return inputB.replace(/\s+/g, "");
  }, [inputB, inputBMode, bitWidth]);

  const isValidA = inputAMode === "dec" ? !isNaN(parseInt(inputA.trim(), 10)) : (isBinaryValid(inputA) && cleanA.length > 0);
  const isValidB = inputBMode === "dec" ? !isNaN(parseInt(inputB.trim(), 10)) : (isBinaryValid(inputB) && (operation === "NOT" || operation === "<<" || operation === ">>" || cleanB.length > 0));

  // Convert Binary String to BigInt (Unsigned & Signed)
  const parseBinToBigInt = (binStr: string, mode: RepMode, width: BitWidth): { val: bigint; decStr: string } => {
    if (!binStr) return { val: 0n, decStr: "0" };
    try {
      const uVal = BigInt(`0b${binStr}`);
      if (mode === "unsigned") {
        return { val: uVal, decStr: uVal.toString() };
      }

      // Signed 2's complement
      const maxUnsigned = (1n << BigInt(width)) - 1n;
      const msbMask = 1n << BigInt(width - 1);
      const masked = uVal & maxUnsigned;

      if ((masked & msbMask) !== 0n) {
        // Negative in 2's complement
        const signedVal = masked - (1n << BigInt(width));
        return { val: signedVal, decStr: signedVal.toString() };
      }
      return { val: masked, decStr: masked.toString() };
    } catch (e) {
      return { val: 0n, decStr: "0" };
    }
  };

  // Convert BigInt to formatted multi-base representation
  const formatMultiBase = (num: bigint, width: BitWidth) => {
    try {
      const mask = (1n << BigInt(width)) - 1n;
      const uVal = num < 0n ? (num + (1n << BigInt(width))) & mask : num & mask;

      const binRaw = uVal.toString(2).padStart(width, "0");
      const hexRaw = uVal.toString(16).toUpperCase().padStart(width / 4, "0");
      const octRaw = uVal.toString(8).padStart(Math.ceil(width / 3), "0");
      const decStr = num.toString();

      let asciiChar = "N/A";
      const charCode = Number(uVal);
      if (charCode >= 32 && charCode <= 126) {
        asciiChar = `'${String.fromCharCode(charCode)}'`;
      } else if (charCode === 10) {
        asciiChar = "'\\n' (Line Feed)";
      } else if (charCode === 13) {
        asciiChar = "'\\r' (Carriage Return)";
      } else if (charCode === 9) {
        asciiChar = "'\\t' (Tab)";
      }

      return {
        binRaw,
        binGrouped: formatBitString(binRaw, grouping),
        hexRaw,
        octRaw,
        decStr,
        asciiChar,
      };
    } catch (e) {
      return {
        binRaw: "0",
        binGrouped: "0",
        hexRaw: "0",
        octRaw: "0",
        decStr: "0",
        asciiChar: "N/A",
      };
    }
  };

  // Main Calculation Engine & Step Generator
  const calculation = useMemo(() => {
    if (!isValidA || !isValidB) {
      return { error: "Please enter valid binary numbers (0s and 1s only)." };
    }

    const { val: aVal, decStr: aDec } = parseBinToBigInt(cleanA, repMode, bitWidth);
    const { val: bVal, decStr: bDec } = parseBinToBigInt(cleanB, repMode, bitWidth);

    let resVal = 0n;
    let remainderVal: bigint | null = null;
    const steps: string[] = [];

    const mask = (1n << BigInt(bitWidth)) - 1n;

    if (operation === "+") {
      resVal = (aVal + bVal) & mask;
      steps.push(`Binary Addition: ${cleanA} + ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} + ${bDec} = ${(aVal + bVal).toString()}`);

      // Column Carry Breakdown Visualization
      const maxLen = Math.max(cleanA.length, cleanB.length);
      const padA = cleanA.padStart(maxLen, "0");
      const padB = cleanB.padStart(maxLen, "0");
      let carry = 0;
      const carryArr: string[] = [];
      const sumArr: string[] = [];

      for (let i = maxLen - 1; i >= 0; i--) {
        const bitA = parseInt(padA[i]);
        const bitB = parseInt(padB[i]);
        const sum = bitA + bitB + carry;
        sumArr.unshift((sum % 2).toString());
        carry = Math.floor(sum / 2);
        carryArr.unshift(carry.toString());
      }
      if (carry > 0) sumArr.unshift("1");

      steps.push(`Column Carry Chain: [${carryArr.join(" ")}]`);
      steps.push(`Resulting Bit Stream: ${sumArr.join("")}`);

    } else if (operation === "-") {
      resVal = (aVal - bVal) & mask;
      steps.push(`Binary Subtraction: ${cleanA} - ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} - ${bDec} = ${(aVal - bVal).toString()}`);

      // 2's Complement Subtraction Proof
      const negB = (-bVal) & mask;
      steps.push(`2's Complement Workflow: A + (~B + 1)`);
      steps.push(`~B + 1 Representation of B (${cleanB}): ${negB.toString(2).padStart(bitWidth, "0")}`);
      steps.push(`Sum: ${cleanA} + ${negB.toString(2).padStart(bitWidth, "0")} = ${resVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === "*") {
      resVal = (aVal * bVal) & mask;
      steps.push(`Binary Multiplication: ${cleanA} × ${cleanB}`);
      steps.push(`Decimal Equivalence: ${aDec} × ${bDec} = ${(aVal * bVal).toString()}`);

      // Partial Products Shift Display
      steps.push(`Partial Products Alignment:`);
      const bStr = cleanB;
      for (let i = 0; i < bStr.length; i++) {
        const bit = bStr[bStr.length - 1 - i];
        if (bit === "1") {
          steps.push(`Shift ${i} bits left: ${cleanA}${"0".repeat(i)}`);
        }
      }

    } else if (operation === "/") {
      if (bVal === 0n) return { error: "Division by zero (0) is undefined." };
      resVal = aVal / bVal;
      remainderVal = aVal % bVal;
      steps.push(`Binary Division: ${cleanA} ÷ ${cleanB}`);
      steps.push(`Decimal Quotient: ${resVal.toString()}, Remainder: ${remainderVal.toString()}`);
      steps.push(`Quotient Binary: ${resVal.toString(2).padStart(bitWidth, "0")}`);
      steps.push(`Remainder Binary: ${remainderVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === "AND") {
      resVal = aVal & bVal;
      steps.push(`Bitwise AND Operation (A & B):`);
      steps.push(`Outputs 1 only when both corresponding bits are 1.`);
      steps.push(`${cleanA} & ${cleanB} = ${resVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === "OR") {
      resVal = aVal | bVal;
      steps.push(`Bitwise OR Operation (A | B):`);
      steps.push(`Outputs 1 when at least one corresponding bit is 1.`);
      steps.push(`${cleanA} | ${cleanB} = ${resVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === "XOR") {
      resVal = aVal ^ bVal;
      steps.push(`Bitwise XOR Operation (A ^ B):`);
      steps.push(`Outputs 1 when corresponding bits are different.`);
      steps.push(`${cleanA} ^ ${cleanB} = ${resVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === "NOT") {
      resVal = (~aVal) & mask;
      steps.push(`Bitwise NOT Operation (~A):`);
      steps.push(`Inverts all 0 bits to 1 and 1 bits to 0.`);
      steps.push(`~${cleanA} = ${resVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === "<<") {
      const shift = BigInt(shiftAmount);
      resVal = (aVal << shift) & mask;
      steps.push(`Left Bitwise Shift (A << ${shiftAmount}):`);
      steps.push(`Shifts bits left by ${shiftAmount} positions (equivalent to multiplying by 2^${shiftAmount}).`);
      steps.push(`${cleanA} << ${shiftAmount} = ${resVal.toString(2).padStart(bitWidth, "0")}`);

    } else if (operation === ">>") {
      const shift = BigInt(shiftAmount);
      resVal = (aVal >> shift) & mask;
      steps.push(`Right Bitwise Shift (A >> ${shiftAmount}):`);
      steps.push(`Shifts bits right by ${shiftAmount} positions (equivalent to integer division by 2^${shiftAmount}).`);
      steps.push(`${cleanA} >> ${shiftAmount} = ${resVal.toString(2).padStart(bitWidth, "0")}`);
    }

    const multiBaseA = formatMultiBase(aVal, bitWidth);
    const multiBaseB = formatMultiBase(bVal, bitWidth);
    const multiBaseRes = formatMultiBase(resVal, bitWidth);
    const multiBaseRem = remainderVal !== null ? formatMultiBase(remainderVal, bitWidth) : null;

    return {
      resVal,
      remainderVal,
      multiBaseA,
      multiBaseB,
      multiBaseRes,
      multiBaseRem,
      steps
    };
  }, [cleanA, cleanB, operation, bitWidth, repMode, grouping, shiftAmount]);

  // Dedicated Decimal to Binary Step-by-Step Derivation
  const decToBinSteps = useMemo(() => {
    const numStr = decInput.trim();
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return { error: "Please enter a valid integer.", binResult: "", hexResult: "", octResult: "", steps: [] };

    let n = Math.abs(num);
    if (n === 0) {
      return {
        binResult: formatBitString("0".padStart(bitWidth, "0"), grouping),
        hexResult: "0x0",
        octResult: "0o0",
        steps: ["0 ÷ 2 = 0, Remainder 0", "Final Binary Result: 0₂"]
      };
    }

    const stepLines: string[] = [];
    const remainders: number[] = [];

    while (n > 0) {
      const q = Math.floor(n / 2);
      const r = n % 2;
      stepLines.push(`${n} ÷ 2 = ${q}, Remainder ${r}`);
      remainders.push(r);
      n = q;
    }

    const binUnsignedRaw = [...remainders].reverse().join("");
    stepLines.push(`Read remainders from bottom to top: ${binUnsignedRaw}₂`);

    const decBig = BigInt(numStr);
    const mask = (1n << BigInt(bitWidth)) - 1n;
    const uVal = decBig < 0n ? (decBig + (1n << BigInt(bitWidth))) & mask : decBig & mask;

    const binFormatted = formatBitString(uVal.toString(2).padStart(bitWidth, "0"), grouping);
    const hexFormatted = uVal.toString(16).toUpperCase();
    const octFormatted = uVal.toString(8);

    return {
      binResult: binFormatted,
      hexResult: `0x${hexFormatted}`,
      octResult: `0o${octFormatted}`,
      steps: stepLines
    };
  }, [decInput, bitWidth, grouping]);

  const handleSaveResult = () => {
    if (calculation.error || !calculation.multiBaseRes) return;

    let expr = `${inputA} ${operation} ${inputB}`;
    if (operation === "NOT") {
      expr = `NOT ${inputA}`;
    } else if (operation === "<<" || operation === ">>") {
      expr = `${inputA} ${operation} ${shiftAmount}`;
    }

    const resStr = `${calculation.multiBaseRes.binGrouped} (Dec: ${calculation.multiBaseRes.decStr})`;

    const newItem: SavedBinaryItem = {
      id: Date.now().toString(),
      title: "Binary Operation",
      expression: expr,
      result: resStr,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedItems.filter(item => item.expression !== expr)].slice(0, 15);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_binary_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("saved_binary_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSaved = () => {
    setSavedItems([]);
    try {
      localStorage.removeItem("saved_binary_calculations");
    } catch (e) {}
  };

  // Swap Inputs Handler
  const handleSwap = () => {
    const temp = inputA;
    setInputA(inputB);
    setInputB(temp);
  };

  // Reset Handler
  const handleReset = () => {
    setInputA("10101010");
    setInputB("00001111");
    setOperation("+");
    setBitWidth(8);
    setRepMode("unsigned");
    setShiftAmount(2);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. QUICK PRESETS & TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Presets:
          </span>
          <button
            onClick={() => applyPreset("add")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
          >
            Addition (+)
          </button>
          <button
            onClick={() => applyPreset("sub")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
          >
            Subtraction (-)
          </button>
          <button
            onClick={() => applyPreset("and")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
          >
            Bitwise AND
          </button>
          <button
            onClick={() => applyPreset("xor")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
          >
            Bitwise XOR
          </button>
          <button
            onClick={() => applyPreset("shift")}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-300 cursor-pointer transition-colors"
          >
            Left Shift (&lt;&lt;)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSwap}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors flex items-center gap-1"
            title="Swap Inputs A and B"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" /> Swap A ↔ B
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors flex items-center gap-1"
            title="Reset Inputs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" /> Reset
          </button>
        </div>
      </div>

      {/* 2. MAIN SPLIT-PANE INTERFACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: INPUT CONTROLS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Binary & Bitwise Inputs
            </h2>

            {/* BIT WIDTH & SIGNED REPRESENTATION MODE */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Bit Register Size
                </label>
                <select
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
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Signed Representation
                </label>
                <select
                  value={repMode}
                  onChange={(e) => setRepMode(e.target.value as RepMode)}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="unsigned">Unsigned Binary</option>
                  <option value="twos">Signed 2&apos;s Complement</option>
                </select>
              </div>
            </div>

            {/* ARITHMETIC / BITWISE OPERATION SELECTOR */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Operation / Bitwise Function
              </label>
              <div className="grid grid-cols-5 gap-1.5 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                {(["+", "-", "*", "/", "AND", "OR", "XOR", "NOT", "<<", ">>"] as Operation[]).map((op) => (
                  <button
                    key={op}
                    onClick={() => setOperation(op)}
                    className={`py-1.5 rounded-lg cursor-pointer transition-all ${
                      operation === op ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300 hover:bg-slate-300/50"
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
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  First Input (A)
                </label>
                <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => { setInputAMode("bin"); setInputA("10101010"); }}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${inputAMode === "bin" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    Binary
                  </button>
                  <button
                    type="button"
                    onClick={() => { setInputAMode("dec"); setInputA("170"); }}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${inputAMode === "dec" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                  >
                    Decimal
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={inputA}
                onChange={(e) => setInputA(e.target.value)}
                placeholder={inputAMode === "dec" ? "e.g. 170" : "e.g. 10101010"}
                className={`w-full h-10 px-3 rounded-xl border ${
                  isValidA ? "border-slate-300 dark:border-slate-700" : "border-amber-500 ring-1 ring-amber-500"
                } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600`}
              />
              {inputAMode === "dec" && isValidA && (
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 block font-sans tabular-nums">
                  Binary Equivalence: {cleanA}
                </span>
              )}
            </div>

            {/* INPUT B (or Shift Amount) */}
            {operation !== "NOT" && operation !== "<<" && operation !== ">>" && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Second Input (B)
                  </label>
                  <div className="flex items-center gap-1 bg-slate-200/70 dark:bg-slate-800 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => { setInputBMode("bin"); setInputB("00001111"); }}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-all ${inputBMode === "bin" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                    >
                      Binary
                    </button>
                    <button
                      type="button"
                      onClick={() => { setInputBMode("dec"); setInputB("15"); }}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-all ${inputBMode === "dec" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                    >
                      Decimal
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={inputB}
                  onChange={(e) => setInputB(e.target.value)}
                  placeholder={inputBMode === "dec" ? "e.g. 15" : "e.g. 00001111"}
                  className={`w-full h-10 px-3 rounded-xl border ${
                    isValidB ? "border-slate-300 dark:border-slate-700" : "border-amber-500 ring-1 ring-amber-500"
                  } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {inputBMode === "dec" && isValidB && (
                  <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 block font-sans tabular-nums">
                    Binary Equivalence: {cleanB}
                  </span>
                )}
              </div>
            )}

            {(operation === "<<" || operation === ">>") && (
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Bit Shift Count (positions)
                </label>
                <input
                  type="number"
                  min={1}
                  max={bitWidth}
                  value={shiftAmount}
                  onChange={(e) => setShiftAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm"
                />
              </div>
            )}

            {/* BIT GROUPING FORMATTER SELECTOR */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Display Bit Grouping
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <button
                  onClick={() => setGrouping(0)}
                  className={`py-1.5 rounded-lg border cursor-pointer ${
                    grouping === 0 ? "bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-600" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Continuous
                </button>
                <button
                  onClick={() => setGrouping(4)}
                  className={`py-1.5 rounded-lg border cursor-pointer ${
                    grouping === 4 ? "bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-600" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  4-Bit (Nibbles)
                </button>
                <button
                  onClick={() => setGrouping(8)}
                  className={`py-1.5 rounded-lg border cursor-pointer ${
                    grouping === 8 ? "bg-blue-50 dark:bg-blue-950/50 border-blue-600 text-blue-600" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  8-Bit (Bytes)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-BASE LIVE CONVERTER & STEP BREAKDOWN */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* HERO RESULT DISPLAY */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Calculated Binary Result ({bitWidth}-Bit Register)
                </span>
                <button
                  type="button"
                  onClick={handleSaveResult}
                  className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                >
                  <Bookmark className="w-3 h-3" />
                  <span>{justSaved ? "Saved!" : "Save"}</span>
                </button>
              </div>

              {calculation.error ? (
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {calculation.error}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                    {calculation.multiBaseRes?.binGrouped}
                  </div>

                  {calculation.multiBaseRem && (
                    <div className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 p-2.5 rounded-xl border border-blue-200 dark:border-blue-900/50">
                      Remainder: {calculation.multiBaseRem.binGrouped} (Decimal {calculation.multiBaseRem.decStr})
                    </div>
                  )}

                  {/* INSTANT MULTI-BASE CONVERTER GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold pt-1">
                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Decimal (Base-10)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{calculation.multiBaseRes?.decStr}</span>
                    </div>

                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Hexadecimal (Base-16)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">0x{calculation.multiBaseRes?.hexRaw}</span>
                    </div>

                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Octal (Base-8)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">0o{calculation.multiBaseRes?.octRaw}</span>
                    </div>

                    <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">ASCII Text</span>
                      <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{calculation.multiBaseRes?.asciiChar}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STEP-BY-STEP BREAKDOWN */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Execution Breakdown
              </h3>

              {!calculation.error && calculation.steps && (
                <div className="space-y-2 text-xs font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                  {calculation.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
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

      {/* DEDICATED DECIMAL TO BINARY CONVERTER & STEP DERIVATION */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-blue-600" />
          <span>Decimal to Binary Converter & Step-by-Step Derivation</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-4 space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Decimal Number (Base-10 Integer)
            </label>
            <input
              type="number"
              value={decInput}
              onChange={(e) => setDecInput(e.target.value)}
              placeholder="e.g. 255"
              className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="pt-2 space-y-1.5 text-xs font-bold">
              <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/40 p-2 rounded-lg border border-blue-200 dark:border-blue-900/50">
                <span className="text-slate-600 dark:text-slate-300">Binary (Base-2):</span>
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums font-extrabold">{decToBinSteps.binResult || "0"}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                <span className="text-slate-500">Hexadecimal:</span>
                <span className="text-slate-900 dark:text-slate-100 font-sans tabular-nums">{decToBinSteps.hexResult || "0x0"}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                <span className="text-slate-500">Octal:</span>
                <span className="text-slate-900 dark:text-slate-100 font-sans tabular-nums">{decToBinSteps.octResult || "0o0"}</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Division by 2 Step-by-Step Algorithm
            </span>
            {decToBinSteps.steps && (
              <div className="space-y-1 text-xs font-sans tabular-nums bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60 max-h-52 overflow-y-auto">
                {decToBinSteps.steps.map((step, idx) => (
                  <div key={idx} className="text-slate-800 dark:text-slate-200 font-medium py-0.5">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">{idx + 1}.</span> {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SAVED CALCULATIONS HISTORY */}
      {savedItems.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>Saved Calculations ({savedItems.length})</span>
            </h3>
            <button
              type="button"
              onClick={handleClearAllSaved}
              className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {savedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs"
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{item.title}</span>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 truncate font-sans tabular-nums">
                    {item.expression} &rarr; <strong className="text-blue-600 dark:text-blue-400">{item.result}</strong>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteSaved(item.id)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer shrink-0"
                  title="Delete saved calculation"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BinaryCalculator;
