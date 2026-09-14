import { calculateBacCalculator, PURE_ALCOHOL_DENSITY_G_ML, US_STANDARD_DRINK_GRAMS, ALCOHOL_CALORIES_PER_GRAM, getWidmarkR, getSeidlR, getWatsonR, getImpairmentStage } from "../src/app/calculators/bac-calculator/calculator";
import { BacInputs, DrinkEntry } from "../src/app/calculators/bac-calculator/types";

console.log("=================================================");
console.log("ADVERSARIAL QA AUDIT: BAC CALCULATOR");
console.log("=================================================");

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failed++;
  }
}

// -------------------------------------------------------------
// Benchmark Test: Provided Screenshot
// Male, 165 lb, 5'10", 2 standard beers (12 oz, 5%), 2 hrs elapsed, Light meal
// -------------------------------------------------------------
const defaultDrink: DrinkEntry = {
  id: "1",
  name: "Standard Beer (5% ABV)",
  category: "beer",
  count: 2,
  volumeMl: 355,
  abvPercent: 5.0,
};

const baseInputs: BacInputs = {
  mode: "widmark-standard",
  gender: "male",
  unitSystem: "us",
  ageYears: 30,
  weightLbs: 165,
  heightFeet: 5,
  heightInches: 10,
  weightKg: 75,
  heightCm: 178,
  timeSinceFirstDrinkHours: 2,
  timeSinceFirstDrinkMinutes: 0,
  stomachState: "light",
  eliminationRateBeta: 0.015,
  drinks: [defaultDrink],
};

const resBenchmark = calculateBacCalculator(baseInputs);
console.log("\n--- Benchmark Outputs ---");
console.log("Total Pure Alcohol (g):", resBenchmark.totalPureAlcoholGrams);
console.log("Total Standard Drinks:", resBenchmark.totalStandardDrinks);
console.log("Peak BAC (%):", resBenchmark.peakBacPercent);
console.log("Current BAC (%):", resBenchmark.currentBacPercent);
console.log("Current BAC (g/L):", resBenchmark.currentBacGramsPerLiter);
console.log("Hours to 0.08%:", resBenchmark.hoursUntilLegalLimit008);
console.log("Hours to 0.00%:", resBenchmark.hoursUntilSober000);

assert(resBenchmark.currentBacPercent === 0.025, `Benchmark Current BAC matches 0.025% (got ${resBenchmark.currentBacPercent}%)`);
assert(resBenchmark.peakBacPercent === 0.055, `Benchmark Peak BAC matches 0.055% (got ${resBenchmark.peakBacPercent}%)`);
assert(resBenchmark.hoursUntilLegalLimit008 === 0, `Benchmark Hours to 0.08% is 0 (got ${resBenchmark.hoursUntilLegalLimit008})`);
assert(resBenchmark.hoursUntilSober000 === 1.7, `Benchmark Hours to 0.00% is 1.7 (got ${resBenchmark.hoursUntilSober000})`);

// -------------------------------------------------------------
// Phase 23: Zero-Drink Case
// -------------------------------------------------------------
console.log("\n--- Phase 23: Zero-Drink Case ---");
const zeroDrinksEmpty = calculateBacCalculator({ ...baseInputs, drinks: [] });
console.log("Empty drinks array result: BAC =", zeroDrinksEmpty.currentBacPercent, "Alcohol (g) =", zeroDrinksEmpty.totalPureAlcoholGrams);
assert(zeroDrinksEmpty.currentBacPercent === 0 && zeroDrinksEmpty.totalPureAlcoholGrams === 0, 
  `Empty drinks array MUST result in 0 BAC and 0g alcohol (got ${zeroDrinksEmpty.currentBacPercent}%, ${zeroDrinksEmpty.totalPureAlcoholGrams}g)`);

