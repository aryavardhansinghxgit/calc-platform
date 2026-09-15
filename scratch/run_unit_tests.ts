import { runDayoftheWeekCalculatorTests } from "../src/app/calculators/day-of-the-week-calculator/tests";

try {
  runDayoftheWeekCalculatorTests();
  console.log("SUCCESS: All 10 day-of-week unit test suites passed!");
} catch (e: any) {
  console.error("FAIL:", e.message);
  process.exit(1);
}
