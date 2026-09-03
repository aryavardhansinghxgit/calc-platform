import {
  computeMeanCI,
  computeProportionCI,
  computeTwoMeansCI,
  computeTwoProportionsCI,
  computeVarianceCI,
  inverseNormalCDF,
  inverseStudentT,
  inverseChiSquare
} from "../src/app/calculators/confidence-interval-calculator/confidence-interval-logic";
import { runConfidenceIntervalCalculatorTests } from "../src/app/calculators/confidence-interval-calculator/tests";

console.log("===============================================================================");
console.log("CONFIDENCE INTERVAL & ESTIMATION SUITE — MASTER PRODUCTION AUDIT");
console.log("===============================================================================\n");

let passedTests = 0;
let totalTests = 0;
let p0Errors = 0;
let p1Errors = 0;
let p2Errors = 0;

function assert(condition: boolean, msg: string, severity: "P0" | "P1" | "P2" = "P0") {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    console.error(`[FAIL - ${severity}] ${msg}`);
    if (severity === "P0") p0Errors++;
    else if (severity === "P1") p1Errors++;
    else p2Errors++;
  }
}

// -----------------------------------------------------------------------------
// 1. REGRESSION & UNIT TESTS
// -----------------------------------------------------------------------------
try {
  const unitRes = runConfidenceIntervalCalculatorTests();
  assert(unitRes === true, "runConfidenceIntervalCalculatorTests() passed");
} catch (e: any) {
  assert(false, `runConfidenceIntervalCalculatorTests() threw error: ${e.message}`, "P0");
}

// -----------------------------------------------------------------------------
// 2. GOLDEN REFERENCE MATRIX
// -----------------------------------------------------------------------------
console.log("\n--- AUDITING GOLDEN TEST MATRIX ---");

// G1: Mean t, 95%, mean=24.5, sd=4, n=16
const g1 = computeMeanCI(24.5, 4, 16, 95, false);
assert(g1.isValid, "G1: isValid true");
assert(Math.abs(g1.criticalValue - 2.1314) <= 0.001, `G1: critT ${g1.criticalValue} matches 2.1314`);
assert(Math.abs(g1.se - 1.0) <= 0.001, `G1: SE ${g1.se} matches 1.0`);
assert(Math.abs(g1.me - 2.1314) <= 0.001, `G1: ME ${g1.me} matches 2.1314`);
assert(Math.abs(g1.lowerBound - 22.3686) <= 0.002, `G1: lowerBound ${g1.lowerBound} matches 22.3686`);
assert(Math.abs(g1.upperBound - 26.6314) <= 0.002, `G1: upperBound ${g1.upperBound} matches 26.6314`);
assert(Math.abs((24.5 - g1.lowerBound) - (g1.upperBound - 24.5)) < 1e-4, "G1: Symmetry verified");

// G2: Mean t, 98%, mean=24.5, sd=4, n=16 (Must be 2.6025, NOT buggy 2.6013)
const g2 = computeMeanCI(24.5, 4, 16, 98, false);
assert(Math.abs(g2.criticalValue - 2.6025) <= 0.001, `G2: Exact critT ${g2.criticalValue} matches 2.6025 (fixed bug 2.6013)`);
assert(Math.abs(g2.lowerBound - 21.8975) <= 0.002, `G2: lowerBound ${g2.lowerBound} matches 21.8975`);
assert(Math.abs(g2.upperBound - 27.1025) <= 0.002, `G2: upperBound ${g2.upperBound} matches 27.1025`);

// G3: Mean Z, known sigma, mean=24.5, sd=4, n=16, 95%
const g3 = computeMeanCI(24.5, 4, 16, 95, true);
assert(g3.distType === "Z", "G3: DistType is Normal Z");
assert(Math.abs(g3.criticalValue - 1.9600) <= 0.001, `G3: critZ ${g3.criticalValue} matches 1.9600`);
assert(Math.abs(g3.lowerBound - 22.5400) <= 0.002, `G3: lowerBound ${g3.lowerBound} matches 22.5400`);
assert(Math.abs(g3.upperBound - 26.4600) <= 0.002, `G3: upperBound ${g3.upperBound} matches 26.4600`);

