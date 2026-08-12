import {
  BsaInputs,
  BsaResults,
  BsaFormulaItem,
  ChemoDosingResult,
  CardiacIndexResult,
  GfrNormalizationResult,
  PopulationBenchmark,
} from "./types";

/**
 * 1. Mosteller Formula (1987) - Clinical Gold Standard
 * BSA (m2) = sqrt( (W_kg * H_cm) / 3600 )
 */
export function calcMosteller(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return Math.sqrt((weightKg * heightCm) / 3600);
}

/**
 * 2. Du Bois & Du Bois Formula (1916)
 * BSA (m2) = 0.007184 * W_kg^0.425 * H_cm^0.725
 */
export function calcDuBois(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);
}

/**
 * 3. Haycock Formula (1978) - Pediatric Gold Standard
 * BSA (m2) = 0.024265 * W_kg^0.5378 * H_cm^0.3964
 */
export function calcHaycock(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return 0.024265 * Math.pow(weightKg, 0.5378) * Math.pow(heightCm, 0.3964);
}

/**
 * 4. Gehan & George Formula (1970)
 * BSA (m2) = 0.0235 * W_kg^0.51456 * H_cm^0.42246
 */
export function calcGehanGeorge(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return 0.0235 * Math.pow(weightKg, 0.51456) * Math.pow(heightCm, 0.42246);
}

/**
 * 5. Boyd Formula (1935)
 * BSA (m2) = 0.03330 * W_kg^(0.6157 - 0.0188 * log10(W_kg)) * H_cm^0.3
 */
export function calcBoyd(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  const exp = 0.6157 - 0.0188 * Math.log10(weightKg);
  return 0.0333 * Math.pow(weightKg, exp) * Math.pow(heightCm, 0.3);
}

/**
 * 6. Fujimoto Formula (1968) - Asian Demographic
 * BSA (m2) = 0.008883 * W_kg^0.444 * H_cm^0.663
 */
export function calcFujimoto(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return 0.008883 * Math.pow(weightKg, 0.444) * Math.pow(heightCm, 0.663);
}

/**
 * 7. Takahira Formula (1968) - Japanese Demographic
 * BSA (m2) = 0.007241 * W_kg^0.425 * H_cm^0.725
 */
export function calcTakahira(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  return 0.007241 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);
}

/**
 * 8. Schlich Formula (2010) - Gender 3D Body Scan
 * Women: BSA = 0.000975482 * W_kg^0.46 * H_cm^1.08
 * Men: BSA = 0.000579479 * W_kg^0.38 * H_cm^1.24
 */
export function calcSchlich(weightKg: number, heightCm: number, gender: "male" | "female"): number {
  if (weightKg <= 0 || heightCm <= 0) return 0;
  if (gender === "female") {
    return 0.000975482 * Math.pow(weightKg, 0.46) * Math.pow(heightCm, 1.08);
  }
  return 0.000579479 * Math.pow(weightKg, 0.38) * Math.pow(heightCm, 1.24);
}

/**
 * 9. Costeff Emergency Formula (1966) - Fast Pediatric
 * BSA (m2) = (4 * W_kg + 7) / (W_kg + 90)
 */
export function calcCosteff(weightKg: number): number {
  if (weightKg <= 0) return 0;
  return (4 * weightKg + 7) / (weightKg + 90);
}

/**
 * Ideal Body Weight (Devine Equation 1974)
 */
export function calcDevineIbw(heightCm: number, gender: "male" | "female"): number {
  const heightInches = heightCm / 2.54;
  const inchesOver5Ft = Math.max(0, heightInches - 60);
  if (gender === "male") {
    return 50 + 2.3 * inchesOver5Ft;
  }
  return 45.5 + 2.3 * inchesOver5Ft;
}

/**
 * Lean Body Mass (Boer Equation 1984)
 */
export function calcBoerLbm(weightKg: number, heightCm: number, gender: "male" | "female"): number {
  if (gender === "male") {
    return 0.407 * weightKg + 0.267 * heightCm - 19.2;
  }
  return 0.252 * weightKg + 0.473 * heightCm - 48.3;
}

/**
 * Main Body Surface Area Calculator Execution Function
 */
