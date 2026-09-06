import {
  parseSequenceInput,
  detectSequencePattern,
  generateFiniteDifferenceTable,
  computeFibonacciBinet
} from "../src/app/calculators/number-sequence-calculator/sequence-logic";

console.log("=== RUNNING GOLDEN TESTS FOR NUMBER SEQUENCE CALCULATOR ===");

// Golden Case P-01: Quadratic (2, 5, 10, 17, 26)
console.log("\n--- P-01: Quadratic (2, 5, 10, 17, 26) ---");
const p01_terms = [2, 5, 10, 17, 26];
const p01_res = detectSequencePattern(p01_terms, 10);
const p01_diffs = generateFiniteDifferenceTable(p01_terms);
console.log("Type:", p01_res.type);
console.log("Formula:", p01_res.explicitFormula);
console.log("Target term a_10:", p01_res.targetTerm);
console.log("Partial sum S_10:", p01_res.partialSum);
console.log("Finite diffs rows:", p01_diffs.length);
p01_diffs.forEach(r => console.log(`  Level ${r.level}: [${r.values.join(", ")}] isConstant=${r.isConstant}`));

// Golden Case P-02: Arithmetic (3, 7, 11, 15, 19)
console.log("\n--- P-02: Arithmetic (3, 7, 11, 15, 19) ---");
const p02_terms = [3, 7, 11, 15, 19];
const p02_res = detectSequencePattern(p02_terms, 10);
console.log("Type:", p02_res.type);
console.log("d:", p02_res.commonDiff);
console.log("Formula:", p02_res.explicitFormula);
console.log("Target a_10:", p02_res.targetTerm, "(Expected: 39)");
console.log("Sum S_10:", p02_res.partialSum, "(Expected: 210)");

// Golden Case P-03: Geometric (2, 6, 18, 54, 162)
console.log("\n--- P-03: Geometric (2, 6, 18, 54, 162) ---");
const p03_terms = [2, 6, 18, 54, 162];
const p03_res = detectSequencePattern(p03_terms, 6);
console.log("Type:", p03_res.type);
console.log("r:", p03_res.commonRatio);
console.log("Formula:", p03_res.explicitFormula);
console.log("Target a_6:", p03_res.targetTerm, "(Expected: 486)");
console.log("Sum S_6:", p03_res.partialSum, "(Expected: 728)");

// Golden Case P-04: Constant Sequence (7, 7, 7, 7)
console.log("\n--- P-04: Constant Sequence (7, 7, 7, 7) ---");
const p04_terms = [7, 7, 7, 7];
const p04_res = detectSequencePattern(p04_terms, 10);
console.log("Type:", p04_res.type);
console.log("Formula:", p04_res.explicitFormula);
console.log("Target a_10:", p04_res.targetTerm, "(Expected: 7)");

// Golden Case P-05: Linear Negative Difference (20, 17, 14, 11, 8)
console.log("\n--- P-05: Linear Negative Difference (20, 17, 14, 11, 8) ---");
const p05_terms = [20, 17, 14, 11, 8];
const p05_res = detectSequencePattern(p05_terms, 10);
console.log("Type:", p05_res.type);
console.log("d:", p05_res.commonDiff, "(Expected: -3)");
console.log("Formula:", p05_res.explicitFormula);
console.log("Target a_10:", p05_res.targetTerm, "(Expected: -7)");

// Golden Case P-06: Geometric Fraction (81, 27, 9, 3, 1)
console.log("\n--- P-06: Geometric Fraction (81, 27, 9, 3, 1) ---");
const p06_terms = [81, 27, 9, 3, 1];
const p06_res = detectSequencePattern(p06_terms, 6);
console.log("Type:", p06_res.type);
console.log("r:", p06_res.commonRatio, "(Expected: 0.333333 or 1/3)");
console.log("Formula:", p06_res.explicitFormula);
console.log("Target a_6:", p06_res.targetTerm, "(Expected: 1/3 ≈ 0.3333)");
console.log("Infinite sum:", p06_res.infiniteSum, "(Expected: 81 / (1 - 1/3) = 121.5)");

