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
 */
export const PURE_ALCOHOL_DENSITY_G_ML = 0.7891;
export const US_STANDARD_DRINK_GRAMS = 14.0;
export const ALCOHOL_CALORIES_PER_GRAM = 7.0;

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
 */
export function getImpairmentStage(bacPercent: number): ImpairmentStage {
  if (bacPercent <= 0.001) {
    return {
      stageName: "Sober (Normal)",
      bacRangeText: "0.000%",
      behavior: "Normal un-impaired appearance and motor function.",
      impairment: "No impairment. Safe for all normal activities and driving.",
      colorHex: "#10b981", // Emerald green
    };
  } else if (bacPercent < 0.03) {
    return {
      stageName: "Normal / Subtle Effects",
      bacRangeText: "0.001% - 0.029%",
      behavior: "Average individual appears normal. Slight relaxation.",
      impairment: "Subtle effects only detectable with laboratory testing.",
      colorHex: "#06b6d4", // Cyan
    };
  } else if (bacPercent < 0.06) {
    return {
      stageName: "Mild Euphoria & Relaxation",
      bacRangeText: "0.030% - 0.059%",
      behavior: "Mild euphoria, joyfulness, talkativeness, decreased inhibition.",
      impairment: "Slight impairment of concentration and fine visual tracking.",
      colorHex: "#f59e0b", // Amber
    };
  } else if (bacPercent < 0.10) {
    return {
      stageName: "Legal Driving Impairment Limit",
      bacRangeText: "0.060% - 0.099%",
      behavior: "Blunted feelings, reduced pain sensitivity, extraversion.",
      impairment: "Reasoning, depth perception, peripheral vision, and glare recovery impaired. Over 0.08% is ILLEGAL TO DRIVE in US/UK/Canada.",
      colorHex: "#f97316", // Orange
    };
  } else if (bacPercent < 0.20) {
    return {
      stageName: "Significant Motor & Reaction Impairment",
      bacRangeText: "0.100% - 0.199%",
      behavior: "Over-expression, boisterousness, loss of motor coordination.",
      impairment: "Reflexes, reaction time, gross motor control, slurred speech.",
      colorHex: "#ef4444", // Red
    };
  } else if (bacPercent < 0.30) {
    return {
      stageName: "Severe Intoxication & Blackout Risk",
      bacRangeText: "0.200% - 0.299%",
      behavior: "Nausea, vomiting, emotional swings, loss of understanding.",
      impairment: "Severe motor impairment, loss of consciousness, memory blackout risk.",
      colorHex: "#dc2626", // Dark Red
    };
  } else if (bacPercent < 0.40) {
    return {
      stageName: "Stupor & CNS Depression",
      bacRangeText: "0.300% - 0.399%",
      behavior: "Stupor, severe central nervous system depression, unconsciousness.",
      impairment: "Bladder function loss, breathing drop, heart rate drop, death risk.",
      colorHex: "#9333ea", // Purple
    };
  } else {
    return {
      stageName: "Severe Alcohol Poisoning (Life-Threatening)",
      bacRangeText: "≥ 0.400%",
      behavior: "Coma, severe respiratory depression, high risk of mortality.",
      impairment: "Coma, loss of protective airway reflexes, high death probability.",
      colorHex: "#7f1d1d", // Maroon
    };
  }
}

/**
 * Main BAC Calculator Execution Function
 */
