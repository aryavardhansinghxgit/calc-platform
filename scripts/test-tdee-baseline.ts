import { calculateTdeeCalculator } from "../src/app/calculators/tdee-calculator/calculator";

const baseline = calculateTdeeCalculator({
  unitSystem: "us",
  energyUnit: "kcal",
  calculationMode: "tdee",
  age: 25,
  gender: "male",
  heightFeet: 5,
  heightInches: 10,
  weightLbs: 165,
  activityLevel: "moderate",
  goal: "maintain",
  bmrFormula: "mifflin",
  dailySteps: 7500,
  workoutFrequency: 4,
  workoutDuration: 45,
});

console.log("Baseline Calculation Results:");
console.log(`BMR: ${baseline.bmr}`);
console.log(`TDEE: ${baseline.tdee}`);
console.log(`Goal Target: ${baseline.targetCalories}`);
console.log(`NEAT: ${baseline.components.neatCalories}`);
console.log(`EAT: ${baseline.components.eatCalories}`);
console.log(`TEF: ${baseline.components.tefCalories}`);
const sum = baseline.components.neatCalories + baseline.components.eatCalories + baseline.components.tefCalories;
console.log(`NEAT + EAT + TEF = ${sum}`);
console.log(`BMR + components = ${baseline.bmr + sum}`);
