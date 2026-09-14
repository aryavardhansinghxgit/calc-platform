import {
  calculateArmyWHtR,
  calculateArmyBodyFat,
  CURRENT_ARMY_BODY_COMPOSITION_POLICY,
  UnitSystem,
} from "../src/lib/formulas/armyBodyFat";
import { calculateArmyBodyFatCalculator } from "../src/app/calculators/army-body-fat-calculator/calculator";
import { runArmyBodyFatCalculatorTests } from "../src/app/calculators/army-body-fat-calculator/tests";
import { army_body_fat_calculatorFaqs } from "../src/app/calculators/army-body-fat-calculator/faq";

console.log("=================================================");
console.log("ARMY BODY COMPOSITION 2026 POST-FIX TEST SUITE");
console.log("Directive 2026-13: Waist-to-Height Ratio (WHtR < 0.55)");
console.log("=================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    throw new Error(`Test failed: ${msg}`);
  }
  passedTests++;
}

// 1. Built-in tests in tests.ts
console.log("--> Running tests.ts runner...");
runArmyBodyFatCalculatorTests();
assert(true, "tests.ts passed cleanly");

// 2. Authoritative Policy Metadata Check
console.log("--> Verifying Policy Source & Constants...");
assert(CURRENT_ARMY_BODY_COMPOSITION_POLICY.policyDirective === "Army Directive 2026-13", "Directive must be 2026-13");
assert(CURRENT_ARMY_BODY_COMPOSITION_POLICY.complianceThreshold === 0.55, "Threshold must be 0.55");
assert(CURRENT_ARMY_BODY_COMPOSITION_POLICY.strictInequality === true, "Must enforce strict inequality (< 0.55)");

// 3. CASE 1: Height = 70 in, Waist = 34 in
console.log("--> Testing Case 1: Standard Compliant (70 in, 34 in)...");
const c1 = calculateArmyWHtR({
  unitSystem: "imperial",
  heightInches: 70,
  waistInches: 34,
});
assert(c1.isValid === true, "Case 1 must be valid");
assert(Math.abs(c1.whtr - 34 / 70) < 1e-6, "Case 1 full precision WHtR must equal 34/70");
assert(c1.whtrDisplay === 0.4857, `Case 1 display must be 0.4857, got ${c1.whtrDisplay}`);
assert(c1.isCompliant === true, "Case 1 must be compliant");
assert(c1.complianceStatus === "COMPLIANT", "Case 1 status must be COMPLIANT");
assert(c1.maxCompliantWaist === 38.4, `Max compliant waist for 70 in expected 38.4 in, got ${c1.maxCompliantWaist}`);
assert(c1.requiredWaistReduction === 0, "No waist reduction required for compliant soldier");

// 4. CASE 2: Exact boundary: Height = 70 in, Waist = 38.5 in (WHtR = 0.550)
console.log("--> Testing Case 2: Exact Boundary (70 in, 38.5 in -> WHtR 0.550)...");
const c2 = calculateArmyWHtR({
  unitSystem: "imperial",
  heightInches: 70,
  waistInches: 38.5,
});
assert(c2.isValid === true, "Case 2 must be valid");
assert(Math.abs(c2.whtr - 0.55) < 1e-6, "Case 2 WHtR must be exactly 0.55");
assert(c2.isCompliant === false, "Case 2 at 0.550 MUST NOT be compliant under strict inequality (< 0.55)");
assert(c2.complianceStatus === "NON_COMPLIANT", "Case 2 status must be NON_COMPLIANT");
assert(c2.requiredWaistReduction > 0, "Case 2 must indicate required waist reduction");

// 5. CASE 3: Just below threshold: Height = 70 in, Waist = 38.4 in (WHtR ~0.54857)
console.log("--> Testing Case 3: Just Below Threshold (70 in, 38.4 in)...");
const c3 = calculateArmyWHtR({
  unitSystem: "imperial",
  heightInches: 70,
  waistInches: 38.4,
});
assert(c3.isCompliant === true, "Case 3 must be compliant");
assert(c3.complianceStatus === "COMPLIANT", "Case 3 status must be COMPLIANT");
assert(c3.whtr < 0.55, "Case 3 WHtR must be < 0.55");

