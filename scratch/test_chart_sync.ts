import { calculateMolecularWeightCalculator } from "../src/app/calculators/molecular-weight-calculator/calculator";

const chartCases = [
  { formula: "H2O", expectedMW: 18.015, expectedPct: { H: 11.19, O: 88.81 } },
  { formula: "CO2", expectedMW: 44.009, expectedPct: { C: 27.29, O: 72.71 } },
  { formula: "NaCl", expectedMW: 58.44, expectedPct: { Na: 39.34, Cl: 60.66 } },
  { formula: "C6H12O6", expectedMW: 180.156, expectedPct: { C: 40.00, H: 6.71, O: 53.28 } },
  { formula: "CaCO3", expectedMW: 100.086, expectedPct: { Ca: 40.04, C: 12.00, O: 47.96 } },
  { formula: "CuSO4*5H2O", expectedMW: 249.677, expectedPct: { Cu: 25.45, S: 12.84, O: 57.67, H: 4.04 } },
];

console.log("=== VERIFYING DONUT CHART PERCENTAGES & SYNCHRONIZATION ===");
for (const tc of chartCases) {
  const res = calculateMolecularWeightCalculator({ mode: "formula", formula: tc.formula });
  console.log(`\nFormula: ${tc.formula} | Total MW: ${res.totalMolarMass} g/mol`);
  let pctSum = 0;
  for (const el of res.parsedElements) {
    pctSum += el.massPercentage;
    const exp = (tc.expectedPct as any)[el.symbol];
    const diff = Math.abs(el.massPercentage - exp);
    console.log(`  • ${el.symbol} (${el.name}): ${el.massPercentage}% (Expected ~${exp}%, Diff: ${diff.toFixed(2)}%)`);
  }
  console.log(`  Sum of mass percentages: ${pctSum.toFixed(2)}%`);
}
