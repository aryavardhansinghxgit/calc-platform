import { parseChemicalFormula, autoCorrectFormulaCase } from "../src/app/calculators/molecular-weight-calculator/parser";
import {
  calculateMolecularWeightCalculator,
  solveEmpiricalFormula,
  convertMassMolesMolecules,
} from "../src/app/calculators/molecular-weight-calculator/calculator";
import { PERIODIC_TABLE_ELEMENTS } from "../src/app/calculators/molecular-weight-calculator/periodic-table";
import { molecular_weight_calculatorConfig } from "../src/app/calculators/molecular-weight-calculator/config";
import fs from "fs";

console.log("============================================================");
console.log("RUNNING POST-REMEDIATION QA REGRESSION SUITE");
console.log("============================================================\n");

// 1. FIX #1 VERIFICATION: PDF REPORT DATA (NO ZERO VALUES)
console.log("--- 1. Testing FIX #1: PDF Report Data ---");
const compoundsToTest = ["C6H12O6", "H2O", "CuSO4*5H2O", "NaCl"];
for (const f of compoundsToTest) {
  const calc = calculateMolecularWeightCalculator({ mode: "formula", formula: f });
  console.log(`PDF Data for ${f}: Total Molar Mass = ${calc.totalMolarMass} g/mol, Monoisotopic = ${calc.totalMonoisotopicMass} Da, Elements = ${calc.parsedElements.length}`);
  if (calc.totalMolarMass <= 0 || calc.totalMonoisotopicMass <= 0) {
    console.error(`FAIL: Zero molar mass for ${f}`);
  }
}

// Empirical Mode PDF Data
const empCalc = calculateMolecularWeightCalculator({
  mode: "empirical_solver",
  percentC: 40.0,
  percentH: 6.71,
  percentO: 53.29,
  targetMolarMass: 180.16,
});
console.log(`PDF Data Empirical: Formula = ${empCalc.formula}, Total MW = ${empCalc.totalMolarMass} g/mol, EmpFormula = ${empCalc.empiricalResult?.empiricalFormula}, Multiplier = ${empCalc.empiricalResult?.multiplier}x`);

// Converter Mode PDF Data
const convCalc = calculateMolecularWeightCalculator({
  mode: "mass_converter",
  formula: "C6H12O6",
  inputGrams: 10.0,
});
console.log(`PDF Data Converter: Sample Mass = ${convCalc.converterResult?.grams} g, Moles = ${convCalc.converterResult?.moles} mol, Molecules = ${convCalc.converterResult?.moleculesCount}`);

// 2. FIX #2 VERIFICATION: EMPIRICAL SOLVER
console.log("\n--- 2. Testing FIX #2: Empirical Solver Golden Cases ---");
const e1 = solveEmpiricalFormula([{ symbol: "Fe", percent: 69.94 }, { symbol: "O", percent: 30.06 }]);
console.log(`E1 (Fe2O3): Expected Fe2O3 -> Actual: ${e1.empiricalFormula} (${e1.empiricalFormula === "Fe2O3" ? "PASS" : "FAIL"})`);

const e2 = solveEmpiricalFormula([{ symbol: "C", percent: 82.66 }, { symbol: "H", percent: 17.34 }], 58.12);
console.log(`E2 (C2H5 -> C4H10): Expected C2H5, k=2, C4H10 -> Actual: ${e2.empiricalFormula}, k=${e2.multiplier}, ${e2.molecularFormula} (${e2.empiricalFormula === "C2H5" && e2.multiplier === 2 && e2.molecularFormula === "C4H10" ? "PASS" : "FAIL"})`);

const e3 = solveEmpiricalFormula([{ symbol: "P", percent: 43.64 }, { symbol: "O", percent: 56.36 }]);
console.log(`E3 (P2O5): Expected P2O5 -> Actual: ${e3.empiricalFormula} (${e3.empiricalFormula === "P2O5" ? "PASS" : "FAIL"})`);

const e4 = solveEmpiricalFormula([{ symbol: "C", percent: 40.0 }, { symbol: "H", percent: 6.71 }, { symbol: "O", percent: 53.29 }], 180.16);
console.log(`E4 (Glucose): Expected CH2O, k=6, C6H12O6 -> Actual: ${e4.empiricalFormula}, k=${e4.multiplier}, ${e4.molecularFormula} (${e4.empiricalFormula === "CH2O" && e4.multiplier === 6 && e4.molecularFormula === "C6H12O6" ? "PASS" : "FAIL"})`);

const e5 = solveEmpiricalFormula([{ symbol: "H", percent: 11.19 }, { symbol: "O", percent: 88.81 }]);
console.log(`E5 (H2O): Expected H2O -> Actual: ${e5.empiricalFormula} (${e5.empiricalFormula === "H2O" ? "PASS" : "FAIL"})`);

