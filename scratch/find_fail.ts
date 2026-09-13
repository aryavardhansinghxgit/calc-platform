import { calculateMolecularWeightCalculator } from "../src/app/calculators/molecular-weight-calculator/calculator";
import { PERIODIC_TABLE_ELEMENTS } from "../src/app/calculators/molecular-weight-calculator/periodic-table";

const elements = Object.keys(PERIODIC_TABLE_ELEMENTS);

for (let i = 0; i < 10000; i++) {
  const numElements = 1 + Math.floor(Math.random() * 4);
  const picked: { sym: string; count: number }[] = [];
  const used = new Set<string>();

  for (let j = 0; j < numElements; j++) {
    let sym = elements[Math.floor(Math.random() * elements.length)];
    while (used.has(sym)) {
      sym = elements[Math.floor(Math.random() * elements.length)];
    }
    used.add(sym);
    const count = 1 + Math.floor(Math.random() * 8);
    picked.push({ sym, count });
  }

  const formulaStr = picked.map((p) => `${p.sym}${p.count > 1 ? p.count : ""}`).join("");

  let oracleMass = 0;
  for (const p of picked) {
    oracleMass += p.count * PERIODIC_TABLE_ELEMENTS[p.sym].atomicWeight;
  }
  const expectedMass = parseFloat(oracleMass.toFixed(4));

  const appResult = calculateMolecularWeightCalculator({ mode: "formula", formula: formulaStr });
  const actualMass = appResult.totalMolarMass;
  const diff = Math.abs(actualMass - expectedMass);

  if (diff >= 1e-3 || appResult.parseError) {
    console.log(`Failed case: ${formulaStr} | Expected: ${expectedMass}, Actual: ${actualMass}, Error: ${appResult.parseError}`);
    break;
  }
}
