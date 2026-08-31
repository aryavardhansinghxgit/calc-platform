import { runFatIntakeCalculatorTests } from "../src/app/calculators/fat-intake-calculator/tests";

console.log("Running Fat Intake Calculator Unit & Regression Tests...");
try {
  const res = runFatIntakeCalculatorTests();
  console.log("ALL TESTS PASSED:", res);
} catch (err: any) {
  console.error("TEST FAILED:", err.message);
  process.exit(1);
}
