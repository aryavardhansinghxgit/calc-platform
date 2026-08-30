export type UnitSystem = "imperial" | "metric";
export type Gender = "male" | "female";

export interface LeanBodyMassInput {
  unitSystem: UnitSystem;
  gender: Gender;
  isChild: boolean; // Age 14 or younger
  age?: number;
  weightLbs?: number; // imperial
  weightKg?: number; // metric
  heightInches?: number; // imperial
  heightCm?: number; // metric
}

export interface FormulaComparisonResult {
  formulaName: string;
  lbmKg: number;
  lbmLbs: number;
  lbmPercentage: number;
  bodyFatPercentage: number;
  description: string;
}

export interface LeanBodyMassResult {
  isChild: boolean;
  rawWeightKg: number;
  rawHeightCm: number;
  consensusLbmKg: number;
  consensusLbmLbs: number;
  consensusLbmPercentage: number;
  fatMassKg: number;
  fatMassLbs: number;
  bodyFatPercentage: number;
  fatFreeMassKg: number;
  fatFreeMassLbs: number;
  essentialFatKg: number;
  essentialFatLbs: number;
  bmi: number;
  formulaResults: FormulaComparisonResult[];
  hypertrophyTargets: Array<{
    addedMuscleLbs: number;
    targetTotalWeightLbs: number;
    targetTotalWeightKg: number;
    newLeanMassPercentage: number;
  }>;
}

export const LBM_CONSTANTS = {
  LB_TO_KG: 0.45359237,
  KG_TO_LB: 2.20462262185,
  INCH_TO_CM: 2.54,
  CM_TO_INCH: 1 / 2.54,
};

