// scratch/lbm_audit.ts
import { calculateLeanBodyMass } from "../src/lib/formulas/leanBodyMass";

const weightLb = 160;
const heightIn = 70;
const weightKg = weightLb * 0.45359237; // 72.5747792
const heightCm = heightIn * 2.54; // 177.8

console.log("Weight (kg):", weightKg);
console.log("Height (cm):", heightCm);

// Oracle Boer Male:
const boer = 0.407 * weightKg + 0.267 * heightCm - 19.2;
const james = 1.1 * weightKg - 128 * Math.pow(weightKg / heightCm, 2);
const hume = 0.32810 * weightKg + 0.33929 * heightCm - 29.5336;
const bmi = weightKg / Math.pow(heightCm / 100, 2);
const jan = (9270 * weightKg) / (6680 + 216 * bmi);

console.log("\nOracle Calculations (kg):");
console.log("Boer:", boer, "kg | lbs:", boer * 2.20462262);
console.log("James:", james, "kg | lbs:", james * 2.20462262);
console.log("Hume:", hume, "kg | lbs:", hume * 2.20462262);
console.log("Janmahasatian:", jan, "kg | lbs:", jan * 2.20462262);

const mean3Kg = (boer + james + hume) / 3;
const mean3Lb = mean3Kg * 2.20462262;
console.log("\nMean of 3 (Boer, James, Hume):", mean3Kg.toFixed(1), "kg |", mean3Lb.toFixed(1), "lbs");

const mean4Kg = (boer + james + hume + jan) / 4;
const mean4Lb = mean4Kg * 2.20462262;
console.log("Mean of 4 (Boer, James, Hume, Janmahasatian):", mean4Kg.toFixed(1), "kg |", mean4Lb.toFixed(1), "lbs");

const engineRes = calculateLeanBodyMass({
  unitSystem: "imperial",
  gender: "male",
  isChild: false,
  age: 30,
  weightLbs: 160,
  heightInches: 70,
});

console.log("\nCurrent Engine Results:");
console.log("Consensus LBM:", engineRes.consensusLbmLbs, "lbs (", engineRes.consensusLbmKg, "kg )");
console.log("Formulas returned in formulaResults:", engineRes.formulaResults.map(f => `${f.formulaName}: ${f.lbmLbs} lbs (${f.lbmKg} kg)`));
