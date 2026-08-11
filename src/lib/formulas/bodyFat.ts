export type UnitSystem = "us" | "metric" | "other";
export type Gender = "male" | "female";

export interface BodyFatInput {
  unitSystem?: UnitSystem;
  gender: Gender;
  age: number;
  // US Units
  heightFeet?: number;
  heightInches?: number;
  weightLbs?: number;
  neckInches?: number;
  waistInches?: number;
  hipInches?: number; // Required for females
  // Metric Units
  heightCm?: number;
  weightKg?: number;
  neckCm?: number;
  waistCm?: number;
  hipCm?: number;
  // Other units
  heightMeters?: number;
  weightKgOther?: number;
  // Target BFP for scenario planner
  targetBfpGoal?: number;
}

export interface BodyFatCategoryInfo {
  category: "Essential Fat" | "Athletes" | "Fitness" | "Average" | "Obese";
  color: string;
  minPercent: number;
  maxPercent: number;
  description: string;
}

export interface BodyFatResult {
  navyBfp: number;
  bmiBfp: number;
  heightCm: number;
  heightInches: number;
  weightKg: number;
  weightLbs: number;
  bmi: number;
  // Mass metrics
  fatMassLbs: number;
  fatMassKg: number;
  leanMassLbs: number;
  leanMassKg: number;
  // FFMI
  ffmi: number;
  ffmiNormalized: number;
  // Ideal BFP (Jackson & Pollock)
  idealBfpJacksonPollock: number;
  idealFatMassLbs: number;
  fatDifferenceLbs: number; // positive = to lose, negative = to gain
  targetWeightForIdealLbs: number;
  // Category classification
  categoryInfo: BodyFatCategoryInfo;
  // Scenario planner
  customTargetBfp: number;
  customTargetWeightLbs: number;
  customFatToLoseLbs: number;
  weeksToTargetAt1LbPerWk: number;
}

