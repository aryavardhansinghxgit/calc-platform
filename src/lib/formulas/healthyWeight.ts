export type UnitSystem = "imperial" | "metric";
export type Gender = "male" | "female";
export type BodyFrame = "small" | "medium" | "large";
export type FrameMode = "auto" | "manual";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete";

export interface HealthyWeightInput {
  unitSystem: UnitSystem;
  gender: Gender;
  bodyFrame?: BodyFrame;
  frameMode?: FrameMode;
  age: number;
  heightInches?: number; // imperial
  heightCm?: number; // metric
  weightLbs?: number; // imperial
  weightKg?: number; // metric
  wristInches?: number;
  wristCm?: number;
  activityLevel?: ActivityLevel;
  isPregnant?: boolean;
}

export interface MethodWeightResult {
  methodName: string;
  idealWeightKg: number;
  idealWeightLbs: number;
  differenceLbs: number;
  status: "Inside Healthy Range" | "Above Target" | "Below Target";
  description: string;
}

export interface HealthyWeightResult {
  currentWeightLbs: number;
  currentWeightKg: number;
  bmi: number;
  bmiPrime: number;
  bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese Class I" | "Obese Class II" | "Obese Class III";
  isSub5Feet: boolean;
  frameMode: FrameMode;
  detectedFrame: BodyFrame;
  // WHO Range (strictly unscaled by frame size)
  minHealthyWeightLbs: number;
  minHealthyWeightKg: number;
  maxHealthyWeightLbs: number;
  maxHealthyWeightKg: number;
  targetHealthyWeightLbs: number;
  targetHealthyWeightKg: number;
  // Frame-adjusted Reference Target (Consensus IBW scaled by frame size)
  frameAdjustedTargetLbs: number;
  frameAdjustedTargetKg: number;
  frameAdjustedMinWeightLbs: number;
  frameAdjustedMaxWeightLbs: number;
  frameMultiplier: number;
  // Consensus IBW
  consensusIdealWeightLbs: number;
  consensusIdealWeightKg: number;
  weightDifferenceFromTargetLbs: number;
  weightDifferenceFromTargetKg: number;
  // Smart Insights & Recommendations
  insightMessage: string;
  recommendationType: "maintain" | "lose" | "gain";
  // Timeline Projections
  timelinePlans: Array<{
    ratePerWeekLbs: number;
    weeksToTarget: number;
    dailyCaloricAdjustmentKcal: number;
  }>;
  methods: MethodWeightResult[];
}

export function evaluateFrameSizeFromWrist(
  gender: Gender,
  heightCm: number,
  wristCm?: number,
  wristInches?: number
): BodyFrame {
  let wIn = wristInches && wristInches > 0 ? wristInches : 0;
  if (!wIn && wristCm && wristCm > 0) {
    wIn = wristCm / 2.54;
  }
  if (!wIn) return "medium";

  const heightIn = heightCm / 2.54;

  if (gender === "female") {
    if (heightIn < 62) {
      if (wIn < 5.5) return "small";
      if (wIn <= 5.75) return "medium";
      return "large";
    } else if (heightIn <= 65) {
      if (wIn < 6.0) return "small";
      if (wIn <= 6.25) return "medium";
      return "large";
    } else {
      if (wIn < 6.25) return "small";
      if (wIn <= 6.5) return "medium";
      return "large";
    }
  } else {
    if (wIn < 6.5) return "small";
    if (wIn <= 7.5) return "medium";
    return "large";
  }
}

