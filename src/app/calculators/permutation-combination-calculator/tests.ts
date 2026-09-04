import { calculatePermutationCombinationCalculator } from "./calculator";
import {
  computeStandardCombinatorics,
  computeCircularPermutations,
  computeMultisetPermutations,
  computeDerangements,
  computePascalTriangle,
  computeHypergeometricProbability,
  formatBigNumber
} from "./perm-comb-logic";

export function runPermutationCombinationCalculatorTests() {
  // 1. Zero Input Handling in calculator.ts (Must NOT coerce 0 into defaults 8 or 3)
  const zeroRes = calculatePermutationCombinationCalculator({ nVal: 0, rVal: 0 });
  if (zeroRes.combinations !== 1 || zeroRes.permutations !== 1) {
    throw new Error(`Zero input failed: expected 1, 1 but got ${zeroRes.combinations}, ${zeroRes.permutations}`);
  }

  const n5r0 = calculatePermutationCombinationCalculator({ nVal: 5, rVal: 0 });
  if (n5r0.combinations !== 1 || n5r0.permutations !== 1) {
    throw new Error(`n=5, r=0 failed: expected 1, 1 but got ${n5r0.combinations}, ${n5r0.permutations}`);
  }

  const n5r5 = calculatePermutationCombinationCalculator({ nVal: 5, rVal: 5 });
  if (n5r5.combinations !== 1 || n5r5.permutations !== 120) {
    throw new Error(`n=5, r=5 failed: expected 1, 120 but got ${n5r5.combinations}, ${n5r5.permutations}`);
  }

  // 2. Scientific Formatting Verification (Defect 1)
  if (formatBigNumber(4556n, "sci") !== "4.556 × 10^3") {
    throw new Error(`Scientific 4556 failed: got ${formatBigNumber(4556n, "sci")}`);
  }
  if (formatBigNumber(2278n, "sci") !== "2.278 × 10^3") {
    throw new Error(`Scientific 2278 failed: got ${formatBigNumber(2278n, "sci")}`);
  }
  if (formatBigNumber(4624n, "sci") !== "4.624 × 10^3") {
    throw new Error(`Scientific 4624 failed: got ${formatBigNumber(4624n, "sci")}`);
  }
  if (formatBigNumber(2346n, "sci") !== "2.346 × 10^3") {
    throw new Error(`Scientific 2346 failed: got ${formatBigNumber(2346n, "sci")}`);
  }

  // 3. Log10 Precision Verification (Defect 2)
  if (formatBigNumber(4556n, "log") !== "10^3.6586") {
    throw new Error(`Log10 4556 failed: got ${formatBigNumber(4556n, "log")}`);
  }
  if (formatBigNumber(2278n, "log") !== "10^3.3576") {
    throw new Error(`Log10 2278 failed: got ${formatBigNumber(2278n, "log")}`);
  }
  if (formatBigNumber(4624n, "log") !== "10^3.6650") {
    throw new Error(`Log10 4624 failed: got ${formatBigNumber(4624n, "log")}`);
  }
  if (formatBigNumber(2346n, "log") !== "10^3.3703") {
    throw new Error(`Log10 2346 failed: got ${formatBigNumber(2346n, "log")}`);
  }

  // 4. Derangements Subfactorials & Rounding (Defect 3)
  const d1 = computeDerangements(1);
  if (d1.subfactorial !== 0n) throw new Error(`!1 must be 0`);
  const d2 = computeDerangements(2);
  if (d2.subfactorial !== 1n) throw new Error(`!2 must be 1`);
  const d3 = computeDerangements(3);
  if (d3.subfactorial !== 2n) throw new Error(`!3 must be 2`);
  const d4 = computeDerangements(4);
  if (d4.subfactorial !== 9n) throw new Error(`!4 must be 9`);
  const d5 = computeDerangements(5);
  if (d5.subfactorial !== 44n || d5.proportionPct !== 36.67) {
    throw new Error(`!5 failed: subfactorial ${d5.subfactorial}, proportion ${d5.proportionPct}% (expected 44, 36.67%)`);
  }
  const d6 = computeDerangements(6);
  if (d6.subfactorial !== 265n) throw new Error(`!6 must be 265`);
  const d7 = computeDerangements(7);
  if (d7.subfactorial !== 1854n) throw new Error(`!7 must be 1854`);

  // 5. Golden Case A: n=6, r=2
  const caseA = computeStandardCombinatorics(6, 2);
  if (caseA.nPr !== 30n || caseA.nCr !== 15n || caseA.nPrRep !== 36n || caseA.nCrRep !== 21n) {
    throw new Error("Golden Case A failed");
  }

  // 6. Golden Case C: Circular n=6
  const caseC = computeCircularPermutations(6);
  if (caseC.circularPerm !== 120n || caseC.necklacePerm !== 60n) {
    throw new Error("Golden Case C failed");
  }

  // 7. Golden Case D: Multiset MISSISSIPPI
  const caseD = computeMultisetPermutations("MISSISSIPPI");
  if (caseD.totalPermutations !== 34650n || caseD.n !== 11) {
    throw new Error("Golden Case D failed");
  }

  // 8. Golden Case F: Pascal n=7, k=3
  const caseF = computePascalTriangle(7, 3);
  if (caseF.binomCoeff !== 35n || caseF.rowSum !== 128n) {
    throw new Error("Golden Case F failed");
  }

  // 9. Golden Case G1 & G2: Hypergeometric
  const caseG1 = computeHypergeometricProbability(52, 13, 5, 2);
  if (caseG1.probabilityPct !== "27.4279%") {
    throw new Error(`Golden Case G1 failed: got ${caseG1.probabilityPct}`);
  }
  const caseG2 = computeHypergeometricProbability(525, 13, 5, 2);
  if (caseG2.probabilityPct !== "0.5319%") {
    throw new Error(`Golden Case G2 failed: got ${caseG2.probabilityPct}`);
  }

  return true;
}
