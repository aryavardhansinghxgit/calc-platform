import {
  MacroCalculationResults,
  MacroNutrientOutput,
  BodyCompositionOutput,
  WeightTrajectoryPoint,
  FoodDatabaseItem,
  MacroCalculatorOutputs,
  ActivityLevel,
  BmrFormulaType,
  DietStyleType,
  FitnessGoal,
  MacroCalculationMode,
  UnitSystem,
  Gender,
} from "./types";

export function calculateMacroCalculator(
  inputs: Record<string, any>
): MacroCalculationResults {
  const unitSystem: UnitSystem = inputs.unitSystem === "metric" ? "metric" : "us";
  const mode: MacroCalculationMode = inputs.calculationMode || "standard";
  const age = Math.max(15, Math.min(100, Number(inputs.age) || 25));
  const gender: Gender = inputs.gender === "female" ? "female" : "male";

  // Height & Weight Conversions
  let heightCm = 177.8;
  let weightKg = 74.842741;
  let weightLbs = 165;

  if (unitSystem === "us") {
    const feet = Math.max(0, Number(inputs.heightFeet) || 0);
    const inches = Math.max(0, Number(inputs.heightInches) || 0);
    const totalInches = feet * 12 + inches > 0 ? feet * 12 + inches : 70;
    heightCm = totalInches * 2.54;

    const lbs = Math.max(0, Number(inputs.weightLbs) || 0);
    weightLbs = lbs > 0 ? lbs : 165;
    weightKg = weightLbs * 0.45359237;
  } else {
    heightCm = Math.max(0, Number(inputs.heightCm) || 178);
    weightKg = Math.max(0, Number(inputs.weightKg) || 75);
    weightLbs = parseFloat((weightKg / 0.45359237).toFixed(1));
  }

  // Clamps
  heightCm = Math.max(80, Math.min(250, heightCm));
  weightKg = Math.max(25, Math.min(350, weightKg));

  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  // Body Fat %
  let bodyFatPct = Number(inputs.bodyFat);
  if (isNaN(bodyFatPct) || bodyFatPct <= 0) {
    const genderVal = gender === "male" ? 1 : 0;
    bodyFatPct = parseFloat(Math.max(4, Math.min(60, 1.2 * bmi + 0.23 * age - 10.8 * genderVal - 5.4)).toFixed(1));
  } else {
    bodyFatPct = Math.max(3, Math.min(65, bodyFatPct));
  }

  const lbmKg = weightKg * (1 - bodyFatPct / 100);
  const lbmLbs = parseFloat((weightLbs * (1 - bodyFatPct / 100)).toFixed(1));
  const fatMassLbs = parseFloat((weightLbs - lbmLbs).toFixed(1));

  // BMR Formula Selection
  const formula: BmrFormulaType = inputs.bmrFormula || "mifflin";
  let bmrValue = 0;
  let formulaUsedName = "Mifflin-St Jeor";

  switch (formula) {
    case "katch": {
      bmrValue = 370 + 21.6 * lbmKg;
      formulaUsedName = "Katch-McArdle (LBM Based)";
      break;
    }
    case "cunningham": {
      bmrValue = 500 + 22 * lbmKg;
      formulaUsedName = "Cunningham (Athletic LBM)";
      break;
    }
    case "harris": {
      if (gender === "male") {
        bmrValue = 66.5 + 13.75 * weightKg + 5.003 * heightCm - 6.755 * age;
      } else {
        bmrValue = 655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * age;
      }
      formulaUsedName = "Original Harris-Benedict (1919)";
      break;
    }
    case "revised-harris": {
      if (gender === "male") {
        bmrValue = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
      } else {
        bmrValue = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
      }
      formulaUsedName = "Revised Harris-Benedict (1984)";
      break;
    }
    case "schofield": {
      if (gender === "male") {
        bmrValue = age < 30 ? 15.057 * weightKg + 679 : 11.6 * weightKg + 879;
      } else {
        bmrValue = age < 30 ? 14.7 * weightKg + 496 : 8.7 * weightKg + 829;
      }
      formulaUsedName = "Schofield Equation";
      break;
    }
    case "mifflin":
    default: {
      if (gender === "male") {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
      } else {
        bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
      }
      formulaUsedName = "Mifflin-St Jeor";
      break;
    }
  }

  // Activity Multipliers
  const activityLevel: ActivityLevel = inputs.activityLevel || "moderate";
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very-active": 1.9,
    "extra-active": 2.0,
  };
  const activityMultiplier = multipliers[activityLevel] || 1.55;
  const tdee = Math.round(bmrValue * activityMultiplier);

  // Goal Calorie Target Adjustments
  let goal: FitnessGoal = inputs.goal || "maintain";
  let calorieAdjustment = 0;
  let weeklyWeightDeltaLbs = 0;

  // Sync mode defaults if goal was not specifically overridden
  if (inputs.goal === undefined || inputs.goal === null) {
    if (mode === "cutting") goal = "loss";
    else if (mode === "bulking") goal = "gain";
    else if (mode === "recomp") goal = "recomp";
    else if (mode === "maintenance") goal = "maintain";
  }

  switch (goal) {
    case "mild-loss":
      calorieAdjustment = -250;
      weeklyWeightDeltaLbs = -0.5;
      break;
    case "loss":
      calorieAdjustment = -500;
      weeklyWeightDeltaLbs = -1.0;
      break;
    case "extreme-loss":
      calorieAdjustment = -1000;
      weeklyWeightDeltaLbs = -2.0;
      break;
    case "mild-gain":
      calorieAdjustment = 250;
      weeklyWeightDeltaLbs = 0.5;
      break;
    case "gain":
      calorieAdjustment = 500;
      weeklyWeightDeltaLbs = 1.0;
      break;
    case "extreme-gain":
      calorieAdjustment = 1000;
      weeklyWeightDeltaLbs = 2.0;
      break;
    case "recomp":
      calorieAdjustment = -200;
      weeklyWeightDeltaLbs = -0.3;
      break;
    case "maintain":
    default:
      calorieAdjustment = 0;
      weeklyWeightDeltaLbs = 0;
      break;
  }

  const targetCalories = Math.max(1000, Math.round(tdee + calorieAdjustment));
  const weeklyCalories = targetCalories * 7;

  // Diet Style & Macro Splits
  let dietStyle: DietStyleType = inputs.dietStyle || "balanced";
  let pPct = 30;
  let cPct = 40;
  let fPct = 30;

  // Handle mode-specific diet styles
  if (mode === "keto" || dietStyle === "keto") {
    pPct = 25;
    cPct = 5;
    fPct = 70;
  } else if (mode === "high-protein" || dietStyle === "high-protein") {
    pPct = 45;
    cPct = 35;
    fPct = 20;
  } else if (mode === "recomp") {
    pPct = 35;
    cPct = 40;
    fPct = 25;
  } else if (mode === "athlete" || dietStyle === "athlete") {
    pPct = 25;
    cPct = 55;
    fPct = 20;
  } else if (dietStyle === "low-carb" || (mode === "cutting" && inputs.dietStyle === "low-carb")) {
    pPct = 40;
    cPct = 20;
    fPct = 40;
  } else if (dietStyle === "custom" || mode === "custom") {
    pPct = Number(inputs.customProteinPct) || 30;
    cPct = Number(inputs.customCarbsPct) || 40;
    fPct = Number(inputs.customFatPct) || 30;
  }

  // Grams Calculation: Protein=4 kcal/g, Carbs=4 kcal/g, Fat=9 kcal/g
  const pCal = Math.round((targetCalories * pPct) / 100);
  const cCal = Math.round((targetCalories * cPct) / 100);
  const fCal = Math.round((targetCalories * fPct) / 100);

  const proteinOutput: MacroNutrientOutput = {
    grams: Math.round(pCal / 4),
    calories: pCal,
    percentage: pPct,
  };

  const carbsOutput: MacroNutrientOutput = {
    grams: Math.round(cCal / 4),
    calories: cCal,
    percentage: cPct,
  };

  const fatOutput: MacroNutrientOutput = {
    grams: Math.round(fCal / 9),
    calories: fCal,
    percentage: fPct,
  };

  // Body Composition Metrics
  const ffmi = Number(((lbmKg / (heightM * heightM)) + 6.1 * (1.8 - heightM)).toFixed(1));

  let healthScore = 90;
  if (bmi < 18.5 || bmi > 29.9) healthScore -= 15;
  if (bodyFatPct > 28 || bodyFatPct < 8) healthScore -= 10;
  healthScore = Math.max(40, Math.min(100, healthScore));

  let fitnessRating = "Good Fitness Base";
  if (ffmi >= 22) fitnessRating = "Excellent / Athletic";
  else if (ffmi >= 19) fitnessRating = "Average Healthy";
  else fitnessRating = "Below Average Muscle Mass";

  const bodyComposition: BodyCompositionOutput = {
    leanBodyMassLbs: Math.round(lbmLbs),
    fatMassLbs: Math.round(fatMassLbs),
    bodyFatPct,
    ffmi,
    bmi,
    healthScore,
    fitnessRating,
  };

  // 12-Week Weight Trajectory
  const weightTrajectory: WeightTrajectoryPoint[] = [];
  for (let w = 0; w <= 12; w++) {
    const estLbs = Math.max(30, weightLbs + weeklyWeightDeltaLbs * w);
    weightTrajectory.push({
      week: w,
      weekLabel: `Wk ${w}`,
      estimatedWeightLbs: Number(estLbs.toFixed(1)),
      estimatedWeightKg: Number((estLbs * 0.45359237).toFixed(1)),
    });
  }

  // 40+ Food Database Array
  const foodDatabase: FoodDatabaseItem[] = [
    { id: "f1", name: "Apple", category: "Fruits", servingSize: "1 (4 oz.)", protein: 0.27, carbs: 14.36, fat: 0.18, calories: 59 },
    { id: "f2", name: "Banana", category: "Fruits", servingSize: "1 (6 oz.)", protein: 1.85, carbs: 38.85, fat: 0.56, calories: 168 },
    { id: "f3", name: "Grapes", category: "Fruits", servingSize: "1 cup", protein: 1.15, carbs: 28.96, fat: 0.26, calories: 110 },
    { id: "f4", name: "Orange", category: "Fruits", servingSize: "1 (4 oz.)", protein: 0.79, carbs: 11.79, fat: 0.23, calories: 52 },
    { id: "f5", name: "Pear", category: "Fruits", servingSize: "1 (5 oz.)", protein: 0.54, carbs: 21.91, fat: 0.17, calories: 91 },
    { id: "f6", name: "Watermelon", category: "Fruits", servingSize: "1 cup", protein: 0.93, carbs: 11.48, fat: 0.23, calories: 46 },

    { id: "v1", name: "Asparagus", category: "Vegetables", servingSize: "1 cup", protein: 2.95, carbs: 5.2, fat: 0.16, calories: 27 },
    { id: "v2", name: "Broccoli", category: "Vegetables", servingSize: "1 cup", protein: 2.57, carbs: 6.04, fat: 0.34, calories: 31 },
    { id: "v3", name: "Carrots", category: "Vegetables", servingSize: "1 cup", protein: 1.19, carbs: 12.26, fat: 0.31, calories: 52 },
    { id: "v4", name: "Cucumber", category: "Vegetables", servingSize: "4 oz.", protein: 0.67, carbs: 2.45, fat: 0.18, calories: 14 },
    { id: "v5", name: "Tomato", category: "Vegetables", servingSize: "1 cup", protein: 1.58, carbs: 7.06, fat: 0.36, calories: 38 },

    { id: "p1", name: "Beef regular, cooked", category: "Proteins", servingSize: "2 oz.", protein: 14.2, carbs: 0, fat: 10.4, calories: 151 },
    { id: "p2", name: "Chicken breast, cooked", category: "Proteins", servingSize: "2 oz.", protein: 16.0, carbs: 0, fat: 1.84, calories: 82 },
    { id: "p3", name: "Tofu", category: "Proteins", servingSize: "4 oz.", protein: 7.82, carbs: 2.72, fat: 3.06, calories: 68 },
    { id: "p4", name: "Egg", category: "Proteins", servingSize: "1 large", protein: 6.29, carbs: 0.38, fat: 4.97, calories: 72 },
    { id: "p5", name: "Catfish fillet", category: "Proteins", servingSize: "2 oz.", protein: 9.96, carbs: 4.84, fat: 8.24, calories: 133 },
    { id: "p6", name: "Pork, cooked", category: "Proteins", servingSize: "2 oz.", protein: 15.82, carbs: 0, fat: 8.26, calories: 138 },
    { id: "p7", name: "Shrimp, cooked", category: "Proteins", servingSize: "2 oz.", protein: 15.45, carbs: 0.69, fat: 1.32, calories: 76 },

    { id: "m1", name: "Bread, white", category: "Meals & Snacks", servingSize: "1 slice", protein: 1.91, carbs: 12.65, fat: 0.82, calories: 66 },
    { id: "m2", name: "Cheeseburger", category: "Meals & Snacks", servingSize: "1 sandwich", protein: 14.77, carbs: 31.75, fat: 15.15, calories: 323 },
    { id: "m3", name: "Hamburger", category: "Meals & Snacks", servingSize: "1 sandwich", protein: 14.61, carbs: 26.81, fat: 10.97, calories: 265 },
    { id: "m4", name: "Pizza slice (14\")", category: "Meals & Snacks", servingSize: "1 slice", protein: 13.32, carbs: 33.98, fat: 12.13, calories: 298 },
    { id: "m5", name: "White Rice, cooked", category: "Meals & Snacks", servingSize: "1 cup", protein: 4.2, carbs: 44.08, fat: 0.44, calories: 205 },
    { id: "m6", name: "Subway Turkey Sandwich", category: "Meals & Snacks", servingSize: "6 inch", protein: 18.0, carbs: 46.0, fat: 3.5, calories: 280 },

    { id: "d1", name: "Milk (1%)", category: "Dairy & Beverages", servingSize: "1 cup", protein: 8.22, carbs: 12.18, fat: 2.37, calories: 102 },
    { id: "d2", name: "Milk (Whole)", category: "Dairy & Beverages", servingSize: "1 cup", protein: 7.86, carbs: 11.03, fat: 7.93, calories: 149 },
    { id: "d3", name: "Yogurt (non-fat)", category: "Dairy & Beverages", servingSize: "1 cup", protein: 13.01, carbs: 17.43, fat: 0.41, calories: 126 },
    { id: "d4", name: "Orange Juice", category: "Dairy & Beverages", servingSize: "1 cup", protein: 1.74, carbs: 25.79, fat: 0.5, calories: 112 },
  ];

  // Smart Insights & Recommendations
  const insights: string[] = [
    `Your estimated daily TDEE is ${tdee} kcal calculated via ${formulaUsedName}.`,
    `For your goal (${goal}), your recommended daily energy target is ${targetCalories} kcal.`,
    `Your daily protein target is ${proteinOutput.grams}g (${proteinOutput.calories} kcal, ${pPct}% of total energy).`,
  ];

  if (goal.includes("loss")) {
    insights.push(`Consuming ${proteinOutput.grams}g of protein daily preserves lean muscle mass during your calorie deficit.`);
  } else if (goal.includes("gain")) {
    insights.push(`A surplus of ${calorieAdjustment} kcal/day supports optimal muscle hypertrophy when combined with resistance training.`);
  }

  const recommendations: string[] = [
    `Divide your daily macro target of ${proteinOutput.grams}g protein into 3 to 5 meals spaced 3 to 4 hours apart.`,
    `Prioritize high-quality protein sources: chicken breast, egg whites, lean beef, fish, tofu, and non-fat Greek yogurt.`,
    `Track your body weight weekly under identical conditions (morning, fasted) to evaluate trend lines.`,
    `Drink adequate water (3 to 4 liters daily) to support nutrient transport and hydration.`,
  ];

  return {
    mode,
    unitSystem,
    bmr: Math.round(bmrValue),
    rmr: Math.round(bmrValue * 1.05),
    tdee,
    targetCalories,
    weeklyCalories,
    formulaUsed: formulaUsedName,
    protein: proteinOutput,
    carbs: carbsOutput,
    fat: fatOutput,
    bodyComposition,
    weightTrajectory,
    foodDatabase,
    insights,
    recommendations,
  };
}

export function calculateMacroOutputs(inputs: Record<string, any>): MacroCalculatorOutputs {
  const res = calculateMacroCalculator(inputs);
  return {
    targetCalories: res.targetCalories,
    bmr: res.bmr,
    tdee: res.tdee,
    proteinGrams: res.protein.grams,
    carbsGrams: res.carbs.grams,
    fatGrams: res.fat.grams,
    healthScore: res.bodyComposition.healthScore,
  };
}

export default calculateMacroCalculator;