export function calculateBodyFat(input: BodyFatInput): BodyFatResult {
  const gender: Gender = input.gender === "female" ? "female" : "male";
  const age = Math.max(2, Math.min(120, Number(input.age) || 25));
  const unitSystem = input.unitSystem || "us";

  let heightCm = 178;
  let weightKg = 72.5;
  let neckCm = 38;
  let waistCm = 85;
  let hipCm = 95;

  if (unitSystem === "us") {
    const feet = Number(input.heightFeet) || 5;
    const inches = Number(input.heightInches) || 10;
    const totalHeightIn = feet * 12 + inches;
    heightCm = totalHeightIn * 2.54;
    weightKg = (Number(input.weightLbs) || 160) * 0.45359237;
    neckCm = (Number(input.neckInches) || 15) * 2.54;
    waistCm = (Number(input.waistInches) || 33) * 2.54;
    hipCm = (Number(input.hipInches) || 38) * 2.54;
  } else if (unitSystem === "metric") {
    heightCm = Number(input.heightCm) || 178;
    weightKg = Number(input.weightKg) || 72.5;
    neckCm = Number(input.neckCm) || 38;
    waistCm = Number(input.waistCm) || 85;
    hipCm = Number(input.hipCm) || 95;
  } else if (unitSystem === "other") {
    if (input.heightMeters && input.heightMeters > 0) heightCm = input.heightMeters * 100;
    if (input.weightKgOther && input.weightKgOther > 0) weightKg = input.weightKgOther;
    if (input.neckCm && input.neckCm > 0) neckCm = input.neckCm;
    if (input.waistCm && input.waistCm > 0) waistCm = input.waistCm;
    if (input.hipCm && input.hipCm > 0) hipCm = input.hipCm;
  }

  // Safety clamps
  heightCm = Math.max(80, Math.min(250, heightCm));
  weightKg = Math.max(25, Math.min(350, weightKg));
  neckCm = Math.max(20, Math.min(80, neckCm));
  waistCm = Math.max(40, Math.min(200, waistCm));
  hipCm = Math.max(40, Math.min(200, hipCm));

  const heightInches = parseFloat((heightCm / 2.54).toFixed(1));
  const weightLbs = parseFloat((weightKg / 0.45359237).toFixed(1));
  const neckInches = parseFloat((neckCm / 2.54).toFixed(1));
  const waistInches = parseFloat((waistCm / 2.54).toFixed(1));
  const hipInches = parseFloat((hipCm / 2.54).toFixed(1));

  // 1. U.S. Navy Method Calculation
  let navyBfp = 0;
  if (gender === "male") {
    const diff = Math.max(1, waistInches - neckInches);
    navyBfp = 86.01 * Math.log10(diff) - 70.041 * Math.log10(heightInches) + 36.76;
  } else {
    const diff = Math.max(1, waistInches + hipInches - neckInches);
    navyBfp = 163.205 * Math.log10(diff) - 97.684 * Math.log10(heightInches) - 78.387;
  }
  navyBfp = parseFloat(Math.max(2, Math.min(65, navyBfp)).toFixed(1));

  // 2. BMI Method Calculation (Deurenberg et al.)
  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  let bmiBfp = 0;
  if (age < 18) {
    bmiBfp = gender === "male" ? 1.51 * bmi - 0.7 * age - 2.2 : 1.51 * bmi - 0.7 * age + 1.4;
  } else {
    bmiBfp = gender === "male" ? 1.2 * bmi + 0.23 * age - 16.2 : 1.2 * bmi + 0.23 * age - 5.4;
  }
  bmiBfp = parseFloat(Math.max(2, Math.min(65, bmiBfp)).toFixed(1));

  // Mass metrics (Primary BFP is Navy Method)
  const primaryBfp = navyBfp;
  const fatMassLbs = parseFloat(((weightLbs * primaryBfp) / 100).toFixed(1));
  const fatMassKg = parseFloat(((weightKg * primaryBfp) / 100).toFixed(1));
  const leanMassLbs = parseFloat((weightLbs - fatMassLbs).toFixed(1));
  const leanMassKg = parseFloat((weightKg - fatMassKg).toFixed(1));

  // FFMI Calculation
  const ffmi = parseFloat((leanMassKg / (heightM * heightM)).toFixed(1));
  const ffmiNormalized = parseFloat((ffmi + 6.1 * (1.8 - heightM)).toFixed(1));

  // 3. Jackson & Pollock Ideal BFP by Age
  let idealBfpJacksonPollock = 0;
  if (gender === "male") {
    idealBfpJacksonPollock = parseFloat((8.5 + (Math.max(20, age) - 20) * 0.35).toFixed(1));
  } else {
    idealBfpJacksonPollock = parseFloat((17.7 + (Math.max(20, age) - 20) * 0.25).toFixed(1));
  }
  idealBfpJacksonPollock = Math.max(5, Math.min(32, idealBfpJacksonPollock));

  const targetWeightForIdealLbs = parseFloat((leanMassLbs / (1 - idealBfpJacksonPollock / 100)).toFixed(1));
  const idealFatMassLbs = parseFloat(((targetWeightForIdealLbs * idealBfpJacksonPollock) / 100).toFixed(1));
  const fatDifferenceLbs = parseFloat((weightLbs - targetWeightForIdealLbs).toFixed(1));

  // 4. Custom Scenario Target BFP Planner
  const customTargetBfp = input.targetBfpGoal && input.targetBfpGoal > 0 ? input.targetBfpGoal : idealBfpJacksonPollock;
  const customTargetWeightLbs = parseFloat((leanMassLbs / (1 - customTargetBfp / 100)).toFixed(1));
  const customFatToLoseLbs = parseFloat((weightLbs - customTargetWeightLbs).toFixed(1));
  const weeksToTargetAt1LbPerWk = Math.max(0, Math.ceil(customFatToLoseLbs));

  // 5. ACE Body Fat Categorization
  const getCategoryInfo = (bfp: number, g: Gender): BodyFatCategoryInfo => {
    if (g === "female") {
      if (bfp < 14) return { category: "Essential Fat", color: "#38bdf8", minPercent: 10, maxPercent: 13.9, description: "Minimum physiological fat required for hormonal health" };
      if (bfp < 21) return { category: "Athletes", color: "#34d399", minPercent: 14, maxPercent: 20.9, description: "Elite physical condition and high muscularity" };
      if (bfp < 25) return { category: "Fitness", color: "#10b981", minPercent: 21, maxPercent: 24.9, description: "Optimal metabolic fitness and body composition" };
      if (bfp < 32) return { category: "Average", color: "#facc15", minPercent: 25, maxPercent: 31.9, description: "Standard population healthy baseline range" };
      return { category: "Obese", color: "#f87171", minPercent: 32, maxPercent: 65, description: "Elevated risk of cardiovascular and metabolic complications" };
    } else {
      if (bfp < 6) return { category: "Essential Fat", color: "#38bdf8", minPercent: 2, maxPercent: 5.9, description: "Minimum physiological fat required for basic survival" };
      if (bfp < 14) return { category: "Athletes", color: "#34d399", minPercent: 6, maxPercent: 13.9, description: "Elite physical condition and vascular lean mass" };
      if (bfp < 18) return { category: "Fitness", color: "#10b981", minPercent: 14, maxPercent: 17.9, description: "Optimal athletic fitness and abdominal definition" };
      if (bfp < 25) return { category: "Average", color: "#facc15", minPercent: 18, maxPercent: 24.9, description: "Standard healthy population range" };
      return { category: "Obese", color: "#f87171", minPercent: 25, maxPercent: 65, description: "Elevated risk of metabolic disease and inflammation" };
    }
  };

  const categoryInfo = getCategoryInfo(primaryBfp, gender);

  return {
    navyBfp,
    bmiBfp,
    heightCm: Math.round(heightCm),
    heightInches,
    weightKg: parseFloat(weightKg.toFixed(1)),
    weightLbs,
    bmi,
    fatMassLbs,
    fatMassKg,
    leanMassLbs,
    leanMassKg,
    ffmi,
    ffmiNormalized,
    idealBfpJacksonPollock,
    idealFatMassLbs,
    fatDifferenceLbs,
    targetWeightForIdealLbs,
    categoryInfo,
    customTargetBfp,
    customTargetWeightLbs,
    customFatToLoseLbs,
    weeksToTargetAt1LbPerWk,
  };
}
