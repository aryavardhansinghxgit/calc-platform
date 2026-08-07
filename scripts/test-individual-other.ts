import { OTHER_CALCULATORS } from "../src/calculators/other";

console.log(`Running unit test suites for ${OTHER_CALCULATORS.length} Other calculators...`);

let passed = 0;
let failed = 0;

for (const calc of OTHER_CALCULATORS) {
  try {
    const defaultInputs = calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {});
    const res1 = calc.calculate(defaultInputs);
    if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

    const zeroInputs = calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: 0 }), {});
    const res2 = calc.calculate(zeroInputs);
    if (!res2) throw new Error("Formula failed for zero inputs");

    const negInputs = calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: -50 }), {});
    const res3 = calc.calculate(negInputs);
    if (!res3) throw new Error("Formula failed for negative inputs");

    const nanInputs = calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: NaN }), {});
    const res4 = calc.calculate(nanInputs);
    if (!res4) throw new Error("Formula failed for NaN inputs");

    passed++;
    console.log(`✓ ${calc.title} (${calc.slug}) passed`);
  } catch (err: any) {
    failed++;
    console.error(`❌ ${calc.title} (${calc.slug}) failed:`, err.message);
  }
}

console.log(`\nOther Category Test Summary: ${passed} passed, ${failed} failed out of ${OTHER_CALCULATORS.length} calculators.`);

if (failed > 0) {
  process.exit(1);
}
