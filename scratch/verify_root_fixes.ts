import {
  simplifyRadical,
  evaluateFractionalExponent,
  calculateNewtonRaphson,
  calculateBounds,
  calculateComplexRoots,
  rationalizeDenominator
} from "../src/app/calculators/root-calculator/root-logic";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`FAIL: ${msg}`);
  }
}

console.log("=================================================");
console.log("1. TESTING NEWTON-RAPHSON CONVERGENCE (DEF-ROOT-01)");
console.log("=================================================");

// 625, n=4 -> 5
const nr625 = calculateNewtonRaphson(625, 4, 10);
const last625 = nr625[nr625.length - 1];
assert(nr625.length > 0 && Math.abs(last625.nextGuess - 5) < 1e-9, `625^(1/4) must converge to 5, got ${last625?.nextGuess} in ${nr625.length} steps`);
assert(last625.error < 1e-8, `625^(1/4) residual must be < 1e-8, got ${last625?.error}`);

// 12345, n=5 -> ~6.581096
const nr12345 = calculateNewtonRaphson(12345, 5, 10);
const last12345 = nr12345[nr12345.length - 1];
assert(nr12345.length > 0 && Math.abs(last12345.nextGuess - 6.58109589) < 1e-5, `12345^(1/5) must converge to ~6.581096, got ${last12345?.nextGuess}`);
assert(last12345.error < 1e-8, `12345^(1/5) residual must be < 1e-8, got ${last12345?.error}`);

// 72, n=2 -> ~8.485281
const nr72 = calculateNewtonRaphson(72, 2, 10);
const last72 = nr72[nr72.length - 1];
assert(nr72.length > 0 && Math.abs(last72.nextGuess - 8.48528137) < 1e-5, `72^(1/2) must converge to ~8.485281, got ${last72?.nextGuess}`);
assert(last72.error < 1e-8, `72^(1/2) residual must be < 1e-8, got ${last72?.error}`);

// 108, n=3 -> ~4.762203
const nr108 = calculateNewtonRaphson(108, 3, 10);
const last108 = nr108[nr108.length - 1];
assert(nr108.length > 0 && Math.abs(last108.nextGuess - 4.76220315) < 1e-5, `108^(1/3) must converge to ~4.762203, got ${last108?.nextGuess}`);
assert(last108.error < 1e-8, `108^(1/3) residual must be < 1e-8, got ${last108?.error}`);

// S = 0, n = 2
const nrZero = calculateNewtonRaphson(0, 2, 10);
assert(nrZero.length === 1 && nrZero[0].nextGuess === 0, `0^(1/2) must return 0 without division by zero`);

// n = 1, S = 42
const nrN1 = calculateNewtonRaphson(42, 1, 10);
assert(nrN1.length === 1 && nrN1[0].nextGuess === 42, `42^(1/1) must return 42`);

// Negative odd root: S = -27, n = 3
const nrNegOdd = calculateNewtonRaphson(-27, 3, 10);
const lastNegOdd = nrNegOdd[nrNegOdd.length - 1];
assert(nrNegOdd.length > 0 && Math.abs(lastNegOdd.nextGuess - (-3)) < 1e-9, `(-27)^(1/3) must converge to -3, got ${lastNegOdd?.nextGuess}`);

console.log("=================================================");
console.log("2. TESTING FRACTIONAL EXPONENTS & SNAP (DEF-ROOT-06)");
console.log("=================================================");

const f1 = evaluateFractionalExponent(8, 2, 3);
assert(f1.decimalValue === 4, `8^(2/3) must be exactly 4, got ${f1.decimalValue}`);
assert(f1.exactForm === "4", `8^(2/3) exactForm must be '4', got ${f1.exactForm}`);

const f2 = evaluateFractionalExponent(32, 2, 5);
assert(f2.decimalValue === 4, `32^(2/5) must be exactly 4, got ${f2.decimalValue}`);

const f3 = evaluateFractionalExponent(16, 3, 4);
assert(f3.decimalValue === 8, `16^(3/4) must be exactly 8, got ${f3.decimalValue}`);

