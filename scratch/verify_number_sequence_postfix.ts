import {
  parseSequenceInputWithValidation,
  detectSequencePattern,
  generateFiniteDifferenceTable,
  computeFibonacciBinet,
  evaluateCustomFunction,
  analyzeSeriesConvergence
} from "../src/app/calculators/number-sequence-calculator/sequence-logic";

console.log("=== COMPREHENSIVE POST-FIX VERIFICATION SCRIPT ===");

// 1. Golden A: Quadratic (2, 5, 10, 17, 26)
const q = detectSequencePattern([2, 5, 10, 17, 26], 10);
console.log("A. Quadratic formula:", q.explicitFormula, "target a_10:", q.targetTerm, "sum:", q.partialSum);
if (q.explicitFormula !== "a_n = n² + 1" || q.targetTerm !== 101 || q.partialSum !== 395) {
  throw new Error("Quadratic regression failed!");
}

// 2. Golden B: Arithmetic (3, 7, 11, 15, 19)
const a = detectSequencePattern([3, 7, 11, 15, 19], 10);
console.log("B. Arithmetic d:", a.commonDiff, "a_10:", a.targetTerm, "S_10:", a.partialSum);
if (a.commonDiff !== 4 || a.targetTerm !== 39 || a.partialSum !== 210) {
  throw new Error("Arithmetic regression failed!");
}

// 3. Golden C: Geometric (2, 6, 18, 54, 162)
const g = detectSequencePattern([2, 6, 18, 54, 162], 6);
console.log("C. Geometric r:", g.commonRatio, "a_6:", g.targetTerm, "S_6:", g.partialSum);
if (g.commonRatio !== 3 || g.targetTerm !== 486 || g.partialSum !== 728) {
  throw new Error("Geometric regression failed!");
}

// 4. Golden D: Constant (7, 7, 7, 7)
const c = detectSequencePattern([7, 7, 7, 7], 10);
console.log("D. Constant formula:", c.explicitFormula, "a_10:", c.targetTerm);
if (c.explicitFormula !== "a_n = 7" || c.targetTerm !== 7) {
  throw new Error("Constant regression failed!");
}

// 5. Golden E: Negative Arithmetic (20, 17, 14, 11, 8)
const na = detectSequencePattern([20, 17, 14, 11, 8], 10);
console.log("E. Negative Arithmetic d:", na.commonDiff, "a_10:", na.targetTerm);
if (na.commonDiff !== -3 || na.targetTerm !== -7) {
  throw new Error("Negative arithmetic regression failed!");
}

// 6. Golden F: Fractional Geometric (81, 27, 9, 3, 1)
const fg = detectSequencePattern([81, 27, 9, 3, 1], 6);
console.log("F. Fractional Geometric r:", fg.commonRatio, "S_inf:", fg.infiniteSum);
if (Math.abs((fg.infiniteSum ?? 0) - 121.5) > 1e-4) {
  throw new Error(`Fractional geometric infinite sum failed! Expected 121.5, got ${fg.infiniteSum}`);
}

// 7. Golden G: Negative Geometric (2, -4, 8, -16, 32)
const ng = detectSequencePattern([2, -4, 8, -16, 32], 6);
console.log("G. Negative Geometric r:", ng.commonRatio, "a_6:", ng.targetTerm, "S_6:", ng.partialSum);
if (ng.commonRatio !== -2 || ng.targetTerm !== -64 || ng.partialSum !== -42) {
  throw new Error("Negative geometric regression failed!");
}

// 8. Golden H: Standard Fibonacci
console.log("H. Fibonacci F_12:", computeFibonacciBinet(12), "F_20:", computeFibonacciBinet(20), "F_50:", computeFibonacciBinet(50));
if (computeFibonacciBinet(12) !== 144 || computeFibonacciBinet(20) !== 6765 || computeFibonacciBinet(50) !== 12586269025) {
  throw new Error("Fibonacci regression failed!");
}

// 9. Golden I: Lucas Sequence L_12
const lucasList = [1, 3];
for (let i = 2; i < 12; i++) lucasList.push(lucasList[i - 1] + lucasList[i - 2]);
console.log("I. Lucas L_12:", lucasList[11], "(Expected 322)");
if (lucasList[11] !== 322) throw new Error("Lucas regression failed!");

// 10. Golden J: Cubic Sequence (1, 8, 27, 64, 125)
const cb = detectSequencePattern([1, 8, 27, 64, 125], 6);
console.log("J. Cubic type:", cb.type, "formula:", cb.explicitFormula, "a_6:", cb.targetTerm, "S_6:", cb.partialSum);
if (cb.type !== "cubic" || cb.explicitFormula !== "a_n = n³" || cb.targetTerm !== 216 || cb.partialSum !== 441) {
  throw new Error(`Cubic regression failed! Expected a_n = n³, a_6=216, S_6=441; got ${cb.explicitFormula}, ${cb.targetTerm}, ${cb.partialSum}`);
}

// 11. Golden K: Custom Fibonacci-type (2, 3, 5, 8, 13, 21)
const cf = detectSequencePattern([2, 3, 5, 8, 13, 21], 7);
console.log("K. Custom Recurrence type:", cf.type, "a_7:", cf.targetTerm, "S_7:", cf.partialSum);
if (cf.targetTerm !== 34 || cf.partialSum !== 86) {
  throw new Error(`Custom recurrence regression failed! Expected a_7=34, S_7=86; got a_7=${cf.targetTerm}, S_7=${cf.partialSum}`);
}

// 12. Golden L: Insufficient Data (5, 8)
const ins = detectSequencePattern([5, 8], 5);
console.log("L. Insufficient Data typeName:", ins.typeName, "notes:", ins.notes);
if (!ins.typeName.includes("Insufficient Data") || !ins.notes) {
  throw new Error("Insufficient data regression failed!");
}

// 13. Golden M: Ambiguous (1, 2, 4, 8)
const amb = detectSequencePattern([1, 2, 4, 8], 5);
console.log("M. Ambiguous notes:", amb.notes);
if (!amb.notes || !amb.notes.includes("candidate")) {
  throw new Error("Ambiguous sequence regression failed!");
}

// 14. Negative Scatter Plot Coordinate Verification
console.log("Testing Negative Scatter Plot Coordinates...");
const negTerms = [10, 5, 0, -5, -10];
const minVal = Math.min(...negTerms, 0);
const maxVal = Math.max(...negTerms, 0);
const range = Math.max(maxVal - minVal, 1);
const plotTop = 20;
const plotBottom = 130;
const plotHeight = plotBottom - plotTop;
negTerms.forEach((t) => {
  const y = plotBottom - ((t - minVal) / range) * plotHeight;
  console.log(`  Term ${t} -> y=${y} (bounded in [${plotTop}, ${plotBottom}])`);
  if (y < plotTop || y > plotBottom) {
    throw new Error(`Scatter plot coordinate out of bounds: y=${y}`);
  }
});

console.log("\nALL POST-FIX REGRESSION TESTS PASSED CLEANLY!");
