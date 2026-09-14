const http = require('http');

// Load current formula implementation
const {
  calculateArmyBodyFat,
  getMaxAllowableArmyBodyFat
} = require('../src/lib/formulas/armyBodyFat.ts');

console.log("==========================================");
console.log("U.S. ARMY BODY FAT AUDIT - INITIAL ANALYSIS");
console.log("==========================================\n");

// Case A: 175 lbs, 70 in, 34 in waist, male, age 25
const resA = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  age: 25,
  weightLbs: 175,
  heightInches: 70,
  waistInches: 34,
  calculationMethod: "army_2023_single_site",
  acftScore: 540,
  acftPassedAllEvents80: true
});

console.log("CASE A Result:", {
  bodyFatPercentage: resA.bodyFatPercentage,
  maxAllowableBodyFat: resA.maxAllowableBodyFat,
  isCompliant: resA.isCompliant,
  isAcftExempt: resA.isAcftExempt,
  leanMassLbs: resA.leanMassLbs,
  fatMassLbs: resA.fatMassLbs
});

// Calculate official Army Directive 2023-11 formula:
// Male: %BF = -26.97 - (0.12 * weight) + (1.99 * waist)
const officialMaleBF = -26.97 - (0.12 * 175) + (1.99 * 34);
console.log("Official Army Directive 2023-11 calculation for Male (175 lb, 34 in waist):", officialMaleBF.toFixed(1) + "%");

// Female official: %BF = -9.15 - (0.015 * weight) + (1.27 * waist)
const officialFemaleBF = -9.15 - (0.015 * 175) + (1.27 * 34);
console.log("Official Army Directive 2023-11 calculation for Female (175 lb, 34 in waist):", officialFemaleBF.toFixed(1) + "%");

// Test zero input fallback
const resZero = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  age: 25,
  weightLbs: 0,
  heightInches: 0,
  waistInches: 0
});
console.log("Zero input test:", {
  weightInput: 0,
  resultBodyFat: resZero.bodyFatPercentage,
  resultLeanMass: resZero.leanMassLbs,
  resultFatMass: resZero.fatMassLbs
});
