"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Layers,
  ShieldCheck,
  Download,
  Bookmark,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Code2,
  Sparkles,
  Binary
} from "lucide-react";
import {
  addBigInt,
  subtractBigInt,
  multiplyBigInt,
  divideBigInt,
  modBigInt,
  modPowBigInt,
  gcdBigInt,
  lcmBigInt,
  factorialBigInt,
  factorialTrailingZeros,
  permutationsBigInt,
  combinationsBigInt,
  millerRabinTest,
  analyzeDigits,
  formatScientificApprox,
  validateBigIntInput,
  GOOGOLOGY_PRESETS,
  GoogologyPreset
} from "@/app/calculators/big-number-calculator/big-number-logic";

export interface SavedBigNumberItem {
  id: string;
  module: "arith" | "mod" | "fact" | "comb" | "prime" | "digit";
  title: string;
  timestamp: string;
  resultsList: string[];
  // Raw inputs for 100% faithful restoration
  rawX?: string;
  rawY?: string;
  rawOp?: string;
  rawBase?: string;
  rawExponent?: string;
  rawModulus?: string;
  rawN?: string;
  rawCombN?: string;
  rawCombR?: string;
  rawCombOp?: "nPr" | "nCr";
  rawPrimeInput?: string;
}

export function BigNumberCalculator() {
  // Active Navigation Tab for Desktop/Mobile
  const [activeTab, setActiveTab] = useState<"arith" | "mod" | "factComb" | "prime" | "googology" | "digit">("arith");

  // ==========================================
  // Card 1 State: BigInt Arithmetic
  // ==========================================
  const [arithX, setArithX] = useState<string>("1000000000000000000000000000000");
  const [arithY, setArithY] = useState<string>("98765432109876543210987654321");
  const [arithOp, setArithOp] = useState<"add" | "sub" | "mult" | "div" | "mod" | "gcd" | "lcm">("mult");
  const [savedArithItems, setSavedArithItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedArith, setJustSavedArith] = useState<boolean>(false);
  const [copiedArith, setCopiedArith] = useState<boolean>(false);
  const [copiedArithLatex, setCopiedArithLatex] = useState<boolean>(false);

  // ==========================================
  // Card 2 State: Modular Exponentiation
  // ==========================================
  const [modX, setModX] = useState<string>("2");
  const [modY, setModY] = useState<string>("100");
  const [inputMod, setInputMod] = useState<string>("1000000007");
  const [savedModItems, setSavedModItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedMod, setJustSavedMod] = useState<boolean>(false);
  const [copiedMod, setCopiedMod] = useState<boolean>(false);
  const [copiedModLatex, setCopiedModLatex] = useState<boolean>(false);

  // ==========================================
  // Card 3 State: Factorial & Combinatorics
  // ==========================================
  const [factMode, setFactMode] = useState<"factorial" | "combinatorics">("factorial");
  const [nFact, setNFact] = useState<string>("100");
  const [combN, setCombN] = useState<string>("100");
  const [combR, setCombR] = useState<string>("50");
  const [combOp, setCombOp] = useState<"nPr" | "nCr">("nCr");
  const [savedFactItems, setSavedFactItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedFact, setJustSavedFact] = useState<boolean>(false);
  const [copiedFact, setCopiedFact] = useState<boolean>(false);
  const [copiedFactLatex, setCopiedFactLatex] = useState<boolean>(false);

  // ==========================================
  // Card 4 State: Primality Test
  // ==========================================
  const [primeInput, setPrimeInput] = useState<string>("1000000007");
  const [savedPrimeItems, setSavedPrimeItems] = useState<SavedBigNumberItem[]>([]);
  const [justSavedPrime, setJustSavedPrime] = useState<boolean>(false);
  const [copiedPrime, setCopiedPrime] = useState<boolean>(false);

  // ==========================================
  // Card 5 State: Googology Explorer
  // ==========================================
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(4); // Googol default

  // ==========================================
  // Card 6 State: Standalone Digit Inspector
  // ==========================================
  const [digitInspectorInput, setDigitInspectorInput] = useState<string>(
    "93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000"
  );
  const [copiedDigit, setCopiedDigit] = useState<boolean>(false);

  // Expansion toggle state for saved items
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Restore feedback toast
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedArith = localStorage.getItem("saved_bignum_arith");
      if (storedArith) setSavedArithItems(JSON.parse(storedArith));

      const storedMod = localStorage.getItem("saved_bignum_modpow");
      if (storedMod) setSavedModItems(JSON.parse(storedMod));

      const storedFact = localStorage.getItem("saved_bignum_factorial");
      if (storedFact) setSavedFactItems(JSON.parse(storedFact));

      const storedPrime = localStorage.getItem("saved_bignum_primality");
      if (storedPrime) setSavedPrimeItems(JSON.parse(storedPrime));
    } catch {}
  }, []);

  // Generic copy helper
  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      navigator.clipboard.writeText(text);
      setFn(true);
      setTimeout(() => setFn(false), 2000);
    } catch {}
  };

  // Generic download .txt helper
  const handleDownloadTxt = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Generic RFC-4180 CSV Export Helper
  const handleExportCsv = (headers: string[], rows: (string | number)[][], filename: string) => {
    const escapeCell = (cell: string | number) => {
      const str = String(cell);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const csvContent = [
      headers.map(escapeCell).join(","),
      ...rows.map((row) => row.map(escapeCell).join(","))
    ].join("\r\n");

    const element = document.createElement("a");
    const file = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // ==========================================
  // CARD 1: ARITHMETIC CALCULATION
  // ==========================================
  const { arithResultStr, arithError, arithRemainder, arithLatex } = useMemo(() => {
    try {
      const vx = validateBigIntInput(arithX, "Number X");
      if (!vx.isValid) return { arithError: vx.error };
      const vy = validateBigIntInput(arithY, "Number Y");
      if (!vy.isValid) return { arithError: vy.error };

      let res = "";
      let rem: string | undefined = undefined;
      let latex = "";

      if (arithOp === "add") {
        res = addBigInt(arithX, arithY);
        latex = `${arithX} + ${arithY} = ${res}`;
      } else if (arithOp === "sub") {
        res = subtractBigInt(arithX, arithY);
        latex = `${arithX} - ${arithY} = ${res}`;
      } else if (arithOp === "mult") {
        res = multiplyBigInt(arithX, arithY);
        latex = `${arithX} \\times ${arithY} = ${res}`;
      } else if (arithOp === "div") {
        const d = divideBigInt(arithX, arithY);
        res = d.quotient;
        rem = d.remainder;
        latex = `${arithX} / ${arithY} = ${res} \\text{ R } ${rem}`;
      } else if (arithOp === "mod") {
        res = modBigInt(arithX, arithY);
        latex = `${arithX} \\bmod ${arithY} = ${res}`;
      } else if (arithOp === "gcd") {
        res = gcdBigInt(arithX, arithY);
        latex = `\\operatorname{gcd}(${arithX}, ${arithY}) = ${res}`;
      } else if (arithOp === "lcm") {
        res = lcmBigInt(arithX, arithY);
        latex = `\\operatorname{lcm}(${arithX}, ${arithY}) = ${res}`;
      }

      return { arithResultStr: res, arithRemainder: rem, arithLatex: latex };
    } catch (err: any) {
      return { arithError: err.message || "Arithmetic Calculation Error" };
    }
  }, [arithX, arithY, arithOp]);

  const arithAnalytics = useMemo(() => analyzeDigits(arithResultStr || "0"), [arithResultStr]);
  const arithSciApprox = useMemo(() => formatScientificApprox(arithResultStr || "0"), [arithResultStr]);

  const handleSaveArith = () => {
    if (arithError || !arithResultStr) return;
    const resList = [
      `Exact Result = ${arithResultStr}`,
      `Total Digits = ${arithAnalytics.digitCount}`,
      `Scientific Approx = ${arithSciApprox}`
    ];
    if (arithRemainder !== undefined) resList.push(`Remainder = ${arithRemainder}`);

    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      module: "arith",
      title: `BigInt (${arithOp.toUpperCase()})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      resultsList: resList,
      rawX: arithX,
      rawY: arithY,
      rawOp: arithOp
    };

    const updated = [newItem, ...savedArithItems.filter((i) => i.rawX !== arithX || i.rawY !== arithY || i.rawOp !== arithOp)].slice(0, 15);
    setSavedArithItems(updated);
    try {
      localStorage.setItem("saved_bignum_arith", JSON.stringify(updated));
    } catch {}

    setJustSavedArith(true);
    setTimeout(() => setJustSavedArith(false), 2000);
  };

  const handleRestoreArith = (item: SavedBigNumberItem) => {
    if (!item.rawX || !item.rawY || !item.rawOp) {
      setRestoreNotice("Older saved calculation cannot be restored. Please recalculate it.");
      setTimeout(() => setRestoreNotice(null), 3000);
      return;
    }
    setArithX(item.rawX);
    setArithY(item.rawY);
    setArithOp(item.rawOp as any);
    setActiveTab("arith");
    setRestoreNotice(`Restored BigInt calculation: ${item.rawOp.toUpperCase()}`);
    setTimeout(() => setRestoreNotice(null), 2500);
  };

  // ==========================================
  // CARD 2: MODULAR EXPONENTIATION CALCULATION
  // ==========================================
  const { modResultStr, modError, modLatex } = useMemo(() => {
    try {
      const vb = validateBigIntInput(modX, "Base X");
      if (!vb.isValid) return { modError: vb.error };
      const ve = validateBigIntInput(modY, "Exponent Y");
      if (!ve.isValid) return { modError: ve.error };
      const vm = validateBigIntInput(inputMod, "Modulus M");
      if (!vm.isValid) return { modError: vm.error };

      const res = modPowBigInt(modX, modY, inputMod);
      const latex = `${modX}^{${modY}} \\equiv ${res} \\pmod{${inputMod}}`;
      return { modResultStr: res, modLatex: latex };
    } catch (err: any) {
      return { modError: err.message || "Modular Exponentiation Error" };
    }
  }, [modX, modY, inputMod]);

  const modAnalytics = useMemo(() => analyzeDigits(modResultStr || "0"), [modResultStr]);
  const modSciApprox = useMemo(() => formatScientificApprox(modResultStr || "0"), [modResultStr]);

  const handleSaveMod = () => {
    if (modError || !modResultStr) return;
    const resList = [
      `Exact Remainder = ${modResultStr}`,
      `Total Digits = ${modAnalytics.digitCount}`,
      `Scientific Approx = ${modSciApprox}`
    ];

    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      module: "mod",
      title: `ModPow (mod ${inputMod.length > 10 ? inputMod.substring(0, 10) + "..." : inputMod})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      resultsList: resList,
      rawBase: modX,
      rawExponent: modY,
      rawModulus: inputMod
    };

    const updated = [newItem, ...savedModItems.filter((i) => i.rawBase !== modX || i.rawExponent !== modY || i.rawModulus !== inputMod)].slice(0, 15);
    setSavedModItems(updated);
    try {
      localStorage.setItem("saved_bignum_modpow", JSON.stringify(updated));
    } catch {}

    setJustSavedMod(true);
    setTimeout(() => setJustSavedMod(false), 2000);
  };

  const handleRestoreMod = (item: SavedBigNumberItem) => {
    if (!item.rawBase || !item.rawExponent || !item.rawModulus) {
      setRestoreNotice("Older saved calculation cannot be restored. Please recalculate it.");
      setTimeout(() => setRestoreNotice(null), 3000);
      return;
    }
    setModX(item.rawBase);
    setModY(item.rawExponent);
    setInputMod(item.rawModulus);
    setActiveTab("mod");
    setRestoreNotice("Restored Modular Exponentiation calculation.");
    setTimeout(() => setRestoreNotice(null), 2500);
  };

  // ==========================================
  // CARD 3: FACTORIAL & COMBINATORICS
  // ==========================================
  const { factResultStr, factError, factLatex, factTrailingZerosCount } = useMemo(() => {
    try {
      if (factMode === "factorial") {
        const vn = validateBigIntInput(nFact, "Factorial N");
        if (!vn.isValid) return { factError: vn.error };
        if (vn.value! < 0n) return { factError: "Factorial is undefined for negative integers." };
        if (vn.value! > 5000n) return { factError: "Factorial input capped at 5000 to prevent browser execution lockup." };

        const res = factorialBigInt(vn.value!);
        const zeros = factorialTrailingZeros(vn.value!);
        const latex = `${nFact}! = ${res}`;
        return { factResultStr: res, factLatex: latex, factTrailingZerosCount: zeros };
      } else {
        const vn = validateBigIntInput(combN, "n");
        if (!vn.isValid) return { factError: vn.error };
        const vr = validateBigIntInput(combR, "r");
        if (!vr.isValid) return { factError: vr.error };
        if (vn.value! < 0n || vr.value! < 0n) return { factError: "n and r must be non-negative integers." };
        if (vr.value! > vn.value!) return { factError: "r cannot be strictly greater than n." };

        const res = combOp === "nPr" ? permutationsBigInt(vn.value!, vr.value!) : combinationsBigInt(vn.value!, vr.value!);
        const latex = combOp === "nPr" ? `P(${combN}, ${combR}) = \\frac{${combN}!}{\\left(${combN}-${combR}\\right)!} = ${res}` : `\\binom{${combN}}{${combR}} = \\frac{${combN}!}{${combR}!\\left(${combN}-${combR}\\right)!} = ${res}`;
        return { factResultStr: res, factLatex: latex };
      }
    } catch (err: any) {
      return { factError: err.message || "Computation Error" };
    }
  }, [factMode, nFact, combN, combR, combOp]);

  const factAnalytics = useMemo(() => analyzeDigits(factResultStr || "0"), [factResultStr]);
  const factSciApprox = useMemo(() => formatScientificApprox(factResultStr || "0"), [factResultStr]);

  const handleSaveFact = () => {
    if (factError || !factResultStr) return;
    const resList = [
      `Exact Result = ${factResultStr}`,
      `Total Digits = ${factAnalytics.digitCount}`,
      `Scientific Approx = ${factSciApprox}`
    ];
    if (factMode === "factorial" && factTrailingZerosCount !== undefined) {
      resList.push(`Trailing Zeros = ${factTrailingZerosCount}`);
    }

    const title = factMode === "factorial" ? `Factorial (${nFact}!)` : `${combOp}(${combN}, ${combR})`;
    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      module: factMode === "factorial" ? "fact" : "comb",
      title,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      resultsList: resList,
      rawN: nFact,
      rawCombN: combN,
      rawCombR: combR,
      rawCombOp: combOp
    };

    const updated = [newItem, ...savedFactItems.filter((i) => i.title !== title)].slice(0, 15);
    setSavedFactItems(updated);
    try {
      localStorage.setItem("saved_bignum_factorial", JSON.stringify(updated));
    } catch {}

    setJustSavedFact(true);
    setTimeout(() => setJustSavedFact(false), 2000);
  };

  const handleRestoreFact = (item: SavedBigNumberItem) => {
    if (item.module === "fact" && item.rawN) {
      setFactMode("factorial");
      setNFact(item.rawN);
      setActiveTab("factComb");
      setRestoreNotice(`Restored Factorial: ${item.rawN}!`);
      setTimeout(() => setRestoreNotice(null), 2500);
    } else if (item.module === "comb" && item.rawCombN && item.rawCombR && item.rawCombOp) {
      setFactMode("combinatorics");
      setCombN(item.rawCombN);
      setCombR(item.rawCombR);
      setCombOp(item.rawCombOp);
      setActiveTab("factComb");
      setRestoreNotice(`Restored Combinatorics: ${item.rawCombOp}(${item.rawCombN}, ${item.rawCombR})`);
      setTimeout(() => setRestoreNotice(null), 2500);
    } else {
      setRestoreNotice("Older saved calculation cannot be restored. Please recalculate it.");
      setTimeout(() => setRestoreNotice(null), 3000);
    }
  };

  // ==========================================
  // CARD 4: MILLER-RABIN PRIMALITY TEST
  // ==========================================
  const primalityResult = useMemo(() => {
    return millerRabinTest(primeInput);
  }, [primeInput]);

  const handleSavePrime = () => {
    const resList = [
      `Number = ${primeInput}`,
      `Verdict = ${primalityResult.isPrime ? "PRIME" : "COMPOSITE"}`,
      `Details = ${primalityResult.details}`
    ];

    const newItem: SavedBigNumberItem = {
      id: Date.now().toString(),
      module: "prime",
      title: `Primality (${primeInput.length > 10 ? primeInput.substring(0, 10) + "..." : primeInput})`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      resultsList: resList,
      rawPrimeInput: primeInput
    };

    const updated = [newItem, ...savedPrimeItems.filter((i) => i.rawPrimeInput !== primeInput)].slice(0, 15);
    setSavedPrimeItems(updated);
    try {
      localStorage.setItem("saved_bignum_primality", JSON.stringify(updated));
    } catch {}

    setJustSavedPrime(true);
    setTimeout(() => setJustSavedPrime(false), 2000);
  };

  const handleRestorePrime = (item: SavedBigNumberItem) => {
    if (!item.rawPrimeInput) {
      setRestoreNotice("Older saved record cannot be restored. Please retest the number.");
      setTimeout(() => setRestoreNotice(null), 3000);
      return;
    }
    setPrimeInput(item.rawPrimeInput);
    setActiveTab("prime");
    setRestoreNotice("Restored Primality Test number.");
    setTimeout(() => setRestoreNotice(null), 2500);
  };

  // ==========================================
  // CARD 6: DIGIT INSPECTOR ANALYTICS
  // ==========================================
  const digitAnalytics = useMemo(() => {
    return analyzeDigits(digitInspectorInput);
  }, [digitInspectorInput]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* RESTORE NOTIFICATION BANNER */}
      {restoreNotice && (
        <div className="no-print bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-bold shadow-xs transition-all">
          <RotateCcw className="w-4 h-4 text-emerald-600 animate-spin" />
          <span>{restoreNotice}</span>
        </div>
      )}

      {/* MODULE SELECTOR TABS (Accessible, Clean, Responsive) */}
      <div className="no-print bg-slate-100 dark:bg-slate-800/70 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => setActiveTab("arith")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "arith"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>1. BigInt Arithmetic</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mod")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "mod"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>2. ModPow (Xʸ mod M)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("factComb")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "factComb"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>3. Factorials &amp; Combinatorics</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("prime")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "prime"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>4. Miller-Rabin Primality</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("googology")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "googology"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>5. Googology Presets</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("digit")}
          className={`flex-1 min-w-[120px] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeTab === "digit"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>6. Digit Inspector</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CARD 1: ARBITRARY-PRECISION BIGINT ARITHMETIC ENGINE */}
      {/* ========================================================================= */}
      {(activeTab === "arith" || true) && (
        <div className={`border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid ${activeTab !== "arith" ? "hidden" : ""}`}>
          <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
            <span>Arbitrary-Precision BigInt Arithmetic Engine (X &amp; Y)</span>
            <div className="flex items-center gap-2 no-print">
              <button
                type="button"
                onClick={handleSaveArith}
                aria-label="Save current calculation"
                className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Bookmark className="w-3 h-3 text-white" />
                <span>{justSavedArith ? "Saved!" : "Save"}</span>
              </button>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* INPUTS */}
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-4 shadow-xs">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Input Massive Integers</span>
                </h2>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="arith-input-x" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Number X (Supports Thousands of Digits):
                    </label>
                    <textarea
                      id="arith-input-x"
                      rows={3}
                      value={arithX}
                      onChange={(e) => setArithX(e.target.value)}
                      placeholder="Enter integer X..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <label htmlFor="arith-input-y" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Number Y:
                    </label>
                    <textarea
                      id="arith-input-y"
                      rows={2}
                      value={arithY}
                      onChange={(e) => setArithY(e.target.value)}
                      placeholder="Enter integer Y..."
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              {/* OUTPUT DISPLAY */}
              <div className="md:col-span-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 space-y-4 shadow-xs">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Exact Arbitrary-Precision Output
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {arithAnalytics.digitCount} Digits
                    </span>
                  </div>

                  {arithError ? (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs font-bold">
                      {arithError}
                    </div>
                  ) : (
                    <>
                      <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 max-h-36 overflow-y-auto font-mono text-xs font-bold text-slate-900 dark:text-slate-100 break-all select-all">
                        {arithResultStr}
                      </div>
                      {arithRemainder !== undefined && (
                        <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                          Remainder R: {arithRemainder}
                        </p>
                      )}

                      <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Total Digits</span>
                          <span className="font-mono text-slate-900 dark:text-slate-100">{arithAnalytics.digitCount}</span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-center space-y-0.5">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Approx (Sci)</span>
                          <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{arithSciApprox}</span>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-wrap gap-2 pt-1 no-print">
                        <button
                          type="button"
                          onClick={() => handleCopy(arithResultStr || "", setCopiedArith)}
                          aria-label="Copy full calculation result"
                          className="flex-1 min-w-[130px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {copiedArith ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                          <span>{copiedArith ? "Copied!" : "Copy Result"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleCopy(arithLatex || "", setCopiedArithLatex)}
                          aria-label="Copy result as LaTeX"
                          className="flex-1 min-w-[130px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          {copiedArithLatex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-blue-600" />}
                          <span>{copiedArithLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadTxt(arithResultStr || "", `big_int_result_${arithAnalytics.digitCount}_digits.txt`)}
                          aria-label="Download calculation as text file"
                          className="flex-1 min-w-[130px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-blue-600" />
                          <span>Download .txt</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleExportCsv(
                              ["Module", "Operation", "Input X", "Input Y", "Exact Result", "Digits", "Approx Sci"],
                              [["BigInt Arithmetic", arithOp, arithX, arithY, arithResultStr || "", arithAnalytics.digitCount, arithSciApprox]],
                              `bignum_arithmetic_${arithOp}.csv`
                            )
                          }
                          aria-label="Export calculation as CSV"
                          className="flex-1 min-w-[130px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* ARITHMETIC OP BUTTONS */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-3 shadow-xs no-print">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Select Arithmetic Operation
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {[
                  { id: "mult", label: "X × Y" },
                  { id: "add", label: "X + Y" },
                  { id: "sub", label: "X - Y" },
                  { id: "div", label: "X / Y" },
                  { id: "mod", label: "X mod Y" },
                  { id: "gcd", label: "GCD(X, Y)" },
                  { id: "lcm", label: "LCM(X, Y)" }
                ].map((op) => (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => setArithOp(op.id as any)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      arithOp === op.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400"
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SAVED BIGINT ARITHMETIC (WITH RESTORE) */}
            {savedArithItems.length > 0 && (
              <div className="no-print bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-blue-600" />
                    <span>Saved BigInt Calculations ({savedArithItems.length})</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setSavedArithItems([]);
                      try {
                        localStorage.removeItem("saved_bignum_arith");
                      } catch {}
                    }}
                    aria-label="Clear all saved calculations"
                    className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {savedArithItems.map((item) => {
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
                              onClick={() => handleRestoreArith(item)}
                              className="text-slate-500 hover:text-blue-600 p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                              title="Restore calculation into inputs"
                              aria-label="Restore saved calculation"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                              <span>Restore</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = savedArithItems.filter((i) => i.id !== item.id);
                                setSavedArithItems(updated);
                                try {
                                  localStorage.setItem("saved_bignum_arith", JSON.stringify(updated));
                                } catch {}
                              }}
                              className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                              title="Delete saved calculation"
                              aria-label="Delete saved calculation"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                          <div>
                            <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                            <span className="font-semibold text-slate-900 dark:text-slate-100 truncate block">
                              X ({item.rawX ? item.rawX.length : 0}d), Y ({item.rawY ? item.rawY.length : 0}d)
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => toggleExpand(item.id)}
                            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                          </button>

                          {isExpanded && (
                            <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                              <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                                Saved Results:
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
      )}

      {/* ========================================================================= */}
      {/* CARD 2: MODULAR EXPONENTIATION SOLVER (X^Y mod M) */}
      {/* ========================================================================= */}
      <div className={`border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid ${activeTab !== "mod" ? "hidden" : ""}`}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Modular Exponentiation Solver (Xʸ mod M)</span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handleSaveMod}
              aria-label="Save modular exponentiation"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedMod ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Modular Power Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label htmlFor="mod-input-base" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Base X:
                  </label>
                  <input
                    id="mod-input-base"
                    type="text"
                    value={modX}
                    onChange={(e) => setModX(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="mod-input-exponent" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Exponent Y:
                  </label>
                  <input
                    id="mod-input-exponent"
                    type="text"
                    value={modY}
                    onChange={(e) => setModY(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="mod-input-modulus" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Modulus M (X^Y mod M):
                  </label>
                  <input
                    id="mod-input-modulus"
                    type="text"
                    value={inputMod}
                    onChange={(e) => setInputMod(e.target.value)}
                    placeholder="e.g. 1000000007"
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Exact Remainder (X^Y mod M)
                  </span>
                  {modError ? (
                    <p className="text-xs font-bold text-rose-500">{modError}</p>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-mono font-extrabold text-slate-900 dark:text-slate-100 break-all select-all">
                      {modResultStr}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Digits</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{modAnalytics.digitCount}</span>
                  </div>

                  <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">Approx (Sci)</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 truncate block">{modSciApprox}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 no-print">
                  <button
                    type="button"
                    onClick={() => handleCopy(modResultStr || "", setCopiedMod)}
                    aria-label="Copy modular result"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedMod ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedMod ? "Copied!" : "Copy Mod Result"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(modLatex || "", setCopiedModLatex)}
                    aria-label="Copy result as LaTeX"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedModLatex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedModLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleExportCsv(
                        ["Module", "Base X", "Exponent Y", "Modulus M", "Exact Remainder", "Digits", "Approx Sci"],
                        [["Modular Exponentiation", modX, modY, inputMod, modResultStr || "", modAnalytics.digitCount, modSciApprox]],
                        `mod_pow_${modX}_exp_${modY}.csv`
                      )
                    }
                    aria-label="Export modular calculation as CSV"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED MODULAR EXPONENTIATION (WITH RESTORE) */}
          {savedModItems.length > 0 && (
            <div className="no-print bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Modular Exponentiation ({savedModItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedModItems([]);
                    try {
                      localStorage.removeItem("saved_bignum_modpow");
                    } catch {}
                  }}
                  aria-label="Clear all saved calculations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedModItems.map((item) => {
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
                            onClick={() => handleRestoreMod(item)}
                            className="text-slate-500 hover:text-blue-600 p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                            title="Restore calculation"
                            aria-label="Restore saved calculation"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                            <span>Restore</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedModItems.filter((i) => i.id !== item.id);
                              setSavedModItems(updated);
                              try {
                                localStorage.setItem("saved_bignum_modpow", JSON.stringify(updated));
                              } catch {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate block">
                            Base: {item.rawBase}, Exp: {item.rawExponent}, Mod: {item.rawModulus}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Saved Results:
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
      {/* CARD 3: BIG FACTORIALS & COMBINATORICS ENGINE */}
      {/* ========================================================================= */}
      <div className={`border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid ${activeTab !== "factComb" ? "hidden" : ""}`}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Big Factorials &amp; Combinatorics Engine</span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handleSaveFact}
              aria-label="Save factorial or combinatorics calculation"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedFact ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Submode Switcher */}
          <div className="flex gap-2 no-print">
            <button
              type="button"
              onClick={() => setFactMode("factorial")}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                factMode === "factorial" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              Factorial N!
            </button>
            <button
              type="button"
              onClick={() => setFactMode("combinatorics")}
              className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                factMode === "combinatorics" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              Combinatorics (nPr &amp; nCr)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* INPUT PANEL */}
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
              {factMode === "factorial" ? (
                <>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Factorial Input
                  </h2>
                  <div>
                    <label htmlFor="fact-input-n" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Factorial Integer N (0 to 5000):
                    </label>
                    <input
                      id="fact-input-n"
                      type="number"
                      min="0"
                      max="5000"
                      value={nFact}
                      onChange={(e) => setNFact(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Combinatorics Inputs
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="comb-input-n" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Total Items (n):
                      </label>
                      <input
                        id="comb-input-n"
                        type="text"
                        value={combN}
                        onChange={(e) => setCombN(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label htmlFor="comb-input-r" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        Selected Items (r):
                      </label>
                      <input
                        id="comb-input-r"
                        type="text"
                        value={combR}
                        onChange={(e) => setCombR(e.target.value)}
                        placeholder="e.g. 50"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono font-bold text-sm outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Operation:</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setCombOp("nCr")}
                          className={`py-1.5 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                            combOp === "nCr" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          nCr (Combinations)
                        </button>
                        <button
                          type="button"
                          onClick={() => setCombOp("nPr")}
                          className={`py-1.5 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                            combOp === "nPr" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                          }`}
                        >
                          nPr (Permutations)
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* OUTPUT PANEL */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {factMode === "factorial" ? `Factorial Output (${nFact}!)` : `${combOp}(${combN}, ${combR}) Output`}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      {factAnalytics.digitCount} Digits
                    </span>
                  </div>

                  {factError ? (
                    <p className="text-xs font-bold text-rose-500">{factError}</p>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 max-h-32 overflow-y-auto font-mono text-xs font-bold text-slate-900 dark:text-slate-100 break-all select-all">
                      {factResultStr}
                    </div>
                  )}
                </div>

                <div className={`grid ${factMode === "factorial" ? "grid-cols-3" : "grid-cols-2"} gap-2 text-xs font-bold`}>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Total Digits</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100">{factAnalytics.digitCount}</span>
                  </div>

                  {factMode === "factorial" && (
                    <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block uppercase">Trailing Zeros</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">{factTrailingZerosCount}</span>
                    </div>
                  )}

                  <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase">Approx (Sci)</span>
                    <span className="font-mono text-slate-900 dark:text-slate-100 truncate block">{factSciApprox}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 no-print">
                  <button
                    type="button"
                    onClick={() => handleCopy(factResultStr || "", setCopiedFact)}
                    aria-label="Copy computation result"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedFact ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedFact ? "Copied!" : "Copy Result"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(factLatex || "", setCopiedFactLatex)}
                    aria-label="Copy result as LaTeX"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedFactLatex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Code2 className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedFactLatex ? "Copied LaTeX!" : "Copy LaTeX"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadTxt(factResultStr || "", `${factMode === "factorial" ? `factorial_${nFact}` : `${combOp}_${combN}_${combR}`}_${factAnalytics.digitCount}_digits.txt`)}
                    aria-label="Download calculation as text"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600" />
                    <span>Download .txt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleExportCsv(
                        ["Module", "Type", "Input Parameter", "Exact Result", "Digits", "Approx Sci"],
                        [[
                          "Factorials & Combinatorics",
                          factMode,
                          factMode === "factorial" ? `N=${nFact}` : `n=${combN}, r=${combR}, op=${combOp}`,
                          factResultStr || "",
                          factAnalytics.digitCount,
                          factSciApprox
                        ]],
                        `${factMode === "factorial" ? `factorial_${nFact}` : `combinatorics_${combOp}`}.csv`
                      )
                    }
                    aria-label="Export calculation as CSV"
                    className="flex-1 min-w-[130px] bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DIGIT FREQUENCY GRID (FOR FACTORIAL OR COMBINATORICS) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Digit Frequency Distribution (0 through 9):
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <div key={digit} className="bg-slate-50 dark:bg-slate-800/80 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-center space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 block">Digit {digit}</span>
                  <p className="font-bold text-blue-600 dark:text-blue-400">{factAnalytics.frequencies[digit] || 0}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SAVED FACTORIAL/COMBINATORICS (WITH RESTORE) */}
          {savedFactItems.length > 0 && (
            <div className="no-print bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Factorial &amp; Combinatorics ({savedFactItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFactItems([]);
                    try {
                      localStorage.removeItem("saved_bignum_factorial");
                    } catch {}
                  }}
                  aria-label="Clear all saved calculations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFactItems.map((item) => {
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
                            onClick={() => handleRestoreFact(item)}
                            className="text-slate-500 hover:text-blue-600 p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                            title="Restore calculation"
                            aria-label="Restore saved calculation"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                            <span>Restore</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedFactItems.filter((i) => i.id !== item.id);
                              setSavedFactItems(updated);
                              try {
                                localStorage.setItem("saved_bignum_factorial", JSON.stringify(updated));
                              } catch {}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                            aria-label="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate block">
                            {item.module === "fact" ? `N: ${item.rawN}` : `${item.rawCombOp}(${item.rawCombN}, ${item.rawCombR})`}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

                        {isExpanded && (
                          <div className="pt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            <span className="font-extrabold text-blue-600 dark:text-blue-400 block text-[11px]">
                              Saved Results:
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
      {/* CARD 4: MILLER-RABIN PRIMALITY TEST ENGINE */}
      {/* ========================================================================= */}
      <div className={`border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid ${activeTab !== "prime" ? "hidden" : ""}`}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Large Integer Miller-Rabin Primality Test Engine</span>
          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handleSavePrime}
              aria-label="Save primality test result"
              className="bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Bookmark className="w-3 h-3 text-white" />
              <span>{justSavedPrime ? "Saved!" : "Save"}</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Input Candidate Integer
              </h2>

              <div className="space-y-1.5">
                <label htmlFor="prime-input-n" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Integer N to Test:
                </label>
                <textarea
                  id="prime-input-n"
                  rows={3}
                  value={primeInput}
                  onChange={(e) => setPrimeInput(e.target.value)}
                  placeholder="Enter integer to test for primality..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] no-print">
                <span className="text-slate-500 self-center font-bold">Quick Primes:</span>
                {[
                  "17",
                  "997",
                  "1000000007",
                  "2147483647",
                  "1000000000000000003"
                ].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPrimeInput(p)}
                    className="px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 font-mono font-semibold"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* VERDICT CARD */}
            <div className="md:col-span-6 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                    Primality Evaluation
                  </span>

                  <div className={`p-4 rounded-xl flex items-center gap-3 border ${
                    primalityResult.isPrime
                      ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                  }`}>
                    <div className="text-2xl font-black font-sans tracking-wide">
                      {primalityResult.isPrime ? "PRIME" : "COMPOSITE"}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {primalityResult.details}
                  </p>
                </div>

                <div className="flex gap-2 no-print">
                  <button
                    type="button"
                    onClick={() => handleCopy(`${primeInput} is ${primalityResult.isPrime ? "PRIME" : "COMPOSITE"}: ${primalityResult.details}`, setCopiedPrime)}
                    aria-label="Copy primality evaluation"
                    className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold rounded-xl py-2 text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200 dark:border-slate-700"
                  >
                    {copiedPrime ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
                    <span>{copiedPrime ? "Copied!" : "Copy Result"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SAVED PRIMALITY (WITH RESTORE) */}
          {savedPrimeItems.length > 0 && (
            <div className="no-print bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Primality Evaluations ({savedPrimeItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedPrimeItems([]);
                    try {
                      localStorage.removeItem("saved_bignum_primality");
                    } catch {}
                  }}
                  aria-label="Clear all saved primality evaluations"
                  className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedPrimeItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleRestorePrime(item)}
                          className="text-slate-500 hover:text-blue-600 p-1 rounded transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                          title="Restore number"
                          aria-label="Restore saved calculation"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                          <span>Restore</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = savedPrimeItems.filter((i) => i.id !== item.id);
                            setSavedPrimeItems(updated);
                            try {
                              localStorage.setItem("saved_bignum_primality", JSON.stringify(updated));
                            } catch {}
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                          aria-label="Delete saved calculation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1 text-slate-700 dark:text-slate-300">
                      {item.resultsList.map((resLine, idx) => (
                        <div key={idx} className="font-medium text-[11px] leading-snug break-all">
                          {resLine}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 5: GOOGOLOGY & NAMED BIG NUMBERS PRESETS */}
      {/* ========================================================================= */}
      <div className={`border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid ${activeTab !== "googology" ? "hidden" : ""}`}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Googology &amp; Named Large Numbers Explorer</span>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* PRESET LIST */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Select Large Number Preset:
              </span>
              <div className="space-y-1.5">
                {GOOGOLOGY_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setSelectedPresetIndex(idx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between ${
                      selectedPresetIndex === idx
                        ? "bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-900 dark:text-blue-100 font-bold"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <div>
                      <span className="font-bold block">{preset.name}</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{preset.shortScaleName} ({preset.powerOf10})</span>
                    </div>
                    <span className="text-[10px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {preset.digitCount}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* PRESET DETAILS & INSERTION */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-xs space-y-4">
              {(() => {
                const p = GOOGOLOGY_PRESETS[selectedPresetIndex];
                return (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                      <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                        {p.name}
                      </h3>
                      <span className="font-mono text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full">
                        {p.powerOf10}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">Short Scale (US / Modern UK)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{p.shortScaleName}</span>
                      </div>

                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-0.5">
                        <span className="text-[10px] text-slate-400 block uppercase">Long Scale (Traditional Europe)</span>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{p.longScaleName}</span>
                      </div>
                    </div>

                    {p.exactValue ? (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Materialized Value ({p.exactValue.length} Digits):
                        </span>
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs break-all max-h-24 overflow-y-auto">
                          {p.exactValue}
                        </div>

                        <div className="flex gap-2 pt-2 no-print">
                          <button
                            type="button"
                            onClick={() => {
                              setArithX(p.exactValue!);
                              setActiveTab("arith");
                              setRestoreNotice(`Loaded ${p.name} into Arithmetic Number X`);
                              setTimeout(() => setRestoreNotice(null), 2500);
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer"
                          >
                            Load into Number X
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setModX(p.exactValue!);
                              setActiveTab("mod");
                              setRestoreNotice(`Loaded ${p.name} into Modulo Base X`);
                              setTimeout(() => setRestoreNotice(null), 2500);
                            }}
                            className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-900 dark:text-slate-100 font-bold text-xs py-2 px-3 rounded-xl transition-colors cursor-pointer"
                          >
                            Load into Mod Base
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-medium leading-relaxed">
                        <strong>Symbolic Preset: </strong>
                        {p.name} consists of {p.digitCount}. Materializing this quantity in binary memory would require more bits than atoms in the observable universe (~10⁸⁰ atoms), demonstrating why arbitrary-precision engines maintain exact symbolic definitions.
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CARD 6: DEDICATED DIGIT INSPECTOR ANALYTICS */}
      {/* ========================================================================= */}
      <div className={`border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs print:break-inside-avoid ${activeTab !== "digit" ? "hidden" : ""}`}>
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Dedicated Digit Inspector &amp; Frequency Analytics</span>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="digit-input-n" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Paste Arbitrary Massive Number to Analyze:
            </label>
            <textarea
              id="digit-input-n"
              rows={3}
              value={digitInspectorInput}
              onChange={(e) => setDigitInspectorInput(e.target.value)}
              placeholder="Paste any large integer string..."
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* SUMMARY TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Total Digits</span>
              <span className="font-mono text-base text-blue-600 dark:text-blue-400">{digitAnalytics.digitCount}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Sum of Digits</span>
              <span className="font-mono text-base text-slate-900 dark:text-slate-100">{digitAnalytics.digitSum}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">First 5 Digits</span>
              <span className="font-mono text-base text-slate-900 dark:text-slate-100">
                {digitInspectorInput.replace(/[^0-9]/g, "").substring(0, 5) || "0"}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block uppercase">Last 5 Digits</span>
              <span className="font-mono text-base text-slate-900 dark:text-slate-100">
                {(() => {
                  const c = digitInspectorInput.replace(/[^0-9]/g, "");
                  return c.length > 5 ? c.substring(c.length - 5) : c;
                })()}
              </span>
            </div>
          </div>

          {/* 0-9 FREQUENCY BREAKDOWN */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Complete 0-9 Digit Distribution:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2 font-mono text-xs">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => {
                const count = digitAnalytics.frequencies[d] || 0;
                const pct = digitAnalytics.digitCount > 0 ? ((count / digitAnalytics.digitCount) * 100).toFixed(1) : "0.0";
                return (
                  <div key={d} className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block">Digit {d}</span>
                    <p className="font-extrabold text-blue-600 dark:text-blue-400">{count}</p>
                    <span className="text-[9px] text-slate-400 block">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 no-print">
            <button
              type="button"
              onClick={() => handleCopy(digitInspectorInput, setCopiedDigit)}
              aria-label="Copy inspected number"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedDigit ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-blue-600" />}
              <span>{copiedDigit ? "Copied!" : "Copy Full Number"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BigNumberCalculator;
