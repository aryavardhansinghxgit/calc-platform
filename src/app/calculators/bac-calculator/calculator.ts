import {
  BacInputs,
  BacResults,
  DrinkEntry,
  EliminationPoint,
  ImpairmentStage,
  LegalDrivingThreshold,
} from "./types";

/**
 * Standard Pure Alcohol Density = 0.7891 g/mL
 * US Standard Drink = 14 grams of pure alcohol (e.g. 12oz 5% beer, 5oz 12% wine, 1.5oz 40% shot)
 * Alcohol caloric energy = 7.0 kcal per gram of pure ethanol
 */
export const PURE_ALCOHOL_DENSITY_G_ML = 0.7891;
export const US_STANDARD_DRINK_GRAMS = 14.0;
export const ALCOHOL_CALORIES_PER_GRAM = 7.0;

/**
 * Validates BAC Calculator Inputs BEFORE mathematical processing
 */
export function validateBacInputs(inputs: BacInputs): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Weight validation
  if (inputs.unitSystem === "us") {
    if (typeof inputs.weightLbs !== "number" || !Number.isFinite(inputs.weightLbs) || inputs.weightLbs <= 0) {
      errors.push("Body weight must be a positive number greater than 0 lbs.");
    } else if (inputs.weightLbs < 50 || inputs.weightLbs > 800) {
      errors.push("Body weight is outside the supported physiological range (50 - 800 lbs).");
    }
  } else {
    if (typeof inputs.weightKg !== "number" || !Number.isFinite(inputs.weightKg) || inputs.weightKg <= 0) {
      errors.push("Body weight must be a positive number greater than 0 kg.");
    } else if (inputs.weightKg < 20 || inputs.weightKg > 400) {
      errors.push("Body weight is outside the supported physiological range (20 - 400 kg).");
    }
  }

  // Height validation (when relevant)
  if (inputs.unitSystem === "us") {
    const totalInches = (inputs.heightFeet ?? 0) * 12 + (inputs.heightInches ?? 0);
    if (!Number.isFinite(totalInches) || totalInches <= 0) {
      errors.push("Height must be a valid positive measurement.");
    }
  } else {
    if (typeof inputs.heightCm !== "number" || !Number.isFinite(inputs.heightCm) || inputs.heightCm <= 0) {
      errors.push("Height must be a positive number greater than 0 cm.");
    }
  }

  // Age validation
  if (typeof inputs.ageYears === "number" && Number.isFinite(inputs.ageYears)) {
    if (inputs.ageYears < 16 || inputs.ageYears > 120) {
      errors.push("Age must be between 16 and 120 years.");
    }
  }

  // Elapsed time validation
  if (
    typeof inputs.timeSinceFirstDrinkHours !== "number" ||
    !Number.isFinite(inputs.timeSinceFirstDrinkHours) ||
    inputs.timeSinceFirstDrinkHours < 0
  ) {
    errors.push("Hours since first drink must be greater than or equal to 0.");
  }
  if (
    typeof inputs.timeSinceFirstDrinkMinutes !== "number" ||
    !Number.isFinite(inputs.timeSinceFirstDrinkMinutes) ||
    inputs.timeSinceFirstDrinkMinutes < 0
  ) {
    errors.push("Minutes since first drink must be greater than or equal to 0.");
  }

  // Elimination rate validation
  if (
    typeof inputs.eliminationRateBeta !== "number" ||
    !Number.isFinite(inputs.eliminationRateBeta) ||
    inputs.eliminationRateBeta <= 0 ||
    inputs.eliminationRateBeta > 0.06
  ) {
    errors.push("Elimination rate must be between 0.005% and 0.060% BAC/hr.");
  }

  // Drinks validation
  if (inputs.drinks && Array.isArray(inputs.drinks)) {
    inputs.drinks.forEach((d, idx) => {
      if (typeof d.count !== "number" || !Number.isFinite(d.count) || d.count < 0) {
        errors.push(`Drink #${idx + 1} (${d.name}): Quantity must be 0 or greater.`);
      }
      if (typeof d.volumeMl !== "number" || !Number.isFinite(d.volumeMl) || d.volumeMl < 0) {
        errors.push(`Drink #${idx + 1} (${d.name}): Volume must be 0 or greater.`);
      }
      if (typeof d.abvPercent !== "number" || !Number.isFinite(d.abvPercent) || d.abvPercent < 0 || d.abvPercent > 100) {
        errors.push(`Drink #${idx + 1} (${d.name}): ABV must be between 0% and 100%.`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Widmark Gender Water Factor (1932)
 */
export function getWidmarkR(gender: "male" | "female"): number {
  return gender === "male" ? 0.68 : 0.55;
}

/**
 * Seidl Anthropometric Water Distribution Factor (1990)
 * Male: r = 0.31608 - 0.004821 * W_kg + 0.004632 * H_cm
 * Female: r = 0.31223 - 0.006446 * W_kg + 0.004466 * H_cm
 */
export function getSeidlR(weightKg: number, heightCm: number, gender: "male" | "female"): number {
  if (gender === "male") {
    const r = 0.31608 - 0.004821 * weightKg + 0.004632 * heightCm;
    return Math.max(0.5, Math.min(0.85, r));
  }
  const r = 0.31223 - 0.006446 * weightKg + 0.004466 * heightCm;
  return Math.max(0.45, Math.min(0.75, r));
}

/**
 * Watson Total Body Water (TBW) Ratio (1980)
 * Male TBW (L) = 2.447 - 0.09516*Age + 0.1074*H_cm + 0.3362*W_kg
 * Female TBW (L) = -2.097 + 0.1069*H_cm + 0.2466*W_kg
 */
export function getWatsonR(weightKg: number, heightCm: number, ageYears: number, gender: "male" | "female"): number {
  let tbwL = 0;
  if (gender === "male") {
    tbwL = 2.447 - 0.09516 * ageYears + 0.1074 * heightCm + 0.3362 * weightKg;
  } else {
    tbwL = -2.097 + 0.1069 * heightCm + 0.2466 * weightKg;
  }
  // r = TBW (L) / (0.80 * Weight in kg)
  const r = tbwL / (0.8 * weightKg);
  return Math.max(0.45, Math.min(0.85, r));
}

/**
 * Behavioral Impairment Stage Classifier
 * Uses objective, non-guarantee public safety language.
 */
export function getImpairmentStage(bacPercent: number): ImpairmentStage {
  if (bacPercent <= 0.0005) {
    return {
      stageName: "Zero Modeled BAC",
      bacRangeText: "0.000%",
      behavior: "Normal appearance. Note that individual sensitivity and residual metabolic effects vary.",
      impairment: "Modeled BAC reaches 0.000%. Never use mathematical estimates as proof of sobriety or fitness to drive.",
      colorHex: "#10b981", // Emerald green
    };
  } else if (bacPercent < 0.03) {
    return {
      stageName: "Normal / Subtle Effects",
      bacRangeText: "0.001% - 0.029%",
      behavior: "Average individual appears normal. Slight relaxation or mood elevation may occur.",
      impairment: "Subtle visual tracking and divided attention effects detectable in laboratory testing. Impairment begins before legal limits.",
      colorHex: "#06b6d4", // Cyan
    };
  } else if (bacPercent < 0.06) {
    return {
      stageName: "Mild Euphoria & Relaxation",
      bacRangeText: "0.030% - 0.059%",
      behavior: "Mild euphoria, joyfulness, talkativeness, decreased inhibition.",
      impairment: "Slight impairment of concentration, visual tracking, and steering control. Exceeds legal limits in jurisdictions with 0.05% or lower thresholds.",
      colorHex: "#f59e0b", // Amber
    };
  } else if (bacPercent < 0.10) {
    return {
      stageName: "Significant Impairment & Legal Limits",
      bacRangeText: "0.060% - 0.099%",
      behavior: "Reduced inhibitions, blunted sensory perception, decreased reasoning.",
      impairment: "Depth perception, peripheral vision, glare recovery, and reaction time significantly degraded. At or above 0.08% standard US/UK adult reference threshold.",
      colorHex: "#f97316", // Orange
    };
  } else if (bacPercent < 0.20) {
    return {
      stageName: "Significant Motor & Reaction Impairment",
      bacRangeText: "0.100% - 0.199%",
      behavior: "Boisterousness, substantial loss of motor coordination, slurred speech.",
      impairment: "Marked reaction time delay, ataxia (staggering gait), sensory blunting, nausea risk.",
      colorHex: "#ef4444", // Red
    };
  } else if (bacPercent < 0.30) {
    return {
      stageName: "Severe Intoxication & Blackout Risk",
      bacRangeText: "0.200% - 0.299%",
      behavior: "Severe confusion, emotional instability, memory blackout risk.",
      impairment: "Loss of motor control, vomiting, risk of aspiration, inability to stand or walk.",
      colorHex: "#dc2626", // Dark Red
    };
  } else if (bacPercent < 0.40) {
    return {
      stageName: "Stupor & CNS Depression",
      bacRangeText: "0.300% - 0.399%",
      behavior: "Stupor, severe central nervous system depression, unresponsiveness.",
      impairment: "Loss of consciousness, depressed heart rate and respiration, life-threatening risk.",
      colorHex: "#9333ea", // Purple
    };
  } else {
    return {
      stageName: "Severe Alcohol Poisoning (Life-Threatening)",
      bacRangeText: "≥ 0.400%",
      behavior: "Coma, respiratory arrest, severe hypothermia.",
      impairment: "Loss of protective airway reflexes, high probability of fatal toxicity.",
      colorHex: "#7f1d1d", // Maroon
    };
  }
}

/**
 * Main BAC Calculator Execution Function
 */
export function calculateBacCalculator(inputs: BacInputs): BacResults {
  const validation = validateBacInputs(inputs);

  const {
    mode = "widmark-standard",
    gender = "male",
    unitSystem = "us",
    ageYears = 30,
    weightLbs: inputWeightLbs = 165,
    heightFeet = 5,
    heightInches = 10,
    weightKg: inputWeightKg = 75,
    heightCm: inputHeightCm = 178,
    timeSinceFirstDrinkHours = 2,
    timeSinceFirstDrinkMinutes = 0,
    stomachState = "light",
    eliminationRateBeta = 0.015, // standard 0.015% BAC (g/dL) per hour
    drinks = [],
  } = inputs;

  // 1. Weight & Height Standardization
  let heightCm = inputHeightCm;
  let weightKg = inputWeightKg;
  let weightLbs = inputWeightLbs;

  if (unitSystem === "us") {
    const totalInches = (heightFeet || 0) * 12 + (heightInches || 0);
    heightCm = totalInches * 2.54;
    weightKg = (weightLbs || 0) * 0.45359237;
  } else {
    weightLbs = (weightKg || 0) * 2.20462;
  }

  // Handle Invalid Inputs Gracefully
  if (!validation.isValid || weightKg <= 0) {
    const emptyStage = getImpairmentStage(0);
    return {
      isValid: false,
      errorMessages: validation.errors,
      mode,
      gender,
      unitSystem,
      ageYears,
      weightKg: Number(weightKg.toFixed(1)) || 0,
      weightLbs: Number(weightLbs.toFixed(1)) || 0,
      heightCm: Number(heightCm.toFixed(1)) || 0,
      currentBacPercent: 0,
      currentBacGramsPerLiter: 0,
      peakBacPercent: 0,
      peakTimeMinutes: 0,
      totalPureAlcoholGrams: 0,
      totalStandardDrinks: 0,
      totalAlcoholCalories: 0,
      elapsedHours: 0,
      hoursUntilLegalLimit008: 0,
      hoursUntilLegalLimit005: 0,
      hoursUntilSober000: 0,
      impairmentStage: emptyStage,
      legalThresholds: [],
      eliminationCurve: [],
      safetyWarnings: validation.errors,
      recommendations: ["Please correct invalid input values to calculate BAC."],
    };
  }

  // 2. Calculate Total Pure Alcohol Consumed (Grams)
  // CRITICAL FIX: If drinks is empty or sum of alcohol is 0, DO NOT inject 28g phantom alcohol!
  let totalPureAlcoholGrams = 0;
  if (drinks && drinks.length > 0) {
    drinks.forEach((d) => {
      const pureMl = Math.max(0, d.count) * Math.max(0, d.volumeMl) * (Math.max(0, Math.min(100, d.abvPercent)) / 100);
      const pureGrams = pureMl * PURE_ALCOHOL_DENSITY_G_ML;
      totalPureAlcoholGrams += pureGrams;
    });
  }

  const totalStandardDrinks = Number((totalPureAlcoholGrams / US_STANDARD_DRINK_GRAMS).toFixed(1));
  const totalAlcoholCalories = Math.round(totalPureAlcoholGrams * ALCOHOL_CALORIES_PER_GRAM);

  // 3. Determine Water Distribution Factor r
  let r = getWidmarkR(gender);
  if (mode === "seidl-anthropometric") {
    r = getSeidlR(weightKg, heightCm, gender);
  } else if (mode === "watson-tbw") {
    r = getWatsonR(weightKg, heightCm, ageYears, gender);
  }

  // 4. Calculate Peak BAC (%)
  // Widmark Peak BAC (%) = [ Alcohol(g) / ( Weight(g) * r ) ] * 100
  // Weight in grams = weightKg * 1000
  const weightGrams = weightKg * 1000;
  const rawPeakBac = (weightGrams > 0 && totalPureAlcoholGrams > 0)
    ? (totalPureAlcoholGrams / (weightGrams * r)) * 100
    : 0;

  // Stomach Absorption Factor & Timing:
  // - Empty stomach: rapid absorption (peak ~20-30 min), factor = 1.00 (max bioavailability, cannot exceed 1.00)
  // - Light meal (normal absorption): normal baseline, factor = 1.00 (peak ~30-45 min)
  // - Full meal: delayed gastric emptying and increased first-pass metabolism, factor = 0.85 (peak ~60-90 min)
  let absorptionFactor = 1.0;
  let peakTimeMinutes = 30;
  if (stomachState === "full") {
    absorptionFactor = 0.85;
    peakTimeMinutes = 60;
  } else if (stomachState === "empty") {
    absorptionFactor = 1.00;
    peakTimeMinutes = 20;
  } else {
    // Light meal (normal absorption)
    absorptionFactor = 1.00;
    peakTimeMinutes = 30;
  }

  const peakBacPercent = totalPureAlcoholGrams > 0 ? Number((rawPeakBac * absorptionFactor).toFixed(4)) : 0;

  // 5. Time Elapsed & Current BAC (%)
  const elapsedHours = Math.max(0, timeSinceFirstDrinkHours + timeSinceFirstDrinkMinutes / 60);

  // Current BAC = max(0, Peak BAC - (Metabolic Elimination Rate Beta * Elapsed Hours))
  const currentBacRaw = totalPureAlcoholGrams > 0 ? Math.max(0, peakBacPercent - eliminationRateBeta * elapsedHours) : 0;
  const currentBacPercent = Number(currentBacRaw.toFixed(3));
  const currentBacGramsPerLiter = Number((currentBacPercent * 10).toFixed(2)); // 0.08% = 0.80 g/L

  // 6. Time Until Modeled Zero & Reference Thresholds
  // Time from CURRENT moment until modeled 0.00%
  const hoursUntilSober000 = currentBacPercent > 0
    ? Number((currentBacPercent / eliminationRateBeta).toFixed(1))
    : 0;

  // Hours from CURRENT moment until below 0.08% reference limit
  const hoursUntilLegalLimit008 = currentBacPercent > 0.08
    ? Number(((currentBacPercent - 0.08) / eliminationRateBeta).toFixed(1))
    : 0;

  // Hours from CURRENT moment until below 0.05% reference limit
  const hoursUntilLegalLimit005 = currentBacPercent > 0.05
    ? Number(((currentBacPercent - 0.05) / eliminationRateBeta).toFixed(1))
    : 0;

  // 7. Impairment Stage
  const impairmentStage = getImpairmentStage(currentBacPercent);

  // 8. International Legal Driving Reference Thresholds
  const legalThresholds: LegalDrivingThreshold[] = [
    {
      countryRegion: "United States (Standard Adult) / Canada",
      legalLimitBac: 0.08,
      status: currentBacPercent >= 0.08
        ? "At or Above Legal Limit"
        : currentBacPercent >= 0.05
        ? "Approaching Limit"
        : "Below Reference Limit",
      hoursUntilLegal: hoursUntilLegalLimit008,
      jurisdictionNote: "Utah enforces 0.05%. Commercial drivers face 0.04%. Drivers under 21 face zero tolerance (0.00%-0.02%).",
    },
    {
      countryRegion: "United Kingdom (England, Wales, NI)",
      legalLimitBac: 0.08,
      status: currentBacPercent >= 0.08
        ? "At or Above Legal Limit"
        : currentBacPercent >= 0.05
        ? "Approaching Limit"
        : "Below Reference Limit",
      hoursUntilLegal: hoursUntilLegalLimit008,
      jurisdictionNote: "Scotland enforces 0.05% (50 mg/100 mL). Penalties include mandatory driving disqualification.",
    },
    {
      countryRegion: "European Union / Australia / Scotland",
      legalLimitBac: 0.05,
      status: currentBacPercent >= 0.05
        ? "At or Above Legal Limit"
        : currentBacPercent >= 0.02
        ? "Approaching Limit"
        : "Below Reference Limit",
      hoursUntilLegal: hoursUntilLegalLimit005,
      jurisdictionNote: "Standard limit across most EU nations and Australia. Novice/learner drivers face 0.00%.",
    },
    {
      countryRegion: "Sweden / Norway / Poland",
      legalLimitBac: 0.02,
      status: currentBacPercent >= 0.02
        ? "At or Above Legal Limit"
        : "Below Reference Limit",
      hoursUntilLegal: currentBacPercent > 0.02 ? Number(((currentBacPercent - 0.02) / eliminationRateBeta).toFixed(1)) : 0,
      jurisdictionNote: "High-consequence threshold. Measurable alcohol triggers severe penalties or license suspension.",
    },
    {
      countryRegion: "Zero Tolerance (Commercial / Novice / Underage)",
      legalLimitBac: 0.00,
      status: currentBacPercent > 0.00 ? "At or Above Legal Limit" : "Below Reference Limit",
      hoursUntilLegal: hoursUntilSober000,
      jurisdictionNote: "Applies to professional pilots, commercial drivers, learners, and under-21 drivers worldwide.",
    },
  ];

  // 9. Hour-by-Hour Elimination Timeline Curve (Future Projection From Present)
  // CRITICAL FIX: Point 0 represents the present moment ("Now (+0 hr)"), starting at currentBacPercent!
  const eliminationCurve: EliminationPoint[] = [];
  const hoursToProject = Math.min(24, Math.max(8, Math.ceil(hoursUntilSober000) + 2));

  for (let h = 0; h <= hoursToProject; h += 1) {
    const bacAtH = currentBacPercent > 0
      ? Math.max(0, currentBacPercent - eliminationRateBeta * h)
      : 0;
    const bacPercentH = Number(bacAtH.toFixed(3));
    const bacGL = Number((bacPercentH * 10).toFixed(2));

    let statusText = "0.000% BAC";
    if (bacPercentH >= 0.08) statusText = "≥ 0.08% Reference Limit";
    else if (bacPercentH >= 0.05) statusText = "≥ 0.05% Threshold";
    else if (bacPercentH > 0.00) statusText = "Traces (< 0.05%)";

    eliminationCurve.push({
      hour: h,
      timeLabel: h === 0 ? "Now (+0 hr)" : `+${h} hr`,
      bacPercent: bacPercentH,
      bacGramsPerLiter: bacGL,
      status: statusText,
      isBelowRef008: bacPercentH < 0.08,
    });
  }

  // 10. Safety Warnings & Recommendations
  const safetyWarnings: string[] = [];
  if (currentBacPercent >= 0.08) {
    safetyWarnings.push("CRITICAL SAFETY WARNING: Estimated BAC is at or above the 0.08% reference legal limit. DO NOT OPERATE A MOTOR VEHICLE OR MACHINERY.");
    safetyWarnings.push("Arrange for a designated sober driver, taxi, or rideshare service immediately.");
  } else if (currentBacPercent >= 0.05) {
    safetyWarnings.push("SAFETY WARNING: Reaction times, depth perception, and tracking are significantly impaired. Driving at this level is dangerous and illegal in most European countries, Australia, Scotland, and Utah (0.05% limit).");
  } else if (currentBacPercent > 0) {
    safetyWarnings.push("IMPAIRMENT NOTICE: Cognitive and reaction impairment occurs even at low BAC levels. Do not rely on mathematical calculations to decide if you are safe to drive.");
  }

  if (currentBacPercent >= 0.20) {
    safetyWarnings.push("TOXICOLOGY ALERT: High risk of severe alcohol poisoning, blackout, vomiting, and respiratory depression. Seek emergency medical attention if unresponsive.");
  }

  const recommendations: string[] = [
    `Estimated current modeled BAC: ${currentBacPercent}% (${currentBacGramsPerLiter} g/L). Peak modeled BAC reached ${peakBacPercent}%.`,
    `Total pure alcohol consumed: ${totalPureAlcoholGrams.toFixed(1)} grams (${totalStandardDrinks} US standard drinks, ~${totalAlcoholCalories} kcal).`,
    `Estimated time until modeled BAC reaches 0.00%: ${hoursUntilSober000} hours.`,
    `Alcohol clearance occurs via hepatic metabolism (~0.015% BAC/hour). Coffee, cold showers, hydration, or exercise CANNOT accelerate liver alcohol clearance.`,
    `PUBLIC SAFETY REMINDER: Mathematical estimates simplify biological reality. Never drive or perform safety-sensitive work after consuming alcohol.`,
  ];

  return {
    isValid: true,
    errorMessages: [],
    mode,
    gender,
    unitSystem,
    ageYears,
    weightKg: Number(weightKg.toFixed(1)),
    weightLbs: Number(weightLbs.toFixed(1)),
    heightCm: Number(heightCm.toFixed(1)),
    currentBacPercent,
    currentBacGramsPerLiter,
    peakBacPercent,
    peakTimeMinutes,
    totalPureAlcoholGrams: Number(totalPureAlcoholGrams.toFixed(1)),
    totalStandardDrinks,
    totalAlcoholCalories,
    elapsedHours,
    hoursUntilLegalLimit008,
    hoursUntilLegalLimit005,
    hoursUntilSober000,
    impairmentStage,
    legalThresholds,
    eliminationCurve,
    safetyWarnings,
    recommendations,
  };
}

export const calculateBACCalculator = calculateBacCalculator;
