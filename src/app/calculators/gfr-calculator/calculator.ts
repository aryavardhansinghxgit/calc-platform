import {
  GfrInputParameters,
  GfrOutputResults,
  FormulaComparisonItem,
  GfrCalculationMode,
  PatientType,
} from "./types";

export function calculateGfrCalculator(inputs: GfrInputParameters): GfrOutputResults {
  // 1. Patient Type & Age Normalization
  let age = inputs.age !== undefined && !isNaN(inputs.age) ? Math.max(1, inputs.age) : 50;
  let patientType: PatientType = inputs.patientType || (age < 18 ? "child" : "adult");

  // Strict age synchronization: under 18 is child, 18+ is adult
  if (age < 18) {
    patientType = "child";
  } else if (inputs.patientType === "child" && age >= 18) {
    patientType = "adult";
  }

  const mode: GfrCalculationMode =
    patientType === "child" ? "pediatric-schwartz" : (inputs.calculationMode || "adult-ckdepi2021");

  const creatinineUnit = inputs.creatinineUnit || "mg/dL";
  const rawCreatinine =
    inputs.serumCreatinine !== undefined && !isNaN(inputs.serumCreatinine) && inputs.serumCreatinine > 0
      ? inputs.serumCreatinine
      : 0.9;

  // 2. Creatinine Unit Normalization (Exact NIST / clinical factor: 88.4)
  const creatinineMgDl =
    creatinineUnit === "umol/L" ? rawCreatinine / 88.4 : rawCreatinine;
  const creatinineUmolL =
    creatinineUnit === "umol/L" ? rawCreatinine : rawCreatinine * 88.4;

  const gender = inputs.gender || "male";
  const race = inputs.race || "non-black";

  // 3. Height Normalization (cm)
  let heightCm = 170;
  if (inputs.unitSystem === "metric") {
    heightCm = inputs.heightCm !== undefined && inputs.heightCm > 0 ? inputs.heightCm : 170;
  } else {
    const feet = inputs.heightFeet !== undefined && !isNaN(inputs.heightFeet) ? inputs.heightFeet : 5;
    const inches = inputs.heightInches !== undefined && !isNaN(inputs.heightInches) ? inputs.heightInches : 10;
    const totalInches = Math.max(12, feet * 12 + inches);
    heightCm = totalInches * 2.54;
  }

  // 4. Weight Normalization (kg)
  let weightKg = 70;
  if (inputs.unitSystem === "metric") {
    weightKg = inputs.weightKg !== undefined && inputs.weightKg > 0 ? inputs.weightKg : 70;
  } else {
    const lbs = inputs.weightLbs !== undefined && inputs.weightLbs > 0 ? inputs.weightLbs : 160;
    weightKg = lbs * 0.45359237;
  }

  // 5. Advanced Biomarkers: Cystatin C & uACR
  const cystatinC = inputs.cystatinC !== undefined && inputs.cystatinC > 0 ? inputs.cystatinC : 0.9;
  const uACR = inputs.uACR !== undefined && !isNaN(inputs.uACR) && inputs.uACR >= 0 ? inputs.uACR : 15;

  // 6. CLINICAL EQUATION ENGINES

  // A. CKD-EPI 2021 (Race-Free Clinical Standard - Inker et al. NEJM 2021)
  const calculateCkdEpi2021 = (scr: number, a: number, g: string): number => {
    const kappa = g === "female" ? 0.7 : 0.9;
    const alpha = g === "female" ? -0.241 : -0.302;
    const genderFactor = g === "female" ? 1.012 : 1.0;
    const scrOverKappa = scr / kappa;
    const minTerm = Math.pow(Math.min(scrOverKappa, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrOverKappa, 1), -1.200);
    const ageTerm = Math.pow(0.9938, a);
    const val = 142 * minTerm * maxTerm * ageTerm * genderFactor;
    return Math.round(val * 10) / 10;
  };

  // B. CKD-EPI 2021 Creatinine-Cystatin C Combination (Inker et al. NEJM 2021)
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

  // C. CKD-EPI 2012 Cystatin C Alone (Inker et al. NEJM 2012)
  const calculateCkdEpiCysAlone = (cysC: number, a: number, g: string): number => {
    const cysCKappa = 0.8;
    const genderFactor = g === "female" ? 0.932 : 1.0;
    const minTerm = Math.pow(Math.min(cysC / cysCKappa, 1), -0.499);
    const maxTerm = Math.pow(Math.max(cysC / cysCKappa, 1), -1.328);
    const ageTerm = Math.pow(0.996, a);
    const val = 133 * minTerm * maxTerm * ageTerm * genderFactor;
    return Math.round(val * 10) / 10;
  };

  // D. CKD-EPI 2009 (Legacy Race-Adjusted - Levey et al. Ann Intern Med 2009)
  const calculateCkdEpi2009 = (scr: number, a: number, g: string, r: string): number => {
    const kappa = g === "female" ? 0.7 : 0.9;
    const alpha = g === "female" ? -0.329 : -0.411;
    const genderFactor = g === "female" ? 1.018 : 1.0;
    const raceFactor = r === "black" ? 1.159 : 1.0;
    const scrOverKappa = scr / kappa;
    const minTerm = Math.pow(Math.min(scrOverKappa, 1), alpha);
    const maxTerm = Math.pow(Math.max(scrOverKappa, 1), -1.209);
    const ageTerm = Math.pow(0.993, a);
    const val = 141 * minTerm * maxTerm * ageTerm * genderFactor * raceFactor;
    return Math.round(val * 10) / 10;
  };

  // E. IDMS-Traceable MDRD Equation (Levey et al. 2006)
  const calculateMdrd = (scr: number, a: number, g: string, r: string): number => {
    const genderFactor = g === "female" ? 0.742 : 1.0;
    const raceFactor = r === "black" ? 1.212 : 1.0;
    const val = 175 * Math.pow(scr, -1.154) * Math.pow(a, -0.203) * genderFactor * raceFactor;
    return Math.round(val * 10) / 10;
  };

  // F. Mayo Quadratic Equation (Rule et al. Ann Intern Med 2004)
  const calculateMayo = (scr: number, a: number, g: string): number => {
    const scrAdj = scr < 0.8 ? 0.8 : scr;
    const genderTerm = g === "female" ? 0.205 : 0;
    const exponent = 1.911 + 5.249 / scrAdj - 2.114 / (scrAdj * scrAdj) - 0.00686 * a - genderTerm;
    const val = Math.exp(exponent);
    return Math.round(val * 10) / 10;
  };

  // G. Cockcroft-Gault Creatinine Clearance (CrCl, mL/min) (Cockcroft & Gault 1976)
  const calculateCockcroftGault = (scr: number, a: number, g: string, w: number): number => {
    const genderFactor = g === "female" ? 0.85 : 1.0;
    const crcl = (((140 - a) * w) / (72 * scr)) * genderFactor;
    return Math.round(crcl * 10) / 10;
  };

  // H. Bedside Schwartz (Pediatric < 18 yrs - Schwartz et al. JASN 2009)
  const calculateSchwartz = (scr: number, hCm: number): number => {
    const egfr = (0.413 * hCm) / scr;
    return Math.round(egfr * 10) / 10;
  };

  // 7. Calculate All Values for Comparison Suite
  const ckdepi2021Val = calculateCkdEpi2021(creatinineMgDl, age, gender);
  const ckdepiCysComboVal = calculateCkdEpiCystatinC(creatinineMgDl, cystatinC, age, gender);
  const ckdepiCysAloneVal = calculateCkdEpiCysAlone(cystatinC, age, gender);
  const ckdepi2009Val = calculateCkdEpi2009(creatinineMgDl, age, gender, race);
  const mdrdVal = calculateMdrd(creatinineMgDl, age, gender, race);
  const mayoVal = calculateMayo(creatinineMgDl, age, gender);
  const cockcroftVal = calculateCockcroftGault(creatinineMgDl, age, gender, weightKg);
  const schwartzVal = calculateSchwartz(creatinineMgDl, heightCm);

  // 8. Determine Primary Output Value and Name (No artificial capping; preserve true mathematical value)
  let primaryEgfr = ckdepi2021Val;
  let primaryFormulaName = "CKD-EPI 2021 (Race-Free Clinical Standard)";

  if (patientType === "child") {
    primaryEgfr = schwartzVal;
    primaryFormulaName = "Bedside Schwartz Formula (Pediatric)";
  } else {
    switch (mode) {
      case "adult-ckdepi2009":
        primaryEgfr = ckdepi2009Val;
        primaryFormulaName = "CKD-EPI 2009 (Race-Adjusted Legacy)";
        break;
      case "mdrd":
        primaryEgfr = mdrdVal;
        primaryFormulaName = "IDMS-Traceable MDRD Study Equation";
        break;
      case "mayo":
        primaryEgfr = mayoVal;
        primaryFormulaName = "Mayo Quadratic Equation";
        break;
      case "cockcroft-gault":
        primaryEgfr = cockcroftVal;
        primaryFormulaName = "Cockcroft-Gault Creatinine Clearance (CrCl)";
        break;
      case "cystatin-c":
        primaryEgfr = ckdepiCysComboVal;
        primaryFormulaName = "CKD-EPI 2021 Creatinine-Cystatin C Combination";
        break;
      case "cystatin-c-alone":
        primaryEgfr = ckdepiCysAloneVal;
        primaryFormulaName = "CKD-EPI 2012 Cystatin C (Alone)";
        break;
      case "comparison": {
        // Multi-formula reference average of the 4 key adult race-free equations
        const multiAvg = Math.round(((ckdepi2021Val + ckdepiCysComboVal + ckdepiCysAloneVal + mayoVal) / 4) * 10) / 10;
        primaryEgfr = multiAvg;
        primaryFormulaName = "Multi-Formula Reference Consensus (Mean of Race-Free Models)";
        break;
      }
      case "adult-ckdepi2021":
      default:
        primaryEgfr = ckdepi2021Val;
        primaryFormulaName = "CKD-EPI 2021 (Race-Free Clinical Standard)";
        break;
    }
  }

  // Ensure non-negativity
  if (primaryEgfr < 0) primaryEgfr = 0;

  // 9. CKD Stage & Category Classification (KDIGO 2024 Guidelines)
  let ckdStage: "Stage 1" | "Stage 2" | "Stage 3a" | "Stage 3b" | "Stage 4" | "Stage 5" = "Stage 1";
  let stageName = "G1: Normal or High Kidney Filtration";
  let stageDescription = "G1: eGFR ≥ 90 mL/min/1.73m². Filtration rate is normal. In the absence of markers of kidney damage (e.g., persistent albuminuria uACR ≥ 30 mg/g), this does not indicate Chronic Kidney Disease.";

  if (primaryEgfr >= 90) {
    ckdStage = "Stage 1";
    stageName = "G1: Normal or High Kidney Filtration";
    stageDescription = "G1 (eGFR ≥ 90 mL/min/1.73m²): Normal or high kidney filtration. Persistent kidney damage markers (e.g., albuminuria uACR ≥ 30 mg/g for ≥ 3 months) are required to diagnose Stage 1 CKD.";
  } else if (primaryEgfr >= 60) {
    ckdStage = "Stage 2";
    stageName = "G2: Mildly Decreased Kidney Function";
    stageDescription = "G2 (eGFR 60–89 mL/min/1.73m²): Mild reduction in filtration, common with healthy biological aging. Requires clinical confirmation of persistent kidney damage markers before asserting Stage 2 CKD.";
  } else if (primaryEgfr >= 45) {
    ckdStage = "Stage 3a";
    stageName = "G3a: Mild to Moderate Reduction";
    stageDescription = "G3a (eGFR 45–59 mL/min/1.73m²): Mild to moderate reduction in kidney filtration. If sustained for ≥ 3 months, confirms Stage 3a CKD. Increased cardiovascular risk; monitoring recommended.";
  } else if (primaryEgfr >= 30) {
    ckdStage = "Stage 3b";
    stageName = "G3b: Moderate to Severe Reduction";
    stageDescription = "G3b (eGFR 30–44 mL/min/1.73m²): Moderate to severe kidney damage. Active nephrology management, blood pressure control, and medication dosage adjustments required.";
  } else if (primaryEgfr >= 15) {
    ckdStage = "Stage 4";
    stageName = "G4: Severely Decreased Kidney Function";
    stageDescription = "G4 (eGFR 15–29 mL/min/1.73m²): Severely reduced kidney filtration. Advanced CKD management and planning for renal replacement therapy (dialysis or kidney transplantation).";
  } else {
    ckdStage = "Stage 5";
    stageName = "G5: Kidney Failure / End-Stage Kidney Disease (ESKD)";
    stageDescription = "G5 (eGFR < 15 mL/min/1.73m²): Kidney failure. Multidisciplinary renal care, dialysis, or kidney transplantation is needed to sustain life.";
  }

  // 10. Kidney Function Percentage (Normalized against young adult 100 mL/min reference)
  const kidneyFunctionPercent = Math.min(100, Math.max(0, Math.round(primaryEgfr)));

  // 11. Age-Expected Normal GFR
  let ageExpectedGfr = 116;
  if (age < 30) ageExpectedGfr = 116;
  else if (age < 40) ageExpectedGfr = 107;
  else if (age < 50) ageExpectedGfr = 99;
  else if (age < 60) ageExpectedGfr = 93;
  else if (age < 70) ageExpectedGfr = 85;
  else ageExpectedGfr = 75;

  const agePercentile = Math.min(100, Math.round((primaryEgfr / ageExpectedGfr) * 100));

  // 12. KDIGO 2024 Risk Prognosis Matrix (eGFR Category × Albuminuria Category)
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
  let kdigoDesc = "Low risk of CKD progression in the absence of other markers of kidney damage.";

  if (
    gStage === "G5" ||
    gStage === "G4" ||
    (gStage === "G3b" && aStage !== "A1") ||
    (gStage === "G3a" && aStage === "A3")
  ) {
    kdigoCategory = "Very High Risk";
    kdigoColor = "#ef4444"; // Red
    kdigoDesc = "Very high risk of CKD progression, cardiovascular events, and kidney failure. Immediate nephrology referral recommended.";
  } else if (
    gStage === "G3b" ||
    (gStage === "G3a" && aStage === "A2") ||
    ((gStage === "G1" || gStage === "G2") && aStage === "A3")
  ) {
    kdigoCategory = "High Risk";
    kdigoColor = "#f97316"; // Orange
    kdigoDesc = "High risk of CKD progression. Frequent monitoring (2–3 times per year) and specialized nephrology intervention advised.";
  } else if (
    gStage === "G3a" ||
    ((gStage === "G1" || gStage === "G2") && aStage === "A2")
  ) {
    kdigoCategory = "Moderate Risk";
    kdigoColor = "#eab308"; // Amber
    kdigoDesc = "Moderately increased risk. Monitoring 1–2 times per year with blood pressure, glycemic, and cardiovascular optimization.";
  }

  // 13. Comprehensive Formula Comparison Suite
  const getCkdStageName = (val: number): string => {
    if (val >= 90) return "G1 (≥90)";
    if (val >= 60) return "G2 (60-89)";
    if (val >= 45) return "G3a (45-59)";
    if (val >= 30) return "G3b (30-44)";
    if (val >= 15) return "G4 (15-29)";
    return "G5 (<15)";
  };

  const formulaComparisons: FormulaComparisonItem[] = [
    {
      formulaName: "CKD-EPI 2021 Creatinine",
      egfrValue: ckdepi2021Val,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(ckdepi2021Val),
      differenceFromDefault: Math.round((ckdepi2021Val - primaryEgfr) * 10) / 10,
      notes: "Primary NKF-ASN race-free clinical standard for adults.",
    },
    {
      formulaName: "CKD-EPI 2021 Creatinine-Cystatin C",
      egfrValue: ckdepiCysComboVal,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(ckdepiCysComboVal),
      differenceFromDefault: Math.round((ckdepiCysComboVal - primaryEgfr) * 10) / 10,
      notes: "Most accurate confirmatory equation combining muscle and nucleated cell markers.",
    },
    {
      formulaName: "CKD-EPI 2012 Cystatin C (Alone)",
      egfrValue: ckdepiCysAloneVal,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(ckdepiCysAloneVal),
      differenceFromDefault: Math.round((ckdepiCysAloneVal - primaryEgfr) * 10) / 10,
      notes: "Non-creatinine equation independent of muscle mass, diet, and physical stature.",
    },
    {
      formulaName: "CKD-EPI 2009 Creatinine (Legacy)",
      egfrValue: ckdepi2009Val,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(ckdepi2009Val),
      differenceFromDefault: Math.round((ckdepi2009Val - primaryEgfr) * 10) / 10,
      notes: "Historical standard containing demographic race coefficient; superseded by 2021 standard.",
    },
    {
      formulaName: "MDRD Study Equation (IDMS)",
      egfrValue: mdrdVal,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(mdrdVal),
      differenceFromDefault: Math.round((mdrdVal - primaryEgfr) * 10) / 10,
      notes: "Accurate for established CKD; systematically underestimates GFR at values > 60.",
    },
    {
      formulaName: "Mayo Quadratic Equation",
      egfrValue: mayoVal,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(mayoVal),
      differenceFromDefault: Math.round((mayoVal - primaryEgfr) * 10) / 10,
      notes: "Designed for estimating preserved kidney function and living kidney donor screening.",
    },
    {
      formulaName: "Cockcroft-Gault CrCl (Unindexed)",
      egfrValue: cockcroftVal,
      unit: "mL/min",
      ckdStage: getCkdStageName(cockcroftVal),
      differenceFromDefault: Math.round((cockcroftVal - primaryEgfr) * 10) / 10,
      notes: "Estimates unadjusted Creatinine Clearance (mL/min) for pharmacological drug dosing.",
    },
    {
      formulaName: "Bedside Schwartz (Pediatric)",
      egfrValue: schwartzVal,
      unit: "mL/min/1.73m²",
      ckdStage: getCkdStageName(schwartzVal),
      differenceFromDefault: Math.round((schwartzVal - primaryEgfr) * 10) / 10,
      notes: "Standard clinical equation for infants, children, and adolescents under age 18.",
    },
  ];

  // 14. Age-Based Decline Curve Data (Physiological population vs patient baseline)
  const ageDeclineCurve = [
    { age: 20, averageGfr: 116, patientProjectedGfr: Math.round(primaryEgfr * 1.0) },
    { age: 30, averageGfr: 107, patientProjectedGfr: Math.round(primaryEgfr * 0.95) },
    { age: 40, averageGfr: 99, patientProjectedGfr: Math.round(primaryEgfr * 0.90) },
    { age: 50, averageGfr: 93, patientProjectedGfr: Math.round(primaryEgfr * 0.85) },
    { age: 60, averageGfr: 85, patientProjectedGfr: Math.round(primaryEgfr * 0.78) },
    { age: 70, averageGfr: 75, patientProjectedGfr: Math.round(primaryEgfr * 0.70) },
    { age: 80, averageGfr: 65, patientProjectedGfr: Math.round(primaryEgfr * 0.60) },
  ];

  // 15. Recommendations & Nephrology Action Plan
  const recommendations: string[] = [
    `Your estimated filtration rate of ${primaryEgfr} mL/min/1.73m² places you in ${stageName}.`,
    `Serum Creatinine is ${creatinineMgDl.toFixed(2)} mg/dL (${creatinineUmolL.toFixed(1)} µmol/L); Urine Albumin uACR is ${uACR} mg/g (${aStage}).`,
    primaryEgfr >= 60 && uACR < 30
      ? "Your filtration rate and urine albumin are within normal limits. Maintain adequate hydration and routine wellness monitoring."
      : "Your results warrant review by a qualified healthcare professional or nephrologist in conjunction with repeat testing.",
    "Maintain blood pressure (< 130/80 mmHg per KDIGO 2024 guidelines) and glycemic control to protect renal microvasculature.",
    "Avoid nephrotoxic agents, including frequent NSAID use (ibuprofen, naproxen) and unverified dietary supplements.",
  ];

  const actionPlan: string[] = [
    primaryEgfr >= 90 && uACR < 30
      ? "Routine annual wellness check with comprehensive metabolic panel (eGFR and uACR)."
      : primaryEgfr >= 60 && uACR < 30
      ? "Periodic renal monitoring with annual blood pressure and metabolic assessment."
      : primaryEgfr >= 45
      ? "Clinical evaluation by a primary care physician or nephrologist; repeat eGFR in 3 months to assess chronicity."
      : primaryEgfr >= 30
      ? "Nephrology consultation; evaluation for anemia, bone-mineral disease, and renal medication adjustments."
      : "Active multidisciplinary nephrology management and preparation for renal replacement therapies.",
    "A single eGFR calculation does not establish a medical diagnosis; chronicity requires abnormalities persisting ≥ 3 months.",
    "Adopt kidney-healthy lifestyle practices: dietary sodium restriction (< 2,000 mg/day) and regular aerobic exercise.",
  ];

  const insights: string[] = [
    `Calculated via ${primaryFormulaName}.`,
    `Compared to the age-matched population average (${ageExpectedGfr} mL/min/1.73m²), your eGFR is ${agePercentile}% of baseline.`,
    `KDIGO 2024 Prognosis: ${kdigoCategory} (${gStage}${aStage}).`,
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

export const calculateGFRCalculator = calculateGfrCalculator;
