export type UnitSystem = "us" | "metric" | "other";
export type Gender = "male" | "female";

export interface BmiInput {
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
  // Single unit options
  heightMeters?: number;
  heightOnlyInches?: number;
  heightOnlyFeet?: number;
  // Activity level for calories
  activityLevel?: "sedentary" | "light" | "moderate" | "active" | "very_active";
  // Custom target BMI for goal planner
  targetBmi?: number;
}

export type BmiCategory =
  | "Severe Thinness"
  | "Moderate Thinness"
  | "Mild Thinness"
  | "Normal weight"
  | "Overweight"
  | "Obese Class I"
  | "Obese Class II"
  | "Obese Class III";

export interface IdealWeightBreakdown {
  devineKg: number;
  devineLbs: number;
  robinsonKg: number;
  robinsonLbs: number;
  millerKg: number;
  millerLbs: number;
  hamwiKg: number;
  hamwiLbs: number;
  averageKg: number;
  averageLbs: number;
}

export interface BmiResult {
  bmi: number;
  category: BmiCategory;
  categoryColor: string;
  badgeClass: string;
  bmiPrime: number;
  ponderalIndexMetric: number; // kg/m^3
  ponderalIndexImperial: number; // in/lb^1/3
  healthyWeightRangeKg: [number, number];
  healthyWeightRangeLbs: [number, number];
  heightCm: number;
  heightInches: number;
  weightKg: number;
  weightLbs: number;
  idealWeight: IdealWeightBreakdown;
  bodyFatPercentage: number;
  bmr: number; // Basal Metabolic Rate kcal
  tdee: number; // Total Daily Energy Expenditure kcal
  weightDifferenceKg: number; // Positive = need to lose, Negative = need to gain
  weightDifferenceLbs: number;
  healthRisk: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk" | "Extremely High Risk";
  healthRiskDescription: string;
  isChild: boolean;
  childPercentileEstimate?: number;
  childCategory?: "Underweight" | "Healthy Weight" | "At Risk Of Overweight" | "Overweight";
  goalPlanner: {
    targetBmi: number;
    targetWeightKg: number;
    targetWeightLbs: number;
    weightDeltaKg: number;
    weightDeltaLbs: number;
    weeksToGoal: number;
    dailyCalorieAdjustment: number;
  };
}

