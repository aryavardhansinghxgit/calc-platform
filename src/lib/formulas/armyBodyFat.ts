export type UnitSystem = "imperial" | "metric";
export type Gender = "male" | "female";
export type ArmyComplianceMode = "current_2026_whtr" | "historical_2023_tape";
export type CalculationMethod = "army_2023_single_site" | "navy_traditional_multi_site";

export type ArmyComplianceStatus =
  | "INVALID"
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | "CONFIRMATION_REQUIRED"
  | "MEDICAL_REVIEW"
  | "HISTORICAL_ONLY";

// Authoritative Current Army Body Composition Policy (Directive 2026-13)
export const CURRENT_ARMY_BODY_COMPOSITION_POLICY = {
  policyDirective: "Army Directive 2026-13",
  governingRegulation: "AR 600-9 (The Army Body Composition Program)",
  effectiveYear: 2026,
  primaryMethod: "Waist-to-Height Ratio (WHtR)",
  complianceThreshold: 0.55, // Strictly < 0.55. Exactly 0.550 is NOT compliant.
  strictInequality: true,
  assessmentFrequency: "Twice per calendar year (semi-annually)",
  measurementSite: "Omphalion / navel (belly button) parallel to deck at end of normal exhalation",
  confirmationProcedure: "Soldiers who exceed 0.55 undergo confirmation assessment per unit medical protocol.",
  disclaimer:
    "This calculator is an informational tool based on published U.S. Army guidance. It does not constitute an official Army body-composition assessment or administrative determination. Army policies and implementation procedures can change; Soldiers should verify current requirements with authorized Army personnel.",
} as const;

export interface ArmyWHtRInput {
  unitSystem: UnitSystem;
  heightInches?: number;
  heightCm?: number;
  waistInches?: number;
  waistCm?: number;
  gender?: Gender;
  age?: number;
}

export interface ArmyWHtRResult {
  isValid: boolean;
  errorMessage?: string;
  whtr: number; // full precision
  whtrDisplay: number; // rounded to 4 decimal places
  whtrPercentageDisplay: string; // e.g. "48.6%"
  complianceThreshold: number; // 0.55
  isCompliant: boolean; // strictly whtr < 0.55
  complianceStatus: ArmyComplianceStatus;
  statusLabel: string;
  category: "Slim" | "Optimal Army Range" | "Approaching Limit" | "Exceeds Army Standard" | "High Risk";
  maxCompliantWaist: number; // in current units
  requiredWaistReduction: number; // in current units (0 if compliant)
  height: number;
  waist: number;
  unitLabel: string;
  measurementSite: string;
  policyReference: string;
  disclaimer: string;
}

export interface ArmyBodyFatInput {
  unitSystem: UnitSystem;
  gender: Gender;
  calculationMethod?: CalculationMethod;
  age: number;
  weightLbs?: number;
  weightKg?: number;
  heightInches?: number;
  heightCm?: number;
  waistInches?: number;
  waistCm?: number;
  neckInches?: number;
  neckCm?: number;
  hipInches?: number;
  hipCm?: number;
  acftScore?: number;
  acftPassedAllEvents80?: boolean;
}

export interface ArmyBodyFatResult {
  isValid: boolean;
  errorMessage?: string;
  bodyFatPercentage: number;
  maxAllowableBodyFat: number;
  complianceStatus: ArmyComplianceStatus;
  statusLabel: string;
  isCompliant: boolean;
  isAcftExempt: boolean;
  ageBracketId: "17_20" | "21_27" | "28_39" | "40_plus";
  ageBracketLabel: string;
  fatMassLbs: number;
  fatMassKg: number;
  leanMassLbs: number;
  leanMassKg: number;
  differenceFromMaxStandardPct: number;
  requiredWeightLossLbs: number;
  requiredWeightLossKg: number;
  targetWeightLbs: number;
  targetWeightKg: number;
  category: "Essential Fat" | "Athletes" | "Fitness" | "Average" | "ABCP Overweight";
  methodUsedLabel: string;
  estimatedWeeksToPassAt1LbPerWeek: number;
  estimatedWeeksToPassAt2LbsPerWeek: number;
  weightLbs: number;
  weightKg: number;
  heightInches: number;
  heightCm: number;
  waistInches: number;
  waistCm: number;
}

