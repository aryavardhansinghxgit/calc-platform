import {
  parseNumbersInput,
  factorizeNumber,
  calculateGCF,
  calculateLCM,
  computeLcmSummary,
  generateDivisionGridMethod,
  generateListMultiplesMethod,
  generateGCFFormulaMethod
} from "../src/app/calculators/lcm-calculator/lcm-logic";

console.log("=== RUNNING LEAST COMMON MULTIPLE (LCM) MASTER QA SUITE ===");

// 1. GOLDEN TEST CASES
const goldenCases = [
  { inputs: [12, 18, 30], expLcm: 180, expGcf: 6 },
  { inputs: [48, 60], expLcm: 240, expGcf: 12 },
  { inputs: [8, 12], expLcm: 24, expGcf: 4 },
  { inputs: [15, 25], expLcm: 75, expGcf: 5 },
  { inputs: [21, 14, 38], expLcm: 798, expGcf: 1 },
  { inputs: [2, 3, 5], expLcm: 30, expGcf: 1 },
  { inputs: [4, 6, 8], expLcm: 24, expGcf: 2 },
  { inputs: [6, 10, 15], expLcm: 30, expGcf: 1 },
  { inputs: [12, 12, 18], expLcm: 36, expGcf: 6 },
  { inputs: [30, 12, 18], expLcm: 180, expGcf: 6 }, // Order invariance
  { inputs: [6, 24], expLcm: 24, expGcf: 6 },
  { inputs: [17, 19, 23], expLcm: 7429, expGcf: 1 },
  { inputs: [100, 150, 200, 250], expLcm: 3000, expGcf: 50 },
  { inputs: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12], expLcm: 2520, expGcf: 1 },
  { inputs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], expLcm: 360360, expGcf: 1 }
];

let goldenPassed = 0;
for (const tc of goldenCases) {
  const actualLcm = calculateLCM(tc.inputs);
  const actualGcf = calculateGCF(tc.inputs);
  const summary = computeLcmSummary(tc.inputs);

  if (actualLcm !== tc.expLcm || actualGcf !== tc.expGcf || summary.lcm !== tc.expLcm || summary.gcf !== tc.expGcf) {
    console.error(`FAILED Golden Case: [${tc.inputs.join(", ")}] -> Expected LCM ${tc.expLcm}, GCF ${tc.expGcf}; got LCM ${actualLcm}, GCF ${actualGcf}`);
    process.exit(1);
  }
  goldenPassed++;
}
console.log(`✓ Golden Cases Passed: ${goldenPassed} / ${goldenCases.length}`);

// 2. PAIRWISE IDENTITY TEST (48, 60)
const pairA = 48;
const pairB = 60;
const pairLcm = calculateLCM([pairA, pairB]);
const pairGcf = calculateGCF([pairA, pairB]);
const product = pairA * pairB;
const lcmGcfProduct = pairLcm * pairGcf;

if (pairLcm !== 240 || pairGcf !== 12 || product !== 2880 || lcmGcfProduct !== 2880 || product !== lcmGcfProduct) {
  console.error("FAILED: Pairwise identity for (48, 60) failed!");
  process.exit(1);
}
console.log(`✓ Pairwise Identity (48, 60): GCF=${pairGcf}, LCM=${pairLcm}, 48×60=${product}, LCM×GCF=${lcmGcfProduct} (VALID)`);

// 3. METHOD DERIVATIONS TEST
// Method 1: Prime Factorization
const sum12_18_30 = computeLcmSummary([12, 18, 30]);
if (sum12_18_30.lcmPrimeExpression !== "2^2 × 3^2 × 5") {
  console.error(`FAILED: Method 1 Prime Factor expression expected '2^2 × 3^2 × 5', got '${sum12_18_30.lcmPrimeExpression}'`);
  process.exit(1);
}
console.log(`✓ Method 1 Prime Factorization: ${sum12_18_30.lcmPrimeExpression} = ${sum12_18_30.lcm}`);

// Method 2: Division Ladder Grid
const grid = generateDivisionGridMethod([12, 18, 30]);
if (grid.rows.length === 0 || !grid.lcmProductExpression) {
  console.error("FAILED: Method 2 Division Grid generated empty rows");
  process.exit(1);
}
console.log(`✓ Method 2 Division Grid: ${grid.rows.length} rows, product expression: ${grid.lcmProductExpression}`);