const e6 = solveEmpiricalFormula([{ symbol: "C", percent: 40.0 }, { symbol: "H", percent: 6.71 }, { symbol: "O", percent: 53.29 }], 60.052);
console.log(`E6 (Acetic Acid C2H4O2): Expected CH2O, k=2, C2H4O2 -> Actual: ${e6.empiricalFormula}, k=${e6.multiplier}, ${e6.molecularFormula} (${e6.empiricalFormula === "CH2O" && e6.multiplier === 2 && e6.molecularFormula === "C2H4O2" ? "PASS" : "FAIL"})`);

// 3. FIX #3 VERIFICATION: STRICT CHEMICAL FORMULA PARSER
console.log("\n--- 3. Testing FIX #3: Strict Parser (Invalid vs Valid) ---");
const invalidList = [
  "H2O)",
  "(H2O",
  "Fe((SO4)3",
  "C0",
  "H-2O",
  "H2.5O",
  "C6H12O6xyz",
  "ABC",
  "Xx2",
  "()",
  "C-1",
  "O-2",
  "CuSO4..5H2O"
];
let invalidAllPassed = true;
for (const inv of invalidList) {
  const r = parseChemicalFormula(inv);
  if (!r.error) {
    console.error(`FAIL: Invalid formula '${inv}' was accepted!`);
    invalidAllPassed = false;
  }
}
console.log(`Invalid Formulas Rejection: ${invalidAllPassed ? "100% PASS (All rejected with error)" : "FAIL"}`);

// 4. FIX #4 VERIFICATION: AUTOCASING CO2 VS Co2
console.log("\n--- 4. Testing FIX #4: Autocasing co2 vs Co ---");
const autoCO2 = autoCorrectFormulaCase("co2");
const autoCo = autoCorrectFormulaCase("Co");
const calcLowerCO2 = calculateMolecularWeightCalculator({ mode: "formula", formula: "co2" });
const calcUpperCO2 = calculateMolecularWeightCalculator({ mode: "formula", formula: "CO2" });
console.log(`autoCorrectFormulaCase('co2') = '${autoCO2}' (Expected: 'CO2') -> ${autoCO2 === "CO2" ? "PASS" : "FAIL"}`);
console.log(`calculate('co2') mass = ${calcLowerCO2.totalMolarMass} g/mol, calculate('CO2') mass = ${calcUpperCO2.totalMolarMass} g/mol -> ${calcLowerCO2.totalMolarMass === 44.009 ? "PASS" : "FAIL"}`);

// 5. FIX #5 VERIFICATION: PERIODIC TABLE GRID IN CONTENT
console.log("\n--- 5. Testing FIX #5: Periodic Table Grid Classes ---");
const contentFile = fs.readFileSync("src/components/calculator/molecular-weight/MolecularWeightContent.tsx", "utf8");
const hasGridCols18 = contentFile.includes("grid-cols-18");
const hasGridCols15 = contentFile.includes("grid-cols-15");
const hasValid18 = contentFile.includes("grid-cols-[repeat(18,minmax(0,1fr))]");
const hasValid15 = contentFile.includes("grid-cols-[repeat(15,minmax(0,1fr))]");
console.log(`Non-existent grid-cols-18 removed: ${!hasGridCols18 ? "PASS" : "FAIL"}`);
console.log(`Non-existent grid-cols-15 removed: ${!hasGridCols15 ? "PASS" : "FAIL"}`);
console.log(`Valid 18-col arbitrary grid present: ${hasValid18 ? "PASS" : "FAIL"}`);
console.log(`Valid 15-col arbitrary grid present: ${hasValid15 ? "PASS" : "FAIL"}`);

// 6. FIX #6 VERIFICATION: ALL 118 ELEMENTS
console.log("\n--- 6. Testing FIX #6: 118 Elements in Database ---");
const totalElements = Object.keys(PERIODIC_TABLE_ELEMENTS).length;
console.log(`Total Elements in Database: ${totalElements} (Expected: 118) -> ${totalElements === 118 ? "PASS" : "FAIL"}`);
const testHighZ = ["ThO2", "RaCl2", "Po", "Rn", "Og"];
for (const hz of testHighZ) {
  const r = parseChemicalFormula(hz);
  console.log(`High-Z test '${hz}': Error = ${r.error || "none"}, Counts = ${JSON.stringify(r.elementCounts)}`);
}

// 7. FIX #7 VERIFICATION: RELATED CALCULATORS
console.log("\n--- 7. Testing FIX #7: Related Calculators Architecture ---");
console.log(`config.ts relatedCalculators:`, molecular_weight_calculatorConfig.relatedCalculators);
const hasSelfLink = molecular_weight_calculatorConfig.relatedCalculators?.includes("molecular-weight-calculator");
console.log(`Self-link absent in config.ts: ${!hasSelfLink ? "PASS" : "FAIL"}`);

const layoutFile = fs.readFileSync("src/components/calculator/CalculatorLayout.tsx", "utf8");
const bottomBlockIncludesMol = layoutFile.includes("isMolarity || isMolecularWeight");
console.log(`Bottom related calculators block includes isMolecularWeight: ${bottomBlockIncludesMol ? "PASS" : "FAIL"}`);
