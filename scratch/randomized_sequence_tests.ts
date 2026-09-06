import {
  parseSequenceInput,
  detectSequencePattern,
  generateFiniteDifferenceTable,
  computeFibonacciBinet
} from "../src/app/calculators/number-sequence-calculator/sequence-logic";

console.log("=== STARTING 5,000+ RANDOMIZED PROPERTY TESTS ===");

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
let maxDiff = 0;

function assert(cond: boolean, msg: string) {
  totalAssertions++;
  if (cond) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error("FAIL:", msg);
  }
}

// 1. ARITHMETIC RANDOM TESTS (1,500 iterations)
console.log("Testing Arithmetic Sequences...");
for (let i = 0; i < 1500; i++) {
  const a1 = Math.floor(Math.random() * 200) - 100;
  const d = Math.floor(Math.random() * 50) - 25;
  const len = Math.floor(Math.random() * 5) + 4; // 4 to 8 terms
  const terms: number[] = [];
  for (let j = 0; j < len; j++) {
    terms.push(a1 + j * d);
  }
  const targetN = Math.floor(Math.random() * 50) + 1;

  const result = detectSequencePattern(terms, targetN);
  assert(result.type === "arithmetic", `Arithmetic type expected for a1=${a1}, d=${d}`);
  assert(result.commonDiff === d, `Common diff expected ${d}, got ${result.commonDiff}`);
  
  const expectedTarget = a1 + (targetN - 1) * d;
  assert(Math.abs(result.targetTerm - expectedTarget) < 1e-4, `Target term mismatch: expected ${expectedTarget}, got ${result.targetTerm}`);

  const expectedSum = (targetN / 2) * (2 * a1 + (targetN - 1) * d);
  assert(Math.abs(result.partialSum - expectedSum) < 1e-4, `Sum mismatch: expected ${expectedSum}, got ${result.partialSum}`);

  // Test finite difference table
  const diffTable = generateFiniteDifferenceTable(terms);
  assert(diffTable.length >= 2, "Diff table should have at least Level 0 and Level 1");
  assert(diffTable[1].isConstant, "Level 1 differences must be constant for arithmetic");
}

// 2. GEOMETRIC RANDOM TESTS (1,000 iterations)
console.log("Testing Geometric Sequences...");
for (let i = 0; i < 1000; i++) {
  const a1 = Math.floor(Math.random() * 20) + 1; // non-zero
  const rOptions = [2, 3, 4, 5, -2, -3, 0.5, -0.5];
  const r = rOptions[Math.floor(Math.random() * rOptions.length)];
  const len = Math.floor(Math.random() * 3) + 4; // 4 to 6 terms
  const terms: number[] = [];
  for (let j = 0; j < len; j++) {
    terms.push(parseFloat((a1 * Math.pow(r, j)).toFixed(6)));
  }
  const targetN = Math.floor(Math.random() * 8) + 1;

  const result = detectSequencePattern(terms, targetN);
  assert(result.type === "geometric", `Geometric type expected for a1=${a1}, r=${r}`);
  assert(Math.abs((result.commonRatio ?? 0) - r) < 1e-4, `Common ratio expected ${r}, got ${result.commonRatio}`);

  const expectedTarget = a1 * Math.pow(r, targetN - 1);
  const diffTarget = Math.abs(result.targetTerm - expectedTarget);
  if (diffTarget > maxDiff) maxDiff = diffTarget;
  assert(diffTarget < 1e-3, `Target term mismatch: expected ${expectedTarget}, got ${result.targetTerm}`);

  const expectedSum = r === 1 ? a1 * targetN : a1 * (1 - Math.pow(r, targetN)) / (1 - r);
  const diffSum = Math.abs(result.partialSum - expectedSum);
  assert(diffSum < 1e-3, `Sum mismatch: expected ${expectedSum}, got ${result.partialSum}`);
}

// 3. QUADRATIC RANDOM TESTS (1,000 iterations)
console.log("Testing Quadratic Sequences...");
for (let i = 0; i < 1000; i++) {
  const a = Math.floor(Math.random() * 10) + 1; // non-zero a
  const b = Math.floor(Math.random() * 20) - 10;
  const c = Math.floor(Math.random() * 40) - 20;
  const len = Math.floor(Math.random() * 4) + 4; // 4 to 7 terms
  const terms: number[] = [];
  for (let n = 1; n <= len; n++) {
    terms.push(a * n * n + b * n + c);
  }
  const targetN = Math.floor(Math.random() * 20) + 1;

  const result = detectSequencePattern(terms, targetN);
  assert(result.type === "quadratic", `Quadratic type expected for a=${a}, b=${b}, c=${c}, got ${result.type}`);

  const expectedTarget = a * targetN * targetN + b * targetN + c;
  assert(Math.abs(result.targetTerm - expectedTarget) < 1e-4, `Target mismatch: expected ${expectedTarget}, got ${result.targetTerm}`);

  // Manual sum
  let expectedSum = 0;
  for (let n = 1; n <= targetN; n++) {
    expectedSum += a * n * n + b * n + c;
  }
  assert(Math.abs(result.partialSum - expectedSum) < 1e-4, `Partial sum mismatch: expected ${expectedSum}, got ${result.partialSum}`);

  // Level 2 difference must be constant = 2a
  const diffTable = generateFiniteDifferenceTable(terms);
  assert(diffTable.length >= 3, "Diff table should have Level 0, 1, 2");
  if (diffTable.length >= 3) {
    assert(diffTable[2].isConstant, "Level 2 differences must be constant for quadratic");
    assert(Math.abs(diffTable[2].values[0] - 2 * a) < 1e-4, `Level 2 diff value expected ${2*a}, got ${diffTable[2].values[0]}`);
  }
}

// 4. FIBONACCI PROPERTY TESTS (500 iterations)
console.log("Testing Fibonacci recurrence properties...");
const fibList: number[] = [0, 1];
for (let n = 2; n <= 45; n++) {
  fibList.push(fibList[n - 1] + fibList[n - 2]);
}

for (let n = 1; n <= 40; n++) {
  const binet = computeFibonacciBinet(n);
  assert(binet === fibList[n], `Fibonacci F_${n} mismatch: expected ${fibList[n]}, got ${binet}`);
}

// 5. INPUT PARSER ROBUSTNESS (1,000 iterations)
console.log("Testing Input Parser Robustness...");
for (let i = 0; i < 1000; i++) {
  const count = Math.floor(Math.random() * 6) + 2;
  const rawNums: number[] = [];
  for (let j = 0; j < count; j++) {
    rawNums.push(Math.floor(Math.random() * 100) - 50);
  }
  
  // Mix delimiters: comma, multiple spaces, tabs, newlines
  const delimiters = [",", ", ", "   ", " , ", "\t", "\n", " ,  \n"];
  let rawStr = "";
  for (let j = 0; j < count; j++) {
    const delim = delimiters[Math.floor(Math.random() * delimiters.length)];
    rawStr += rawNums[j] + (j < count - 1 ? delim : "");
  }

  const parsed = parseSequenceInput(rawStr);
  assert(parsed.length === count, `Parsed count mismatch for "${rawStr}": expected ${count}, got ${parsed.length}`);
  for (let j = 0; j < count; j++) {
    assert(parsed[j] === rawNums[j], `Parsed value mismatch at ${j}: expected ${rawNums[j]}, got ${parsed[j]}`);
  }
}

console.log("\n==========================================");
console.log(`TOTAL ASSERTIONS: ${totalAssertions}`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log(`MAX NUMERICAL ERROR: ${maxDiff}`);
console.log("==========================================");
