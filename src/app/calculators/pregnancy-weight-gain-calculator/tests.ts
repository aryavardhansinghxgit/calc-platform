import { calculatePregnancyWeightGainCalculator } from "./calculator";

export function runPregnancyWeightGainCalculatorTests() {
  // Test 1: Standard Default Inputs (Metric, Single)
  const defaultInputs = {
    unitSystem: "metric",
    pregnancyType: "single",
    preWeightKg: 62,
    heightCm: 165,
    currentWeightKg: 67,
    week: 20,
  };
  const res1 = calculatePregnancyWeightGainCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default metric inputs");
  if (typeof res1.preBmi !== "number" || res1.preBmi < 10) throw new Error("Invalid preBmi in res1");
  if (!res1.schedule || res1.schedule.length !== 40) throw new Error("Schedule must contain 40 weeks");
  if (!res1.breakdown || res1.breakdown.length < 5) throw new Error("Breakdown must contain tissue components");

  // Test 2: Imperial Inputs (US Units, Twins)
  const twinInputs = {
    unitSystem: "us",
    pregnancyType: "twins",
    heightFeet: 5,
    heightInches: 6,
    preWeightLbs: 130,
    currentWeightLbs: 145,
    week: 24,
  };
  const res2 = calculatePregnancyWeightGainCalculator(twinInputs);
  if (!res2 || res2.pregnancyType !== "twins") throw new Error("Formula failed for twin gestations");
  if (res2.currentWeek !== 24) throw new Error("Incorrect current week parsing");

  // Test 3: Zero Inputs Handling
  const zeroInputs = {
    preWeightKg: 0,
    heightCm: 0,
    week: 0,
  };
  const res3 = calculatePregnancyWeightGainCalculator(zeroInputs);
  if (!res3 || res3.preBmi <= 0) throw new Error("Formula failed for zero inputs fallback");

  // Test 4: Negative Inputs Handling
  const negInputs = {
    preWeightKg: -50,
    heightCm: -150,
    week: -10,
  };
  const res4 = calculatePregnancyWeightGainCalculator(negInputs);
  if (!res4 || res4.preBmi <= 0) throw new Error("Formula failed for negative inputs fallback");

  // Test 5: Null / NaN Inputs Handling
  const nanInputs = {
    preWeightKg: null,
    heightCm: null,
    week: null,
  };
  const res5 = calculatePregnancyWeightGainCalculator(nanInputs);
  if (!res5 || typeof res5.recommendedGainTotal !== "string") throw new Error("Formula failed for null/NaN inputs");

  return true;
}

export default runPregnancyWeightGainCalculatorTests;
