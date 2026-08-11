export type UnitSystem = "us" | "metric" | "other";
export type Gender = "male" | "female";
export type BmrFormula = "mifflin" | "harris" | "katch";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active" | "extra_active";
export type SmartGoal = "aggressive_cut" | "slow_cut" | "maintain" | "slow_bulk" | "aggressive_bulk" | "performance";

export interface BmrInput {
  unitSystem?: UnitSystem;
  gender: Gender;
  age: number;
  // US Units
  heightFeet?: number;
  heightInches?: number;
  weightLbs?: number;
  // Metric Units
  heightCm?: number;
  weightKg?: number;
  // Other units
  heightMeters?: number;
  weightKgOther?: number;
  // Options
  bmrFormula?: BmrFormula;
  bodyFatPercentage?: number;
  activityLevel?: ActivityLevel;
  selectedGoal?: SmartGoal;
  // Scenario Planner Goal
  scenarioGoalWeightLbs?: number;
  scenarioGoalActivity?: ActivityLevel;
}

export interface SmartGoalInfo {
  goalKey: SmartGoal;
  label: string;
  description: string;
  caloricDelta: number;
  targetCalories: number;
  weeklyWeightChangeLbs: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
}

export interface HydrationInfo {
  waterLiters: number;
  waterOunces: number;
  waterCups: number;
}

export interface BmrResult {
  mifflinBmr: number;
  harrisBmr: number;
  katchBmr: number;
  selectedBmr: number;
  formulaUsedName: string;
  tdee: number;
  activityMultiplier: number;
  heightCm: number;
  heightInches: number;
  weightKg: number;
  weightLbs: number;
  bmi: number;
  estimatedBfp: number;
  fatMassLbs: number;
  leanMassLbs: number;
  ffmi: number;
  ffmiNormalized: number;
  smartGoalInfo: SmartGoalInfo;
  hydration: HydrationInfo;
  activityTiers: Array<{
    levelKey: ActivityLevel;
    label: string;
    multiplier: number;
    tdee: number;
    weightLossCals: number;
    weightGainCals: number;
  }>;
  scenarioComparison: {
    currentWeightLbs: number;
    goalWeightLbs: number;
    weightDeltaLbs: number; // positive = to lose, negative = to gain
    currentTdee: number;
    goalTdee: number;
    weeklyProgressLbs: number;
    estimatedWeeks: number;
  };
}

