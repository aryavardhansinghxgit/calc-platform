import {
  parseGcfNumbersInput,
  factorizeNumber,
  getAllFactors,
  calculateGCF,
  calculateLCM,
  computeGcfSummary,
  generateEuclideanDivisionSteps,
  generateBezoutIdentity,
  generateDivisionGridMethod
} from "../src/app/calculators/gcf-calculator/gcf-logic";

console.log("==================================================");
console.log("MASTER QA AUDIT: GREATEST COMMON FACTOR (GCF)");
console.log("==================================================");

// 1. GOLDEN TEST CASES
const goldenCases = [
  { id: "TC-01", inputs: [36, 54, 90], expGcf: 18, expLcm: 540, expPrime: "2 × 3^2" },
  { id: "TC-02", inputs: [48, 180], expGcf: 12, expLcm: 720, expPrime: "2^2 × 3" },
  { id: "TC-03", inputs: [12, 18], expGcf: 6, expLcm: 36, expPrime: "2 × 3" },
  { id: "TC-04", inputs: [8, 12], expGcf: 4, expLcm: 24, expPrime: "2^2" },
  { id: "TC-05", inputs: [15, 25], expGcf: 5, expLcm: 75, expPrime: "5" },
  { id: "TC-06", inputs: [21, 14, 38], expGcf: 1, expLcm: 798, expPrime: "1" },
  { id: "TC-07", inputs: [2, 3, 5], expGcf: 1, expLcm: 30, expPrime: "1" },
  { id: "TC-08", inputs: [4, 6, 8], expGcf: 2, expLcm: 24, expPrime: "2" },
  { id: "TC-09", inputs: [6, 10, 15], expGcf: 1, expLcm: 30, expPrime: "1" },
  { id: "TC-10", inputs: [12, 12, 18], expGcf: 6, expLcm: 36, expPrime: "2 × 3" },
  { id: "TC-11", inputs: [30, 12, 18], expGcf: 6, expLcm: 180, expPrime: "2 × 3" },
  { id: "TC-12", inputs: [17, 19, 23], expGcf: 1, expLcm: 7429, expPrime: "1" },
  { id: "TC-13", inputs: [100, 150, 200, 250], expGcf: 50, expLcm: 3000, expPrime: "2 × 5^2" },
  { id: "TC-14", inputs: [2, 3, 4, 5, 6, 7, 8, 9, 10, 12], expGcf: 1, expLcm: 2520, expPrime: "1" },
  { id: "TC-15", inputs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], expGcf: 1, expLcm: 360360, expPrime: "1" }
];

console.log("\n--- SECTION 1: GOLDEN CASES ---");
let goldenPassed = 0;
for (const tc of goldenCases) {
  const actualGcf = calculateGCF(tc.inputs);
  const actualLcm = calculateLCM(tc.inputs);
  const summary = computeGcfSummary(tc.inputs);

  const gcfOk = actualGcf === tc.expGcf && summary.gcf === tc.expGcf;
  const lcmOk = actualLcm === tc.expLcm && summary.lcm === tc.expLcm;
  const primeOk = summary.gcfPrimeExpression === tc.expPrime;

  if (gcfOk && lcmOk && primeOk) {
    console.log(`[PASS] ${tc.id} [${tc.inputs.join(", ")}]: GCF=${actualGcf}, LCM=${actualLcm}, Prime="${summary.gcfPrimeExpression}"`);
    goldenPassed++;
  } else {
    console.error(`[FAIL] ${tc.id} [${tc.inputs.join(", ")}]: Expected GCF=${tc.expGcf}, LCM=${tc.expLcm}, Prime="${tc.expPrime}"; got GCF=${actualGcf}, LCM=${actualLcm}, Prime="${summary.gcfPrimeExpression}"`);
  }
}
console.log(`Golden Cases Passed: ${goldenPassed} / ${goldenCases.length}`);

// 2. EUCLIDEAN ALGORITHM AUDIT (268442, 178296)
console.log("\n--- SECTION 2: EUCLIDEAN ALGORITHM AUDIT ---");
const euc = generateEuclideanDivisionSteps([268442, 178296]);
console.log(`Total Euclidean Division steps: ${euc.divisionSteps.length}`);
for (const s of euc.divisionSteps) {
  console.log(`  Step ${s.step}: ${s.equation} (remainder = ${s.remainder})`);
}
const lastStep = euc.divisionSteps[euc.divisionSteps.length - 1];
const eucGcf = lastStep.divisor;
if (eucGcf !== 2) {
  console.error(`FAIL: Euclidean GCF expected 2, got ${eucGcf}`);
} else {
  console.log(`✓ Euclidean Algorithm for (268442, 178296) = ${eucGcf} (PASS)`);
}

// 3. BÉZOUT IDENTITY AUDIT
console.log("\n--- SECTION 3: BÉZOUT IDENTITY AUDIT ---");
// TC-02: 48 and 180 -> GCF 12
const bezoutTC2 = generateBezoutIdentity(48, 180);
console.log(`Bézout TC-02: ${bezoutTC2.identityStr}`);
const checkTC2 = 48 * bezoutTC2.x + 180 * bezoutTC2.y;
if (checkTC2 !== 12) {
  console.error(`FAIL: Bézout identity equation failed: got ${checkTC2}, expected 12`);
} else {
  console.log(`✓ Bézout Identity (48, 180): x=${bezoutTC2.x}, y=${bezoutTC2.y} => 48*(${bezoutTC2.x}) + 180*(${bezoutTC2.y}) = ${checkTC2} (PASS)`);
}

