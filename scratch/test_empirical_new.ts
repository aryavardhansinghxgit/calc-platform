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

export function solveEmpiricalFormulaNew(
  elementsInput: { symbol: string; percent: number }[],
  targetMolarMass: number = 0
): {
  empiricalFormula: string;
  empiricalMass: number;
  molecularFormula: string;
  molecularMass: number;
  multiplier: number;
  error?: string;
} {
  // 1. Validation
  const validElements = elementsInput.filter((e) => e.percent > 0);
  if (validElements.length === 0) {
    return {
      empiricalFormula: "",
      empiricalMass: 0,
      molecularFormula: "",
      molecularMass: 0,
      multiplier: 1,
      error: "No positive elemental percentages provided.",
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
  if (sumPct < 90 || sumPct > 105) {
    return {
      empiricalFormula: "",
      empiricalMass: 0,
      molecularFormula: "",
      molecularMass: 0,
      multiplier: 1,
      error: `Elemental percentages sum to ${sumPct.toFixed(2)}%, which deviates from 100%.`,
    };
  }

  // 2. Moles per 100g
  const molesList: { symbol: string; moles: number }[] = [];
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
    });
  }

  const minMoles = Math.min(...molesList.map((m) => m.moles));
  const rawRatios = molesList.map((m) => m.moles / minMoles);

  // 3. Rational ratio multiplier search: test f in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
  const candidateMultipliers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  let bestMultiplier = 1;
  let found = false;

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
      found = true;
      break;
    }
  }

  // Calculate raw integer subscripts
  const rawSubscripts = rawRatios.map((r) => Math.max(1, Math.round(bestMultiplier * r)));
  const commonDivisor = gcdArray(rawSubscripts);
  const finalSubscripts = rawSubscripts.map((s) => s / commonDivisor);

  // 4. Build Empirical Formula
  let empiricalFormula = "";
  let empiricalMass = 0;
  const empiricalCounts: Record<string, number> = {};

  molesList.forEach((item, idx) => {
    const count = finalSubscripts[idx];
    empiricalCounts[item.symbol] = count;
    const elData = PERIODIC_TABLE_ELEMENTS[item.symbol];
    empiricalMass += count * elData.atomicWeight;
    empiricalFormula += `${item.symbol}${count > 1 ? count : ""}`;
  });

  // 5. Molecular Multiplier
  let multiplier = 1;
  if (targetMolarMass > 0 && empiricalMass > 0) {
    const rawK = targetMolarMass / empiricalMass;
    const roundedK = Math.max(1, Math.round(rawK));
    // Check compatibility: if within 10%
    if (Math.abs(rawK - roundedK) / roundedK < 0.15) {
      multiplier = roundedK;
    }
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

// TEST E1: Fe=69.94%, O=30.06% -> Fe2O3
console.log("TEST E1 (Fe2O3):", solveEmpiricalFormulaNew([
  { symbol: "Fe", percent: 69.94 },
  { symbol: "O", percent: 30.06 },
]));

// TEST E2: Butane C=82.66%, H=17.34% -> C2H5, target 58.12 -> C4H10
console.log("TEST E2 (Butane C4H10):", solveEmpiricalFormulaNew([
  { symbol: "C", percent: 82.66 },
  { symbol: "H", percent: 17.34 },
], 58.12));

// TEST E3: P2O5 (P=43.64%, O=56.36%)
console.log("TEST E3 (P2O5):", solveEmpiricalFormulaNew([
  { symbol: "P", percent: 43.64 },
  { symbol: "O", percent: 56.36 },
]));

// TEST E4: Glucose (C=40%, H=6.71%, O=53.29%, target 180.16)
console.log("TEST E4 (Glucose):", solveEmpiricalFormulaNew([
  { symbol: "C", percent: 40.0 },
  { symbol: "H", percent: 6.71 },
  { symbol: "O", percent: 53.29 },
], 180.16));

// 100,000 RANDOM TESTS
console.log("\nRunning 100,000 randomized empirical tests...");
let passed = 0;
let failed = 0;

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

  const res = solveEmpiricalFormulaNew(
    [
      { symbol: "C", percent: pctC },
      { symbol: "H", percent: pctH },
      { symbol: "O", percent: pctO },
    ],
    targetMW
  );

  const expectedEmp = `C${simpA > 1 ? simpA : ""}H${simpB > 1 ? simpB : ""}O${simpC > 1 ? simpC : ""}`;

  if (res.empiricalFormula === expectedEmp && res.multiplier === multiplier) {
    passed++;
  } else {
    failed++;
  }
}

console.log(`Empirical Suite 100,000 cases: Passed=${passed}, Failed=${failed}, PassRate=${(passed/1000).toFixed(2)}%`);
