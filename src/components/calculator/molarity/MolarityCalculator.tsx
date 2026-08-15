"use client";

import React, { useState, useMemo } from "react";
import {
  FlaskConical,
  Search,
  FileText,
  Copy,
  Check,
  Sparkles,
  Droplets,
  Layers,
  Percent,
  Sliders,
  Scale,
  Download,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import ReportModal from "@/components/report/ReportModal";
import { generateGenericReportData } from "@/lib/report-generator/generic-report";
import { molarity_calculatorConfig } from "@/app/calculators/molarity-calculator/config";
import { calculateMolarityCalculator } from "@/app/calculators/molarity-calculator/calculator";
import { COMMON_CHEMICAL_COMPOUNDS } from "@/app/calculators/molarity-calculator/compounds";
import {
  MolarityMode,
  SolveVariable,
  ChemicalCompound,
  MolarityCalculatorOutputs,
} from "@/app/calculators/molarity-calculator/types";

export function MolarityCalculator() {
  // Mode State
  const [mode, setMode] = useState<MolarityMode>("mass_solver");

  // Solver Target State (Mode === 'mass_solver')
  const [solveVariable, setSolveVariable] = useState<SolveVariable>("molarity");

  // Compound Search & Selection State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCompound, setSelectedCompound] = useState<ChemicalCompound | null>(COMMON_CHEMICAL_COMPOUNDS[0]);
  const [molarMassInput, setMolarMassInput] = useState<number>(58.44);
  const [hydrateWaters, setHydrateWaters] = useState<number>(0);

  // Unit State
  const [massUnit, setMassUnit] = useState<"g" | "mg" | "ug" | "kg">("g");
  const [volumeUnit, setVolumeUnit] = useState<"L" | "mL" | "uL">("L");
  const [molarityUnit, setMolarityUnit] = useState<"M" | "mM" | "uM">("M");

  // Raw Input Numerical Values
  const [massValue, setMassValue] = useState<number>(58.44);
  const [molarityValue, setMolarityValue] = useState<number>(1.0);
  const [volumeValue, setVolumeValue] = useState<number>(1.0);

  // Dilution Inputs (C1V1 = C2V2)
  const [solveDilutionTarget, setSolveDilutionTarget] = useState<"v1" | "c1" | "v2" | "c2">("v1");
  const [c1, setC1] = useState<number>(10);
  const [v1, setV1] = useState<number>(10);
  const [c2, setC2] = useState<number>(1);
  const [v2, setV2] = useState<number>(100);

  // Mass Percent & Density Inputs
  const [massPercent, setMassPercent] = useState<number>(37);
  const [density, setDensity] = useState<number>(1.19);
  const [valence, setValence] = useState<number>(1);

  // PPM Converter Inputs
  const [ppmValue, setPpmValue] = useState<number>(500);

  // UI State
  const [copiedProtocol, setCopiedProtocol] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Compound Search Autocomplete Filter
  const filteredCompounds = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return COMMON_CHEMICAL_COMPOUNDS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.formula.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Handle Compound Selection
  const handleSelectCompound = (comp: ChemicalCompound) => {
    setSelectedCompound(comp);
    setMolarMassInput(comp.molarMass);
    if (comp.valence) setValence(comp.valence);
    setSearchQuery("");
  };

  // Convert Mass to Grams
  const massGrams = useMemo(() => {
    switch (massUnit) {
      case "mg":
        return massValue / 1000;
      case "ug":
        return massValue / 1000000;
      case "kg":
        return massValue * 1000;
      default:
        return massValue;
    }
  }, [massValue, massUnit]);

  // Convert Volume to Liters
  const volumeLiters = useMemo(() => {
    switch (volumeUnit) {
      case "mL":
        return volumeValue / 1000;
      case "uL":
        return volumeValue / 1000000;
      default:
        return volumeValue;
    }
  }, [volumeValue, volumeUnit]);

  // Convert Molarity to M
  const molarityM = useMemo(() => {
    switch (molarityUnit) {
      case "mM":
        return molarityValue / 1000;
      case "uM":
        return molarityValue / 1000000;
      default:
        return molarityValue;
    }
  }, [molarityValue, molarityUnit]);

  // Calculate Results
  const result: MolarityCalculatorOutputs = useMemo(() => {
    return calculateMolarityCalculator({
      mode,
      solveVariable,
      solveTarget: solveDilutionTarget,
      massGrams,
      molarityM,
      volumeLiters,
      molarMass: molarMassInput,
      hydrateWaters,
      c1,
      v1,
      c2,
      v2,
      massPercent,
      densityGperML: density,
      valence,
      ppm: ppmValue,
    });
  }, [
    mode,
    solveVariable,
    solveDilutionTarget,
    massGrams,
    molarityM,
    volumeLiters,
    molarMassInput,
    hydrateWaters,
    c1,
    v1,
    c2,
    v2,
    massPercent,
    density,
    valence,
    ppmValue,
  ]);

  // Copy Bench Protocol to Clipboard
  const handleCopyProtocol = () => {
    if (result.benchProtocol && typeof navigator !== "undefined") {
      const text = result.benchProtocol.join("\n");
      navigator.clipboard.writeText(text);
      setCopiedProtocol(true);
      setTimeout(() => setCopiedProtocol(false), 2000);
    }
  };

  // PDF Report Data
  const reportData = useMemo(() => {
    return generateGenericReportData(
      molarity_calculatorConfig,
      {
        mode,
        solveVariable,
      },
      {
        success: true,
        data: {},
        formatted: {
          solvedValue: result.formattedSolvedValue || "N/A",
          molarityM: `${result.molarityM || 0} M`,
        },
      }
    );
  }, [mode, solveVariable, result]);

  return (
    <div className="space-y-6">
      {/* HEADER CONTROL BAR */}
      <div className="bg-slate-50 dark:bg-zinc-900 p-3.5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
            <FlaskConical className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
              Next-Gen Molarity Calculator &amp; Dilution Solver
            </h3>
            <p className="text-[10px] text-slate-500 dark:text-zinc-400">
              Bidirectional Mass Solver • Stock Dilution C1V1=C2V2 • Mass % &amp; PPM Converter • Lab Protocols
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyProtocol}
            className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedProtocol ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedProtocol ? "Copied!" : "Copy Recipe"}</span>
          </button>
        </div>
      </div>

      {/* WORKSPACE 2-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (Col 7) - INPUTS & CHEMICAL COMPOUND DATABASE */}
        <div className="lg:col-span-7 space-y-4">
          {/* TABBED MODE SUITE */}
          <div className="flex flex-wrap items-center p-1 bg-slate-100 dark:bg-zinc-800/80 rounded-xl border border-slate-200 dark:border-zinc-700 gap-1">
            {[
              { id: "mass_solver", label: "Molarity & Mass Solver", icon: Scale },
              { id: "dilution", label: "Stock Dilution (C1V1=C2V2)", icon: Droplets },
              { id: "mass_percent", label: "Mass % to Molarity", icon: Percent },
              { id: "ppm_converter", label: "PPM / PPB Converter", icon: Layers },
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMode(tab.id as MolarityMode)}
                  className={`flex-1 min-w-[130px] py-2 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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

          {/* SMART CHEMICAL COMPOUND SEARCH & AUTCOMPLETE */}
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Search className="h-3.5 w-3.5 text-emerald-500" /> Chemical Compound Database
              </span>
              {selectedCompound && (
                <span className="text-[10px] font-sans tabular-nums font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {selectedCompound.formula} ({selectedCompound.molarMass} g/mol)
                </span>
              )}
            </div>

            {/* Quick Favorite Compound Badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400">Quick Select:</span>
              {COMMON_CHEMICAL_COMPOUNDS.slice(0, 6).map((comp) => (
                <button
                  key={comp.formula}
                  type="button"
                  onClick={() => handleSelectCompound(comp)}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-all cursor-pointer ${
                    selectedCompound?.formula === comp.formula
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-200"
                  }`}
                >
                  {comp.formula}
                </button>
              ))}
            </div>

            {/* Compound Autocomplete Search Field */}
            <div className="relative space-y-1">
              <Input
                type="text"
                placeholder="Search chemical name or formula (e.g. NaCl, NaOH, Tris, H2SO4)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 text-xs bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700"
              />

              {filteredCompounds.length > 0 && (
                <div className="absolute top-10 left-0 right-0 z-20 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-lg max-h-48 overflow-y-auto p-1 space-y-1">
                  {filteredCompounds.map((comp) => (
                    <button
                      key={comp.formula}
                      type="button"
                      onClick={() => handleSelectCompound(comp)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs text-left flex items-center justify-between hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                      <span className="font-bold text-slate-900 dark:text-zinc-100">{comp.name}</span>
                      <span className="font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
                        {comp.formula} ({comp.molarMass} g/mol)
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Molar Mass & Hydrate Multiplier Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label htmlFor="molar-mass-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Molar Mass / Formula Weight (g/mol):
                </label>
                <Input
                  id="molar-mass-input"
                  type="number"
                  step="0.001"
                  value={molarMassInput}
                  onChange={(e) => setMolarMassInput(parseFloat(e.target.value) || 0)}
                  className="h-8 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="hydrate-select" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  Hydrate Water Multiplier (H₂O):
                </label>
                <select
                  id="hydrate-select"
                  value={hydrateWaters}
                  onChange={(e) => setHydrateWaters(parseInt(e.target.value, 10) || 0)}
                  className="w-full h-8 px-2 rounded-lg text-xs font-bold bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100"
                >
                  <option value={0}>Anhydrous (+0 g/mol)</option>
                  <option value={1}>Monohydrate (+18.015 g/mol)</option>
                  <option value={2}>Dihydrate (+36.030 g/mol)</option>
                  <option value={3}>Trihydrate (+54.045 g/mol)</option>
                  <option value={5}>Pentahydrate (+90.075 g/mol)</option>
                  <option value={7}>Heptahydrate (+126.105 g/mol)</option>
                </select>
              </div>
            </div>
          </div>

          {/* MODE 1: MASS & MOLARITY 4-VARIABLE SOLVER */}
          {mode === "mass_solver" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              {/* Solve Target Selector */}
              <div className="space-y-1.5 border-b border-slate-100 dark:border-zinc-800 pb-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
                  What do you want to solve for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "molarity", label: "Molarity (M)" },
                    { id: "mass", label: "Mass (g)" },
                    { id: "volume", label: "Volume (L)" },
                    { id: "molar_mass", label: "Molar Mass" },
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSolveVariable(v.id as SolveVariable)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        solveVariable === v.id
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Inputs Based on Solve Variable */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Molarity Input */}
                <div className={`space-y-1 ${solveVariable === "molarity" ? "opacity-50" : ""}`}>
                  <label htmlFor="molarity-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Molarity / Conc:
                  </label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="molarity-input"
                      type="number"
                      disabled={solveVariable === "molarity"}
                      value={molarityValue}
                      onChange={(e) => setMolarityValue(parseFloat(e.target.value) || 0)}
                      className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                    />
                    <select
                      value={molarityUnit}
                      onChange={(e) => setMolarityUnit(e.target.value as any)}
                      className="h-9 px-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700"
                    >
                      <option value="M">M</option>
                      <option value="mM">mM</option>
                      <option value="uM">μM</option>
                    </select>
                  </div>
                </div>

                {/* Mass Input */}
                <div className={`space-y-1 ${solveVariable === "mass" ? "opacity-50" : ""}`}>
                  <label htmlFor="mass-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Solute Mass:
                  </label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="mass-input"
                      type="number"
                      disabled={solveVariable === "mass"}
                      value={massValue}
                      onChange={(e) => setMassValue(parseFloat(e.target.value) || 0)}
                      className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                    />
                    <select
                      value={massUnit}
                      onChange={(e) => setMassUnit(e.target.value as any)}
                      className="h-9 px-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700"
                    >
                      <option value="g">g</option>
                      <option value="mg">mg</option>
                      <option value="ug">μg</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>

                {/* Volume Input */}
                <div className={`space-y-1 ${solveVariable === "volume" ? "opacity-50" : ""}`}>
                  <label htmlFor="volume-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Solution Volume:
                  </label>
                  <div className="flex items-center gap-1">
                    <Input
                      id="volume-input"
                      type="number"
                      disabled={solveVariable === "volume"}
                      value={volumeValue}
                      onChange={(e) => setVolumeValue(parseFloat(e.target.value) || 0)}
                      className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                    />
                    <select
                      value={volumeUnit}
                      onChange={(e) => setVolumeUnit(e.target.value as any)}
                      className="h-9 px-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700"
                    >
                      <option value="L">L</option>
                      <option value="mL">mL</option>
                      <option value="uL">μL</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: STOCK DILUTION (C1V1 = C2V2) */}
          {mode === "dilution" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <div className="space-y-1 border-b border-slate-100 dark:border-zinc-800 pb-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block">
                  Stock Dilution Target (C₁V₁ = C₂V₂)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "v1", label: "Stock Vol (V₁)" },
                    { id: "c1", label: "Stock Conc (C₁)" },
                    { id: "v2", label: "Final Vol (V₂)" },
                    { id: "c2", label: "Target Conc (C₂)" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSolveDilutionTarget(t.id as any)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        solveDilutionTarget === t.id
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="dilution-c1-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Stock Concentration C₁ (M):
                  </label>
                  <Input
                    id="dilution-c1-input"
                    type="number"
                    disabled={solveDilutionTarget === "c1"}
                    value={c1}
                    onChange={(e) => setC1(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="dilution-v1-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Stock Volume V₁ (mL):
                  </label>
                  <Input
                    id="dilution-v1-input"
                    type="number"
                    disabled={solveDilutionTarget === "v1"}
                    value={v1}
                    onChange={(e) => setV1(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="dilution-c2-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Target Concentration C₂ (M):
                  </label>
                  <Input
                    id="dilution-c2-input"
                    type="number"
                    disabled={solveDilutionTarget === "c2"}
                    value={c2}
                    onChange={(e) => setC2(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="dilution-v2-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Final Volume V₂ (mL):
                  </label>
                  <Input
                    id="dilution-v2-input"
                    type="number"
                    disabled={solveDilutionTarget === "v2"}
                    value={v2}
                    onChange={(e) => setV2(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: MASS PERCENT & DENSITY TO MOLARITY */}
          {mode === "mass_percent" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-100 dark:border-zinc-800 pb-2">
                Mass % &amp; Reagent Density Converter
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label htmlFor="mass-percent-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Mass Percentage (% w/w):
                  </label>
                  <Input
                    id="mass-percent-input"
                    type="number"
                    value={massPercent}
                    onChange={(e) => setMassPercent(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="density-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Reagent Density (g/mL):
                  </label>
                  <Input
                    id="density-input"
                    type="number"
                    step="0.01"
                    value={density}
                    onChange={(e) => setDensity(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="valence-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Valence / Equiv Factor (n):
                  </label>
                  <Input
                    id="valence-input"
                    type="number"
                    value={valence}
                    onChange={(e) => setValence(parseInt(e.target.value, 10) || 1)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: PPM / PPB CONVERTER */}
          {mode === "ppm_converter" && (
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-100 dark:border-zinc-800 pb-2">
                PPM / PPB to Molarity &amp; Molality Converter
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="ppm-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Parts Per Million (PPM / mg/L):
                  </label>
                  <Input
                    id="ppm-input"
                    type="number"
                    value={ppmValue}
                    onChange={(e) => setPpmValue(parseFloat(e.target.value) || 0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="ppm-density-input" className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    Solvent Density (g/mL):
                  </label>
                  <Input
                    id="ppm-density-input"
                    type="number"
                    step="0.01"
                    value={density}
                    onChange={(e) => setDensity(parseFloat(e.target.value) || 1.0)}
                    className="h-9 text-xs font-sans tabular-nums bg-slate-50 dark:bg-zinc-800"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN (Col 5) - LIGHT ADAPTIVE RESULT & RECIPE DASHBOARD */}
        <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-2xl shadow-xs space-y-4 text-slate-900 dark:text-zinc-100">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-2.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 flex items-center gap-1.5">
              <FlaskConical className="h-4 w-4 text-emerald-500" /> Solved Solution Output
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
              {mode.toUpperCase()}
            </span>
          </div>

          {/* HERO SOLVED RESULT BADGE */}
          <div className="text-center bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-blue-50/60 dark:from-zinc-800 dark:to-zinc-800/80 p-5 rounded-2xl border border-emerald-100 dark:border-zinc-700 space-y-2 shadow-xs">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 tracking-wider block">
              {mode === "mass_solver"
                ? `Calculated ${solveVariable.replace("_", " ").toUpperCase()}`
                : mode === "dilution"
                ? "Calculated Stock Dilution"
                : mode === "mass_percent"
                ? "Calculated Molarity & Normality"
                : "Calculated PPM Molarity"}
            </span>

            <div className="text-3xl font-black font-sans tabular-nums text-emerald-600 dark:text-emerald-400">
              {mode === "mass_solver" && (
                <>
                  {result.formattedSolvedValue}{" "}
                  <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">
                    {solveVariable === "molarity"
                      ? "M"
                      : solveVariable === "mass"
                      ? "g"
                      : solveVariable === "volume"
                      ? "L"
                      : "g/mol"}
                  </span>
                </>
              )}

              {mode === "dilution" && result.dilutionResult && (
                <>
                  V₁ = {result.dilutionResult.v1.toFixed(2)} <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">mL</span>
                </>
              )}

              {mode === "mass_percent" && result.massPercentResult && (
                <>
                  {result.massPercentResult.molarityM} <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">M ({result.massPercentResult.normalityN} N)</span>
                </>
              )}

              {mode === "ppm_converter" && result.ppmResult && (
                <>
                  {result.ppmResult.molarityM} <span className="text-lg font-bold text-slate-700 dark:text-zinc-300">M</span>
                </>
              )}
            </div>

            {selectedCompound && (
              <span className="text-xs font-extrabold text-slate-600 dark:text-zinc-400 block">
                Solute: {selectedCompound.name} ({selectedCompound.formula})
              </span>
            )}
          </div>

          {/* GENERATED LABORATORY BENCH PROTOCOL RECIPE */}
          {result.benchProtocol && result.benchProtocol.length > 0 && (
            <div className="bg-slate-50 dark:bg-zinc-800/60 p-4 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-2 text-xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-700 dark:text-zinc-300 block border-b border-slate-200 dark:border-zinc-700 pb-1.5">
                Bench Preparation Protocol Recipe
              </span>

              <div className="space-y-1.5 font-sans tabular-nums text-[11px] leading-relaxed text-slate-800 dark:text-zinc-200">
                {result.benchProtocol.map((step, idx) => (
                  <p key={idx} className={idx === 0 ? "font-bold text-emerald-600 dark:text-emerald-400" : ""}>
                    {step}
                  </p>
                ))}
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
              <FileText className="h-4 w-4" /> Download Lab Solution PDF Report
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
