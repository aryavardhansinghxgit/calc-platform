import { calculateGFRCalculator } from "./calculator";

export function runGFRCalculatorTests() {
  // 1. Adult Reference Baseline A: 50yo male, SCr 0.9 mg/dL, 5'10", 160 lbs, non-Black
  const baseA = calculateGFRCalculator({
    calculationMode: "adult-ckdepi2021",
    patientType: "adult",
    unitSystem: "us",
    creatinineUnit: "mg/dL",
    age: 50,
    gender: "male",
    race: "non-black",
    serumCreatinine: 0.9,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
  });

  if (baseA.eGfr !== 104) {
    throw new Error(`Baseline A failed: expected eGFR 104, got ${baseA.eGfr}`);
  }
  if (baseA.ckdStage !== "Stage 1") {
    throw new Error(`Baseline A staging failed: expected Stage 1, got ${baseA.ckdStage}`);
  }
  if (baseA.creatinineClearance !== 100.8) {
    throw new Error(`Baseline A Cockcroft-Gault failed: expected 100.8 mL/min, got ${baseA.creatinineClearance}`);
  }

  // 2. Adult Reference Baseline B: CKD-EPI 2009 legacy mode
  const baseB = calculateGFRCalculator({
    calculationMode: "adult-ckdepi2009",
    patientType: "adult",
    unitSystem: "us",
    creatinineUnit: "mg/dL",
    age: 50,
    gender: "male",
    race: "non-black",
    serumCreatinine: 0.9,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
  });
  if (baseB.eGfr !== 99.2) {
    throw new Error(`Baseline B failed: expected eGFR 99.2, got ${baseB.eGfr}`);
  }

  // 3. Pediatric Reference Baseline C: 10yo child, SCr 0.9 mg/dL, 5'10" (177.8 cm)
  const baseC = calculateGFRCalculator({
    calculationMode: "pediatric-schwartz",
    patientType: "child",
    unitSystem: "us",
    creatinineUnit: "mg/dL",
    age: 10,
    gender: "male",
    serumCreatinine: 0.9,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
  });
  if (baseC.eGfr !== 81.6) {
    throw new Error(`Baseline C failed: expected eGFR 81.6, got ${baseC.eGfr}`);
  }

  // 4. Age Crossover Test
  const child17 = calculateGFRCalculator({ age: 17, serumCreatinine: 0.9, heightFeet: 5, heightInches: 6 });
  if (child17.patientType !== "child" || !child17.primaryFormulaUsed.includes("Schwartz")) {
    throw new Error(`Age 17 crossover failed: expected Child Schwartz, got ${child17.primaryFormulaUsed}`);
  }

  const adult18 = calculateGFRCalculator({ age: 18, serumCreatinine: 0.9 });
  if (adult18.patientType !== "adult" || !adult18.primaryFormulaUsed.includes("CKD-EPI 2021")) {
    throw new Error(`Age 18 crossover failed: expected Adult CKD-EPI 2021, got ${adult18.primaryFormulaUsed}`);
  }

  // 5. Zero Height Inches Regression (5'0" must equal 152.4 cm -> 69.9 eGFR for 10yo with SCr 0.9)
  const heightZeroInches = calculateGFRCalculator({
    calculationMode: "pediatric-schwartz",
    patientType: "child",
    age: 10,
    serumCreatinine: 0.9,
    heightFeet: 5,
    heightInches: 0,
  });
  if (heightZeroInches.eGfr !== 69.9) {
    throw new Error(`Height 0 inches bug regressed: expected 69.9, got ${heightZeroInches.eGfr}`);
  }

  // 6. High eGFR Uncapped Regression (20yo female SCr 0.4 must be 145.2, not clipped to 140)
  const highEgfr = calculateGFRCalculator({
    calculationMode: "adult-ckdepi2021",
    age: 20,
    gender: "female",
    serumCreatinine: 0.4,
  });
  if (highEgfr.eGfr !== 145.2) {
    throw new Error(`High eGFR capping bug regressed: expected 145.2, got ${highEgfr.eGfr}`);
  }

  // 7. Unit Conversion Invariance
  const mgDlRes = calculateGFRCalculator({ creatinineUnit: "mg/dL", serumCreatinine: 0.9, age: 50, gender: "male" });
  const umolRes = calculateGFRCalculator({ creatinineUnit: "umol/L", serumCreatinine: 79.56, age: 50, gender: "male" });
  if (Math.abs(mgDlRes.eGfr - umolRes.eGfr) > 0.1) {
    throw new Error(`Unit conversion invariance failed: ${mgDlRes.eGfr} vs ${umolRes.eGfr}`);
  }

  // 8. KDIGO 2024 Grid Categories
  const lowRisk = calculateGFRCalculator({ serumCreatinine: 0.9, age: 50, uACR: 15 });
  if (lowRisk.kdigoRisk.riskCategory !== "Low Risk" || lowRisk.kdigoRisk.gStage !== "G1") {
    throw new Error(`KDIGO Low Risk failed: got ${lowRisk.kdigoRisk.riskCategory}`);
  }

  const veryHighRisk = calculateGFRCalculator({ serumCreatinine: 5.0, age: 70, uACR: 400 });
  if (veryHighRisk.kdigoRisk.riskCategory !== "Very High Risk" || veryHighRisk.kdigoRisk.gStage !== "G5") {
    throw new Error(`KDIGO Very High Risk failed: got ${veryHighRisk.kdigoRisk.riskCategory} ${veryHighRisk.kdigoRisk.gStage}`);
  }

  return true;
}
