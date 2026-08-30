// scratch/calories_burned_audit.js
// Independent Oracle & Forensic Regression Suite for Calories Burned Calculator

const { ACTIVITIES_DATABASE, calculateCaloriesBurned } = require("../src/lib/formulas/caloriesBurned");
const { calculateCaloriesBurnedCalculator } = require("../src/app/calculators/calories-burned-calculator/calculator");

console.log("=================================================");
console.log("CALORIES BURNED CALCULATOR - FORENSIC AUDIT");
console.log("=================================================\n");

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const defects = [];

function assert(condition, testName, expected, actual, severity = "P1") {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    failedTests++;
    console.log(`[FAIL] [${severity}] ${testName} | Expected: ${expected} | Actual: ${actual}`);
    defects.push({ testName, severity, expected, actual });
  }
}

// 1. BASELINE AUDIT - DURATION MODE
console.log("--- 1. CORE CALCULATION ENGINE: DURATION MODE ---");
// Supplied PDF: Walking: Moderate (MET 3.5), 160 lb, 45 min
const baseDurationInput = {
  mode: "duration",
  unitSystem: "imperial",
  activityId: "walk-mod",
  durationMinutes: 45,
  weightLbs: 160,
};

const baseDurationResult = calculateCaloriesBurned(baseDurationInput);
console.log("Base Duration Result:", {
  caloriesBurned: baseDurationResult.caloriesBurned,
  caloriesPerMinute: baseDurationResult.caloriesPerMinute,
  caloriesPerHour: baseDurationResult.caloriesPerHour,
  fatMassLossLbs: baseDurationResult.fatMassLossLbs,
  pizzaSlices: baseDurationResult.foodEquivalents.pizzaSlices,
  weightKg: baseDurationResult.weightKg,
});

// Primary Formula in report: (45 * 3.5 * 72.5748) / 200 = 57.15 kcal -> 57 kcal
assert(baseDurationResult.caloriesBurned === 57, "Duration Base Calories (160 lb, 45 min, MET 3.5)", 57, baseDurationResult.caloriesBurned);
assert(baseDurationResult.caloriesPerMinute === 1.3, "Duration Base Burn Rate", 1.3, baseDurationResult.caloriesPerMinute);
// Note: hourly rate in PDF is 78 kcal/hr. In code: caloriesPerHour = Math.round(1.3 * 60) = 78
assert(baseDurationResult.caloriesPerHour === 78, "Duration Base Hourly Rate", 78, baseDurationResult.caloriesPerHour);
assert(baseDurationResult.fatMassLossLbs === 0.016, "Duration Base Fat Loss Lbs", 0.016, baseDurationResult.fatMassLossLbs);

// 2. BASELINE AUDIT - DISTANCE MODE
console.log("\n--- 2. CORE CALCULATION ENGINE: DISTANCE MODE ---");
// Running, 5 miles, 6 mph, 160 lb
const baseDistanceInput = {
  mode: "distance",
  unitSystem: "imperial",
  activityId: "run-6mph",
  distanceMiles: 5,
  speedMph: 6.0,
  weightLbs: 160,
};

const baseDistanceResult = calculateCaloriesBurned(baseDistanceInput);
console.log("Base Distance Result:", {
  caloriesBurned: baseDistanceResult.caloriesBurned,
  durationMinutes: baseDistanceResult.durationMinutes,
  caloriesPerMinute: baseDistanceResult.caloriesPerMinute,
  caloriesPerHour: baseDistanceResult.caloriesPerHour,
  fatMassLossLbs: baseDistanceResult.fatMassLossLbs,
  pizzaSlices: baseDistanceResult.foodEquivalents.pizzaSlices,
  met: baseDistanceResult.met,
});

assert(baseDistanceResult.durationMinutes === 50, "Distance Derived Duration (5 mi / 6 mph)", 50, baseDistanceResult.durationMinutes);
assert(baseDistanceResult.met === 9.8, "Distance Running MET at 6 mph", 9.8, baseDistanceResult.met);
assert(baseDistanceResult.caloriesBurned === 178, "Distance Calories (50 min, 160 lb, MET 9.8)", 178, baseDistanceResult.caloriesBurned);
assert(baseDistanceResult.caloriesPerMinute === 3.6, "Distance Burn Rate", 3.6, baseDistanceResult.caloriesPerMinute);
assert(baseDistanceResult.caloriesPerHour === 216, "Distance Hourly Rate", 216, baseDistanceResult.caloriesPerHour);
assert(baseDistanceResult.fatMassLossLbs === 0.051, "Distance Fat Loss Lbs", 0.051, baseDistanceResult.fatMassLossLbs);