export function calculateBmi(input: BmiInput): BmiResult {
  const age = Math.max(2, Math.min(120, Number(input.age) || 25));
  const gender: Gender = input.gender === "female" ? "female" : "male";
  const unitSystem = input.unitSystem || "us";

  let weightKg = 70;
  let heightCm = 175;

  if (unitSystem === "us") {
    const feet = Number(input.heightFeet) || 5;
    const inches = Number(input.heightInches) || 10;
    const lbs = Number(input.weightLbs) || 160;
    const totalInches = feet * 12 + inches;
    heightCm = totalInches * 2.54;
    weightKg = lbs * 0.45359237;
  } else if (unitSystem === "metric") {
    heightCm = Number(input.heightCm) || 175;
    weightKg = Number(input.weightKg) || 70;
  } else if (unitSystem === "other") {
    if (input.heightMeters && input.heightMeters > 0) {
      heightCm = input.heightMeters * 100;
    } else if (input.heightOnlyInches && input.heightOnlyInches > 0) {
      heightCm = input.heightOnlyInches * 2.54;
    } else if (input.heightOnlyFeet && input.heightOnlyFeet > 0) {
      heightCm = input.heightOnlyFeet * 30.48;
    } else if (input.heightCm && input.heightCm > 0) {
      heightCm = input.heightCm;
    }

    if (input.weightLbs && input.weightLbs > 0) {
      weightKg = input.weightLbs * 0.45359237;
    } else if (input.weightKg && input.weightKg > 0) {
      weightKg = input.weightKg;
    }
  }

  // Safety checks
  heightCm = Math.max(50, Math.min(250, heightCm));
  weightKg = Math.max(20, Math.min(350, weightKg));

  const heightM = heightCm / 100;
  const heightInches = heightCm / 2.54;
  const weightLbs = weightKg / 0.45359237;

  // Standard BMI
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = parseFloat(bmiRaw.toFixed(1));

  // BMI Prime = BMI / 25
  const bmiPrime = parseFloat((bmi / 25).toFixed(2));

  // Ponderal Index
  const ponderalIndexMetric = parseFloat((weightKg / (heightM * heightM * heightM)).toFixed(1));
  const ponderalIndexImperial = parseFloat((heightInches / Math.cbrt(weightLbs)).toFixed(1));

  // WHO Adult Category
  let category: BmiCategory = "Normal weight";
  let categoryColor = "#10b981"; // Emerald
  let badgeClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";

  if (bmi < 16.0) {
    category = "Severe Thinness";
    categoryColor = "#3b82f6"; // Blue
    badgeClass = "bg-blue-500/15 text-blue-400 border-blue-500/30";
  } else if (bmi < 17.0) {
    category = "Moderate Thinness";
    categoryColor = "#06b6d4"; // Cyan
    badgeClass = "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
  } else if (bmi < 18.5) {
    category = "Mild Thinness";
    categoryColor = "#0ea5e9"; // Sky
    badgeClass = "bg-sky-500/15 text-sky-400 border-sky-500/30";
  } else if (bmi < 25.0) {
    category = "Normal weight";
    categoryColor = "#10b981"; // Emerald
    badgeClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  } else if (bmi < 30.0) {
    category = "Overweight";
    categoryColor = "#eab308"; // Yellow
    badgeClass = "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
  } else if (bmi < 35.0) {
    category = "Obese Class I";
    categoryColor = "#f97316"; // Orange
    badgeClass = "bg-orange-500/15 text-orange-400 border-orange-500/30";
  } else if (bmi < 40.0) {
    category = "Obese Class II";
    categoryColor = "#ef4444"; // Red
    badgeClass = "bg-red-500/15 text-red-400 border-red-500/30";
  } else {
    category = "Obese Class III";
    categoryColor = "#881337"; // Rose dark
    badgeClass = "bg-rose-600/20 text-rose-300 border-rose-600/40";
  }

  // Healthy Weight Range (BMI 18.5 to 24.9)
  const minHealthyKg = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyKg = parseFloat((24.9 * heightM * heightM).toFixed(1));
  const minHealthyLbs = parseFloat((minHealthyKg / 0.45359237).toFixed(1));
  const maxHealthyLbs = parseFloat((maxHealthyKg / 0.45359237).toFixed(1));

  // Ideal Body Weight formulas (Height over 60 inches)
  const inchesOver60 = Math.max(0, heightInches - 60);

  let devineKg = gender === "male" ? 50 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60;
  let robinsonKg = gender === "male" ? 52 + 1.9 * inchesOver60 : 49 + 1.7 * inchesOver60;
  let millerKg = gender === "male" ? 56.2 + 1.41 * inchesOver60 : 53.1 + 1.36 * inchesOver60;
  let hamwiKg = gender === "male" ? 48 + 2.7 * inchesOver60 : 45.5 + 2.2 * inchesOver60;

  if (heightInches < 60) {
    // Scaling for height below 5ft
    const factor = heightInches / 60;
    devineKg *= factor;
    robinsonKg *= factor;
    millerKg *= factor;
    hamwiKg *= factor;
  }

  const avgIdealKg = (devineKg + robinsonKg + millerKg + hamwiKg) / 4;

  const idealWeight: IdealWeightBreakdown = {
    devineKg: parseFloat(devineKg.toFixed(1)),
    devineLbs: parseFloat((devineKg / 0.45359237).toFixed(1)),
    robinsonKg: parseFloat(robinsonKg.toFixed(1)),
    robinsonLbs: parseFloat((robinsonKg / 0.45359237).toFixed(1)),
    millerKg: parseFloat(millerKg.toFixed(1)),
    millerLbs: parseFloat((millerKg / 0.45359237).toFixed(1)),
    hamwiKg: parseFloat(hamwiKg.toFixed(1)),
    hamwiLbs: parseFloat((hamwiKg / 0.45359237).toFixed(1)),
    averageKg: parseFloat(avgIdealKg.toFixed(1)),
    averageLbs: parseFloat((avgIdealKg / 0.45359237).toFixed(1)),
  };

  // Body Fat % Estimate (Deurenberg)
  let bfp = 0;
  if (age < 18) {
    const genderVal = gender === "male" ? 1 : 0;
    bfp = 1.51 * bmi - 0.7 * age - 3.6 * genderVal + 1.4;
  } else {
    const genderVal = gender === "male" ? 1 : 0;
    bfp = 1.2 * bmi + 0.23 * age - 10.8 * genderVal - 5.4;
  }
  const bodyFatPercentage = parseFloat(Math.max(3, Math.min(60, bfp)).toFixed(1));

  // BMR (Mifflin-St Jeor)
  const bmrBase = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = Math.round(gender === "male" ? bmrBase + 5 : bmrBase - 161);

  // TDEE
  const actLevel = input.activityLevel || "sedentary";
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };
  const tdee = Math.round(bmr * (multipliers[actLevel] || 1.2));

  // Weight difference from healthy range midpoint (BMI 21.7)
  let weightDifferenceKg = 0;
  if (weightKg > maxHealthyKg) {
    weightDifferenceKg = parseFloat((weightKg - maxHealthyKg).toFixed(1));
  } else if (weightKg < minHealthyKg) {
    weightDifferenceKg = parseFloat((weightKg - minHealthyKg).toFixed(1)); // negative means deficit
  }
  const weightDifferenceLbs = parseFloat((weightDifferenceKg / 0.45359237).toFixed(1));

  // Health Risk Assessment
  let healthRisk: BmiResult["healthRisk"] = "Low Risk";
  let healthRiskDescription = "Weight is within the optimal reference range for lowest overall health risks.";

  if (bmi < 18.5) {
    healthRisk = "Moderate Risk";
    healthRiskDescription = "Increased risk of nutritional deficiency, weakened immunity, and bone density loss.";
  } else if (bmi >= 25 && bmi < 30) {
    healthRisk = "Moderate Risk";
    healthRiskDescription = "Mildly elevated risk of cardiovascular strain, hypertension, and insulin resistance.";
  } else if (bmi >= 30 && bmi < 35) {
    healthRisk = "High Risk";
    healthRiskDescription = "High risk of type-2 diabetes, hypertension, coronary heart disease, and sleep apnea.";
  } else if (bmi >= 35 && bmi < 40) {
    healthRisk = "Very High Risk";
    healthRiskDescription = "Very high risk of severe metabolic disorders, joint deterioration, and cardiac complications.";
  } else if (bmi >= 40) {
    healthRisk = "Extremely High Risk";
    healthRiskDescription = "Extremely high risk of major organ disease, reduced longevity, and acute vascular events.";
  }

  // Children Percentile Estimate (Age 2-19)
  const isChild = age < 20;
  let childPercentileEstimate = 50;
  let childCategory: BmiResult["childCategory"] = undefined;

  if (isChild) {
    // CDC smooth curve approximation for child percentile
    // Baseline median BMI at age: approx 15 + (age - 2) * 0.35
    const medianBmi = 15.2 + (age - 2) * 0.38;
    const diff = bmi - medianBmi;
    if (diff < -3) {
      childPercentileEstimate = 3;
      childCategory = "Underweight";
    } else if (diff < -1.5) {
      childPercentileEstimate = 15;
      childCategory = "Healthy Weight";
    } else if (diff < 1.5) {
      childPercentileEstimate = 50;
      childCategory = "Healthy Weight";
    } else if (diff < 3.5) {
      childPercentileEstimate = 88;
      childCategory = "At Risk Of Overweight";
    } else {
      childPercentileEstimate = 97;
      childCategory = "Overweight";
    }
  }

  // Goal Planner
  const targetBmi = input.targetBmi || 22.5;
  const targetWeightKg = parseFloat((targetBmi * heightM * heightM).toFixed(1));
  const targetWeightLbs = parseFloat((targetWeightKg / 0.45359237).toFixed(1));
  const weightDeltaKg = parseFloat((weightKg - targetWeightKg).toFixed(1));
  const weightDeltaLbs = parseFloat((weightLbs - targetWeightLbs).toFixed(1));

  // Healthy weight change rate: 0.5 kg / 1.1 lbs per week
  const weeksToGoal = Math.max(1, Math.ceil(Math.abs(weightDeltaKg) / 0.5));
  // 0.5 kg fat = ~3850 kcal per week = 550 kcal/day adjustment
  const dailyCalorieAdjustment = weightDeltaKg > 0 ? -500 : weightDeltaKg < 0 ? 500 : 0;

  return {
    bmi,
    category,
    categoryColor,
    badgeClass,
    bmiPrime,
    ponderalIndexMetric,
    ponderalIndexImperial,
    healthyWeightRangeKg: [minHealthyKg, maxHealthyKg],
    healthyWeightRangeLbs: [minHealthyLbs, maxHealthyLbs],
    heightCm: Math.round(heightCm),
    heightInches: parseFloat(heightInches.toFixed(1)),
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs: parseFloat(weightLbs.toFixed(1)),
    idealWeight,
    bodyFatPercentage,
    bmr,
    tdee,
    weightDifferenceKg,
    weightDifferenceLbs,
    healthRisk,
    healthRiskDescription,
    isChild,
    childPercentileEstimate,
    childCategory,
    goalPlanner: {
      targetBmi,
      targetWeightKg,
      targetWeightLbs,
      weightDeltaKg,
      weightDeltaLbs,
      weeksToGoal,
      dailyCalorieAdjustment,
    },
  };
}
