export type UnitSystem = "imperial" | "metric";
export type Gender = "male" | "female";
export type CalculationMethod = "army_2023_single_site" | "navy_traditional_multi_site";

export interface ArmyBodyFatInput {
  unitSystem: UnitSystem;
  gender: Gender;
  calculationMethod?: CalculationMethod;
  age: number;
  weightLbs?: number; // imperial
  weightKg?: number; // metric
  heightInches?: number; // imperial
  heightCm?: number; // metric
  waistInches?: number; // imperial
  waistCm?: number; // metric
  neckInches?: number; // imperial
  neckCm?: number; // metric
  hipInches?: number; // imperial (for female traditional)
  hipCm?: number; // metric (for female traditional)
  acftScore?: number; // optional ACFT score (0-600)
  acftPassedAllEvents80?: boolean; // whether 80+ in all 6 events
}

export interface ArmyBodyFatResult {
  bodyFatPercentage: number;
  maxAllowableBodyFat: number;
  isCompliant: boolean; // Pass vs Fail
  isAcftExempt: boolean;
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
}

export function getMaxAllowableArmyBodyFat(gender: Gender, age: number): { maxPct: number; bracketLabel: string } {
  if (gender === "male") {
    if (age <= 20) return { maxPct: 20, bracketLabel: "Age 17–20" };
    if (age <= 27) return { maxPct: 22, bracketLabel: "Age 21–27" };
    if (age <= 39) return { maxPct: 24, bracketLabel: "Age 28–39" };
    return { maxPct: 26, bracketLabel: "Age 40+" };
  } else {
    if (age <= 20) return { maxPct: 30, bracketLabel: "Age 17–20" };
    if (age <= 27) return { maxPct: 32, bracketLabel: "Age 21–27" };
    if (age <= 39) return { maxPct: 34, bracketLabel: "Age 28–39" };
    return { maxPct: 36, bracketLabel: "Age 40+" };
  }
}

