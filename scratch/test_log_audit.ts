// Audit test script for Log Calculator
import { calculateLogCalculator } from "../src/app/calculators/log-calculator/calculator";

console.log("=== RUNNING LOG CALCULATOR INDEPENDENT AUDIT ===");

// Golden Case 1: log10(100) = 2
const ln100 = Math.log(100);
const log10_100 = Math.log10(100);
const log2_100 = Math.log2(100);
console.log("G1: ln(100) =", ln100, "(expected ~4.605170186)");
console.log("G1: log10(100) =", log10_100, "(expected 2)");
console.log("G1: log2(100) =", log2_100, "(expected ~6.6438561898)");

// Golden Case 2: log_1049(105)
const ln105 = Math.log(105);
const ln1049 = Math.log(1049);
const log1049_105 = ln105 / ln1049;
console.log("G2: ln(105) =", ln105, "(expected ~4.653960350)");
console.log("G2: ln(1049) =", ln1049, "(expected ~6.95559261)");
console.log("G2: log_1049(105) =", log1049_105, "(expected ~0.6690961665)");

// Test server calculator.ts
const serverRes = calculateLogCalculator({ base: 1049, value: 105 });
console.log("Current calculator.ts output for base=1049, value=105:", serverRes);

const serverInvalid = calculateLogCalculator({ base: 1, value: 100 });
console.log("Current calculator.ts output for base=1:", serverInvalid);

const serverNeg = calculateLogCalculator({ base: -2, value: 100 });
console.log("Current calculator.ts output for base=-2:", serverNeg);
