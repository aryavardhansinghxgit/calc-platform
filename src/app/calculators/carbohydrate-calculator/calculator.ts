import {
  CarbCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  CarbohydrateCalculationResults,
  CarbCyclingDay,
  FoodGiDatabaseItem,
  CarbohydrateCalculatorOutputs,
  SelectedFoodMetrics,
} from "./types";

export function calculateCarbohydrateCalculator(
  inputs: Record<string, any>
): CarbohydrateCalculationResults {
  const unitSystem: UnitSystem = inputs.unitSystem || "us";
  const mode: CarbCalculationMode = inputs.calculationMode || "daily";
  const age = Number(inputs.age) || 25;
  const gender: Gender = inputs.gender || "male";

  // Height & Weight Conversions
  let heightCm = 175;
  let weightKg = 75;
  let weightLbs = 160;

  if (unitSystem === "us") {
    const feet = Number(inputs.heightFeet) || 5;
    const inches = Number(inputs.heightInches) || 10;
    const totalInches = feet * 12 + inches;
    heightCm = totalInches * 2.54;

    weightLbs = Number(inputs.weightLbs) || 160;
    weightKg = weightLbs / 2.20462;
  } else {
    heightCm = Number(inputs.heightCm) || 175;
    weightKg = Number(inputs.weightKg) || 75;
    weightLbs = weightKg * 2.20462;
  }

  const bodyFatPct = Number(inputs.bodyFat) || 20;
  const lbmKg = weightKg * (1 - bodyFatPct / 100);
  const lbmLbs = lbmKg * 2.20462;
  const fatMassLbs = weightLbs - lbmLbs;

  // BMR Formula Selection
  const formula: BmrFormulaType = inputs.bmrFormula || "mifflin";
  let bmr = 0;
  let formulaUsedName = "Mifflin-St Jeor";

  switch (formula) {
    case "katch": {
      bmr = 370 + 21.6 * lbmKg;
      formulaUsedName = "Katch-McArdle (LBM Based)";
      break;
    }
    case "harris": {
      if (gender === "male") {
        bmr = 66.5 + 13.75 * weightKg + 5.003 * heightCm - 6.755 * age;
      } else {
        bmr = 655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * age;
      }
      formulaUsedName = "Original Harris-Benedict";
      break;
    }
    case "revised-harris": {
      if (gender === "male") {
        bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
      } else {
        bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
      }
      formulaUsedName = "Revised Harris-Benedict";
      break;
    }
    case "cunningham": {
      bmr = 500 + 22 * lbmKg;
      formulaUsedName = "Cunningham (Athletic LBM)";
      break;
    }
    case "mifflin":
    default: {
      if (gender === "male") {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }
      formulaUsedName = "Mifflin-St Jeor (Standard)";
      break;
    }
  }

  // Activity Multiplier
  const activityLevel: ActivityLevel = inputs.activityLevel || "light";
  let activityMultiplier = 1.375;
  switch (activityLevel) {
    case "sedentary":
      activityMultiplier = 1.2;
      break;
    case "light":
      activityMultiplier = 1.375;
      break;
    case "moderate":
      activityMultiplier = 1.55;
      break;
    case "active":
      activityMultiplier = 1.725;
      break;
    case "very-active":
      activityMultiplier = 1.9;
      break;
  }

  const tdee = Math.round(bmr * activityMultiplier);

  // Goal Calorie Target Adjustments
  const goal: FitnessGoal = inputs.goal || "maintain";
  let calorieAdjustment = 0;
  switch (goal) {
    case "mild-loss":
      calorieAdjustment = -250;
      break;
    case "loss":
      calorieAdjustment = -500;
      break;
    case "extreme-loss":
      calorieAdjustment = -1000;
      break;
    case "mild-gain":
      calorieAdjustment = 250;
      break;
    case "gain":
      calorieAdjustment = 500;
      break;
    case "extreme-gain":
      calorieAdjustment = 1000;
      break;
    case "recomp":
      calorieAdjustment = -200;
      break;
    case "maintain":
    default:
      calorieAdjustment = 0;
      break;
  }

  const targetCalories = Math.max(1200, Math.round(tdee + calorieAdjustment));

  // Carbohydrate Percentage & Gram Targets
  let carbPct = 50;
  let minRangePct = 45;
  let maxRangePct = 65;

  if (mode === "weight-loss") {
    carbPct = 35;
    minRangePct = 30;
    maxRangePct = 40;
  } else if (mode === "weight-gain") {
    carbPct = 55;
    minRangePct = 50;
    maxRangePct = 60;
  } else if (mode === "athlete") {
    carbPct = 55;
    minRangePct = 50;
    maxRangePct = 65;
  } else if (mode === "endurance") {
    carbPct = 65;
    minRangePct = 60;
    maxRangePct = 70;
  } else if (mode === "low-carb") {
    carbPct = 20;
    minRangePct = 15;
    maxRangePct = 25;
  } else if (mode === "moderate-carb") {
    carbPct = 45;
    minRangePct = 40;
    maxRangePct = 50;
  } else if (mode === "high-carb") {
    carbPct = 65;
    minRangePct = 60;
    maxRangePct = 70;
  } else if (mode === "custom") {
    carbPct = Number(inputs.customCarbPct) || 50;
    minRangePct = Math.max(10, carbPct - 5);
    maxRangePct = Math.min(80, carbPct + 5);
  }

  const totalCarbCalories = Math.round((targetCalories * carbPct) / 100);
  const totalCarbGrams = Math.round(totalCarbCalories / 4);
  const targetCarbRangeMin = Math.round(((targetCalories * minRangePct) / 100) / 4);
  const targetCarbRangeMax = Math.round(((targetCalories * maxRangePct) / 100) / 4);

  // Fiber & Net Carbs
  const defaultFiber = Math.max(25, Math.round((targetCalories / 1000) * 14));
  const fiberGrams =
    inputs.dailyFiberGrams !== undefined && inputs.dailyFiberGrams !== null && inputs.dailyFiberGrams !== ""
      ? Number(inputs.dailyFiberGrams)
      : inputs.dailyFiber !== undefined && inputs.dailyFiber !== null && inputs.dailyFiber !== ""
      ? Number(inputs.dailyFiber)
      : defaultFiber;
  const sugarAlcoholsGrams =
    inputs.sugarAlcoholsGrams !== undefined && inputs.sugarAlcoholsGrams !== null && inputs.sugarAlcoholsGrams !== ""
      ? Number(inputs.sugarAlcoholsGrams)
      : inputs.sugarAlcohols !== undefined && inputs.sugarAlcohols !== null && inputs.sugarAlcohols !== ""
      ? Number(inputs.sugarAlcohols)
      : 0;
  const netCarbGrams = Math.max(0, totalCarbGrams - fiberGrams - sugarAlcoholsGrams);

  // 12 Food GI Database Items (Authoritative Reference Set)
  const foodGiDatabase: FoodGiDatabaseItem[] = [
    { id: "c1", name: "Apple", category: "Fruits", servingSize: "1 medium (150g)", totalCarbs: 19.1, fiber: 3.3, netCarbs: 15.8, calories: 77, gi: 36, giCategory: "Low", gl: 6 },
    { id: "c2", name: "Banana", category: "Fruits", servingSize: "1 medium (118g)", totalCarbs: 27.0, fiber: 3.1, netCarbs: 23.9, calories: 105, gi: 51, giCategory: "Low", gl: 12 },
    { id: "c3", name: "Orange", category: "Fruits", servingSize: "1 medium (131g)", totalCarbs: 15.4, fiber: 3.1, netCarbs: 12.3, calories: 62, gi: 43, giCategory: "Low", gl: 5 },
    { id: "c4", name: "Strawberries", category: "Fruits", servingSize: "1 cup (150g)", totalCarbs: 11.7, fiber: 3.0, netCarbs: 8.7, calories: 49, gi: 41, giCategory: "Low", gl: 4 },

    { id: "c5", name: "Oats (Rolled)", category: "Whole Grains", servingSize: "1 cup cooked (234g)", totalCarbs: 28.1, fiber: 4.0, netCarbs: 24.1, calories: 166, gi: 55, giCategory: "Low", gl: 13 },
    { id: "c6", name: "Brown Rice", category: "Whole Grains", servingSize: "1 cup cooked (195g)", totalCarbs: 44.8, fiber: 3.5, netCarbs: 41.3, calories: 216, gi: 68, giCategory: "Medium", gl: 28 },
    { id: "c7", name: "Quinoa", category: "Whole Grains", servingSize: "1 cup cooked (185g)", totalCarbs: 39.4, fiber: 5.2, netCarbs: 34.2, calories: 222, gi: 53, giCategory: "Low", gl: 18 },
    { id: "c8", name: "Sweet Potato", category: "Vegetables", servingSize: "1 medium baked (114g)", totalCarbs: 23.6, fiber: 3.8, netCarbs: 19.8, calories: 103, gi: 63, giCategory: "Medium", gl: 12 },

    { id: "c9", name: "Black Beans", category: "Legumes", servingSize: "1 cup cooked (172g)", totalCarbs: 40.8, fiber: 15.0, netCarbs: 25.8, calories: 227, gi: 30, giCategory: "Low", gl: 8 },
    { id: "c10", name: "Lentils", category: "Legumes", servingSize: "1 cup cooked (198g)", totalCarbs: 39.9, fiber: 15.6, netCarbs: 24.3, calories: 230, gi: 32, giCategory: "Low", gl: 8 },
    { id: "c11", name: "White Bread", category: "Snacks & Beverages", servingSize: "2 slices (50g)", totalCarbs: 24.0, fiber: 1.2, netCarbs: 22.8, calories: 132, gi: 75, giCategory: "High", gl: 17 },
    { id: "c12", name: "Coca-Cola", category: "Snacks & Beverages", servingSize: "12 oz (355ml)", totalCarbs: 39.0, fiber: 0.0, netCarbs: 39.0, calories: 140, gi: 63, giCategory: "Medium", gl: 25 },
  ];

  // Selected Food & Serving Glycemic Load Calculation
  // GI/GL is food- and serving-specific, NOT a universal daily target metric.
  const rawFoodId = inputs.selectedFoodId ? String(inputs.selectedFoodId).trim() : null;
  const selectedFoodItem = rawFoodId
    ? foodGiDatabase.find(
        (f) => f.id.toLowerCase() === rawFoodId.toLowerCase() || f.name.toLowerCase() === rawFoodId.toLowerCase()
      ) || null
    : null;

  const servingCount =
    inputs.servingCount !== undefined && inputs.servingCount !== null && Number(inputs.servingCount) > 0
      ? Number(inputs.servingCount)
      : 1;

  let glycemicLoad: number | null = null;
  let glycemicRating = "N/A (food serving not selected)";
  let selectedFood: SelectedFoodMetrics | null = null;

  if (selectedFoodItem) {
    const netCarbs = parseFloat((selectedFoodItem.netCarbs * servingCount).toFixed(1));
    const gl = Math.round((selectedFoodItem.gi * netCarbs) / 100);
    let glCategory = "Low";
    if (gl >= 20) glCategory = "High";
    else if (gl >= 11) glCategory = "Medium";

    glycemicLoad = gl;
    glycemicRating = `${glCategory} (${selectedFoodItem.name})`;
    selectedFood = {
      id: selectedFoodItem.id,
      name: selectedFoodItem.name,
      category: selectedFoodItem.category,
      servingSize: selectedFoodItem.servingSize,
      servingCount,
      totalCarbs: parseFloat((selectedFoodItem.totalCarbs * servingCount).toFixed(1)),
      fiber: parseFloat((selectedFoodItem.fiber * servingCount).toFixed(1)),
      netCarbs,
      gi: selectedFoodItem.gi,
      giCategory: selectedFoodItem.giCategory,
      gl,
      glCategory,
    };
  }

  // Protein & Fat Splits
  const proteinPct = mode === "low-carb" || mode === "weight-loss" ? 35 : 25;
  const fatPct = 100 - carbPct - proteinPct;

  const proteinOutput = {
    grams: Math.round(((targetCalories * proteinPct) / 100) / 4),
    calories: Math.round((targetCalories * proteinPct) / 100),
    percentage: proteinPct,
  };

  const fatOutput = {
    grams: Math.round(((targetCalories * fatPct) / 100) / 9),
    calories: Math.round((targetCalories * fatPct) / 100),
    percentage: fatPct,
  };

  // Body Composition
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  const ffmi = Number(((lbmKg / (heightM * heightM)) + 6.1 * (1.8 - heightM)).toFixed(1));

  let healthScore = 92;
  if (bmi < 18.5 || bmi > 29.9) healthScore -= 12;
  healthScore = Math.max(40, Math.min(100, healthScore));

  // 7-Day Carb Cycling Schedule Generator
  const carbCyclingSchedule: CarbCyclingDay[] = [
    { day: "Monday", level: "High Carb", calories: Math.round(targetCalories * 1.1), carbs: Math.round(totalCarbGrams * 1.25), protein: proteinOutput.grams, fat: Math.round(fatOutput.grams * 0.85) },
    { day: "Tuesday", level: "Medium Carb", calories: targetCalories, carbs: totalCarbGrams, protein: proteinOutput.grams, fat: fatOutput.grams },
    { day: "Wednesday", level: "Low Carb", calories: Math.round(targetCalories * 0.85), carbs: Math.round(totalCarbGrams * 0.6), protein: Math.round(proteinOutput.grams * 1.15), fat: Math.round(fatOutput.grams * 1.2) },
    { day: "Thursday", level: "High Carb", calories: Math.round(targetCalories * 1.1), carbs: Math.round(totalCarbGrams * 1.25), protein: proteinOutput.grams, fat: Math.round(fatOutput.grams * 0.85) },
    { day: "Friday", level: "Medium Carb", calories: targetCalories, carbs: totalCarbGrams, protein: proteinOutput.grams, fat: fatOutput.grams },
    { day: "Saturday", level: "High Carb", calories: Math.round(targetCalories * 1.1), carbs: Math.round(totalCarbGrams * 1.25), protein: proteinOutput.grams, fat: Math.round(fatOutput.grams * 0.85) },
    { day: "Sunday", level: "Low Carb", calories: Math.round(targetCalories * 0.85), carbs: Math.round(totalCarbGrams * 0.6), protein: Math.round(proteinOutput.grams * 1.15), fat: Math.round(fatOutput.grams * 1.2) },
  ];

  // Smart Insights & Recommendations
  const insights: string[] = [
    `Your target daily energy intake is ${targetCalories} kcal calculated via ${formulaUsedName}.`,
    `Recommended daily carbohydrate intake: ${totalCarbGrams}g (${totalCarbCalories} kcal, ${carbPct}% of total calories).`,
    `Estimated Net Carbs: ${netCarbGrams}g after subtracting ${fiberGrams}g of dietary fiber.`,
    selectedFood
      ? `Selected Food Glycemic Load: ${selectedFood.gl} (${selectedFood.glCategory}) for ${selectedFood.name} (${selectedFood.servingCount} × ${selectedFood.servingSize}).`
      : `Glycemic Load: Not calculated — select a food and serving in the food database.`,
  ];

  const recommendations: string[] = [
    `Consume at least 25–38g of dietary fiber daily from complex carbohydrates (oats, legumes, berries, whole grains).`,
    `Prioritize low to medium Glycemic Index (GI ≤ 55) foods to maintain stable blood glucose and insulin levels.`,
    `If training intensely, align high-carbohydrate meals around your pre-workout and post-workout timing windows.`,
    `Track Net Carbs (Total Carbs minus Fiber) for precise metabolic energy management.`,
  ];

  return {
    mode,
    unitSystem,
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    formulaUsed: formulaUsedName,

    totalCarbGrams,
    totalCarbCalories,
    carbPercentage: carbPct,
    fiberGrams,
    sugarAlcoholsGrams,
    netCarbGrams,
    targetCarbRangeMin,
    targetCarbRangeMax,
    glycemicLoad,
    glycemicRating,
    selectedFood,

    protein: proteinOutput,
    fat: fatOutput,

    bodyComposition: {
      leanBodyMassLbs: Math.round(lbmLbs),
      fatMassLbs: Math.round(fatMassLbs),
      bodyFatPct,
      ffmi,
      bmi,
      healthScore,
    },

    carbCyclingSchedule,
    foodGiDatabase,
    insights,
    recommendations,
  };
}

export function calculateCarbohydrateOutputs(inputs: Record<string, any>): CarbohydrateCalculatorOutputs {
  const res = calculateCarbohydrateCalculator(inputs);
  return {
    targetCalories: res.targetCalories,
    totalCarbGrams: res.totalCarbGrams,
    netCarbGrams: res.netCarbGrams,
    glycemicLoad: res.glycemicLoad,
    tdee: res.tdee,
    bmr: res.bmr,
    selectedFood: res.selectedFood,
  };
}
