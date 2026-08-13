import { runResistorCalculatorTests } from "../src/app/calculators/resistor-calculator/tests";

try {
  console.log("Running custom Resistor Calculator Suite mathematical tests...");
  const pass = runResistorCalculatorTests();
  if (pass) {
    console.log("✓ SUCCESS: All custom Resistor Suite tests (Colors standard/backward compatible, Series, Parallel networks, SMD decodes, Wire conduction) passed successfully!");
  } else {
    console.log("✗ FAILED: Tests returned false.");
  }
} catch (err: any) {
  console.error("❌ FAILED with error:", err.message);
  process.exit(1);
}
