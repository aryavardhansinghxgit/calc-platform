import * as fs from 'fs';

console.log('==================================================');
console.log('BESPOKE RENDERER ELIMINATION & DEAD CODE AUDIT');
console.log('==================================================\n');

const layoutSrc = fs.readFileSync('src/components/calculator/CalculatorLayout.tsx', 'utf-8');
const formSrc = fs.readFileSync('src/components/calculator/CalculatorForm.tsx', 'utf-8');
const resultSrc = fs.readFileSync('src/components/calculator/CalculatorResult.tsx', 'utf-8');
const inputFieldSrc = fs.readFileSync('src/components/calculator/InputField.tsx', 'utf-8');
const resultCardSrc = fs.readFileSync('src/components/calculator/ResultCard.tsx', 'utf-8');
const enPageSrc = fs.readFileSync('src/app/calculators/fuel-cost-calculator/page.tsx', 'utf-8');
const esPageSrc = fs.readFileSync('src/app/[locale]/calculators/[slug]/page.tsx', 'utf-8');

let passes = 0;
let fails = 0;

function assert(condition: boolean, msg: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${msg}`);
    passes++;
  } else {
    console.error(`  ❌ FAIL: ${msg}`);
    fails++;
  }
}

// 1. CalculatorLayout check
assert(!layoutSrc.includes('import { FuelCostCalculator }'), 'CalculatorLayout.tsx does NOT import FuelCostCalculator');
assert(!layoutSrc.includes('<FuelCostCalculator'), 'CalculatorLayout.tsx does NOT render <FuelCostCalculator />');
assert(!layoutSrc.match(/\)\s*:\s*isFuelCost\s*\?\s*\(\s*<[A-Za-z]+Calculator/), 'CalculatorLayout.tsx does NOT have bespoke calculator form/result component branch for fuel cost');

// 2. CalculatorForm check
assert(!formSrc.includes('fuel-cost'), 'CalculatorForm.tsx has ZERO fuel-cost specific branches');
assert(!formSrc.includes('fuelPrice'), 'CalculatorForm.tsx has ZERO hardcoded fuel input references');

// 3. CalculatorResult check
assert(!resultSrc.includes('fuel-cost'), 'CalculatorResult.tsx has ZERO fuel-cost specific branches');
assert(!resultSrc.includes('totalCost'), 'CalculatorResult.tsx has ZERO hardcoded fuel output references');

// 4. InputField & ResultCard check
assert(!inputFieldSrc.includes('fuel-cost'), 'InputField.tsx has ZERO fuel-cost specific branches');
assert(!resultCardSrc.includes('fuel-cost'), 'ResultCard.tsx has ZERO fuel-cost specific branches');

// 5. English & Spanish Page routes check
assert(enPageSrc.includes('<CalculatorLayout definition={serializableDef} />'), 'English page delegates directly to generic CalculatorLayout');
assert(esPageSrc.includes('<CalculatorLayout definition={localizedDef} locale={locale} />'), 'Spanish page delegates directly to generic CalculatorLayout with localizedDef');

// 6. FuelCostCalculator.tsx File Status
const bespokeFileExists = fs.existsSync('src/components/calculator/fuel-cost/FuelCostCalculator.tsx');
assert(bespokeFileExists, 'FuelCostCalculator.tsx file exists on filesystem (legacy reference)');

console.log('\n--- SUMMARY ---');
console.log('FuelCostCalculator.tsx Status: DEAD / UNUSED LEGACY COMPONENT (0 active references in render path).');
console.log(`Total Bespoke Elimination Checks: ${passes} PASSED, ${fails} FAILED\n`);

if (fails > 0) process.exit(1);
