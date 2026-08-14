import { parseChemicalFormula, autoCorrectFormulaCase } from "./parser";
import {
  calculateMolecularWeightCalculator,
  solveEmpiricalFormula,
  convertMassMolesMolecules,
} from "./calculator";

export function runMolecularWeightCalculatorTests() {
  // Test 1: Auto-casing intelligence ('c6h12o6' => 'C6H12O6')
  const autoCased = autoCorrectFormulaCase("c6h12o6");
  if (autoCased !== "C6H12O6") {
    throw new Error("Auto-casing intelligence failed");
  }

  // Test 2: Nested brackets & coordination complexes ([Co(NH3)5(CO3)]NO3)
  const parseRes1 = parseChemicalFormula("[Co(NH3)5(CO3)]NO3");
  if (parseRes1.error || parseRes1.elementCounts["Co"] !== 1 || parseRes1.elementCounts["H"] !== 15) {
    throw new Error("Nested bracket formula parsing failed");
  }

  // Test 3: Hydrates (CuSO4*5H2O)
  const parseRes2 = parseChemicalFormula("CuSO4*5H2O");
  if (parseRes2.error || parseRes2.elementCounts["H"] !== 10 || parseRes2.elementCounts["O"] !== 9) {
    throw new Error("Hydrate formula parsing failed");
  }

  // Test 4: Empirical formula solver (40% C, 6.71% H, 53.29% O, target 180.16 => C6H12O6)
  const empRes = solveEmpiricalFormula(
    [
      { symbol: "C", percent: 40.0 },
      { symbol: "H", percent: 6.71 },
      { symbol: "O", percent: 53.29 },
    ],
    180.16
  );
  if (empRes.molecularFormula !== "C6H12O6") {
    throw new Error("Empirical formula reverse solver failed");
  }

  // Test 5: Synthesizer default run
  const synthRes = calculateMolecularWeightCalculator({ mode: "formula", formula: "H2O" });
  if (Math.abs(synthRes.totalMolarMass - 18.015) > 0.05) {
    throw new Error("Molecular weight synthesizer failed");
  }

  return true;
}
