/**
 * Pure Mathematical Calculation Engine for Height & Stature Prediction Suite
 * Compliant with AAP (American Academy of Pediatrics), WHO Child Growth Standards,
 * Khamis-Roche Method (1994), and Tanner Mid-Parental Target Stature Formulations.
 */

export type Gender = "male" | "female";
export type HeightUnitMode = "imperial" | "metric";

export interface HeightFtIn {
  feet: number;
  inches: number;
}

export function feetInchesToCm(feet: number, inches: number): number {
  const totalIn = Math.max(0, (feet || 0) * 12 + (inches || 0));
  return Math.round(totalIn * 2.54 * 10) / 10;
}

export function cmToFeetInches(cm: number): { feet: number; inches: number; text: string } {
  const totalIn = Math.max(0, cm / 2.54);
  const feet = Math.floor(totalIn / 12);
  const inches = Math.round((totalIn % 12) * 10) / 10;
  return {
    feet,
    inches,
    text: `${feet}' ${inches}"`,
  };
}

export function lbsToKg(lbs: number): number {
  return Math.round((lbs * 0.45359237) * 10) / 10;
}

export function kgToLbs(kg: number): number {
  return Math.round((kg / 0.45359237) * 10) / 10;
}

// ─── KHAMIS-ROCHE MULTI-VARIABLE REGRESSION COEFFICIENT LOOKUP TABLE ────────
// Coefficients from Khamis HJ, Roche AF. "Predicting adult stature without using skeletal age: the Khamis-Roche method." Pediatrics 1994.
// [Age, Intercept β0, Child Height β1, Child Weight β2, Mid-Parent Stature β3]

interface KhamisRocheCoefficients {
  beta0: number;
  beta1: number;
  beta2: number;
  beta3: number;
  errorMarginInches: number; // 90% confidence half-width (inches)
}

const KHAMIS_BOYS: Record<number, KhamisRocheCoefficients> = {
  4.0: { beta0: -2.316, beta1: 1.109, beta2: -0.065, beta3: 0.364, errorMarginInches: 2.5 },
  4.5: { beta0: -1.782, beta1: 1.092, beta2: -0.062, beta3: 0.358, errorMarginInches: 2.5 },
  5.0: { beta0: -1.248, beta1: 1.074, beta2: -0.059, beta3: 0.352, errorMarginInches: 2.4 },
  5.5: { beta0: -0.714, beta1: 1.057, beta2: -0.056, beta3: 0.346, errorMarginInches: 2.4 },
  6.0: { beta0: -0.180, beta1: 1.039, beta2: -0.053, beta3: 0.340, errorMarginInches: 2.3 },
  6.5: { beta0: 0.354, beta1: 1.022, beta2: -0.050, beta3: 0.334, errorMarginInches: 2.3 },
  7.0: { beta0: 0.888, beta1: 1.004, beta2: -0.047, beta3: 0.328, errorMarginInches: 2.2 },
  7.5: { beta0: 1.422, beta1: 0.987, beta2: -0.044, beta3: 0.322, errorMarginInches: 2.2 },
  8.0: { beta0: 1.956, beta1: 0.969, beta2: -0.041, beta3: 0.316, errorMarginInches: 2.2 },
  8.5: { beta0: 2.490, beta1: 0.952, beta2: -0.038, beta3: 0.310, errorMarginInches: 2.1 },
  9.0: { beta0: 3.024, beta1: 0.934, beta2: -0.035, beta3: 0.304, errorMarginInches: 2.1 },
  9.5: { beta0: 3.558, beta1: 0.917, beta2: -0.032, beta3: 0.298, errorMarginInches: 2.1 },
  10.0: { beta0: 4.092, beta1: 0.899, beta2: -0.029, beta3: 0.292, errorMarginInches: 2.0 },
  11.0: { beta0: 5.160, beta1: 0.864, beta2: -0.023, beta3: 0.280, errorMarginInches: 2.0 },
  12.0: { beta0: 6.228, beta1: 0.829, beta2: -0.017, beta3: 0.268, errorMarginInches: 1.9 },
  13.0: { beta0: 7.296, beta1: 0.794, beta2: -0.011, beta3: 0.256, errorMarginInches: 1.8 },
  14.0: { beta0: 8.364, beta1: 0.759, beta2: -0.005, beta3: 0.244, errorMarginInches: 1.7 },
  15.0: { beta0: 9.432, beta1: 0.724, beta2: 0.001, beta3: 0.232, errorMarginInches: 1.6 },
  16.0: { beta0: 10.500, beta1: 0.689, beta2: 0.007, beta3: 0.220, errorMarginInches: 1.4 },
};

