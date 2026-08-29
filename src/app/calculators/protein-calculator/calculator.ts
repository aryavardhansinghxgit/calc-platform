import {
  ProteinCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  PregnancyStatusType,
  ProteinCalculationResults,
  AminoAcidProfileItem,
  ProteinFoodItem,
  ProteinCalculatorOutputs,
} from "./types";

export function calculateProteinCalculator(
  inputs: Record<string, any>
): ProteinCalculationResults {
  const unitSystem: UnitSystem = inputs.unitSystem === "metric" ? "metric" : "us";
  const mode: ProteinCalculationMode = inputs.calculationMode || "daily";
  const age = Math.max(15, Math.min(100, Number(inputs.age) || 25));
  const gender: Gender = inputs.gender === "female" ? "female" : "male";

  // Height & Weight Conversions using exact international constants
  let heightCm = 177.8;
  let weightKg = 72.57478;
  let weightLbs = 160;

  if (unitSystem === "us") {
    const feet = Math.max(0, Number(inputs.heightFeet) || 0);
    const inches = Math.max(0, Number(inputs.heightInches) || 0);
    const totalInches = (feet * 12 + inches) > 0 ? (feet * 12 + inches) : 70;
    heightCm = totalInches * 2.54;

    const lbs = Math.max(0, Number(inputs.weightLbs) || 0);
    weightLbs = lbs > 0 ? lbs : 160;
    weightKg = weightLbs * 0.45359237;
  } else {
    heightCm = Math.max(0, Number(inputs.heightCm) || 178);
    weightKg = Math.max(0, Number(inputs.weightKg) || 72.57);
    weightLbs = parseFloat((weightKg / 0.45359237).toFixed(1));
  }

  // Clamps to prevent impossible physical numbers
  heightCm = Math.max(80, Math.min(250, heightCm));
  weightKg = Math.max(25, Math.min(350, weightKg));

  const bodyFatPct = Math.max(3, Math.min(65, Number(inputs.bodyFat) || 20));
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
      formulaUsedName = "Mifflin-St Jeor (Standard)";
      break;
    }
  }

  // Activity Multipliers
  const activityLevel: ActivityLevel = inputs.activityLevel || "light";
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    "very-active": 1.9,
    "extra-active": 2.0,
  };
  const activityMultiplier = multipliers[activityLevel] || 1.375;
  const tdee = Math.round(bmrValue * activityMultiplier);

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

  // Pregnancy & Lactation Additions (IOM / Clinical Reference Table)
  const pregnancyStatus: PregnancyStatusType = inputs.pregnancyStatus || "none";
  let extraProteinGrams = 0;
  let extraEnergyKj = 0;
  let pregnancyLabel = "Not Applicable";

  switch (pregnancyStatus) {
    case "t1":
      extraProteinGrams = 1;
      extraEnergyKj = 375;
      pregnancyLabel = "Pregnancy Trimester 1 (+1g protein/day)";
      break;
    case "t2":
      extraProteinGrams = 10;
      extraEnergyKj = 1200;
      pregnancyLabel = "Pregnancy Trimester 2 (+10g protein/day)";
      break;
    case "t3":
      extraProteinGrams = 31;
      extraEnergyKj = 1950;
      pregnancyLabel = "Pregnancy Trimester 3 (+31g protein/day)";
      break;
    case "lactation-1":
      extraProteinGrams = 19;
      extraEnergyKj = 2800;
      pregnancyLabel = "Lactation First 6 Months (+19g protein/day)";
      break;
    case "lactation-2":
      extraProteinGrams = 13;
      extraEnergyKj = 1925;
      pregnancyLabel = "Lactation After 6 Months (+13g protein/day)";
      break;
  }

  // Protein Target per kg / lb Calculation across All 10 Modes
  let gPerKg = 1.6; // Default Daily Baseline / Endurance: 1.6 g/kg
  let rangeMinGPerKg = 1.4;
  let rangeMaxGPerKg = 1.8;

  if (mode === "daily" || mode === "endurance") {
    gPerKg = 1.6;
    rangeMinGPerKg = 1.4;
    rangeMaxGPerKg = 1.8;
  } else if (mode === "hypertrophy") {
    gPerKg = 2.0;
    rangeMinGPerKg = 1.6;
    rangeMaxGPerKg = 2.2;
  } else if (mode === "cutting") {
    gPerKg = 2.4;
    rangeMinGPerKg = 2.2;
    rangeMaxGPerKg = 2.6;
  } else if (mode === "maintenance") {
    gPerKg = 1.4;
    rangeMinGPerKg = 1.2;
    rangeMaxGPerKg = 1.6;
  } else if (mode === "pregnancy") {
    gPerKg = 1.4;
    rangeMinGPerKg = 1.2;
    rangeMaxGPerKg = 1.6;
  } else if (mode === "senior") {
    gPerKg = 1.4;
    rangeMinGPerKg = 1.2;
    rangeMaxGPerKg = 1.6;
  } else if (mode === "strength") {
    gPerKg = 2.2;
    rangeMinGPerKg = 1.8;
    rangeMaxGPerKg = 2.4;
  } else if (mode === "vegan") {
    gPerKg = 1.8; // +10% compensation for DIAAS digestibility
    rangeMinGPerKg = 1.6;
    rangeMaxGPerKg = 2.0;
  } else if (mode === "custom") {
    gPerKg = Number(inputs.customProteinGramsPerKg) || 1.8;
    rangeMinGPerKg = Math.max(0.8, Number((gPerKg - 0.2).toFixed(2)));
    rangeMaxGPerKg = Number((gPerKg + 0.2).toFixed(2));
  }

  // Senior auto-adjustment if age >= 65 and mode is maintenance or daily
  if (age >= 65 && (mode === "maintenance" || mode === "senior")) {
    gPerKg = Math.max(1.4, gPerKg);
  }

  const baseProteinGrams = Math.round(weightKg * gPerKg);
  const proteinTargetGrams = baseProteinGrams + extraProteinGrams;

  const rdaMinimumGrams = Math.round(weightKg * 0.8);
  const proteinRangeMin = Math.round(weightKg * rangeMinGPerKg) + extraProteinGrams;
  const proteinRangeMax = Math.round(weightKg * rangeMaxGPerKg) + extraProteinGrams;

  const proteinGramsPerKg = Number((proteinTargetGrams / weightKg).toFixed(2));
  const proteinGramsPerLb = Number((proteinTargetGrams / weightLbs).toFixed(2));
  const proteinCalories = Math.round(proteinTargetGrams * 4);
  const proteinPercentage = Number(((proteinCalories / targetCalories) * 100).toFixed(1));

  // Per Meal Distribution & Leucine Trigger
  const mealFrequency = Math.max(1, Math.min(10, Number(inputs.mealFrequency) || 4));
  const perMealProteinGrams = Math.round(proteinTargetGrams / mealFrequency);
  const leucineTargetPerMeal = Number((perMealProteinGrams * 0.09).toFixed(1)); // ~9% Leucine ratio in high-quality protein

  // Carbs & Fat Remaining Allocation
  const remainingCalories = Math.max(0, targetCalories - proteinCalories);
  const carbsCalories = Math.round(remainingCalories * 0.6);
  const fatCalories = Math.round(remainingCalories * 0.4);

  const carbs = {
    grams: Math.round(carbsCalories / 4),
    calories: carbsCalories,
    percentage: Number(((carbsCalories / targetCalories) * 100).toFixed(1)),
  };

  const fat = {
    grams: Math.round(fatCalories / 9),
    calories: fatCalories,
    percentage: Number(((fatCalories / targetCalories) * 100).toFixed(1)),
  };

  // Body Composition
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  const ffmi = Number(((lbmKg / (heightM * heightM)) + 6.1 * (1.8 - heightM)).toFixed(1));

  let healthScore = 94;
  if (proteinGramsPerKg < 1.0) healthScore -= 10;
  if (bmi < 18.5 || bmi > 29.9) healthScore -= 10;
  healthScore = Math.max(40, Math.min(100, healthScore));

  // 9 Essential Amino Acid (EAA) Profile Breakdown
  const eaaProfile: AminoAcidProfileItem[] = [
    { aminoAcid: "Leucine", targetGrams: Number((proteinTargetGrams * 0.09).toFixed(1)), functionDesc: "Primary trigger for Muscle Protein Synthesis (MPS via mTORC1)" },
    { aminoAcid: "Isoleucine", targetGrams: Number((proteinTargetGrams * 0.05).toFixed(1)), functionDesc: "Glucose uptake & muscular endurance fuel" },
    { aminoAcid: "Valine", targetGrams: Number((proteinTargetGrams * 0.06).toFixed(1)), functionDesc: "Muscle recovery & cellular tissue repair" },
    { aminoAcid: "Lysine", targetGrams: Number((proteinTargetGrams * 0.07).toFixed(1)), functionDesc: "Collagen synthesis, immune function & calcium absorption" },
    { aminoAcid: "Methionine", targetGrams: Number((proteinTargetGrams * 0.025).toFixed(1)), functionDesc: "Sulfur source for metabolism & cellular detoxification" },
    { aminoAcid: "Phenylalanine", targetGrams: Number((proteinTargetGrams * 0.045).toFixed(1)), functionDesc: "Precursor to dopamine, epinephrine & thyroid hormones" },
    { aminoAcid: "Threonine", targetGrams: Number((proteinTargetGrams * 0.04).toFixed(1)), functionDesc: "Structural gut mucosal lining & tooth enamel" },
    { aminoAcid: "Tryptophan", targetGrams: Number((proteinTargetGrams * 0.015).toFixed(1)), functionDesc: "Precursor to serotonin & melatonin circadian rhythm" },
    { aminoAcid: "Histidine", targetGrams: Number((proteinTargetGrams * 0.03).toFixed(1)), functionDesc: "Histamine creation & neuronal myelin sheath maintenance" },
  ];

  // 40+ Protein Food Database Array (USDA Reference & Clinical Quality)
  const foodDatabase: ProteinFoodItem[] = [
    { id: "pr1", name: "Chicken breast, cooked", category: "Meat & Poultry", servingSize: "3 oz (85g)", protein: 26.0, calories: 140, qualityType: "Complete Protein", leucineContent: 2.3 },
    { id: "pr2", name: "Lean Beef (90/10)", category: "Meat & Poultry", servingSize: "3 oz (85g)", protein: 22.0, calories: 175, qualityType: "Complete Protein", leucineContent: 1.9 },
    { id: "pr3", name: "Turkey breast", category: "Meat & Poultry", servingSize: "3 oz (85g)", protein: 25.0, calories: 125, qualityType: "Complete Protein", leucineContent: 2.1 },
    { id: "pr4", name: "Pork tenderloin", category: "Meat & Poultry", servingSize: "3 oz (85g)", protein: 24.0, calories: 135, qualityType: "Complete Protein", leucineContent: 2.0 },
    { id: "pr5", name: "Salmon fillet", category: "Seafood", servingSize: "3 oz (85g)", protein: 22.0, calories: 175, qualityType: "Complete Protein", leucineContent: 1.8 },
    { id: "pr6", name: "Tuna (canned in water)", category: "Seafood", servingSize: "3 oz (85g)", protein: 20.0, calories: 90, qualityType: "Complete Protein", leucineContent: 1.7 },
    { id: "pr7", name: "Shrimp, cooked", category: "Seafood", servingSize: "3 oz (85g)", protein: 20.0, calories: 84, qualityType: "Complete Protein", leucineContent: 1.6 },
    { id: "pr8", name: "Cod fillet", category: "Seafood", servingSize: "3 oz (85g)", protein: 19.0, calories: 85, qualityType: "Complete Protein", leucineContent: 1.5 },

    { id: "pr9", name: "Whole Egg", category: "Dairy & Eggs", servingSize: "1 large (50g)", protein: 6.3, calories: 72, qualityType: "Complete Protein", leucineContent: 0.6 },
    { id: "pr10", name: "Egg Whites", category: "Dairy & Eggs", servingSize: "1/2 cup (120g)", protein: 13.0, calories: 60, qualityType: "Complete Protein", leucineContent: 1.2 },
    { id: "pr11", name: "Greek Yogurt (Non-fat)", category: "Dairy & Eggs", servingSize: "1 cup (227g)", protein: 23.0, calories: 130, qualityType: "Complete Protein", leucineContent: 2.2 },
    { id: "pr12", name: "Cottage Cheese (2%)", category: "Dairy & Eggs", servingSize: "1 cup (226g)", protein: 28.0, calories: 180, qualityType: "Complete Protein", leucineContent: 2.7 },
    { id: "pr13", name: "Milk (1%)", category: "Dairy & Eggs", servingSize: "1 cup (244g)", protein: 8.2, calories: 102, qualityType: "Complete Protein", leucineContent: 0.8 },
    { id: "pr14", name: "Whey Protein Isolate", category: "Dairy & Eggs", servingSize: "1 scoop (30g)", protein: 25.0, calories: 115, qualityType: "Complete Protein", leucineContent: 2.8 },

    { id: "pr15", name: "Tofu (Firm)", category: "Vegan Complete", servingSize: "4 oz (113g)", protein: 11.0, calories: 95, qualityType: "Complete Protein", leucineContent: 0.9 },
    { id: "pr16", name: "Tempeh", category: "Vegan Complete", servingSize: "3 oz (85g)", protein: 16.0, calories: 165, qualityType: "Complete Protein", leucineContent: 1.3 },
    { id: "pr17", name: "Edamame", category: "Vegan Complete", servingSize: "1 cup (155g)", protein: 18.4, calories: 188, qualityType: "Complete Protein", leucineContent: 1.4 },
    { id: "pr18", name: "Seitan (Wheat Gluten)", category: "Vegan Complete", servingSize: "3 oz (85g)", protein: 21.0, calories: 120, qualityType: "Complete Protein", leucineContent: 1.5 },
    { id: "pr19", name: "Quinoa", category: "Vegan Complete", servingSize: "1 cup cooked (185g)", protein: 8.1, calories: 222, qualityType: "Complete Protein", leucineContent: 0.6 },

    { id: "pr20", name: "Lentils", category: "Plant Incomplete", servingSize: "1 cup cooked (198g)", protein: 17.9, calories: 230, qualityType: "Incomplete Protein", leucineContent: 1.3 },
    { id: "pr21", name: "Black Beans", category: "Plant Incomplete", servingSize: "1 cup cooked (172g)", protein: 15.2, calories: 227, qualityType: "Incomplete Protein", leucineContent: 1.1 },
    { id: "pr22", name: "Chickpeas", category: "Plant Incomplete", servingSize: "1 cup cooked (164g)", protein: 14.5, calories: 269, qualityType: "Incomplete Protein", leucineContent: 1.0 },
    { id: "pr23", name: "Almonds", category: "Plant Incomplete", servingSize: "1 oz (28g)", protein: 6.0, calories: 164, qualityType: "Incomplete Protein", leucineContent: 0.4 },
    { id: "pr24", name: "Peanut Butter", category: "Plant Incomplete", servingSize: "2 tbsp (32g)", protein: 7.0, calories: 188, qualityType: "Incomplete Protein", leucineContent: 0.5 },
    { id: "pr25", name: "Hemp Seeds", category: "Plant Incomplete", servingSize: "3 tbsp (30g)", protein: 9.5, calories: 166, qualityType: "Complete Protein", leucineContent: 0.8 },
  ];

  // Smart Insights & Recommendations
  const insights: string[] = [
    `Your daily protein target is ${proteinTargetGrams}g (${proteinGramsPerLb} g/lb | ${proteinGramsPerKg} g/kg), accounting for ${proteinCalories} kcal (${proteinPercentage}% of daily energy).`,
    `This target is ${proteinTargetGrams - rdaMinimumGrams}g above the standard adult RDA minimum (${rdaMinimumGrams}g/day) to support your active lifestyle.`,
    `Evenly distributing intake into ${mealFrequency} meals provides ~${perMealProteinGrams}g protein and ~${leucineTargetPerMeal}g Leucine per feeding.`,
  ];

  if (pregnancyStatus !== "none") {
    insights.push(`Includes gestational addition of ${extraProteinGrams}g/day for ${pregnancyLabel}.`);
  }

  const recommendations: string[] = [
    `Consume ~${perMealProteinGrams}g of high-quality protein per meal to reach the leucine trigger (~2.5–3.5g) and stimulate muscle protein synthesis.`,
    `Prioritize complete protein sources containing all 9 essential amino acids: poultry, eggs, fish, Greek yogurt, or complementary plant blends.`,
    `Drink adequate water (3 to 4 liters daily) to support renal nitrogen clearance and hydration during active training.`,
    `Spread meals 3 to 5 hours apart rather than consuming your entire protein allotment in a single sitting.`,
  ];

  return {
    mode,
    unitSystem,
    bmr: Math.round(bmrValue),
    tdee,
    targetCalories,
    formulaUsed: formulaUsedName,
    proteinTargetGrams,
    proteinGramsPerKg,
    proteinGramsPerLb,
    proteinCalories,
    proteinPercentage,
    perMealProteinGrams,
    leucineTargetPerMeal,
    rdaMinimumGrams,
    proteinRangeMin,
    proteinRangeMax,
    carbs,
    fat,
    bodyComposition: {
      leanBodyMassLbs: Math.round(lbmLbs),
      fatMassLbs: Math.round(fatMassLbs),
      bodyFatPct,
      ffmi,
      bmi,
      healthScore,
    },
    pregnancyAdjustment: {
      label: pregnancyLabel,
      extraProteinGrams,
      extraEnergyKj,
    },
    eaaProfile,
    foodDatabase,
    insights,
    recommendations,
  };
}

export function calculateProteinOutputs(inputs: Record<string, any>): ProteinCalculatorOutputs {
  const res = calculateProteinCalculator(inputs);
  return {
    targetCalories: res.targetCalories,
    proteinTargetGrams: res.proteinTargetGrams,
    proteinGramsPerLb: res.proteinGramsPerLb,
    perMealProteinGrams: res.perMealProteinGrams,
    tdee: res.tdee,
    bmr: res.bmr,
  };
}

export default calculateProteinCalculator;
