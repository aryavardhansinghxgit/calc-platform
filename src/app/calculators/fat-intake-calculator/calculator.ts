import {
  FatCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  KetoTypeOption,
  FatCalculationResults,
  HealthyFatFoodItem,
  FatCalculatorOutputs,
} from "./types";

export function calculateFatIntakeCalculator(
  inputs: Record<string, any>
): FatCalculationResults {
  const unitSystem: UnitSystem = inputs.unitSystem || "us";
  const mode: FatCalculationMode = inputs.calculationMode || "daily";
  const age = Number(inputs.age) || 25;
  const gender: Gender = inputs.gender || "male";

  // Height & Weight Conversions
  let heightCm = 175;
  let weightKg = 72;
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
    weightKg = Number(inputs.weightKg) || 72;
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

  // Activity Multipliers
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

  // Goal Calorie Adjustments
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

  // Mode-Based Fat Percentage Allocation
  let fatPct = 25;
  const ketoType: KetoTypeOption = inputs.ketoType || "skd";

  let fatTargetCalories = 0;
  let fatTargetGrams = 0;

  if (mode === "loss") {
    fatPct = 22;
  } else if (mode === "gain") {
    fatPct = 32;
  } else if (mode === "maintenance") {
    fatPct = 28;
  } else if (mode === "athlete") {
    fatPct = 22;
  } else if (mode === "heart-health") {
    fatPct = 25;
  } else if (mode === "keto") {
    fatPct = ketoType === "hpkd" ? 60 : 75;
  } else if (mode === "low-fat") {
    fatPct = 18;
  } else if (mode === "bodybuilding") {
    // Evidence-informed bodybuilder planning target: 0.35g per pound of body weight
    const bbGrams = Math.round(weightLbs * 0.35);
    fatTargetGrams = bbGrams;
    fatTargetCalories = fatTargetGrams * 9;
    fatPct = Number(((fatTargetCalories / targetCalories) * 100).toFixed(1));
  } else if (mode === "custom") {
    fatPct = Math.max(0, Math.min(100, Number(inputs.customFatPercentage) || 25));
  }

  // Calculate Fat Grams & Calories (9 kcal/g) if not set by bodybuilding mode
  if (mode !== "bodybuilding") {
    fatTargetCalories = Math.round((targetCalories * fatPct) / 100);
    fatTargetGrams = Math.round(fatTargetCalories / 9);
  }

  // Evidence-informed fat intake planning floor (~0.3g fat per lb body weight)
  const hormoneSafetyMinGrams = Math.round(weightLbs * 0.3);
  if (fatTargetGrams < hormoneSafetyMinGrams && mode !== "low-fat" && mode !== "custom") {
    fatTargetGrams = hormoneSafetyMinGrams;
    fatTargetCalories = fatTargetGrams * 9;
    fatPct = Number(((fatTargetCalories / targetCalories) * 100).toFixed(1));
  }

  // Fat Ranges (AMDR 20% to 35%)
  const fatRangeMin = Math.round((targetCalories * 0.2) / 9);
  const fatRangeRecommended = Math.round((targetCalories * 0.28) / 9);
  const fatRangeMax = Math.round((targetCalories * 0.35) / 9);

  // Fat Sub-Type Breakdown Engine
  let saturatedMaxPercent = 10;
  if (mode === "heart-health") {
    saturatedMaxPercent = 6; // American Heart Association recommendation: <6% of total calories
  }

  const saturatedGrams = Math.round((targetCalories * (saturatedMaxPercent / 100)) / 9);
  const mufaGrams = Math.round(fatTargetGrams * 0.55); // 55% Monounsaturated
  const pufaGrams = Math.round(fatTargetGrams * 0.25); // 25% Polyunsaturated

  const omega3Grams = gender === "male" ? 1.6 : 1.1;
  const omega6Grams = gender === "male" ? 17.0 : 12.0;
  const omegaRatio = Number((omega6Grams / omega3Grams).toFixed(1));

  const transFatLimitGrams = 0; // Minimize/eliminate trans fats
  const cholesterolLimitMg = mode === "heart-health" ? 200 : 300;

  // Remaining Calories Allocation (Protein & Carbs)
  const remainingCalories = Math.max(0, targetCalories - fatTargetCalories);
  let proteinPct = 25;
  let carbsPct = 50;

  if (mode === "keto") {
    proteinPct = ketoType === "hpkd" ? 35 : 20;
    carbsPct = 5;
  } else if (mode === "low-fat") {
    proteinPct = 25;
    carbsPct = 57;
  }

  const proteinCalories = Math.round((targetCalories * proteinPct) / 100);
  const carbsCalories = Math.round((targetCalories * carbsPct) / 100);

  const protein = {
    grams: Math.round(proteinCalories / 4),
    calories: proteinCalories,
    percentage: proteinPct,
  };

  const carbs = {
    grams: Math.round(carbsCalories / 4),
    calories: carbsCalories,
    percentage: carbsPct,
  };

  // Fat Intake by Age Guideline (PDF reference match)
  let ageGroupLabel = "19+ Years";
  let ageRecommendedPct = "20% to 35% of Total Calories";

  if (age >= 2 && age <= 3) {
    ageGroupLabel = "Age 2 - 3 Years";
    ageRecommendedPct = "30% to 40% of Total Calories";
  } else if (age >= 4 && age <= 18) {
    ageGroupLabel = "Age 4 - 18 Years";
    ageRecommendedPct = "25% to 35% of Total Calories";
  }

  // Body Composition
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  const ffmi = Number(((lbmKg / (heightM * heightM)) + 6.1 * (1.8 - heightM)).toFixed(1));

  let healthScore = 95;
  if (saturatedGrams > 25) healthScore -= 10;
  if (bmi < 18.5 || bmi > 29.9) healthScore -= 10;
  healthScore = Math.max(40, Math.min(100, healthScore));

  // 36 Healthy Fats Food Database Array across all 7 UI categories
  const foodDatabase: HealthyFatFoodItem[] = [
    // 1. Oils & Fats
    { id: "f1", name: "Extra Virgin Olive Oil", category: "Oils & Fats", servingSize: "1 tbsp (14g)", totalFat: 14.0, saturatedFat: 1.9, mufa: 9.9, pufa: 1.4, omega3: 0.1, calories: 119 },
    { id: "f2", name: "Avocado Oil", category: "Oils & Fats", servingSize: "1 tbsp (14g)", totalFat: 14.0, saturatedFat: 1.6, mufa: 9.9, pufa: 1.9, omega3: 0.1, calories: 124 },
    { id: "f3", name: "Butter (Grass-Fed)", category: "Oils & Fats", servingSize: "1 tbsp (14g)", totalFat: 11.5, saturatedFat: 7.2, mufa: 3.0, pufa: 0.4, omega3: 0.1, calories: 102 },
    { id: "f4", name: "Ghee (Clarified Butter)", category: "Oils & Fats", servingSize: "1 tbsp (15g)", totalFat: 15.0, saturatedFat: 9.3, mufa: 4.0, pufa: 0.6, omega3: 0.1, calories: 135 },
    { id: "f5", name: "Coconut Oil (Virgin)", category: "Oils & Fats", servingSize: "1 tbsp (14g)", totalFat: 13.6, saturatedFat: 11.8, mufa: 0.9, pufa: 0.2, omega3: 0.0, calories: 121 },
    { id: "f6", name: "Toasted Sesame Oil", category: "Oils & Fats", servingSize: "1 tbsp (14g)", totalFat: 14.0, saturatedFat: 2.0, mufa: 5.6, pufa: 5.8, omega3: 0.1, calories: 120 },

    // 2. Nuts & Seeds
    { id: "f7", name: "Walnuts (English)", category: "Nuts & Seeds", servingSize: "1 oz (28g)", totalFat: 18.5, saturatedFat: 1.7, mufa: 2.5, pufa: 13.4, omega3: 2.5, calories: 185 },
    { id: "f8", name: "Almonds (Whole Raw)", category: "Nuts & Seeds", servingSize: "1 oz (28g)", totalFat: 14.2, saturatedFat: 1.1, mufa: 8.9, pufa: 3.5, omega3: 0.0, calories: 164 },
    { id: "f9", name: "Chia Seeds", category: "Nuts & Seeds", servingSize: "1 oz (28g)", totalFat: 8.7, saturatedFat: 0.9, mufa: 0.6, pufa: 6.8, omega3: 5.0, calories: 138 },
    { id: "f10", name: "Flaxseeds (Ground)", category: "Nuts & Seeds", servingSize: "1 tbsp (7g)", totalFat: 3.0, saturatedFat: 0.3, mufa: 0.5, pufa: 2.0, omega3: 1.6, calories: 37 },
    { id: "f11", name: "Pumpkin Seeds (Pepitas)", category: "Nuts & Seeds", servingSize: "1 oz (28g)", totalFat: 13.0, saturatedFat: 2.5, mufa: 4.1, pufa: 6.0, omega3: 0.1, calories: 151 },
    { id: "f12", name: "Macadamia Nuts", category: "Nuts & Seeds", servingSize: "1 oz (28g)", totalFat: 21.5, saturatedFat: 3.4, mufa: 16.7, pufa: 0.4, omega3: 0.1, calories: 204 },

    // 3. Seafood & Fish
    { id: "f13", name: "Wild Atlantic Salmon (Cooked)", category: "Seafood & Fish", servingSize: "3 oz (85g)", totalFat: 10.5, saturatedFat: 1.9, mufa: 3.8, pufa: 3.9, omega3: 1.8, calories: 175 },
    { id: "f14", name: "Sardines in Olive Oil", category: "Seafood & Fish", servingSize: "1 can drained (92g)", totalFat: 10.5, saturatedFat: 2.5, mufa: 4.2, pufa: 2.8, omega3: 1.4, calories: 191 },
    { id: "f15", name: "Atlantic Mackerel (Cooked)", category: "Seafood & Fish", servingSize: "3 oz (85g)", totalFat: 15.1, saturatedFat: 3.6, mufa: 5.9, pufa: 3.7, omega3: 2.1, calories: 223 },
    { id: "f16", name: "Rainbow Trout (Cooked)", category: "Seafood & Fish", servingSize: "3 oz (85g)", totalFat: 6.1, saturatedFat: 1.4, mufa: 2.0, pufa: 1.9, omega3: 0.9, calories: 143 },
    { id: "f17", name: "Albacore Tuna (Canned in Water)", category: "Seafood & Fish", servingSize: "3 oz (85g)", totalFat: 2.5, saturatedFat: 0.6, mufa: 0.5, pufa: 1.0, omega3: 0.7, calories: 109 },
    { id: "f18", name: "Pacific Oysters (Cooked)", category: "Seafood & Fish", servingSize: "3 oz (85g)", totalFat: 4.2, saturatedFat: 1.0, mufa: 0.6, pufa: 1.5, omega3: 1.2, calories: 139 },

    // 4. Dairy & Eggs
    { id: "f19", name: "Whole Egg (Large)", category: "Dairy & Eggs", servingSize: "1 large (50g)", totalFat: 5.0, saturatedFat: 1.6, mufa: 2.0, pufa: 0.7, omega3: 0.1, calories: 72 },
    { id: "f20", name: "Egg Yolk (Large)", category: "Dairy & Eggs", servingSize: "1 yolk (17g)", totalFat: 4.5, saturatedFat: 1.6, mufa: 1.8, pufa: 0.6, omega3: 0.1, calories: 55 },
    { id: "f21", name: "Greek Yogurt (Whole Milk)", category: "Dairy & Eggs", servingSize: "7 oz (200g)", totalFat: 10.0, saturatedFat: 6.0, mufa: 2.6, pufa: 0.4, omega3: 0.1, calories: 190 },
    { id: "f22", name: "Aged Cheddar Cheese", category: "Dairy & Eggs", servingSize: "1 oz (28g)", totalFat: 9.4, saturatedFat: 6.0, mufa: 2.7, pufa: 0.3, omega3: 0.1, calories: 114 },
    { id: "f23", name: "Heavy Whipping Cream", category: "Dairy & Eggs", servingSize: "1 tbsp (15ml)", totalFat: 5.5, saturatedFat: 3.5, mufa: 1.5, pufa: 0.2, omega3: 0.0, calories: 51 },

    // 5. Avocados & Fruits
    { id: "f24", name: "Hass Avocado (Fresh)", category: "Avocados & Fruits", servingSize: "1 medium (150g)", totalFat: 22.0, saturatedFat: 3.2, mufa: 14.7, pufa: 2.7, omega3: 0.2, calories: 240 },
    { id: "f25", name: "Guacamole (Traditional)", category: "Avocados & Fruits", servingSize: "1/4 cup (60g)", totalFat: 9.0, saturatedFat: 1.3, mufa: 6.1, pufa: 1.1, omega3: 0.1, calories: 100 },
    { id: "f26", name: "Kalamata Olives", category: "Avocados & Fruits", servingSize: "5 large olives (20g)", totalFat: 3.0, saturatedFat: 0.4, mufa: 2.2, pufa: 0.3, omega3: 0.0, calories: 35 },
    { id: "f27", name: "Green Stuffed Olives", category: "Avocados & Fruits", servingSize: "5 medium olives (20g)", totalFat: 3.1, saturatedFat: 0.4, mufa: 2.3, pufa: 0.3, omega3: 0.0, calories: 30 },

    // 6. Meat & Poultry
    { id: "f28", name: "Grass-Fed Ribeye Steak (Cooked)", category: "Meat & Poultry", servingSize: "3 oz (85g)", totalFat: 15.0, saturatedFat: 6.5, mufa: 6.3, pufa: 0.7, omega3: 0.2, calories: 218 },
    { id: "f29", name: "Ground Beef (85/15, Pan-Cooked)", category: "Meat & Poultry", servingSize: "3 oz (85g)", totalFat: 13.0, saturatedFat: 5.1, mufa: 5.7, pufa: 0.5, omega3: 0.1, calories: 215 },
    { id: "f30", name: "Chicken Thigh with Skin (Roasted)", category: "Meat & Poultry", servingSize: "1 thigh (90g)", totalFat: 14.0, saturatedFat: 3.9, mufa: 5.8, pufa: 3.2, omega3: 0.1, calories: 210 },
    { id: "f31", name: "Pork Tenderloin (Roasted)", category: "Meat & Poultry", servingSize: "3 oz (85g)", totalFat: 3.5, saturatedFat: 1.1, mufa: 1.4, pufa: 0.4, omega3: 0.0, calories: 122 },
    { id: "f32", name: "Ground Turkey (85/15, Cooked)", category: "Meat & Poultry", servingSize: "3 oz (85g)", totalFat: 11.5, saturatedFat: 3.1, mufa: 4.8, pufa: 2.6, omega3: 0.1, calories: 195 },

    // 7. Processed & Snacks
    { id: "f33", name: "Dark Chocolate (70-85% Cacao)", category: "Processed & Snacks", servingSize: "1 oz (28g)", totalFat: 12.1, saturatedFat: 7.0, mufa: 3.6, pufa: 0.4, omega3: 0.0, calories: 170 },
    { id: "f34", name: "Natural Peanut Butter", category: "Processed & Snacks", servingSize: "2 tbsp (32g)", totalFat: 16.0, saturatedFat: 2.5, mufa: 8.0, pufa: 4.5, omega3: 0.0, calories: 190 },
    { id: "f35", name: "Creamy Almond Butter", category: "Processed & Snacks", servingSize: "2 tbsp (32g)", totalFat: 18.0, saturatedFat: 1.6, mufa: 10.5, pufa: 4.2, omega3: 0.0, calories: 196 },
    { id: "f36", name: "Raw Organic Cacao Nibs", category: "Processed & Snacks", servingSize: "1 oz (28g)", totalFat: 14.0, saturatedFat: 8.0, mufa: 4.5, pufa: 0.5, omega3: 0.0, calories: 160 },
  ];

  // Smart Insights & Recommendations
  const insights: string[] = [
    `Your daily fat target is ${fatTargetGrams}g (${fatTargetCalories} kcal), representing ${fatPct}% of your total daily calorie goal of ${targetCalories} kcal.`,
    `Limit saturated fat to a maximum reference of ${saturatedGrams}g/day (<${saturatedMaxPercent}% of total calories) as recommended by major cardiovascular guidelines.`,
    `Emphasize healthy monounsaturated (MUFA target ~${mufaGrams}g) and polyunsaturated (PUFA target ~${pufaGrams}g) fatty acids from olive oil, avocados, nuts, and wild fish.`,
    `Consider an evidence-informed planning floor of approximately ${hormoneSafetyMinGrams}g fat/day (~0.3g/lb body weight) to support essential fatty acid intake and fat-soluble vitamin absorption.`,
  ];

  if (mode === "heart-health") {
    insights.push(`Heart Health Reference applied: Moderate total-fat target with saturated fat capped at <6% (${saturatedGrams}g max) and dietary cholesterol reference <200mg.`);
  } else if (mode === "keto") {
    insights.push(`Ketogenic preset applied: ${fatPct}% fat (${fatTargetGrams}g/day) with 5% carbohydrate allocation.`);
  } else if (mode === "bodybuilding") {
    insights.push(`Bodybuilder planning target applied: Scaled to 0.35g per pound of body weight (${fatTargetGrams}g/day).`);
  }

  const recommendations: string[] = [
    `Replace saturated animal fats and butter with extra virgin olive oil, avocados, and raw nuts to promote healthy serum lipid profiles.`,
    `Aim for at least ${omega3Grams}g of EPA/DHA Omega-3 fatty acids daily from wild salmon, sardines, or algae/fish oil supplements.`,
    `Eliminate artificial trans fats (partially hydrogenated oils) entirely (target 0g trans fat per day).`,
    `Maintain dietary cholesterol below ${cholesterolLimitMg}mg daily as part of a balanced heart-healthy diet.`,
  ];

  return {
    mode,
    unitSystem,
    bmr: Math.round(bmr),
    tdee,
    targetCalories,
    formulaUsed: formulaUsedName,

    fatTargetGrams,
    fatTargetCalories,
    fatPercentage: fatPct,
    fatRangeMin,
    fatRangeRecommended,
    fatRangeMax,
    hormoneSafetyMinGrams,

    fattyAcids: {
      saturatedGrams,
      saturatedMaxPercent,
      mufaGrams,
      pufaGrams,
      omega3Grams,
      omega6Grams,
      omegaRatio,
      transFatLimitGrams,
      cholesterolLimitMg,
    },

    protein,
    carbs,

    ageGuideline: {
      ageGroup: ageGroupLabel,
      recommendedPercentage: ageRecommendedPct,
    },

    bodyComposition: {
      leanBodyMassLbs: Math.round(lbmLbs),
      fatMassLbs: Math.round(fatMassLbs),
      bodyFatPct,
      ffmi,
      bmi,
      healthScore,
    },

    foodDatabase,
    insights,
    recommendations,
  };
}

export function calculateFatOutputs(inputs: Record<string, any>): FatCalculatorOutputs {
  const res = calculateFatIntakeCalculator(inputs);
  return {
    targetCalories: res.targetCalories,
    fatTargetGrams: res.fatTargetGrams,
    fatPercentage: res.fatPercentage,
    saturatedFatMaxGrams: res.fattyAcids.saturatedGrams,
    tdee: res.tdee,
    bmr: res.bmr,
  };
}
