import {
  bigFactorial,
  bigPermutation,
  bigCombination,
  bigPermutationRep,
  bigCombinationRep,
  formatBigNumber,
  computeStandardCombinatorics,
  generateCombinationsList,
  generatePermutationsList,
  computeCircularPermutations,
  computeMultisetPermutations,
  computeDerangements,
  computePascalTriangle,
  computeHypergeometricProbability
} from "../src/app/calculators/permutation-combination-calculator/perm-comb-logic";

console.log("=== GOLDEN CASE A: n=6, r=2 ===");
const caseA = computeStandardCombinatorics(6, 2, "std");
console.log("nPr:", caseA.nPr.toString(), "expected: 30");
console.log("nCr:", caseA.nCr.toString(), "expected: 15");
console.log("nPrRep:", caseA.nPrRep.toString(), "expected: 36");
console.log("nCrRep:", caseA.nCrRep.toString(), "expected: 21");
console.log("Steps nPr:", caseA.nPrSteps);
console.log("Steps nCr:", caseA.nCrSteps);
console.log("Steps nPrRep:", caseA.nPrRepSteps);
console.log("Steps nCrRep:", caseA.nCrRepSteps);

console.log("\n=== GOLDEN CASE B: n=68, r=2 ===");
const caseB_std = computeStandardCombinatorics(68, 2, "std");
const caseB_sci = computeStandardCombinatorics(68, 2, "sci");
const caseB_log = computeStandardCombinatorics(68, 2, "log");
console.log("Standard format:");
console.log("nPr:", caseB_std.nPrFormatted, "expected: 4,556");
console.log("nCr:", caseB_std.nCrFormatted, "expected: 2,278");
console.log("nPrRep:", caseB_std.nPrRepFormatted, "expected: 4,624");
console.log("nCrRep:", caseB_std.nCrRepFormatted, "expected: 2,346");

console.log("Scientific format:");
console.log("nPr:", caseB_sci.nPrFormatted);
console.log("nCr:", caseB_sci.nCrFormatted);
console.log("nPrRep:", caseB_sci.nPrRepFormatted);
console.log("nCrRep:", caseB_sci.nCrRepFormatted);

console.log("Log10 format:");
console.log("nPr:", caseB_log.nPrFormatted);
console.log("nCr:", caseB_log.nCrFormatted);
console.log("nPrRep:", caseB_log.nPrRepFormatted);
console.log("nCrRep:", caseB_log.nCrRepFormatted);

console.log("\n=== GOLDEN CASE C: Circular n=6 ===");
const caseC = computeCircularPermutations(6, "std");
console.log("Circular (6-1)! = 5!:", caseC.circularFormatted, "expected: 120");
console.log("Necklace (6-1)!/2:", caseC.necklaceFormatted, "expected: 60");
console.log("Explanation:", caseC.explanation);

console.log("\n=== GOLDEN CASE D: Multiset MISSISSIPPI ===");
const caseD = computeMultisetPermutations("MISSISSIPPI", "std");
console.log("Total unique permutations:", caseD.formattedPermutations, "expected: 34,650");
console.log("n:", caseD.n, "expected: 11");
console.log("Freq table:", JSON.stringify(caseD.freqTable));
console.log("Step text:", caseD.stepText);

console.log("\n=== GOLDEN CASE E: Derangements n=5 ===");
const caseE = computeDerangements(5, "std");
console.log("!5:", caseE.formattedSubfactorial, "expected: 44");
console.log("5!:", caseE.totalPermutations.toString(), "expected: 120");
console.log("Proportion:", caseE.proportionPct, "expected: 36.67%");
console.log("Derangements 1..7:");
for (let i = 1; i <= 7; i++) {
  console.log(`!${i} =`, computeDerangements(i).formattedSubfactorial);
}

console.log("\n=== GOLDEN CASE F: Pascal n=7, k=3 ===");
const caseF = computePascalTriangle(7, 3, "std");
console.log("C(7,3):", caseF.formattedBinom, "expected: 35");
console.log("Row coeffs:", caseF.formattedRowCoeffs.join(" "));
console.log("Row sum:", caseF.formattedRowSum, "expected: 128");

console.log("\n=== GOLDEN CASE G1 & G2: Hypergeometric ===");
console.log("G1: N=52, K=13, n=5, k=2");
const caseG1 = computeHypergeometricProbability(52, 13, 5, 2);
console.log("G1 Probability:", caseG1.probabilityPct, "Odds:", caseG1.oddsRatioStr, "fav:", caseG1.favorableOutcomes.toString(), "total:", caseG1.totalOutcomes.toString());
console.log("G1 Step text:", caseG1.stepText);

console.log("G2: N=525, K=13, n=5, k=2");
const caseG2 = computeHypergeometricProbability(525, 13, 5, 2);
console.log("G2 Probability:", caseG2.probabilityPct, "Odds:", caseG2.oddsRatioStr, "fav:", caseG2.favorableOutcomes.toString(), "total:", caseG2.totalOutcomes.toString());
console.log("G2 Step text:", caseG2.stepText);
