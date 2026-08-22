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

export type AdultBmiCategory =
  | "Severe Thinness"
  | "Moderate Thinness"
  | "Mild Thinness"
  | "Normal weight"
  | "Overweight"
  | "Obese Class I"
  | "Obese Class II"
  | "Obese Class III";

export type ChildBmiCategory =
  | "Pediatric Underweight"
  | "Pediatric Healthy Weight"
  | "Pediatric Overweight"
  | "Pediatric Obesity";

export type BmiCategory = AdultBmiCategory | ChildBmiCategory;

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
  bmiRaw: number;
  category: BmiCategory;
  adultCategory: AdultBmiCategory;
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
  healthRisk: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk" | "Extremely High Risk" | "Healthy Pediatric Growth";
  healthRiskDescription: string;
  isChild: boolean;
  childPercentileEstimate?: number;
  childCategory?: "Underweight" | "Healthy Weight" | "Overweight" | "Obesity";
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

// CDC LMS Growth Reference Tables for BMI-for-Age (Ages 2 to 20)
interface LmsParameters {
  L: number;
  M: number;
  S: number;
}

const CDC_LMS_BOYS: Record<number, LmsParameters> = {
  2: { L: -1.61, M: 16.57, S: 0.080 },
  3: { L: -1.85, M: 15.93, S: 0.078 },
  4: { L: -2.07, M: 15.52, S: 0.079 },
  5: { L: -2.23, M: 15.34, S: 0.082 },
  6: { L: -2.34, M: 15.37, S: 0.088 },
  7: { L: -2.40, M: 15.58, S: 0.096 },
  8: { L: -2.41, M: 15.92, S: 0.106 },
  9: { L: -2.38, M: 16.37, S: 0.116 },
  10: { L: -2.31, M: 16.90, S: 0.126 },
  11: { L: -2.22, M: 17.48, S: 0.134 },
  12: { L: -2.11, M: 18.10, S: 0.141 },
  13: { L: -1.98, M: 18.74, S: 0.146 },
  14: { L: -1.84, M: 19.39, S: 0.150 },
  15: { L: -1.70, M: 20.03, S: 0.152 },
  16: { L: -1.55, M: 20.65, S: 0.153 },
  17: { L: -1.40, M: 21.24, S: 0.152 },
  18: { L: -1.26, M: 21.80, S: 0.151 },
  19: { L: -1.12, M: 22.31, S: 0.150 },
  20: { L: -0.99, M: 22.78, S: 0.148 },
};

const CDC_LMS_GIRLS: Record<number, LmsParameters> = {
  2: { L: -2.01, M: 16.43, S: 0.084 },
  3: { L: -2.21, M: 15.80, S: 0.083 },
  4: { L: -2.37, M: 15.36, S: 0.084 },
  5: { L: -2.46, M: 15.22, S: 0.087 },
  6: { L: -2.49, M: 15.26, S: 0.093 },
  7: { L: -2.46, M: 15.48, S: 0.101 },
  8: { L: -2.38, M: 15.84, S: 0.111 },
  9: { L: -2.27, M: 16.32, S: 0.121 },
  10: { L: -2.14, M: 16.88, S: 0.130 },
  11: { L: -2.00, M: 17.51, S: 0.137 },
  12: { L: -1.85, M: 18.17, S: 0.143 },
  13: { L: -1.70, M: 18.84, S: 0.147 },
  14: { L: -1.56, M: 19.49, S: 0.149 },
  15: { L: -1.43, M: 20.09, S: 0.149 },
  16: { L: -1.30, M: 20.62, S: 0.148 },
  17: { L: -1.19, M: 21.07, S: 0.146 },
  18: { L: -1.09, M: 21.43, S: 0.143 },
  19: { L: -1.01, M: 21.68, S: 0.140 },
  20: { L: -0.94, M: 21.84, S: 0.137 },
};

function standardNormalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

