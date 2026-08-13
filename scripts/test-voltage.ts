import { runVoltageDropCalculatorTests } from "../src/app/calculators/voltage-drop-calculator/tests";

try {
  console.log("Running custom Voltage Drop Calculator mathematical test cases...");
  const pass = runVoltageDropCalculatorTests();
  if (pass) {
    console.log("✓ SUCCESS: All custom mathematical cases (DC, AC 1-Phase, AC 3-Phase, Parallel wires, Metric sizing) passed successfully!");
  } else {
    console.log("✗ FAILED: Tests returned false.");
  }
} catch (err: any) {
  console.error("❌ FAILED with error:", err.message);
  process.exit(1);
}
