import {
  TdeeCalculationMode,
  UnitSystem,
  EnergyUnit,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  TdeeCalculationResults,
  ActivityBurnItem,
  FormulaComparisonItem,
  WeightProjectionPoint,
  TdeeCalculatorOutputs,
} from "./types";

export function calculateTdeeCalculator(
  inputs: Record<string, any>
): TdeeCalculationResults {
  const unitSystem: UnitSystem = inputs.unitSystem || "us";
  const energyUnit: EnergyUnit = inputs.energyUnit || "kcal";
  const mode: TdeeCalculationMode = inputs.calculationMode || "tdee";
  const gender: Gender = inputs.gender === "female" ? "female" : "male";

  // Safe extraction of age
  const rawAge = inputs.age !== undefined && !isNaN(Number(inputs.age)) ? Number(inputs.age) : 25;

  // Height & Weight Conversions
  let heightCm = 177.8;
  let weightKg = 74.8428;
  let weightLbs = 165;
  let heightFeet = 5;
  let heightInches = 10;

  if (unitSystem === "us") {
    heightFeet = inputs.heightFeet !== undefined && !isNaN(Number(inputs.heightFeet)) ? Number(inputs.heightFeet) : 5;
    heightInches = inputs.heightInches !== undefined && !isNaN(Number(inputs.heightInches)) ? Number(inputs.heightInches) : 10;
    const totalInches = heightFeet * 12 + heightInches;
    heightCm = totalInches * 2.54;

    weightLbs = inputs.weightLbs !== undefined && !isNaN(Number(inputs.weightLbs)) ? Number(inputs.weightLbs) : 165;
    weightKg = weightLbs / 2.20462;
  } else {
    heightCm = inputs.heightCm !== undefined && !isNaN(Number(inputs.heightCm)) ? Number(inputs.heightCm) : 178;
    weightKg = inputs.weightKg !== undefined && !isNaN(Number(inputs.weightKg)) ? Number(inputs.weightKg) : 75;
    weightLbs = weightKg * 2.20462;
    const totalInches = heightCm / 2.54;
    heightFeet = Math.floor(totalInches / 12);
    heightInches = parseFloat((totalInches % 12).toFixed(1));
  }

  // Input Validation
  const isAgeValid = rawAge >= 2 && rawAge <= 120;
  const isHeightValid = heightCm > 0 && !isNaN(heightCm);
  const isWeightValid = weightKg > 0 && !isNaN(weightKg);

  if (!isAgeValid || !isHeightValid || !isWeightValid) {
    let errMsg = "Please enter valid non-zero physical measurements.";
    if (!isAgeValid) errMsg = "Age must be between 2 and 120 years.";
    else if (!isHeightValid) errMsg = "Height must be a positive number greater than zero.";
    else if (!isWeightValid) errMsg = "Weight must be a positive number greater than zero.";

    return {
      isValid: false,
      errorMessage: errMsg,
      mode,
      unitSystem,
      energyUnit,
      bmr: 0,
      tdee: 0,
      targetCalories: 0,
      formulaUsed: "N/A",
      components: { bmrCalories: 0, eatCalories: 0, neatCalories: 0, tefCalories: 0 },
      timeframeTotals: { daily: 0, weekly: 0, monthly: 0, annual: 0 },
      goalPlan: { maintenance: 0, mildLoss: 0, moderateLoss: 0, extremeLoss: 0, leanBulk: 0, moderateGain: 0, extremeGain: 0 },
      weightProjections: [],
      activityBurnTable: [],
      formulaComparisons: [],
      bodyComposition: { leanBodyMassLbs: 0, fatMassLbs: 0, bodyFatPct: 0, ffmi: 0, bmi: 0, healthScore: 0 },
      insights: [errMsg],
      recommendations: ["Ensure all measurements are positive numbers."],
    };
  }

  const age = rawAge;
  const bodyFatPct = inputs.bodyFat !== undefined && !isNaN(Number(inputs.bodyFat))
    ? Math.max(2, Math.min(65, Number(inputs.bodyFat)))
    : 18;
  const lbmKg = weightKg * (1 - bodyFatPct / 100);
  const lbmLbs = lbmKg * 2.20462;
  const fatMassLbs = Math.max(0, weightLbs - lbmLbs);

  // BMR Formula Selection (7 Clinical Formulas)
  const formula: BmrFormulaType = inputs.bmrFormula || "mifflin";

  function computeBmr(fType: BmrFormulaType): number {
    switch (fType) {
      case "katch":
        return 370 + 21.6 * lbmKg;
      case "harris":
        return gender === "male"
          ? 66.5 + 13.75 * weightKg + 5.003 * heightCm - 6.755 * age
          : 655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * age;
      case "revised-harris":
        return gender === "male"
          ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
          : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
      case "cunningham":
        return 500 + 22 * lbmKg;
      case "schofield":
        if (gender === "male") {
          if (age < 10) return 22.7 * weightKg + 495;
          if (age < 18) return 17.5 * weightKg + 651;
          if (age < 30) return 15.057 * weightKg + 679;
          if (age < 60) return 11.6 * weightKg + 879;
          return 13.5 * weightKg + 487;
        } else {
          if (age < 10) return 22.5 * weightKg + 499;
          if (age < 18) return 12.2 * weightKg + 746;
          if (age < 30) return 14.7 * weightKg + 496;
          if (age < 60) return 8.7 * weightKg + 829;
          return 10.5 * weightKg + 596;
        }
      case "owen":
        return gender === "male" ? 879 + 10.2 * weightKg : 795 + 7.18 * weightKg;
      case "mifflin":
      default:
        return gender === "male"
          ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
          : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  const bmrKcal = computeBmr(formula);

  let formulaUsedName = "Mifflin-St Jeor (Clinical Standard)";
  if (formula === "katch") formulaUsedName = "Katch-McArdle (LBM Based)";
  if (formula === "harris") formulaUsedName = "Original Harris-Benedict";
  if (formula === "revised-harris") formulaUsedName = "Revised Harris-Benedict";
  if (formula === "cunningham") formulaUsedName = "Cunningham (Athletic LBM)";
  if (formula === "schofield") formulaUsedName = "Schofield (WHO Equation)";
  if (formula === "owen") formulaUsedName = "Owen Equation";

  // Activity Level Multipliers
  const activityLevel: ActivityLevel = inputs.activityLevel || "moderate";
  let activityMultiplier = 1.55;
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
    case "athlete":
      activityMultiplier = 2.1;
      break;
  }

  // Step Count Bonus Adjustment
  const dailySteps = inputs.dailySteps !== undefined && !isNaN(Number(inputs.dailySteps))
    ? Math.max(0, Number(inputs.dailySteps))
    : 7500;
  let stepBonusKcal = 0;
  if (dailySteps >= 15000) stepBonusKcal = 450;
  else if (dailySteps >= 12500) stepBonusKcal = 350;
  else if (dailySteps >= 10000) stepBonusKcal = 250;
  else if (dailySteps >= 7500) stepBonusKcal = 100;

  const workoutFreq = inputs.workoutFrequency !== undefined && !isNaN(Number(inputs.workoutFrequency))
    ? Math.max(0, Number(inputs.workoutFrequency))
    : 4;
  const workoutMin = inputs.workoutDuration !== undefined && !isNaN(Number(inputs.workoutDuration))
    ? Math.max(0, Number(inputs.workoutDuration))
    : 45;
  const eatKcal = Math.round((workoutFreq * workoutMin * (weightKg * 0.08)) / 7); // Exercise Activity
  const bmrRounded = Math.round(bmrKcal);

  // Reconciled Base TDEE: higher of standard PAL activity estimate or physiological lower bound (BMR + EAT + TEF)
  const palTdee = Math.round(bmrKcal * activityMultiplier + stepBonusKcal);
  const minRequiredTdee = Math.ceil((bmrRounded + eatKcal) / 0.9);
  const baseTdeeKcal = Math.max(palTdee, minRequiredTdee);

  // Goal & Mode Calorie Adjustments
  const goal: FitnessGoal = inputs.goal || "maintain";
  let calorieAdjustment = 0;

  if (mode === "loss" || mode === "cutting") {
    calorieAdjustment = -500;
  } else if (mode === "gain") {
    calorieAdjustment = 500;
  } else if (mode === "lean-bulk") {
    calorieAdjustment = 250;
  } else if (mode === "recomp") {
    calorieAdjustment = -200;
  } else if (mode === "athlete") {
    calorieAdjustment = 300;
  } else if (mode === "custom") {
    calorieAdjustment = inputs.customDelta !== undefined && !isNaN(Number(inputs.customDelta)) ? Number(inputs.customDelta) : 0;
  } else {
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
  }

  const targetCaloriesKcal = Math.max(1200, Math.round(baseTdeeKcal + calorieAdjustment));

  // TDEE Energy Component Breakdown
  const tefKcal = Math.round(baseTdeeKcal * 0.1); // ~10% Thermic Effect of Food
  // Reconciled NEAT guaranteeing exact sum: bmr + neat + eat + tef === baseTdeeKcal
  const neatKcal = Math.max(0, baseTdeeKcal - bmrRounded - eatKcal - tefKcal);

  // Kilojoule Conversion (1 kcal = 4.184 kJ)
  const unitMultiplier = energyUnit === "kj" ? 4.184 : 1.0;

  const bmr = Math.round(bmrKcal * unitMultiplier);
  const tdee = Math.round(baseTdeeKcal * unitMultiplier);
  const targetCalories = Math.round(targetCaloriesKcal * unitMultiplier);

  // Timeframe Totals
  const timeframeTotals = {
    daily: targetCalories,
    weekly: targetCalories * 7,
    monthly: Math.round(targetCalories * 30.4375),
    annual: targetCalories * 365,
  };

  // Goal Plan Matrix
  const goalPlan = {
    maintenance: tdee,
    mildLoss: Math.round((baseTdeeKcal - 250) * unitMultiplier),
    moderateLoss: Math.round((baseTdeeKcal - 500) * unitMultiplier),
    extremeLoss: Math.round((baseTdeeKcal - 1000) * unitMultiplier),
    leanBulk: Math.round((baseTdeeKcal + 250) * unitMultiplier),
    moderateGain: Math.round((baseTdeeKcal + 500) * unitMultiplier),
    extremeGain: Math.round((baseTdeeKcal + 1000) * unitMultiplier),
  };

  // 12-Week Weight Trajectory Projections (3500 kcal = 1 lb fat)
  const weeklyChangeLbs = (targetCaloriesKcal - baseTdeeKcal) / 500;
  const weightProjections: WeightProjectionPoint[] = [];

  for (let w = 0; w <= 12; w++) {
    const rawProjLbs = weightLbs + weeklyChangeLbs * w;
    const projLbs = Number(Math.max(30, rawProjLbs).toFixed(1));
    weightProjections.push({
      week: w,
      weightLbs: projLbs,
      weightKg: Number((projLbs / 2.20462).toFixed(1)),
    });
  }

  // Activity Burn Table per 30 Mins based on body weight
  const activityBurnTable: ActivityBurnItem[] = [
    { activity: "Brisk Walking (3.5 mph)", caloriesBurned30Min: Math.round(weightKg * 1.8), desc: "Moderate NEAT movement" },
    { activity: "Jogging / Running (6.0 mph)", caloriesBurned30Min: Math.round(weightKg * 4.2), desc: "High aerobic exercise" },
    { activity: "Cycling (12.0 mph)", caloriesBurned30Min: Math.round(weightKg * 3.4), desc: "Low impact cardio" },
    { activity: "Swimming Laps (Moderate)", caloriesBurned30Min: Math.round(weightKg * 3.6), desc: "Full-body resistance" },
    { activity: "Heavy Strength Training", caloriesBurned30Min: Math.round(weightKg * 2.8), desc: "Hypertrophy resistance" },
  ];

  // Formula Comparison across all 7 BMR equations
  const formulaList: { id: BmrFormulaType; name: string }[] = [
    { id: "mifflin", name: "Mifflin-St Jeor" },
    { id: "katch", name: "Katch-McArdle" },
    { id: "harris", name: "Original Harris-Benedict" },
    { id: "revised-harris", name: "Revised Harris-Benedict" },
    { id: "cunningham", name: "Cunningham" },
    { id: "schofield", name: "Schofield" },
    { id: "owen", name: "Owen" },
  ];

  const formulaComparisons: FormulaComparisonItem[] = formulaList.map((f) => {
    const fBmrKcal = computeBmr(f.id);
    const fTdeeKcal = Math.round(fBmrKcal * activityMultiplier + stepBonusKcal);
    return {
      formulaName: f.name,
      bmrValue: Math.round(fBmrKcal * unitMultiplier),
      tdeeValue: Math.round(fTdeeKcal * unitMultiplier),
      difference: Math.round((fTdeeKcal - baseTdeeKcal) * unitMultiplier),
    };
  });

  // Body Composition
  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));
  const ffmi = Number(((lbmKg / (heightM * heightM)) + 6.1 * (1.8 - heightM)).toFixed(1));

  let healthScore = 95;
  if (bmi < 18.5 || bmi > 29.9) healthScore -= 10;
  if (dailySteps < 5000) healthScore -= 10;
  healthScore = Math.max(40, Math.min(100, healthScore));

  // Smart Insights & Recommendations
  const unitLabel = energyUnit === "kj" ? "kJ" : "kcal";
  const insights: string[] = [
    `Your Total Daily Energy Expenditure (TDEE) is ${tdee} ${unitLabel}/day (BMR: ${bmr} ${unitLabel}).`,
    `Your selected target is ${targetCalories} ${unitLabel}/day (${timeframeTotals.weekly.toLocaleString()} ${unitLabel}/week).`,
    `TDEE Breakdown: BMR (${Math.round(bmrKcal * unitMultiplier)} ${unitLabel}), NEAT non-exercise activity (${Math.round(neatKcal * unitMultiplier)} ${unitLabel}), EAT workouts (${Math.round(eatKcal * unitMultiplier)} ${unitLabel}), and TEF digestion (${Math.round(tefKcal * unitMultiplier)} ${unitLabel}).`,
    `Daily step count of ${dailySteps.toLocaleString()} steps contributes ~${Math.round(stepBonusKcal * unitMultiplier)} ${unitLabel} to your TDEE.`,
  ];

  const recommendations: string[] = [
    `To achieve your target of ${targetCalories} ${unitLabel}/day, align daily calorie intake using consistent food tracking.`,
    `Increase daily NEAT by aiming for at least 10,000 steps per day to elevate resting energy expenditure.`,
    `Maintain high dietary protein (~1.6-2.2g/kg) to maximize the Thermic Effect of Food (TEF ~10-15%).`,
    `Recalculate your TDEE every 5 to 10 lbs of body weight change or when workout training volume shifts.`,
  ];

  return {
    isValid: true,
    mode,
    unitSystem,
    energyUnit,
    bmr,
    tdee,
    targetCalories,
    formulaUsed: formulaUsedName,

    components: {
      bmrCalories: Math.round(bmrKcal * unitMultiplier),
      eatCalories: Math.round(eatKcal * unitMultiplier),
      neatCalories: Math.round(neatKcal * unitMultiplier),
      tefCalories: Math.round(tefKcal * unitMultiplier),
    },

    timeframeTotals,
    goalPlan,
    weightProjections,
    activityBurnTable,
    formulaComparisons,

    bodyComposition: {
      leanBodyMassLbs: Math.round(lbmLbs),
      fatMassLbs: Math.round(fatMassLbs),
      bodyFatPct,
      ffmi,
      bmi,
      healthScore,
    },

    insights,
    recommendations,
  };
}

export function calculateTdeeOutputs(inputs: Record<string, any>): TdeeCalculatorOutputs {
  const res = calculateTdeeCalculator(inputs);
  return {
    targetCalories: res.targetCalories,
    tdee: res.tdee,
    bmr: res.bmr,
    neatCalories: res.components.neatCalories,
    tefCalories: res.components.tefCalories,
  };
}

export const calculateTDEECalculator = calculateTdeeCalculator;