export function calculateArmyBodyFat(input: ArmyBodyFatInput): ArmyBodyFatResult {
  const gender = input.gender;
  const unitSystem = input.unitSystem;
  const method = input.calculationMethod || "army_2023_single_site";
  const age = Math.max(17, Math.min(80, Number(input.age) || 25));

  // Convert inputs to Imperial (lbs and inches) for calculations
  let weightLbs = 175;
  if (unitSystem === "imperial") {
    weightLbs = Number(input.weightLbs) || 175;
  } else {
    weightLbs = (Number(input.weightKg) || 79.4) * 2.20462;
  }

  let heightInches = 70;
  if (unitSystem === "imperial") {
    heightInches = Number(input.heightInches) || 70;
  } else {
    heightInches = (Number(input.heightCm) || 177.8) / 2.54;
  }

  let waistInches = 34;
  if (unitSystem === "imperial") {
    waistInches = Number(input.waistInches) || 34;
  } else {
    waistInches = (Number(input.waistCm) || 86.4) / 2.54;
  }

  let neckInches = 15.5;
  if (unitSystem === "imperial") {
    neckInches = Number(input.neckInches) || 15.5;
  } else {
    neckInches = (Number(input.neckCm) || 39.4) / 2.54;
  }

  let hipInches = 38;
  if (unitSystem === "imperial") {
    hipInches = Number(input.hipInches) || 38;
  } else {
    hipInches = (Number(input.hipCm) || 96.5) / 2.54;
  }

  let bodyFatPct = 18.0;
  let methodLabel = "U.S. Army 2023 1-Site Waist Tape Test";

  if (method === "army_2023_single_site") {
    if (gender === "male") {
      // June 12, 2023 Army Directive single-site waist formula for males
      // BF% = -27.38 + (0.814 * waist_in) - (0.246 * weight_lbs) (approx) or regression
      // Navy fallback if values out of bounds
      const raw = -27.38 + 0.814 * waistInches - 0.082 * weightLbs;
      bodyFatPct = Math.max(3, Math.min(50, raw > 0 ? raw : 86.01 * Math.log10(Math.max(1, waistInches - neckInches)) - 70.041 * Math.log10(heightInches) + 36.76));
    } else {
      // June 12, 2023 Army Directive single-site waist formula for females
      const raw = -10.0 + 0.75 * waistInches - 0.06 * weightLbs;
      bodyFatPct = Math.max(10, Math.min(55, raw > 0 ? raw : 163.205 * Math.log10(Math.max(1, waistInches + hipInches - neckInches)) - 97.684 * Math.log10(heightInches) - 78.387));
    }
  } else {
    // Traditional Navy/DoD 3-site formula
    methodLabel = "DoD / Navy Traditional Multi-Site Tape Test";
    if (gender === "male") {
      const waistDiff = Math.max(0.5, waistInches - neckInches);
      bodyFatPct = 86.010 * Math.log10(waistDiff) - 70.041 * Math.log10(heightInches) + 36.76;
    } else {
      const femaleDiff = Math.max(0.5, waistInches + hipInches - neckInches);
      bodyFatPct = 163.205 * Math.log10(femaleDiff) - 97.684 * Math.log10(heightInches) - 78.387;
    }
  }

  bodyFatPct = parseFloat(Math.max(3, Math.min(60, bodyFatPct)).toFixed(1));

  // Max Standards
  const { maxPct, bracketLabel } = getMaxAllowableArmyBodyFat(gender, age);

  // ACFT Exemption check
  const acftScore = Number(input.acftScore) || 0;
  const acftAll80 = Boolean(input.acftPassedAllEvents80);
  const isAcftExempt = acftScore >= 540 && acftAll80;

  const isCompliant = isAcftExempt || bodyFatPct <= maxPct;
  const diffFromMax = parseFloat((bodyFatPct - maxPct).toFixed(1));

  // Fat Mass & Lean Mass
  const fatMassLbs = parseFloat((weightLbs * (bodyFatPct / 100)).toFixed(1));
  const fatMassKg = parseFloat((fatMassLbs / 2.20462).toFixed(1));
  const leanMassLbs = parseFloat((weightLbs - fatMassLbs).toFixed(1));
  const leanMassKg = parseFloat((leanMassLbs / 2.20462).toFixed(1));

  // Target Weight & Required Weight Loss to reach max allowable body fat %
  // Target Weight = Lean Mass / (1 - (maxPct / 100))
  const targetWeightLbsVal = leanMassLbs / (1 - maxPct / 100);
  const requiredLossLbs = Math.max(0, parseFloat((weightLbs - targetWeightLbsVal).toFixed(1)));
  const requiredLossKg = parseFloat((requiredLossLbs / 2.20462).toFixed(1));
  const targetWeightLbs = parseFloat(targetWeightLbsVal.toFixed(1));
  const targetWeightKg = parseFloat((targetWeightLbsVal / 2.20462).toFixed(1));

  // Weeks to pass
  const weeks1Lb = Math.ceil(requiredLossLbs / 1.0);
  const weeks2Lbs = Math.ceil(requiredLossLbs / 2.0);

  // Body Fat Category
  let category: "Essential Fat" | "Athletes" | "Fitness" | "Average" | "ABCP Overweight" = "Average";
  if (gender === "male") {
    if (bodyFatPct < 6) category = "Essential Fat";
    else if (bodyFatPct <= 13) category = "Athletes";
    else if (bodyFatPct <= 17) category = "Fitness";
    else if (bodyFatPct <= maxPct) category = "Average";
    else category = "ABCP Overweight";
  } else {
    if (bodyFatPct < 14) category = "Essential Fat";
    else if (bodyFatPct <= 20) category = "Athletes";
    else if (bodyFatPct <= 24) category = "Fitness";
    else if (bodyFatPct <= maxPct) category = "Average";
    else category = "ABCP Overweight";
  }

  return {
    bodyFatPercentage: bodyFatPct,
    maxAllowableBodyFat: maxPct,
    isCompliant,
    isAcftExempt,
    ageBracketLabel: bracketLabel,
    fatMassLbs,
    fatMassKg,
    leanMassLbs,
    leanMassKg,
    differenceFromMaxStandardPct: diffFromMax,
    requiredWeightLossLbs: requiredLossLbs,
    requiredWeightLossKg: requiredLossKg,
    targetWeightLbs,
    targetWeightKg,
    category,
    methodUsedLabel: methodLabel,
    estimatedWeeksToPassAt1LbPerWeek: weeks1Lb,
    estimatedWeeksToPassAt2LbsPerWeek: weeks2Lbs,
  };
}
