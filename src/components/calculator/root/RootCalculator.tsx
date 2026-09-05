"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info,
  RotateCcw,
  BookOpen,
  Zap,
  Split,
  Binary,
  Bookmark,
  Trash2,
  Download
} from "lucide-react";
import {
  simplifyRadical,
  evaluateFractionalExponent,
  rationalizeDenominator,
  calculateNewtonRaphson,
  calculateLongDivisionSquareRoot,
  calculateComplexRoots,
  calculateBounds
} from "@/app/calculators/root-calculator/root-logic";

export interface SavedRootItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
  rawInputs: Record<string, string>;
}

export function RootCalculator() {
  // Card 1 Inputs: N-th Root Solver
  const [rootType, setRootType] = useState<"general" | "square" | "cube">("general");
  const [radicand, setRadicand] = useState<string>("72");
  const [degree, setDegree] = useState<string>("2");
  const [precision, setPrecision] = useState<number>(6);

  // Card 2 Inputs: Radical Simplifier
  const [simpRadicand, setSimpRadicand] = useState<string>("72");
  const [simpDegree, setSimpDegree] = useState<string>("2");

  // Card 3 Inputs: Fractional Exponents
  const [fracBase, setFracBase] = useState<string>("8");
  const [fractionNum, setFractionNum] = useState<string>("2");
  const [fractionDen, setFractionDen] = useState<string>("3");

  // Controls & Derivation
  const [activeDerivationTab, setActiveDerivationTab] = useState<"factors" | "newton" | "longDivision">("factors");
  const [showDerivation, setShowDerivation] = useState<boolean>(true);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage((current) => (current === msg ? null : current)), 2500);
  };

  // Saved calculation states for Card 1, 2, 3
  const [savedRootItems, setSavedRootItems] = useState<SavedRootItem[]>([]);
  const [justSavedRoot, setJustSavedRoot] = useState<boolean>(false);

  const [savedSimpItems, setSavedSimpItems] = useState<SavedRootItem[]>([]);
  const [justSavedSimp, setJustSavedSimp] = useState<boolean>(false);

  const [savedFracItems, setSavedFracItems] = useState<SavedRootItem[]>([]);
  const [justSavedFrac, setJustSavedFrac] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedRoot = localStorage.getItem("saved_root_calculations");
      if (storedRoot) setSavedRootItems(JSON.parse(storedRoot));

      const storedSimp = localStorage.getItem("saved_root_simplifier");
      if (storedSimp) setSavedSimpItems(JSON.parse(storedSimp));

      const storedFrac = localStorage.getItem("saved_root_fractional");
      if (storedFrac) setSavedFracItems(JSON.parse(storedFrac));
    } catch (e) {}
  }, []);

  // Sync Root Type to degree
  useEffect(() => {
    if (rootType === "square") setDegree("2");
    else if (rootType === "cube") setDegree("3");
  }, [rootType]);

  // ==========================================
  // EXPLICIT PARSING & VALIDATION (DEF-ROOT-06)
  // ==========================================
  const degreeTrimmed = degree.trim();
  const rawDegreeNum = Number(degreeTrimmed);
  const isDegreeEmpty = degreeTrimmed === "";
  const degreeValidationError = rootType === "general" && (
    isDegreeEmpty
      ? "Root index (n) is required."
      : Number.isNaN(rawDegreeNum)
        ? "Root index (n) must be a valid integer."
        : rawDegreeNum === 0
          ? "Root index (n) must be a positive integer ≥ 1 (degree 0 is undefined)."
          : rawDegreeNum < 1
            ? "Root index (n) must be a positive integer ≥ 1."
            : !Number.isInteger(rawDegreeNum)
              ? "Root index (n) must be a positive integer ≥ 1."
              : null
  );

  const radicandTrimmed = radicand.trim();
  const isRadicandEmpty = radicandTrimmed === "";
  const rawRadicandNum = Number(radicandTrimmed);
  const radicandValidationError = isRadicandEmpty
    ? "Radicand (x) is required."
    : Number.isNaN(rawRadicandNum)
      ? "Radicand (x) must be a valid number."
      : null;

  const numDegree = rootType === "square" ? 2 : rootType === "cube" ? 3 : (degreeValidationError ? NaN : rawDegreeNum);
  const numRadicand = radicandValidationError ? NaN : rawRadicandNum;

  // Card 2 Validations
  const simpRadicandTrimmed = simpRadicand.trim();
  const simpDegreeTrimmed = simpDegree.trim();
  const rawSimpRadicandNum = Number(simpRadicandTrimmed);
  const rawSimpDegreeNum = Number(simpDegreeTrimmed);

  const simpRadicandError = simpRadicandTrimmed === "" || Number.isNaN(rawSimpRadicandNum)
    ? "Radicand (x) is required."
    : null;
  const simpDegreeError = simpDegreeTrimmed === "" || Number.isNaN(rawSimpDegreeNum) || !Number.isInteger(rawSimpDegreeNum) || rawSimpDegreeNum < 1
    ? "Root degree (n) must be a positive integer ≥ 1."
    : null;

  const numSimpRadicand = simpRadicandError ? NaN : rawSimpRadicandNum;
  const numSimpDegree = simpDegreeError ? NaN : rawSimpDegreeNum;

  // Card 3 Validations
  const fracBaseTrimmed = fracBase.trim();
  const fracNumTrimmed = fractionNum.trim();
  const fracDenTrimmed = fractionDen.trim();
  const rawFracBaseNum = Number(fracBaseTrimmed);
  const rawFracNumNum = Number(fracNumTrimmed);
  const rawFracDenNum = Number(fracDenTrimmed);

  const fracBaseError = fracBaseTrimmed === "" || Number.isNaN(rawFracBaseNum) ? "Base (x) is required." : null;
  const fracNumError = fracNumTrimmed === "" || Number.isNaN(rawFracNumNum) || !Number.isInteger(rawFracNumNum) ? "Numerator (m) must be an integer." : null;
  const fracDenError = fracDenTrimmed === "" || Number.isNaN(rawFracDenNum) || !Number.isInteger(rawFracDenNum) || rawFracDenNum < 1
    ? "Denominator root (n) must be a positive integer ≥ 1."
    : null;

  const numFracBase = fracBaseError ? NaN : rawFracBaseNum;
  const numFracNum = fracNumError ? NaN : rawFracNumNum;
  const numFracDen = fracDenError ? NaN : rawFracDenNum;

  // Card 1 Calculation
  const calculated = useMemo(() => {
    if (degreeValidationError || radicandValidationError || Number.isNaN(numRadicand) || Number.isNaN(numDegree)) {
      return null;
    }

    const isNegativeRadicand = numRadicand < 0;
    const isEvenDegree = numDegree % 2 === 0;

    let decimalVal = 0;
    let isComplex = false;
    let complexRootsList = calculateComplexRoots(numRadicand, numDegree);

    if (isNegativeRadicand && isEvenDegree) {
      isComplex = true;
      decimalVal = NaN;
    } else if (isNegativeRadicand) {
      decimalVal = -Math.pow(Math.abs(numRadicand), 1 / numDegree);
    } else {
      decimalVal = Math.pow(numRadicand, 1 / numDegree);
    }

    const simplified = simplifyRadical(numRadicand, numDegree);
    const bounds = calculateBounds(numRadicand, numDegree);
    const newtonSteps = calculateNewtonRaphson(numRadicand, numDegree, 10);
    const longDivisionSteps = numDegree === 2 && numRadicand > 0 ? calculateLongDivisionSquareRoot(Math.round(numRadicand)) : [];

    return {
      decimalVal,
      isComplex,
      complexRootsList,
      simplified,
      bounds,
      newtonSteps,
      longDivisionSteps
    };
  }, [numRadicand, numDegree, degreeValidationError, radicandValidationError]);

  // Card 2 Calculation: Simplifier
  const simpResult = useMemo(() => {
    if (simpRadicandError || simpDegreeError || Number.isNaN(numSimpRadicand) || Number.isNaN(numSimpDegree)) {
      return null;
    }
    return simplifyRadical(numSimpRadicand, numSimpDegree);
  }, [numSimpRadicand, numSimpDegree, simpRadicandError, simpDegreeError]);

  // Card 3 Calculation: Fractional Exponents
  const fracResult = useMemo(() => {
    if (fracBaseError || fracNumError || fracDenError || Number.isNaN(numFracBase) || Number.isNaN(numFracNum) || Number.isNaN(numFracDen)) {
      return null;
    }
    return evaluateFractionalExponent(numFracBase, numFracNum, numFracDen);
  }, [numFracBase, numFracNum, numFracDen, fracBaseError, fracNumError, fracDenError]);

  // Clipboard & Export Utilities (DEF-ROOT-02)
  const copyTextToClipboard = async (text: string, label: string = "Result") => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast(`Copied ${label}!`);
    } catch (e) {
      showToast("Failed to copy");
    }
  };

  const exportCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const escapeCsv = (val: string | number) => {
      const s = String(val ?? "");
      if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    };
    const csvContent = [
      headers.map(escapeCsv).join(","),
      ...rows.map(row => row.map(escapeCsv).join(","))
    ].join("\r\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("Exported CSV!");
  };

  // Card 1 Exports
  const handleCopyRootResult = () => {
    if (!calculated) return;
    if (calculated.isComplex) {
      copyTextToClipboard(`${numDegree === 2 ? "√" : `${numDegree}√`}(${radicand}) = Undefined in ℝ (Complex: ${calculated.complexRootsList.map(r => r.formatted).join(", ")})`, "Result");
      return;
    }
    const degSymbol = numDegree === 2 ? "√" : numDegree === 3 ? "∛" : `${numDegree}√`;
    const resText = `${degSymbol}${radicand} = ${calculated.simplified.formattedText}${calculated.simplified.isPerfectPower ? "" : ` ≈ ${calculated.decimalVal.toFixed(precision)}`}`;
    copyTextToClipboard(resText, "Result");
  };

  const handleCopyRootLatex = () => {
    if (!calculated) return;
    if (calculated.isComplex) {
      const radTex = numDegree === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${numDegree}]{${radicand}}`;
      copyTextToClipboard(`${radTex} \\notin \\mathbb{R}`, "LaTeX");
      return;
    }
    const radTex = numDegree === 2 ? `\\sqrt{${radicand}}` : `\\sqrt[${numDegree}]{${radicand}}`;
    const latex = calculated.simplified.isPerfectPower
      ? `${radTex}=${calculated.simplified.latex}`
      : `${radTex}=${calculated.simplified.latex}\\approx ${calculated.decimalVal.toFixed(precision)}`;
    copyTextToClipboard(latex, "LaTeX");
  };

  const handleExportRootCsv = () => {
    if (!calculated) return;
    const headers = [
      "Module",
      "Radicand",
      "Degree",
      "RootType",
      "PrincipalRoot",
      "ExactRadical",
      "FractionalExponent",
      "Bounds",
      "Method",
      "Timestamp"
    ];
    const row = [
      "N-th Root Solver",
      radicand,
      numDegree,
      rootType,
      calculated.isComplex ? "Complex" : calculated.decimalVal.toFixed(precision),
      calculated.simplified.formattedText,
      `${radicand}^(1/${numDegree})`,
      calculated.bounds ? calculated.bounds.expression : "N/A",
      activeDerivationTab === "factors" ? "Prime Factorization" : activeDerivationTab === "newton" ? "Newton-Raphson" : "Long Division",
      new Date().toISOString()
    ];
    exportCsv(`root-calculator-${radicand}-deg${numDegree}.csv`, headers, [row]);
  };

  // Card 2 Exports
  const handleCopySimpResult = () => {
    if (!simpResult) return;
    const degSymbol = numSimpDegree === 2 ? "√" : numSimpDegree === 3 ? "∛" : `${numSimpDegree}√`;
    copyTextToClipboard(`${degSymbol}${simpRadicand} = ${simpResult.formattedText}`, "Result");
  };

  const handleCopySimpLatex = () => {
    if (!simpResult) return;
    const radTex = numSimpDegree === 2 ? `\\sqrt{${simpRadicand}}` : `\\sqrt[${numSimpDegree}]{${simpRadicand}}`;
    copyTextToClipboard(`${radTex}=${simpResult.latex}`, "LaTeX");
  };

  const handleExportSimpCsv = () => {
    if (!simpResult) return;
    const headers = ["Module", "Radicand", "Degree", "Coefficient", "ReducedRadicand", "ExactForm", "Timestamp"];
    const row = [
      "Radical Simplifier",
      simpRadicand,
      numSimpDegree,
      simpResult.coefficient,
      simpResult.radicand,
      simpResult.formattedText,
      new Date().toISOString()
    ];
    exportCsv(`radical-simplifier-${simpRadicand}-deg${numSimpDegree}.csv`, headers, [row]);
  };

  // Card 3 Exports
  const handleCopyFracResult = () => {
    if (!fracResult) return;
    const resText = `${fracBase}^(${fractionNum}/${fractionDen}) = ${fracResult.exactForm}${fracResult.exactForm === fracResult.decimalValue.toString() ? "" : ` ≈ ${fracResult.decimalValue.toFixed(precision)}`}`;
    copyTextToClipboard(resText, "Result");
  };

  const handleCopyFracLatex = () => {
    if (!fracResult) return;
    copyTextToClipboard(`${fracBase}^{\\frac{${fractionNum}}{${fractionDen}}}=${fracResult.decimalValue}`, "LaTeX");
  };

  const handleExportFracCsv = () => {
    if (!fracResult) return;
    const headers = [
      "Module",
      "Base",
      "Numerator",
      "Denominator",
      "FractionalExponent",
      "NumericResult",
      "RadicalRepresentation",
      "Timestamp"
    ];
    const row = [
      "Fractional Exponent Solver",
      fracBase,
      numFracNum,
      numFracDen,
      `${numFracNum}/${numFracDen}`,
      fracResult.decimalValue,
      fracResult.exactForm,
      new Date().toISOString()
    ];
    exportCsv(`fractional-exponent-${fracBase}-pow${fractionNum}-${fractionDen}.csv`, headers, [row]);
  };

  const formattedDecimal = !calculated
    ? "—"
    : Number.isNaN(calculated.decimalVal)
      ? "Complex Number (i)"
      : calculated.decimalVal.toFixed(precision);

  // Save Card 1 Handler (DEF-ROOT-03)
  const handleSaveRoot = () => {
    if (!calculated) return;
    const inputsStr = `Radicand (x): ${radicand}, Degree (n): ${numDegree}`;
    const opStr = `N-th Root Calculation (${numDegree}√${radicand})`;
    const resList = [
      `Principal Root Value = ${formattedDecimal}`,
      `Exact Radical Form = ${calculated.simplified.formattedText}`,
      `Fractional Exponent = ${radicand}^(1/${numDegree})`,
      `Power Bounds = ${calculated.bounds ? calculated.bounds.expression : "N/A"}`
    ];

    const newItem: SavedRootItem = {
      id: Date.now().toString(),
      title: `Root (${numDegree}√${radicand})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${numDegree}√${radicand} = ${formattedDecimal}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: {
        radicand,
        degree,
        rootType,
        precision: String(precision)
      }
    };

    const updated = [newItem, ...savedRootItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedRootItems(updated);
    try {
      localStorage.setItem("saved_root_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedRoot(true);
    setTimeout(() => setJustSavedRoot(false), 2000);
    showToast("Saved root calculation!");
  };

  // Restore Card 1
  const handleRestoreRoot = (item: SavedRootItem) => {
    if (item.rawInputs) {
      if (item.rawInputs.radicand !== undefined) setRadicand(item.rawInputs.radicand);
      if (item.rawInputs.degree !== undefined) setDegree(item.rawInputs.degree);
      if (item.rawInputs.rootType !== undefined) setRootType(item.rawInputs.rootType as any);
      if (item.rawInputs.precision !== undefined) setPrecision(Number(item.rawInputs.precision) || 6);
      showToast("Restored original calculation!");
    }
  };

  // Save Card 2 Handler (DEF-ROOT-03)
  const handleSaveSimp = () => {
    if (!simpResult) return;
    const inputsStr = `Radicand (x): ${simpRadicand}, Degree (n): ${numSimpDegree}`;
    const opStr = `Radical Simplification (${numSimpDegree}√${simpRadicand})`;
    const resList = [
      `Simplified Radical = ${simpResult.formattedText}`,
      `Integer Coefficient (k) = ${simpResult.coefficient}`,
      `Reduced Radicand (m) = ${simpResult.radicand}`
    ];

    const newItem: SavedRootItem = {
      id: Date.now().toString(),
      title: `Radical Simplifier (${numSimpDegree}√${simpRadicand})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${numSimpDegree}√${simpRadicand} = ${simpResult.formattedText}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: {
        simpRadicand,
        simpDegree
      }
    };

    const updated = [newItem, ...savedSimpItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedSimpItems(updated);
    try {
      localStorage.setItem("saved_root_simplifier", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedSimp(true);
    setTimeout(() => setJustSavedSimp(false), 2000);
    showToast("Saved radical simplification!");
  };

  // Restore Card 2
  const handleRestoreSimp = (item: SavedRootItem) => {
    if (item.rawInputs) {
      if (item.rawInputs.simpRadicand !== undefined) setSimpRadicand(item.rawInputs.simpRadicand);
      if (item.rawInputs.simpDegree !== undefined) setSimpDegree(item.rawInputs.simpDegree);
      showToast("Restored radical simplification!");
    }
  };

  // Save Card 3 Handler (DEF-ROOT-03)
  const handleSaveFrac = () => {
    if (!fracResult) return;
    const inputsStr = `Base (x): ${fracBase}, Numerator (m): ${fractionNum}, Denominator (n): ${fractionDen}`;
    const opStr = `Fractional Exponent (${fracBase}^(${fractionNum}/${fractionDen}))`;
    const resList = [
      `Evaluated Decimal Result = ${fracResult.decimalValue.toFixed(precision)}`,
      `Radical Form = ${fracResult.exactForm}`
    ];

    const newItem: SavedRootItem = {
      id: Date.now().toString(),
      title: `Fractional Power (${fracBase}^${fractionNum}/${fractionDen})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `${fracBase}^(${fractionNum}/${fractionDen}) = ${fracResult.decimalValue.toFixed(precision)}`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawInputs: {
        fracBase,
        fractionNum,
        fractionDen
      }
    };

    const updated = [newItem, ...savedFracItems.filter(item => item.inputs !== inputsStr)].slice(0, 15);
    setSavedFracItems(updated);
    try {
      localStorage.setItem("saved_root_fractional", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedFrac(true);
    setTimeout(() => setJustSavedFrac(false), 2000);
    showToast("Saved fractional exponent!");
  };

  // Restore Card 3
  const handleRestoreFrac = (item: SavedRootItem) => {
    if (item.rawInputs) {
      if (item.rawInputs.fracBase !== undefined) setFracBase(item.rawInputs.fracBase);
      if (item.rawInputs.fractionNum !== undefined) setFractionNum(item.rawInputs.fractionNum);
      if (item.rawInputs.fractionDen !== undefined) setFractionDen(item.rawInputs.fractionDen);
      showToast("Restored fractional exponent!");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Check className="w-4 h-4 text-emerald-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CARD 1: N-TH ROOT & SQUARE/CUBE ROOT SOLVER */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden print:overflow-visible print:break-inside-avoid print:shadow-none bg-white dark:bg-slate-900 shadow-xs print-card">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>N-th Root &amp; Square/Cube Root Solver (ⁿ√x)</span>
          <button
            type="button"
            onClick={handleSaveRoot}
            disabled={!calculated}
            className="no-print bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedRoot ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-blue-600" />
                  <span>Inputs &amp; Radical Parameters</span>
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setRadicand("72");
                    setDegree("2");
                    setRootType("general");
                    setPrecision(6);
                  }}
                  className="no-print text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>

              {/* ROOT TYPE SELECTOR */}
              <div className="no-print">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Root Type Presets
                </label>
                <div className="grid grid-cols-3 gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold font-sans tabular-nums">
                  <button
                    type="button"
                    onClick={() => setRootType("square")}
                    className={`py-1.5 rounded-lg cursor-pointer ${rootType === "square" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Square Root (√x)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRootType("cube")}
                    className={`py-1.5 rounded-lg cursor-pointer ${rootType === "cube" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    Cube Root (∛x)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRootType("general")}
                    className={`py-1.5 rounded-lg cursor-pointer ${rootType === "general" ? "bg-blue-600 text-white" : "text-slate-700 dark:text-slate-300"}`}
                  >
                    General N-th Root
                  </button>
                </div>
              </div>

              {/* VISUAL RADICAL NOTATION PREVIEW */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-center min-h-[70px] shadow-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 font-mono">
                  <sup className="text-sm sm:text-base text-blue-600 dark:text-blue-400">
                    {rootType === "square" ? "" : numDegree || "n"}
                  </sup>
                  <span className="text-3xl sm:text-4xl text-blue-600 dark:text-blue-400 font-serif">√</span>
                  <span className="border-t-2 border-slate-900 dark:border-slate-100 pt-0.5 px-1">
                    {radicand || "x"}
                  </span>
                </div>
              </div>

              {/* DYNAMIC FORM INPUTS */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Radicand (x):
                  </label>
                  <input
                    type="number"
                    value={radicand}
                    onChange={(e) => setRadicand(e.target.value)}
                    placeholder="Enter radicand (e.g. 72)"
                    className={`w-full bg-white dark:bg-slate-900 border ${radicandValidationError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} rounded-xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 outline-none`}
                  />
                  {radicandValidationError && (
                    <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" />
                      <span>{radicandValidationError}</span>
                    </p>
                  )}
                </div>

                {rootType === "general" && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Root Index / Degree (n):
                    </label>
                    <input
                      type="number"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Enter index n (e.g. 2, 3, 4)"
                      className={`w-full bg-white dark:bg-slate-900 border ${degreeValidationError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} rounded-xl px-4 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:ring-2 outline-none`}
                    />
                    {degreeValidationError && (
                      <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                        <Info className="h-3.5 w-3.5" />
                        <span>{degreeValidationError}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* PRECISION SLIDER */}
                <div className="no-print space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Decimal Precision:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-mono">{precision} places</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="16"
                    value={precision}
                    onChange={(e) => setPrecision(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD */}
            <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Principal Root Value
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {calculated ? "Evaluated" : "Validation"}
                  </span>
                </div>

                {calculated ? (
                  <>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight break-all">
                      {formattedDecimal}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-bold text-slate-500">Exact Radical Form:</span>
                      <span className="font-extrabold text-blue-600 dark:text-blue-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg font-mono">
                        {calculated.simplified.formattedText}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 block uppercase">Fractional Exponent</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">{radicand}<sup>1/{numDegree}</sup></span>
                      </div>

                      <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 block uppercase">Power Bounds</span>
                        <span className="font-mono text-slate-900 dark:text-slate-100">{calculated.bounds ? calculated.bounds.expression : "N/A"}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-3 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
                    {degreeValidationError || radicandValidationError || "Please enter valid input values."}
                  </div>
                )}

                {/* USER-FACING EXPORT & COPY CONTROLS (DEF-ROOT-02) */}
                {calculated && (
                  <div className="no-print flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={handleCopyRootResult}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Copy className="w-3.5 h-3.5 text-blue-600" />
                      <span>Copy Result</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyRootLatex}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Copy className="w-3.5 h-3.5 text-purple-600" />
                      <span>Copy LaTeX</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleExportRootCsv}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                )}
              </div>

              {/* COMPLEX NUMBERS BADGE IF APPLICABLE */}
              {calculated && calculated.isComplex && calculated.complexRootsList.length > 0 && (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-3.5 space-y-2">
                  <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-amber-600" />
                    <span>Complex Roots (Even root of negative number):</span>
                  </h4>
                  <ul className="space-y-1 text-xs font-mono text-amber-900 dark:text-amber-200">
                    {calculated.complexRootsList.map((rootItem, idx) => (
                      <li key={idx} className="flex justify-between border-b border-amber-200/50 pb-1">
                        <span>Root {idx + 1}: {rootItem.formatted}</span>
                        <span className="text-[11px] text-amber-700 dark:text-amber-400">{rootItem.polarFormatted}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC DERIVATION ENGINE & STEP-BY-STEP BREAKDOWN */}
          {calculated && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setShowDerivation(!showDerivation)}
                  className="no-print flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 cursor-pointer"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Step-by-Step Derivation &amp; Algorithm Demonstration</span>
                  {showDerivation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>

                <div className="no-print flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setActiveDerivationTab("factors")}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                      activeDerivationTab === "factors" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Prime Factorization
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveDerivationTab("newton")}
                    className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                      activeDerivationTab === "newton" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    Newton-Raphson
                  </button>
                  {numDegree === 2 && numRadicand > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveDerivationTab("longDivision")}
                      className={`px-2.5 py-1 rounded-lg cursor-pointer transition-all ${
                        activeDerivationTab === "longDivision" ? "bg-blue-600 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Long Division
                    </button>
                  )}
                </div>
              </div>

              {showDerivation && (
                <div className="pt-2 space-y-4">
                  {activeDerivationTab === "factors" && (
                    <div className="space-y-2 text-xs">
                      <h4 className="font-bold text-slate-700 dark:text-slate-300">
                        Prime Factor Breakdown for Radicand {numRadicand}:
                      </h4>
                      {calculated.simplified.factorization.length > 0 ? (
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                          <p className="font-mono text-slate-900 dark:text-slate-100">
                            Prime product: {numRadicand} ={" "}
                            {calculated.simplified.factorization
                              .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
                              .join(" × ")}
                          </p>
                          <p className="font-mono text-blue-600 dark:text-blue-400">
                            Simplified radical: {calculated.simplified.coefficient > 1 ? `${calculated.simplified.coefficient}` : ""}{numDegree === 2 ? "√" : `${numDegree}√`}{calculated.simplified.radicand}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-500 italic">Prime factorization applies to integer radicands.</p>
                      )}
                    </div>
                  )}

                  {activeDerivationTab === "newton" && (
                    <div className="space-y-2 overflow-x-auto text-xs font-mono">
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                        Newton-Raphson Numerical Approximation (n={numDegree}, S={numRadicand}):
                      </h4>
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                            <th className="p-2">Iteration (k)</th>
                            <th className="p-2">Current Guess (xₖ)</th>
                            <th className="p-2">Next Approximation (xₖ₊₁)</th>
                            <th className="p-2">Residual Error |xⁿ - S|</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {calculated.newtonSteps.map((step) => (
                            <tr key={step.iteration} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-2 font-bold text-blue-600">{step.iteration}</td>
                              <td className="p-2">{step.guess.toFixed(8)}</td>
                              <td className="p-2 font-bold">{step.nextGuess.toFixed(8)}</td>
                              <td className="p-2 text-slate-500">
                                {step.error < 1e-12 ? "0 (Converged)" : step.error.toExponential(4)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeDerivationTab === "longDivision" && numDegree === 2 && (
                    <div className="space-y-2 overflow-x-auto text-xs font-mono">
                      <h4 className="font-bold text-slate-700 dark:text-slate-300 font-sans">
                        Digit-by-Digit Manual Square Root Division for {Math.round(numRadicand)}:
                      </h4>
                      {calculated.longDivisionSteps.length > 0 ? (
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                              <th className="p-2">Step</th>
                              <th className="p-2">Pair</th>
                              <th className="p-2">Dividend</th>
                              <th className="p-2">Divisor Base</th>
                              <th className="p-2">Trial Digit</th>
                              <th className="p-2">Product</th>
                              <th className="p-2">Remainder</th>
                              <th className="p-2">Root Accumulated</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {calculated.longDivisionSteps.map((step) => (
                              <tr key={step.stepIndex} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                <td className="p-2 font-bold text-blue-600">{step.stepIndex}</td>
                                <td className="p-2">{step.currentDigitPair}</td>
                                <td className="p-2">{step.currentDividend}</td>
                                <td className="p-2">{step.divisorBase}</td>
                                <td className="p-2 font-bold text-emerald-600">{step.trialDigit}</td>
                                <td className="p-2">{step.product}</td>
                                <td className="p-2">{step.remainder}</td>
                                <td className="p-2 font-mono font-bold text-blue-600">{step.currentRoot}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-slate-500 italic">Digit-by-digit division is available for positive square roots.</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* EMBEDDED SAVED ROOT CALCULATIONS INSIDE CARD 1 (DEF-ROOT-03) */}
          {savedRootItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Root Calculations ({savedRootItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedRootItems([]);
                    try { localStorage.removeItem("saved_root_calculations"); } catch(e){}
                  }}
                  className="no-print text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedRootItems.map((item) => {
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
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleRestoreRoot(item)}
                            className="no-print inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded cursor-pointer transition-colors"
                            title="Restore calculation inputs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedRootItems.filter(i => i.id !== item.id);
                              setSavedRootItems(updated);
                              try { localStorage.setItem("saved_root_calculations", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="no-print text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="no-print w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Details" : "Show Details"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" /> : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />}
                        </button>

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
      {/* CARD 2: RADICAL SIMPLIFIER (ⁿ√x ➔ k ⁿ√m) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden print:overflow-visible print:break-inside-avoid print:shadow-none bg-white dark:bg-slate-900 shadow-xs print-card">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Radical Simplifier (ⁿ√x ➔ k ⁿ√m)</span>
          <button
            type="button"
            onClick={handleSaveSimp}
            disabled={!simpResult}
            className="no-print bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedSimp ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Simplifier Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Radicand (x)</label>
                  <input
                    type="number"
                    value={simpRadicand}
                    onChange={(e) => setSimpRadicand(e.target.value)}
                    placeholder="e.g. 72"
                    className={`w-full h-10 px-3 rounded-xl border ${simpRadicandError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:ring-2 outline-none`}
                  />
                  {simpRadicandError && (
                    <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" />
                      <span>{simpRadicandError}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Root Degree (n)</label>
                  <input
                    type="number"
                    value={simpDegree}
                    onChange={(e) => setSimpDegree(e.target.value)}
                    placeholder="e.g. 2"
                    className={`w-full h-10 px-3 rounded-xl border ${simpDegreeError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:ring-2 outline-none`}
                  />
                  {simpDegreeError && (
                    <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" />
                      <span>{simpDegreeError}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: SIMPLIFIED OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Simplified Radical Form
                  </span>
                  {simpResult ? (
                    <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {simpResult.formattedText}
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                      {simpRadicandError || simpDegreeError || "Please enter valid simplifier inputs."}
                    </div>
                  )}
                </div>

                {simpResult && (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Integer Coefficient (k)</span>
                        <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400">{simpResult.coefficient}</span>
                      </div>

                      <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase">Reduced Radicand (m)</span>
                        <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{simpResult.radicand}</span>
                      </div>
                    </div>

                    {/* USER-FACING EXPORT & COPY CONTROLS (DEF-ROOT-02) */}
                    <div className="no-print flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleCopySimpResult}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Copy className="w-3.5 h-3.5 text-blue-600" />
                        <span>Copy Result</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopySimpLatex}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Copy className="w-3.5 h-3.5 text-purple-600" />
                        <span>Copy LaTeX</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportSimpCsv}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED RADICAL SIMPLIFICATIONS INSIDE CARD 2 (DEF-ROOT-03) */}
          {savedSimpItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Radical Simplifications ({savedSimpItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedSimpItems([]);
                    try { localStorage.removeItem("saved_root_simplifier"); } catch(e){}
                  }}
                  className="no-print text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedSimpItems.map((item) => {
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
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleRestoreSimp(item)}
                            className="no-print inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded cursor-pointer transition-colors"
                            title="Restore calculation inputs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedSimpItems.filter(i => i.id !== item.id);
                              setSavedSimpItems(updated);
                              try { localStorage.setItem("saved_root_simplifier", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="no-print text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Radical: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="no-print w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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
      {/* CARD 3: FRACTIONAL EXPONENT SOLVER (xᵐ/ⁿ) */}
      {/* ========================================================================= */}
      <div className="border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden print:overflow-visible print:break-inside-avoid print:shadow-none bg-white dark:bg-slate-900 shadow-xs print-card">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Fractional Exponent Solver (xᵐ/ⁿ)</span>
          <button
            type="button"
            onClick={handleSaveFrac}
            disabled={!fracResult}
            className="no-print bg-white/20 hover:bg-white/30 disabled:opacity-50 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedFrac ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Fractional Power Inputs
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base (x)</label>
                  <input
                    type="number"
                    value={fracBase}
                    onChange={(e) => setFracBase(e.target.value)}
                    placeholder="e.g. 8"
                    className={`w-full h-10 px-3 rounded-xl border ${fracBaseError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:ring-2 outline-none`}
                  />
                  {fracBaseError && (
                    <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                      <Info className="h-3.5 w-3.5" />
                      <span>{fracBaseError}</span>
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Numerator Power (m)</label>
                    <input
                      type="number"
                      value={fractionNum}
                      onChange={(e) => setFractionNum(e.target.value)}
                      className={`w-full h-10 px-3 rounded-xl border ${fracNumError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:ring-2 outline-none`}
                    />
                    {fracNumError && (
                      <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                        <Info className="h-3.5 w-3.5" />
                        <span>{fracNumError}</span>
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Denominator Root (n)</label>
                    <input
                      type="number"
                      value={fractionDen}
                      onChange={(e) => setFractionDen(e.target.value)}
                      className={`w-full h-10 px-3 rounded-xl border ${fracDenError ? "border-rose-500 focus:ring-rose-500" : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"} bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:ring-2 outline-none`}
                    />
                    {fracDenError && (
                      <p className="text-xs text-rose-500 font-semibold mt-1 flex items-center gap-1">
                        <Info className="h-3.5 w-3.5" />
                        <span>{fracDenError}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FRACTIONAL EXPONENT OUTPUT */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Evaluated Power Result
                  </span>
                  {fracResult ? (
                    <div className="text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {fracResult.decimalValue.toFixed(precision)}
                    </div>
                  ) : (
                    <div className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                      {fracBaseError || fracNumError || fracDenError || "Please enter valid fractional exponent inputs."}
                    </div>
                  )}
                </div>

                {fracResult && (
                  <>
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold space-y-1">
                      <span className="text-[10px] text-slate-400 block uppercase">Radical Form Representation</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">{fracResult.exactForm}</span>
                    </div>

                    {/* USER-FACING EXPORT & COPY CONTROLS (DEF-ROOT-02) */}
                    <div className="no-print flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={handleCopyFracResult}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Copy className="w-3.5 h-3.5 text-blue-600" />
                        <span>Copy Result</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyFracLatex}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Copy className="w-3.5 h-3.5 text-purple-600" />
                        <span>Copy LaTeX</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleExportFracCsv}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED FRACTIONAL EXPONENTS INSIDE CARD 3 (DEF-ROOT-03) */}
          {savedFracItems.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Fractional Exponents ({savedFracItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedFracItems([]);
                    try { localStorage.removeItem("saved_root_fractional"); } catch(e){}
                  }}
                  className="no-print text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedFracItems.map((item) => {
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
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleRestoreFrac(item)}
                            className="no-print inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded cursor-pointer transition-colors"
                            title="Restore calculation inputs"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Load</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedFracItems.filter(i => i.id !== item.id);
                              setSavedFracItems(updated);
                              try { localStorage.setItem("saved_root_fractional", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="no-print text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved calculation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Power: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="no-print w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
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

export default RootCalculator;
