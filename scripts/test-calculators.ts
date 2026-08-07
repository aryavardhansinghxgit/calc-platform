import { ALL_CALCULATORS } from "../src/calculators";

console.log(`Starting automated test suite for ${ALL_CALCULATORS.length} calculators...`);

let passedCount = 0;
let failedCount = 0;

ALL_CALCULATORS.forEach((calc) => {
  try {
    // 1. Default inputs test
    const defaultInputs: Record<string, any> = {};
    calc.inputs.forEach((input) => {
      defaultInputs[input.name] = input.defaultValue;
    });

    const defaultResult = calc.calculate(defaultInputs);
    if (!defaultResult || typeof defaultResult !== "object") {
      throw new Error(`Calculator ${calc.id} returned invalid result object`);
    }

    // Check for NaN or null values in default results
    Object.entries(defaultResult).forEach(([key, val]) => {
      if (typeof val === "number" && isNaN(val)) {
        throw new Error(`Calculator ${calc.id} output '${key}' is NaN`);
      }
    });

    // 2. Zero / Minimal boundary inputs test
    const zeroInputs: Record<string, any> = {};
    calc.inputs.forEach((input) => {
      zeroInputs[input.name] = 0;
    });
    const zeroResult = calc.calculate(zeroInputs);
    Object.entries(zeroResult).forEach(([key, val]) => {
      if (typeof val === "number" && isNaN(val)) {
        throw new Error(`Calculator ${calc.id} output '${key}' returned NaN for zero inputs`);
      }
    });

    // 3. Large numbers boundary test
    const largeInputs: Record<string, any> = {};
    calc.inputs.forEach((input) => {
      largeInputs[input.name] = 1000000;
    });
    const largeResult = calc.calculate(largeInputs);
    Object.entries(largeResult).forEach(([key, val]) => {
      if (typeof val === "number" && isNaN(val)) {
        throw new Error(`Calculator ${calc.id} output '${key}' returned NaN for large inputs`);
      }
    });

    passedCount++;
    console.log(`✓ [PASS] ${calc.id} (${calc.title})`);
  } catch (err: any) {
    failedCount++;
    console.error(`✗ [FAIL] ${calc.id}: ${err.message}`);
  }
});

console.log(`\nTest Summary: ${passedCount} passed, ${failedCount} failed.`);
if (failedCount > 0) {
  process.exit(1);
}
