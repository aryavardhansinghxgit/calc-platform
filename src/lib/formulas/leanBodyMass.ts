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

export function calculateLeanBodyMass(input: LeanBodyMassInput): LeanBodyMassResult {
  const gender = input.gender;
  const unitSystem = input.unitSystem;
  const isChild = Boolean(input.isChild);

  // Imperial to Metric normalization
  let weightKg = 72.5;
  if (unitSystem === "imperial") {
    weightKg = (Number(input.weightLbs) || 160) / 2.20462;
  } else {
    weightKg = Number(input.weightKg) || 72.5;
  }

  let heightCm = 177.8;
  if (unitSystem === "imperial") {
    heightCm = (Number(input.heightInches) || 70) * 2.54;
  } else {
    heightCm = Number(input.heightCm) || 177.8;
  }

  weightKg = Math.max(10, Math.min(300, weightKg));
  heightCm = Math.max(80, Math.min(250, heightCm));

  const heightM = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightM * heightM)).toFixed(1));

  const formulaResults: FormulaComparisonResult[] = [];

  if (isChild) {
    // Peters Formula (2011) for children aged <= 14
    const eecv = 0.0215 * Math.pow(weightKg, 0.6469) * Math.pow(heightCm, 0.7236);
    const petersLbmKg = 3.8 * eecv;
    const lbmKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.5, petersLbmKg));
    const lbmLbs = lbmKg * 2.20462;
    const lbmPct = (lbmKg / weightKg) * 100;
    const bfPct = Math.max(2, 100 - lbmPct);

    formulaResults.push({
      formulaName: "Peters Formula (Children ≤14)",
      lbmKg: parseFloat(lbmKg.toFixed(1)),
      lbmLbs: parseFloat(lbmLbs.toFixed(1)),
      lbmPercentage: parseFloat(lbmPct.toFixed(1)),
      bodyFatPercentage: parseFloat(bfPct.toFixed(1)),
      description: "Based on extracellular fluid volume (eECV) estimation for pediatric populations",
    });
  } else {
    // Adult Formulas
    // 1. Boer Formula (1984)
    let boerKg = 0;
    if (gender === "male") {
      boerKg = 0.407 * weightKg + 0.267 * heightCm - 19.2;
    } else {
      boerKg = 0.252 * weightKg + 0.473 * heightCm - 48.3;
    }
    boerKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, boerKg));
    const boerLbs = boerKg * 2.20462;
    const boerPct = (boerKg / weightKg) * 100;
    const boerBf = Math.max(2, 100 - boerPct);

    formulaResults.push({
      formulaName: "Boer Formula (1984)",
      lbmKg: parseFloat(boerKg.toFixed(1)),
      lbmLbs: parseFloat(boerLbs.toFixed(1)),
      lbmPercentage: parseFloat(boerPct.toFixed(1)),
      bodyFatPercentage: parseFloat(boerBf.toFixed(1)),
      description: "Clinical gold standard widely used for medical drug dosage calibration",
    });

    // 2. James Formula (1976)
    let jamesKg = 0;
    const whRatio = weightKg / heightCm;
    if (gender === "male") {
      jamesKg = 1.1 * weightKg - 128 * Math.pow(whRatio, 2);
    } else {
      jamesKg = 1.07 * weightKg - 148 * Math.pow(whRatio, 2);
    }
    jamesKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, jamesKg));
    const jamesLbs = jamesKg * 2.20462;
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
    let humeKg = 0;
    if (gender === "male") {
      humeKg = 0.3281 * weightKg + 0.33929 * heightCm - 29.5336;
    } else {
      humeKg = 0.29569 * weightKg + 0.41813 * heightCm - 43.2933;
    }
    humeKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, humeKg));
    const humeLbs = humeKg * 2.20462;
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
    let janKg = 0;
    if (gender === "male") {
      janKg = (9270 * weightKg) / (6680 + 216 * bmi);
    } else {
      janKg = (9270 * weightKg) / (8780 + 244 * bmi);
    }
    janKg = Math.min(weightKg * 0.95, Math.max(weightKg * 0.4, janKg));
    const janLbs = janKg * 2.20462;
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

  // Consensus Mean LBM
  const avgLbmKg = formulaResults.reduce((acc, curr) => acc + curr.lbmKg, 0) / formulaResults.length;
  const consensusLbmKg = parseFloat(avgLbmKg.toFixed(1));
  const consensusLbmLbs = parseFloat((consensusLbmKg * 2.20462).toFixed(1));
  const consensusLbmPct = parseFloat(((consensusLbmKg / weightKg) * 100).toFixed(1));

  const fatMassKg = parseFloat((weightKg - consensusLbmKg).toFixed(1));
  const fatMassLbs = parseFloat((fatMassKg * 2.20462).toFixed(1));
  const bodyFatPct = parseFloat((100 - consensusLbmPct).toFixed(1));

  // Essential fat vs Fat Free Mass
  const essentialFatRatio = gender === "male" ? 0.03 : 0.09;
  const essentialFatKg = parseFloat((weightKg * essentialFatRatio).toFixed(1));
  const essentialFatLbs = parseFloat((essentialFatKg * 2.20462).toFixed(1));
  const fatFreeMassKg = parseFloat((consensusLbmKg + essentialFatKg).toFixed(1));
  const fatFreeMassLbs = parseFloat((fatFreeMassKg * 2.20462).toFixed(1));

  // Hypertrophy Targets (+5, +10, +15 lbs lean mass)
  const currentWeightLbs = weightKg * 2.20462;
  const hypertrophyTargets = [5, 10, 15].map((addLbs) => {
    const newLbmLbs = consensusLbmLbs + addLbs;
    const newTotalLbs = currentWeightLbs + addLbs;
    const newLbmPct = parseFloat(((newLbmLbs / newTotalLbs) * 100).toFixed(1));

    return {
      addedMuscleLbs: addLbs,
      targetTotalWeightLbs: parseFloat(newTotalLbs.toFixed(1)),
      targetTotalWeightKg: parseFloat((newTotalLbs / 2.20462).toFixed(1)),
      newLeanMassPercentage: newLbmPct,
    };
  });

  return {
    isChild,
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
