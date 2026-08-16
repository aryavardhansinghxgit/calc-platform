"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, ArrowRightLeft, Sparkles, HelpCircle, RefreshCw, Layers, Bookmark, Trash2 } from "lucide-react";

export interface SavedBinaryItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
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
  const [shiftAmount, setShiftAmount] = useState<number>(2);

  // Decimal to Binary & Input format modes
  const [inputAMode, setInputAMode] = useState<"bin" | "dec">("bin");
  const [inputBMode, setInputBMode] = useState<"bin" | "dec">("bin");
  const [baseInput, setBaseInput] = useState<string>("255");
  const [sourceBase, setSourceBase] = useState<number>(10);
  const [targetBase, setTargetBase] = useState<number>(2);

  // Saved calculations state for Card 1 (Binary Operations)
  const [savedBinaryItems, setSavedBinaryItems] = useState<SavedBinaryItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  // Saved calculations state for Card 2 (Multi-Base Conversions)
  const [savedDecItems, setSavedDecItems] = useState<SavedBinaryItem[]>([]);
  const [justSavedDec, setJustSavedDec] = useState<boolean>(false);

  useEffect(() => {
    try {
      const storedBin = localStorage.getItem("saved_binary_calculations");
      if (storedBin) setSavedBinaryItems(JSON.parse(storedBin));

      const storedDec = localStorage.getItem("saved_dec_conversions");
      if (storedDec) setSavedDecItems(JSON.parse(storedDec));
    } catch (e) {}
  }, []);



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
        binGrouped: binRaw.replace(/(.{4})/g, "$1 ").trim(),
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
  }, [cleanA, cleanB, operation, bitWidth, repMode, shiftAmount]);

  // Dedicated Multi-Base Conversion & Step-by-Step Derivation
  const baseConversionResult = useMemo(() => {
    const raw = baseInput.trim();
    if (!raw) return { error: "Please enter a valid number.", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };

    try {
      let decVal = 0n;
      if (sourceBase === 10) {
        decVal = BigInt(raw);
      } else if (sourceBase === 2) {
        if (!/^[01]+$/i.test(raw)) return { error: "Invalid Binary string (0-1 only).", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
        decVal = BigInt(`0b${raw}`);
      } else if (sourceBase === 16) {
        const cleanHex = raw.replace(/^0x/i, "");
        if (!/^[0-9a-f]+$/i.test(cleanHex)) return { error: "Invalid Hexadecimal string (0-9, A-F).", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
        decVal = BigInt(`0x${cleanHex}`);
      } else if (sourceBase === 8) {
        const cleanOct = raw.replace(/^0o/i, "");
        if (!/^[0-7]+$/i.test(cleanOct)) return { error: "Invalid Octal string (0-7 only).", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
        decVal = BigInt(`0o${cleanOct}`);
      } else {
        const parsed = parseInt(raw, sourceBase);
        if (isNaN(parsed)) return { error: `Invalid Base-${sourceBase} input.`, binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
        decVal = BigInt(parsed);
      }

      const mask = (1n << BigInt(bitWidth)) - 1n;
      const uVal = decVal < 0n ? (decVal + (1n << BigInt(bitWidth))) & mask : decVal & mask;

      const binResult = uVal.toString(2).padStart(bitWidth, "0").replace(/(.{4})/g, "$1 ").trim();
      const octResult = `0o${uVal.toString(8)}`;
      const decResult = decVal.toString();
      const hexResult = `0x${uVal.toString(16).toUpperCase()}`;
      const targetResult = uVal.toString(targetBase).toUpperCase();

      // Step-by-step division derivation for targetBase
      let n = Math.abs(Number(uVal));
      const stepLines: string[] = [];
      const remainders: string[] = [];

      if (n === 0) {
        stepLines.push(`0 ÷ ${targetBase} = 0, Remainder 0`);
        stepLines.push(`Final Base-${targetBase} Result: 0`);
      } else {
        const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        while (n > 0) {
          const q = Math.floor(n / targetBase);
          const r = n % targetBase;
          const charR = digits[r];
          stepLines.push(`${n} ÷ ${targetBase} = ${q}, Remainder ${r} (${charR})`);
          remainders.push(charR);
          n = q;
        }
        const convertedRaw = [...remainders].reverse().join("");
        stepLines.push(`Read remainders from bottom to top &rarr; ${convertedRaw} (Base ${targetBase})`);
      }

      return {
        decVal,
        binResult,
        octResult,
        decResult,
        hexResult,
        targetResult,
        steps: stepLines,
        error: null
      };
    } catch (err) {
      return { error: "Invalid number format for selected base.", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
    }
  }, [baseInput, sourceBase, targetBase, bitWidth]);

  const handleSaveDecConversion = () => {
    if (!baseConversionResult || baseConversionResult.error) return;

    const inputsStr = `Source Value: ${baseInput} (Base-${sourceBase})`;
    const opStr = `Conversion: Base-${sourceBase} → Base-${targetBase}`;

    const resList = [
      `Target Base-${targetBase} = ${baseConversionResult.targetResult}`,
      `Binary (Base-2) = ${baseConversionResult.binResult}`,
      `Decimal (Base-10) = ${baseConversionResult.decResult}`,
      `Hexadecimal (Base-16) = ${baseConversionResult.hexResult}`,
      `Octal (Base-8) = ${baseConversionResult.octResult}`
    ];
    const resStr = resList.join(" | ");

    const newItem: SavedBinaryItem = {
      id: Date.now().toString(),
      title: `Base Conversion (Base-${sourceBase} to ${targetBase})`,
      inputs: inputsStr,
      operation: opStr,
      result: resStr,
      resultsList: resList,
      expression: `Base-${sourceBase} (${baseInput}) → Base-${targetBase}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedDecItems.filter(item => item.inputs !== inputsStr || item.operation !== opStr)].slice(0, 15);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_dec_conversions", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedDec(true);
    setTimeout(() => setJustSavedDec(false), 2000);
  };

  const handleSaveResult = () => {
    if (calculation.error || !calculation.multiBaseRes) return;

    let inputsStr = `A: ${inputA}, B: ${inputB} (${bitWidth}-Bit)`;
    let opStr = `Operation: ${operation} (${repMode})`;
    if (operation === "NOT") {
      inputsStr = `A: ${inputA} (${bitWidth}-Bit)`;
      opStr = `Bitwise NOT (~) (${repMode})`;
    } else if (operation === "<<" || operation === ">>") {
      inputsStr = `A: ${inputA}, Shift: ${shiftAmount} (${bitWidth}-Bit)`;
      opStr = `Shift ${operation} (${repMode})`;
    }

    const resList = [
      `Binary (Base-2) = ${calculation.multiBaseRes.binGrouped}`,
      `Decimal (Base-10) = ${calculation.multiBaseRes.decStr}`,
      `Hexadecimal (Base-16) = 0x${calculation.multiBaseRes.hexRaw}`,
      `Octal (Base-8) = 0o${calculation.multiBaseRes.octRaw}`,
      `ASCII Character = ${calculation.multiBaseRes.asciiChar}`
    ];
    if (calculation.multiBaseRem) {
      resList.push(`Remainder = ${calculation.multiBaseRem.binGrouped} (Dec: ${calculation.multiBaseRem.decStr})`);
    }

    const resStr = resList.join(" | ");

    const newItem: SavedBinaryItem = {
      id: Date.now().toString(),
      title: "Binary Operation",
      inputs: inputsStr,
      operation: opStr,
      result: resStr,
      resultsList: resList,
      expression: `${inputA} ${operation} ${inputB}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedBinaryItems.filter(item => item.inputs !== inputsStr || item.operation !== opStr)].slice(0, 15);
    setSavedBinaryItems(updated);
    try {
      localStorage.setItem("saved_binary_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  const handleDeleteSavedBinary = (id: string) => {
    const updated = savedBinaryItems.filter(item => item.id !== id);
    setSavedBinaryItems(updated);
    try {
      localStorage.setItem("saved_binary_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedBinary = () => {
    setSavedBinaryItems([]);
    try {
      localStorage.removeItem("saved_binary_calculations");
    } catch (e) {}
  };

  const handleDeleteSavedDec = (id: string) => {
    const updated = savedDecItems.filter(item => item.id !== id);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_dec_conversions", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedDec = () => {
    setSavedDecItems([]);
    try {
      localStorage.removeItem("saved_dec_conversions");
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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 2. MAIN BINARY CALCULATOR CARD WITH MATCHING THIN BLUE BORDER */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Binary Calculator & Bitwise Operations</span>
          <button
            type="button"
            onClick={handleSaveResult}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSaved ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Binary & Bitwise Inputs
                  </h2>
                </div>

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

            {/* SWAP BUTTON BETWEEN INPUT A AND INPUT B */}
            {operation !== "NOT" && operation !== "<<" && operation !== ">>" && (
              <div className="flex items-center justify-center py-1">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 dark:hover:bg-blue-900/80 cursor-pointer transition-all flex items-center gap-1.5 shadow-xs"
                  title="Swap Inputs A and B"
                >
                  <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Swap A ↔ B
                </button>
              </div>
            )}

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

          </div>
        </div>

        {/* RIGHT COLUMN: MULTI-BASE LIVE CONVERTER & STEP BREAKDOWN */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
            {/* HERO RESULT DISPLAY */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Calculated Binary Result ({bitWidth}-Bit Register)
              </span>

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

        {/* SAVED BINARY CALCULATIONS INSIDE CARD 1 */}
        {savedBinaryItems.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-600" />
                <span>Saved Binary Calculations ({savedBinaryItems.length})</span>
              </h3>
              <button
                type="button"
                onClick={handleClearAllSavedBinary}
                className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {savedBinaryItems.map((item) => {
                const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedBinary(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        <span className="font-extrabold text-slate-500 dark:text-slate-400 block text-[11px]">
                          Complete Results:
                        </span>
                        <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                          {resParts.map((resLine, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                              {resLine}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>

      {/* DEDICATED MULTI-BASE & DECIMAL CONVERTER CARD WITH MATCHING THIN BLUE BORDER */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Multi-Base & Decimal Converter</span>
          <button
            type="button"
            onClick={handleSaveDecConversion}
            className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedDec ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-5 space-y-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Source Base
                </label>
                <select
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
                  <option value={36}>Base 36</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Base
                </label>
                <select
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
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Source Value (Base-{sourceBase})
              </label>
              <input
                type="text"
                value={baseInput}
                onChange={(e) => setBaseInput(e.target.value)}
                placeholder="e.g. 255"
                className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {baseConversionResult?.error ? (
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {baseConversionResult.error}
              </div>
            ) : (
              <div className="pt-1 space-y-1.5 text-xs font-bold">
                <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-950/40 p-2 rounded-lg border border-blue-200 dark:border-blue-900/50">
                  <span className="text-slate-600 dark:text-slate-300">Binary (Base-2):</span>
                  <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums font-extrabold">{baseConversionResult.binResult}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-500">Decimal (Base-10):</span>
                  <span className="text-slate-900 dark:text-slate-100 font-sans tabular-nums">{baseConversionResult.decResult}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-500">Hexadecimal (Base-16):</span>
                  <span className="text-slate-900 dark:text-slate-100 font-sans tabular-nums">{baseConversionResult.hexResult}</span>
                </div>
                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                  <span className="text-slate-500">Octal (Base-8):</span>
                  <span className="text-slate-900 dark:text-slate-100 font-sans tabular-nums">{baseConversionResult.octResult}</span>
                </div>
                <div className="flex justify-between items-center bg-blue-100/70 dark:bg-blue-900/40 p-2 rounded-lg text-blue-900 dark:text-blue-200">
                  <span>Target Base-{targetBase}:</span>
                  <span className="font-sans tabular-nums font-extrabold text-sm">{baseConversionResult.targetResult}</span>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-7 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Division by {targetBase} Step-by-Step Derivation
            </span>
            {baseConversionResult?.steps && (
              <div className="space-y-1 text-xs font-sans tabular-nums bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60 max-h-60 overflow-y-auto">
                {baseConversionResult.steps.map((step, idx) => (
                  <div key={idx} className="text-slate-800 dark:text-slate-200 font-medium py-0.5">
                    <span className="font-bold text-blue-600 dark:text-blue-400 mr-2">{idx + 1}.</span> {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SAVED BASE CONVERSIONS INSIDE CARD 2 */}
        {savedDecItems.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
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
                const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedDec(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                      <div>
                        <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Conversion: </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                        <span className="font-extrabold text-slate-500 dark:text-slate-400 block text-[11px]">
                          Complete Results:
                        </span>
                        <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                          {resParts.map((resLine, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
                              {resLine}
                            </div>
                          ))}
                        </div>
                      </div>
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

export default BinaryCalculator;