const zeroCountDrink: DrinkEntry = { ...defaultDrink, count: 0 };
const zeroDrinksCount = calculateBacCalculator({ ...baseInputs, drinks: [zeroCountDrink] });
console.log("Zero count drink result: BAC =", zeroDrinksCount.currentBacPercent, "Alcohol (g) =", zeroDrinksCount.totalPureAlcoholGrams);
assert(zeroDrinksCount.currentBacPercent === 0 && zeroDrinksCount.totalPureAlcoholGrams === 0,
  `Zero count drink MUST result in 0 BAC and 0g alcohol (got ${zeroDrinksCount.currentBacPercent}%, ${zeroDrinksCount.totalPureAlcoholGrams}g)`);

// -------------------------------------------------------------
// Phase 24: Invalid Inputs (Weight, Height, Hours, ABV, Volume)
// -------------------------------------------------------------
console.log("\n--- Phase 24: Invalid Inputs ---");
const zeroWeight = calculateBacCalculator({ ...baseInputs, weightLbs: 0 });
console.log("Zero weight result: Peak BAC =", zeroWeight.peakBacPercent, "Current BAC =", zeroWeight.currentBacPercent);
// Does the result flag isValid = false?
assert((zeroWeight as any).isValid === false, `Zero weight MUST be flagged as invalid (currently isValid = ${(zeroWeight as any).isValid})`);

const negWeight = calculateBacCalculator({ ...baseInputs, weightLbs: -150 });
console.log("Negative weight result: Peak BAC =", negWeight.peakBacPercent);
assert((negWeight as any).isValid === false, `Negative weight MUST be flagged as invalid (currently isValid = ${(negWeight as any).isValid})`);

const negHours = calculateBacCalculator({ ...baseInputs, timeSinceFirstDrinkHours: -5 });
console.log("Negative hours result: Elapsed Hours =", negHours.elapsedHours);
assert((negHours as any).isValid === false, `Negative hours MUST be flagged as invalid (currently isValid = ${(negHours as any).isValid})`);

const negAbvDrink: DrinkEntry = { ...defaultDrink, abvPercent: -10 };
const negAbv = calculateBacCalculator({ ...baseInputs, drinks: [negAbvDrink] });
console.log("Negative ABV result: Alcohol (g) =", negAbv.totalPureAlcoholGrams);
assert((negAbv as any).isValid === false, `Negative ABV MUST be flagged as invalid (currently isValid = ${(negAbv as any).isValid})`);

const over100AbvDrink: DrinkEntry = { ...defaultDrink, abvPercent: 120 };
const over100Abv = calculateBacCalculator({ ...baseInputs, drinks: [over100AbvDrink] });
console.log("Over 100% ABV result: Alcohol (g) =", over100Abv.totalPureAlcoholGrams);
assert((over100Abv as any).isValid === false, `Over 100% ABV MUST be flagged as invalid (currently isValid = ${(over100Abv as any).isValid})`);

// -------------------------------------------------------------
// Phase 10: Elimination Curve & Time Coherence
// -------------------------------------------------------------
console.log("\n--- Phase 10: Elimination Curve Coherence ---");
console.log("Elimination curve points count:", resBenchmark.eliminationCurve.length);
console.log("Point 0:", resBenchmark.eliminationCurve[0]);
console.log("Point 1:", resBenchmark.eliminationCurve[1]);
console.log("Point 2:", resBenchmark.eliminationCurve[2]);
// In resBenchmark, elapsedHours = 2, currentBacPercent = 0.025%.
// Does point 0 on the timeline represent "Now (+0 hr)" or "Session start"?
// If label is "+0 hr", does the user see current BAC or peak BAC?
console.log(`When elapsed time is 2 hours (Current BAC = ${resBenchmark.currentBacPercent}%), Point[0] label '${resBenchmark.eliminationCurve[0].timeLabel}' has BAC: ${resBenchmark.eliminationCurve[0].bacPercent}%`);
assert(resBenchmark.eliminationCurve[0].bacPercent === resBenchmark.currentBacPercent || resBenchmark.eliminationCurve[0].timeLabel.includes("Start"),
  `Timeline Point 0 should accurately represent current time OR clearly indicate session start, not show Peak BAC as '+0 hr'`);