export function calculateBmr(input: BmrInput): BmrResult {
  const gender: Gender = input.gender === "female" ? "female" : "male";
  const age = Math.max(15, Math.min(120, Number(input.age) || 25));
  const unitSystem = input.unitSystem || "us";
  const bmrFormula = input.bmrFormula || "mifflin";

  let heightCm = 178;
  let weightKg = 72.5;

  if (unitSystem === "us") {
    const feet = Number(input.heightFeet) || 5;
    const inches = Number(input.heightInches) || 10;
    heightCm = (feet * 12 + inches) * 2.54;
    weightKg = (Number(input.weightLbs) || 160) * 0.45359237;
  } else if (unitSystem === "metric") {
    heightCm = Number(input.heightCm) || 178;
    weightKg = Number(input.weightKg) || 72.5;
  } else if (unitSystem === "other") {
    if (input.heightMeters && input.heightMeters > 0) heightCm = input.heightMeters * 100;
    if (input.weightKgOther && input.weightKgOther > 0) weightKg = input.weightKgOther;
  }

  // Safety clamps
  heightCm = Math.max(80, Math.min(250, heightCm));
  weightKg = Math.max(25, Math.min(350, weightKg));

  const heightInches = parseFloat((heightCm / 2.54).toFixed(1));
  const weightLbs = parseFloat((weightKg / 0.45359237).toFixed(1));
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  // Body Fat % Estimation (Deurenberg)
  const genderVal = gender === "male" ? 1 : 0;
  let estimatedBfp = input.bodyFatPercentage && input.bodyFatPercentage > 0 ? input.bodyFatPercentage : 0;
  if (!estimatedBfp) {
    estimatedBfp = parseFloat(Math.max(4, Math.min(60, 1.2 * bmi + 0.23 * age - 10.8 * genderVal - 5.4)).toFixed(1));
  }

  const fatMassLbs = parseFloat(((weightLbs * estimatedBfp) / 100).toFixed(1));
  const leanMassLbs = parseFloat((weightLbs - fatMassLbs).toFixed(1));
  const leanMassKg = parseFloat((weightKg * (1 - estimatedBfp / 100)).toFixed(1));

  // FFMI
  const ffmi = parseFloat((leanMassKg / (heightM * heightM)).toFixed(1));
  const ffmiNormalized = parseFloat((ffmi + 6.1 * (1.8 - heightM)).toFixed(1));

  // 1. Mifflin-St Jeor Equation
  const mifflinBase = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const mifflinBmr = Math.round(gender === "male" ? mifflinBase + 5 : mifflinBase - 161);

  // 2. Revised Harris-Benedict Equation
  let harrisBmr = 0;
  if (gender === "male") {
    harrisBmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
  } else {
    harrisBmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  }
  harrisBmr = Math.round(harrisBmr);

  // 3. Katch-McArdle Formula
  const katchBmr = Math.round(370 + 21.6 * leanMassKg);

  // Selected BMR
  let selectedBmr = mifflinBmr;
  let formulaUsedName = "Mifflin-St Jeor Equation";
  if (bmrFormula === "harris") {
    selectedBmr = harrisBmr;
    formulaUsedName = "Revised Harris-Benedict Equation";
  } else if (bmrFormula === "katch") {
    selectedBmr = katchBmr;
    formulaUsedName = "Katch-McArdle Equation";
  }

  // Activity Multipliers
  const actLevel = input.activityLevel || "moderate";
  const multipliers: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
    extra_active: 2.0,
  };
  const activityMultiplier = multipliers[actLevel] || 1.55;
  const tdee = Math.round(selectedBmr * activityMultiplier);

  // Smart Goals System
  const goal = input.selectedGoal || "maintain";
  const getGoalInfo = (g: SmartGoal, baseTdee: number): SmartGoalInfo => {
    let delta = 0;
    let weeklyLbs = 0;
    let pPct = 25;
    let cPct = 50;
    let fPct = 25;
    let label = "Maintain Weight";
    let desc = "Balanced caloric intake matching exact daily TDEE expenditure.";

    if (g === "aggressive_cut") {
      delta = -750;
      weeklyLbs = -1.5;
      pPct = 40;
      cPct = 35;
      fPct = 25;
      label = "Aggressive Cut";
      desc = "Rapid fat loss targeting 1.5 lbs/week deficit with high protein protection.";
    } else if (g === "slow_cut") {
      delta = -350;
      weeklyLbs = -0.7;
      pPct = 35;
      cPct = 40;
      fPct = 25;
      label = "Slow Cut (Fat Loss)";
      desc = "Sustainable fat loss preserving peak athletic muscle mass.";
    } else if (g === "slow_bulk") {
      delta = 250;
      weeklyLbs = 0.5;
      pPct = 30;
      cPct = 45;
      fPct = 25;
      label = "Slow Bulk (Muscle Gain)";
      desc = "Lean muscle hypertrophy with minimal body fat accumulation.";
    } else if (g === "aggressive_bulk") {
      delta = 500;
      weeklyLbs = 1.0;
      pPct = 25;
      cPct = 50;
      fPct = 25;
      label = "Aggressive Bulk";
      desc = "Accelerated muscle mass & strength building surplus.";
    } else if (g === "performance") {
      delta = 0;
      weeklyLbs = 0;
      pPct = 30;
      cPct = 50;
      fPct = 20;
      label = "Athletic Performance";
      desc = "High-carbohydrate energy availability for intense athletic conditioning.";
    }

    const targetCals = Math.max(1200, Math.round(baseTdee + delta));
    const pCal = Math.round(targetCals * (pPct / 100));
    const cCal = Math.round(targetCals * (cPct / 100));
    const fCal = Math.round(targetCals * (fPct / 100));

    return {
      goalKey: g,
      label,
      description: desc,
      caloricDelta: delta,
      targetCalories: targetCals,
      weeklyWeightChangeLbs: weeklyLbs,
      proteinGrams: Math.round(pCal / 4),
      carbsGrams: Math.round(cCal / 4),
      fatGrams: Math.round(fCal / 9),
      proteinCalories: pCal,
      carbsCalories: cCal,
      fatCalories: fCal,
    };
  };

  const smartGoalInfo = getGoalInfo(goal, tdee);

  // Daily Water Intake (Hydration)
  const actBonusLiters = actLevel === "sedentary" ? 0 : actLevel === "light" ? 0.35 : actLevel === "moderate" ? 0.7 : 1.0;
  const baseWaterLiters = weightKg * 0.035 + actBonusLiters;
  const waterLiters = parseFloat(Math.max(1.8, Math.min(6.0, baseWaterLiters)).toFixed(1));
  const waterOunces = Math.round(waterLiters * 33.814);
  const waterCups = Math.round(waterOunces / 8);

  const hydration: HydrationInfo = {
    waterLiters,
    waterOunces,
    waterCups,
  };

  // Activity Level Comparison Tiers
  const actLevelsList: Array<{ key: ActivityLevel; label: string; mult: number }> = [
    { key: "sedentary", label: "Sedentary (little to no exercise)", mult: 1.2 },
    { key: "light", label: "Lightly Active (1–3 days/wk)", mult: 1.375 },
    { key: "moderate", label: "Moderately Active (4–5 days/wk)", mult: 1.55 },
    { key: "active", label: "Very Active (daily or intense 3-4x/wk)", mult: 1.725 },
    { key: "very_active", label: "Athlete / Intense (6–7 days/wk)", mult: 1.9 },
    { key: "extra_active", label: "Extra Active (physical job/training)", mult: 2.0 },
  ];

  const activityTiers = actLevelsList.map((item) => {
    const tierTdee = Math.round(selectedBmr * item.mult);
    return {
      levelKey: item.key,
      label: item.label,
      multiplier: item.mult,
      tdee: tierTdee,
      weightLossCals: Math.max(1000, Math.round(tierTdee - 500)),
      weightGainCals: Math.round(tierTdee + 500),
    };
  });

  // Scenario Comparison
  const goalWeightLbs = input.scenarioGoalWeightLbs && input.scenarioGoalWeightLbs > 0 ? input.scenarioGoalWeightLbs : Math.round(weightLbs - 10);
  const goalWeightKg = goalWeightLbs * 0.45359237;
  const goalBmrBase = 10 * goalWeightKg + 6.25 * heightCm - 5 * age;
  const goalBmr = Math.round(gender === "male" ? goalBmrBase + 5 : goalBmrBase - 161);
  const goalActLevel = input.scenarioGoalActivity || actLevel;
  const goalTdee = Math.round(goalBmr * multipliers[goalActLevel]);

  const weightDeltaLbs = parseFloat((weightLbs - goalWeightLbs).toFixed(1));
  const weeklyProgressLbs = 1.0;
  const estimatedWeeks = Math.max(0, Math.ceil(Math.abs(weightDeltaLbs) / weeklyProgressLbs));

  return {
    mifflinBmr,
    harrisBmr,
    katchBmr,
    selectedBmr,
    formulaUsedName,
    tdee,
    activityMultiplier,
    heightCm: Math.round(heightCm),
    heightInches,
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs,
    bmi,
    estimatedBfp,
    fatMassLbs,
    leanMassLbs,
    ffmi,
    ffmiNormalized,
    smartGoalInfo,
    hydration,
    activityTiers,
    scenarioComparison: {
      currentWeightLbs: weightLbs,
      goalWeightLbs,
      weightDeltaLbs,
      currentTdee: tdee,
      goalTdee,
      weeklyProgressLbs,
      estimatedWeeks,
    },
  };
}
