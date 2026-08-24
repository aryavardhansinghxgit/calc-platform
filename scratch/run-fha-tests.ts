import { runAllFHATests } from "../src/app/calculators/fha-loan-calculator/tests";

const result = runAllFHATests();
console.log("FHA TEST RUN RESULT:", result);
if (result.failedCount > 0) {
  console.error("FAILURES DETECTED:", result.errors);
  process.exit(1);
} else {
  console.log("ALL FHA TESTS PASSED PERFECTLY!");
  process.exit(0);
}
