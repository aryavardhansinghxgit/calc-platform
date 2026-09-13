import { parseChemicalFormula, autoCorrectFormulaCase } from "../src/app/calculators/molecular-weight-calculator/parser";
import { calculateMolecularWeightCalculator, solveEmpiricalFormula, convertMassMolesMolecules } from "../src/app/calculators/molecular-weight-calculator/calculator";
import { PERIODIC_TABLE_ELEMENTS } from "../src/app/calculators/molecular-weight-calculator/periodic-table";

console.log("--- Testing co2 autocorrect ---");
console.log("autoCorrectFormulaCase('co2'):", autoCorrectFormulaCase("co2"));
console.log("parseChemicalFormula('co2'):", parseChemicalFormula("co2"));
console.log("parseChemicalFormula('CO2'):", parseChemicalFormula("CO2"));

console.log("\n--- Testing Invalid Formulas ---");
const invalidCases = [
  "H2O)",
  "(H2O",
  "C6H12O6)",
  "C6H12O6(",
  "Na",
  "C0H2",
  "H-2O",
  "ABC",
  "C6H12O6xyz",
  "C(OH",
  "Fe((SO4)3",
  "H2.5O",
  "C0",
  "H0",
  "C-1",
  "O-2",
  "Xx",
  "Q",
  "Zz"
];

for (const c of invalidCases) {
  const res = parseChemicalFormula(c);
  console.log(`Input: '${c}' -> Result:`, JSON.stringify(res));
}
