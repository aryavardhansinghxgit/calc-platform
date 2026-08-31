import { calculateBodySurfaceAreaCalculator } from "./calculator";

export function runBodySurfaceAreaCalculatorTests() {
  // 1. Canonical Baseline: 35yo Male, 5'10", 165 lbs
  const canonical = calculateBodySurfaceAreaCalculator({
    mode: "mosteller-clinical",
    gender: "male",
    unitSystem: "us",
    ageYears: 35,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    heightCm: 178,
    weightKg: 75,
    unadjustedGfrMlMin: 90,
    cardiacOutputLmin: 5.0,
    heartRateBpm: 72,
    targetChemoDoseMgM2: 175,
  });

  if (canonical.primaryBsaM2 !== 1.92) {
    throw new Error(`Canonical Mosteller BSA expected 1.92, got ${canonical.primaryBsaM2}`);
  }
  if (canonical.primaryBsaFt2 !== 20.69) {
    throw new Error(`Canonical Mosteller BSA ft2 expected 20.69, got ${canonical.primaryBsaFt2}`);
  }
  if (canonical.bmi !== 23.7) {
    throw new Error(`Canonical BMI expected 23.7, got ${canonical.bmi}`);
  }
  if (canonical.idealBodyWeightKg !== 73.0) {
    throw new Error(`Canonical Devine IBW expected 73.0, got ${canonical.idealBodyWeightKg}`);
  }
  if (canonical.leanBodyMassKg !== 58.7) {
    throw new Error(`Canonical Boer LBM expected 58.7, got ${canonical.leanBodyMassKg}`);
  }

  // 2. Unit Invariance & 5'0" Height Regression Check
  const height5ft0 = calculateBodySurfaceAreaCalculator({
    mode: "mosteller-clinical",
    gender: "male",
    unitSystem: "us",
    ageYears: 30,
    heightFeet: 5,
    heightInches: 0,
    weightLbs: 165,
    heightCm: 152.4,
    weightKg: 74.8,
  });
  if (Math.abs(height5ft0.heightCm - 152.4) > 0.1) {
    throw new Error(`5'0" height in cm expected 152.4, got ${height5ft0.heightCm}`);
  }
  if (height5ft0.heightInchesTotal !== 60) {
    throw new Error(`5'0" total inches expected 60, got ${height5ft0.heightInchesTotal}`);
  }

  // 3. Chemotherapy Dosing Regression Suite (ASCO 2021 Guidance: No Automatic 2.0 m² Cap)
  // Test A: BSA ~ 1.92 m², Dose 175 mg/m² -> Expected 336 mg
  const chemoTestA = calculateBodySurfaceAreaCalculator({
    mode: "chemo-dosing",
    gender: "male",
    unitSystem: "metric",
    ageYears: 45,
    heightCm: 177.8,
    weightKg: 74.84,
    targetChemoDoseMgM2: 175,
  });
  if (chemoTestA.primaryBsaM2 !== 1.92 || chemoTestA.chemoDosing?.finalDoseMg !== 336) {
    throw new Error(`Chemo Test A failed: expected BSA 1.92, dose 336 mg, got BSA ${chemoTestA.primaryBsaM2}, dose ${chemoTestA.chemoDosing?.finalDoseMg}`);
  }

  // Test B: BSA exactly 2.00 m², Dose 175 mg/m² -> Expected 350 mg
  const chemoTestB = calculateBodySurfaceAreaCalculator({
    mode: "chemo-dosing",
    gender: "male",
    unitSystem: "metric",
    ageYears: 45,
    heightCm: 180,
    weightKg: 80,
    targetChemoDoseMgM2: 175,
  });
  if (chemoTestB.primaryBsaM2 !== 2.00 || chemoTestB.chemoDosing?.finalDoseMg !== 350) {
    throw new Error(`Chemo Test B failed: expected BSA 2.00, dose 350 mg, got BSA ${chemoTestB.primaryBsaM2}, dose ${chemoTestB.chemoDosing?.finalDoseMg}`);
  }

  // Test C: BSA above 2.0 (BSA = 2.40 m²), Dose 175 mg/m² -> Expected 420 mg (MUST NOT BE 350 mg)
  const chemoTestC = calculateBodySurfaceAreaCalculator({
    mode: "chemo-dosing",
    gender: "male",
    unitSystem: "metric",
    ageYears: 45,
    heightCm: 180,
    weightKg: 115.2,
    targetChemoDoseMgM2: 175,
  });
  if (chemoTestC.primaryBsaM2 !== 2.40) {
    throw new Error(`Chemo Test C expected BSA 2.40, got ${chemoTestC.primaryBsaM2}`);
  }
  if (chemoTestC.chemoDosing?.finalDoseMg !== 420) {
    throw new Error(`Chemo Test C failed: expected 420 mg (uncapped), got ${chemoTestC.chemoDosing?.finalDoseMg} mg`);
  }
  if (chemoTestC.chemoDosing?.isCapped) {
    throw new Error(`Chemo Test C failed: should not be capped under ASCO guidelines`);
  }

  // Test D: BSA = 2.60 m², Dose 200 mg/m² -> Expected 520 mg (No automatic 2.0 m² cap)
  const chemoTestD = calculateBodySurfaceAreaCalculator({
    mode: "chemo-dosing",
    gender: "male",
    unitSystem: "metric",
    ageYears: 45,
    heightCm: 180,
    weightKg: 135.2,
    targetChemoDoseMgM2: 200,
  });
  if (chemoTestD.primaryBsaM2 !== 2.60) {
    throw new Error(`Chemo Test D expected BSA 2.60, got ${chemoTestD.primaryBsaM2}`);
  }
  if (chemoTestD.chemoDosing?.finalDoseMg !== 520) {
    throw new Error(`Chemo Test D failed: expected 520 mg, got ${chemoTestD.chemoDosing?.finalDoseMg} mg`);
  }

  // Test E: Calvert Carboplatin AUC Formula: Dose = Target AUC * (GFR + 25)
  const calvertTest = calculateBodySurfaceAreaCalculator({
    mode: "chemo-dosing",
    gender: "female",
    unitSystem: "metric",
    heightCm: 165,
    weightKg: 65,
    targetCarboplatinAuc: 5,
    targetGFR: 75,
  });
  // 5 * (75 + 25) = 5 * 100 = 500 mg
  if (calvertTest.chemoDosing?.carboplatinAucDoseMg !== 500) {
    throw new Error(`Calvert Carboplatin AUC expected 500 mg, got ${calvertTest.chemoDosing?.carboplatinAucDoseMg}`);
  }

  // 4. Cardiac Index & Hemodynamics
  const cardiacTest = calculateBodySurfaceAreaCalculator({
    mode: "cardiac-index",
    gender: "male",
    unitSystem: "us",
    ageYears: 35,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    heightCm: 178,
    weightKg: 75,
    cardiacOutputLmin: 5.0,
    heartRateBpm: 72,
  });
  if (!cardiacTest.cardiacIndex || Math.abs(cardiacTest.cardiacIndex.cardiacIndexLminM2 - 2.6) > 0.1) {
    throw new Error(`Cardiac Index expected ~2.6 L/min/m2, got ${cardiacTest.cardiacIndex?.cardiacIndexLminM2}`);
  }

  // 5. GFR Normalization
  const gfrTest = calculateBodySurfaceAreaCalculator({
    mode: "gfr-normalization",
    gender: "male",
    unitSystem: "us",
    ageYears: 35,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    heightCm: 178,
    weightKg: 75,
    unadjustedGfrMlMin: 90,
  });
  if (!gfrTest.gfrNormalization || Math.abs(gfrTest.gfrNormalization.normalizedGfrMlMin173m2 - 81.0) > 0.5) {
    throw new Error(`GFR Normalization expected ~81.0 mL/min/1.73m2, got ${gfrTest.gfrNormalization?.normalizedGfrMlMin173m2}`);
  }

  // 6. Cross-Formula & Zero Edge Cases (No NaN)
  const zeroTest = calculateBodySurfaceAreaCalculator({
    mode: "mosteller-clinical",
    gender: "male",
    unitSystem: "metric",
    ageYears: 20,
    heightFeet: 0,
    heightInches: 0,
    weightLbs: 0,
    heightCm: 0,
    weightKg: 0,
  });
  if (zeroTest.primaryBsaM2 !== 0 || zeroTest.bmi !== 0) {
    throw new Error("Zero inputs test failed to return 0 BSA");
  }
  zeroTest.formulaList.forEach((f) => {
    if (isNaN(f.varianceFromMosteller) || isNaN(f.bsaM2)) {
      throw new Error(`Formula ${f.formulaName} produced NaN in zero test`);
    }
  });

  return true;
}
