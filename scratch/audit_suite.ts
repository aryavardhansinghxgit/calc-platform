import { parseChemicalFormula } from "../src/app/calculators/molecular-weight-calculator/parser";
import {
  calculateMolecularWeightCalculator,
  solveEmpiricalFormula,
  convertMassMolesMolecules,
} from "../src/app/calculators/molecular-weight-calculator/calculator";
import { PERIODIC_TABLE_ELEMENTS } from "../src/app/calculators/molecular-weight-calculator/periodic-table";

// 1. GOLDEN FORMULAS (G1 - G10)
const goldenCases = [
  { id: "G1", formula: "H2O", expectedMolarMass: 18.015, tolerance: 0.01 },
  { id: "G2", formula: "CO2", expectedMolarMass: 44.009, tolerance: 0.01 },
  { id: "G3", formula: "NaCl", expectedMolarMass: 58.44, tolerance: 0.02 },
  { id: "G4", formula: "C6H12O6", expectedMolarMass: 180.156, tolerance: 0.01 },
  { id: "G5", formula: "CaCO3", expectedMolarMass: 100.086, tolerance: 0.02 },
  { id: "G6", formula: "H2SO4", expectedMolarMass: 98.08, tolerance: 0.02 },
  { id: "G7", formula: "NH4NO3", expectedMolarMass: 80.04, tolerance: 0.02 },
  { id: "G8", formula: "C2H5OH", expectedMolarMass: 46.069, tolerance: 0.01 },
  { id: "G9", formula: "CH3COOH", expectedMolarMass: 60.052, tolerance: 0.01 },
  { id: "G10", formula: "Fe2(SO4)3", expectedMolarMass: 399.88, tolerance: 0.05 },
];

console.log("=== GOLDEN CASES (G1 - G10) ===");
for (const g of goldenCases) {
  const res = calculateMolecularWeightCalculator({ mode: "formula", formula: g.formula });
  const actual = res.totalMolarMass;
  const diff = Math.abs(actual - g.expectedMolarMass);
  const pass = diff <= g.tolerance;
  console.log(`${g.id}: ${g.formula} -> Expected: ${g.expectedMolarMass}, Actual: ${actual}, Diff: ${diff.toFixed(4)}, Status: ${pass ? "PASS" : "FAIL"}`);
}

// 2. HYDRATES
console.log("\n=== HYDRATE CASES ===");
const hydrateCases = [
  { formula: "CuSO4*5H2O", expected: 249.677, tol: 0.05 },
  { formula: "CuSO4·5H2O", expected: 249.677, tol: 0.05 },
  { formula: "CuSO4.5H2O", expected: 249.677, tol: 0.05 },
  { formula: "Na2CO3*10H2O", expected: 286.14, tol: 0.05 },
  { formula: "MgSO4*7H2O", expected: 246.47, tol: 0.05 },
  { formula: "CoCl2*6H2O", expected: 237.93, tol: 0.05 },
];

for (const h of hydrateCases) {
  const res = calculateMolecularWeightCalculator({ mode: "formula", formula: h.formula });
  const actual = res.totalMolarMass;
  const diff = Math.abs(actual - h.expected);
  console.log(`Hydrate: ${h.formula} -> Expected: ${h.expected}, Actual: ${actual}, Diff: ${diff.toFixed(4)}, Error: ${res.parseError || "none"}`);
}

// 3. NESTED BRACKETS
console.log("\n=== BRACKET & NESTING CASES ===");
const bracketCases = [
  "Ca(OH)2",
  "Al2(SO4)3",
  "(NH4)2SO4",
  "K4[Fe(CN)6]",
  "[Co(NH3)5(CO3)]NO3",
];

for (const b of bracketCases) {
  const res = calculateMolecularWeightCalculator({ mode: "formula", formula: b });
  console.log(`Bracket: ${b} -> Total MW: ${res.totalMolarMass}, Elements:`, res.parsedElements?.map(e => `${e.symbol}:${e.count}`).join(", "));
}

// 4. MONOISOTOPIC VS AVERAGE
console.log("\n=== MONOISOTOPIC VS AVERAGE (C6H12O6) ===");
const avgRes = calculateMolecularWeightCalculator({ mode: "formula", formula: "C6H12O6", isMonoisotopicMode: false });
const monoRes = calculateMolecularWeightCalculator({ mode: "formula", formula: "C6H12O6", isMonoisotopicMode: true });
console.log(`C6H12O6 Average IUPAC: ${avgRes.totalMolarMass} g/mol`);
console.log(`C6H12O6 Monoisotopic: ${monoRes.totalMonoisotopicMass} Da`);
console.log(`Independent Oracle Monoisotopic: 6*12.000000 + 12*1.007825 + 6*15.994915 = ${(6*12 + 12*1.007825 + 6*15.994915).toFixed(4)} Da`);

// 5. EMPIRICAL SOLVER
console.log("\n=== EMPIRICAL SOLVER TESTS ===");
// Glucose: C=40, H=6.71, O=53.29, targetMW=180.16
const empGlucose = solveEmpiricalFormula([
  { symbol: "C", percent: 40.0 },
  { symbol: "H", percent: 6.71 },
  { symbol: "O", percent: 53.29 },
], 180.16);
console.log("Empirical Glucose:", JSON.stringify(empGlucose));

// Fractional ratio test: Fe2O3 (Fe=69.94%, O=30.06%)
const empFe2O3 = solveEmpiricalFormula([
  { symbol: "Fe", percent: 69.94 },
  { symbol: "O", percent: 30.06 },
], 159.69);
console.log("Empirical Fe2O3 (Expected Fe2O3):", JSON.stringify(empFe2O3));

// Empirical solver with invalid sum: sum = 40 (missing 60%)
const empInvalidSum = solveEmpiricalFormula([
  { symbol: "C", percent: 20.0 },
  { symbol: "H", percent: 20.0 },
], 100);
console.log("Empirical Invalid Sum (40% total):", JSON.stringify(empInvalidSum));

// 6. CONVERSION TEST: 10g C6H12O6
console.log("\n=== CONVERSION TESTS (10g Glucose) ===");
const conv = convertMassMolesMolecules(10.0, 180.156);
console.log("Conversion Result for 10g Glucose:", JSON.stringify(conv));
console.log("Oracle Moles: 10 / 180.156 =", 10 / 180.156);
console.log("Oracle Molecules: (10 / 180.156) * 6.02214076e23 =", (10 / 180.156) * 6.02214076e23);

