import {
  GfrInputParameters,
  GfrOutputResults,
  FormulaComparisonItem,
  GfrCalculationMode,
} from "./types";

export function calculateGfrCalculator(inputs: GfrInputParameters): GfrOutputResults {
  const mode = inputs.calculationMode || "adult-ckdepi2021";
  const patientType = inputs.patientType || (inputs.age && inputs.age < 18 ? "child" : "adult");
  const creatinineUnit = inputs.creatinineUnit || "mg/dL";
  const rawCreatinine = inputs.serumCreatinine !== undefined && inputs.serumCreatinine > 0 ? inputs.serumCreatinine : 0.9;

  // 1. Creatinine Unit Normalization (mg/dL)
  const creatinineMgDl =
    creatinineUnit === "umol/L" ? rawCreatinine / 88.4 : rawCreatinine;
  const creatinineUmolL =
    creatinineUnit === "umol/L" ? rawCreatinine : rawCreatinine * 88.4;

  const age = inputs.age || (patientType === "child" ? 10 : 50);
  const gender = inputs.gender || "male";
  const race = inputs.race || "non-black";

  // Height Normalization (cm)
  let heightCm = 170;
  if (inputs.unitSystem === "metric" && inputs.heightCm) {
    heightCm = inputs.heightCm;
  } else if (inputs.heightFeet || inputs.heightInches) {
    const totalInches = (inputs.heightFeet || 5) * 12 + (inputs.heightInches || 7);
    heightCm = totalInches * 2.54;
  } else if (inputs.heightCm) {
    heightCm = inputs.heightCm;
  }

  // Weight Normalization (kg)
  let weightKg = 70;
  if (inputs.unitSystem === "metric" && inputs.weightKg) {
    weightKg = inputs.weightKg;
  } else if (inputs.weightLbs) {
    weightKg = inputs.weightLbs * 0.45359237;
  } else if (inputs.weightKg) {
    weightKg = inputs.weightKg;
  }

  // Cystatin C (mg/L)
  const cystatinC = inputs.cystatinC && inputs.cystatinC > 0 ? inputs.cystatinC : 0.9;

  // 2. EQUATION ENGINES

  // A. CKD-EPI 2021 (Race-Free Standard)
  const calculateCkdEpi2021 = (scr: number, a: number, g: string): number => {
    const kappa = g === "female" ? 0.7 : 0.9;
    const alpha = g === "female" ? -0.241 : -0.302;
    const genderFactor = g === "female" ? 1.012 : 1.0;
    const scrOverKappa = scr / kappa;
    const minTerm = Math.pow(Math.min(scrOverKappa, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrOverKappa, 1), -1.200);
    const ageTerm = Math.pow(0.9938, a);
    return Math.round(142 * minTerm * maxTerm * ageTerm * genderFactor * 10) / 10;
  };

  // B. CKD-EPI 2009 (Race-Adjusted)
  const calculateCkdEpi2009 = (scr: number, a: number, g: string, r: string): number => {
    const kappa = g === "female" ? 0.7 : 0.9;
    const alpha = g === "female" ? -0.329 : -0.411;
    const genderFactor = g === "female" ? 1.018 : 1.0;
    const raceFactor = r === "black" ? 1.159 : 1.0;
    const scrOverKappa = scr / kappa;
    const minTerm = Math.pow(Math.min(scrOverKappa, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrOverKappa, 1), -1.209);
    const ageTerm = Math.pow(0.993, a);
    return Math.round(141 * minTerm * maxTerm * ageTerm * genderFactor * raceFactor * 10) / 10;
  };

  // C. IDMS-Traceable MDRD Equation
  const calculateMdrd = (scr: number, a: number, g: string, r: string): number => {
    const genderFactor = g === "female" ? 0.742 : 1.0;
    const raceFactor = r === "black" ? 1.212 : 1.0;
    const val = 175 * Math.pow(scr, -1.154) * Math.pow(a, -0.203) * genderFactor * raceFactor;
    return Math.round(val * 10) / 10;
  };

  // D. Mayo Quadratic Equation
  const calculateMayo = (scr: number, a: number, g: string): number => {
    const scrAdj = scr < 0.8 ? 0.8 : scr;
    const genderTerm = g === "female" ? 0.205 : 0;
    const exponent = 1.911 + 5.249 / scrAdj - 2.114 / (scrAdj * scrAdj) - 0.00686 * a - genderTerm;
    return Math.round(Math.exp(exponent) * 10) / 10;
  };

  // E. Cockcroft-Gault Creatinine Clearance (CrCl)
  const calculateCockcroftGault = (scr: number, a: number, g: string, w: number): number => {
    const genderFactor = g === "female" ? 0.85 : 1.0;
    const crcl = ((140 - a) * w) / (72 * scr) * genderFactor;
    return Math.round(crcl * 10) / 10;
  };

  // F. Bedside Schwartz (Pediatric)
  const calculateSchwartz = (scr: number, hCm: number): number => {
    const egfr = (0.413 * hCm) / scr;
    return Math.round(egfr * 10) / 10;
  };

  // G. CKD-EPI 2021 Creatinine-Cystatin C Combination Equation
  const calculateCkdEpiCystatinC = (scr: number, cysC: number, a: number, g: string): number => {
    const kappa = g === "female" ? 0.7 : 0.9;
    const alpha = g === "female" ? -0.219 : -0.144;
    const cysCKappa = 0.8;
    const cysCAlpha = -0.323;
    const genderFactor = g === "female" ? 0.963 : 1.0;

    const scrTerm = Math.pow(Math.min(scr / kappa, 1), alpha) * Math.pow(Math.max(scr / kappa, 1), -0.544);
    const cysCTerm = Math.pow(Math.min(cysC / cysCKappa, 1), cysCAlpha) * Math.pow(Math.max(cysC / cysCKappa, 1), -0.778);
    const ageTerm = Math.pow(0.9961, a);

    const val = 135 * scrTerm * cysCTerm * ageTerm * genderFactor;
    return Math.round(val * 10) / 10;
  };

  // 3. Primary Output Calculation
  let primaryEgfr = 90;
  let primaryFormulaName = "CKD-EPI 2021 (Race-Free Standard)";

  if (patientType === "child") {
    primaryEgfr = calculateSchwartz(creatinineMgDl, heightCm);
    primaryFormulaName = "Bedside Schwartz Formula (Pediatric)";
  } else {
    switch (mode) {
      case "adult-ckdepi2009":
        primaryEgfr = calculateCkdEpi2009(creatinineMgDl, age, gender, race);
        primaryFormulaName = "CKD-EPI 2009 (Race-Adjusted)";
        break;
      case "mdrd":
        primaryEgfr = calculateMdrd(creatinineMgDl, age, gender, race);
        primaryFormulaName = "IDMS-Traceable MDRD Study Equation";
        break;
      case "mayo":
        primaryEgfr = calculateMayo(creatinineMgDl, age, gender);
        primaryFormulaName = "Mayo Quadratic Equation";
        break;
      case "cockcroft-gault":
        primaryEgfr = calculateCockcroftGault(creatinineMgDl, age, gender, weightKg);
        primaryFormulaName = "Cockcroft-Gault Creatinine Clearance";
        break;
      case "cystatin-c":
        primaryEgfr = calculateCkdEpiCystatinC(creatinineMgDl, cystatinC, age, gender);
        primaryFormulaName = "CKD-EPI 2021 Creatinine-Cystatin C Combination";
        break;
      case "adult-ckdepi2021":
      default:
        primaryEgfr = calculateCkdEpi2021(creatinineMgDl, age, gender);
        primaryFormulaName = "CKD-EPI 2021 (Race-Free Clinical Standard)";
        break;
    }
  }

  // Cap eGFR at clinically realistic limits
  if (primaryEgfr > 140) primaryEgfr = 140;
  if (primaryEgfr < 5) primaryEgfr = 5;

  // 4. CKD Stage Classification
  let ckdStage: "Stage 1" | "Stage 2" | "Stage 3a" | "Stage 3b" | "Stage 4" | "Stage 5" = "Stage 1";
  let stageName = "Normal or High Kidney Function";
  let stageDescription = "G1: eGFR ≥ 90 mL/min/1.73m². Kidney function is normal. Further testing for proteinuria required to diagnose CKD.";

  if (primaryEgfr >= 90) {
    ckdStage = "Stage 1";
    stageName = "Stage 1: Normal or High Kidney Function";
    stageDescription = "eGFR ≥ 90 mL/min/1.73m². Normal kidney filtration. Unhealthy kidney signs (e.g. protein in urine) indicate Stage 1 CKD.";
  } else if (primaryEgfr >= 60) {
    ckdStage = "Stage 2";
    stageName = "Stage 2: Mildly Decreased Kidney Function";
    stageDescription = "eGFR 60–89 mL/min/1.73m². Mild reduction in filtration. Common in older adults; requires monitoring if kidney damage markers are present.";
  } else if (primaryEgfr >= 45) {
    ckdStage = "Stage 3a";
    stageName = "Stage 3a: Mild to Moderate Reduction";
    stageDescription = "eGFR 45–59 mL/min/1.73m². Moderate kidney disease. Increased cardiovascular risk; evaluation by a nephrologist recommended.";
  } else if (primaryEgfr >= 30) {
    ckdStage = "Stage 3b";
    stageName = "Stage 3b: Moderate to Severe Reduction";
    stageDescription = "eGFR 30–44 mL/min/1.73m². Moderate to severe CKD. Active medical management required to prevent complications.";
  } else if (primaryEgfr >= 15) {
    ckdStage = "Stage 4";
    stageName = "Stage 4: Severely Decreased Function";
    stageDescription = "eGFR 15–29 mL/min/1.73m². Severe kidney damage. Preparation for renal replacement therapy (dialysis or kidney transplant).";
  } else {
    ckdStage = "Stage 5";
    stageName = "Stage 5: Kidney Failure / End-Stage Renal Disease (ESRD)";
    stageDescription = "eGFR < 15 mL/min/1.73m². Kidney failure. Dialysis or kidney transplantation is required to sustain life.";
  }

  // Kidney Function Percentage (baseline 100% = 100 mL/min/1.73m²)
  const kidneyFunctionPercent = Math.min(100, Math.max(5, Math.round((primaryEgfr / 100) * 100)));

  // 5. Age-Expected Normal GFR
  let ageExpectedGfr = 116;
  if (age < 30) ageExpectedGfr = 116;
  else if (age < 40) ageExpectedGfr = 107;
  else if (age < 50) ageExpectedGfr = 99;
  else if (age < 60) ageExpectedGfr = 93;
  else if (age < 70) ageExpectedGfr = 85;
  else ageExpectedGfr = 75;

  const agePercentile = Math.min(100, Math.round((primaryEgfr / ageExpectedGfr) * 100));

  // 6. KDIGO Risk Prognosis Staging Matrix (Combining GFR and Albuminuria uACR)
  const uACR = inputs.uACR || 15; // default normal < 30 mg/g
  let aStage = "A1";
  if (uACR >= 300) aStage = "A3";
  else if (uACR >= 30) aStage = "A2";

  let gStage = "G1";
  if (primaryEgfr < 15) gStage = "G5";
  else if (primaryEgfr < 30) gStage = "G4";
  else if (primaryEgfr < 45) gStage = "G3b";
  else if (primaryEgfr < 60) gStage = "G3a";
  else if (primaryEgfr < 90) gStage = "G2";

  let kdigoCategory: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk" = "Low Risk";
  let kdigoColor = "#10b981"; // Emerald
  let kdigoDesc = "Low risk of CKD progression in the absence of other kidney damage markers.";

  if (gStage === "G5" || gStage === "G4" || (gStage === "G3b" && aStage !== "A1") || (gStage === "G3a" && aStage === "A3")) {
    kdigoCategory = "Very High Risk";
    kdigoColor = "#ef4444"; // Red
    kdigoDesc = "Very High Risk of CKD progression, cardiovascular events, and kidney failure. Immediate nephrology care required.";
  } else if (gStage === "G3b" || (gStage === "G3a" && aStage === "A2") || ((gStage === "G1" || gStage === "G2") && aStage === "A3")) {
    kdigoCategory = "High Risk";
    kdigoColor = "#f97316"; // Orange
    kdigoDesc = "High Risk of CKD progression. Frequent monitoring (3-4x/year) and specialized intervention needed.";
  } else if (gStage === "G3a" || ((gStage === "G1" || gStage === "G2") && aStage === "A2")) {
    kdigoCategory = "Moderate Risk";
    kdigoColor = "#eab308"; // Amber
    kdigoDesc = "Moderately Increased Risk. Requires monitoring (1-2x/year) and blood pressure/glucose optimization.";
  }

  // 7. Formula Comparison Items
  const ckdepi2021Val = calculateCkdEpi2021(creatinineMgDl, age, gender);
  const ckdepi2009Val = calculateCkdEpi2009(creatinineMgDl, age, gender, race);
  const mdrdVal = calculateMdrd(creatinineMgDl, age, gender, race);
  const mayoVal = calculateMayo(creatinineMgDl, age, gender);
  const cockcroftVal = calculateCockcroftGault(creatinineMgDl, age, gender, weightKg);
  const schwartzVal = calculateSchwartz(creatinineMgDl, heightCm);

  const formulaComparisons: FormulaComparisonItem[] = [
    {
      formulaName: "CKD-EPI 2021 (NKF-ASN Race-Free Standard)",
      egfrValue: ckdepi2021Val,
      ckdStage: ckdepi2021Val >= 90 ? "Stage 1" : ckdepi2021Val >= 60 ? "Stage 2" : ckdepi2021Val >= 30 ? "Stage 3" : "Stage 4/5",
      differenceFromDefault: Math.round((ckdepi2021Val - primaryEgfr) * 10) / 10,
      notes: "Recommended primary clinical default for adults without race coefficients.",
    },
    {
      formulaName: "CKD-EPI 2009 (Original Race-Adjusted)",
      egfrValue: ckdepi2009Val,
      ckdStage: ckdepi2009Val >= 90 ? "Stage 1" : ckdepi2009Val >= 60 ? "Stage 2" : ckdepi2009Val >= 30 ? "Stage 3" : "Stage 4/5",
      differenceFromDefault: Math.round((ckdepi2009Val - primaryEgfr) * 10) / 10,
      notes: "Previous standard incorporating race coefficient for Black individuals.",
    },
    {
      formulaName: "MDRD Study Equation (IDMS-Traceable)",
      egfrValue: mdrdVal,
      ckdStage: mdrdVal >= 90 ? "Stage 1" : mdrdVal >= 60 ? "Stage 2" : mdrdVal >= 30 ? "Stage 3" : "Stage 4/5",
      differenceFromDefault: Math.round((mdrdVal - primaryEgfr) * 10) / 10,
      notes: "Accurate for CKD patients; underestimates GFR in healthy individuals (> 60).",
    },
    {
      formulaName: "Mayo Quadratic Equation",
      egfrValue: mayoVal,
      ckdStage: mayoVal >= 90 ? "Stage 1" : mayoVal >= 60 ? "Stage 2" : mayoVal >= 30 ? "Stage 3" : "Stage 4/5",
      differenceFromDefault: Math.round((mayoVal - primaryEgfr) * 10) / 10,
      notes: "Optimized for estimating GFR in preserved kidney function and living donors.",
    },
    {
      formulaName: "Cockcroft-Gault Creatinine Clearance (CrCl)",
      egfrValue: cockcroftVal,
      ckdStage: cockcroftVal >= 90 ? "Stage 1" : cockcroftVal >= 60 ? "Stage 2" : cockcroftVal >= 30 ? "Stage 3" : "Stage 4/5",
      differenceFromDefault: Math.round((cockcroftVal - primaryEgfr) * 10) / 10,
      notes: "Estimates Creatinine Clearance (mL/min) for medication dosing calculations.",
    },
    {
      formulaName: "Bedside Schwartz Formula (Pediatric)",
      egfrValue: schwartzVal,
      ckdStage: schwartzVal >= 90 ? "Stage 1" : schwartzVal >= 60 ? "Stage 2" : schwartzVal >= 30 ? "Stage 3" : "Stage 4/5",
      differenceFromDefault: Math.round((schwartzVal - primaryEgfr) * 10) / 10,
      notes: "Standard clinical equation for children and adolescents under 18 years.",
    },
  ];

  // 8. Age-Based Decline Curve Data
  const ageDeclineCurve = [
    { age: 20, averageGfr: 116, patientProjectedGfr: Math.round(primaryEgfr * 1.0) },
    { age: 30, averageGfr: 107, patientProjectedGfr: Math.round(primaryEgfr * 0.95) },
    { age: 40, averageGfr: 99, patientProjectedGfr: Math.round(primaryEgfr * 0.90) },
    { age: 50, averageGfr: 93, patientProjectedGfr: Math.round(primaryEgfr * 0.85) },
    { age: 60, averageGfr: 85, patientProjectedGfr: Math.round(primaryEgfr * 0.78) },
    { age: 70, averageGfr: 75, patientProjectedGfr: Math.round(primaryEgfr * 0.70) },
    { age: 80, averageGfr: 65, patientProjectedGfr: Math.round(primaryEgfr * 0.60) },
  ];

  // 9. Recommendations & Nephrology Action Plan
  const recommendations: string[] = [
    `Your estimated GFR of ${primaryEgfr} mL/min/1.73m² places you in ${ckdStage} (${stageName}).`,
    `Serum Creatinine is ${creatinineMgDl.toFixed(2)} mg/dL (${creatinineUmolL.toFixed(1)} µmol/L).`,
    primaryEgfr >= 60
      ? "Your filtration rate is within normal limits. Maintain adequate hydration and routine health checks."
      : "Your filtration rate shows a reduction. Consult a primary care physician or nephrologist for comprehensive evaluation.",
    "Monitor blood pressure (< 130/80 mmHg target) and HbA1c to protect renal microvasculature.",
    "Avoid nephrotoxic substances including NSAIDs (ibuprofen, naproxen) and unverified herbal supplements.",
  ];

  const actionPlan: string[] = [
    primaryEgfr >= 90
      ? "Routine annual renal panel (Serum Creatinine, eGFR, and Urine Albumin-to-Creatinine Ratio)."
      : primaryEgfr >= 60
      ? "Biannual blood pressure and renal function monitoring."
      : primaryEgfr >= 30
      ? "Nephrology referral; evaluation for anemia, mineral bone disease, and renal medication dosage adjustments."
      : "Active multidisciplinary nephrology management; preparation for renal replacement therapies.",
    "Re-test eGFR in 3 months to distinguish acute kidney injury (AKI) from chronic kidney disease (CKD).",
    "Maintain low-sodium diet (< 2,000 mg/day) and cardiovascular exercise.",
  ];

  const insights: string[] = [
    `Calculated via ${primaryFormulaName}.`,
    `Compared to age-matched average (${ageExpectedGfr} mL/min/1.73m²), your eGFR is ${agePercentile}% of baseline.`,
    `KDIGO Risk Category: ${kdigoCategory} (${gStage}${aStage}).`,
  ];

  return {
    mode,
    patientType,
    creatinineMgDl: Math.round(creatinineMgDl * 100) / 100,
    creatinineUmolL: Math.round(creatinineUmolL * 10) / 10,
    eGfr: primaryEgfr,
    ckdStage,
    stageName,
    stageDescription,
    kidneyFunctionPercent,
    primaryFormulaUsed: primaryFormulaName,
    ageExpectedGfr,
    agePercentile,
    creatinineClearance: cockcroftVal,
    kdigoRisk: {
      gStage,
      aStage,
      riskCategory: kdigoCategory,
      colorHex: kdigoColor,
      description: kdigoDesc,
    },
    formulaComparisons,
    ageDeclineCurve,
    recommendations,
    actionPlan,
    insights,
  };
}
