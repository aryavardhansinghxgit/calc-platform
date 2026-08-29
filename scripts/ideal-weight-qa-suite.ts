import {
  calculateIdealWeight,
  evaluateFrameSizeFromWrist,
  IdealWeightInput,
  Gender,
  FrameSize,
  FrameMode,
} from "../src/lib/formulas/idealWeight";
import { ideal_weight_calculatorFaqs } from "../src/app/calculators/ideal-weight-calculator/faq";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

interface TestResult {
  name: string;
  expected: any;
  actual: any;
  diff: any;
  status: "PASS" | "FAIL";
}

const testResults: TestResult[] = [];

function check(
  name: string,
  expected: any,
  actual: any,
  tolerance = 0.1
) {
  totalTests++;
  let isPass = false;
  let diff: any = 0;

  if (typeof expected === "number" && typeof actual === "number") {
    diff = Math.abs(expected - actual);
    isPass = diff <= tolerance;
  } else {
    isPass = expected === actual;
    diff = isPass ? 0 : "mismatch";
  }

  if (isPass) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAIL: ${name} | Expected: ${expected}, Actual: ${actual}, Diff: ${diff}`);
  }

  testResults.push({
    name,
    expected,
    actual,
    diff,
    status: isPass ? "PASS" : "FAIL",
  });
}

console.log("==================================================");
console.log("MASTER QA + FORENSIC REGRESSION SUITE: IDEAL WEIGHT");
console.log("==================================================\n");

// -----------------------------------------------------------------------------
// TEST SUITE 1: CANONICAL REFERENCE BASELINE (PDF Page 1: 28y Male, 5'10", 175 lb, 7.0" wrist, Medium Frame)
// -----------------------------------------------------------------------------
console.log("--- TEST SUITE 1: Canonical Reference Baseline (Male, 5'10\") ---");
{
  const res = calculateIdealWeight({
    unitSystem: "us",
    gender: "male",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    currentWeightLbs: 175,
    wristInches: 7.0,
    frameMode: "manual",
    frameSize: "medium",
  });

  check("Devine kg", 73.0, res.devine.weightKg);
  check("Devine lbs", 160.9, res.devine.weightLbs, 0.1);
  check("Robinson kg", 71.0, res.robinson.weightKg);
  check("Robinson lbs", 156.5, res.robinson.weightLbs, 0.1);
  check("Miller kg", 70.3, res.miller.weightKg);
  check("Miller lbs", 155.0, res.miller.weightLbs, 0.1);
  check("Hamwi kg", 75.0, res.hamwi.weightKg);
  check("Hamwi lbs", 165.3, res.hamwi.weightLbs, 0.1);
  check("Lemmens kg", 69.5, res.lemmens.weightKg);
  check("Lemmens lbs", 153.2, res.lemmens.weightLbs, 0.1);
  check("Consensus kg", 71.8, res.consensusKg);
  check("Consensus lbs", 158.3, res.consensusLbs, 0.1);
  check("Weight Delta lbs", 16.7, res.weightDeltaLbs, 0.1);
  check("Weeks at 1.0 lb/wk", 17, res.weeksAtOneLbPerWk);
  check("Weeks at 1.5 lb/wk", 12, res.weeksAtOneAndHalfLbPerWk);

  // WHO BMI range
  check("WHO Min kg", 58.5, res.whoMinKg, 0.1);
  check("WHO Max kg", 79.0, res.whoMaxKg, 0.1);
  check("WHO Min lbs", 129.0, res.whoMinLbs, 0.1);
  check("WHO Max lbs", 174.2, res.whoMaxLbs, 0.1);
}

// -----------------------------------------------------------------------------
// TEST SUITE 2: WORKED EXAMPLE (PDF Page 5: 35y Male, 5'10", Large Frame)
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 2: Worked Example (35y Male, 5'10\", Large Frame) ---");
{
  const resLarge = calculateIdealWeight({
    unitSystem: "us",
    gender: "male",
    age: 35,
    heightFeet: 5,
    heightInches: 10,
    frameMode: "manual",
    frameSize: "large",
  });

  // Base Devine: 73.0 kg, Large frame (+10%): 73.0 * 1.10 = 80.3 kg (177.03 lbs -> 177.0 lbs)
  check("Large Frame Devine kg", 80.3, resLarge.devine.weightKg);
  check("Large Frame Devine lbs", 177.0, resLarge.devine.weightLbs, 0.1);
  check("Frame Multiplier", 1.1, resLarge.frameMultiplier);

  // Crucial P1 check: WHO BMI range MUST NOT be multiplied by 1.10!
  check("WHO Min kg remains unscaled", 58.5, resLarge.whoMinKg, 0.1);
  check("WHO Max kg remains unscaled", 79.0, resLarge.whoMaxKg, 0.1);
  check("WHO Min lbs remains unscaled", 129.0, resLarge.whoMinLbs, 0.1);
  check("WHO Max lbs remains unscaled", 174.2, resLarge.whoMaxLbs, 0.1);
}

// -----------------------------------------------------------------------------
// TEST SUITE 3: FEMALE REFERENCE SCENARIO (5'10", 70 inches)
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 3: Female Reference Scenario (5'10\") ---");
{
  const resFemale = calculateIdealWeight({
    unitSystem: "us",
    gender: "female",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    frameMode: "manual",
    frameSize: "medium",
  });

  check("Female Devine kg", 68.5, resFemale.devine.weightKg);
  check("Female Devine lbs", 151.0, resFemale.devine.weightLbs, 0.1);
  check("Female Robinson kg", 66.0, resFemale.robinson.weightKg);
  check("Female Robinson lbs", 145.5, resFemale.robinson.weightLbs, 0.1);
  check("Female Miller kg", 66.7, resFemale.miller.weightKg);
  check("Female Miller lbs", 147.1, resFemale.miller.weightLbs, 0.1);
  check("Female Hamwi kg", 67.5, resFemale.hamwi.weightKg);
  check("Female Hamwi lbs", 148.8, resFemale.hamwi.weightLbs, 0.1);
  check("Female Lemmens kg", 69.5, resFemale.lemmens.weightKg);
  check("Female Lemmens lbs", 153.2, resFemale.lemmens.weightLbs, 0.1);
  check("Female Consensus kg", 67.6, resFemale.consensusKg, 0.1);
  check("Female Consensus lbs", 149.0, resFemale.consensusLbs, 0.2);

  // Female WHO BMI range matches male because WHO BMI is sex-invariant
  check("Female WHO Min lbs", 129.0, resFemale.whoMinLbs, 0.1);
  check("Female WHO Max lbs", 174.2, resFemale.whoMaxLbs, 0.1);
}

// -----------------------------------------------------------------------------
// TEST SUITE 4: EXPLICIT REGRESSION CASES FOR FRAME SIZE MODEL
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 4: Frame Model Regression Cases ---");
{
  // 1. Wrist 7.0", Male, 5'10", Manual Medium -> frame MUST remain Medium
  const c1 = calculateIdealWeight({
    gender: "male",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    wristInches: 7.0,
    frameMode: "manual",
    frameSize: "medium",
  });
  check("Case 1: Manual Medium preserved with 7.0\" wrist", "medium", c1.frameSize);
  check("Case 1 multiplier is 1.0x", 1.0, c1.frameMultiplier);

  // 2. Same inputs, Manual Small -> calculation MUST use Small
  const c2 = calculateIdealWeight({
    gender: "male",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    wristInches: 7.0,
    frameMode: "manual",
    frameSize: "small",
  });
  check("Case 2: Manual Small preserved with 7.0\" wrist", "small", c2.frameSize);
  check("Case 2 multiplier is 0.9x", 0.9, c2.frameMultiplier);
  check("Case 2 Devine is 73.0 * 0.9 = 65.7 kg", 65.7, c2.devine.weightKg);

  // 3. Same inputs, Manual Large -> calculation MUST use Large
  const c3 = calculateIdealWeight({
    gender: "male",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    wristInches: 7.0,
    frameMode: "manual",
    frameSize: "large",
  });
  check("Case 3: Manual Large preserved with 7.0\" wrist", "large", c3.frameSize);
  check("Case 3 multiplier is 1.1x", 1.1, c3.frameMultiplier);
  check("Case 3 Devine is 73.0 * 1.1 = 80.3 kg", 80.3, c3.devine.weightKg);

  // 4. Auto mode + wrist changed from 6.0" to 8.0" -> frame updates
  const autoSmall = calculateIdealWeight({
    gender: "male",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    wristInches: 6.0,
    frameMode: "auto",
  });
  check("Case 4a: Auto mode 6.0\" wrist evaluates to small", "small", autoSmall.frameSize);

  const autoLarge = calculateIdealWeight({
    gender: "male",
    age: 28,
    heightFeet: 5,
    heightInches: 10,
    wristInches: 8.0,
    frameMode: "auto",
  });
  check("Case 4b: Auto mode 8.0\" wrist evaluates to large", "large", autoLarge.frameSize);

  // 5. WHO BMI range stays identical across Small, Medium, Large
  check("WHO Range independent across Small vs Medium", true, c2.whoMinKg === c1.whoMinKg);
  check("WHO Range independent across Large vs Medium", true, c3.whoMaxKg === c1.whoMaxKg);
}

// -----------------------------------------------------------------------------
// TEST SUITE 5: SUB-5-FOOT HEIGHT BOUNDARY & CONTINUATION
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 5: Heights Below 5 Feet (Sub-60-Inch) ---");
{
  const testHeights = [36, 48, 59.99, 60, 60.01, 72, 84];
  for (const hIn of testHeights) {
    const cm = hIn * 2.54;
    const res = calculateIdealWeight({
      gender: "male",
      age: 28,
      heightCm: cm,
      frameMode: "manual",
      frameSize: "medium",
    });

    check(`Height ${hIn}" produces non-NaN Devine`, true, !isNaN(res.devine.weightKg) && res.devine.weightKg > 0);
    check(`Height ${hIn}" produces non-NaN Consensus`, true, !isNaN(res.consensusKg) && res.consensusKg > 0);
    check(`Height ${hIn}" sub-5-ft flag correct`, hIn < 60, res.isSub5Feet);
  }

  // Confirm no flat region: 48" weight must be strictly less than 60" weight!
  const h48 = calculateIdealWeight({ gender: "male", age: 28, heightCm: 48 * 2.54 });
  const h60 = calculateIdealWeight({ gender: "male", age: 28, heightCm: 60 * 2.54 });
  check("48\" stature does not share flat baseline with 60\" stature", true, h48.devine.weightKg < h60.devine.weightKg);
}