// -------------------------------------------------------------
// 1. CURRENT ARMY WHtR CALCULATION ENGINE (Directive 2026-13)
// -------------------------------------------------------------
export function calculateArmyWHtR(input: ArmyWHtRInput): ArmyWHtRResult {
  const unitSystem = input.unitSystem;
  const isImperial = unitSystem === "imperial";

  const rawHeight = isImperial ? Number(input.heightInches) : Number(input.heightCm);
  const rawWaist = isImperial ? Number(input.waistInches) : Number(input.waistCm);
  const unitLabel = isImperial ? "inches" : "cm";

  const makeInvalidResult = (error: string): ArmyWHtRResult => ({
    isValid: false,
    errorMessage: error,
    whtr: 0,
    whtrDisplay: 0,
    whtrPercentageDisplay: "0.0%",
    complianceThreshold: 0.55,
    isCompliant: false,
    complianceStatus: "INVALID",
    statusLabel: "INVALID INPUT",
    category: "Optimal Army Range",
    maxCompliantWaist: 0,
    requiredWaistReduction: 0,
    height: 0,
    waist: 0,
    unitLabel,
    measurementSite: CURRENT_ARMY_BODY_COMPOSITION_POLICY.measurementSite,
    policyReference: CURRENT_ARMY_BODY_COMPOSITION_POLICY.policyDirective,
    disclaimer: CURRENT_ARMY_BODY_COMPOSITION_POLICY.disclaimer,
  });

  // Strict Numerical Guards
  if (!Number.isFinite(rawHeight) || rawHeight <= 0) {
    return makeInvalidResult("Height must be a valid positive number greater than zero.");
  }
  if (!Number.isFinite(rawWaist) || rawWaist <= 0) {
    return makeInvalidResult("Waist circumference must be a valid positive number greater than zero.");
  }

  // Realistic Physiological Range Check
  const minHeight = isImperial ? 48 : 120;
  const maxHeight = isImperial ? 96 : 250;
  if (rawHeight < minHeight || rawHeight > maxHeight) {
    return makeInvalidResult(`Height must be between ${minHeight} and ${maxHeight} ${unitLabel}.`);
  }

  const minWaist = isImperial ? 18 : 45;
  const maxWaist = isImperial ? 80 : 210;
  if (rawWaist < minWaist || rawWaist > maxWaist) {
    return makeInvalidResult(`Waist circumference must be between ${minWaist} and ${maxWaist} ${unitLabel}.`);
  }

  // Direct calculation without cross-unit conversion drift
  const whtr = rawWaist / rawHeight;
  const whtrDisplay = parseFloat(whtr.toFixed(4));
  const whtrPercentageDisplay = `${(whtr * 100).toFixed(1)}%`;

  // Strict Threshold Check: STRICTLY < 0.55.
  // 0.549 -> compliant, 0.550 -> non-compliant, 0.551 -> non-compliant
  const isCompliant = whtr < 0.55;
  const complianceStatus: ArmyComplianceStatus = isCompliant ? "COMPLIANT" : "NON_COMPLIANT";
  const statusLabel = isCompliant ? "COMPLIANT" : "NON-COMPLIANT";

  // Tier classification
  let category: ArmyWHtRResult["category"] = "Optimal Army Range";
  if (whtr < 0.43) {
    category = "Slim";
  } else if (whtr < 0.53) {
    category = "Optimal Army Range";
  } else if (whtr < 0.55) {
    category = "Approaching Limit";
  } else if (whtr < 0.60) {
    category = "Exceeds Army Standard";
  } else {
    category = "High Risk";
  }

  // Maximum compliant waist: must satisfy waist / height < 0.55
  // Floor to 1 decimal place to guarantee strict compliance
  const maxCompliantWaist = parseFloat((Math.floor((rawHeight * 0.55 - 0.001) * 10) / 10).toFixed(1));
  const requiredWaistReduction = isCompliant ? 0 : parseFloat((rawWaist - maxCompliantWaist).toFixed(1));

  return {
    isValid: true,
    whtr,
    whtrDisplay,
    whtrPercentageDisplay,
    complianceThreshold: 0.55,
    isCompliant,
    complianceStatus,
    statusLabel,
    category,
    maxCompliantWaist,
    requiredWaistReduction: Math.max(0, requiredWaistReduction),
    height: rawHeight,
    waist: rawWaist,
    unitLabel,
    measurementSite: CURRENT_ARMY_BODY_COMPOSITION_POLICY.measurementSite,
    policyReference: CURRENT_ARMY_BODY_COMPOSITION_POLICY.policyDirective,
    disclaimer: CURRENT_ARMY_BODY_COMPOSITION_POLICY.disclaimer,
  };
}

