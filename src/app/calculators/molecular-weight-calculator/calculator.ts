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

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

function gcdArray(arr: number[]): number {
  return arr.reduce((acc, val) => gcd(acc, val), arr[0] || 1);
}

/**
 * Solve Empirical & Molecular Formula from Elemental Mass Percentages using Rational Stoichiometry
 */
export function solveEmpiricalFormula(
  elementsInput: { symbol: string; percent: number }[],
  targetMolarMass: number = 0
): EmpiricalResult & { error?: string } {
  // Validate input percentages
  const validElements = elementsInput.filter((e) => e.percent > 0);
  if (validElements.length === 0) {
    return {
      empiricalFormula: "",
      empiricalMass: 0,
      molecularFormula: "",
      molecularMass: 0,
      multiplier: 1,
      error: "Please enter positive elemental mass percentages.",
    };
  }

  for (const item of elementsInput) {
    if (item.percent < 0) {
      return {
        empiricalFormula: "",
        empiricalMass: 0,
        molecularFormula: "",
        molecularMass: 0,
        multiplier: 1,
        error: `Negative percentage for element ${item.symbol} is invalid.`,
      };
    }
  }

  const sumPct = validElements.reduce((acc, e) => acc + e.percent, 0);
  if (sumPct < 85 || sumPct > 115) {
    return {
      empiricalFormula: "",
      empiricalMass: 0,
      molecularFormula: "",
      molecularMass: 0,
      multiplier: 1,
      error: `Elemental percentages sum to ${sumPct.toFixed(2)}%, which deviates significantly from 100%.`,
    };
  }

  // Calculate moles per 100g sample
  const molesList: { symbol: string; moles: number; atomicWeight: number }[] = [];
  for (const item of validElements) {
    const elData = PERIODIC_TABLE_ELEMENTS[item.symbol];
    if (!elData) {
      return {
        empiricalFormula: "",
        empiricalMass: 0,
        molecularFormula: "",
        molecularMass: 0,
        multiplier: 1,
        error: `Unknown element symbol '${item.symbol}'.`,
      };
    }
    molesList.push({
      symbol: item.symbol,
      moles: item.percent / elData.atomicWeight,
      atomicWeight: elData.atomicWeight,
    });
  }

  const minMoles = Math.min(...molesList.map((m) => m.moles));
  if (minMoles <= 0) {
    return {
      empiricalFormula: "",
      empiricalMass: 0,
      molecularFormula: "",
      molecularMass: 0,
      multiplier: 1,
      error: "Mole quantities must be greater than zero.",
    };
  }

  const rawRatios = molesList.map((m) => m.moles / minMoles);

  // Rational ratio multiplier search: test f in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  const candidateMultipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  let bestMultiplier = 1;

  for (const f of candidateMultipliers) {
    let allClose = true;
    for (const r of rawRatios) {
      const product = f * r;
      const rounded = Math.round(product);
      if (Math.abs(product - rounded) > 0.09) {
        allClose = false;
        break;
      }
    }
    if (allClose) {
      bestMultiplier = f;
      break;
    }
  }

  // Calculate raw integer subscripts and simplify with GCD
  const rawSubscripts = rawRatios.map((r) => Math.max(1, Math.round(bestMultiplier * r)));
  const commonDivisor = gcdArray(rawSubscripts);
  const finalSubscripts = rawSubscripts.map((s) => s / commonDivisor);

  // Build Empirical Formula & Mass
  let empiricalFormula = "";
  let empiricalMass = 0;
  const empiricalCounts: Record<string, number> = {};

  molesList.forEach((item, idx) => {
    const count = finalSubscripts[idx];
    empiricalCounts[item.symbol] = count;
    empiricalMass += count * item.atomicWeight;
    empiricalFormula += `${item.symbol}${count > 1 ? count : ""}`;
  });

  // Calculate Molecular Multiplier
  let multiplier = 1;
  if (targetMolarMass > 0 && empiricalMass > 0) {
    const rawK = targetMolarMass / empiricalMass;
    const roundedK = Math.max(1, Math.round(rawK));
    if (Math.abs(rawK - roundedK) / roundedK < 0.15) {
      multiplier = roundedK;
    }
  }

  let molecularFormula = "";
  let molecularMass = 0;

  for (const [sym, count] of Object.entries(empiricalCounts)) {
    const molCount = count * multiplier;
    molecularFormula += `${sym}${molCount > 1 ? molCount : ""}`;
    molecularMass += molCount * (PERIODIC_TABLE_ELEMENTS[sym]?.atomicWeight || 0);
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
    const elementsInput = inputs.elementsInput || [
      { symbol: "C", percent: Number(inputs.percentC ?? 40.0) },
      { symbol: "H", percent: Number(inputs.percentH ?? 6.71) },
      { symbol: "O", percent: Number(inputs.percentO ?? 53.29) },
    ];

    const empRes = solveEmpiricalFormula(elementsInput, targetMW);

    if (empRes.error || !empRes.molecularFormula) {
      return {
        mode,
        formula: "",
        parsedElements: [],
        totalMolarMass: 0,
        totalMonoisotopicMass: 0,
        totalAtomCount: 0,
        empiricalResult: empRes,
        parseError: empRes.error || "Could not resolve empirical formula.",
      };
    }

    const { elementCounts } = parseChemicalFormula(empRes.molecularFormula);
    const parsedElements: ParsedElement[] = [];
    let totalAtomCount = 0;
    let totalMonoisotopicMass = 0;

    let idx = 0;
    for (const [sym, count] of Object.entries(elementCounts)) {
      const elData = PERIODIC_TABLE_ELEMENTS[sym];
      if (elData) {
        const subMass = count * elData.atomicWeight;
        const subMono = count * elData.monoisotopicMass;
        const massPct = empRes.molecularMass > 0 ? (subMass / empRes.molecularMass) * 100 : 0;
        totalAtomCount += count;
        totalMonoisotopicMass += subMono;

        parsedElements.push({
          symbol: sym,
          name: elData.name,
          count,
          atomicWeight: elData.atomicWeight,
          monoisotopicMass: elData.monoisotopicMass,
          totalSubMass: parseFloat(subMass.toFixed(4)),
          totalSubMonoisotopic: parseFloat(subMono.toFixed(4)),
          massPercentage: parseFloat(massPct.toFixed(2)),
          color: SLICE_COLORS[idx % SLICE_COLORS.length],
        });
        idx++;
      }
    }

    return {
      mode,
      formula: empRes.molecularFormula,
      parsedElements,
      totalMolarMass: empRes.molecularMass,
      totalMonoisotopicMass: parseFloat(totalMonoisotopicMass.toFixed(4)),
      totalAtomCount,
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
    const grams = Number(inputs.inputGrams ?? 10.0);
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