// 3. SCIENTIFIC MET FORMULA DISCREPANCY AUDIT
console.log("\n--- 3. SCIENTIFIC MET FORMULA DISCREPANCY CHECK ---");
// In src/app/calculators/calories-burned-calculator/calculator.ts:
// totalCal = Math.round((met * 3.5 * w / 200) * mins)
const engineFallbackResult = calculateCaloriesBurnedCalculator({
  activity: 3.5,
  weightKg: 72.5748,
  durationMins: 45
});
console.log("calculator.ts output for MET 3.5, 72.57 kg, 45 min:", engineFallbackResult);
// Notice: calculator.ts gives 200 kcal, while formulas/caloriesBurned.ts gives 57 kcal!
const hasEngineDiscrepancy = engineFallbackResult.caloriesBurned !== baseDurationResult.caloriesBurned;
assert(
  !hasEngineDiscrepancy,
  "Scientific Equation vs Implemented Equation Parity (calculator.ts vs formulas/caloriesBurned.ts)",
  `${baseDurationResult.caloriesBurned} kcal (or unified)`,
  `${engineFallbackResult.caloriesBurned} kcal vs ${baseDurationResult.caloriesBurned} kcal`,
  "P1"
);

// 4. DATABASE SIZE AUDIT
console.log("\n--- 4. ACTIVITY / MET DATABASE AUDIT ---");
console.log("Current ACTIVITIES_DATABASE count:", ACTIVITIES_DATABASE.length);
assert(
  ACTIVITIES_DATABASE.length >= 50,
  "Activity Database Count >= 50",
  ">= 50",
  ACTIVITIES_DATABASE.length,
  "P1"
);

// 5. UNIT CONVERSIONS AUDIT
console.log("\n--- 5. UNIT CONVERSIONS AUDIT ---");
// US: 160 lb, 45 min, MET 3.5 -> 57 kcal
// Metric: 72.5748 kg, 45 min, MET 3.5
const metricResult = calculateCaloriesBurned({
  mode: "duration",
  unitSystem: "metric",
  activityId: "walk-mod",
  durationMinutes: 45,
  weightKg: 72.5748,
});
const diffUnits = Math.abs(baseDurationResult.caloriesBurned - metricResult.caloriesBurned);
assert(diffUnits <= 1, "US vs Metric Equivalence for 160 lb / 72.57 kg", "<= 1 kcal", `${diffUnits} kcal`);

// 6. WEIGHT SCALING LINEARITY
console.log("\n--- 6. WEIGHT SCALING LINEARITY ---");
const w1 = calculateCaloriesBurned({ mode: "duration", unitSystem: "metric", activityId: "walk-mod", durationMinutes: 60, weightKg: 50 });
const w2 = calculateCaloriesBurned({ mode: "duration", unitSystem: "metric", activityId: "walk-mod", durationMinutes: 60, weightKg: 100 });
// Should scale exactly 2x (within rounding)
const ratio = w2.caloriesBurned / w1.caloriesBurned;
assert(Math.abs(ratio - 2.0) <= 0.05, "Linear Weight Scaling (100kg vs 50kg)", "2.00", ratio.toFixed(3));

// 7. 5,000 RANDOMIZED MONTE CARLO SIMULATIONS
console.log("\n--- 7. 5,000 RANDOMIZED MONTE CARLO SIMULATIONS ---");
let monteCarloPassed = 0;
let maxAbsError = 0;
let maxRelError = 0;

for (let i = 0; i < 5000; i++) {
  const duration = Math.floor(Math.random() * 180) + 1; // 1 to 180 mins
  const weightKg = Math.random() * 150 + 40; // 40 to 190 kg
  const actIdx = Math.floor(Math.random() * ACTIVITIES_DATABASE.length);
  const act = ACTIVITIES_DATABASE[actIdx];
  const met = act.met;

  const res = calculateCaloriesBurned({
    mode: "duration",
    unitSystem: "metric",
    activityId: act.id,
    durationMinutes: duration,
    weightKg,
  });

  // Expected from documented formula: (duration * met * weightKg) / 200
  const expectedRaw = (duration * met * weightKg) / 200;
  const expected = Math.round(expectedRaw);

  const absError = Math.abs(res.caloriesBurned - expected);
  const relError = expected > 0 ? absError / expected : 0;

  if (absError > maxAbsError) maxAbsError = absError;
  if (relError > maxRelError) maxRelError = relError;

  if (
    !isNaN(res.caloriesBurned) &&
    isFinite(res.caloriesBurned) &&
    res.caloriesBurned >= 0 &&
    absError <= 1
  ) {
    monteCarloPassed++;
  }
}

assert(monteCarloPassed === 5000, "5,000 Randomized Monte Carlo Simulations", 5000, monteCarloPassed);
console.log(`Monte Carlo Stats: 5000 runs, Passed: ${monteCarloPassed}, Max Abs Error: ${maxAbsError}, Max Rel Error: ${maxRelError.toFixed(5)}`);

console.log("\n=================================================");
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log("=================================================");
if (defects.length > 0) {
  console.log("\nDEFECT SUMMARY:");
  defects.forEach((d, idx) => console.log(`${idx + 1}. [${d.severity}] ${d.testName} -> Expected: ${d.expected}, Got: ${d.actual}`));
}
