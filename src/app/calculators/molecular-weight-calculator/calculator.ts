import {
  MolecularWeightOutputs,
  ParserMode,
  ParsedElement,
  EmpiricalResult,
  ConverterResult,
} from "./types";
import { PERIODIC_TABLE_ELEMENTS } from "./periodic-table";
import { parseChemicalFormula } from "./parser";

// Colors for SVG Donut Slices
const SLICE_COLORS = [
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#8b5cf6", // Purple
  "#f59e0b", // Amber
  "#f43f5e", // Rose
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#84cc16", // Lime
];

/**
 * Solve Empirical & Molecular Formula from Elemental Mass Percentages
 */
export function solveEmpiricalFormula(
  elementsInput: { symbol: string; percent: number }[],
  targetMolarMass: number = 0
): EmpiricalResult {
  const molesPerHundred: { symbol: string; moles: number }[] = [];

  for (const item of elementsInput) {
    const elData = PERIODIC_TABLE_ELEMENTS[item.symbol];
    if (elData && item.percent > 0) {
      molesPerHundred.push({
        symbol: item.symbol,
        moles: item.percent / elData.atomicWeight,
      });
    }
  }

  if (molesPerHundred.length === 0) {
    return {
      empiricalFormula: "",
      empiricalMass: 0,
      molecularFormula: "",
      molecularMass: 0,
      multiplier: 1,
    };
  }

  const minMoles = Math.min(...molesPerHundred.map((m) => m.moles));

  // Empirical ratio
  let empiricalFormula = "";
  let empiricalMass = 0;
  const empiricalCounts: Record<string, number> = {};

  for (const item of molesPerHundred) {
    const ratio = Math.round(item.moles / minMoles);
    empiricalCounts[item.symbol] = ratio;
    const elData = PERIODIC_TABLE_ELEMENTS[item.symbol];
    empiricalMass += ratio * elData.atomicWeight;
    empiricalFormula += `${item.symbol}${ratio > 1 ? ratio : ""}`;
  }

  // Multiplier for Molecular Formula
  let multiplier = 1;
  if (targetMolarMass > 0 && empiricalMass > 0) {
    multiplier = Math.max(1, Math.round(targetMolarMass / empiricalMass));
  }

  let molecularFormula = "";
  let molecularMass = 0;

  for (const [sym, count] of Object.entries(empiricalCounts)) {
    const molCount = count * multiplier;
    molecularFormula += `${sym}${molCount > 1 ? molCount : ""}`;
    molecularMass += molCount * PERIODIC_TABLE_ELEMENTS[sym].atomicWeight;
  }

  return {
    empiricalFormula,
    empiricalMass: parseFloat(empiricalMass.toFixed(3)),
    molecularFormula,
    molecularMass: parseFloat(molecularMass.toFixed(3)),
    multiplier,
  };
}

/**
 * 3-Way Mass <-> Moles <-> Molecules Converter
 */
export function convertMassMolesMolecules(
  inputGrams: number,
  totalMolarMass: number
): ConverterResult {
  const mw = Math.max(0.001, totalMolarMass);
  const grams = Math.max(0, inputGrams);
  const milligrams = grams * 1000;
  const moles = grams / mw;
  const millimoles = moles * 1000;

  const avogadroConstant = 6.02214076e23;
  const moleculesCount = (moles * avogadroConstant).toExponential(4);

  return {
    grams: parseFloat(grams.toFixed(4)),
    milligrams: parseFloat(milligrams.toFixed(2)),
    moles: parseFloat(moles.toFixed(6)),
    millimoles: parseFloat(millimoles.toFixed(4)),
    moleculesCount,
  };
}

/**
 * Main Molecular Weight Calculator Synthesizer
 */
export function calculateMolecularWeightCalculator(inputs: Record<string, any>): MolecularWeightOutputs {
  const mode: ParserMode = (inputs.mode as ParserMode) || "formula";
  const formulaInput = (inputs.formula || "C6H12O6").trim();

  // Mode 2: Empirical Formula Reverse Solver
  if (mode === "empirical_solver") {
    const targetMW = Number(inputs.targetMolarMass || 180.16);
    const elementsInput = [
      { symbol: "C", percent: Number(inputs.percentC || 40.0) },
      { symbol: "H", percent: Number(inputs.percentH || 6.71) },
      { symbol: "O", percent: Number(inputs.percentO || 53.29) },
    ];

    const empRes = solveEmpiricalFormula(elementsInput, targetMW);
    const parsed = parseChemicalFormula(empRes.molecularFormula || "C6H12O6");

    return {
      mode,
      formula: empRes.molecularFormula || "C6H12O6",
      parsedElements: [],
      totalMolarMass: empRes.molecularMass,
      totalMonoisotopicMass: empRes.molecularMass,
      totalAtomCount: 0,
      empiricalResult: empRes,
    };
  }

  // Parse Chemical Formula
  const { elementCounts, error } = parseChemicalFormula(formulaInput);

  if (error || Object.keys(elementCounts).length === 0) {
    return {
      mode,
      formula: formulaInput,
      parsedElements: [],
      totalMolarMass: 0,
      totalMonoisotopicMass: 0,
      totalAtomCount: 0,
      parseError: error || "Invalid chemical formula.",
    };
  }

  // Calculate Molar Mass & Monoisotopic Mass
  let totalMolarMass = 0;
  let totalMonoisotopicMass = 0;
  let totalAtomCount = 0;

  const rawElements: { symbol: string; count: number; elData: any }[] = [];

  for (const [sym, count] of Object.entries(elementCounts)) {
    const elData = PERIODIC_TABLE_ELEMENTS[sym];
    if (elData) {
      const subMass = count * elData.atomicWeight;
      const subMono = count * elData.monoisotopicMass;
      totalMolarMass += subMass;
      totalMonoisotopicMass += subMono;
      totalAtomCount += count;
      rawElements.push({ symbol: sym, count, elData });
    }
  }

  // Build Parsed Element Breakdown with Mass Percentages & Color Palette
  const parsedElements: ParsedElement[] = rawElements.map((item, idx) => {
    const subMass = item.count * item.elData.atomicWeight;
    const subMono = item.count * item.elData.monoisotopicMass;
    const massPct = totalMolarMass > 0 ? (subMass / totalMolarMass) * 100 : 0;

    return {
      symbol: item.symbol,
      name: item.elData.name,
      count: item.count,
      atomicWeight: item.elData.atomicWeight,
      monoisotopicMass: item.elData.monoisotopicMass,
      totalSubMass: parseFloat(subMass.toFixed(4)),
      totalSubMonoisotopic: parseFloat(subMono.toFixed(4)),
      massPercentage: parseFloat(massPct.toFixed(2)),
      color: SLICE_COLORS[idx % SLICE_COLORS.length],
    };
  });

  // Mode 3: Moles <-> Grams Converter
  let converterResult: ConverterResult | undefined;
  if (mode === "mass_converter") {
    const grams = Number(inputs.inputGrams || 10.0);
    converterResult = convertMassMolesMolecules(grams, totalMolarMass);
  }

  return {
    mode,
    formula: formulaInput,
    parsedElements,
    totalMolarMass: parseFloat(totalMolarMass.toFixed(4)),
    totalMonoisotopicMass: parseFloat(totalMonoisotopicMass.toFixed(4)),
    totalAtomCount,
    isMonoisotopicMode: Boolean(inputs.isMonoisotopicMode),
    converterResult,
  };
}