// G4: Wilson: x=520, n=1000, 95%
const gProp = computeProportionCI(520, 1000, 95);
assert(Math.abs(gProp.wilsonLower - 0.4890) <= 0.002, `G4: Wilson lower ${gProp.wilsonLower} matches 48.90%`);
assert(Math.abs(gProp.wilsonUpper - 0.5508) <= 0.002, `G4: Wilson upper ${gProp.wilsonUpper} matches 55.08%`);

// G5: Wald: x=520, n=1000, 95%
assert(Math.abs(gProp.waldLower - 0.4890) <= 0.002, `G5: Wald lower ${gProp.waldLower} matches 48.90%`);
assert(Math.abs(gProp.waldUpper - 0.5510) <= 0.002, `G5: Wald upper ${gProp.waldUpper} matches 55.10%`);

// G6: Agresti-Coull: x=520, n=1000, 95%
assert(Math.abs(gProp.agrestiLower - 0.4890) <= 0.002, `G6: Agresti lower ${gProp.agrestiLower} matches 48.90%`);
assert(Math.abs(gProp.agrestiUpper - 0.5508) <= 0.002, `G6: Agresti upper ${gProp.agrestiUpper} matches 55.08%`);

// G7: Two Means: m1=105, s1=12, n1=25 vs m2=98, s2=15, n2=30, 95%
const g7 = computeTwoMeansCI(105, 12, 25, 98, 15, 30, false, 95);
assert(Math.abs(g7.diff - 7.0) < 1e-4, `G7: Diff ${g7.diff} matches 7.0`);
assert(Math.abs(g7.df - 52.93) <= 0.05, `G7: Welch df ${g7.df} matches 52.93`);
assert(Math.abs(g7.lowerBound - (-0.3040)) <= 0.01, `G7: lowerBound ${g7.lowerBound} matches -0.3040`);
assert(Math.abs(g7.upperBound - 14.3040) <= 0.01, `G7: upperBound ${g7.upperBound} matches 14.3040`);
assert(!g7.isSignificant, "G7: Interval includes 0, correctly flagged not significant");

// G8: Two Proportions: 320/500 vs 270/500, 95%
const g8 = computeTwoProportionsCI(320, 500, 270, 500, 95);
assert(Math.abs(g8.diff - 0.10) < 1e-4, `G8: Diff ${g8.diff} matches 0.10`);
assert(Math.abs(g8.lowerBound - 0.0393) <= 0.002, `G8: lowerBound ${g8.lowerBound} matches 3.93%`);
assert(Math.abs(g8.upperBound - 0.1607) <= 0.002, `G8: upperBound ${g8.upperBound} matches 16.07%`);
assert(g8.isSignificant, "G8: Interval excludes 0, correctly flagged significant");

// G9: Variance: sd=10, n=20, 95%
const g9 = computeVarianceCI(10, 20, 95);
assert(Math.abs(g9.df - 19) === 0, "G9: df matches 19");
assert(Math.abs(g9.chi2Lower - 8.9065) <= 0.005, `G9: chi2Lower ${g9.chi2Lower} matches 8.9065`);
assert(Math.abs(g9.chi2Upper - 32.8523) <= 0.005, `G9: chi2Upper ${g9.chi2Upper} matches 32.8523`);
assert(Math.abs(g9.varLower - 57.8346) <= 0.01, `G9: varLower ${g9.varLower} matches 57.8346`);
assert(Math.abs(g9.varUpper - 213.3270) <= 0.02, `G9: varUpper ${g9.varUpper} matches 213.3270`);
assert(Math.abs(g9.sdLower - 7.6049) <= 0.01, `G9: sdLower ${g9.sdLower} matches 7.6049`);
assert(Math.abs(g9.sdUpper - 14.6057) <= 0.01, `G9: sdUpper ${g9.sdUpper} matches 14.6057`);
assert(Math.abs(g9.sdLower * g9.sdLower - g9.varLower) < 0.05, "G9: SD lower squared matches variance lower bound");
assert(Math.abs(g9.sdUpper * g9.sdUpper - g9.varUpper) < 0.05, "G9: SD upper squared matches variance upper bound");

