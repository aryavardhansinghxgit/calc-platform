import {
  computeStandardMMM,
  computeAdvancedMeans,
  computeGroupedMMM,
  computeTargetMean,
  computeOutlierSkewness
} from "../src/app/calculators/mean-median-mode-calculator/mmm-logic";

console.log("=================================================");
console.log("STARTING MEAN MEDIAN MODE COMPREHENSIVE AUDIT");
console.log("=================================================");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`FAILED: ${testName}`);
  }
}

// 1. RANDOMIZED CORE STATISTICS (5,000 runs)
console.log("\n--- Running 5,000 Randomized Core Statistics Tests ---");
for (let i = 0; i < 5000; i++) {
  const len = Math.floor(Math.random() * 40) + 1;
  const arr: number[] = [];
  for (let j = 0; j < len; j++) {
    arr.push(parseFloat((Math.random() * 200 - 100).toFixed(2)));
  }

  const isSample = i % 2 === 0;
  const res = computeStandardMMM(arr, isSample);

  // Independent Mean & Sum
  const expectedSum = arr.reduce((acc, v) => acc + v, 0);
  const expectedMean = expectedSum / len;
  assert(Math.abs(res.sum - expectedSum) < 1e-2, `Core Sum Test #${i}`);
  assert(Math.abs(res.mean - expectedMean) < 1e-2, `Core Mean Test #${i}`);

  // Independent Median
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(len / 2);
  const expectedMed = len % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  assert(Math.abs(res.median - expectedMed) < 1e-2, `Core Median Test #${i}`);

  // Independent Range
  const expectedRange = sorted[len - 1] - sorted[0];
  assert(Math.abs(res.range - expectedRange) < 1e-2, `Core Range Test #${i}`);

  // Independent Variance & SD
  const sumSq = arr.reduce((acc, v) => acc + Math.pow(v - expectedMean, 2), 0);
  const expectedPopVar = sumSq / len;
  const expectedPopSD = Math.sqrt(expectedPopVar);
  const expectedSampleVar = len > 1 ? sumSq / (len - 1) : 0;
  const expectedSampleSD = Math.sqrt(expectedSampleVar);

  assert(Math.abs(res.popVar - expectedPopVar) < 1e-2, `Pop Var Test #${i}`);
  assert(Math.abs(res.popSD - expectedPopSD) < 1e-2, `Pop SD Test #${i}`);
  assert(Math.abs(res.sampleVar - expectedSampleVar) < 1e-2, `Sample Var Test #${i}`);
  assert(Math.abs(res.sampleSD - expectedSampleSD) < 1e-2, `Sample SD Test #${i}`);
}

// 2. RANDOMIZED WEIGHTED MEAN (2,000 runs)
console.log("\n--- Running 2,000 Randomized Weighted Mean Tests ---");
for (let i = 0; i < 2000; i++) {
  const len = Math.floor(Math.random() * 15) + 2;
  const vals: number[] = [];
  const weights: number[] = [];
  let wxSum = 0;
  let wSum = 0;
  for (let j = 0; j < len; j++) {
    const v = parseFloat((Math.random() * 100).toFixed(2));
    const w = parseFloat((Math.random() * 10 + 0.5).toFixed(2));
    vals.push(v);
    weights.push(w);
    wxSum += v * w;
    wSum += w;
  }
  const expected = wxSum / wSum;
  const res = computeAdvancedMeans(vals.join(", "), weights.join(", "), 10);
  assert(Math.abs((res.weightedMean || 0) - expected) < 1e-2, `Weighted Mean Test #${i}`);
}

// 3. RANDOMIZED GEOMETRIC MEAN (1,000 runs)
console.log("\n--- Running 1,000 Randomized Geometric Mean Tests ---");
for (let i = 0; i < 1000; i++) {
  const len = Math.floor(Math.random() * 10) + 2;
  const vals: number[] = [];
  let logSum = 0;
  for (let j = 0; j < len; j++) {
    const v = parseFloat((Math.random() * 50 + 1).toFixed(2));
    vals.push(v);
    logSum += Math.log(v);
  }
  const expected = Math.exp(logSum / len);
  const res = computeAdvancedMeans(vals.join(", "), "1, 1", 0);
  assert(Math.abs((res.geometricMean || 0) - expected) < 1e-2, `Geometric Mean Test #${i}`);
}

// 4. RANDOMIZED HARMONIC MEAN (1,000 runs)
console.log("\n--- Running 1,000 Randomized Harmonic Mean Tests ---");
for (let i = 0; i < 1000; i++) {
  const len = Math.floor(Math.random() * 10) + 2;
  const vals: number[] = [];
  let recSum = 0;
  for (let j = 0; j < len; j++) {
    const v = parseFloat((Math.random() * 50 + 1).toFixed(2));
    vals.push(v);
    recSum += 1 / v;
  }
  const expected = len / recSum;
  const res = computeAdvancedMeans(vals.join(", "), "1, 1", 0);
  assert(Math.abs((res.harmonicMean || 0) - expected) < 1e-2, `Harmonic Mean Test #${i}`);
}