// Method 3: Euclidean Chain
const gcfChain = generateGCFFormulaMethod([12, 18, 30]);
if (gcfChain.pairwiseCalculations.length !== 2) {
  console.error("FAILED: Method 3 Euclidean Chain steps mismatch");
  process.exit(1);
}
console.log(`✓ Method 3 Euclidean Chain: ${gcfChain.pairwiseCalculations.length} pairwise steps`);

// Method 4: Listing Multiples
const listMult = generateListMultiplesMethod([12, 18, 30], 10);
if (listMult.targetLcm !== 180 || listMult.listData.length !== 3) {
  console.error("FAILED: Method 4 Listing Multiples target mismatch");
  process.exit(1);
}
console.log(`✓ Method 4 Listing Multiples: target LCM ${listMult.targetLcm}`);

// 4. FRACTION LCD HELPER
if (!sum12_18_30.lcdFractionExample.includes("180") || !sum12_18_30.lcdFractionExample.includes("31/180")) {
  console.error(`FAILED: Fraction LCD helper string unexpected: ${sum12_18_30.lcdFractionExample}`);
  process.exit(1);
}
console.log(`✓ Fraction LCD Helper: ${sum12_18_30.lcdFractionExample}`);

// 5. INPUT PARSER ROBUSTNESS
const parse1 = parseNumbersInput("12, 18, 30");
const parse2 = parseNumbersInput("12 18 30");
const parse3 = parseNumbersInput("12; 18; 30");
const parse4 = parseNumbersInput("  12 ,   18   , 30  ");
const parse5 = parseNumbersInput("12, abc, 30");
const parse6 = parseNumbersInput("12,,30");
const parse7 = parseNumbersInput("");

if (
  parse1.join(",") !== "12,18,30" ||
  parse2.join(",") !== "12,18,30" ||
  parse3.join(",") !== "12,18,30" ||
  parse4.join(",") !== "12,18,30" ||
  parse5.join(",") !== "12,30" ||
  parse6.join(",") !== "12,30" ||
  parse7.length !== 0
) {
  console.error("FAILED: Input parser test mismatch");
  process.exit(1);
}
console.log("✓ Input parser handles commas, spaces, semicolons, whitespace, and non-numeric filtering");

// 6. RANDOMIZED PROPERTY TESTING (5,000 CASES)
console.log("Executing 5,000 randomized property tests...");
let randomizedPass = 0;

for (let trial = 0; trial < 5000; trial++) {
  // Generate random length between 2 and 6
  const len = Math.floor(Math.random() * 5) + 2;
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 100) + 1);
  }

  const lcm = calculateLCM(arr);
  const gcf = calculateGCF(arr);

  // Property 1: LCM is positive
  if (lcm <= 0 || !Number.isFinite(lcm)) {
    console.error(`Trial ${trial}: LCM <= 0 for [${arr.join(",")}]`);
    process.exit(1);
  }

  // Property 2: GCF is positive
  if (gcf <= 0 || !Number.isFinite(gcf)) {
    console.error(`Trial ${trial}: GCF <= 0 for [${arr.join(",")}]`);
    process.exit(1);
  }

  // Property 3: LCM is divisible by every element
  for (const x of arr) {
    if (lcm % x !== 0) {
      console.error(`Trial ${trial}: LCM ${lcm} not divisible by ${x} in [${arr.join(",")}]`);
      process.exit(1);
    }
  }

  // Property 4: Every element is divisible by GCF
  for (const x of arr) {
    if (x % gcf !== 0) {
      console.error(`Trial ${trial}: Element ${x} not divisible by GCF ${gcf} in [${arr.join(",")}]`);
      process.exit(1);
    }
  }

  // Property 5: For 2 numbers, a * b == LCM * GCF
  if (len === 2) {
    const prod = arr[0] * arr[1];
    const dual = lcm * gcf;
    if (prod !== dual) {
      console.error(`Trial ${trial}: Pairwise identity violated: ${arr[0]}*${arr[1]}=${prod} vs LCM*GCF=${dual}`);
      process.exit(1);
    }
  }

  randomizedPass++;
}
console.log(`✓ Randomized Property Testing: ${randomizedPass} / 5000 passed (100%)`);

console.log("=== ALL MATHEMATICAL TESTS PASSED SUCCESSFULLY ===");