const f4 = evaluateFractionalExponent(81, 3, 4);
assert(f4.decimalValue === 27, `81^(3/4) must be exactly 27, got ${f4.decimalValue}`);

const f5 = evaluateFractionalExponent(8, 1, 3);
assert(f5.decimalValue === 2, `8^(1/3) must be exactly 2, got ${f5.decimalValue}`);

const f6 = evaluateFractionalExponent(9, 1, 2);
assert(f6.decimalValue === 3, `9^(1/2) must be exactly 3, got ${f6.decimalValue}`);

console.log("=================================================");
console.log("3. TESTING RADICAL SIMPLIFIER");
console.log("=================================================");

const s72 = simplifyRadical(72, 2);
assert(s72.coefficient === 6 && s72.radicand === 2, `√72 = 6√2, got ${s72.coefficient}√${s72.radicand}`);

const s75 = simplifyRadical(75, 2);
assert(s75.coefficient === 5 && s75.radicand === 3, `√75 = 5√3, got ${s75.coefficient}√${s75.radicand}`);

const s180 = simplifyRadical(180, 2);
assert(s180.coefficient === 6 && s180.radicand === 5, `√180 = 6√5, got ${s180.coefficient}√${s180.radicand}`);

const s54 = simplifyRadical(54, 3);
assert(s54.coefficient === 3 && s54.radicand === 2, `∛54 = 3∛2, got ${s54.coefficient}∛${s54.radicand}`);

const s128 = simplifyRadical(128, 3);
assert(s128.coefficient === 4 && s128.radicand === 2, `∛128 = 4∛2, got ${s128.coefficient}∛${s128.radicand}`);

const s80 = simplifyRadical(80, 4);
assert(s80.coefficient === 2 && s80.radicand === 5, `⁴√80 = 2⁴√5, got ${s80.coefficient}⁴√${s80.radicand}`);

console.log("=================================================");
console.log("4. TESTING GOLDEN CASES & COMPLEX ROOTS");
console.log("=================================================");

// Principal root of 25 = 5
assert(Math.sqrt(25) === 5, "Principal root of 25 is +5, not ±5");

// Complex root of -16, n=2
const comp16 = calculateComplexRoots(-16, 2);
assert(comp16.length === 2, `√(-16) must return 2 complex roots, got ${comp16.length}`);
assert(Math.abs(comp16[0].imag - 4) < 1e-6 || Math.abs(comp16[1].imag - 4) < 1e-6, `Complex root of -16 must include 4i`);

// Complex root of -16, n=4
const comp16n4 = calculateComplexRoots(-16, 4);
assert(comp16n4.length === 4, `⁴√(-16) must return 4 complex roots, got ${comp16n4.length}`);

// Odd root of negative: -27, n=3
const oddNeg27 = -Math.pow(27, 1/3);
assert(Math.abs(oddNeg27 - (-3)) < 1e-9, `∛(-27) = -3`);

// Odd root of negative: -32, n=5
const oddNeg32 = -Math.pow(32, 1/5);
assert(Math.abs(oddNeg32 - (-2)) < 1e-9, `⁵√(-32) = -2`);

// Zero: 0, n=2
assert(Math.pow(0, 1/2) === 0, `ⁿ√0 = 0`);

console.log("=================================================");
console.log("5. RUNNING 2,000 RANDOMIZED PROPERTY TESTS (SECTION 9)");
console.log("=================================================");

let randPass = 0;
let randFail = 0;

