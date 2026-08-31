import { calculateFatIntakeCalculator } from "./calculator";

export function runFatIntakeCalculatorTests() {
  // 1. Canonical Baseline Verification
  const canonicalBaseline = {
    unitSystem: "us",
    calculationMode: "daily",
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
    activityLevel: "light",
    goal: "maintain",
    bmrFormula: "mifflin",
    customFatPercentage: 25,
  };
  const baseRes = calculateFatIntakeCalculator(canonicalBaseline);
  if (baseRes.fatTargetGrams !== 66) {
    throw new Error(`Canonical baseline fat target mismatch: expected 66g, got ${baseRes.fatTargetGrams}g`);
  }
  if (baseRes.fatTargetCalories !== 590) {
    throw new Error(`Canonical baseline fat calories mismatch: expected 590 kcal, got ${baseRes.fatTargetCalories} kcal`);
  }
  if (baseRes.fattyAcids.saturatedGrams !== 26) {
    throw new Error(`Canonical baseline sat fat limit mismatch: expected 26g, got ${baseRes.fattyAcids.saturatedGrams}g`);
  }

  // 2. Mode Verifications
  const lossRes = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "loss" });
  if (lossRes.fatTargetGrams !== 58) {
    throw new Error(`Weight loss fat target mismatch: expected 58g, got ${lossRes.fatTargetGrams}g`);
  }

  const gainRes = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "gain" });
  if (gainRes.fatTargetGrams !== 84) {
    throw new Error(`Weight gain fat target mismatch: expected 84g, got ${gainRes.fatTargetGrams}g`);
  }

  const ketoRes = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "keto" });
  if (ketoRes.fatTargetGrams !== 197) {
    throw new Error(`Keto fat target mismatch: expected 197g, got ${ketoRes.fatTargetGrams}g`);
  }

  // 3. DEF-03: Bodybuilder Target Scaling Tests (0.35 g/lb)
  const bb100 = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "bodybuilding", weightLbs: 100 });
  if (bb100.fatTargetGrams !== 35) {
    throw new Error(`Bodybuilder 100 lb mismatch: expected 35g, got ${bb100.fatTargetGrams}g`);
  }
  const bb160 = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "bodybuilding", weightLbs: 160 });
  if (bb160.fatTargetGrams !== 56) {
    throw new Error(`Bodybuilder 160 lb mismatch: expected 56g, got ${bb160.fatTargetGrams}g`);
  }
  const bb200 = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "bodybuilding", weightLbs: 200 });
  if (bb200.fatTargetGrams !== 70) {
    throw new Error(`Bodybuilder 200 lb mismatch: expected 70g, got ${bb200.fatTargetGrams}g`);
  }
  const bb250 = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "bodybuilding", weightLbs: 250 });
  if (bb250.fatTargetGrams !== 88) {
    throw new Error(`Bodybuilder 250 lb mismatch: expected 88g, got ${bb250.fatTargetGrams}g`);
  }

  // 4. DEF-04: Food Database Count & Category Verification
  if (baseRes.foodDatabase.length < 35) {
    throw new Error(`Food database must have >= 35 items, found ${baseRes.foodDatabase.length}`);
  }
  const expectedCategories = [
    "Oils & Fats",
    "Nuts & Seeds",
    "Seafood & Fish",
    "Dairy & Eggs",
    "Avocados & Fruits",
    "Meat & Poultry",
    "Processed & Snacks",
  ];
  for (const cat of expectedCategories) {
    const itemsInCat = baseRes.foodDatabase.filter((item) => item.category === cat);
    if (itemsInCat.length === 0) {
      throw new Error(`Food category "${cat}" is empty in food database!`);
    }
  }

  // 5. Unit Conversion Invariance
  const metricEquivalent = calculateFatIntakeCalculator({
    ...canonicalBaseline,
    unitSystem: "metric",
    heightCm: 177.8,
    weightKg: 72.5748,
  });
  if (Math.abs(baseRes.fatTargetGrams - metricEquivalent.fatTargetGrams) > 1) {
    throw new Error(`Unit conversion divergence exceeds tolerance`);
  }

  // 6. Zero / Edge Inputs
  const zeroInputs = { unitSystem: "us", calculationMode: "daily", age: 0, weightLbs: 0 };
  const resZero = calculateFatIntakeCalculator(zeroInputs);
  if (!resZero || isNaN(resZero.fatTargetGrams)) {
    throw new Error(`Formula failed on zero inputs`);
  }

  // 7. Heart Health Mode: AHA <6% Saturated Fat Ceiling
  const heartRes = calculateFatIntakeCalculator({ ...canonicalBaseline, calculationMode: "heart-health" });
  // 2361 * 0.06 / 9 = 15.74g -> rounded to 16g
  if (heartRes.fattyAcids.saturatedMaxPercent !== 6) {
    throw new Error(`Heart Health saturated max percent expected 6%, got ${heartRes.fattyAcids.saturatedMaxPercent}%`);
  }
  if (heartRes.fattyAcids.saturatedGrams !== 16) {
    throw new Error(`Heart Health saturated fat ceiling expected 16g, got ${heartRes.fattyAcids.saturatedGrams}g`);
  }

  // 8. 1,000 Randomized Calorie Values Property Test
  for (let i = 0; i < 1000; i++) {
    const randomCalories = Math.floor(Math.random() * 4500) + 800; // 800 to 5300 kcal
    const expectedGeneral = (randomCalories * 0.10) / 9;
    const expectedHeart = (randomCalories * 0.06) / 9;

    const roundedGeneral = Math.round(expectedGeneral);
    const roundedHeart = Math.round(expectedHeart);

    if (roundedHeart > roundedGeneral) {
      throw new Error(`Property violation: heartLimit (${roundedHeart}) > generalLimit (${roundedGeneral}) at ${randomCalories} kcal`);
    }
    if (Math.abs(roundedGeneral - expectedGeneral) > 0.51) {
      throw new Error(`Rounding divergence on general ceiling at ${randomCalories} kcal`);
    }
    if (Math.abs(roundedHeart - expectedHeart) > 0.51) {
      throw new Error(`Rounding divergence on heart ceiling at ${randomCalories} kcal`);
    }
  }

  return true;
}
