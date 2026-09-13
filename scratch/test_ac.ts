import { autoCorrectFormulaCase, parseChemicalFormula } from "../src/app/calculators/molecular-weight-calculator/parser";
import { calculateMolecularWeightCalculator } from "../src/app/calculators/molecular-weight-calculator/calculator";

console.log("Testing Ac vs AcOH:");
console.log("parseChemicalFormula('Ac'):", parseChemicalFormula("Ac"));
console.log("parseChemicalFormula('AcOH'):", parseChemicalFormula("AcOH"));
