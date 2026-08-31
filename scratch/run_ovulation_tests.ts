import { runOvulationCalculatorTests } from "../src/app/calculators/ovulation-calculator/tests";

console.log("Running Ovulation Calculator Unit & Regression Tests...");
const pass = runOvulationCalculatorTests();
console.log("ALL TESTS PASSED:", pass);
