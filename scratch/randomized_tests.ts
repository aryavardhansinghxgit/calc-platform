import {
  calculateMolecularWeightCalculator,
  solveEmpiricalFormula,
  convertMassMolesMolecules,
} from "../src/app/calculators/molecular-weight-calculator/calculator";
import { PERIODIC_TABLE_ELEMENTS } from "../src/app/calculators/molecular-weight-calculator/periodic-table";

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

const elements = Object.keys(PERIODIC_TABLE_ELEMENTS);
const avogadroConstant = 6.02214076e23;

console.log("Starting full randomized post-remediation verification (100,000 each)...");

// SUITE 1: 100,000 RANDOM FORMULA TESTS
let formulaPassed = 0;
let formulaFailed = 0;
let maxFormulaError = 0;

for (let i = 0; i < 100000; i++) {
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

  if (diff < 1e-3 && !appResult.parseError) {
    formulaPassed++;
  } else {
    formulaFailed++;
    if (diff > maxFormulaError) maxFormulaError = diff;
  }
}
console.log(`Formula Suite (100,000 cases): Passed=${formulaPassed}, Failed=${formulaFailed}, PassRate=${((formulaPassed/100000)*100).toFixed(2)}%, MaxError=${maxFormulaError}`);

// SUITE 2: 100,000 RANDOM CONVERSION TESTS
let convPassed = 0;
let convFailed = 0;
let maxConvError = 0;

for (let i = 0; i < 100000; i++) {
  const grams = 0.001 + Math.random() * 10000;
  const mw = 1.0 + Math.random() * 500;

  const oracleMoles = grams / mw;
  const roundTripGrams = oracleMoles * mw;

  const appConv = convertMassMolesMolecules(grams, mw);

  const molesDiff = Math.abs(appConv.moles - parseFloat(oracleMoles.toFixed(6)));
  const roundTripDiff = Math.abs(roundTripGrams - grams);

  if (molesDiff < 1e-4 && roundTripDiff < 1e-9) {
    convPassed++;
  } else {
    convFailed++;
    if (molesDiff > maxConvError) maxConvError = molesDiff;
  }
}
console.log(`Conversion Suite (100,000 cases): Passed=${convPassed}, Failed=${convFailed}, PassRate=${((convPassed/100000)*100).toFixed(2)}%, MaxError=${maxConvError}`);

// SUITE 3: 100,000 RANDOM EMPIRICAL / MULTIPLIER TESTS
let empPassed = 0;
let empFailed = 0;

for (let i = 0; i < 100000; i++) {
  const a = 1 + Math.floor(Math.random() * 4);
  const b = 1 + Math.floor(Math.random() * 8);
  const c = 1 + Math.floor(Math.random() * 4);

  const g = gcdArray([a, b, c]);
  const simpA = a / g;
  const simpB = b / g;
  const simpC = c / g;

  const empWeight =
    simpA * PERIODIC_TABLE_ELEMENTS["C"].atomicWeight +
    simpB * PERIODIC_TABLE_ELEMENTS["H"].atomicWeight +
    simpC * PERIODIC_TABLE_ELEMENTS["O"].atomicWeight;

  const pctC = (simpA * PERIODIC_TABLE_ELEMENTS["C"].atomicWeight / empWeight) * 100;
  const pctH = (simpB * PERIODIC_TABLE_ELEMENTS["H"].atomicWeight / empWeight) * 100;
  const pctO = (simpC * PERIODIC_TABLE_ELEMENTS["O"].atomicWeight / empWeight) * 100;

  const multiplier = 1 + Math.floor(Math.random() * 6);
  const targetMW = empWeight * multiplier;

  const empRes = solveEmpiricalFormula(
    [
      { symbol: "C", percent: pctC },
      { symbol: "H", percent: pctH },
      { symbol: "O", percent: pctO },
    ],
    targetMW
  );

  const expectedEmp = `C${simpA > 1 ? simpA : ""}H${simpB > 1 ? simpB : ""}O${simpC > 1 ? simpC : ""}`;
  if (empRes.empiricalFormula === expectedEmp && empRes.multiplier === multiplier) {
    empPassed++;
  } else {
    empFailed++;
  }
}
console.log(`Empirical Suite (100,000 cases): Passed=${empPassed}, Failed=${empFailed}, PassRate=${((empPassed/100000)*100).toFixed(2)}%`);