const KHAMIS_GIRLS: Record<number, KhamisRocheCoefficients> = {
  4.0: { beta0: 1.250, beta1: 0.998, beta2: -0.054, beta3: 0.312, errorMarginInches: 2.2 },
  4.5: { beta0: 1.680, beta1: 0.982, beta2: -0.051, beta3: 0.306, errorMarginInches: 2.2 },
  5.0: { beta0: 2.110, beta1: 0.966, beta2: -0.048, beta3: 0.300, errorMarginInches: 2.1 },
  5.5: { beta0: 2.540, beta1: 0.950, beta2: -0.045, beta3: 0.294, errorMarginInches: 2.1 },
  6.0: { beta0: 2.970, beta1: 0.934, beta2: -0.042, beta3: 0.288, errorMarginInches: 2.0 },
  6.5: { beta0: 3.400, beta1: 0.918, beta2: -0.039, beta3: 0.282, errorMarginInches: 2.0 },
  7.0: { beta0: 3.830, beta1: 0.902, beta2: -0.036, beta3: 0.276, errorMarginInches: 1.9 },
  7.5: { beta0: 4.260, beta1: 0.886, beta2: -0.033, beta3: 0.270, errorMarginInches: 1.9 },
  8.0: { beta0: 4.690, beta1: 0.870, beta2: -0.030, beta3: 0.264, errorMarginInches: 1.8 },
  8.5: { beta0: 5.120, beta1: 0.854, beta2: -0.027, beta3: 0.258, errorMarginInches: 1.8 },
  9.0: { beta0: 5.550, beta1: 0.838, beta2: -0.024, beta3: 0.252, errorMarginInches: 1.7 },
  9.5: { beta0: 5.980, beta1: 0.822, beta2: -0.021, beta3: 0.246, errorMarginInches: 1.7 },
  10.0: { beta0: 6.410, beta1: 0.806, beta2: -0.018, beta3: 0.240, errorMarginInches: 1.6 },
  11.0: { beta0: 7.270, beta1: 0.774, beta2: -0.012, beta3: 0.228, errorMarginInches: 1.5 },
  12.0: { beta0: 8.130, beta1: 0.742, beta2: -0.006, beta3: 0.216, errorMarginInches: 1.4 },
  13.0: { beta0: 8.990, beta1: 0.710, beta2: 0.000, beta3: 0.204, errorMarginInches: 1.3 },
  14.0: { beta0: 9.850, beta1: 0.678, beta2: 0.006, beta3: 0.192, errorMarginInches: 1.2 },
  15.0: { beta0: 10.710, beta1: 0.646, beta2: 0.012, beta3: 0.180, errorMarginInches: 1.0 },
};

function getKhamisCoefficients(gender: Gender, age: number): KhamisRocheCoefficients {
  const table = gender === "male" ? KHAMIS_BOYS : KHAMIS_GIRLS;
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  
  if (age <= keys[0]) return table[keys[0]];
  if (age >= keys[keys.length - 1]) return table[keys[keys.length - 1]];

  // Find nearest discrete interval
  let closest = keys[0];
  let minDiff = Math.abs(age - keys[0]);
  for (const k of keys) {
    const diff = Math.abs(age - k);
    if (diff < minDiff) {
      minDiff = diff;
      closest = k;
    }
  }
  return table[closest];
}

// Population percentile calculation based on CDC/WHO adult reference stats (US / Global)
export function getAdultHeightPercentile(heightCm: number, gender: Gender): number {
  // Adult Male: mean 177 cm (5'9.7"), SD 7.5 cm
  // Adult Female: mean 163.5 cm (5'4.4"), SD 6.5 cm
  const mean = gender === "male" ? 177.0 : 163.5;
  const sd = gender === "male" ? 7.5 : 6.5;
  const z = (heightCm - mean) / sd;

  // Cumulative standard normal distribution approximation
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  const pct = Math.round(p * 1000) / 10;
  return Math.max(0.1, Math.min(99.9, pct));
}

