export type UnitSystem = "us" | "metric" | "other";
export type Gender = "male" | "female";
export type BmrFormula = "mifflin" | "harris" | "katch";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active" | "extra_active";

export interface CalorieInput {
  unitSystem?: UnitSystem;
  age: number;
  gender: Gender;
  // US Units
  heightFeet?: number;
  heightInches?: number;
  weightLbs?: number;
  // Metric Units
  heightCm?: number;
  weightKg?: number;
  // Single units
  heightMeters?: number;
  heightOnlyInches?: number;
  heightOnlyFeet?: number;
  weightKgOther?: number;
  // Options
  bmrFormula?: BmrFormula;
  bodyFatPercentage?: number;
  activityLevel?: ActivityLevel;
  customTargetGoal?: "maintain" | "mild_loss" | "loss" | "extreme_loss" | "mild_gain" | "gain" | "fast_gain";
}

export interface CalorieTargetTier {
  label: string;
  weightChange: string;
  caloriesPerDay: number;
  percentOfTdee: number;
  weeklyWeightChangeLbs: number;
  weeklyWeightChangeKg: number;
}

export interface ZigzagDay {
  dayName: string;
  schedule1Calories: number;
  schedule2Calories: number;
}

export interface MacroDistribution {
  name: string;
  carbsPercent: number;
  proteinPercent: number;
  fatPercent: number;
  carbsGrams: number;
  proteinGrams: number;
  fatGrams: number;
  carbsCalories: number;
  proteinCalories: number;
  fatCalories: number;
}

export interface EnergyConversion {
  caloriesKcal: number;
  kilojoulesKj: number;
  joulesJ: number;
  megajoulesMj: number;
  wattHoursWh: number;
}

export interface CalorieResult {
  bmr: number;
  bmrFormulaUsed: string;
  tdee: number;
  activityMultiplier: number;
  heightCm: number;
  heightInches: number;
  weightKg: number;
  weightLbs: number;
  estimatedBfp: number;
  tiers: {
    maintain: CalorieTargetTier;
    mildLoss: CalorieTargetTier;
    weightLoss: CalorieTargetTier;
    extremeLoss: CalorieTargetTier;
    mildGain: CalorieTargetTier;
    weightGain: CalorieTargetTier;
    fastGain: CalorieTargetTier;
  };
  zigzagSchedule: ZigzagDay[];
  macros: {
    balanced: MacroDistribution;
    highProtein: MacroDistribution;
    lowCarb: MacroDistribution;
    keto: MacroDistribution;
  };
  energyConversion: EnergyConversion;
  activityComparisonTable: Array<{
    activityLabel: string;
    multiplier: number;
    tdee: number;
    weightLossPotentialLbs: number;
  }>;
}

