import { calculateCaloriesBurnedCalculator } from "./calculator";
import { calculateCaloriesBurned } from "@/lib/formulas/caloriesBurned";

export function runCaloriesBurnedCalculatorTests() {
  // Baseline A: Moderate Walking, 160 lb (72.5748 kg), 45 min, MET 3.5
  // Standard Compendium Formula: (45 * 3.5 * 3.5 * 72.5747792) / 200 ≈ 200.034 kcal
  const baseA = calculateCaloriesBurned({
    mode: "duration",
    unitSystem: "imperial",
    activityId: "walk-mod",
    durationMinutes: 45,
    weightLbs: 160,
  });

  if (baseA.caloriesBurned !== 200) {
    throw new Error(`Baseline A failed: expected 200 kcal, got ${baseA.caloriesBurned}`);
  }
  if (Math.abs(baseA.rawCalories - 200.034) > 0.1) {
    throw new Error(`Baseline A rawCalories failed: got ${baseA.rawCalories}`);
  }
  if (Math.abs(baseA.rawBurnRate - 4.4452) > 0.01) {
    throw new Error(`Baseline A rawBurnRate failed: got ${baseA.rawBurnRate}`);
  }
  if (Math.abs(baseA.rawHourlyRate - 266.712) > 0.1) {
    throw new Error(`Baseline A rawHourlyRate failed: got ${baseA.rawHourlyRate}`);
  }
  if (baseA.caloriesPerHour !== 266.71) {
    throw new Error(`Baseline A caloriesPerHour failed: expected 266.71, got ${baseA.caloriesPerHour}`);
  }

  // Baseline B: Running 6 mph, 160 lb, 5 miles = 50 min, MET 9.8
  // Standard Compendium Formula: (50 * 9.8 * 3.5 * 72.5747792) / 200 ≈ 622.329 kcal
  const baseB = calculateCaloriesBurned({
    mode: "distance",
    unitSystem: "imperial",
    activityId: "run-6mph",
    distanceMiles: 5,
    speedMph: 6.0,
    weightLbs: 160,
  });

  if (baseB.caloriesBurned !== 622 || baseB.durationMinutes !== 50) {
    throw new Error(`Baseline B failed: expected 622 kcal at 50 min, got ${baseB.caloriesBurned} at ${baseB.durationMinutes} min`);
  }
  if (Math.abs(baseB.rawCalories - 622.329) > 0.1) {
    throw new Error(`Baseline B rawCalories failed: got ${baseB.rawCalories}`);
  }
  if (Math.abs(baseB.rawBurnRate - 12.4466) > 0.01) {
    throw new Error(`Baseline B rawBurnRate failed: got ${baseB.rawBurnRate}`);
  }
  if (Math.abs(baseB.rawHourlyRate - 746.794) > 0.1) {
    throw new Error(`Baseline B rawHourlyRate failed: got ${baseB.rawHourlyRate}`);
  }
  if (baseB.caloriesPerHour !== 746.79) {
    throw new Error(`Baseline B caloriesPerHour failed: expected 746.79, got ${baseB.caloriesPerHour}`);
  }

  const defaultInputs = {
    activity: 3.5,
    weightKg: 72.5747792,
    durationMins: 45,
  };
  const res1 = calculateCaloriesBurnedCalculator(defaultInputs);
  if (!res1 || res1.caloriesBurned !== 200) throw new Error(`Formula failed for default inputs: got ${res1?.caloriesBurned}`);

  const zeroInputs = {
    activity: 0,
    weightKg: 0,
    durationMins: 0,
  };
  const res2 = calculateCaloriesBurnedCalculator(zeroInputs);
  if (!res2 || res2.caloriesBurned < 0) throw new Error("Formula failed for zero inputs");

  return true;
}
