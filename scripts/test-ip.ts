import { runIPSubnetCalculatorTests } from "../src/app/calculators/ip-subnet-calculator/tests";

try {
  console.log("Running custom IP Subnet Calculator Suite mathematical tests...");
  const pass = runIPSubnetCalculatorTests();
  if (pass) {
    console.log("✓ SUCCESS: All custom IP Subnet tests passed successfully!");
  } else {
    console.log("✗ FAILED: Tests returned false.");
  }
} catch (err: any) {
  console.error("❌ FAILED with error:", err.message);
  process.exit(1);
}