// G10: Invalid n=0
const g10 = computeMeanCI(24.5, 4, 0, 95, false);
assert(!g10.isValid, "G10: n=0 is correctly marked invalid without silent clamp");

// G11: Invalid x > n
const g11 = computeProportionCI(550, 500, 95);
assert(!g11.isValid, "G11: x > n is correctly marked invalid");

// G12: Invalid SD <= 0
const g12 = computeMeanCI(24.5, -2, 16, 95, false);
assert(!g12.isValid, "G12: SD <= 0 is correctly marked invalid");

// G13: Confidence = 99%
const g13 = computeMeanCI(24.5, 4, 16, 99, false);
assert(Math.abs(g13.criticalValue - 2.9467) <= 0.002, `G13: 99% critT ${g13.criticalValue} matches 2.9467`);

// G14: Confidence = 80%
const g14 = computeMeanCI(24.5, 4, 16, 80, false);
assert(Math.abs(g14.criticalValue - 1.3406) <= 0.002, `G14: 80% critT ${g14.criticalValue} matches 1.3406`);

// -----------------------------------------------------------------------------
// 3. RANDOMIZED TESTING SUITES (3,000 CASES PER MODULE)
// -----------------------------------------------------------------------------
console.log("\n--- RUNNING 3,000 RANDOMIZED MEAN CI TESTS ---");
let meanPass = 0;
for (let i = 0; i < 3000; i++) {
  const m = -1000 + Math.random() * 2000;
  const s = 0.1 + Math.random() * 50;
  const n = 2 + Math.floor(Math.random() * 500);
  const cl = 50 + Math.random() * 49.9;
  const known = Math.random() > 0.5;

  const res = computeMeanCI(m, s, n, cl, known);
  if (!res.isValid) continue;

  const expectedSE = s / Math.sqrt(n);
  const seMatches = Math.abs(res.se - expectedSE) < 0.01;
  const meMatches = Math.abs(res.me - res.criticalValue * res.se) < 0.01;
  const symMatches = Math.abs((m - res.lowerBound) - (res.upperBound - m)) < 0.001;
  const orderMatches = res.lowerBound < res.upperBound;

  if (seMatches && meMatches && symMatches && orderMatches) {
    meanPass++;
  }
}
assert(meanPass === 3000, `Randomized Mean CI: ${meanPass}/3000 passed`);

console.log("--- RUNNING 3,000 RANDOMIZED PROPORTION TESTS ---");
let propPass = 0;
for (let i = 0; i < 3000; i++) {
  const n = 5 + Math.floor(Math.random() * 2000);
  const x = Math.floor(Math.random() * (n + 1));
  const cl = 50 + Math.random() * 49.9;

  const res = computeProportionCI(x, n, cl);
  if (!res.isValid) continue;

  const wilsonOrder = res.wilsonLower >= 0 && res.wilsonUpper <= 1 && res.wilsonLower <= res.wilsonUpper;
  const waldOrder = res.waldLower >= 0 && res.waldUpper <= 1 && res.waldLower <= res.waldUpper;
  const agrestiOrder = res.agrestiLower >= 0 && res.agrestiUpper <= 1 && res.agrestiLower <= res.agrestiUpper;

  if (wilsonOrder && waldOrder && agrestiOrder) {
    propPass++;
  }
}
assert(propPass === 3000, `Randomized Proportion CI: ${propPass}/3000 passed`);