export function calculateBacCalculator(inputs: BacInputs): BacResults {
  const {
    mode,
    gender,
    unitSystem,
    ageYears,
    weightLbs: inputWeightLbs = 165,
    heightFeet = 5,
    heightInches = 10,
    weightKg: inputWeightKg = 75,
    heightCm: inputHeightCm = 178,
    timeSinceFirstDrinkHours = 2,
    timeSinceFirstDrinkMinutes = 0,
    stomachState = "light",
    eliminationRateBeta = 0.015, // standard 0.015 g/dL per hour
    drinks = [],
  } = inputs;

  // 1. Weight & Height Standardization
  let heightCm = inputHeightCm;
  let weightKg = inputWeightKg;
  let weightLbs = inputWeightLbs;

  if (unitSystem === "us") {
    const totalInches = heightFeet * 12 + heightInches;
    heightCm = totalInches * 2.54;
    weightKg = weightLbs * 0.45359237;
  } else {
    weightLbs = weightKg * 2.20462;
  }

  // 2. Calculate Total Pure Alcohol Consumed (Grams)
  let totalPureAlcoholGrams = 0;
  if (drinks && drinks.length > 0) {
    drinks.forEach((d) => {
      const pureMl = d.count * d.volumeMl * (d.abvPercent / 100);
      const pureGrams = pureMl * PURE_ALCOHOL_DENSITY_G_ML;
      totalPureAlcoholGrams += pureGrams;
    });
  } else {
    // Default fallback if drinks array is empty (e.g. 2 standard beers = ~28g)
    totalPureAlcoholGrams = 28.0;
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

  // 4. Calculate Peak Un-metabolized BAC (%)
  // Widmark Peak BAC (%) = [ Alcohol(g) / ( Weight(g) * r ) ] * 100
  // Note: Weight in grams = weightKg * 1000
  const weightGrams = weightKg * 1000;
  const rawPeakBac = weightGrams > 0 ? (totalPureAlcoholGrams / (weightGrams * r)) * 100 : 0;

  // Stomach Absorption Delay Adjustment
  let absorptionFactor = 1.0;
  if (stomachState === "full") absorptionFactor = 0.85; // Full stomach slows peak absorption
  else if (stomachState === "empty") absorptionFactor = 1.05;

  const peakBacPercent = Number((rawPeakBac * absorptionFactor).toFixed(4));
  const peakTimeMinutes = stomachState === "full" ? 60 : 30; // Peak occurs ~30-60 mins after drinking

  // 5. Time Elapsed & Current BAC (%)
  const elapsedHours = Math.max(0, timeSinceFirstDrinkHours + timeSinceFirstDrinkMinutes / 60);

  // Current BAC = Peak BAC - (Metabolic Elimination Rate Beta * Elapsed Hours)
  const currentBacRaw = Math.max(0, peakBacPercent - eliminationRateBeta * elapsedHours);
  const currentBacPercent = Number(currentBacRaw.toFixed(3));
  const currentBacGramsPerLiter = Number((currentBacPercent * 10).toFixed(2)); // 0.08% = 0.80 g/L

  // 6. Time Until Sobriety & Driving Limits
  // Hours to sober (0.00%) = Peak BAC / Beta
  const totalHoursToSober = peakBacPercent / eliminationRateBeta;
  const hoursUntilSober000 = Math.max(0, Number((totalHoursToSober - elapsedHours).toFixed(1)));

  // Hours to 0.08% US/UK Limit
  const hoursTo008 = (peakBacPercent - 0.08) / eliminationRateBeta;
  const hoursUntilLegalLimit008 = Math.max(0, Number((hoursTo008 - elapsedHours).toFixed(1)));

  // Hours to 0.05% EU/Australia Limit
  const hoursTo005 = (peakBacPercent - 0.05) / eliminationRateBeta;
  const hoursUntilLegalLimit005 = Math.max(0, Number((hoursTo005 - elapsedHours).toFixed(1)));

  // 7. Impairment Stage
  const impairmentStage = getImpairmentStage(currentBacPercent);

  // 8. International Legal Driving Thresholds
  const legalThresholds: LegalDrivingThreshold[] = [
    {
      countryRegion: "United States / UK / Canada (0.08%)",
      legalLimitBac: 0.08,
      status: currentBacPercent >= 0.08 ? "Illegal / License Revocation" : currentBacPercent >= 0.05 ? "Warning" : "Legal",
      hoursUntilLegal: hoursUntilLegalLimit008,
    },
    {
      countryRegion: "European Union / Australia / South Africa (0.05%)",
      legalLimitBac: 0.05,
      status: currentBacPercent >= 0.05 ? "Illegal / License Revocation" : currentBacPercent >= 0.02 ? "Warning" : "Legal",
      hoursUntilLegal: hoursUntilLegalLimit005,
    },
    {
      countryRegion: "Sweden / Norway / Poland (0.02%)",
      legalLimitBac: 0.02,
      status: currentBacPercent >= 0.02 ? "Illegal / License Revocation" : "Legal",
      hoursUntilLegal: Math.max(0, Number(((peakBacPercent - 0.02) / eliminationRateBeta - elapsedHours).toFixed(1))),
    },
    {
      countryRegion: "Zero Tolerance / Commercial / Novice (0.00%)",
      legalLimitBac: 0.00,
      status: currentBacPercent > 0.00 ? "Illegal / License Revocation" : "Legal",
      hoursUntilLegal: hoursUntilSober000,
    },
  ];

  // 9. Hour-by-Hour Elimination Timeline (12 Hours Ahead)
  const eliminationCurve: EliminationPoint[] = [];
  const maxTimelineHours = Math.ceil(totalHoursToSober) + 2;

  for (let h = 0; h <= Math.min(24, Math.max(8, maxTimelineHours)); h += 1) {
    const bacAtH = Math.max(0, peakBacPercent - eliminationRateBeta * h);
    const bacPercentH = Number(bacAtH.toFixed(3));
    const bacGL = Number((bacPercentH * 10).toFixed(2));

    let statusText = "Sober";
    if (bacPercentH >= 0.08) statusText = "Legally Impaired (DUI)";
    else if (bacPercentH >= 0.05) statusText = "Moderately Impaired";
    else if (bacPercentH > 0.00) statusText = "Minor Traces";

    eliminationCurve.push({
      hour: h,
      timeLabel: `+${h} hr`,
      bacPercent: bacPercentH,
      bacGramsPerLiter: bacGL,
      status: statusText,
      canDrive: bacPercentH < 0.05,
    });
  }

  // 10. Safety Warnings & Recommendations
  const safetyWarnings: string[] = [];
  if (currentBacPercent >= 0.08) {
    safetyWarnings.push("CRITICAL DUI WARNING: Your estimated BAC is at or above the 0.08% legal driving limit. DO NOT OPERATE A MOTOR VEHICLE.");
    safetyWarnings.push("Arrange for a rideshare, taxi, or designated sober driver immediately.");
  } else if (currentBacPercent >= 0.05) {
    safetyWarnings.push("WARNING: Reaction time and depth perception are significantly impaired. Driving is unsafe and illegal in many international jurisdictions (EU/Australia 0.05%).");
  }

  if (currentBacPercent >= 0.20) {
    safetyWarnings.push("TOXICOLOGY ALERT: High risk of alcohol poisoning, nausea, blackouts, and respiratory depression. Seek medical attention if vomiting or unresponsive.");
  }

  const recommendations: string[] = [
    `Estimated current BAC is ${currentBacPercent}% (${currentBacGramsPerLiter} g/L). Peak BAC reached ${peakBacPercent}%.`,
    `Total pure alcohol consumed: ${totalPureAlcoholGrams.toFixed(1)} grams (${totalStandardDrinks} US standard drinks, ~${totalAlcoholCalories} calories).`,
    `Estimated time until 0.00% complete sobriety: ${hoursUntilSober000} hours.`,
    `Alcohol metabolism occurs at a fixed average rate (~0.015% per hour). Cold showers, coffee, or exercise CANNOT speed up liver alcohol clearance.`,
  ];

  return {
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