export function calculateLeanBodyMass(input: LeanBodyMassInput): LeanBodyMassResult {
  const gender = input.gender;
  const unitSystem = input.unitSystem;
  const rawAge = Number(input.age) || 30;

  // Strict biological age gating: Age <= 14 is Child (Peters), Age > 14 is Adult
  const isChild = rawAge <= 14;

  // Standard NIST Imperial to Metric normalization
  let weightKg = 72.5748;
  if (unitSystem === "imperial") {
    weightKg = (Number(input.weightLbs) || 160) * LBM_CONSTANTS.LB_TO_KG;
  } else {
    weightKg = Number(input.weightKg) || 72.5748;
  }

  let heightCm = 177.8;
  if (unitSystem === "imperial") {
    heightCm = (Number(input.heightInches) || 70) * LBM_CONSTANTS.INCH_TO_CM;
  } else {
    heightCm = Number(input.heightCm) || 177.8;
  }

  // Safe biological bounds (pediatric bounds: >= 2 kg, >= 40 cm; adult bounds: >= 10 kg, >= 80 cm)
  weightKg = Math.max(isChild ? 2 : 10, Math.min(300, weightKg));
  heightCm = Math.max(isChild ? 40 : 80, Math.min(250, heightCm));

  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  const formulaResults: FormulaComparisonResult[] = [];

  if (isChild) {
    // Peters Pediatric Formula (2011) for children aged <= 14
    // eECV = 0.0215 * Weight(kg)^0.6469 * Height(cm)^0.7236
    // eLBM = 3.8 * eECV
    const eecv = 0.0215 * Math.pow(weightKg, 0.6469) * Math.pow(heightCm, 0.7236);
    const petersLbmKg = 3.8 * eecv;
    const lbmKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, petersLbmKg));
    const lbmLbs = lbmKg * LBM_CONSTANTS.KG_TO_LB;
    const lbmPct = (lbmKg / weightKg) * 100;
    const bfPct = Math.max(2, 100 - lbmPct);

    formulaResults.push({
      formulaName: "Peters Pediatric Formula (2011)",
      lbmKg: parseFloat(lbmKg.toFixed(1)),
      lbmLbs: parseFloat(lbmLbs.toFixed(1)),
      lbmPercentage: parseFloat(lbmPct.toFixed(1)),
      bodyFatPercentage: parseFloat(bfPct.toFixed(1)),
      description: "Based on extracellular fluid volume (eECV) estimation for pediatric populations (age ≤14)",
    });
  } else {
    // Adult Formulas (>14 years old)

    // 1. Boer Formula (1984)
    // Male: 0.407 * W + 0.267 * H - 19.2
    // Female: 0.252 * W + 0.473 * H - 48.3
    let boerKg = 0;
    if (gender === "male") {
      boerKg = 0.407 * weightKg + 0.267 * heightCm - 19.2;
    } else {
      boerKg = 0.252 * weightKg + 0.473 * heightCm - 48.3;
    }
    boerKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, boerKg));
    const boerLbs = boerKg * LBM_CONSTANTS.KG_TO_LB;
    const boerPct = (boerKg / weightKg) * 100;
    const boerBf = Math.max(2, 100 - boerPct);

    formulaResults.push({
      formulaName: "Boer Formula (1984)",
      lbmKg: parseFloat(boerKg.toFixed(1)),
      lbmLbs: parseFloat(boerLbs.toFixed(1)),
      lbmPercentage: parseFloat(boerPct.toFixed(1)),
      bodyFatPercentage: parseFloat(boerBf.toFixed(1)),
      description: "Clinical standard widely used for medical drug dosage calibration",
    });

    // 2. James Formula (1976)
    // Male: 1.10 * W - 128 * (W / H)^2
    // Female: 1.07 * W - 148 * (W / H)^2
    let jamesKg = 0;
    const whRatio = weightKg / heightCm;
    if (gender === "male") {
      jamesKg = 1.1 * weightKg - 128 * Math.pow(whRatio, 2);
    } else {
      jamesKg = 1.07 * weightKg - 148 * Math.pow(whRatio, 2);
    }
    jamesKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, jamesKg));
    const jamesLbs = jamesKg * LBM_CONSTANTS.KG_TO_LB;
    const jamesPct = (jamesKg / weightKg) * 100;
    const jamesBf = Math.max(2, 100 - jamesPct);

    formulaResults.push({
      formulaName: "James Formula (1976)",
      lbmKg: parseFloat(jamesKg.toFixed(1)),
      lbmLbs: parseFloat(jamesLbs.toFixed(1)),
      lbmPercentage: parseFloat(jamesPct.toFixed(1)),
      bodyFatPercentage: parseFloat(jamesBf.toFixed(1)),
      description: "Classical anthropometric equation based on weight-to-height ratio square",
    });

    // 3. Hume Formula (1966)
    // Male: 0.32810 * W + 0.33929 * H - 29.5336
    // Female: 0.29569 * W + 0.41813 * H - 43.2933
    let humeKg = 0;
    if (gender === "male") {
      humeKg = 0.3281 * weightKg + 0.33929 * heightCm - 29.5336;
    } else {
      humeKg = 0.29569 * weightKg + 0.41813 * heightCm - 43.2933;
    }
    humeKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, humeKg));
    const humeLbs = humeKg * LBM_CONSTANTS.KG_TO_LB;
    const humePct = (humeKg / weightKg) * 100;
    const humeBf = Math.max(2, 100 - humePct);

    formulaResults.push({
      formulaName: "Hume Formula (1966)",
      lbmKg: parseFloat(humeKg.toFixed(1)),
      lbmLbs: parseFloat(humeLbs.toFixed(1)),
      lbmPercentage: parseFloat(humePct.toFixed(1)),
      bodyFatPercentage: parseFloat(humeBf.toFixed(1)),
      description: "Early clinical regression formula developed for basal metabolism research",
    });

    // 4. Janmahasatian Formula (2005)
    // Male: (9270 * W) / (6680 + 216 * BMI)
    // Female: (9270 * W) / (8780 + 244 * BMI)
    let janKg = 0;
    if (gender === "male") {
      janKg = (9270 * weightKg) / (6680 + 216 * bmi);
    } else {
      janKg = (9270 * weightKg) / (8780 + 244 * bmi);
    }
    janKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, janKg));
    const janLbs = janKg * LBM_CONSTANTS.KG_TO_LB;
    const janPct = (janKg / weightKg) * 100;
    const janBf = Math.max(2, 100 - janPct);

    formulaResults.push({
      formulaName: "Janmahasatian Formula (2005)",
      lbmKg: parseFloat(janKg.toFixed(1)),
      lbmLbs: parseFloat(janLbs.toFixed(1)),
      lbmPercentage: parseFloat(janPct.toFixed(1)),
      bodyFatPercentage: parseFloat(janBf.toFixed(1)),
      description: "Modern pharmacokinetic model accounting for non-linear BMI scaling",
    });
  }

  // Consensus Mean LBM:
  // For adults: arithmetic mean of Boer, James, Hume, and Janmahasatian
  // For children: Peters formula
  const rawAvgLbmKg = formulaResults.reduce((acc, curr) => acc + curr.lbmKg, 0) / formulaResults.length;
  const consensusLbmKg = parseFloat(rawAvgLbmKg.toFixed(1));
  const consensusLbmLbs = parseFloat((consensusLbmKg * LBM_CONSTANTS.KG_TO_LB).toFixed(1));
  const consensusLbmPct = parseFloat(((consensusLbmKg / weightKg) * 100).toFixed(1));

  // Scientific 2-Compartment Body Composition Identity:
  // Total Body Weight = Lean Body Mass (LBM) + Fat Mass
  // Fat-Free Mass (FFM) = Total Body Weight - Fat Mass = Lean Body Mass
  const fatMassKg = parseFloat(Math.max(0, weightKg - consensusLbmKg).toFixed(1));
  const fatMassLbs = parseFloat((fatMassKg * LBM_CONSTANTS.KG_TO_LB).toFixed(1));
  const bodyFatPct = parseFloat(Math.max(0, 100 - consensusLbmPct).toFixed(1));

  // In the classical 2-compartment model, FFM equals LBM
  const fatFreeMassKg = consensusLbmKg;
  const fatFreeMassLbs = consensusLbmLbs;

  // Essential fat component benchmark (informative physiological offset contained within LBM)
  // Men: ~3%, Women: ~9% of body weight
  const essentialFatRatio = gender === "male" ? 0.03 : 0.09;
  const essentialFatKg = parseFloat((weightKg * essentialFatRatio).toFixed(1));
  const essentialFatLbs = parseFloat((essentialFatKg * LBM_CONSTANTS.KG_TO_LB).toFixed(1));

  // Hypertrophy Targets (+5, +10, +15 lbs lean mass)
  const currentWeightLbs = weightKg * LBM_CONSTANTS.KG_TO_LB;
  const hypertrophyTargets = [5, 10, 15].map((addLbs) => {
    const newLbmLbs = consensusLbmLbs + addLbs;
    const newTotalLbs = currentWeightLbs + addLbs;
    const newLbmPct = parseFloat(((newLbmLbs / newTotalLbs) * 100).toFixed(1));

    return {
      addedMuscleLbs: addLbs,
      targetTotalWeightLbs: parseFloat(newTotalLbs.toFixed(1)),
      targetTotalWeightKg: parseFloat((newTotalLbs * LBM_CONSTANTS.LB_TO_KG).toFixed(1)),
      newLeanMassPercentage: newLbmPct,
    };
  });

  return {
    isChild,
    rawWeightKg: weightKg,
    rawHeightCm: heightCm,
    consensusLbmKg,
    consensusLbmLbs,
    consensusLbmPercentage: consensusLbmPct,
    fatMassKg,
    fatMassLbs,
    bodyFatPercentage: bodyFatPct,
    fatFreeMassKg,
    fatFreeMassLbs,
    essentialFatKg,
    essentialFatLbs,
    bmi,
    formulaResults,
    hypertrophyTargets,
  };
}