function calculateCdcPediatricPercentile(bmi: number, age: number, gender: Gender): number {
  const roundedAge = Math.max(2, Math.min(20, Math.round(age)));
  const table = gender === "female" ? CDC_LMS_GIRLS : CDC_LMS_BOYS;
  const lms = table[roundedAge] || table[20];
  const { L, M, S } = lms;
  const z = (Math.pow(bmi / M, L) - 1) / (L * S);
  const percentile = standardNormalCDF(z) * 100;
  return Math.max(0.1, Math.min(99.9, parseFloat(percentile.toFixed(1))));
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

  // Safety bounds
  heightCm = Math.max(50, Math.min(250, heightCm));
  weightKg = Math.max(20, Math.min(350, weightKg));

  const heightM = heightCm / 100;
  const heightInches = heightCm / 2.54;
  const weightLbs = weightKg / 0.45359237;

  // Raw floating-point BMI for exact boundary checks
  const bmiRaw = weightKg / (heightM * heightM);
  // Display BMI rounded to 1 decimal
  const bmi = parseFloat(bmiRaw.toFixed(1));

  // BMI Prime = BMI / 25
  const bmiPrime = parseFloat((bmi / 25).toFixed(2));

  // Ponderal Index
  const ponderalIndexMetric = parseFloat((weightKg / (heightM * heightM * heightM)).toFixed(1));
  const ponderalIndexImperial = parseFloat((heightInches / Math.cbrt(weightLbs)).toFixed(1));

  // Adult WHO Category evaluation using raw unrounded BMI
  let adultCategory: AdultBmiCategory = "Normal weight";
  let adultCategoryColor = "#10b981"; // Emerald
  let adultBadgeClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";

  if (bmiRaw < 16.0) {
    adultCategory = "Severe Thinness";
    adultCategoryColor = "#3b82f6";
    adultBadgeClass = "bg-blue-500/15 text-blue-400 border-blue-500/30";
  } else if (bmiRaw < 17.0) {
    adultCategory = "Moderate Thinness";
    adultCategoryColor = "#06b6d4";
    adultBadgeClass = "bg-cyan-500/15 text-cyan-400 border-cyan-500/30";
  } else if (bmiRaw < 18.5) {
    adultCategory = "Mild Thinness";
    adultCategoryColor = "#0ea5e9";
    adultBadgeClass = "bg-sky-500/15 text-sky-400 border-sky-500/30";
  } else if (bmiRaw < 25.0) {
    adultCategory = "Normal weight";
    adultCategoryColor = "#10b981";
    adultBadgeClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  } else if (bmiRaw < 30.0) {
    adultCategory = "Overweight";
    adultCategoryColor = "#eab308";
    adultBadgeClass = "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
  } else if (bmiRaw < 35.0) {
    adultCategory = "Obese Class I";
    adultCategoryColor = "#f97316";
    adultBadgeClass = "bg-orange-500/15 text-orange-400 border-orange-500/30";
  } else if (bmiRaw < 40.0) {
    adultCategory = "Obese Class II";
    adultCategoryColor = "#ef4444";
    adultBadgeClass = "bg-red-500/15 text-red-400 border-red-500/30";
  } else {
    adultCategory = "Obese Class III";
    adultCategoryColor = "#881337";
    adultBadgeClass = "bg-rose-600/20 text-rose-300 border-rose-600/40";
  }

  // Pediatric Evaluation for Ages 2-19
  const isChild = age < 20;
  let childPercentileEstimate: number | undefined = undefined;
  let childCategory: BmiResult["childCategory"] = undefined;

  let primaryCategory: BmiCategory = adultCategory;
  let primaryCategoryColor = adultCategoryColor;
  let primaryBadgeClass = adultBadgeClass;

  let healthRisk: BmiResult["healthRisk"] = "Low Risk";
  let healthRiskDescription = "Weight is within the optimal reference range for lowest overall health risks.";

  if (isChild) {
    childPercentileEstimate = calculateCdcPediatricPercentile(bmiRaw, age, gender);

    if (childPercentileEstimate < 5.0) {
      childCategory = "Underweight";
      primaryCategory = "Pediatric Underweight";
      primaryCategoryColor = "#0ea5e9"; // Sky
      primaryBadgeClass = "bg-sky-500/15 text-sky-400 border-sky-500/30";
      healthRisk = "Moderate Risk";
      healthRiskDescription = "Pediatric BMI is below the 5th percentile for age and sex. Clinical evaluation for optimal nutrition and growth trajectory is recommended.";
    } else if (childPercentileEstimate < 85.0) {
      childCategory = "Healthy Weight";
      primaryCategory = "Pediatric Healthy Weight";
      primaryCategoryColor = "#10b981"; // Emerald
      primaryBadgeClass = "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      healthRisk = "Healthy Pediatric Growth";
      healthRiskDescription = "Pediatric BMI is between the 5th and 85th percentiles for age and sex, representing an optimal developmental growth trajectory.";
    } else if (childPercentileEstimate < 95.0) {
      childCategory = "Overweight";
      primaryCategory = "Pediatric Overweight";
      primaryCategoryColor = "#eab308"; // Yellow
      primaryBadgeClass = "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
      healthRisk = "Moderate Risk";
      healthRiskDescription = "Pediatric BMI is between the 85th and 95th percentiles. Encouraging active physical play and nutrient-dense dietary patterns is advised.";
    } else {
      childCategory = "Obesity";
      primaryCategory = "Pediatric Obesity";
      primaryCategoryColor = "#ef4444"; // Red
      primaryBadgeClass = "bg-red-500/15 text-red-400 border-red-500/30";
      healthRisk = "High Risk";
      healthRiskDescription = "Pediatric BMI is at or above the 95th percentile. Pediatrician-guided lifestyle, activity, and metabolic assessment is recommended.";
    }
  } else {
    // Adult Health Risk Assessment
    if (bmiRaw < 18.5) {
      healthRisk = "Moderate Risk";
      healthRiskDescription = "Increased risk of nutritional deficiency, weakened immunity, and bone density loss.";
    } else if (bmiRaw >= 25 && bmiRaw < 30) {
      healthRisk = "Moderate Risk";
      healthRiskDescription = "Mildly elevated risk of cardiovascular strain, hypertension, and insulin resistance.";
    } else if (bmiRaw >= 30 && bmiRaw < 35) {
      healthRisk = "High Risk";
      healthRiskDescription = "High risk of type-2 diabetes, hypertension, coronary heart disease, and sleep apnea.";
    } else if (bmiRaw >= 35 && bmiRaw < 40) {
      healthRisk = "Very High Risk";
      healthRiskDescription = "Very high risk of severe metabolic disorders, joint deterioration, and cardiac complications.";
    } else if (bmiRaw >= 40) {
      healthRisk = "Extremely High Risk";
      healthRiskDescription = "Extremely high risk of major organ disease, reduced longevity, and acute vascular events.";
    }
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

  // Weight difference from healthy range
  let weightDifferenceKg = 0;
  if (weightKg > maxHealthyKg) {
    weightDifferenceKg = parseFloat((weightKg - maxHealthyKg).toFixed(1));
  } else if (weightKg < minHealthyKg) {
    weightDifferenceKg = parseFloat((weightKg - minHealthyKg).toFixed(1));
  }
  const weightDifferenceLbs = parseFloat((weightDifferenceKg / 0.45359237).toFixed(1));

  // Goal Planner
  const targetBmi = input.targetBmi || 22.5;
  const targetWeightKg = parseFloat((targetBmi * heightM * heightM).toFixed(1));
  const targetWeightLbs = parseFloat((targetWeightKg / 0.45359237).toFixed(1));
  const weightDeltaKg = parseFloat((weightKg - targetWeightKg).toFixed(1));
  const weightDeltaLbs = parseFloat((weightLbs - targetWeightLbs).toFixed(1));

  // Healthy weight change rate: 0.5 kg / 1.1 lbs per week
  const weeksToGoal = Math.max(1, Math.ceil(Math.abs(weightDeltaKg) / 0.5));
  const dailyCalorieAdjustment = weightDeltaKg > 0 ? -500 : weightDeltaKg < 0 ? 500 : 0;

  return {
    bmi,
    bmiRaw,
    category: primaryCategory,
    adultCategory,
    categoryColor: primaryCategoryColor,
    badgeClass: primaryBadgeClass,
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