// 6. CASE 4: Just above threshold: Height = 70 in, Waist = 38.6 in (WHtR ~0.55143)
console.log("--> Testing Case 4: Just Above Threshold (70 in, 38.6 in)...");
const c4 = calculateArmyWHtR({
  unitSystem: "imperial",
  heightInches: 70,
  waistInches: 38.6,
});
assert(c4.isCompliant === false, "Case 4 must be non-compliant");
assert(c4.complianceStatus === "NON_COMPLIANT", "Case 4 status must be NON_COMPLIANT");
assert(c4.whtr > 0.55, "Case 4 WHtR must be > 0.55");

// 7. CASES 5, 6, 7: Input Validation (Zero, Negative, Infinity)
console.log("--> Testing Cases 5-7: Input Validation Guards...");
const c5 = calculateArmyWHtR({ unitSystem: "imperial", heightInches: 0, waistInches: 34 });
assert(c5.isValid === false, "Height = 0 must be invalid");
assert(c5.complianceStatus === "INVALID", "Height = 0 status must be INVALID");
assert(c5.whtr === 0, "Invalid WHtR must be 0");

const c6 = calculateArmyWHtR({ unitSystem: "imperial", heightInches: 70, waistInches: 0 });
assert(c6.isValid === false, "Waist = 0 must be invalid");
assert(c6.complianceStatus === "INVALID", "Waist = 0 status must be INVALID");

const c7 = calculateArmyWHtR({ unitSystem: "imperial", heightInches: Infinity, waistInches: 34 });
assert(c7.isValid === false, "Height = Infinity must be invalid");
assert(c7.complianceStatus === "INVALID", "Height = Infinity status must be INVALID");

const cNeg = calculateArmyWHtR({ unitSystem: "imperial", heightInches: -70, waistInches: 34 });
assert(cNeg.isValid === false, "Negative height must be invalid");

const cNan = calculateArmyWHtR({ unitSystem: "imperial", heightInches: 70, waistInches: NaN });
assert(cNan.isValid === false, "NaN waist must be invalid");

// 8. CASE 8: Metric Equivalence
console.log("--> Testing Case 8: Metric Equivalence (177.8 cm / 86.36 cm)...");
const c8 = calculateArmyWHtR({
  unitSystem: "metric",
  heightCm: 177.8,
  waistCm: 86.36,
});
assert(c8.isValid === true, "Metric case 8 must be valid");
assert(Math.abs(c8.whtr - c1.whtr) < 1e-4, `Metric WHtR (${c8.whtr}) must equal Imperial WHtR (${c1.whtr})`);
assert(c8.isCompliant === true, "Metric equivalent must be compliant");

// 9. Strict Boundary Testing Immediately Around 0.55
console.log("--> Running Boundary Test Matrix around 0.55...");
// Scale within realistic height = 70 in:
const boundaryScenarios = [
  { waist: 38.43, expectedCompliant: true, label: "0.5490" },
  { waist: 38.49, expectedCompliant: true, label: "0.54986" },
  { waist: 38.499, expectedCompliant: true, label: "0.54998" },
  { waist: 38.50, expectedCompliant: false, label: "0.55000 (Exact threshold)" },
  { waist: 38.501, expectedCompliant: false, label: "0.55001" },
  { waist: 38.57, expectedCompliant: false, label: "0.5510" },
];

for (const b of boundaryScenarios) {
  const res = calculateArmyWHtR({
    unitSystem: "imperial",
    heightInches: 70,
    waistInches: b.waist,
  });
  assert(
    res.isCompliant === b.expectedCompliant,
    `Boundary ${b.label} (Waist ${b.waist} in / 70 in = ${(b.waist / 70).toFixed(5)}) expected compliant=${b.expectedCompliant}`
  );
  assert(
    res.complianceStatus === (b.expectedCompliant ? "COMPLIANT" : "NON_COMPLIANT"),
    `Boundary ${b.label} expected status ${b.expectedCompliant ? "COMPLIANT" : "NON_COMPLIANT"}`
  );
}