// Golden Case P-07: Negative Geometric Ratio (2, -4, 8, -16, 32)
console.log("\n--- P-07: Negative Geometric Ratio (2, -4, 8, -16, 32) ---");
const p07_terms = [2, -4, 8, -16, 32];
const p07_res = detectSequencePattern(p07_terms, 6);
console.log("Type:", p07_res.type);
console.log("r:", p07_res.commonRatio, "(Expected: -2)");
console.log("Formula:", p07_res.explicitFormula);
console.log("Target a_6:", p07_res.targetTerm, "(Expected: -64)");

// Golden Case P-08: Fibonacci (n = 12)
console.log("\n--- P-08: Fibonacci ---");
console.log("F_0:", computeFibonacciBinet(0), "(Expected: 0)");
console.log("F_1:", computeFibonacciBinet(1), "(Expected: 1)");
console.log("F_2:", computeFibonacciBinet(2), "(Expected: 1)");
console.log("F_12:", computeFibonacciBinet(12), "(Expected: 144)");
console.log("F_20:", computeFibonacciBinet(20), "(Expected: 6765)");
console.log("F_50:", computeFibonacciBinet(50), "(Expected: 12586269025)");

// Golden Case P-09: Lucas Sequence
console.log("\n--- P-09: Lucas Sequence in SequenceCalculator.tsx ---");
// In SequenceCalculator:
// list.push(l1 = 1); if (n>=2) list.push(l2 = 3); for i=3..n next = l1+l2...
// Let's check what SequenceCalculator calculates for Lucas:
function calcLucas(n: number) {
  const list: number[] = [];
  let l1 = 1, l2 = 3;
  list.push(l1);
  if (n >= 2) list.push(l2);
  for (let i = 3; i <= n; i++) {
    const next = l1 + l2;
    l1 = l2;
    l2 = next;
    list.push(next);
  }
  return { term: list[list.length - 1], list };
}
console.log("SequenceCalculator Lucas n=12:", calcLucas(12));
console.log("Standard Lucas indexing (L_0=2, L_1=1):");
console.log("L_0=2, L_1=1, L_2=3, L_3=4, L_4=7, L_5=11, L_6=18, L_7=29, L_8=47, L_9=76, L_10=123, L_11=199, L_12=322");
console.log("What does SequenceCalculator produce for n=12? Let's check: term =", calcLucas(12).term);

// Golden Case P-10: Cubic Sequence (1, 8, 27, 64, 125)
console.log("\n--- P-10: Cubic Sequence (1, 8, 27, 64, 125) ---");
const p10_terms = [1, 8, 27, 64, 125];
const p10_res = detectSequencePattern(p10_terms, 6);
console.log("Type:", p10_res.type);
console.log("TypeName:", p10_res.typeName);
console.log("Formula:", p10_res.explicitFormula);

// Golden Case P-11: Non-polynomial / Irregular (2, 3, 5, 8, 13, 21)
console.log("\n--- P-11: Fibonacci-type (2, 3, 5, 8, 13, 21) ---");
const p11_terms = [2, 3, 5, 8, 13, 21];
const p11_res = detectSequencePattern(p11_terms, 7);
console.log("Type:", p11_res.type);
console.log("TypeName:", p11_res.typeName);
console.log("Formula:", p11_res.explicitFormula);
console.log("Target term a_7:", p11_res.targetTerm);

// Golden Case P-12: Insufficient Data (5, 8)
console.log("\n--- P-12: Insufficient Data (5, 8) ---");
const p12_terms = [5, 8];
const p12_res = detectSequencePattern(p12_terms, 5);
console.log("Type:", p12_res.type);
console.log("TypeName:", p12_res.typeName);
console.log("Formula:", p12_res.explicitFormula);

// Golden Case P-13: Ambiguity
console.log("\n--- P-13: Ambiguity (1, 2, 4, 8) ---");
const p13_terms = [1, 2, 4, 8];
const p13_res = detectSequencePattern(p13_terms, 5);
console.log("Type:", p13_res.type);
console.log("Formula:", p13_res.explicitFormula);