// -------------------------------------------------------------
// Phase 12 & 13: Safety Language in Calculator Logic
// -------------------------------------------------------------
console.log("\n--- Phase 12 & 13: Safety Language Audit in Code ---");
const stage0 = getImpairmentStage(0.000);
console.log("Stage at 0.000% BAC:", stage0.stageName, "| Impairment:", stage0.impairment);
assert(!stage0.impairment.toLowerCase().includes("safe for all normal activities and driving"),
  `Impairment stage must NEVER declare 'Safe for all normal activities and driving'`);

const legalThresholdStatus = resBenchmark.legalThresholds[0].status;
console.log("Legal threshold 0.08% status when BAC is 0.025%:", legalThresholdStatus);
assert(!legalThresholdStatus.toLowerCase().includes("legal to drive"),
  `Threshold status must NEVER declare 'Legal to drive'`);

// -------------------------------------------------------------
// Phase 17 & 18: Seidl vs Watson TBW Models
// -------------------------------------------------------------
console.log("\n--- Phase 17 & 18: Seidl & Watson Models ---");
const resSeidl = calculateBacCalculator({ ...baseInputs, mode: "seidl-anthropometric" });
console.log(`Widmark Peak: ${resBenchmark.peakBacPercent}% | Seidl Peak: ${resSeidl.peakBacPercent}% | Diff: ${(resSeidl.peakBacPercent - resBenchmark.peakBacPercent).toFixed(4)}%`);
assert(resSeidl.peakBacPercent > 0 && resSeidl.peakBacPercent !== resBenchmark.peakBacPercent, `Seidl formula produces anthropometrically differentiated BAC`);

const resWatson = calculateBacCalculator({ ...baseInputs, mode: "watson-tbw" });
console.log(`Widmark Peak: ${resBenchmark.peakBacPercent}% | Watson Peak: ${resWatson.peakBacPercent}% | Diff: ${(resWatson.peakBacPercent - resBenchmark.peakBacPercent).toFixed(4)}%`);
assert(resWatson.peakBacPercent > 0 && resWatson.peakBacPercent !== resBenchmark.peakBacPercent, `Watson TBW formula produces differentiated BAC`);

// -------------------------------------------------------------
// Phase 16: Food / Stomach State
// -------------------------------------------------------------
console.log("\n--- Phase 16: Stomach State Adjustments ---");
const resEmpty = calculateBacCalculator({ ...baseInputs, stomachState: "empty" });
const resFull = calculateBacCalculator({ ...baseInputs, stomachState: "full" });
console.log(`Empty Peak: ${resEmpty.peakBacPercent}% | Light Peak: ${resBenchmark.peakBacPercent}% | Full Peak: ${resFull.peakBacPercent}%`);
assert(resEmpty.peakBacPercent >= resBenchmark.peakBacPercent && resBenchmark.peakBacPercent > resFull.peakBacPercent,
  `Stomach states produce expected peak progression: Empty >= Light > Full`);
assert(resEmpty.peakTimeMinutes < resBenchmark.peakTimeMinutes && resBenchmark.peakTimeMinutes < resFull.peakTimeMinutes,
  `Stomach states produce expected peak timing: Empty (20 min) < Light (30 min) < Full (60 min)`);

// Check if empty stomach creates > 100% pure alcohol
console.log("Empty stomach absorption factor check: raw peak vs adjusted peak");
assert(resEmpty.peakBacPercent <= Number(((resBenchmark.totalPureAlcoholGrams / (74.84274 * 1000 * 0.68)) * 100).toFixed(4)),
  `Absorption factor for empty stomach cannot exceed 100% of consumed ethanol (cannot create ethanol out of thin air)`);

// -------------------------------------------------------------
// Summary
// -------------------------------------------------------------
console.log("\n=================================================");
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("=================================================");
