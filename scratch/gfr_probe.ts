import { calculateGfrCalculator } from "../src/app/calculators/gfr-calculator/calculator";

// Test Baseline A: Adult Male, 50yo, SCr 0.9 mg/dL, 5'10", 160 lbs, non-Black
const baseA = calculateGfrCalculator({
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

console.log("Baseline A Results:");
console.log("eGFR:", baseA.eGfr, "(Expected ~104)");
console.log("CKD Stage:", baseA.ckdStage);
console.log("Cockcroft-Gault:", baseA.creatinineClearance, "(Expected ~100.8)");

// Test Baseline B: Adult Male, 50yo, SCr 0.9 mg/dL in 2009 mode
const baseB = calculateGfrCalculator({
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
console.log("\nBaseline B (2009 legacy):");
console.log("eGFR:", baseB.eGfr, "(Expected ~99.2)");

// Test Baseline C: Child, 10yo, SCr 0.9 mg/dL, Height 5'10" (177.8 cm)
const baseC = calculateGfrCalculator({
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
console.log("\nBaseline C (Pediatric Schwartz):");
console.log("eGFR:", baseC.eGfr, "(Expected ~81.6)");

// Test Defect 2: 5'0" Height
const test5ft0in = calculateGfrCalculator({
  calculationMode: "pediatric-schwartz",
  patientType: "child",
  unitSystem: "us",
  creatinineUnit: "mg/dL",
  age: 10,
  gender: "male",
  serumCreatinine: 0.9,
  heightFeet: 5,
  heightInches: 0,
  weightLbs: 100,
});
console.log("\nTesting 5'0\" Height (Defect 2 check):");
console.log("5'0\" eGFR:", test5ft0in.eGfr);
// Expected for 5'0" (152.4 cm): 0.413 * 152.4 / 0.9 = 69.93 -> 69.9
// If bug present (falling back to 7 inches = 170.18 cm): 0.413 * 170.18 / 0.9 = 78.1
console.log("Expected for 5'0\" (152.4 cm): 69.9, Actual:", test5ft0in.eGfr);

// Test Defect 1: High eGFR capping (> 140)
const testHighEgfr = calculateGfrCalculator({
  calculationMode: "adult-ckdepi2021",
  patientType: "adult",
  unitSystem: "us",
  creatinineUnit: "mg/dL",
  age: 20,
  gender: "female",
  serumCreatinine: 0.4,
});
console.log("\nTesting High eGFR (Defect 1 check):");
console.log("Calculated eGFR for 20yo female, SCr 0.4:", testHighEgfr.eGfr);
// Official: 142 * (0.4/0.7)^(-0.241) * 0.9938^20 * 1.012 = 145.2. If capped: 140
console.log("Expected: 145.2, Actual:", testHighEgfr.eGfr);