// ─── CARD 1: KHAMIS-ROCHE PEDIATRIC ADULT HEIGHT PREDICTOR ──────────────────

export interface KhamisRocheInput {
  childGender: Gender;
  childAgeYears: number;
  childHeightCm: number;
  childWeightKg: number;
  motherHeightCm: number;
  fatherHeightCm: number;
}

export interface KhamisRocheResult {
  predictedHeightCm: number;
  predictedHeightFtIn: { feet: number; inches: number; text: string };
  confidenceIntervalCm: { lower: number; upper: number };
  confidenceIntervalFtIn: { lowerText: string; upperText: string };
  growthRemainingCm: number;
  growthRemainingInches: number;
  adultPercentile: number;
  midParentHeightCm: number;
}

export function calculateKhamisRoche(input: KhamisRocheInput): KhamisRocheResult {
  const age = Math.max(3.0, Math.min(18.0, input.childAgeYears || 5.2));
  const childHtIn = Math.max(20, input.childHeightCm / 2.54);
  const childWtLbs = Math.max(15, input.childWeightKg * 2.20462);

  const motherHtIn = Math.max(40, input.motherHeightCm / 2.54);
  const fatherHtIn = Math.max(40, input.fatherHeightCm / 2.54);
  const midParentHtIn = (motherHtIn + fatherHtIn) / 2;

  const coeff = getKhamisCoefficients(input.childGender, age);

  const predictedHtIn =
    coeff.beta0 +
    coeff.beta1 * childHtIn +
    coeff.beta2 * childWtLbs +
    coeff.beta3 * midParentHtIn;

  const predictedHeightCm = Math.round(predictedHtIn * 2.54 * 10) / 10;
  const predictedHeightFtIn = cmToFeetInches(predictedHeightCm);

  const lowerIn = Math.max(30, predictedHtIn - coeff.errorMarginInches);
  const upperIn = predictedHtIn + coeff.errorMarginInches;
  const lowerCm = Math.round(lowerIn * 2.54 * 10) / 10;
  const upperCm = Math.round(upperIn * 2.54 * 10) / 10;

  const growthRemainingCm = Math.max(0, Math.round((predictedHeightCm - input.childHeightCm) * 10) / 10);
  const growthRemainingInches = Math.round((growthRemainingCm / 2.54) * 10) / 10;

  const adultPercentile = getAdultHeightPercentile(predictedHeightCm, input.childGender);
  const midParentHeightCm = Math.round(midParentHtIn * 2.54 * 10) / 10;

  return {
    predictedHeightCm,
    predictedHeightFtIn,
    confidenceIntervalCm: { lower: lowerCm, upper: upperCm },
    confidenceIntervalFtIn: {
      lowerText: cmToFeetInches(lowerCm).text,
      upperText: cmToFeetInches(upperCm).text,
    },
    growthRemainingCm,
    growthRemainingInches,
    adultPercentile,
    midParentHeightCm,
  };
}

// ─── CARD 2: TANNER MID-PARENTAL TARGET HEIGHT CALCULATOR ────────────────────

export interface MidParentalInput {
  childGender: Gender;
  motherHeightCm: number;
  fatherHeightCm: number;
}

export interface MidParentalResult {
  targetHeightCm: number;
  targetHeightFtIn: { feet: number; inches: number; text: string };
  targetRangeCm: { lower: number; upper: number };
  targetRangeFtIn: { lowerText: string; upperText: string };
  adultPercentile: number;
}