// -------------------------------------------------------------
// 2. HISTORICAL 2023 BODY FAT TAPE-TEST REFERENCE ENGINE
// -------------------------------------------------------------
export function getMaxAllowableArmyBodyFat(gender: Gender, age: number): {
  maxPct: number;
  bracketId: "17_20" | "21_27" | "28_39" | "40_plus";
  bracketLabel: string;
} {
  if (gender === "male") {
    if (age <= 20) return { maxPct: 20, bracketId: "17_20", bracketLabel: "Age 17–20" };
    if (age <= 27) return { maxPct: 22, bracketId: "21_27", bracketLabel: "Age 21–27" };
    if (age <= 39) return { maxPct: 24, bracketId: "28_39", bracketLabel: "Age 28–39" };
    return { maxPct: 26, bracketId: "40_plus", bracketLabel: "Age 40+" };
  } else {
    if (age <= 20) return { maxPct: 30, bracketId: "17_20", bracketLabel: "Age 17–20" };
    if (age <= 27) return { maxPct: 32, bracketId: "21_27", bracketLabel: "Age 21–27" };
    if (age <= 39) return { maxPct: 34, bracketId: "28_39", bracketLabel: "Age 28–39" };
    return { maxPct: 36, bracketId: "40_plus", bracketLabel: "Age 40+" };
  }
}

