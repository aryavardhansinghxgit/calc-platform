import { evaluateCustomFunction, analyzeSeriesConvergence } from "../src/app/calculators/number-sequence-calculator/sequence-logic";

console.log("Testing evaluateCustomFunction...");

// n^2 + 1
console.log("n^2 + 1 for n=5:", evaluateCustomFunction("n^2 + 1", 5), "(Expected: 26)");
console.log("2^n - 1 for n=4:", evaluateCustomFunction("2^n - 1", 4), "(Expected: 15)");
console.log("3*n + 5 for n=10:", evaluateCustomFunction("3*n + 5", 10), "(Expected: 35)");
console.log("1/n for n=2:", evaluateCustomFunction("1/n", 2), "(Expected: 0.5)");
console.log("sin(n) for n=0:", evaluateCustomFunction("sin(n)", 0), "(Expected: 0)");

// Convergence
console.log("Convergence 1/(2^n):", analyzeSeriesConvergence(n => Math.pow(0.5, n)));
console.log("Convergence n^2:", analyzeSeriesConvergence(n => n * n));
console.log("Convergence 1/n:", analyzeSeriesConvergence(n => 1 / n));