// -----------------------------------------------------------------------------
// TEST SUITE 6: 15 CURATED EVIDENCE-BASED FAQS
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 6: FAQ Repository Verification ---");
{
  check("FAQ count is exactly 15", 15, ideal_weight_calculatorFaqs.length);

  const hasCompetitorSpam = ideal_weight_calculatorFaqs.some(
    (f) =>
      f.question.toLowerCase().includes("calculator.net") ||
      f.answer.toLowerCase().includes("calculator.net")
  );
  check("No competitor comparison promotional spam in FAQs", true, !hasCompetitorSpam);

  ideal_weight_calculatorFaqs.forEach((faq, idx) => {
    check(`FAQ #${idx + 1} substantial question`, true, faq.question.trim().length > 10);
    check(`FAQ #${idx + 1} substantial answer`, true, faq.answer.trim().length > 20);
  });
}

// -----------------------------------------------------------------------------
// TEST SUITE 7: 5,000 RANDOMIZED PROPERTY INVARIANT TESTS
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 7: 5,000 Randomized Property Invariant Tests ---");
{
  let randPassed = 0;
  for (let i = 0; i < 5000; i++) {
    const gender: Gender = i % 2 === 0 ? "male" : "female";
    const heightInches = 40 + (i % 50); // 40 to 90 inches
    const heightCm = heightInches * 2.54;
    const currentWeightLbs = 80 + (i % 260);
    const age = 18 + (i % 82);
    const frames: FrameSize[] = ["small", "medium", "large"];
    const frame = frames[i % 3];
    const frameModes: FrameMode[] = ["auto", "manual"];
    const mode = frameModes[i % 2];
    const wristIn = 5.0 + ((i % 40) / 10); // 5.0 to 9.0 inches

    const res = calculateIdealWeight({
      gender,
      age,
      heightCm,
      currentWeightLbs,
      wristInches: wristIn,
      frameSize: frame,
      frameMode: mode,
    });

    const devineValid = res.devine.weightKg > 0 && !isNaN(res.devine.weightKg);
    const robinsonValid = res.robinson.weightKg > 0 && !isNaN(res.robinson.weightKg);
    const millerValid = res.miller.weightKg > 0 && !isNaN(res.miller.weightKg);
    const hamwiValid = res.hamwi.weightKg > 0 && !isNaN(res.hamwi.weightKg);
    const lemmensValid = res.lemmens.weightKg > 0 && !isNaN(res.lemmens.weightKg);
    const consensusValid = res.consensusKg > 0 && !isNaN(res.consensusKg);
    const whoValid = res.whoMinKg < res.whoMaxKg && !isNaN(res.whoMinKg);
    const deltaValid = !isNaN(res.weightDeltaLbs);
    const timelineValid = res.weeksAtOneLbPerWk >= 0 && res.weeksAtOneAndHalfLbPerWk >= 0;

    if (
      devineValid &&
      robinsonValid &&
      millerValid &&
      hamwiValid &&
      lemmensValid &&
      consensusValid &&
      whoValid &&
      deltaValid &&
      timelineValid
    ) {
      randPassed++;
    }
  }

  check("5,000 Randomized Invariants Valid", 5000, randPassed);
}

console.log("\n==================================================");
console.log("MASTER QA TEST RESULTS SUMMARY");
console.log("==================================================");
console.log(`TOTAL TESTS:  ${totalTests}`);
console.log(`TESTS PASSED: ${passedTests}`);
console.log(`TESTS FAILED: ${failedTests}`);
console.log(`PASS RATE:    ${((passedTests / totalTests) * 100).toFixed(2)}%`);

if (failedTests === 0) {
  console.log("\n✨ ALL TEST SUITES COMPLETED WITH 100% SUCCESS!");
} else {
  console.error(`\n❌ FAILED WITH ${failedTests} DEFECTS!`);
  process.exit(1);
}
