import { calculateCarbohydrateCalculator } from "./calculator";

export function runCarbohydrateCalculatorTests() {
  const defaultInputs = {
  "dailyCalories": 2000,
  "activityLevel": "moderate"
};
  const res1 = calculateCarbohydrateCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dailyCalories": 0,
  "activityLevel": 0
};
  const res2 = calculateCarbohydrateCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dailyCalories": -50,
  "activityLevel": -50
};
  const res3 = calculateCarbohydrateCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dailyCalories": null,
  "activityLevel": null
};
  const res4 = calculateCarbohydrateCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  // Canonical Baseline Test: 25yo Male, 5'10", 160 lb, Light Active, Maintenance
  const baselineInputs = {
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
    dailyFiber: 28,
    sugarAlcohols: 0,
  };
  const baselineRes = calculateCarbohydrateCalculator(baselineInputs);
  if (baselineRes.tdee !== 2361) {
    throw new Error(`Baseline TDEE mismatch: expected 2361, got ${baselineRes.tdee}`);
  }
  if (baselineRes.targetCalories !== 2361) {
    throw new Error(`Baseline targetCalories mismatch: expected 2361, got ${baselineRes.targetCalories}`);
  }
  if (baselineRes.totalCarbGrams !== 295) {
    throw new Error(`Baseline totalCarbGrams mismatch: expected 295, got ${baselineRes.totalCarbGrams}`);
  }
  if (baselineRes.netCarbGrams !== 267) {
    throw new Error(`Baseline netCarbGrams mismatch: expected 267, got ${baselineRes.netCarbGrams}`);
  }

  // Regression Test 1: No selected food => no numeric GI/GL
  if (baselineRes.glycemicLoad !== null) {
    throw new Error(`Expected null glycemicLoad for unselected food, got ${baselineRes.glycemicLoad}`);
  }
  if (baselineRes.glycemicRating !== "N/A (food serving not selected)") {
    throw new Error(`Expected 'N/A (food serving not selected)' glycemicRating, got ${baselineRes.glycemicRating}`);
  }
  if (baselineRes.selectedFood !== null) {
    throw new Error(`Expected null selectedFood when no food selected`);
  }

  // Regression Test 2: Selected Food A (Apple, 1 serving) => GL = 36 * 15.8 / 100 ≈ 6 (Low)
  const appleRes = calculateCarbohydrateCalculator({
    ...baselineInputs,
    selectedFoodId: "c1",
    servingCount: 1,
  });
  if (appleRes.glycemicLoad !== 6) {
    throw new Error(`Apple GL mismatch: expected 6, got ${appleRes.glycemicLoad}`);
  }
  if (!appleRes.selectedFood || appleRes.selectedFood.name !== "Apple" || appleRes.selectedFood.gl !== 6) {
    throw new Error(`Apple selectedFood object mismatch: ${JSON.stringify(appleRes.selectedFood)}`);
  }

  // Regression Test 3: Selected Food A with 2 servings => GL = 36 * 31.6 / 100 ≈ 11 (Medium)
  const apple2Res = calculateCarbohydrateCalculator({
    ...baselineInputs,
    selectedFoodId: "c1",
    servingCount: 2,
  });
  if (apple2Res.glycemicLoad !== 11) {
    throw new Error(`Apple 2 servings GL mismatch: expected 11, got ${apple2Res.glycemicLoad}`);
  }

  // Regression Test 4: Switching Food A -> Food B (Coca-Cola) => GL = 25 (High), no stale Apple data
  const cokeRes = calculateCarbohydrateCalculator({
    ...baselineInputs,
    selectedFoodId: "c12",
    servingCount: 1,
  });
  if (cokeRes.glycemicLoad !== 25) {
    throw new Error(`Coca-Cola GL mismatch: expected 25, got ${cokeRes.glycemicLoad}`);
  }
  if (!cokeRes.selectedFood || cokeRes.selectedFood.name !== "Coca-Cola" || cokeRes.selectedFood.gl !== 25) {
    throw new Error(`Coca-Cola selectedFood mismatch: ${JSON.stringify(cokeRes.selectedFood)}`);
  }

  // Regression Test 5: Clearing food selection => reverts cleanly to null GL
  const clearedRes = calculateCarbohydrateCalculator({
    ...baselineInputs,
    selectedFoodId: null,
  });
  if (clearedRes.glycemicLoad !== null || clearedRes.selectedFood !== null) {
    throw new Error(`Clearing food failed to reset GL to null`);
  }

  return true;
}
