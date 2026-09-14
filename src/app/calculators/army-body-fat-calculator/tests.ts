import { calculateArmyBodyFatCalculator } from "./calculator";

export function runArmyBodyFatCalculatorTests() {
  // Case 1: Standard benchmark (Height = 70 in, Waist = 34 in)
  // WHtR = 34 / 70 = 0.485714... < 0.55 -> COMPLIANT
  const case1 = calculateArmyBodyFatCalculator({
    heightInches: 70,
    waistInches: 34,
    unitSystem: "imperial",
  });
  if (Math.abs(case1.whtr - 0.4857) > 0.001) {
    throw new Error(`Case 1 expected WHtR ~0.4857, got ${case1.whtr}`);
  }
  if (case1.status !== "COMPLIANT") {
    throw new Error(`Case 1 expected status COMPLIANT, got ${case1.status}`);
  }

  // Case 2: Exact boundary threshold (Height = 70 in, Waist = 38.5 in)
  // WHtR = 38.5 / 70 = 0.55000 -> NON-COMPLIANT (Requirement is strictly < 0.55)
  const case2 = calculateArmyBodyFatCalculator({
    heightInches: 70,
    waistInches: 38.5,
    unitSystem: "imperial",
  });
  if (Math.abs(case2.whtr - 0.55) > 0.0001) {
    throw new Error(`Case 2 expected WHtR exactly 0.550, got ${case2.whtr}`);
  }
  if (case2.status !== "NON-COMPLIANT") {
    throw new Error(`Case 2 at exactly 0.550 must be NON-COMPLIANT under strict inequality (< 0.55), got ${case2.status}`);
  }

  // Case 3: Just below threshold (Height = 70 in, Waist = 38.4 in)
  // WHtR = 38.4 / 70 = 0.54857... < 0.55 -> COMPLIANT
  const case3 = calculateArmyBodyFatCalculator({
    heightInches: 70,
    waistInches: 38.4,
    unitSystem: "imperial",
  });
  if (case3.whtr >= 0.55) {
    throw new Error(`Case 3 WHtR must be < 0.55, got ${case3.whtr}`);
  }
  if (case3.status !== "COMPLIANT") {
    throw new Error(`Case 3 (WHtR ~0.5486) expected COMPLIANT, got ${case3.status}`);
  }

  // Case 4: Just above threshold (Height = 70 in, Waist = 38.6 in)
  // WHtR = 38.6 / 70 = 0.551428... >= 0.55 -> NON-COMPLIANT
  const case4 = calculateArmyBodyFatCalculator({
    heightInches: 70,
    waistInches: 38.6,
    unitSystem: "imperial",
  });
  if (case4.whtr < 0.55) {
    throw new Error(`Case 4 WHtR must be >= 0.55, got ${case4.whtr}`);
  }
  if (case4.status !== "NON-COMPLIANT") {
    throw new Error(`Case 4 (WHtR ~0.5514) expected NON-COMPLIANT, got ${case4.status}`);
  }

  // Case 5: Height = 0 -> INVALID
  const case5 = calculateArmyBodyFatCalculator({
    heightInches: 0,
    waistInches: 34,
  });
  if (case5.status !== "INVALID" || case5.whtr !== 0) {
    throw new Error("Case 5 (Height = 0) must return status INVALID and whtr 0");
  }

  // Case 6: Waist = 0 -> INVALID
  const case6 = calculateArmyBodyFatCalculator({
    heightInches: 70,
    waistInches: 0,
  });
  if (case6.status !== "INVALID" || case6.whtr !== 0) {
    throw new Error("Case 6 (Waist = 0) must return status INVALID and whtr 0");
  }

  // Case 7: Height = Infinity -> INVALID
  const case7 = calculateArmyBodyFatCalculator({
    heightInches: Infinity,
    waistInches: 34,
  });
  if (case7.status !== "INVALID") {
    throw new Error("Case 7 (Height = Infinity) must return status INVALID");
  }

  // Case 8: Metric Equivalence
  // Height = 177.8 cm, Waist = 86.36 cm -> WHtR = 86.36 / 177.8 = 0.485714...
  const case8 = calculateArmyBodyFatCalculator({
    heightCm: 177.8,
    waistCm: 86.36,
    unitSystem: "metric",
  });
  if (Math.abs(case8.whtr - case1.whtr) > 0.001) {
    throw new Error(`Metric Case 8 WHtR (${case8.whtr}) must match Imperial Case 1 (${case1.whtr})`);
  }
  if (case8.status !== "COMPLIANT") {
    throw new Error(`Metric Case 8 expected status COMPLIANT, got ${case8.status}`);
  }

  // Strict Boundary Tests around 0.55
  const boundaryTests = [
    { height: 100, waist: 54.9, expectedStatus: "COMPLIANT" }, // 0.549
    { height: 1000, waist: 549.9, expectedStatus: "COMPLIANT" }, // 0.5499
    { height: 10000, waist: 5499.9, expectedStatus: "COMPLIANT" }, // 0.54999
    { height: 100, waist: 55.0, expectedStatus: "NON-COMPLIANT" }, // 0.55000
    { height: 1000, waist: 550.1, expectedStatus: "NON-COMPLIANT" }, // 0.5501
    { height: 100, waist: 55.1, expectedStatus: "NON-COMPLIANT" }, // 0.551
  ];

  for (const b of boundaryTests) {
    const res = calculateArmyBodyFatCalculator({
      heightInches: b.height,
      waistInches: b.waist,
    });
    // Note: If b.height or b.waist are outside physiological guards (48-96 in, 18-80 in),
    // they get caught by physiological guard. Let's scale within 70 in height:
  }

  // Realistic boundary scaled to Height = 70 in:
  // Waist = 70 * 0.549 = 38.43 in -> 38.43 / 70 = 0.549 -> COMPLIANT
  const b1 = calculateArmyBodyFatCalculator({ heightInches: 70, waistInches: 38.43 });
  if (b1.status !== "COMPLIANT") throw new Error("Boundary test 0.549 must be COMPLIANT");

  // Waist = 70 * 0.550 = 38.50 in -> 38.50 / 70 = 0.550 -> NON-COMPLIANT
  const b2 = calculateArmyBodyFatCalculator({ heightInches: 70, waistInches: 38.5 });
  if (b2.status !== "NON-COMPLIANT") throw new Error("Boundary test 0.550 must be NON-COMPLIANT");

  // Waist = 70 * 0.551 = 38.57 in -> 38.57 / 70 = 0.551 -> NON-COMPLIANT
  const b3 = calculateArmyBodyFatCalculator({ heightInches: 70, waistInches: 38.57 });
  if (b3.status !== "NON-COMPLIANT") throw new Error("Boundary test 0.551 must be NON-COMPLIANT");

  // Negative and NaN inputs
  const negTest = calculateArmyBodyFatCalculator({ heightInches: -70, waistInches: 34 });
  if (negTest.status !== "INVALID") throw new Error("Negative height must be INVALID");

  const nanTest = calculateArmyBodyFatCalculator({ heightInches: NaN, waistInches: 34 });
  if (nanTest.status !== "INVALID") throw new Error("NaN height must be INVALID");

  // Historical Mode Test (Preserved 2023 tape test)
  const histTest = calculateArmyBodyFatCalculator({
    mode: "historical_2023_tape",
    gender: "male",
    age: 25,
    weightLbs: 175,
    waistInches: 34,
  });
  if (histTest.bodyFatPercent !== 19.7) {
    throw new Error(`Historical mode expected 19.7% BF, got ${histTest.bodyFatPercent}%`);
  }

  return true;
}
