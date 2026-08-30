import { calculateBsaCalculator } from "../src/app/calculators/body-surface-area-calculator/calculator";

const res = calculateBsaCalculator({
  mode: "mosteller-clinical",
  gender: "male",
  unitSystem: "us",
  ageYears: 35,
  heightFeet: 5,
  heightInches: 10,
  weightLbs: 165,
  heightCm: 178,
  weightKg: 75,
});

console.log("=== CANONICAL BASELINE AUDIT (5'10\", 165 lbs, 35yo Male) ===");
console.log("Height cm:", res.heightCm);
console.log("Weight kg:", res.weightKg);
console.log("Primary BSA (m²):", res.primaryBsaM2);
console.log("Primary BSA (ft²):", res.primaryBsaFt2);
console.log("BMI:", res.bmi, `(${res.bmiCategory})`);
console.log("Ideal Body Weight (Devine):", res.idealBodyWeightKg, "kg");
console.log("Lean Body Mass (Boer):", res.leanBodyMassKg, "kg");
console.log("\n--- Formula List ---");
res.formulaList.forEach((f) => {
  console.log(`${f.formulaName}: ${f.bsaM2} m² (${f.bsaFt2} ft²), diff: ${f.varianceFromMosteller}%`);
});
console.log("\nMin BSA:", res.minBsaM2);
console.log("Max BSA:", res.maxBsaM2);
console.log("Average BSA:", res.averageBsaM2);

// Check Schlich mode
const resSchlich = calculateBsaCalculator({
  mode: "schlich-gender",
  gender: "male",
  unitSystem: "us",
  ageYears: 35,
  heightFeet: 5,
  heightInches: 10,
  weightLbs: 165,
  heightCm: 178,
  weightKg: 75,
});
console.log("\nSchlich Mode Primary BSA:", resSchlich.primaryBsaM2, "m² (", resSchlich.primaryBsaFt2, "ft²)");

// Check GFR Normalization
const resGfr = calculateBsaCalculator({
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
console.log("\nGFR Normalization Mode:", resGfr.gfrNormalization);

// Check Cardiac Index
const resCi = calculateBsaCalculator({
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
});
console.log("\nCardiac Index Mode:", resCi.cardiacIndex);