export function calculateArmyBodyFat(input: ArmyBodyFatInput): ArmyBodyFatResult {
  const gender = input.gender;
  const unitSystem = input.unitSystem;
  const method = input.calculationMethod || "army_2023_single_site";

  const rawAge = Number(input.age);
  const rawWeight = unitSystem === "imperial" ? Number(input.weightLbs) : Number(input.weightKg);
  const rawHeight = unitSystem === "imperial" ? Number(input.heightInches) : Number(input.heightCm);
  const rawWaist = unitSystem === "imperial" ? Number(input.waistInches) : Number(input.waistCm);

  const makeInvalidResult = (error: string): ArmyBodyFatResult => {
    const { maxPct, bracketId, bracketLabel } = getMaxAllowableArmyBodyFat(gender, Number.isFinite(rawAge) ? rawAge : 25);
    return {
      isValid: false,
      errorMessage: error,
      bodyFatPercentage: 0,
      maxAllowableBodyFat: maxPct,
      complianceStatus: "INVALID",
      statusLabel: "INVALID INPUT",
      isCompliant: false,
      isAcftExempt: false,
      ageBracketId: bracketId,
      ageBracketLabel: bracketLabel,
      fatMassLbs: 0,
      fatMassKg: 0,
      leanMassLbs: 0,
      leanMassKg: 0,
      differenceFromMaxStandardPct: 0,
      requiredWeightLossLbs: 0,
      requiredWeightLossKg: 0,
      targetWeightLbs: 0,
      targetWeightKg: 0,
      category: "Average",
      methodUsedLabel: method === "army_2023_single_site"
        ? "Historical 2023 1-Site Waist Tape Test"
        : "DoD / Navy Traditional Multi-Site Tape Test",
      estimatedWeeksToPassAt1LbPerWeek: 0,
      estimatedWeeksToPassAt2LbsPerWeek: 0,
      weightLbs: 0,
      weightKg: 0,
      heightInches: 0,
      heightCm: 0,
      waistInches: 0,
      waistCm: 0,
    };
  };

  if (!Number.isFinite(rawAge) || rawAge < 17 || rawAge > 80) {
    return makeInvalidResult("Soldier age must be a valid number between 17 and 80 years.");
  }

  if (method === "army_2023_single_site") {
    if (!Number.isFinite(rawWeight) || rawWeight <= 0) {
      return makeInvalidResult("Body weight must be a valid positive number greater than zero.");
    }
    if (!Number.isFinite(rawWaist) || rawWaist <= 0) {
      return makeInvalidResult("Abdominal waist circumference must be a valid positive number greater than zero.");
    }
    if (Number.isFinite(rawHeight) && rawHeight <= 0) {
      return makeInvalidResult("Height must be a valid positive number greater than zero.");
    }
  } else {
    if (!Number.isFinite(rawHeight) || rawHeight <= 0) {
      return makeInvalidResult("Height must be a valid positive number greater than zero for multi-site testing.");
    }
    if (!Number.isFinite(rawWaist) || rawWaist <= 0) {
      return makeInvalidResult("Waist circumference must be a valid positive number greater than zero.");
    }
    const rawNeck = unitSystem === "imperial" ? Number(input.neckInches) : Number(input.neckCm);
    if (!Number.isFinite(rawNeck) || rawNeck <= 0) {
      return makeInvalidResult("Neck circumference must be a valid positive number for multi-site testing.");
    }
    if (gender === "female") {
      const rawHip = unitSystem === "imperial" ? Number(input.hipInches) : Number(input.hipCm);
      if (!Number.isFinite(rawHip) || rawHip <= 0) {
        return makeInvalidResult("Hip circumference must be a valid positive number for female multi-site testing.");
      }
    }
    if (Number.isFinite(rawWeight) && rawWeight <= 0) {
      return makeInvalidResult("Body weight must be a valid positive number greater than zero.");
    }
  }

  let weightLbs = 175;
  let weightKg = 79.4;
  if (Number.isFinite(rawWeight) && rawWeight > 0) {
    if (unitSystem === "imperial") {
      weightLbs = rawWeight;
      weightKg = parseFloat((weightLbs / 2.20462).toFixed(1));
    } else {
      weightKg = rawWeight;
      weightLbs = parseFloat((weightKg * 2.20462).toFixed(1));
    }
  }

  let heightInches = 70;
  let heightCm = 177.8;
  if (Number.isFinite(rawHeight) && rawHeight > 0) {
    if (unitSystem === "imperial") {
      heightInches = rawHeight;
      heightCm = parseFloat((heightInches * 2.54).toFixed(1));
    } else {
      heightCm = rawHeight;
      heightInches = parseFloat((heightCm / 2.54).toFixed(1));
    }
  }

  let waistInches: number;
  let waistCm: number;
  if (unitSystem === "imperial") {
    waistInches = rawWaist;
    waistCm = parseFloat((waistInches * 2.54).toFixed(1));
  } else {
    waistCm = rawWaist;
    waistInches = parseFloat((waistCm / 2.54).toFixed(1));
  }

  let neckInches = 15.0;
  let hipInches = 38.0;

  if (method === "navy_traditional_multi_site") {
    const rawNeck = unitSystem === "imperial" ? Number(input.neckInches) : Number(input.neckCm);
    neckInches = unitSystem === "imperial" ? rawNeck : rawNeck / 2.54;

    if (gender === "male") {
      if (waistInches <= neckInches) {
        return makeInvalidResult("Waist circumference must be greater than neck circumference.");
      }
    } else {
      const rawHip = unitSystem === "imperial" ? Number(input.hipInches) : Number(input.hipCm);
      hipInches = unitSystem === "imperial" ? rawHip : rawHip / 2.54;
      if (waistInches + hipInches <= neckInches) {
        return makeInvalidResult("Waist + Hip circumference must be greater than neck circumference.");
      }
    }
  }

  let bodyFatPct = 0;
  let methodLabel = "Historical 2023 1-Site Waist Tape Test";

  if (method === "army_2023_single_site") {
    if (gender === "male") {
      bodyFatPct = -26.97 - 0.12 * weightLbs + 1.99 * waistInches;
    } else {
      bodyFatPct = -9.15 - 0.015 * weightLbs + 1.27 * waistInches;
    }
  } else {
    methodLabel = "DoD / Navy Traditional Multi-Site Tape Test";
    if (gender === "male") {
      const waistDiff = Math.max(0.5, waistInches - neckInches);
      bodyFatPct = 86.01 * Math.log10(waistDiff) - 70.041 * Math.log10(heightInches) + 36.76;
    } else {
      const femaleDiff = Math.max(0.5, waistInches + hipInches - neckInches);
      bodyFatPct = 163.205 * Math.log10(femaleDiff) - 97.684 * Math.log10(heightInches) - 78.387;
    }
  }

  bodyFatPct = parseFloat(Math.max(3.0, Math.min(60.0, bodyFatPct)).toFixed(1));
  const { maxPct, bracketId, bracketLabel } = getMaxAllowableArmyBodyFat(gender, rawAge);

  const rawAcft = Number(input.acftScore);
  const acftScore = Number.isFinite(rawAcft) ? rawAcft : 0;
  const acftAll80 = Boolean(input.acftPassedAllEvents80);
  const isAcftExempt = acftScore >= 540 && acftAll80;

  let complianceStatus: ArmyComplianceStatus = "NON_COMPLIANT";
  let statusLabel = "";

  if (isAcftExempt) {
    complianceStatus = "HISTORICAL_ONLY";
    statusLabel = "EXEMPT (Historical ACFT 540+)";
  } else if (bodyFatPct <= maxPct) {
    complianceStatus = "HISTORICAL_ONLY";
    statusLabel = "COMPLIANT (Historical 2023 Standard)";
  } else {
    complianceStatus = "HISTORICAL_ONLY";
    statusLabel = "NON-COMPLIANT (Historical 2023 Standard)";
  }

  const isCompliant = isAcftExempt || bodyFatPct <= maxPct;
  const diffFromMax = parseFloat((bodyFatPct - maxPct).toFixed(1));

  const fatMassLbs = parseFloat((weightLbs * (bodyFatPct / 100)).toFixed(1));
  const fatMassKg = parseFloat((fatMassLbs / 2.20462).toFixed(1));
  const leanMassLbs = parseFloat((weightLbs - fatMassLbs).toFixed(1));
  const leanMassKg = parseFloat((leanMassLbs / 2.20462).toFixed(1));

  const targetBfFraction = maxPct / 100;
  const targetWeightLbs = parseFloat((leanMassLbs / (1 - targetBfFraction)).toFixed(1));
  const targetWeightKg = parseFloat((targetWeightLbs / 2.20462).toFixed(1));
  const requiredWeightLossLbs = isCompliant ? 0 : parseFloat(Math.max(0, weightLbs - targetWeightLbs).toFixed(1));
  const requiredWeightLossKg = parseFloat((requiredWeightLossLbs / 2.20462).toFixed(1));

  let category: ArmyBodyFatResult["category"] = "Average";
  if (gender === "male") {
    if (bodyFatPct < 6) category = "Essential Fat";
    else if (bodyFatPct < 14) category = "Athletes";
    else if (bodyFatPct < 18) category = "Fitness";
    else if (bodyFatPct <= 24) category = "Average";
    else category = "ABCP Overweight";
  } else {
    if (bodyFatPct < 14) category = "Essential Fat";
    else if (bodyFatPct < 21) category = "Athletes";
    else if (bodyFatPct < 25) category = "Fitness";
    else if (bodyFatPct <= 31) category = "Average";
    else category = "ABCP Overweight";
  }

  const estimatedWeeksToPassAt1LbPerWeek = Math.ceil(requiredWeightLossLbs / 1.0);
  const estimatedWeeksToPassAt2LbsPerWeek = Math.ceil(requiredWeightLossLbs / 2.0);

  return {
    isValid: true,
    bodyFatPercentage: bodyFatPct,
    maxAllowableBodyFat: maxPct,
    complianceStatus,
    statusLabel,
    isCompliant,
    isAcftExempt,
    ageBracketId: bracketId,
    ageBracketLabel: bracketLabel,
    fatMassLbs,
    fatMassKg,
    leanMassLbs,
    leanMassKg,
    differenceFromMaxStandardPct: diffFromMax,
    requiredWeightLossLbs,
    requiredWeightLossKg,
    targetWeightLbs,
    targetWeightKg,
    category,
    methodUsedLabel: methodLabel,
    estimatedWeeksToPassAt1LbPerWeek,
    estimatedWeeksToPassAt2LbsPerWeek,
    weightLbs,
    weightKg,
    heightInches,
    heightCm,
    waistInches,
    waistCm,
  };
}