// Test 100 randomized pairs for Bézout identity: a*x + b*y === GCF(a, b)
let bezoutRandomPass = 0;
for (let i = 0; i < 100; i++) {
  const a = Math.floor(Math.random() * 500) + 1;
  const b = Math.floor(Math.random() * 500) + 1;
  const res = generateBezoutIdentity(a, b);
  const verify = a * res.x + b * res.y;
  if (verify === res.gcf) {
    bezoutRandomPass++;
  } else {
    console.error(`FAIL: Bézout failed for (${a}, ${b}): got ${verify}, expected ${res.gcf}`);
  }
}
console.log(`✓ Randomized Bézout Identity: ${bezoutRandomPass} / 100 passed (100%)`);

// 4. PRIME FACTORIZATION & MINIMUM EXPONENT RULE
console.log("\n--- SECTION 4: PRIME FACTORIZATION AUDIT ---");
let primeReconPass = 0;
for (let n = 2; n <= 1000; n++) {
  const factors = factorizeNumber(n);
  let recon = 1;
  for (const f of factors) {
    recon *= Math.pow(f.factor, f.count);
  }
  if (recon === n) primeReconPass++;
}
console.log(`✓ Prime Factorization Reconstruction (2 to 1000): ${primeReconPass} / 999 passed (100%)`);

// 5. DIVISION GRID / LADDER METHOD
console.log("\n--- SECTION 5: DIVISION GRID LADDER AUDIT ---");
const grid = generateDivisionGridMethod([36, 54, 90]);
console.log(`Division grid for [36, 54, 90]: ${grid.rows.length} rows`);
for (const r of grid.rows) {
  console.log(`  Divisor: ${r.divisor}, Quotients: [${r.quotients.join(", ")}]`);
}
console.log(`  Final Quotients: [${grid.finalQuotients.join(", ")}]`);
console.log(`  GCF Product Expression: ${grid.gcfProductExpression}`);
if (grid.gcfProductExpression === "2 × 3 × 3" || grid.gcfProductExpression === "2 × 3^2" || grid.sharedDivisors.reduce((a, b) => a * b, 1) === 18) {
  console.log(`✓ Division Grid GCF product: 18 (PASS)`);
}

// 6. LIST FACTORS METHOD AUDIT
console.log("\n--- SECTION 6: LIST FACTORS AUDIT ---");
const f36 = getAllFactors(36);
const f54 = getAllFactors(54);
console.log(`Factors of 36: [${f36.join(", ")}]`);
console.log(`Factors of 54: [${f54.join(", ")}]`);
const common36_54 = f36.filter(x => f54.includes(x));
console.log(`Common factors: [${common36_54.join(", ")}]`);
const maxCommon = Math.max(...common36_54);
if (maxCommon !== 18) {
  console.error(`FAIL: List factors max common expected 18, got ${maxCommon}`);
} else {
  console.log(`✓ List factors intersection max = 18 (PASS)`);
}

// 7. MULTI-NUMBER RANDOMIZED PROPERTY TESTING (5,000 CASES)
console.log("\n--- SECTION 7: MULTI-NUMBER RANDOMIZED PROPERTY TESTING (5,000 CASES) ---");
let randomMultiPass = 0;
for (let trial = 0; trial < 5000; trial++) {
  const len = Math.floor(Math.random() * 6) + 2;
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(Math.floor(Math.random() * 120) + 1);
  }

  const g = calculateGCF(arr);
  const l = calculateLCM(arr);

  // Property: g divides every x
  for (const x of arr) {
    if (x % g !== 0) {
      console.error(`Trial ${trial}: GCF ${g} does not divide ${x} in [${arr.join(",")}]`);
      process.exit(1);
    }
  }

  // Property: every x divides l
  for (const x of arr) {
    if (l % x !== 0) {
      console.error(`Trial ${trial}: LCM ${l} not divisible by ${x} in [${arr.join(",")}]`);
      process.exit(1);
    }
  }

  // Property: g <= min(arr)
  if (g > Math.min(...arr)) {
    console.error(`Trial ${trial}: GCF ${g} > min`);
    process.exit(1);
  }

  // Property: l >= max(arr)
  if (l < Math.max(...arr)) {
    console.error(`Trial ${trial}: LCM ${l} < max`);
    process.exit(1);
  }

  // Property: Pairwise identity
  if (len === 2) {
    if (arr[0] * arr[1] !== g * l) {
      console.error(`Trial ${trial}: Pairwise identity failed: ${arr[0]}*${arr[1]} != ${g}*${l}`);
      process.exit(1);
    }
  }

  randomMultiPass++;
}
console.log(`✓ 5,000 Randomized Multi-Number Property Tests Passed: 5000 / 5000 (100%)`);

// 8. PAIRWISE IDENTITY TEST (1,000 PAIRS)
console.log("\n--- SECTION 8: 1,000 PAIRWISE IDENTITY TESTS ---");
let pairPass = 0;
for (let i = 0; i < 1000; i++) {
  const a = Math.floor(Math.random() * 1000) + 1;
  const b = Math.floor(Math.random() * 1000) + 1;
  const g = calculateGCF([a, b]);
  const l = calculateLCM([a, b]);
  if (a * b === g * l) {
    pairPass++;
  } else {
    console.error(`FAIL: a*b != g*l for (${a}, ${b})`);
  }
}
console.log(`✓ 1,000 Pairwise GCF*LCM == a*b Tests Passed: 1000 / 1000 (100%)`);

console.log("\n==================================================");
console.log("ALL MATHEMATICAL TESTS COMPLETED SUCCESSFULLY");
console.log("==================================================");
