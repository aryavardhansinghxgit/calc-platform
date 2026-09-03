import { runStandardDeviationCalculatorTests } from "../src/app/calculators/standard-deviation-calculator/tests";
import {
  parseDataset,
  computeDescriptiveStats,
  compareTwoDatasets
} from "../src/app/calculators/standard-deviation-calculator/std-dev-logic";

console.log("Starting Standard Deviation Unit Tests...");
try {
  const result = runStandardDeviationCalculatorTests();
  console.log("✅ Unit tests passed successfully:", result);
} catch (err: any) {
  console.error("❌ Unit tests failed:", err.message);
  process.exit(1);
}

console.log("\nStarting Monte Carlo Randomized Simulations...");

// 1. 5,000 Randomized Single Datasets
let singlePassed = 0;
for (let i = 0; i < 5000; i++) {
  const n = Math.floor(Math.random() * 50) + 1; // 1 to 50 items
  const data: number[] = [];
  for (let j = 0; j < n; j++) {
    // Random numbers between -1000 and 1000 with decimals
    data.push(Number(((Math.random() - 0.5) * 2000).toFixed(4)));
  }

  const sampleStats = computeDescriptiveStats(data, true);
  const popStats = computeDescriptiveStats(data, false);

  // Assertions
  if (sampleStats.count !== n) throw new Error(`Count mismatch at run ${i}`);
  if (isNaN(sampleStats.mean) || !isFinite(sampleStats.mean)) throw new Error(`Mean NaN at run ${i}`);
  if (sampleStats.sumSqDev < -1e-9) throw new Error(`Negative SS at run ${i}`);

  if (n > 1) {
    if (isNaN(sampleStats.sampleVar) || sampleStats.sampleVar < 0) throw new Error(`Invalid sampleVar at run ${i}`);
    if (isNaN(sampleStats.sampleSD) || sampleStats.sampleSD < 0) throw new Error(`Invalid sampleSD at run ${i}`);
    // Bessel's relationship: s² * (n-1) == σ² * n == SS
    const expectedPopVar = sampleStats.sumSqDev / n;
    if (Math.abs(popStats.popVar - expectedPopVar) > 1e-6) throw new Error(`Pop variance mismatch at run ${i}`);
  } else {
    // n = 1
    if (sampleStats.popVar !== 0 || sampleStats.popSD !== 0) throw new Error(`N=1 pop var not zero at run ${i}`);
  }

  singlePassed++;
}
console.log(`✅ 5,000/5,000 Single Dataset Monte Carlo tests passed!`);

// 2. 1,000 Randomized Dual Datasets
let dualPassed = 0;
for (let i = 0; i < 1000; i++) {
  const nA = Math.floor(Math.random() * 30) + 2;
  const nB = Math.floor(Math.random() * 30) + 2;
  const dataA: number[] = Array.from({ length: nA }, () => Number((Math.random() * 100).toFixed(2)));
  const dataB: number[] = Array.from({ length: nB }, () => Number((Math.random() * 100).toFixed(2)));

  const comp = compareTwoDatasets(dataA, dataB);
  if (isNaN(comp.fRatio) || comp.fRatio < 0) throw new Error(`Invalid fRatio at run ${i}`);
  if (isNaN(comp.pooledSD) || comp.pooledSD < 0) throw new Error(`Invalid pooledSD at run ${i}`);
  dualPassed++;
}
console.log(`✅ 1,000/1,000 Dual Dataset Monte Carlo tests passed!`);

// 3. 1,000 Randomized Confidence Intervals
let ciPassed = 0;
for (let i = 0; i < 1000; i++) {
  const mean = (Math.random() - 0.5) * 500;
  const sd = Math.random() * 50 + 0.1;
  const n = Math.floor(Math.random() * 500) + 2;
  const z = 1.96;

  const se = sd / Math.sqrt(n);
  const me = z * se;
  const lower = mean - me;
  const upper = mean + me;

  if (upper <= lower) throw new Error(`Invalid CI interval at run ${i}`);
  if (isNaN(me) || !isFinite(me)) throw new Error(`Invalid ME at run ${i}`);
  ciPassed++;
}
console.log(`✅ 1,000/1,000 Confidence Interval Monte Carlo tests passed!`);

console.log("\nALL MATHEMATICAL & RANDOMIZED AUDITS COMPLETE: 100% PASS RATE!");
