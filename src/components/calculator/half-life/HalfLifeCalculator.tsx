"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Copy, Check, Sparkles, HelpCircle, RefreshCw, BarChart2, Calendar, Database, Bookmark, Trash2, ChevronDown, ChevronUp, RotateCcw, FileText } from "lucide-react";

export type SolveTarget = "remaining" | "initial" | "halflife" | "time" | "decay_constant";
export type TimeUnit = "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | "years" | "millennia";
export type QuantityUnit = "g" | "mg" | "kg" | "%" | "Bq" | "Ci" | "mol";

export interface SavedHalfLifeItem {
  id: string;
  title: string;
  inputs: string;
  operation: string;
  result: string;
  resultsList?: string[];
  expression?: string;
  timestamp: string;
  rawParams?: {
    solveTarget: SolveTarget;
    selectedIsotope: string;
    initialQty: string;
    remainingQty: string;
    halfLifeVal: string;
    halfLifeUnit: TimeUnit;
    elapsedTimeVal: string;
    elapsedTimeUnit: TimeUnit;
    qtyUnit: QuantityUnit;
  };
}

interface Isotope {
  name: string;
  symbol: string;
  halfLifeVal: number;
  halfLifeUnit: TimeUnit;
  mode: string;
  description: string;
}

const ISOTOPES: Isotope[] = [
  { name: "Carbon-14", symbol: "C-14", halfLifeVal: 5730, halfLifeUnit: "years", mode: "Beta-minus (β⁻)", description: "Radiocarbon dating in archaeology" },
  { name: "Uranium-238", symbol: "U-238", halfLifeVal: 4468000000, halfLifeUnit: "years", mode: "Alpha (α)", description: "Geological rock dating & nuclear fuel" },
  { name: "Iodine-131", symbol: "I-131", halfLifeVal: 8.02, halfLifeUnit: "days", mode: "Beta-minus & Gamma", description: "Thyroid cancer radiotherapy" },
  { name: "Cesium-137", symbol: "Cs-137", halfLifeVal: 30.17, halfLifeUnit: "years", mode: "Beta-minus & Gamma", description: "Industrial gauges & fallout tracking" },
  { name: "Radium-226", symbol: "Ra-226", halfLifeVal: 1600, halfLifeUnit: "years", mode: "Alpha (α)", description: "Historical luminous paint & oncology" },
  { name: "Technetium-99m", symbol: "Tc-99m", halfLifeVal: 6.006, halfLifeUnit: "hours", mode: "Gamma (γ)", description: "Diagnostic SPECT medical imaging" },
  { name: "Tritium (Hydrogen-3)", symbol: "H-3", halfLifeVal: 12.32, halfLifeUnit: "years", mode: "Beta-minus (β⁻)", description: "Self-powered lighting & fusion research" },
  { name: "Radon-222", symbol: "Rn-222", halfLifeVal: 3.823, halfLifeUnit: "days", mode: "Alpha (α)", description: "Indoor environmental air hazard" },
  { name: "Cobalt-60", symbol: "Co-60", halfLifeVal: 5.27, halfLifeUnit: "years", mode: "Beta-minus & Gamma", description: "Industrial radiography & sterilization" },
  { name: "Potassium-40", symbol: "K-40", halfLifeVal: 1248000000, halfLifeUnit: "years", mode: "Beta & Electron Capture", description: "Potassium-Argon rock dating" }
];

const TIME_UNIT_SECONDS: Record<TimeUnit, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2629746, // ~30.4375 days
  years: 31557600, // 365.25 days
  millennia: 31557600000
};

/**
 * Adaptive scientific formatter that preserves full scientific fidelity
 * without prematurely truncating small non-zero numbers to 0.000000.
 */
export function formatScientificValue(val: number | undefined, decimals = 6): string {
  if (val === undefined || isNaN(val)) return "";
  if (val === 0) return "0";
  const abs = Math.abs(val);
  if (abs < 1e-5 || abs >= 1e8) {
    return val.toExponential(4);
  }
  return val.toFixed(decimals);
}