export function calculateHealthyWeight(input: HealthyWeightInput): HealthyWeightResult {
  const gender = input.gender;
  const unitSystem = input.unitSystem;
  const frameMode: FrameMode = input.frameMode || "manual";
  const age = Math.max(18, Math.min(100, Number(input.age) || 30));

  let heightCm = 175;
  if (unitSystem === "imperial") {
    heightCm = (Number(input.heightInches) || 70) * 2.54;
  } else {
    heightCm = Number(input.heightCm) || 175;
  }
  heightCm = Math.max(100, Math.min(250, heightCm));

  let frame: BodyFrame = input.bodyFrame || "medium";
  if (frameMode === "auto") {
    frame = evaluateFrameSizeFromWrist(gender, heightCm, input.wristCm, input.wristInches);
  }

  let weightKg = 70;
  if (unitSystem === "imperial") {
    weightKg = (Number(input.weightLbs) || 160) / 2.20462;
  } else {
    weightKg = Number(input.weightKg) || 72.5;
  }
  weightKg = Math.max(20, Math.min(350, weightKg));

  const heightM = heightCm / 100;
  const heightInchesTotal = heightCm / 2.54;
  const inchesOver60 = Math.max(0, heightInchesTotal - 60);
  const isSub5Feet = heightInchesTotal < 60;

  // 1. BMI & BMI Prime
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));
  const bmiPrime = parseFloat((bmi / 25.0).toFixed(2));

  let bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese Class I" | "Obese Class II" | "Obese Class III" = "Normal Weight";
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi <= 24.9) bmiCategory = "Normal Weight";
  else if (bmi <= 29.9) bmiCategory = "Overweight";
  else if (bmi <= 34.9) bmiCategory = "Obese Class I";
  else if (bmi <= 39.9) bmiCategory = "Obese Class II";
  else bmiCategory = "Obese Class III";

  // 2. WHO Healthy Weight Range (BMI 18.5 – 24.9) — strictly frame-independent
  const minHealthyKg = 18.5 * heightM * heightM;
  const maxHealthyKg = 24.9 * heightM * heightM;
  const targetHealthyKg = 21.7 * heightM * heightM;

  const minHealthyLbs = parseFloat((minHealthyKg * 2.20462).toFixed(1));
  const maxHealthyLbs = parseFloat((maxHealthyKg * 2.20462).toFixed(1));
  const targetHealthyLbs = parseFloat((targetHealthyKg * 2.20462).toFixed(1));

  // 3. Body Frame Size Multipliers
  let frameMultiplier = 1.0;
  if (frame === "small") frameMultiplier = 0.90;
  else if (frame === "large") frameMultiplier = 1.10;

  // Legacy compatibility fields (deprecated in UI)
  const frameAdjustedMinLbs = parseFloat((minHealthyLbs * frameMultiplier).toFixed(1));
  const frameAdjustedMaxLbs = parseFloat((maxHealthyLbs * frameMultiplier).toFixed(1));

  // 4. Clinical Ideal Body Weight Methods
  // Hamwi (1964)
  const hamwiKg = (gender === "male" ? 48.0 + 2.7 * inchesOver60 : 45.5 + 2.2 * inchesOver60) * frameMultiplier;
  // Devine (1974)
  const devineKg = (gender === "male" ? 50.0 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60) * frameMultiplier;
  // Robinson (1983)
  const robinsonKg = (gender === "male" ? 52.0 + 1.9 * inchesOver60 : 49.0 + 1.7 * inchesOver60) * frameMultiplier;
  // Miller (1983)
  const millerKg = (gender === "male" ? 56.2 + 1.41 * inchesOver60 : 53.1 + 1.36 * inchesOver60) * frameMultiplier;
  // Peterson Universal Formula (2016) - Peterson CM, Thomas DM, Blackburn GL, Heymsfield SB. Am J Clin Nutr 2016;103:1197-203.
  // Universal equation at Target BMI = 22.0 kg/m²:
  // Metric: Weight (kg) = 2.2 * BMI + 3.5 * BMI * (Height(m) - 1.5)
  // Imperial equivalent: Weight (lb) = 5 * BMI + (BMI / 5) * (Height(in) - 60)
  const petersonTargetBmi = 22.0;
  const petersonKg = (2.2 * petersonTargetBmi + 3.5 * petersonTargetBmi * (heightM - 1.5)) * frameMultiplier;

  const currentWeightLbs = parseFloat((weightKg * 2.20462).toFixed(1));

  const methods: MethodWeightResult[] = [
    {
      methodName: "WHO Healthy BMI Range (18.5–24.9)",
      idealWeightKg: parseFloat(targetHealthyKg.toFixed(1)),
      idealWeightLbs: targetHealthyLbs,
      differenceLbs: parseFloat((currentWeightLbs - targetHealthyLbs).toFixed(1)),
      status: currentWeightLbs >= minHealthyLbs && currentWeightLbs <= maxHealthyLbs ? "Inside Healthy Range" : currentWeightLbs > maxHealthyLbs ? "Above Target" : "Below Target",
      description: "World Health Organization medical population standard",
    },
    {
      methodName: "Hamwi Formula (1964)",
      idealWeightKg: parseFloat(hamwiKg.toFixed(1)),
      idealWeightLbs: parseFloat((hamwiKg * 2.20462).toFixed(1)),
      differenceLbs: parseFloat((currentWeightLbs - hamwiKg * 2.20462).toFixed(1)),
      status: currentWeightLbs > hamwiKg * 2.20462 + 5 ? "Above Target" : currentWeightLbs < hamwiKg * 2.20462 - 5 ? "Below Target" : "Inside Healthy Range",
      description: "Original clinical dosage equation for diabetic pharmacology",
    },
    {
      methodName: "Devine Formula (1974)",
      idealWeightKg: parseFloat(devineKg.toFixed(1)),
      idealWeightLbs: parseFloat((devineKg * 2.20462).toFixed(1)),
      differenceLbs: parseFloat((currentWeightLbs - devineKg * 2.20462).toFixed(1)),
      status: currentWeightLbs > devineKg * 2.20462 + 5 ? "Above Target" : currentWeightLbs < devineKg * 2.20462 - 5 ? "Below Target" : "Inside Healthy Range",
      description: "Widely used clinical reference benchmark for pharmacokinetic clearance",
    },
    {
      methodName: "Robinson Formula (1983)",
      idealWeightKg: parseFloat(robinsonKg.toFixed(1)),
      idealWeightLbs: parseFloat((robinsonKg * 2.20462).toFixed(1)),
      differenceLbs: parseFloat((currentWeightLbs - robinsonKg * 2.20462).toFixed(1)),
      status: currentWeightLbs > robinsonKg * 2.20462 + 5 ? "Above Target" : currentWeightLbs < robinsonKg * 2.20462 - 5 ? "Below Target" : "Inside Healthy Range",
      description: "Empirical population modification based on Metropolitan Life tables",
    },
    {
      methodName: "Miller Formula (1983)",
      idealWeightKg: parseFloat(millerKg.toFixed(1)),
      idealWeightLbs: parseFloat((millerKg * 2.20462).toFixed(1)),
      differenceLbs: parseFloat((currentWeightLbs - millerKg * 2.20462).toFixed(1)),
      status: currentWeightLbs > millerKg * 2.20462 + 5 ? "Above Target" : currentWeightLbs < millerKg * 2.20462 - 5 ? "Below Target" : "Inside Healthy Range",
      description: "Modern empirical formula tailored for average height adults",
    },
    {
      methodName: "Peterson Universal Formula (2016)",
      idealWeightKg: parseFloat(petersonKg.toFixed(1)),
      idealWeightLbs: parseFloat((petersonKg * 2.2046226218).toFixed(1)),
      differenceLbs: parseFloat((currentWeightLbs - petersonKg * 2.2046226218).toFixed(1)),
      status: currentWeightLbs > petersonKg * 2.2046226218 + 5 ? "Above Target" : currentWeightLbs < petersonKg * 2.2046226218 - 5 ? "Below Target" : "Inside Healthy Range",
      description: "Published 2016 universal equation by Peterson et al. linking target body weight to a target BMI of 22.0",
    },
  ];

  // Multi-Formula Reference Average (averaging 5 IBW equations + WHO BMI 21.7 Target)
  const avgIbwKg = (hamwiKg + devineKg + robinsonKg + millerKg + petersonKg + targetHealthyKg) / 6;
  const consensusIdealWeightKg = parseFloat(avgIbwKg.toFixed(1));
  const consensusIdealWeightLbs = parseFloat((avgIbwKg * 2.2046226218).toFixed(1));

  // Frame-adjusted Reference Target (Consensus scaled by frame)
  const frameAdjustedTargetKg = parseFloat((avgIbwKg * frameMultiplier).toFixed(1));
  const frameAdjustedTargetLbs = parseFloat((avgIbwKg * frameMultiplier * 2.2046226218).toFixed(1));

  const diffFromTargetLbs = parseFloat((currentWeightLbs - targetHealthyLbs).toFixed(1));
  const diffFromTargetKg = parseFloat((weightKg - targetHealthyKg).toFixed(1));

  // Smart Insights & Recommendations
  let recommendationType: "maintain" | "lose" | "gain" = "maintain";
  let insightMessage = "Your body weight is within the WHO healthy BMI range (18.5 - 24.9). Maintain your current lifestyle!";

  if (currentWeightLbs > maxHealthyLbs) {
    recommendationType = "lose";
    const overLbs = Math.round(currentWeightLbs - maxHealthyLbs);
    const overKg = Math.round((currentWeightLbs - maxHealthyLbs) / 2.20462);
    insightMessage = `You are ${overLbs} lbs (${overKg} kg) above the healthy upper limit. Losing weight will optimize cardiovascular efficiency and reduce metabolic risks.`;
  } else if (currentWeightLbs < minHealthyLbs) {
    recommendationType = "gain";
    const underLbs = Math.round(minHealthyLbs - currentWeightLbs);
    const underKg = Math.round((minHealthyLbs - currentWeightLbs) / 2.20462);
    insightMessage = `You are ${underLbs} lbs (${underKg} kg) below the recommended lower limit. Increasing caloric intake with nutrient-dense foods will support immunity and muscle health.`;
  }

  // Timeline Projections
  const absDiffLbs = Math.abs(diffFromTargetLbs);
  const timelinePlans = [0.5, 1.0, 1.5, 2.0].map((rate) => {
    const weeks = Math.ceil(absDiffLbs / rate);
    const dailyKcal = Math.round(rate * 500); // 3500 kcal per lb
    return {
      ratePerWeekLbs: rate,
      weeksToTarget: weeks,
      dailyCaloricAdjustmentKcal: dailyKcal,
    };
  });

  return {
    currentWeightLbs,
    currentWeightKg: parseFloat(weightKg.toFixed(1)),
    bmi,
    bmiPrime,
    bmiCategory,
    isSub5Feet,
    frameMode,
    detectedFrame: frame,
    minHealthyWeightLbs: minHealthyLbs,
    minHealthyWeightKg: parseFloat(minHealthyKg.toFixed(1)),
    maxHealthyWeightLbs: maxHealthyLbs,
    maxHealthyWeightKg: parseFloat(maxHealthyKg.toFixed(1)),
    targetHealthyWeightLbs: targetHealthyLbs,
    targetHealthyWeightKg: parseFloat(targetHealthyKg.toFixed(1)),
    frameAdjustedTargetLbs,
    frameAdjustedTargetKg,
    frameAdjustedMinWeightLbs: frameAdjustedMinLbs,
    frameAdjustedMaxWeightLbs: frameAdjustedMaxLbs,
    frameMultiplier,
    consensusIdealWeightLbs,
    consensusIdealWeightKg,
    weightDifferenceFromTargetLbs: diffFromTargetLbs,
    weightDifferenceFromTargetKg: diffFromTargetKg,
    insightMessage,
    recommendationType,
    timelinePlans,
    methods,
  };
}
