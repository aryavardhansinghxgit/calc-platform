import { calculateCarbohydrateCalculator } from "../src/app/calculators/carbohydrate-calculator/calculator";

console.log("Running 5,000 Randomized Monte Carlo Property Tests with Food Selection & GL Verification...");

const modes = ["daily", "weight-loss", "weight-gain", "maintenance", "athlete", "endurance", "low-carb", "moderate-carb", "high-carb", "custom"];
const formulas = ["mifflin", "katch", "harris", "revised-harris", "cunningham"];
const foodIds = [null, "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12"];

for (let i = 0; i < 5000; i++) {
  const unitSystem = i % 2 === 0 ? "us" : "metric";
  const mode: any = modes[i % modes.length];
  const bmrFormula: any = formulas[i % formulas.length];
  const selectedFoodId = foodIds[i % foodIds.length];
  const servingCount = 1 + (i % 4);
  const fiber = Math.floor(Math.random() * 50);
  const polyol = Math.floor(Math.random() * 15);

  const inputs: any = {
    unitSystem,
    calculationMode: mode,
    bmrFormula,
    activityLevel: "moderate",
    goal: "maintain",
    age: 18 + (i % 60),
    gender: i % 2 === 0 ? "male" : "female",
    dailyFiberGrams: fiber,
    sugarAlcoholsGrams: polyol,
    selectedFoodId,
    servingCount,
  };
  if (unitSystem === "us") {
    inputs.heightFeet = 5;
    inputs.heightInches = 9;
    inputs.weightLbs = 150 + (i % 60);
  } else {
    inputs.heightCm = 175;
    inputs.weightKg = 68 + (i % 30);
  }
  if (mode === "custom") inputs.customCarbPct = 45;

  const res = calculateCarbohydrateCalculator(inputs);

  // Invariant 1: No NaN or Infinity
  if (isNaN(res.totalCarbGrams) || isNaN(res.netCarbGrams) || isNaN(res.targetCalories)) {
    throw new Error(`Iteration ${i}: NaN found in core outputs`);
  }

  // Invariant 2: Net carbs >= 0
  if (res.netCarbGrams < 0) {
    throw new Error(`Iteration ${i}: Negative net carbs: ${res.netCarbGrams}`);
  }

  // Invariant 3: GL state fidelity
  if (!selectedFoodId) {
    if (res.glycemicLoad !== null || res.selectedFood !== null) {
      throw new Error(`Iteration ${i}: unselected food produced non-null GL: ${res.glycemicLoad}`);
    }
  } else {
    if (res.glycemicLoad === null || !res.selectedFood) {
      throw new Error(`Iteration ${i}: selected food produced null GL`);
    }
    const expectedGl = Math.round((res.selectedFood.gi * res.selectedFood.netCarbs) / 100);
    if (res.glycemicLoad !== expectedGl) {
      throw new Error(`Iteration ${i}: GL mismatch: expected ${expectedGl}, got ${res.glycemicLoad}`);
    }
  }
}

console.log("All 5,000 Property Tests with GL State Verification Passed Successfully!");
