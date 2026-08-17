"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, ArrowRightLeft, Sparkles, HelpCircle, RefreshCw, Layers, History, Eye, Bookmark, Trash2, ChevronDown, ChevronUp } from "lucide-react";

type HexOperator = "+" | "-" | "*" | "/" | "MOD" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>" | ">>>";
type BitWidth = 8 | 16 | 32 | 64;

export interface SavedHexItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
}

export function HexCalculator() {
  const [inputA, setInputA] = useState<string>("8AB");
  const [inputB, setInputB] = useState<string>("B78");
  const [operator, setOperator] = useState<HexOperator>("+");
  const [bitWidth, setBitWidth] = useState<BitWidth>(32);
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const [activeInputSlot, setActiveInputSlot] = useState<"A" | "B">("A");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Card 2: Hex & Multi-Base Converter State
  const [baseInput, setBaseInput] = useState<string>("FF");
  const [sourceBase, setSourceBase] = useState<number>(16);
  const [targetBase, setTargetBase] = useState<number>(10);

  // Saved calculations state for Card 1 (Hex Operations)
  const [savedHexItems, setSavedHexItems] = useState<SavedHexItem[]>([]);
  const [justSaved, setJustSaved] = useState<boolean>(false);

  // Saved calculations state for Card 2 (Hex & Multi-Base Conversions)
  const [savedDecItems, setSavedDecItems] = useState<SavedHexItem[]>([]);
  const [justSavedDec, setJustSavedDec] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedHex = localStorage.getItem("saved_hex_calculations");
      if (storedHex) setSavedHexItems(JSON.parse(storedHex));

      const storedDec = localStorage.getItem("saved_hex_conversions");
      if (storedDec) setSavedDecItems(JSON.parse(storedDec));
    } catch (e) {}
  }, []);

  // Clean hex string (strip 0x, spaces)
  const cleanHex = (val: string) => val.replace(/^0x/i, "").replace(/\s+/g, "").toUpperCase();

  const cleanA = cleanHex(inputA);
  const cleanB = cleanHex(inputB);

  // Input Validation
  const isHexValid = (val: string) => /^[0-9A-Fa-f.]*$/.test(cleanHex(val));

  const isValidA = isHexValid(inputA) && cleanA.length > 0;
  const isValidB = isHexValid(inputB) && (operator === "NOT" || cleanB.length > 0);

  // Color Swatch Detector (3, 6, or 8 hex characters)
  const colorSwatch = useMemo(() => {
    const raw = cleanA;
    if (raw.length === 3) {
      const r = parseInt(raw[0] + raw[0], 16);
      const g = parseInt(raw[1] + raw[1], 16);
      const b = parseInt(raw[2] + raw[2], 16);
      return { css: `#${raw}`, rgb: `rgb(${r}, ${g}, ${b})`, hexFormatted: `#${raw.toUpperCase()}` };
    } else if (raw.length === 6) {
      const r = parseInt(raw.slice(0, 2), 16);
      const g = parseInt(raw.slice(2, 4), 16);
      const b = parseInt(raw.slice(4, 6), 16);
      return { css: `#${raw}`, rgb: `rgb(${r}, ${g}, ${b})`, hexFormatted: `#${raw.toUpperCase()}` };
    } else if (raw.length === 8) {
      const r = parseInt(raw.slice(0, 2), 16);
      const g = parseInt(raw.slice(2, 4), 16);
      const b = parseInt(raw.slice(4, 6), 16);
      const a = (parseInt(raw.slice(6, 8), 16) / 255).toFixed(2);
      return { css: `#${raw.slice(0, 6)}`, rgb: `rgba(${r}, ${g}, ${b}, ${a})`, hexFormatted: `#${raw.toUpperCase()}` };
    }
    return null;
  }, [cleanA]);

  // IEEE 754 32-bit Single Precision Float Decoder
  const ieee754Float = useMemo(() => {
    if (cleanA.length !== 8 || !/^[0-9A-F]{8}$/.test(cleanA)) return null;
    try {
      const intVal = parseInt(cleanA, 16);
      const buffer = new ArrayBuffer(4);
      const view = new DataView(buffer);
      view.setUint32(0, intVal, false);
      const floatVal = view.getFloat32(0, false);

      const signBit = (intVal >> 31) & 1;
      const exponentBits = (intVal >> 23) & 0xFF;
      const mantissaBits = intVal & 0x7FFFFF;

      const binStr = intVal.toString(2).padStart(32, "0");

      return {
        floatVal,
        signBit,
        exponentBits,
        exponentDec: exponentBits - 127,
        mantissaBits: mantissaBits.toString(16).toUpperCase(),
        binStr: `${binStr[0]} ${binStr.slice(1, 9)} ${binStr.slice(9)}`
      };
    } catch (e) {
      return null;
    }
  }, [cleanA]);

  // Convert Hex to Multi-Base Formats
  const parseHexToMultiBase = (hexStr: string, width: BitWidth, signed: boolean) => {
    if (!hexStr) return { hex: "0", dec: "0", bin: "0", oct: "0", ascii: "N/A" };
    try {
      if (hexStr.includes(".")) {
        const [intPart, fracPart] = hexStr.split(".");
        const intDec = parseInt(intPart || "0", 16);
        let fracDec = 0;
        for (let i = 0; i < fracPart.length; i++) {
          fracDec += parseInt(fracPart[i], 16) / Math.pow(16, i + 1);
        }
        const totalDec = intDec + fracDec;
        return {
          hex: hexStr.toUpperCase(),
          dec: totalDec.toString(),
          bin: intDec.toString(2) + "." + Math.round(fracDec * 256).toString(2),
          oct: intDec.toString(8),
          ascii: "N/A"
        };
      }

      const bigVal = BigInt(`0x${hexStr}`);
      const mask = (1n << BigInt(width)) - 1n;
      const uVal = bigVal & mask;

      let decValStr = uVal.toString();
      if (signed) {
        const msbMask = 1n << BigInt(width - 1);
        if ((uVal & msbMask) !== 0n) {
          const sVal = uVal - (1n << BigInt(width));
          decValStr = sVal.toString();
        }
      }

      const binRaw = uVal.toString(2).padStart(width, "0");
      const binGrouped = binRaw.match(/.{1,4}/g)?.join(" ") || binRaw;
      const octRaw = uVal.toString(8);
      const hexRaw = uVal.toString(16).toUpperCase().padStart(width / 4, "0");

      let asciiChar = "N/A";
      const charCode = Number(uVal);
      if (charCode >= 32 && charCode <= 126) {
        asciiChar = `'${String.fromCharCode(charCode)}'`;
      }

      return {
        hex: hexRaw,
        dec: decValStr,
        bin: binGrouped,
        oct: octRaw,
        ascii: asciiChar
      };
    } catch (e) {
      return { hex: "0", dec: "0", bin: "0", oct: "0", ascii: "N/A" };
    }
  };

  // Main Calculation Engine & Step Breakdown
  const calculation = useMemo(() => {
    if (!isValidA || !isValidB) {
      return { error: "Please enter valid Hexadecimal values (0-9, A-F)." };
    }

    try {
      const aBig = BigInt(`0x${cleanA}`);
      const bBig = cleanB ? BigInt(`0x${cleanB}`) : 0n;
      const mask = (1n << BigInt(bitWidth)) - 1n;

      let resBig = 0n;
      let remainderBig: bigint | null = null;
      const steps: string[] = [];

      const aDec = aBig.toString();
      const bDec = bBig.toString();

      if (operator === "+") {
        resBig = (aBig + bBig) & mask;
        steps.push(`Hex Addition: 0x${cleanA} + 0x${cleanB}`);
        steps.push(`Decimal Equivalence: ${aDec} + ${bDec} = ${(aBig + bBig).toString()}`);

        const maxLen = Math.max(cleanA.length, cleanB.length);
        const padA = cleanA.padStart(maxLen, "0");
        const padB = cleanB.padStart(maxLen, "0");
        let carry = 0;
        const carryArr: string[] = [];
        const resDigits: string[] = [];

        for (let i = maxLen - 1; i >= 0; i--) {
          const dA = parseInt(padA[i], 16);
          const dB = parseInt(padB[i], 16);
          const sum = dA + dB + carry;
          resDigits.unshift((sum % 16).toString(16).toUpperCase());
          carry = Math.floor(sum / 16);
          carryArr.unshift(carry.toString(16).toUpperCase());
        }
        if (carry > 0) resDigits.unshift(carry.toString(16).toUpperCase());

        steps.push(`Hex Column Carry Chain: [${carryArr.join(" ")}]`);
        steps.push(`Resulting Hex Stream: 0x${resDigits.join("")}`);

      } else if (operator === "-") {
        resBig = (aBig - bBig) & mask;
        steps.push(`Hex Subtraction: 0x${cleanA} - 0x${cleanB}`);
        steps.push(`Decimal Equivalence: ${aDec} - ${bDec} = ${(aBig - bBig).toString()}`);
        steps.push(`16-Base Borrow Breakdown: When a lower column digit is smaller, borrow 16₁₀ (0x10) from the higher column.`);

      } else if (operator === "*") {
        resBig = (aBig * bBig) & mask;
        steps.push(`Hex Multiplication: 0x${cleanA} × 0x${cleanB}`);
        steps.push(`Decimal Equivalence: ${aDec} × ${bDec} = ${(aBig * bBig).toString()}`);

      } else if (operator === "/") {
        if (bBig === 0n) return { error: "Division by zero (0x0) is undefined." };
        resBig = aBig / bBig;
        remainderBig = aBig % bBig;
        steps.push(`Hex Division: 0x${cleanA} ÷ 0x${cleanB}`);
        steps.push(`Quotient Hex: 0x${resBig.toString(16).toUpperCase()}`);
        steps.push(`Remainder Hex: 0x${remainderBig.toString(16).toUpperCase()}`);
        steps.push(`Decimal Equivalence: ${aDec} ÷ ${bDec} = ${resBig.toString()} (Rem: ${remainderBig.toString()})`);

      } else if (operator === "MOD") {
        if (bBig === 0n) return { error: "Modulo by zero is undefined." };
        resBig = aBig % bBig;
        steps.push(`Hex Modulo: 0x${cleanA} MOD 0x${cleanB} = 0x${resBig.toString(16).toUpperCase()}`);

      } else if (operator === "AND") {
        resBig = aBig & bBig;
        steps.push(`Bitwise AND (0x${cleanA} & 0x${cleanB}):`);
        steps.push(`Result Hex: 0x${resBig.toString(16).toUpperCase()}`);

      } else if (operator === "OR") {
        resBig = aBig | bBig;
        steps.push(`Bitwise OR (0x${cleanA} | 0x${cleanB}):`);
        steps.push(`Result Hex: 0x${resBig.toString(16).toUpperCase()}`);

      } else if (operator === "XOR") {
        resBig = aBig ^ bBig;
        steps.push(`Bitwise XOR (0x${cleanA} ^ 0x${cleanB}):`);
        steps.push(`Result Hex: 0x${resBig.toString(16).toUpperCase()}`);

      } else if (operator === "NOT") {
        resBig = (~aBig) & mask;
        steps.push(`Bitwise NOT (~0x${cleanA}): Inverts all bits in ${bitWidth}-bit register.`);
        steps.push(`Result Hex: 0x${resBig.toString(16).toUpperCase()}`);

      } else if (operator === "<<") {
        const shift = bBig > 64n ? 64n : bBig;
        resBig = (aBig << shift) & mask;
        steps.push(`Left Bitwise Shift (0x${cleanA} << ${bBig}):`);
        steps.push(`Result Hex: 0x${resBig.toString(16).toUpperCase()}`);

      } else if (operator === ">>") {
        const shift = bBig > 64n ? 64n : bBig;
        resBig = (aBig >> shift) & mask;
        steps.push(`Right Bitwise Shift (0x${cleanA} >> ${bBig}):`);
        steps.push(`Result Hex: 0x${resBig.toString(16).toUpperCase()}`);
      }

      const multiBaseA = parseHexToMultiBase(cleanA, bitWidth, isSigned);
      const multiBaseB = parseHexToMultiBase(cleanB, bitWidth, isSigned);
      const multiBaseRes = parseHexToMultiBase(resBig.toString(16), bitWidth, isSigned);

      return {
        resBig,
        resHex: resBig.toString(16).toUpperCase(),
        multiBaseA,
        multiBaseB,
        multiBaseRes,
        steps
      };
    } catch (e) {
      return { error: "Calculation overflow or invalid hex string." };
    }
  }, [cleanA, cleanB, operator, bitWidth, isSigned]);

  // Card 2: Multi-Base Conversion & Derivation Generator
  const baseConversionResult = useMemo(() => {
    const raw = baseInput.trim();
    if (!raw) return { error: "Please enter a valid number.", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };

    try {
      let decVal = 0n;
      if (sourceBase === 10) {
        decVal = BigInt(raw);
      } else if (sourceBase === 16) {
        const cleanH = raw.replace(/^0x/i, "");
        if (!/^[0-9a-f]+$/i.test(cleanH)) return { error: "Invalid Hexadecimal string (0-9, A-F).", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
        decVal = BigInt(`0x${cleanH}`);
      } else if (sourceBase === 2) {
        if (!/^[01]+$/i.test(raw)) return { error: "Invalid Binary string (0-1 only).", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
        decVal = BigInt(`0b${raw}`);
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

      const hexResult = `0x${uVal.toString(16).toUpperCase()}`;
      const binRaw = uVal.toString(2).padStart(bitWidth, "0");
      const binResult = binRaw.replace(/(.{4})/g, "$1 ").trim();
      const octResult = `0o${uVal.toString(8)}`;
      const decResult = decVal.toString();
      const targetResult = uVal.toString(targetBase).toUpperCase();

      const stepLines: string[] = [];
      stepLines.push(`Converting Base-${sourceBase} input (${raw}) to Decimal Base-10 &rarr; ${decVal.toString()}`);
      stepLines.push(`Converting Decimal ${decVal.toString()} to Target Base-${targetBase}:`);

      let n = Number(uVal);
      if (n > 0 && n <= 1000000000) {
        const remainders: string[] = [];
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
        hexResult,
        binResult,
        octResult,
        decResult,
        targetResult,
        steps: stepLines,
        error: null
      };
    } catch (err) {
      return { error: "Invalid number format for selected base.", binResult: "", hexResult: "", octResult: "", decResult: "", targetResult: "", steps: [] };
    }
  }, [baseInput, sourceBase, targetBase, bitWidth]);

  // Card 1 Save Handler
  const handleSaveResult = () => {
    if (calculation.error || !calculation.resHex) return;

    let inputsStr = `A: 0x${cleanA}, B: 0x${cleanB} (${bitWidth}-Bit Word)`;
    let opStr = `Operation: ${operator} (${isSigned ? "Signed 2's Comp" : "Unsigned"})`;
    if (operator === "NOT") {
      inputsStr = `A: 0x${cleanA} (${bitWidth}-Bit Word)`;
      opStr = `Bitwise NOT (~) (${isSigned ? "Signed" : "Unsigned"})`;
    } else if (operator === "<<" || operator === ">>" || operator === ">>>") {
      inputsStr = `A: 0x${cleanA}, Shift: 0x${cleanB} (${bitWidth}-Bit Word)`;
      opStr = `Shift ${operator}`;
    }

    const resList = [
      `Hexadecimal (Base-16) = 0x${calculation.resHex}`,
      `Decimal (Base-10) = ${calculation.multiBaseRes?.dec}`,
      `Binary (Base-2) = ${calculation.multiBaseRes?.bin}`,
      `Octal (Base-8) = 0o${calculation.multiBaseRes?.oct}`,
      `ASCII Character = ${calculation.multiBaseRes?.ascii}`
    ];
    const resStr = resList.join(" | ");

    const newItem: SavedHexItem = {
      id: Date.now().toString(),
      title: "Hexadecimal Operation",
      inputs: inputsStr,
      operation: opStr,
      result: resStr,
      resultsList: resList,
      expression: `0x${cleanA} ${operator} 0x${cleanB}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    };

    const updated = [newItem, ...savedHexItems.filter(item => item.inputs !== inputsStr || item.operation !== opStr)].slice(0, 15);
    setSavedHexItems(updated);
    try {
      localStorage.setItem("saved_hex_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  // Card 2 Save Handler
  const handleSaveDecConversion = () => {
    if (!baseConversionResult || baseConversionResult.error) return;

    const inputsStr = `Source Value: ${baseInput} (Base-${sourceBase})`;
    const opStr = `Conversion: Base-${sourceBase} → Base-${targetBase}`;

    const resList = [
      `Target Base-${targetBase} = ${baseConversionResult.targetResult}`,
      `Hexadecimal (Base-16) = ${baseConversionResult.hexResult}`,
      `Decimal (Base-10) = ${baseConversionResult.decResult}`,
      `Binary (Base-2) = ${baseConversionResult.binResult}`,
      `Octal (Base-8) = ${baseConversionResult.octResult}`
    ];
    const resStr = resList.join(" | ");

    const newItem: SavedHexItem = {
      id: Date.now().toString(),
      title: `Hex & Base Conversion (Base-${sourceBase} to ${targetBase})`,
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
      localStorage.setItem("saved_hex_conversions", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedDec(true);
    setTimeout(() => setJustSavedDec(false), 2000);
  };

  const handleDeleteSavedHex = (id: string) => {
    const updated = savedHexItems.filter(item => item.id !== id);
    setSavedHexItems(updated);
    try {
      localStorage.setItem("saved_hex_calculations", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedHex = () => {
    setSavedHexItems([]);
    try {
      localStorage.removeItem("saved_hex_calculations");
    } catch (e) {}
  };

  const handleDeleteSavedDec = (id: string) => {
    const updated = savedDecItems.filter(item => item.id !== id);
    setSavedDecItems(updated);
    try {
      localStorage.setItem("saved_hex_conversions", JSON.stringify(updated));
    } catch (e) {}
  };

  const handleClearAllSavedDec = () => {
    setSavedDecItems([]);
    try {
      localStorage.removeItem("saved_hex_conversions");
    } catch (e) {}
  };

  // Swap Inputs Handler
  const handleSwap = () => {
    const temp = inputA;
    setInputA(inputB);
    setInputB(temp);
  };

  // Virtual Keypad Insertion
  const handleKeypadPress = (char: string) => {
    if (char === "CLEAR") {
      if (activeInputSlot === "A") setInputA("");
      else setInputB("");
    } else if (char === "BACKSPACE") {
      if (activeInputSlot === "A") setInputA((prev) => prev.slice(0, -1));
      else setInputB((prev) => prev.slice(0, -1));
    } else {
      if (activeInputSlot === "A") setInputA((prev) => prev + char);
      else setInputB((prev) => prev + char);
    }
  };

  const handleCopy = (text: string, key: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (e) {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: HEXADECIMAL CALCULATOR & BITWISE OPERATIONS */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Hexadecimal Calculator &amp; Bitwise Operations</span>
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
            {/* LEFT COLUMN: INPUT CONTROLS & VIRTUAL KEYPAD */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Hexadecimal Inputs &amp; Controls
                </h2>

                {/* BIT REGISTER SIZE & SIGNED MODE */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Word Register Size
                    </label>
                    <select
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Representation
                    </label>
                    <select
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
                  <div className="grid grid-cols-6 gap-1 bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                    {(["+", "-", "*", "/", "MOD", "AND", "OR", "XOR", "NOT", "<<", ">>", ">>>"] as HexOperator[]).map((op) => (
                      <button
                        key={op}
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
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      Hex Input A {activeInputSlot === "A" && <span className="text-[10px] text-blue-600 font-extrabold">(Active)</span>}
                    </label>
                    {!isValidA && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                        Invalid Hex (Use 0-9, A-F)
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={inputA}
                    onChange={(e) => setInputA(e.target.value)}
                    placeholder="e.g. 8AB or 0x8AB"
                    className={`w-full h-10 px-3 rounded-xl border ${
                      activeInputSlot === "A" ? "border-blue-600 ring-2 ring-blue-600/30" : "border-slate-300 dark:border-slate-700"
                    } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none`}
                  />
                </div>

                {/* SWAP BUTTON BETWEEN INPUT A & INPUT B */}
                {operator !== "NOT" && (
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

                {/* INPUT B */}
                {operator !== "NOT" && (
                  <div onClick={() => setActiveInputSlot("B")}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        Hex Input B {activeInputSlot === "B" && <span className="text-[10px] text-blue-600 font-extrabold">(Active)</span>}
                      </label>
                      {!isValidB && (
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                          Invalid Hex (Use 0-9, A-F)
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={inputB}
                      onChange={(e) => setInputB(e.target.value)}
                      placeholder="e.g. B78 or 0xB78"
                      className={`w-full h-10 px-3 rounded-xl border ${
                        activeInputSlot === "B" ? "border-blue-600 ring-2 ring-blue-600/30" : "border-slate-300 dark:border-slate-700"
                      } bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none`}
                    />
                  </div>
                )}

                {/* ON-SCREEN HEX VIRTUAL KEYPAD */}
                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                    On-Screen Hex Keypad (Slot {activeInputSlot})
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 font-sans tabular-nums font-extrabold text-xs">
                    {["A", "B", "C", "D", "E", "F", "7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((k) => (
                      <button
                        key={k}
                        onClick={() => handleKeypadPress(k)}
                        className="py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-300 cursor-pointer transition-colors active:scale-95 shadow-xs"
                      >
                        {k}
                      </button>
                    ))}
                    <button
                      onClick={() => handleKeypadPress("CLEAR")}
                      className="py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 font-bold hover:bg-amber-100 cursor-pointer"
                    >
                      CLR
                    </button>
                    <button
                      onClick={() => handleKeypadPress("BACKSPACE")}
                      className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-300 cursor-pointer col-span-3"
                    >
                      ⌫ Backspace
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD, COLOR PREVIEW, IEEE 754, & STEPS */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                {/* HERO RESULT DISPLAY */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Calculated Hex Result ({bitWidth}-Bit Word)
                    </span>
                    <button
                      onClick={() => handleCopy(calculation.resHex || "", "res")}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      {copiedKey === "res" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                      <span>{copiedKey === "res" ? "Copied!" : "Copy Result"}</span>
                    </button>
                  </div>

                  {calculation.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {calculation.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        0x{calculation.resHex}
                      </div>

                      {/* REAL-TIME MULTI-BASE SYNCHRONIZATION MATRIX */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold pt-1">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Decimal (Base-10)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{calculation.multiBaseRes?.dec}</span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Binary (Base-2)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 break-all">{calculation.multiBaseRes?.bin}</span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Octal (Base-8)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">0o{calculation.multiBaseRes?.oct}</span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">ASCII Character</span>
                          <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{calculation.multiBaseRes?.ascii}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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

          {/* EMBEDDED SAVED HEX CALCULATIONS INSIDE CARD 1 */}
          {savedHexItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
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
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
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
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedHex(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        {/* EXPAND TOGGLE BUTTON */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {/* EXTENDED DETAILED RESULTS */}
                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Calculated Answers:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
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
      {/* CARD 2: HEX & MULTI-BASE CONVERTER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Hex &amp; Multi-Base Converter</span>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Converter Inputs
              </h2>
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
                    <option value={16}>Hexadecimal (Base 16)</option>
                    <option value={10}>Decimal (Base 10)</option>
                    <option value={2}>Binary (Base 2)</option>
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
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Source Number / Value
                </label>
                <input
                  type="text"
                  value={baseInput}
                  onChange={(e) => setBaseInput(e.target.value)}
                  placeholder={`Enter Base-${sourceBase} number...`}
                  className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE CONVERTED OUTPUT MATRIX & DERIVATION STEPS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Hexadecimal</span>
                      <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400 break-all">{baseConversionResult.hexResult}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Decimal</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{baseConversionResult.decResult}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Binary</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100 break-all">{baseConversionResult.binResult}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Octal</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{baseConversionResult.octResult}</span>
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
                        <div key={idx} className="p-1.5 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED HEX CONVERSIONS INSIDE CARD 2 */}
          {savedDecItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Hex &amp; Base Conversions ({savedDecItems.length})</span>
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
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
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
                        <button
                          type="button"
                          onClick={() => handleDeleteSavedDec(item.id)}
                          className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          title="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Conversion: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        {/* EXPAND TOGGLE BUTTON */}
                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {/* EXTENDED DETAILED RESULTS */}
                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Complete Converted Results:
                            </span>
                            <div className="space-y-1 text-xs font-sans tabular-nums max-h-48 overflow-y-auto">
                              {resParts.map((resLine, idx) => (
                                <div key={idx} className="bg-slate-50 dark:bg-slate-800/80 px-2 py-1 rounded border border-slate-200/60 dark:border-slate-700/60 font-medium text-slate-800 dark:text-slate-200 break-all leading-snug">
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