console.log("--- RUNNING 3,000 RANDOMIZED TWO-MEANS TESTS ---");
let twoMeansPass = 0;
for (let i = 0; i < 3000; i++) {
  const m1 = -500 + Math.random() * 1000;
  const s1 = 0.5 + Math.random() * 30;
  const n1 = 2 + Math.floor(Math.random() * 100);
  const m2 = -500 + Math.random() * 1000;
  const s2 = 0.5 + Math.random() * 30;
  const n2 = 2 + Math.floor(Math.random() * 100);
  const cl = 80 + Math.random() * 19.9;
  const eq = Math.random() > 0.5;

  const res = computeTwoMeansCI(m1, s1, n1, m2, s2, n2, eq, cl);
  if (!res.isValid) continue;

  const diffMatches = Math.abs(res.diff - (m1 - m2)) < 1e-4;
  const orderMatches = res.lowerBound <= res.upperBound;
  const meMatches = Math.abs((res.upperBound - res.lowerBound) / 2 - res.me) < 0.01;

  if (diffMatches && orderMatches && meMatches) {
    twoMeansPass++;
  }
}
assert(twoMeansPass === 3000, `Randomized Two-Means CI: ${twoMeansPass}/3000 passed`);

console.log("--- RUNNING 3,000 RANDOMIZED TWO-PROPORTIONS TESTS ---");
let twoPropsPass = 0;
for (let i = 0; i < 3000; i++) {
  const n1 = 10 + Math.floor(Math.random() * 500);
  const x1 = Math.floor(Math.random() * (n1 + 1));
  const n2 = 10 + Math.floor(Math.random() * 500);
  const x2 = Math.floor(Math.random() * (n2 + 1));
  const cl = 80 + Math.random() * 19.9;

  const res = computeTwoProportionsCI(x1, n1, x2, n2, cl);
  if (!res.isValid) continue;

  const diff = x1 / n1 - x2 / n2;
  const diffMatches = Math.abs(res.diff - diff) < 1e-4;
  const boundValid = res.lowerBound >= -1 && res.upperBound <= 1 && res.lowerBound <= res.upperBound;

  if (diffMatches && boundValid) {
    twoPropsPass++;
  }
}
assert(twoPropsPass === 3000, `Randomized Two-Proportions CI: ${twoPropsPass}/3000 passed`);

console.log("--- RUNNING 3,000 RANDOMIZED VARIANCE TESTS ---");
let varPass = 0;
for (let i = 0; i < 3000; i++) {
  const s = 0.5 + Math.random() * 50;
  const n = 3 + Math.floor(Math.random() * 200);
  const cl = 80 + Math.random() * 19.9;

  const res = computeVarianceCI(s, n, cl);
  if (!res.isValid) continue;

  const orderMatches = res.varLower > 0 && res.varLower < res.varUpper;
  const sdVarRel = Math.abs(res.sdLower * res.sdLower - res.varLower) < 0.05 &&
                   Math.abs(res.sdUpper * res.sdUpper - res.varUpper) < 0.05;

  if (orderMatches && sdVarRel) {
    varPass++;
  }
}
assert(varPass === 3000, `Randomized Variance CI: ${varPass}/3000 passed`);

// -----------------------------------------------------------------------------
// 4. MONOTONICITY & BOUNDARY CHECKS
// -----------------------------------------------------------------------------
console.log("\n--- AUDITING MONOTONICITY ---");
// Larger n -> narrower interval
const ci_n10 = computeMeanCI(50, 10, 10, 95);
const ci_n100 = computeMeanCI(50, 10, 100, 95);
assert(ci_n100.me < ci_n10.me, "Monotonicity: Increasing n from 10 to 100 narrows ME");

// Higher CL -> wider interval
const ci_cl90 = computeMeanCI(50, 10, 30, 90);
const ci_cl99 = computeMeanCI(50, 10, 30, 99);
assert(ci_cl99.me > ci_cl90.me, "Monotonicity: Increasing confidence from 90% to 99% widens ME");

// Higher SD -> wider interval
const ci_sd5 = computeMeanCI(50, 5, 30, 95);
const ci_sd15 = computeMeanCI(50, 15, 30, 95);
assert(ci_sd15.me > ci_sd5.me, "Monotonicity: Increasing SD from 5 to 15 widens ME");

console.log("\n===============================================================================");
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${totalTests - passedTests}`);
console.log(`P0: ${p0Errors} | P1: ${p1Errors} | P2: ${p2Errors}`);
console.log(`SCORE: ${Math.round((passedTests / totalTests) * 100)}/100`);
console.log("===============================================================================");