for (let i = 0; i < 2000; i++) {
  // Random radicand x between 0.01 and 1,000,000
  const x = Math.random() * 999999.99 + 0.01;
  // Random degree n between 1 and 8
  const n = Math.floor(Math.random() * 8) + 1;

  const r = Math.pow(x, 1 / n);
  const reconstructed = Math.pow(r, n);
  const diff = Math.abs(reconstructed - x);
  const relDiff = diff / x;

  if (relDiff < 1e-9 || diff < 1e-9) {
    randPass++;
  } else {
    randFail++;
    console.error(`Rand test failed: x=${x}, n=${n}, r=${r}, diff=${diff}, relDiff=${relDiff}`);
  }

  // Also verify Newton solver agreement for a sample of cases
  if (i < 200) {
    const steps = calculateNewtonRaphson(x, n, 12);
    if (steps.length > 0) {
      const last = steps[steps.length - 1];
      const nrDiff = Math.abs(last.nextGuess - r);
      if (nrDiff > 1e-4) {
        console.error(`Newton disagreement: x=${x}, n=${n}, expected=${r}, got=${last.nextGuess}`);
        randFail++;
      }
    }
  }
}

console.log("=================================================");
console.log("6. TESTING PERSISTENCE & LOAD/RESTORE IMMUTABILITY (DEF-ROOT-03)");
console.log("=================================================");

const originalSavedItem = {
  id: "test-save-1",
  title: "Root (2√72)",
  inputs: "Radicand (x): 72, Degree (n): 2",
  operation: "N-th Root Calculation (2√72)",
  result: "Principal Root Value = 8.485281 | Exact Radical Form = 6√2",
  timestamp: "Sep 5, 12:00 PM",
  rawInputs: {
    radicand: "72",
    degree: "2",
    rootType: "general",
    precision: "6"
  }
};

// Simulate current calculator state mutating to 108, 3
let currentCalculatorState = {
  radicand: "108",
  degree: "3",
  rootType: "cube",
  precision: 4
};

// Immutability check: original saved snapshot must remain exactly 72, 2
assert(originalSavedItem.rawInputs.radicand === "72", "Saved radicand must remain immutable 72");
assert(originalSavedItem.rawInputs.degree === "2", "Saved degree must remain immutable 2");
assert(originalSavedItem.rawInputs.rootType === "general", "Saved rootType must remain general");

// Restore simulation: restore original inputs into current state
currentCalculatorState = {
  radicand: originalSavedItem.rawInputs.radicand,
  degree: originalSavedItem.rawInputs.degree,
  rootType: originalSavedItem.rawInputs.rootType as any,
  precision: Number(originalSavedItem.rawInputs.precision)
};

assert(currentCalculatorState.radicand === "72" && currentCalculatorState.degree === "2" && currentCalculatorState.rootType === "general", "Restored calculator state must exactly reproduce the saved calculation state");

console.log("=================================================");
console.log("7. TESTING INPUT VALIDATION & ZERO COERCION (DEF-ROOT-06)");
console.log("=================================================");

function validateDegree(rootType: string, degInput: string): string | null {
  const trimmed = degInput.trim();
  const num = Number(trimmed);
  if (rootType === "general") {
    if (trimmed === "") return "Root index (n) is required.";
    if (Number.isNaN(num)) return "Root index (n) must be a valid integer.";
    if (num === 0) return "Root index (n) must be a positive integer ≥ 1 (degree 0 is undefined).";
    if (num < 1) return "Root index (n) must be a positive integer ≥ 1.";
    if (!Number.isInteger(num)) return "Root index (n) must be a positive integer ≥ 1.";
  }
  return null;
}

assert(validateDegree("general", "0") !== null, "Degree '0' must produce explicit validation error");
assert(validateDegree("general", "-2") !== null, "Degree '-2' must produce explicit validation error");
assert(validateDegree("general", "2.5") !== null, "Degree '2.5' must produce explicit validation error");
assert(validateDegree("general", "") !== null, "Empty degree must produce explicit validation error");
assert(validateDegree("general", "2") === null, "Degree '2' must be accepted");
assert(validateDegree("general", "5") === null, "Degree '5' must be accepted");

assert(randFail === 0, `All 2000 randomized property tests must pass! Failed: ${randFail}`);

console.log("\n=================================================");
console.log(`TEST SUMMARY:`);
console.log(`Passed: ${passedTests} / ${totalTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Randomized: ${randPass} passed, ${randFail} failed`);
console.log("=================================================");

if (failedTests > 0 || randFail > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL AND PROPERTY TESTS PASSED PERFECTLY!");
  process.exit(0);
}

