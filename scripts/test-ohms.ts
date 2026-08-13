import { runOhmsLawCalculatorTests } from "../src/app/calculators/ohms-law-calculator/tests";

try {
  console.log("Running custom Ohm's Law Calculator Suite mathematical tests...");
  const pass = runOhmsLawCalculatorTests();
  if (pass) {
    console.log("✓ SUCCESS: All custom Ohm's Law tests passed successfully!");
  } else {
    console.log("✗ FAILED: Tests returned false.");
  }
} catch (err: any) {
  console.error("❌ FAILED with error:", err.message);
  process.exit(1);
}