export function calculateCalorie(input: CalorieInput): CalorieResult {
  const age = Math.max(15, Math.min(120, Number(input.age) || 25));
  const gender: Gender = input.gender === "female" ? "female" : "male";
  const unitSystem = input.unitSystem || "us";
  const bmrFormula = input.bmrFormula || "mifflin";

  let weightKg = 72.5;
  let heightCm = 178;

  if (unitSystem === "us") {
    const feet = Number(input.heightFeet) || 5;
    const inches = Number(input.heightInches) || 10;
    const lbs = Number(input.weightLbs) || 160;
    const totalInches = feet * 12 + inches;
    heightCm = totalInches * 2.54;
    weightKg = lbs * 0.45359237;
  } else if (unitSystem === "metric") {
    heightCm = Number(input.heightCm) || 178;
    weightKg = Number(input.weightKg) || 72.5;
  } else if (unitSystem === "other") {
    if (input.heightMeters && input.heightMeters > 0) heightCm = input.heightMeters * 100;
    else if (input.heightOnlyInches && input.heightOnlyInches > 0) heightCm = input.heightOnlyInches * 2.54;
    else if (input.heightOnlyFeet && input.heightOnlyFeet > 0) heightCm = input.heightOnlyFeet * 30.48;

    if (input.weightLbs && input.weightLbs > 0) weightKg = input.weightLbs * 0.45359237;
    else if (input.weightKg && input.weightKg > 0) weightKg = input.weightKg;
  }

  // Safety clamps
  heightCm = Math.max(50, Math.min(250, heightCm));
  weightKg = Math.max(20, Math.min(350, weightKg));

  const heightInches = parseFloat((heightCm / 2.54).toFixed(1));
  const weightLbs = parseFloat((weightKg / 0.45359237).toFixed(1));

  // Body Fat % Estimation (Deurenberg formula if not provided)
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  let estimatedBfp = input.bodyFatPercentage && input.bodyFatPercentage > 0 ? input.bodyFatPercentage : 0;
  if (!estimatedBfp) {
    const genderVal = gender === "male" ? 1 : 0;
    estimatedBfp = parseFloat(Math.max(5, Math.min(60, 1.2 * bmi + 0.23 * age - 10.8 * genderVal - 5.4)).toFixed(1));
  }

  // BMR Calculation
  let bmr = 0;
  let bmrFormulaUsed = "Mifflin-St Jeor";

  if (bmrFormula === "mifflin") {
    bmrFormulaUsed = "Mifflin-St Jeor Equation";
    const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
    bmr = gender === "male" ? base + 5 : base - 161;
  } else if (bmrFormula === "harris") {
    bmrFormulaUsed = "Revised Harris-Benedict Equation";
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
    }
  } else if (bmrFormula === "katch") {
    bmrFormulaUsed = "Katch-McArdle Equation";
    const lbmKg = weightKg * (1 - estimatedBfp / 100);
    bmr = 370 + 21.6 * lbmKg;
  }

  bmr = Math.round(bmr);

  // Activity Level Multiplier
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
  const tdee = Math.round(bmr * activityMultiplier);

  // Target Tiers
  const buildTier = (
    label: string,
    weightChange: string,
    calDelta: number,
    weeklyLbs: number
  ): CalorieTargetTier => {
    const cals = Math.max(1000, Math.round(tdee + calDelta));
    const pct = Math.round((cals / tdee) * 100);
    return {
      label,
      weightChange,
      caloriesPerDay: cals,
      percentOfTdee: pct,
      weeklyWeightChangeLbs: weeklyLbs,
      weeklyWeightChangeKg: parseFloat((weeklyLbs * 0.45359237).toFixed(2)),
    };
  };

  const tiers = {
    maintain: buildTier("Maintain Weight", "0 lb/week", 0, 0),
    mildLoss: buildTier("Mild Weight Loss", "0.5 lb/week (0.25 kg/wk)", -250, -0.5),
    weightLoss: buildTier("Weight Loss", "1.0 lb/week (0.5 kg/wk)", -500, -1.0),
    extremeLoss: buildTier("Extreme Weight Loss", "2.0 lb/week (1.0 kg/wk)", -1000, -2.0),
    mildGain: buildTier("Mild Weight Gain", "+0.5 lb/week (+0.25 kg/wk)", 250, 0.5),
    weightGain: buildTier("Weight Gain", "+1.0 lb/week (+0.5 kg/wk)", 500, 1.0),
    fastGain: buildTier("Fast Weight Gain", "+2.0 lb/week (+1.0 kg/wk)", 1000, 2.0),
  };

  // Determine active target goal for Zigzag & Macros
  const selectedGoal = input.customTargetGoal || "loss";
  const targetGoalCals =
    selectedGoal === "maintain"
      ? tiers.maintain.caloriesPerDay
      : selectedGoal === "mild_loss"
      ? tiers.mildLoss.caloriesPerDay
      : selectedGoal === "loss"
      ? tiers.weightLoss.caloriesPerDay
      : selectedGoal === "extreme_loss"
      ? tiers.extremeLoss.caloriesPerDay
      : selectedGoal === "mild_gain"
      ? tiers.mildGain.caloriesPerDay
      : selectedGoal === "gain"
      ? tiers.weightGain.caloriesPerDay
      : tiers.fastGain.caloriesPerDay;

  // Zigzag Calorie Cycling Schedules
  // Schedule 1: 3 High Days (TDEE maintenance) + 4 Low Days
  const schedule1HighCals = tdee;
  const schedule1LowCals = Math.round((targetGoalCals * 7 - schedule1HighCals * 3) / 4);

  // Schedule 2: Progressive Wave (Mon lowest to Sun highest)
  const waveFactors = [0.85, 0.92, 0.98, 1.05, 1.10, 1.15, 0.95];
  const waveAvg = waveFactors.reduce((a, b) => a + b, 0) / 7;

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const zigzagSchedule: ZigzagDay[] = dayNames.map((dayName, idx) => {
    // Schedule 1: Sun, Wed, Sat high; Mon, Tue, Thu, Fri low
    const isHigh = idx === 0 || idx === 3 || idx === 6;
    const s1 = isHigh ? schedule1HighCals : schedule1LowCals;
    const s2 = Math.round(targetGoalCals * (waveFactors[idx] / waveAvg));
    return {
      dayName,
      schedule1Calories: Math.max(1000, s1),
      schedule2Calories: Math.max(1000, s2),
    };
  });

  // Macro Distributions
  const buildMacro = (name: string, cPct: number, pPct: number, fPct: number): MacroDistribution => {
    const cCal = Math.round(targetGoalCals * (cPct / 100));
    const pCal = Math.round(targetGoalCals * (pPct / 100));
    const fCal = Math.round(targetGoalCals * (fPct / 100));
    return {
      name,
      carbsPercent: cPct,
      proteinPercent: pPct,
      fatPercent: fPct,
      carbsCalories: cCal,
      proteinCalories: pCal,
      fatCalories: fCal,
      carbsGrams: Math.round(cCal / 4),
      proteinGrams: Math.round(pCal / 4),
      fatGrams: Math.round(fCal / 9),
    };
  };

  const macros = {
    balanced: buildMacro("Balanced (50/20/30)", 50, 20, 30),
    highProtein: buildMacro("High Protein (40/30/30)", 40, 30, 30),
    lowCarb: buildMacro("Low Carb (25/35/40)", 25, 35, 40),
    keto: buildMacro("Ketogenic (5/25/70)", 5, 25, 70),
  };

  // Energy Conversion (for targetGoalCals)
  const energyConversion: EnergyConversion = {
    caloriesKcal: targetGoalCals,
    kilojoulesKj: parseFloat((targetGoalCals * 4.1868).toFixed(1)),
    joulesJ: Math.round(targetGoalCals * 4186.8),
    megajoulesMj: parseFloat((targetGoalCals * 0.0041868).toFixed(3)),
    wattHoursWh: parseFloat((targetGoalCals * 1.163).toFixed(1)),
  };

  // Activity Comparison Table
  const actLevelsList: Array<{ label: string; mult: number }> = [
    { label: "Sedentary (little to no exercise)", mult: 1.2 },
    { label: "Light (exercise 1-3 times/week)", mult: 1.375 },
    { label: "Moderate (exercise 4-5 times/week)", mult: 1.55 },
    { label: "Active (daily or intense 3-4x/week)", mult: 1.725 },
    { label: "Very Active (intense 6-7 times/week)", mult: 1.9 },
    { label: "Extra Active (physical job/training)", mult: 2.0 },
  ];

  const activityComparisonTable = actLevelsList.map((item) => {
    const actTdee = Math.round(bmr * item.mult);
    const extraBurnPerDay = actTdee - bmr; // Burn above BMR
    const weeklyBurnLbs = parseFloat(((extraBurnPerDay * 7) / 3500).toFixed(1));
    return {
      activityLabel: item.label,
      multiplier: item.mult,
      tdee: actTdee,
      weightLossPotentialLbs: weeklyBurnLbs,
    };
  });

  return {
    bmr,
    bmrFormulaUsed,
    tdee,
    activityMultiplier,
    heightCm: Math.round(heightCm),
    heightInches,
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs,
    estimatedBfp,
    tiers,
    zigzagSchedule,
    macros,
    energyConversion,
    activityComparisonTable,
  };
}