// 5. RANDOMIZED TRIMMED MEAN (1,000 runs)
console.log("\n--- Running 1,000 Randomized Trimmed Mean Tests ---");
for (let i = 0; i < 1000; i++) {
  const len = Math.floor(Math.random() * 20) + 5;
  const vals: number[] = [];
  for (let j = 0; j < len; j++) {
    vals.push(parseFloat((Math.random() * 100).toFixed(1)));
  }
  const trimPct = 10;
  const sorted = [...vals].sort((a, b) => a - b);
  const k = Math.max(1, Math.floor((len * trimPct) / 100));
  const remaining = sorted.slice(k, len - k);
  const expected = remaining.reduce((a, b) => a + b, 0) / remaining.length;
  const res = computeAdvancedMeans(vals.join(", "), "1", trimPct);
  assert(Math.abs(res.trimmedMean - expected) < 1e-2, `Trimmed Mean Test #${i}`);
}

// 6. RANDOMIZED GROUPED DATA (2,000 runs)
console.log("\n--- Running 2,000 Randomized Grouped Data Tests ---");
for (let i = 0; i < 2000; i++) {
  const len = Math.floor(Math.random() * 8) + 2;
  const vals: number[] = [];
  const freqs: number[] = [];
  let fxSum = 0;
  let totalN = 0;
  for (let j = 0; j < len; j++) {
    const x = (j + 1) * 10;
    const f = Math.floor(Math.random() * 20) + 1;
    vals.push(x);
    freqs.push(f);
    fxSum += x * f;
    totalN += f;
  }
  const expectedMean = fxSum / totalN;
  const res = computeGroupedMMM(vals.join(", "), freqs.join(", "));
  assert(Math.abs(res.groupedMean - expectedMean) < 1e-2, `Grouped Mean Test #${i}`);
  assert(res.totalN === totalN, `Grouped Total N Test #${i}`);
}

// 7. RANDOMIZED TARGET SOLVER (2,000 runs)
console.log("\n--- Running 2,000 Randomized Target Solver Tests ---");
for (let i = 0; i < 2000; i++) {
  const currentCount = Math.floor(Math.random() * 6) + 1;
  const totalN = currentCount + 1;
  const targetMean = Math.floor(Math.random() * 40) + 60;
  const currentScores: number[] = [];
  let currentSum = 0;
  for (let j = 0; j < currentCount; j++) {
    const score = Math.floor(Math.random() * 40) + 60;
    currentScores.push(score);
    currentSum += score;
  }
  const expectedNeeded = totalN * targetMean - currentSum;
  const res = computeTargetMean(currentScores.join(", "), targetMean, totalN);
  assert(Math.abs(res.neededScore - expectedNeeded) < 1e-2, `Target Solver Test #${i}`);
}

// 8. RANDOMIZED DATASET COMPARISON (2,000 runs)
console.log("\n--- Running 2,000 Randomized Dataset Comparison Tests ---");
for (let i = 0; i < 2000; i++) {
  const lenA = Math.floor(Math.random() * 10) + 3;
  const lenB = Math.floor(Math.random() * 10) + 3;
  const a: number[] = [];
  const b: number[] = [];
  for (let j = 0; j < lenA; j++) a.push(Math.random() * 50);
  for (let j = 0; j < lenB; j++) b.push(Math.random() * 50);

  const resA = computeStandardMMM(a, true);
  const resB = computeStandardMMM(b, true);
  const deltaMean = resB.mean - resA.mean;
  const deltaSD = resB.sampleSD - resA.sampleSD;
  assert(Number.isFinite(deltaMean) && Number.isFinite(deltaSD), `Comparison Test #${i}`);
}

// 9. RANDOMIZED OUTLIER TESTS (1,000 runs)
console.log("\n--- Running 1,000 Randomized Outlier Tests ---");
for (let i = 0; i < 1000; i++) {
  const len = Math.floor(Math.random() * 20) + 8;
  const arr: number[] = [];
  for (let j = 0; j < len; j++) arr.push(Math.random() * 50 + 10);
  // Inject an extreme outlier
  arr.push(500);
  const res = computeOutlierSkewness(arr);
  assert(res.outliers.includes(500), `Outlier Injection Test #${i}`);
  assert(res.skewnessShape === "Right-Skewed (Positive)", `Outlier Shape Test #${i}`);
}

console.log("\n=================================================");
console.log(`AUDIT RESULTS:`);
console.log(`TOTAL TESTS RUN:    ${totalTests}`);
console.log(`PASSED TESTS:       ${passedTests}`);
console.log(`FAILED TESTS:       ${failedTests}`);
console.log(`PASS RATE:          ${((passedTests / totalTests) * 100).toFixed(2)}%`);
console.log("=================================================");
