import { calculateBodyFat } from "../src/lib/formulas/bodyFat";

const male = calculateBodyFat({
  unitSystem: "metric",
  gender: "male",
  age: 25,
  heightCm: 179,
  weightKg: 68.9,
  neckCm: 38,
  waistCm: 80,
});
console.log("MALE BASELINE (PDF):");
console.log(male);

const female = calculateBodyFat({
  unitSystem: "metric",
  gender: "female",
  age: 25,
  heightCm: 178,
  weightKg: 68.9,
  neckCm: 38.1,
  waistCm: 80,
  hipCm: 96.5,
});
console.log("\nFEMALE BASELINE (SCREENSHOT):");
console.log(female);
