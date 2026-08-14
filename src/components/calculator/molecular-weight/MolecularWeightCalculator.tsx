"use client";

import React, { useState, useMemo } from "react";
import {
  Atom,
  FileText,
  Copy,
  Check,
  Scale,
  Wand2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { generateGenericReportData } from "@/lib/report-generator/generic-report";
import { molecular_weight_calculatorConfig } from "@/app/calculators/molecular-weight-calculator/config";
import {
  calculateMolecularWeightCalculator,
  convertMassMolesMolecules,
} from "@/app/calculators/molecular-weight-calculator/calculator";
import { autoCorrectFormulaCase } from "@/app/calculators/molecular-weight-calculator/parser";
import { PERIODIC_TABLE_ELEMENTS } from "@/app/calculators/molecular-weight-calculator/periodic-table";
import {
  ParserMode,
  MolecularWeightOutputs,
  ParsedElement,
} from "@/app/calculators/molecular-weight-calculator/types";

// Category color palette for Periodic Table
const CATEGORY_COLORS: Record<string, string> = {
  nonmetal: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300",
  noble: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/70 dark:text-purple-300",
  alkali: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-300",
  alkaline: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-300",
  metalloid: "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/70 dark:text-teal-300",
  halogen: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/70 dark:text-blue-300",
  transition: "bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/70 dark:text-sky-300",
  "post-transition": "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/70 dark:text-indigo-300",
  lanthanide: "bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950/70 dark:text-pink-300",
  actinide: "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/70 dark:text-orange-300",
};

// Elemental Donut Pie Chart Component
function ElementalDonutChart({ elements }: { elements: ParsedElement[] }) {
  const R = 36;
  const C = 2 * Math.PI * R; // ~226.195

  const totalMass = useMemo(() => {
    return elements.reduce((acc, el) => acc + el.totalSubMass, 0);
  }, [elements]);

  const slices = useMemo(() => {
    let accumulatedAngle = 0;
    return elements.map((el) => {
      const portion = totalMass > 0 ? el.totalSubMass / totalMass : 0;
      const strokeLength = portion * C;
      const rotation = (accumulatedAngle / 100) * 360;
      accumulatedAngle += el.massPercentage;
      return {
        ...el,
        strokeLength,
        rotation,
      };
    });
  }, [elements, totalMass, C]);

  return (
    <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-3">
      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block text-center">
        Elemental Mass Percentage Distribution
      </span>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Vector Donut Pie Chart */}
        <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={R}
              stroke="currentColor"
              strokeWidth="14"
              fill="transparent"
              className="text-slate-200 dark:text-zinc-700"
            />
            {slices.map((slice, idx) => {
              const dashArray = `${slice.strokeLength} ${C - slice.strokeLength}`;
              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={R}
                  stroke={slice.color}
                  strokeWidth="14"
                  strokeDasharray={dashArray}
                  strokeDashoffset={0}
                  transform={`rotate(${slice.rotation} 50 50)`}
                  fill="transparent"
                  className="transition-all duration-500 ease-out hover:opacity-80"
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-black font-mono text-slate-900 dark:text-zinc-100">
              {totalMass.toFixed(1)}
            </span>
            <span className="text-[8px] font-extrabold uppercase text-slate-400 tracking-wider">
              g/mol
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-1.5 flex-1 min-w-0 text-xs w-full">
          {slices.map((slice, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="font-bold text-slate-800 dark:text-zinc-200 truncate">
                  {slice.symbol} ({slice.name}):
                </span>
              </div>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 shrink-0">
                {slice.massPercentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MolecularWeightCalculator() {
  // Mode State
  const [mode, setMode] = useState<ParserMode>("formula");

  // Formula Inputs
  const [formula, setFormula] = useState<string>("C6H12O6");
  const [isMonoisotopicMode, setIsMonoisotopicMode] = useState<boolean>(false);

  // Reverse Empirical Solver Inputs
  const [percentC, setPercentC] = useState<number>(40.0);
  const [percentH, setPercentH] = useState<number>(6.71);
  const [percentO, setPercentO] = useState<number>(53.29);
  const [targetMolarMass, setTargetMolarMass] = useState<number>(180.16);

  // Grams to Moles Converter Input
  const [inputGrams, setInputGrams] = useState<number>(10.0);

  // UI State
  const [copiedSpec, setCopiedSpec] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Insert String into Formula
  const handleInsertFormulaSymbol = (str: string) => {
    setFormula((prev) => prev + str);
  };

  // Auto-Correct Formula Casing
  const handleAutoFixCasing = () => {
    setFormula((prev) => autoCorrectFormulaCase(prev));
  };

  // Preset Compounds
  const handleSelectPreset = (presetFormula: string) => {
    setFormula(presetFormula);
  };

  // Calculate Output Results
  const result: MolecularWeightOutputs = useMemo(() => {
    return calculateMolecularWeightCalculator({
      mode,
      formula,
      isMonoisotopicMode,
      percentC,
      percentH,
      percentO,
      targetMolarMass,
      inputGrams,
    });
  }, [mode, formula, isMonoisotopicMode, percentC, percentH, percentO, targetMolarMass, inputGrams]);

  // Copy Spec Sheet to Clipboard
  const handleCopySpec = () => {
    if (result && typeof navigator !== "undefined") {
      const text = `Formula: ${result.formula}\nMolar Mass: ${result.totalMolarMass} g/mol\nMonoisotopic Mass: ${result.totalMonoisotopicMass} Da\nElements:\n${result.parsedElements
        .map((el) => `• ${el.symbol} (${el.name}): ${el.count} atoms, ${el.massPercentage}%`)
        .join("\n")}`;
      navigator.clipboard.writeText(text);
      setCopiedSpec(true);
      setTimeout(() => setCopiedSpec(false), 2000);
    }
  };

  // PDF Report Data
  const reportData = useMemo(() => {
    return generateGenericReportData(
      molecular_weight_calculatorConfig,
      {
        mode,
        formula: result.formula,
      },
      {
        success: true,
        data: {},
        formatted: {
          molarMass: `${result.totalMolarMass} g/mol`,
          monoisotopicMass: `${result.totalMonoisotopicMass} Da`,
        },
      }
    );
  }, [mode, result]);

  return (
    <div className="space-y-6">
      {/* HEADER CONTROL BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
            <Atom className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
              Next-Gen Molecular Weight Calculator (Molar Mass)
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Nested Brackets • Crystal Hydrates • Monoisotopic Mass • Periodic Table Pad • Empirical Solver
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySpec}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedSpec ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedSpec ? "Copied!" : "Copy Spec Sheet"}</span>
          </button>
        </div>
      </div>

      {/* WORKSPACE 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Col 7) - FORMULA INPUT & PERIODIC TABLE PAD */}
        <div className="lg:col-span-7 space-y-4">
          {/* TABBED MODE SUITE */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700 gap-1">
            {[
              { id: "formula", label: "Chemical Formula", icon: Atom },
              { id: "empirical_solver", label: "Empirical ↔ Molecular Solver", icon: Wand2 },
              { id: "mass_converter", label: "Moles ↔ Grams ↔ Molecules", icon: Scale },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id as ParserMode)}
                  className={`flex-1 min-w-[140px] py-2 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mode === tab.id
                      ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* MODE 1: FORMULA INPUT & QUICK PAD */}
          {mode === "formula" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              {/* Formula Search & Input Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="chemical-formula-input" className="text-xs font-extrabold text-slate-900 dark:text-zinc-100 flex items-center gap-1">
                    Enter Chemical Formula:
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoFixCasing}
                    className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Wand2 className="h-3 w-3" /> Auto-Fix Casing
                  </button>
                </div>

                <div className="relative">
                  <Input
                    id="chemical-formula-input"
                    type="text"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    placeholder="e.g. C6H12O6, [Co(NH3)5(CO3)]NO3, CuSO4*5H2O..."
                    className="h-10 text-sm font-mono font-bold bg-slate-50 dark:bg-zinc-800 border-slate-300 dark:border-zinc-700 tracking-wide"
                  />
                </div>

                {result.parseError && (
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400 pt-0.5">
                    ⚠️ {result.parseError}
                  </p>
                )}
              </div>

              {/* QUICK INSERT KEYPAD */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider">
                  Quick Insert Pad &amp; Hydrates
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["(", ")", "[", "]", "*", "·", "5H2O", "12H2O", "Me", "Et", "Ph", "Ac"].map((btn) => (
                    <button
                      key={btn}
                      type="button"
                      onClick={() => handleInsertFormulaSymbol(btn)}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 text-xs font-mono font-bold text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 cursor-pointer transition-all"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>

              {/* COMMON COMPOUND PRESETS */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-zinc-800">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider">
                  Common Lab Reagent Presets
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { label: "Glucose", f: "C6H12O6" },
                    { label: "Water", f: "H2O" },
                    { label: "Salt (NaCl)", f: "NaCl" },
                    { label: "Sulfuric Acid", f: "H2SO4" },
                    { label: "Copper Sulfate Pentahydrate", f: "CuSO4*5H2O" },
                    { label: "Complex Cobalt", f: "[Co(NH3)5(CO3)]NO3" },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handleSelectPreset(p.f)}
                      className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200 dark:border-emerald-800 cursor-pointer transition-all"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: EMPIRICAL TO MOLECULAR REVERSE SOLVER */}
          {mode === "empirical_solver" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-100 dark:border-zinc-800 pb-2">
                Empirical &amp; Molecular Formula Reverse Solver
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="percent-c-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Carbon Mass % (C):
                  </label>
                  <Input
                    id="percent-c-input"
                    type="number"
                    value={percentC}
                    onChange={(e) => setPercentC(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="percent-h-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Hydrogen Mass % (H):
                  </label>
                  <Input
                    id="percent-h-input"
                    type="number"
                    value={percentH}
                    onChange={(e) => setPercentH(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="percent-o-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Oxygen Mass % (O):
                  </label>
                  <Input
                    id="percent-o-input"
                    type="number"
                    value={percentO}
                    onChange={(e) => setPercentO(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="target-mw-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Target Molar Mass (g/mol):
                  </label>
                  <Input
                    id="target-mw-input"
                    type="number"
                    value={targetMolarMass}
                    onChange={(e) => setTargetMolarMass(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: MOLES <-> GRAMS CONVERTER */}
          {mode === "mass_converter" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-100 dark:border-zinc-800 pb-2">
                Moles ↔ Grams ↔ Molecules Instant Converter
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="converter-formula-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Chemical Formula:
                  </label>
                  <Input
                    id="converter-formula-input"
                    type="text"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    className="h-9 text-xs font-mono font-bold bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="converter-grams-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Sample Mass (Grams g):
                  </label>
                  <Input
                    id="converter-grams-input"
                    type="number"
                    value={inputGrams}
                    onChange={(e) => setInputGrams(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-mono bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (Col 5) - LIGHT ADAPTIVE RESULT DASHBOARD */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Atom className="h-4 w-4 text-emerald-500" /> Molecular Weight Results
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsMonoisotopicMode(!isMonoisotopicMode)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border transition-all cursor-pointer ${
                  isMonoisotopicMode
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700"
                }`}
              >
                {isMonoisotopicMode ? "Monoisotopic (MS)" : "Average (IUPAC)"}
              </button>
            </div>
          </div>

          {/* HERO SOLVED RESULT BADGE */}
          <div className="text-center bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-blue-50/60 dark:from-zinc-800 dark:to-zinc-800/80 p-5 rounded-2xl border border-emerald-100 dark:border-zinc-700 space-y-2 shadow-xs">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider block">
              {isMonoisotopicMode ? "Monoisotopic Mass (Exact Iso)" : "Total Average Molar Mass"}
            </span>

            <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {isMonoisotopicMode ? result.totalMonoisotopicMass : result.totalMolarMass}{" "}
              <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">
                {isMonoisotopicMode ? "Da" : "g/mol"}
              </span>
            </div>

            <span className="text-xs font-extrabold text-slate-600 dark:text-zinc-400 block font-mono">
              Formula: {result.formula}
            </span>
          </div>

          {/* MODE 2: EMPIRICAL SOLVER RESULTS */}
          {mode === "empirical_solver" && result.empiricalResult && (
            <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs font-mono">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-200 dark:border-zinc-700 pb-1">
                Empirical &amp; Molecular Results
              </span>
              <p>• Empirical Formula: <strong>{result.empiricalResult.empiricalFormula}</strong> ({result.empiricalResult.empiricalMass} g/mol)</p>
              <p>• Molecular Multiplier: <strong>{result.empiricalResult.multiplier}x</strong></p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">• Molecular Formula: {result.empiricalResult.molecularFormula} ({result.empiricalResult.molecularMass} g/mol)</p>
            </div>
          )}

          {/* MODE 3: CONVERTER RESULTS */}
          {mode === "mass_converter" && result.converterResult && (
            <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs font-mono">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-200 dark:border-zinc-700 pb-1">
                Sample Quantity Conversion
              </span>
              <p>• Mass: {result.converterResult.grams} g ({result.converterResult.milligrams} mg)</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold">• Moles: {result.converterResult.moles} mol ({result.converterResult.millimoles} mmol)</p>
              <p>• Molecules: {result.converterResult.moleculesCount} molecules</p>
            </div>
          )}

          {/* ELEMENTAL MASS FRACTION DONUT CHART */}
          {result.parsedElements && result.parsedElements.length > 0 && (
            <ElementalDonutChart elements={result.parsedElements} />
          )}

          {/* ELEMENTAL COMPOSITION TABLE */}
          {result.parsedElements && result.parsedElements.length > 0 && (
            <div className="bg-slate-50 dark:bg-zinc-800/60 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-200 dark:border-zinc-700 pb-1">
                Elemental Composition Breakdown Table
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-zinc-700 text-slate-500 dark:text-zinc-400">
                      <th className="py-1">Elem</th>
                      <th className="py-1">Atoms</th>
                      <th className="py-1">At. Weight</th>
                      <th className="py-1 text-right">Mass %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.parsedElements.map((el) => (
                      <tr key={el.symbol} className="border-b border-slate-200/50 dark:border-zinc-800">
                        <td className="py-1.5 font-extrabold text-slate-900 dark:text-zinc-100 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: el.color }} />
                          {el.symbol}
                        </td>
                        <td className="py-1.5">{el.count}</td>
                        <td className="py-1.5">{el.atomicWeight}</td>
                        <td className="py-1.5 text-right font-extrabold text-emerald-600 dark:text-emerald-400">
                          {el.massPercentage}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowReportModal(true)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-xs font-extrabold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <FileText className="h-4 w-4" /> Download Molecular Spec PDF Report
            </button>
          </div>
        </div>
      </div>

      {/* REPORT MODAL */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={reportData}
      />
    </div>
  );
}