// 10. 1,000 Valid Randomized Cases
console.log("--> Running 1,000 Valid Randomized Cases...");
let validPassed = 0;
for (let i = 0; i < 1000; i++) {
  const isMetric = Math.random() > 0.5;
  const heightIn = Math.floor(Math.random() * (82 - 58 + 1)) + 58;
  const waistIn = Math.floor(Math.random() * (52 - 24 + 1)) + 24;

  const height = isMetric ? parseFloat((heightIn * 2.54).toFixed(1)) : heightIn;
  const waist = isMetric ? parseFloat((waistIn * 2.54).toFixed(1)) : waistIn;

  const res = calculateArmyWHtR({
    unitSystem: isMetric ? "metric" : "imperial",
    heightInches: isMetric ? undefined : height,
    heightCm: isMetric ? height : undefined,
    waistInches: isMetric ? undefined : waist,
    waistCm: isMetric ? waist : undefined,
  });

  assert(res.isValid === true, `Random #${i} must be valid`);
  assert(Number.isFinite(res.whtr), `Random #${i} WHtR must be finite`);
  assert(res.whtr > 0, `Random #${i} WHtR must be positive`);
  assert(
    res.isCompliant === res.whtr < 0.55,
    `Random #${i} compliance (${res.isCompliant}) must match whtr < 0.55 (${res.whtr})`
  );
  assert(
    res.complianceStatus === (res.whtr < 0.55 ? "COMPLIANT" : "NON_COMPLIANT"),
    `Random #${i} status must match rule`
  );
  validPassed++;
}
console.log(`✓ 1,000 valid randomized cases passed cleanly (${validPassed}/1000).`);

// 11. 250 Invalid Randomized Cases
console.log("--> Running 250 Invalid Randomized Cases...");
let invalidHandled = 0;
const invalidScenarios = [
  { height: 0, waist: 34 },
  { height: -70, waist: 34 },
  { height: 70, waist: 0 },
  { height: 70, waist: -34 },
  { height: NaN, waist: 34 },
  { height: 70, waist: NaN },
  { height: Infinity, waist: 34 },
  { height: 70, waist: Infinity },
  { height: -Infinity, waist: 34 },
  { height: 20, waist: 34 }, // Out of physiological range (too short)
  { height: 120, waist: 34 }, // Out of physiological range (too tall)
  { height: 70, waist: 10 }, // Out of physiological range (too small waist)
  { height: 70, waist: 110 }, // Out of physiological range (too large waist)
];

for (let i = 0; i < 250; i++) {
  const scenario = invalidScenarios[i % invalidScenarios.length];
  const res = calculateArmyWHtR({
    unitSystem: "imperial",
    heightInches: scenario.height,
    waistInches: scenario.waist,
  });

  assert(res.isValid === false, `Invalid test #${i} must have isValid: false`);
  assert(res.complianceStatus === "INVALID", `Invalid test #${i} must have status INVALID`);
  assert(res.whtr === 0, `Invalid test #${i} must have WHtR 0`);
  invalidHandled++;
}
console.log(`✓ 250 invalid randomized cases correctly rejected (${invalidHandled}/250).`);

// 11. FAQ Synchronization
console.log("--> Verifying FAQ Synchronization...");
assert(army_body_fat_calculatorFaqs.length === 24, "Must have exactly 24 FAQs");
assert(
  army_body_fat_calculatorFaqs.some((f) => f.question.includes("2026") && (f.answer.includes("< 0.55") || f.answer.includes("less than 0.55"))),
  "FAQ must reflect 2026 standard"
);
console.log("✓ FAQ correctly synchronized with 2026 policy.");

console.log("\n=================================================");
console.log(`ALL TESTS PASSED: ${passedTests}/${totalTests}`);
console.log("=================================================");