export function calculateBsaCalculator(inputs: BsaInputs): BsaResults {
  const {
    mode,
    gender,
    unitSystem,
    ageYears,
    heightFeet = 5,
    heightInches = 10,
    weightLbs = 160,
    heightCm: inputHeightCm = 170,
    weightKg: inputWeightKg = 70,
    targetChemoDoseMgM2 = 100,
    capObeseBsaAt2m2 = false,
    targetCarboplatinAuc = 5,
    targetGFR = 100,
    cardiacOutputLmin = 5.0,
    heartRateBpm = 72,
    unadjustedGfrMlMin = 90,
  } = inputs;

  // 1. Height & Weight Standardization
  let heightCm = inputHeightCm;
  let weightKg = inputWeightKg;
  let heightInchesTotal = heightFeet * 12 + heightInches;

  if (unitSystem === "us") {
    heightCm = heightInchesTotal * 2.54;
    weightKg = weightLbs * 0.45359237;
  } else {
    heightInchesTotal = heightCm / 2.54;
  }

  // 2. BMI & Anthropometrics
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? Number((weightKg / (heightM * heightM)).toFixed(1)) : 0;
  let bmiCategory = "Normal weight";
  if (bmi < 18.5) bmiCategory = "Underweight";
  else if (bmi < 25) bmiCategory = "Normal weight";
  else if (bmi < 30) bmiCategory = "Overweight";
  else bmiCategory = "Obese";

  const idealBodyWeightKg = Number(calcDevineIbw(heightCm, gender).toFixed(1));
  const leanBodyMassKg = Number(Math.max(0, calcBoerLbm(weightKg, heightCm, gender)).toFixed(1));

  // 3. Compute 8 BSA Formulas
  const mostellerVal = calcMosteller(weightKg, heightCm);
  const duBoisVal = calcDuBois(weightKg, heightCm);
  const haycockVal = calcHaycock(weightKg, heightCm);
  const gehanGeorgeVal = calcGehanGeorge(weightKg, heightCm);
  const boydVal = calcBoyd(weightKg, heightCm);
  const fujimotoVal = calcFujimoto(weightKg, heightCm);
  const takahiraVal = calcTakahira(weightKg, heightCm);
  const schlichVal = calcSchlich(weightKg, heightCm, gender);
  const costeffVal = calcCosteff(weightKg);

  const convertToFt2 = (m2: number) => m2 * 10.7639;

  const formulaList: BsaFormulaItem[] = [
    {
      formulaKey: "mosteller",
      formulaName: "Mosteller (1987)",
      year: "1987",
      bsaM2: Number(mostellerVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(mostellerVal).toFixed(2)),
      varianceFromMosteller: 0,
      description: "Clinical gold standard equation used in oncology and nephrology.",
    },
    {
      formulaKey: "dubois",
      formulaName: "Du Bois & Du Bois (1916)",
      year: "1916",
      bsaM2: Number(duBoisVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(duBoisVal).toFixed(2)),
      varianceFromMosteller: Number((((duBoisVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Classic historical 9-subject metabolic chamber study formula.",
    },
    {
      formulaKey: "haycock",
      formulaName: "Haycock (1978)",
      year: "1978",
      bsaM2: Number(haycockVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(haycockVal).toFixed(2)),
      varianceFromMosteller: Number((((haycockVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Validated across infants, children, and adults (high precision).",
    },
    {
      formulaKey: "gehan-george",
      formulaName: "Gehan & George (1970)",
      year: "1970",
      bsaM2: Number(gehanGeorgeVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(gehanGeorgeVal).toFixed(2)),
      varianceFromMosteller: Number((((gehanGeorgeVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "229-subject 2D surface measurement study.",
    },
    {
      formulaKey: "boyd",
      formulaName: "Boyd (1935)",
      year: "1935",
      bsaM2: Number(boydVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(boydVal).toFixed(2)),
      varianceFromMosteller: Number((((boydVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Logarithmic weight polynomial curve fitting equation.",
    },
    {
      formulaKey: "fujimoto",
      formulaName: "Fujimoto (1968)",
      year: "1968",
      bsaM2: Number(fujimotoVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(fujimotoVal).toFixed(2)),
      varianceFromMosteller: Number((((fujimotoVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Derived specifically for East Asian anthropometric baselines.",
    },
    {
      formulaKey: "takahira",
      formulaName: "Takahira (1968)",
      year: "1968",
      bsaM2: Number(takahiraVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(takahiraVal).toFixed(2)),
      varianceFromMosteller: Number((((takahiraVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Japanese population anatomical surface equation.",
    },
    {
      formulaKey: "schlich",
      formulaName: "Schlich 3D Scan (2010)",
      year: "2010",
      bsaM2: Number(schlichVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(schlichVal).toFixed(2)),
      varianceFromMosteller: Number((((schlichVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Modern 3D laser surface body scan equation (gender differentiated).",
    },
    {
      formulaKey: "costeff",
      formulaName: "Costeff Emergency (1966)",
      year: "1966",
      bsaM2: Number(costeffVal.toFixed(2)),
      bsaFt2: Number(convertToFt2(costeffVal).toFixed(2)),
      varianceFromMosteller: Number((((costeffVal - mostellerVal) / mostellerVal) * 100).toFixed(1)),
      description: "Fast mental arithmetic pediatric formula for emergency room dosing.",
    },
  ];

  // Primary BSA selection based on selected mode
  let primaryBsaM2 = mostellerVal;
  let primaryFormulaUsed = "Mosteller Formula (1987)";

  if (mode === "dubois-classic") {
    primaryBsaM2 = duBoisVal;
    primaryFormulaUsed = "Du Bois & Du Bois (1916)";
  } else if (mode === "haycock-pediatric" || mode === "pediatric-bsa") {
    primaryBsaM2 = haycockVal;
    primaryFormulaUsed = "Haycock Pediatric (1978)";
  } else if (mode === "schlich-gender") {
    primaryBsaM2 = schlichVal;
    primaryFormulaUsed = "Schlich 3D Body Scan (2010)";
  }

  const primaryBsaFt2 = Number(convertToFt2(primaryBsaM2).toFixed(2));
  const bsaM2Rounded = Number(primaryBsaM2.toFixed(2));

  // Min, Max, Average across formulas
  const allBsaVals = [mostellerVal, duBoisVal, haycockVal, gehanGeorgeVal, boydVal, fujimotoVal, takahiraVal, schlichVal];
  const minBsaM2 = Number(Math.min(...allBsaVals).toFixed(2));
  const maxBsaM2 = Number(Math.max(...allBsaVals).toFixed(2));
  const averageBsaM2 = Number((allBsaVals.reduce((a, b) => a + b, 0) / allBsaVals.length).toFixed(2));

  // 4. Chemotherapy Dosing Module
  let chemoDosing: ChemoDosingResult | undefined = undefined;
  if (mode === "chemo-dosing" || mode === "custom-oncology") {
    const uncappedDose = Math.round(primaryBsaM2 * targetChemoDoseMgM2);
    let effectiveBsa = primaryBsaM2;
    let isCapped = false;

    if (capObeseBsaAt2m2 && primaryBsaM2 > 2.0) {
      effectiveBsa = 2.0;
      isCapped = true;
    }

    const finalDoseMg = Math.round(effectiveBsa * targetChemoDoseMgM2);

    // Calvert Formula for Carboplatin Dosing: Dose (mg) = Target AUC * (GFR + 25)
    const carboplatinDose = Math.round(targetCarboplatinAuc * (targetGFR + 25));

    let guidance = "Standard BSA-based therapeutic dosing applied.";
    if (isCapped) {
      guidance = "BSA capped at 2.0 m² for toxicity mitigation in severe obesity as per ASCO clinical practice guidelines.";
    }

    chemoDosing = {
      targetDosePerM2: targetChemoDoseMgM2,
      uncappedTotalDoseMg: uncappedDose,
      isCapped,
      cappedBsaLimitM2: 2.0,
      effectiveBsaM2: Number(effectiveBsa.toFixed(2)),
      finalDoseMg,
      carboplatinAucDoseMg: carboplatinDose,
      dosingGuidance: guidance,
    };
  }

  // 5. Cardiac Index Module
  let cardiacIndex: CardiacIndexResult | undefined = undefined;
  if (mode === "cardiac-index" || mode === "custom-oncology") {
    const ci = primaryBsaM2 > 0 ? Number((cardiacOutputLmin / primaryBsaM2).toFixed(2)) : 0;
    const strokeVolume = heartRateBpm > 0 ? (cardiacOutputLmin * 1000) / heartRateBpm : 0;
    const svi = primaryBsaM2 > 0 ? Number((strokeVolume / primaryBsaM2).toFixed(1)) : 0;

    let category = "Normal Cardiac Index";
    let interp = "Hemodynamic perfusion is optimal (normal range: 2.5 - 4.0 L/min/m²).";
    if (ci < 2.2) {
      category = "Low Cardiac Index (Hypoperfusion Risk)";
      interp = "Cardiogenic shock or severe hypoperfusion risk. Requires immediate clinical evaluation.";
    } else if (ci < 2.5) {
      category = "Borderline Low Cardiac Index";
      interp = "Slightly reduced systemic oxygen delivery. Monitor cardiac preload and contractility.";
    } else if (ci > 4.2) {
      category = "Hyperdynamic Cardiac Output";
      interp = "High output state (sepsis, thyrotoxicosis, severe anemia, or fever).";
    }

    cardiacIndex = {
      cardiacOutputLmin,
      cardiacIndexLminM2: ci,
      strokeVolumeIndexMlM2: svi,
      clinicalCategory: category,
      interpretation: interp,
    };
  }

  // 6. GFR Normalization Module
  let gfrNormalization: GfrNormalizationResult | undefined = undefined;
  if (mode === "gfr-normalization" || mode === "custom-oncology") {
    const normalizedGfr = primaryBsaM2 > 0 ? Number(((unadjustedGfrMlMin * 1.73) / primaryBsaM2).toFixed(1)) : 0;
    let ckdStage = "G1 (Normal or High GFR)";
    if (normalizedGfr < 15) ckdStage = "G5 (Kidney Failure / End-Stage)";
    else if (normalizedGfr < 30) ckdStage = "G4 (Severely Decreased GFR)";
    else if (normalizedGfr < 45) ckdStage = "G3b (Moderately to Severely Decreased GFR)";
    else if (normalizedGfr < 60) ckdStage = "G3a (Mildly to Moderately Decreased GFR)";
    else if (normalizedGfr < 90) ckdStage = "G2 (Mildly Decreased GFR)";

    gfrNormalization = {
      unadjustedGfrMlMin,
      normalizedGfrMlMin173m2: normalizedGfr,
      ckdStage,
      clinicalNote: `BSA normalization adjusts absolute clearance (${unadjustedGfrMlMin} mL/min) to standard 1.73 m² body surface area for kidney disease staging.`,
    };
  }

  // 7. Population Norms Benchmarks
  const benchmarks: PopulationBenchmark[] = [
    {
      category: "Newborn Infant",
      averageBsaM2: 0.25,
      averageBsaFt2: 2.69,
      userDiffPercent: Number((((bsaM2Rounded - 0.25) / 0.25) * 100).toFixed(0)),
    },
    {
      category: "2-Year-Old Child",
      averageBsaM2: 0.50,
      averageBsaFt2: 5.38,
      userDiffPercent: Number((((bsaM2Rounded - 0.50) / 0.50) * 100).toFixed(0)),
    },
    {
      category: "10-Year-Old Child",
      averageBsaM2: 1.14,
      averageBsaFt2: 12.27,
      userDiffPercent: Number((((bsaM2Rounded - 1.14) / 1.14) * 100).toFixed(0)),
    },
    {
      category: "Adult Female Baseline",
      averageBsaM2: 1.60,
      averageBsaFt2: 17.22,
      userDiffPercent: Number((((bsaM2Rounded - 1.60) / 1.60) * 100).toFixed(0)),
    },
    {
      category: "Adult Male Baseline",
      averageBsaM2: 1.90,
      averageBsaFt2: 20.45,
      userDiffPercent: Number((((bsaM2Rounded - 1.90) / 1.90) * 100).toFixed(0)),
    },
  ];

  // 8. Clinical Recommendations
  const clinicalRecommendations: string[] = [
    `Calculated BSA of ${bsaM2Rounded} m² (${primaryBsaFt2} ft²) using ${primaryFormulaUsed}.`,
    `Body Mass Index (BMI) is ${bmi} kg/m² (${bmiCategory}). Ideal Body Weight (Devine) is ${idealBodyWeightKg} kg.`,
    `Formula variance across 8 clinical equations ranges from ${minBsaM2} m² to ${maxBsaM2} m² (average: ${averageBsaM2} m²).`,
    `For chemotherapy dosing, Mosteller and Haycock are ASCO-recommended gold standards.`,
  ];

  const actionPlan: string[] = [
    "Verify patient height and weight prior to administering narrow therapeutic index drugs.",
    "For obese patients (BMI ≥ 30), consider clinical guidelines for BSA capping vs actual body weight dosing.",
    "In pediatric patients, utilize the Haycock or Costeff equations for precise BSA estimations.",
  ];

  return {
    mode,
    gender,
    unitSystem,
    ageYears,
    heightCm: Number(heightCm.toFixed(1)),
    heightInchesTotal: Number(heightInchesTotal.toFixed(1)),
    weightKg: Number(weightKg.toFixed(1)),
    weightLbs: Number((weightKg * 2.20462).toFixed(1)),
    primaryBsaM2: bsaM2Rounded,
    primaryBsaFt2,
    primaryFormulaUsed,
    bmi,
    bmiCategory,
    idealBodyWeightKg,
    leanBodyMassKg,
    formulaList,
    minBsaM2,
    maxBsaM2,
    averageBsaM2,
    chemoDosing,
    cardiacIndex,
    gfrNormalization,
    benchmarks,
    clinicalRecommendations,
    actionPlan,
  };
}

export const calculateBodySurfaceAreaCalculator = calculateBsaCalculator;

