import { runPasswordGeneratorTests } from "../src/app/calculators/password-generator/tests";

try {
  console.log("Running custom Password Generator Suite mathematical tests...");
  const pass = runPasswordGeneratorTests();
  if (pass) {
    console.log("✓ SUCCESS: All custom Password Generator tests passed successfully!");
  } else {
    console.log("✗ FAILED: Tests returned false.");
  }
} catch (err: any) {
  console.error("❌ FAILED with error:", err.message);
  process.exit(1);
}