export function HalfLifeCalculator() {
  const [solveTarget, setSolveTarget] = useState<SolveTarget>("remaining");
  const [selectedIsotope, setSelectedIsotope] = useState<string>("custom");

  // Inputs for Card 1
  const [initialQty, setInitialQty] = useState<string>("100");
  const [remainingQty, setRemainingQty] = useState<string>("25");
  const [halfLifeVal, setHalfLifeVal] = useState<string>("5730");
  const [halfLifeUnit, setHalfLifeUnit] = useState<TimeUnit>("years");
  const [elapsedTimeVal, setElapsedTimeVal] = useState<string>("11460");
  const [elapsedTimeUnit, setElapsedTimeUnit] = useState<TimeUnit>("years");
  const [qtyUnit, setQtyUnit] = useState<QuantityUnit>("g");

  // Inputs for Card 2
  const [convHalfLifeVal, setConvHalfLifeVal] = useState<string>("5730");
  const [convHalfLifeUnit, setConvHalfLifeUnit] = useState<TimeUnit>("years");

  // Copy feedback states
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  // Saved calculations state for Card 1 (Half-Life & Decay)
  const [savedHalfLifeItems, setSavedHalfLifeItems] = useState<SavedHalfLifeItem[]>([]);
  const [justSavedHalfLife, setJustSavedHalfLife] = useState<boolean>(false);

  // Saved calculations state for Card 2 (Decay Constant & Mean Lifetime)
  const [savedDecayItems, setSavedDecayItems] = useState<SavedHalfLifeItem[]>([]);
  const [justSavedDecay, setJustSavedDecay] = useState<boolean>(false);

  // Expand / Collapse state for saved calculation cards
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    try {
      const storedHalfLife = localStorage.getItem("saved_halflife_calculations");
      if (storedHalfLife) setSavedHalfLifeItems(JSON.parse(storedHalfLife));

      const storedDecay = localStorage.getItem("saved_decay_conversions");
      if (storedDecay) setSavedDecayItems(JSON.parse(storedDecay));
    } catch (e) {}
  }, []);

  // Handle Isotope Selection
  const handleIsotopeChange = (symbol: string) => {
    setSelectedIsotope(symbol);
    if (symbol === "custom") return;
    const found = ISOTOPES.find((iso) => iso.symbol === symbol);
    if (found) {
      setHalfLifeVal(found.halfLifeVal.toString());
      setHalfLifeUnit(found.halfLifeUnit);
      setConvHalfLifeVal(found.halfLifeVal.toString());
      setConvHalfLifeUnit(found.halfLifeUnit);
      if (solveTarget === "remaining" || solveTarget === "initial") {
        setElapsedTimeUnit(found.halfLifeUnit);
      }
    }
  };

  // Convert time to seconds
  const toSeconds = (val: number, unit: TimeUnit) => val * TIME_UNIT_SECONDS[unit];
  const fromSeconds = (sec: number, unit: TimeUnit) => sec / TIME_UNIT_SECONDS[unit];

  // Calculation Engine Card 1
  const calculation = useMemo(() => {
    const N0 = parseFloat(initialQty);
    const Nt = parseFloat(remainingQty);
    const thf = parseFloat(halfLifeVal);
    const tVal = parseFloat(elapsedTimeVal);

    const thfSec = toSeconds(thf, halfLifeUnit);
    const tSec = toSeconds(tVal, elapsedTimeUnit);

    const steps: string[] = [];

    if (solveTarget === "remaining") {
      if (isNaN(N0) || isNaN(thf) || isNaN(tVal) || N0 <= 0 || thfSec <= 0 || tSec < 0) {
        return { error: "Please enter positive initial quantity (N₀ > 0), positive half-life (t½ > 0), and non-negative elapsed time (t ≥ 0)." };
      }

      const numCycles = tSec / thfSec;
      let resNt = N0 * Math.pow(0.5, numCycles);
      let isExtremeUnderflow = false;
      let formattedNt = "";

      if (numCycles > 1022 || resNt === 0) {
        // Logarithmic domain evaluation: log10(N(t)) = log10(N0) - numCycles * log10(2)
        const log10Nt = Math.log10(N0) - numCycles * Math.LOG10E * Math.LN2;
        const exp10 = Math.floor(log10Nt);
        const mantissa = Math.pow(10, log10Nt - exp10);
        formattedNt = `${mantissa.toFixed(4)}e${exp10}`;
        resNt = Number(formattedNt);
        isExtremeUnderflow = true;
      } else {
        formattedNt = formatScientificValue(resNt, 6);
      }

      const percentRemaining = (resNt / N0) * 100;
      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Formula: N(t) = N₀ × (1/2)^(t / t½)`);
      steps.push(`Calculate Number of Cycles: n = t / t½ = ${tVal} ${elapsedTimeUnit} / ${thf} ${halfLifeUnit} = ${formatScientificValue(numCycles, 4)} cycles`);
      steps.push(`Exponential Factor: (0.5)^(${formatScientificValue(numCycles, 4)}) = ${isExtremeUnderflow ? formattedNt : formatScientificValue(Math.pow(0.5, numCycles), 6)}`);
      steps.push(`Evaluate Remaining Quantity: N(t) = ${N0} × ${isExtremeUnderflow ? formattedNt : formatScientificValue(Math.pow(0.5, numCycles), 6)} = ${formattedNt} ${qtyUnit}`);
      steps.push(`Percent Remaining: (${formattedNt} / ${N0}) × 100% = ${formatScientificValue(percentRemaining, 2)}%`);

      return {
        solvedVal: resNt,
        formattedVal: formattedNt,
        solvedLabel: `Remaining Quantity (Nₜ)`,
        unit: qtyUnit,
        numCycles,
        percentRemaining,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `N(t) = ${N0} \\times \\left(\\frac{1}{2}\\right)^{\\frac{${tVal}}{${thf}}} = ${formattedNt} \\text{ ${qtyUnit}}`,
        steps,
        error: null
      };
    } else if (solveTarget === "initial") {
      if (isNaN(Nt) || isNaN(thf) || isNaN(tVal) || Nt <= 0 || thfSec <= 0 || tSec < 0) {
        return { error: "Please enter positive remaining quantity (Nₜ > 0), positive half-life (t½ > 0), and non-negative elapsed time (t ≥ 0)." };
      }

      const numCycles = tSec / thfSec;
      let resN0 = Nt * Math.pow(2, numCycles);
      let formattedN0 = "";
      if (numCycles > 1022 || !isFinite(resN0)) {
        const log10N0 = Math.log10(Nt) + numCycles * Math.LOG10E * Math.LN2;
        const exp10 = Math.floor(log10N0);
        const mantissa = Math.pow(10, log10N0 - exp10);
        formattedN0 = `${mantissa.toFixed(4)}e+${exp10}`;
        resN0 = Number(formattedN0);
      } else {
        formattedN0 = formatScientificValue(resN0, 6);
      }

      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Formula: N₀ = N(t) × 2^(t / t½)`);
      steps.push(`Calculate Number of Cycles: n = t / t½ = ${tVal} ${elapsedTimeUnit} / ${thf} ${halfLifeUnit} = ${formatScientificValue(numCycles, 4)} cycles`);
      steps.push(`Growth Multiplier: 2^(${formatScientificValue(numCycles, 4)}) = ${formatScientificValue(Math.pow(2, Math.min(numCycles, 1000)), 6)}`);
      steps.push(`Evaluate Initial Quantity: N₀ = ${Nt} × 2^(${formatScientificValue(numCycles, 4)}) = ${formattedN0} ${qtyUnit}`);

      return {
        solvedVal: resN0,
        formattedVal: formattedN0,
        solvedLabel: `Initial Quantity (N₀)`,
        unit: qtyUnit,
        numCycles,
        percentRemaining: (Nt / resN0) * 100,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `N_0 = ${Nt} \\times 2^{\\frac{${tVal}}{${thf}}} = ${formattedN0} \\text{ ${qtyUnit}}`,
        steps,
        error: null
      };
    } else if (solveTarget === "halflife") {
      if (isNaN(N0) || isNaN(Nt) || isNaN(tVal) || N0 <= 0 || tSec <= 0) {
        return { error: "Initial quantity (N₀ > 0) and elapsed time (t > 0) must be positive numbers." };
      }
      if (Nt <= 0) {
        return { error: "Remaining quantity N(t) must be greater than zero. For ideal exponential decay, N(t) reaches zero only as t approaches infinity." };
      }
      if (Nt >= N0) {
        return { error: "Initial quantity (N₀) must be strictly greater than remaining quantity (Nₜ) for passive decay (N₀ > Nₜ > 0)." };
      }

      const resThfSec = (tSec * Math.LN2) / Math.log(N0 / Nt);
      const resThfUnit = fromSeconds(resThfSec, halfLifeUnit);
      const numCycles = tSec / resThfSec;
      const decayConstUnit = Math.LN2 / resThfUnit;
      const meanLifetimeUnit = resThfUnit / Math.LN2;
      const formattedThf = formatScientificValue(resThfUnit, 6);

      steps.push(`Formula: t½ = t × ln(2) / ln(N₀ / Nₜ)`);
      steps.push(`Logarithmic Decay Ratio: ln(N₀ / Nₜ) = ln(${N0} / ${Nt}) = ${Math.log(N0 / Nt).toFixed(6)}`);
      steps.push(`Calculate Elapsed Cycles: n = ln(N₀ / Nₜ) / ln(2) = ${formatScientificValue(numCycles, 4)} cycles`);
      steps.push(`Evaluate Half-Life in ${halfLifeUnit}: t½ = ${tVal} ${elapsedTimeUnit} / ${formatScientificValue(numCycles, 4)} = ${formattedThf} ${halfLifeUnit}`);

      return {
        solvedVal: resThfUnit,
        formattedVal: formattedThf,
        solvedLabel: `Half-Life (t½)`,
        unit: halfLifeUnit,
        numCycles,
        percentRemaining: (Nt / N0) * 100,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `t_{1/2} = \\frac{${tVal} \\times \\ln(2)}{\\ln(${N0}/${Nt})} = ${formattedThf} \\text{ ${halfLifeUnit}}`,
        steps,
        error: null
      };
    } else if (solveTarget === "time") {
      if (isNaN(N0) || isNaN(Nt) || isNaN(thf) || N0 <= 0 || thfSec <= 0) {
        return { error: "Initial quantity (N₀ > 0) and half-life (t½ > 0) must be positive numbers." };
      }
      if (Nt <= 0) {
        return { error: "Remaining quantity N(t) must be greater than zero. For ideal exponential decay, N(t) reaches zero only as t approaches infinity." };
      }
      if (Nt >= N0) {
        return { error: "Initial quantity (N₀) must be strictly greater than remaining quantity (Nₜ) for passive decay (N₀ > Nₜ > 0)." };
      }

      const resTSec = (thfSec * Math.log(N0 / Nt)) / Math.LN2;
      const resTUnit = fromSeconds(resTSec, elapsedTimeUnit);
      const numCycles = resTSec / thfSec;
      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;
      const formattedT = formatScientificValue(resTUnit, 6);

      steps.push(`Formula: t = t½ × [ln(N₀ / Nₜ) / ln(2)]`);
      steps.push(`Logarithmic Decay Ratio: ln(N₀ / Nₜ) = ln(${N0} / ${Nt}) = ${Math.log(N0 / Nt).toFixed(6)}`);
      steps.push(`Calculate Elapsed Cycles: n = ln(N₀ / Nₜ) / ln(2) = ${formatScientificValue(numCycles, 4)} cycles`);
      steps.push(`Evaluate Elapsed Time in ${elapsedTimeUnit}: t = ${thf} ${halfLifeUnit} × ${formatScientificValue(numCycles, 4)} = ${formattedT} ${elapsedTimeUnit}`);

      return {
        solvedVal: resTUnit,
        formattedVal: formattedT,
        solvedLabel: `Elapsed Time (t)`,
        unit: elapsedTimeUnit,
        numCycles,
        percentRemaining: (Nt / N0) * 100,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `t = ${thf} \\times \\frac{\\ln(${N0}/${Nt})}{\\ln(2)} = ${formattedT} \\text{ ${elapsedTimeUnit}}`,
        steps,
        error: null
      };
    } else {
      if (isNaN(thf) || thf <= 0) {
        return { error: "Please enter a valid positive half-life." };
      }
      const decayConstUnit = Math.LN2 / thf;
      const meanLifetimeUnit = thf / Math.LN2;

      steps.push(`Decay Constant: λ = ln(2) / t½ = 0.693147 / ${thf} = ${decayConstUnit.toFixed(6)} 1/${halfLifeUnit}`);
      steps.push(`Mean Lifetime: τ = 1 / λ = t½ / ln(2) = ${thf} / 0.693147 = ${meanLifetimeUnit.toFixed(6)} ${halfLifeUnit}`);

      return {
        solvedVal: decayConstUnit,
        formattedVal: decayConstUnit.toFixed(6),
        solvedLabel: `Decay Constant (λ)`,
        unit: `1/${halfLifeUnit}`,
        numCycles: 1,
        percentRemaining: 50,
        decayConstUnit,
        meanLifetimeUnit,
        latex: `\\lambda = \\frac{\\ln(2)}{${thf}} = ${decayConstUnit.toFixed(6)} \\text{ 1/${halfLifeUnit}}, \\quad \\tau = ${meanLifetimeUnit.toFixed(6)} \\text{ ${halfLifeUnit}}`,
        steps,
        error: null
      };
    }
  }, [solveTarget, initialQty, remainingQty, halfLifeVal, halfLifeUnit, elapsedTimeVal, elapsedTimeUnit, qtyUnit]);

  // Card 2 Calculation: Decay Constant & Mean Lifetime Converter
  const decayConversionResult = useMemo(() => {
    const thf = parseFloat(convHalfLifeVal);
    if (isNaN(thf) || thf <= 0) return { error: "Please enter a valid positive half-life value." };

    const thfSec = toSeconds(thf, convHalfLifeUnit);
    const lambdaSec = Math.LN2 / thfSec;
    const lambdaUnit = Math.LN2 / thf;
    const tauSec = thfSec / Math.LN2;
    const tauUnit = thf / Math.LN2;

    const stepLines = [
      `Half-Life Input: t½ = ${thf} ${convHalfLifeUnit} (${thfSec.toExponential(4)} seconds)`,
      `Decay Constant Formula: λ = ln(2) / t½`,
      `λ = 0.693147 / ${thf} = ${lambdaUnit.toExponential(4)} 1/${convHalfLifeUnit} (${lambdaSec.toExponential(4)} s⁻¹)`,
      `Mean Lifetime Formula: τ = 1 / λ = t½ / ln(2)`,
      `τ = ${thf} / 0.693147 = ${tauUnit.toFixed(4)} ${convHalfLifeUnit} (${tauSec.toExponential(4)} s)`
    ];

    return {
      lambdaSec: lambdaSec.toExponential(4),
      lambdaUnit: lambdaUnit.toExponential(4),
      tauSec: tauSec.toExponential(4),
      tauUnit: tauUnit.toFixed(4),
      steps: stepLines,
      error: null
    };
  }, [convHalfLifeVal, convHalfLifeUnit]);

  // Save Card 1 Handler
  const handleSaveHalfLife = () => {
    if (calculation.error || calculation.solvedVal === undefined) return;

    const inputsStr = `Target: ${calculation.solvedLabel}, N₀: ${initialQty} ${qtyUnit}, N(t): ${remainingQty} ${qtyUnit}, t½: ${halfLifeVal} ${halfLifeUnit}, t: ${elapsedTimeVal} ${elapsedTimeUnit}`;
    const opStr = `Radioactive Decay Calculation`;
    const resList = [
      `Solved Value = ${calculation.formattedVal || formatScientificValue(calculation.solvedVal, 6)} ${calculation.unit}`,
      `Cycles Elapsed = ${calculation.numCycles !== undefined ? formatScientificValue(calculation.numCycles, 3) : "N/A"} t½`,
      `Percent Remaining = ${calculation.percentRemaining !== undefined ? calculation.percentRemaining.toFixed(2) : "N/A"}%`,
      `Decay Constant (λ) = ${calculation.decayConstUnit?.toExponential(4)}`,
      `Mean Lifetime (τ) = ${calculation.meanLifetimeUnit !== undefined ? formatScientificValue(calculation.meanLifetimeUnit, 4) : "N/A"}`
    ];

    const newItem: SavedHalfLifeItem = {
      id: Date.now().toString(),
      title: `Half-Life Decay (${calculation.solvedLabel})`,
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `N(t) = N₀ × (1/2)^(t / t½)`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: {
        solveTarget,
        selectedIsotope,
        initialQty,
        remainingQty,
        halfLifeVal,
        halfLifeUnit,
        elapsedTimeVal,
        elapsedTimeUnit,
        qtyUnit
      }
    };

    const updated = [newItem, ...savedHalfLifeItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedHalfLifeItems(updated);
    try {
      localStorage.setItem("saved_halflife_calculations", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedHalfLife(true);
    setTimeout(() => setJustSavedHalfLife(false), 2000);
  };

  // Restore Card 1 Handler
  const handleRestoreHalfLife = (item: SavedHalfLifeItem) => {
    if (!item.rawParams) return;
    const p = item.rawParams;
    setSolveTarget(p.solveTarget);
    setSelectedIsotope(p.selectedIsotope);
    setInitialQty(p.initialQty);
    setRemainingQty(p.remainingQty);
    setHalfLifeVal(p.halfLifeVal);
    setHalfLifeUnit(p.halfLifeUnit);
    setElapsedTimeVal(p.elapsedTimeVal);
    setElapsedTimeUnit(p.elapsedTimeUnit);
    setQtyUnit(p.qtyUnit);
  };

  // Save Card 2 Handler
  const handleSaveDecay = () => {
    if (!decayConversionResult || decayConversionResult.error) return;

    const inputsStr = `Half-Life (t½): ${convHalfLifeVal} ${convHalfLifeUnit}`;
    const opStr = `Decay Constant & Mean Lifetime Conversion`;
    const resList = [
      `Decay Constant (λ) = ${decayConversionResult.lambdaUnit} 1/${convHalfLifeUnit}`,
      `Decay Constant (λ in s⁻¹) = ${decayConversionResult.lambdaSec} s⁻¹`,
      `Mean Lifetime (τ) = ${decayConversionResult.tauUnit} ${convHalfLifeUnit}`,
      `Mean Lifetime (τ in sec) = ${decayConversionResult.tauSec} s`
    ];

    const newItem: SavedHalfLifeItem = {
      id: Date.now().toString(),
      title: "Decay Constant & Mean Lifetime",
      inputs: inputsStr,
      operation: opStr,
      result: resList.join(" | "),
      resultsList: resList,
      expression: `λ = ln(2)/t½, τ = t½/ln(2)`,
      timestamp: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      rawParams: {
        solveTarget: "decay_constant",
        selectedIsotope: "custom",
        initialQty: "100",
        remainingQty: "25",
        halfLifeVal: convHalfLifeVal,
        halfLifeUnit: convHalfLifeUnit,
        elapsedTimeVal: "0",
        elapsedTimeUnit: convHalfLifeUnit,
        qtyUnit: "g"
      }
    };

    const updated = [newItem, ...savedDecayItems.filter((item) => item.inputs !== inputsStr)].slice(0, 15);
    setSavedDecayItems(updated);
    try {
      localStorage.setItem("saved_decay_conversions", JSON.stringify(updated));
    } catch (err) {}

    setJustSavedDecay(true);
    setTimeout(() => setJustSavedDecay(false), 2000);
  };

  // Restore Card 2 Handler
  const handleRestoreDecay = (item: SavedHalfLifeItem) => {
    if (!item.rawParams) return;
    setConvHalfLifeVal(item.rawParams.halfLifeVal);
    setConvHalfLifeUnit(item.rawParams.halfLifeUnit);
  };

  // Generate 10-cycle decay table data
  const cycleTableData = useMemo(() => {
    if (calculation.error) return [];
    const n0Val = solveTarget === "initial" ? (calculation.solvedVal ?? 100) : (parseFloat(initialQty) || 100);
    const rows = [];
    for (let c = 0; c <= 10; c++) {
      const rem = n0Val * Math.pow(0.5, c);
      const pct = 100 * Math.pow(0.5, c);
      rows.push({
        cycle: c,
        remaining: rem,
        percentage: pct
      });
    }
    return rows;
  }, [calculation, initialQty, solveTarget]);

  // Render SVG Decay Curve Chart with Dynamic Scaling (0-20 cycles)
  const svgChart = useMemo(() => {
    if (calculation.error) return null;

    const width = 450;
    const height = 210;
    const padding = 38;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const calculatedCycles = Number(calculation.numCycles ?? 0);
    // Dynamic scale: between 5 and 20 cycles
    const maxCycles = Math.min(Math.max(5, Math.ceil(calculatedCycles)), 20);
    const isBeyondScale = calculatedCycles > 20;

    // Generate points along current visible scale
    const points: [number, number][] = [];
    for (let i = 0; i <= 60; i++) {
      const cycle = (i / 60) * maxCycles;
      const x = padding + (cycle / maxCycles) * chartWidth;
      const yVal = Math.pow(0.5, cycle);
      const y = padding + (1 - yVal) * chartHeight;
      points.push([x, y]);
    }

    const pathD = points.reduce((acc, curr, idx) => `${acc} ${idx === 0 ? "M" : "L"} ${curr[0].toFixed(2)} ${curr[1].toFixed(2)}`, "");

    // Marker coordinate calculation
    let curX = 0;
    let curY = 0;
    let showMarker = false;

    if (!isBeyondScale && calculatedCycles >= 0) {
      curX = padding + (calculatedCycles / maxCycles) * chartWidth;
      const curYVal = Math.pow(0.5, calculatedCycles);
      curY = padding + (1 - curYVal) * chartHeight;
      showMarker = true;
    }

    // Dynamic x-axis ticks based on maxCycles
    let ticks: number[] = [];
    if (maxCycles <= 5) {
      ticks = [0, 1, 2, 3, 4, 5];
    } else if (maxCycles <= 10) {
      ticks = [0, 2, 4, 6, 8, 10];
    } else {
      ticks = [0, 5, 10, 15, 20];
    }

    return (
      <div className="space-y-2">
        <svg suppressHydrationWarning viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-xs font-sans tabular-nums">
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padding + (1 - pct) * chartHeight;
            return (
              <g key={i}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="currentColor" strokeOpacity={0.1} />
                <text x={padding - 6} y={y + 3} textAnchor="end" className="fill-slate-400 text-[9px] font-bold">
                  {Math.round(pct * 100)}%
                </text>
              </g>
            );
          })}

          {ticks.map((c) => {
            const x = padding + (c / maxCycles) * chartWidth;
            return (
              <g key={c}>
                <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="currentColor" strokeOpacity={0.1} />
                <text x={x} y={height - padding + 14} textAnchor="middle" className="fill-slate-400 text-[9px] font-bold">
                  {c}t½
                </text>
              </g>
            );
          })}

          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth={2.5} className="dark:stroke-blue-400" />

          {showMarker && (
            <g>
              <circle cx={curX} cy={curY} r={5} fill="#2563eb" className="animate-pulse" />
              <circle cx={curX} cy={curY} r={8} fill="none" stroke="#2563eb" strokeWidth={1.5} opacity={0.6} />
            </g>
          )}
        </svg>

        {isBeyondScale && (
          <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
            <span>Current point: {calculatedCycles.toFixed(1)} half-lives</span>
            <span className="text-[10px] uppercase font-extrabold tracking-wider">Beyond Visible Scale (0–20 t½)</span>
          </div>
        )}
      </div>
    );
  }, [calculation]);

  const handleCopyLatex = (latex: string) => {
    try {
      navigator.clipboard.writeText(latex);
      setCopiedLatex(true);
      setTimeout(() => setCopiedLatex(false), 2000);
    } catch (e) {}
  };

  const handleCopyResult = () => {
    if (calculation.error || calculation.solvedVal === undefined) return;
    const summaryLines = [
      `Half-Life & Radioactive Decay Calculation`,
      `Target Variable: ${calculation.solvedLabel}`,
      `Solved Value: ${calculation.formattedVal || formatScientificValue(calculation.solvedVal, 6)} ${calculation.unit}`,
      solveTarget !== "initial" ? `Initial Quantity (N₀): ${initialQty} ${qtyUnit}` : `Solved Initial Quantity (N₀): ${calculation.formattedVal} ${qtyUnit}`,
      solveTarget !== "remaining" ? `Remaining Quantity N(t): ${remainingQty} ${qtyUnit}` : `Solved Remaining Quantity N(t): ${calculation.formattedVal} ${qtyUnit}`,
      solveTarget !== "halflife" ? `Half-Life (t½): ${halfLifeVal} ${halfLifeUnit}` : `Solved Half-Life (t½): ${calculation.formattedVal} ${halfLifeUnit}`,
      solveTarget !== "time" ? `Elapsed Time (t): ${elapsedTimeVal} ${elapsedTimeUnit}` : `Solved Elapsed Time (t): ${calculation.formattedVal} ${elapsedTimeUnit}`,
      `Half-Lives Elapsed: ${calculation.numCycles !== undefined ? formatScientificValue(calculation.numCycles, 4) : "N/A"}`,
      `Percent Remaining: ${calculation.percentRemaining !== undefined ? calculation.percentRemaining.toFixed(2) + "%" : "N/A"}`,
      `Decay Constant (λ): ${calculation.decayConstUnit !== undefined ? calculation.decayConstUnit.toExponential(4) + " 1/" + halfLifeUnit : "N/A"}`,
      `Mean Lifetime (τ): ${calculation.meanLifetimeUnit !== undefined ? formatScientificValue(calculation.meanLifetimeUnit, 4) + " " + halfLifeUnit : "N/A"}`
    ];

    try {
      navigator.clipboard.writeText(summaryLines.join("\n"));
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    } catch (e) {}
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ========================================================================= */}
      {/* CARD 1: HALF-LIFE & RADIOACTIVE DECAY CALCULATOR */}
      {/* ========================================================================= */}
      <div className="print:break-inside-avoid border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Half-Life &amp; Radioactive Decay Calculator</span>
          <button
            type="button"
            onClick={handleSaveHalfLife}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Save current calculation to history"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedHalfLife ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: INPUT CONTROLS */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                {/* ISOTOPE PRESET SELECTION */}
                <div>
                  <label htmlFor="hl-isotope-preset" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Radioactive Isotope Presets
                  </label>
                  <select
                    id="hl-isotope-preset"
                    value={selectedIsotope}
                    onChange={(e) => handleIsotopeChange(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="custom">Custom Isotope / User Defined</option>
                    {ISOTOPES.map((iso) => (
                      <option key={iso.symbol} value={iso.symbol}>
                        {iso.name} ({iso.symbol}) — {iso.halfLifeVal} {iso.halfLifeUnit}
                      </option>
                    ))}
                  </select>
                </div>

                {/* SOLVE TARGET SELECTOR */}
                <div>
                  <label htmlFor="hl-solve-target" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Select Variable to Solve
                  </label>
                  <select
                    id="hl-solve-target"
                    value={solveTarget}
                    onChange={(e) => setSolveTarget(e.target.value as SolveTarget)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="remaining">Remaining Quantity N(t)</option>
                    <option value="initial">Initial Quantity N₀</option>
                    <option value="halflife">Half-Life t½</option>
                    <option value="time">Elapsed Time t</option>
                    <option value="decay_constant">Decay Constant (λ) &amp; Mean Lifetime (τ)</option>
                  </select>
                </div>

                {/* QUANTITY UNITS SELECTOR */}
                <div>
                  <label htmlFor="hl-qty-unit" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Quantity Units
                  </label>
                  <select
                    id="hl-qty-unit"
                    value={qtyUnit}
                    onChange={(e) => setQtyUnit(e.target.value as QuantityUnit)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="g">Grams (g)</option>
                    <option value="mg">Milligrams (mg)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="%">Percentage (%)</option>
                    <option value="Bq">Becquerels (Bq)</option>
                    <option value="Ci">Curies (Ci)</option>
                    <option value="mol">Moles (mol)</option>
                  </select>
                </div>

                {/* INITIAL QUANTITY (N0) */}
                {solveTarget !== "initial" && (
                  <div>
                    <label htmlFor="hl-initial-qty" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Initial Quantity (N₀)
                    </label>
                    <div className="relative">
                      <input
                        id="hl-initial-qty"
                        type="number"
                        value={initialQty}
                        onChange={(e) => setInitialQty(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                        {qtyUnit}
                      </span>
                    </div>
                  </div>
                )}

                {/* REMAINING QUANTITY (Nt) */}
                {solveTarget !== "remaining" && solveTarget !== "decay_constant" && (
                  <div>
                    <label htmlFor="hl-remaining-qty" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Remaining Quantity (Nₜ)
                    </label>
                    <div className="relative">
                      <input
                        id="hl-remaining-qty"
                        type="number"
                        value={remainingQty}
                        onChange={(e) => setRemainingQty(e.target.value)}
                        placeholder="e.g. 25"
                        className="w-full h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                        {qtyUnit}
                      </span>
                    </div>
                  </div>
                )}

                {/* HALF LIFE (t_half) INPUT OR DESIRED OUTPUT UNIT */}
                {solveTarget !== "halflife" ? (
                  <div>
                    <label htmlFor="hl-half-life-val" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Half-Life (t½)
                    </label>
                    <div className="grid grid-cols-12 gap-2">
                      <input
                        id="hl-half-life-val"
                        type="number"
                        value={halfLifeVal}
                        onChange={(e) => {
                          setHalfLifeVal(e.target.value);
                          setSelectedIsotope("custom");
                        }}
                        placeholder="e.g. 5730"
                        className="col-span-7 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <select
                        id="hl-half-life-unit"
                        aria-label="Half-Life time unit"
                        value={halfLifeUnit}
                        onChange={(e) => {
                          setHalfLifeUnit(e.target.value as TimeUnit);
                          setSelectedIsotope("custom");
                        }}
                        className="col-span-5 h-10 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="seconds">seconds</option>
                        <option value="minutes">minutes</option>
                        <option value="hours">hours</option>
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                        <option value="years">years</option>
                        <option value="millennia">millennia</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label htmlFor="hl-half-life-unit" className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                      Desired Half-Life Unit (Solving Target)
                    </label>
                    <select
                      id="hl-half-life-unit"
                      aria-label="Desired Half-Life time unit"
                      value={halfLifeUnit}
                      onChange={(e) => {
                        setHalfLifeUnit(e.target.value as TimeUnit);
                        setSelectedIsotope("custom");
                      }}
                      className="w-full h-10 px-3 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="seconds">seconds</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                      <option value="years">years</option>
                      <option value="millennia">millennia</option>
                    </select>
                  </div>
                )}

                {/* ELAPSED TIME (t) INPUT OR DESIRED OUTPUT UNIT */}
                {solveTarget !== "time" && solveTarget !== "decay_constant" ? (
                  <div>
                    <label htmlFor="hl-elapsed-time-val" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Elapsed Time (t)
                    </label>
                    <div className="grid grid-cols-12 gap-2">
                      <input
                        id="hl-elapsed-time-val"
                        type="number"
                        value={elapsedTimeVal}
                        onChange={(e) => setElapsedTimeVal(e.target.value)}
                        placeholder="e.g. 11460"
                        className="col-span-7 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <select
                        id="hl-elapsed-time-unit"
                        aria-label="Elapsed time unit"
                        value={elapsedTimeUnit}
                        onChange={(e) => setElapsedTimeUnit(e.target.value as TimeUnit)}
                        className="col-span-5 h-10 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="seconds">seconds</option>
                        <option value="minutes">minutes</option>
                        <option value="hours">hours</option>
                        <option value="days">days</option>
                        <option value="weeks">weeks</option>
                        <option value="months">months</option>
                        <option value="years">years</option>
                        <option value="millennia">millennia</option>
                      </select>
                    </div>
                  </div>
                ) : solveTarget === "time" ? (
                  <div>
                    <label htmlFor="hl-elapsed-time-unit" className="text-xs font-bold text-blue-600 dark:text-blue-400 block mb-1">
                      Desired Elapsed Time Unit (Solving Target)
                    </label>
                    <select
                      id="hl-elapsed-time-unit"
                      aria-label="Desired Elapsed time unit"
                      value={elapsedTimeUnit}
                      onChange={(e) => setElapsedTimeUnit(e.target.value as TimeUnit)}
                      className="w-full h-10 px-3 rounded-xl border border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="seconds">seconds</option>
                      <option value="minutes">minutes</option>
                      <option value="hours">hours</option>
                      <option value="days">days</option>
                      <option value="weeks">weeks</option>
                      <option value="months">months</option>
                      <option value="years">years</option>
                      <option value="millennia">millennia</option>
                    </select>
                  </div>
                ) : null}
              </div>
            </div>

            {/* RIGHT COLUMN: HERO RESULT CARD & DECAY GRAPH */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
                {/* HERO RESULT DISPLAY */}
                <div className="print:break-inside-avoid bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {calculation.solvedLabel}
                    </span>
                    <div className="flex items-center gap-2 no-print">
                      <button
                        type="button"
                        onClick={handleCopyResult}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                        aria-label="Copy calculation summary"
                      >
                        {copiedResult ? <Check className="w-3 h-3 text-emerald-500" /> : <FileText className="w-3 h-3 text-blue-600" />}
                        <span>{copiedResult ? "Copied Result!" : "Copy Result"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => calculation.latex && handleCopyLatex(calculation.latex)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                        aria-label="Copy LaTeX formula"
                      >
                        {copiedLatex ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-blue-600" />}
                        <span>{copiedLatex ? "LaTeX Copied!" : "Copy LaTeX"}</span>
                      </button>
                    </div>
                  </div>

                  {calculation.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 leading-relaxed">
                      {calculation.error}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-3xl sm:text-4xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                        {calculation.formattedVal || formatScientificValue(calculation.solvedVal, 6)}{" "}
                        <span className="text-xl text-blue-600 font-bold">{calculation.unit}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold pt-1">
                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Cycles Elapsed</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">
                            {calculation.numCycles !== undefined ? formatScientificValue(calculation.numCycles, 3) : "N/A"} t½
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                          <span className="text-[10px] text-slate-400 block uppercase">Decay Constant (λ)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">
                            {calculation.decayConstUnit?.toExponential(4)}
                          </span>
                        </div>

                        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl col-span-2 sm:col-span-1">
                          <span className="text-[10px] text-slate-400 block uppercase">Mean Lifetime (τ)</span>
                          <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">
                            {calculation.meanLifetimeUnit !== undefined ? formatScientificValue(calculation.meanLifetimeUnit, 4) : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* INTERACTIVE EXPONENTIAL DECAY GRAPH WITH DYNAMIC SCALING */}
                {svgChart && (
                  <div className="print:break-inside-avoid p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5" /> Exponential Decay Curve &amp; Half-Life Cycles
                    </span>
                    {svgChart}
                  </div>
                )}

                {/* STEP-BY-STEP SOLUTION BREAKDOWN */}
                <div className="print:break-inside-avoid p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" /> Step-by-Step Mathematical Solution
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

                {/* DECAY TABLE GENERATOR (CYCLES 0 - 10) */}
                {cycleTableData.length > 0 && (
                  <div className="print:break-inside-avoid p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold uppercase tracking-wider block">
                      Decay Table Across 10 Cycles
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center border-collapse font-sans tabular-nums font-bold">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400">
                            <th className="p-2 text-left">Cycle (t½)</th>
                            <th className="p-2">Remaining Quantity ({qtyUnit})</th>
                            <th className="p-2">Percentage Remaining</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                          {cycleTableData.map((row) => (
                            <tr key={row.cycle} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-2 text-left text-slate-900 dark:text-slate-100">{row.cycle} t½</td>
                              <td className="p-2 text-blue-600 dark:text-blue-400">
                                {row.remaining < 1e-4 ? row.remaining.toExponential(4) : row.remaining.toFixed(4)}
                              </td>
                              <td className="p-2 text-slate-700 dark:text-slate-300">{row.percentage.toFixed(2)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EMBEDDED SAVED HALF-LIFE CALCULATIONS INSIDE CARD 1 */}
          {savedHalfLifeItems.length > 0 && (
            <div className="print:break-inside-avoid bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Half-Life Calculations ({savedHalfLifeItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedHalfLifeItems([]);
                    try { localStorage.removeItem("saved_halflife_calculations"); } catch(e){}
                  }}
                  className="no-print text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  aria-label="Clear all saved calculations"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedHalfLifeItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all print:break-inside-avoid"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          {item.rawParams && (
                            <button
                              type="button"
                              onClick={() => handleRestoreHalfLife(item)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                              title="Restore saved calculation to inputs"
                              aria-label="Restore saved calculation"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Restore</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedHalfLifeItems.filter(i => i.id !== item.id);
                              setSavedHalfLifeItems(updated);
                              try { localStorage.setItem("saved_halflife_calculations", JSON.stringify(updated)); } catch(e){}
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
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Operation: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="no-print w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label={isExpanded ? "Hide saved calculation details" : "Show saved calculation details"}
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
      {/* CARD 2: DECAY CONSTANT & MEAN LIFETIME CONVERTER */}
      {/* ========================================================================= */}
      <div className="print:break-inside-avoid border border-blue-600 dark:border-blue-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
        <div className="bg-blue-600 text-white font-bold text-xs px-4 py-2.5 flex items-center justify-between">
          <span>Decay Constant (λ) &amp; Mean Lifetime (τ) Converter</span>
          <button
            type="button"
            onClick={handleSaveDecay}
            className="no-print bg-white/20 hover:bg-white/30 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Save converted decay constant to history"
          >
            <Bookmark className="w-3 h-3 text-white" />
            <span>{justSavedDecay ? "Saved!" : "Save"}</span>
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 space-y-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Converter Inputs
              </h2>

              <div>
                <label htmlFor="hl-conv-half-life-val" className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Half-Life Value (t½)
                </label>
                <div className="grid grid-cols-12 gap-2">
                  <input
                    id="hl-conv-half-life-val"
                    type="number"
                    value={convHalfLifeVal}
                    onChange={(e) => setConvHalfLifeVal(e.target.value)}
                    placeholder="e.g. 5730"
                    className="col-span-7 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <select
                    id="hl-conv-half-life-unit"
                    aria-label="Converter half-life time unit"
                    value={convHalfLifeUnit}
                    onChange={(e) => setConvHalfLifeUnit(e.target.value as TimeUnit)}
                    className="col-span-5 h-10 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans tabular-nums font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="seconds">seconds</option>
                    <option value="minutes">minutes</option>
                    <option value="hours">hours</option>
                    <option value="days">days</option>
                    <option value="weeks">weeks</option>
                    <option value="months">months</option>
                    <option value="years">years</option>
                    <option value="millennia">millennia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LIVE CONVERTED OUTPUT MATRIX & DERIVATION STEPS */}
            <div className="md:col-span-7 space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
                <div className="print:break-inside-avoid bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Converted Decay Constant (λ)
                  </span>
                  {decayConversionResult.error ? (
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {decayConversionResult.error}
                    </div>
                  ) : (
                    <div className="text-2xl sm:text-3xl font-sans tabular-nums font-extrabold text-slate-900 dark:text-slate-100 break-all">
                      {decayConversionResult.lambdaUnit} <span className="text-sm font-bold text-blue-600">1/{convHalfLifeUnit}</span>
                    </div>
                  )}
                </div>

                {!decayConversionResult.error && (
                  <div className="print:break-inside-avoid grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">λ (in s⁻¹)</span>
                      <span className="font-sans tabular-nums text-blue-600 dark:text-blue-400 break-all">{decayConversionResult.lambdaSec} s⁻¹</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase">Mean Lifetime (τ)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{decayConversionResult.tauUnit} {convHalfLifeUnit}</span>
                    </div>

                    <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 block uppercase">τ (in sec)</span>
                      <span className="font-sans tabular-nums text-slate-900 dark:text-slate-100">{decayConversionResult.tauSec} s</span>
                    </div>
                  </div>
                )}

                {/* STEP-BY-STEP DERIVATION */}
                {decayConversionResult.steps && decayConversionResult.steps.length > 0 && (
                  <div className="print:break-inside-avoid p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block text-[10px]">
                      Step-by-Step Decay Conversion Derivation
                    </span>
                    <div className="space-y-1 font-sans tabular-nums text-slate-700 dark:text-slate-300">
                      {decayConversionResult.steps.map((step, idx) => (
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

          {/* EMBEDDED SAVED DECAY CONVERSIONS INSIDE CARD 2 */}
          {savedDecayItems.length > 0 && (
            <div className="print:break-inside-avoid bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs space-y-3 pt-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <span>Saved Decay Conversions ({savedDecayItems.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSavedDecayItems([]);
                    try { localStorage.removeItem("saved_decay_conversions"); } catch(e){}
                  }}
                  className="no-print text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1"
                  aria-label="Clear all saved decay conversions"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {savedDecayItems.map((item) => {
                  const isExpanded = !!expandedIds[item.id];
                  const resParts = item.resultsList ?? (item.result ? item.result.split("|").map(s => s.trim()).filter(Boolean) : []);
                  return (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-sans shadow-xs space-y-2 flex flex-col justify-between transition-all print:break-inside-avoid"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-blue-600 dark:text-blue-400">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-sans tabular-nums">{item.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-1 no-print">
                          {item.rawParams && (
                            <button
                              type="button"
                              onClick={() => handleRestoreDecay(item)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                              title="Restore saved decay conversion to inputs"
                              aria-label="Restore saved decay conversion"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Restore</span>
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              const updated = savedDecayItems.filter(i => i.id !== item.id);
                              setSavedDecayItems(updated);
                              try { localStorage.setItem("saved_decay_conversions", JSON.stringify(updated)); } catch(e){}
                            }}
                            className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                            title="Delete saved conversion"
                            aria-label="Delete saved conversion"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                        <div>
                          <span className="font-bold text-slate-500 dark:text-slate-400">Inputs / Conversion: </span>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.inputs || item.expression}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(item.id)}
                          className="no-print w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          aria-label={isExpanded ? "Hide saved conversion details" : "Show saved conversion details"}
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

export default HalfLifeCalculator;