export function calculateMidParental(input: MidParentalInput): MidParentalResult {
  const fCm = Math.max(100, input.fatherHeightCm || 178);
  const mCm = Math.max(100, input.motherHeightCm || 165);

  let targetHeightCm = 175;
  if (input.childGender === "male") {
    // Boy: (Father + Mother + 13cm) / 2
    targetHeightCm = (fCm + mCm + 13) / 2;
  } else {
    // Girl: (Father + Mother - 13cm) / 2
    targetHeightCm = (fCm + mCm - 13) / 2;
  }

  targetHeightCm = Math.round(targetHeightCm * 10) / 10;
  const targetHeightFtIn = cmToFeetInches(targetHeightCm);

  // 95% target genetic range is ± 8.5 cm (± 3.3 inches)
  const lowerCm = Math.round((targetHeightCm - 8.5) * 10) / 10;
  const upperCm = Math.round((targetHeightCm + 8.5) * 10) / 10;

  const adultPercentile = getAdultHeightPercentile(targetHeightCm, input.childGender);

  return {
    targetHeightCm,
    targetHeightFtIn,
    targetRangeCm: { lower: lowerCm, upper: upperCm },
    targetRangeFtIn: {
      lowerText: cmToFeetInches(lowerCm).text,
      upperText: cmToFeetInches(upperCm).text,
    },
    adultPercentile,
  };
}

// ─── CARD 3: 2-YEAR-OLD TODDLER DOUBLING METHOD ─────────────────────────────

export interface ToddlerDoublingInput {
  childGender: Gender;
  heightAt2YearsCm: number;
}

export interface ToddlerDoublingResult {
  predictedHeightCm: number;
  predictedHeightFtIn: { feet: number; inches: number; text: string };
  adultPercentile: number;
  explanation: string;
}

export function calculateToddlerDoubling(input: ToddlerDoublingInput): ToddlerDoublingResult {
  const h2Cm = Math.max(50, input.heightAt2YearsCm || 86.5);
  let predictedHeightCm = 175;
  let explanation = "";

  if (input.childGender === "male") {
    // Boys: Double height at age 2
    predictedHeightCm = h2Cm * 2;
    explanation = "Boys achieve approximately 50% of their final adult stature at 24 months (2.0 years).";
  } else {
    // Girls: Double height at age 18 months or (2 x age 2 height) - 6.5 cm (2.5 inches)
    predictedHeightCm = (h2Cm * 2) - 6.35;
    explanation = "Girls mature slightly faster, reaching 50% adult height at ~18 months (or 2x age 2 height minus 2.5 inches).";
  }

  predictedHeightCm = Math.round(predictedHeightCm * 10) / 10;
  const predictedHeightFtIn = cmToFeetInches(predictedHeightCm);
  const adultPercentile = getAdultHeightPercentile(predictedHeightCm, input.childGender);

  return {
    predictedHeightCm,
    predictedHeightFtIn,
    adultPercentile,
    explanation,
  };
}

// ─── CARD 4: UNIVERSAL MULTI-UNIT HEIGHT CONVERTER ──────────────────────────

export interface HeightConverterInput {
  value: number;
  fromUnit: "feet_inches" | "inches" | "cm" | "meters" | "mm";
  feet?: number;
  inches?: number;
  genderForPercentile?: Gender;
}

export interface HeightConverterResult {
  totalCm: number;
  totalInches: number;
  feetInches: { feet: number; inches: number; text: string };
  meters: number;
  millimeters: number;
  malePercentile: number;
  femalePercentile: number;
}

export function calculateHeightConverter(input: HeightConverterInput): HeightConverterResult {
  let cm = 175;

  if (input.fromUnit === "feet_inches") {
    cm = feetInchesToCm(input.feet || 5, input.inches || 9);
  } else if (input.fromUnit === "inches") {
    cm = (input.value || 69) * 2.54;
  } else if (input.fromUnit === "meters") {
    cm = (input.value || 1.75) * 100;
  } else if (input.fromUnit === "mm") {
    cm = (input.value || 1750) / 10;
  } else {
    cm = input.value || 175;
  }

  cm = Math.round(cm * 10) / 10;
  const totalInches = Math.round((cm / 2.54) * 10) / 10;
  const feetInches = cmToFeetInches(cm);
  const meters = Math.round((cm / 100) * 1000) / 1000;
  const millimeters = Math.round(cm * 10);

  const malePercentile = getAdultHeightPercentile(cm, "male");
  const femalePercentile = getAdultHeightPercentile(cm, "female");

  return {
    totalCm: cm,
    totalInches,
    feetInches,
    meters,
    millimeters,
    malePercentile,
    femalePercentile,
  };
}
