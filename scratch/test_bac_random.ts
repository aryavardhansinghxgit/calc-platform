import { calculateBacCalculator } from "../src/app/calculators/bac-calculator/calculator";
import { BacInputs, DrinkEntry } from "../src/app/calculators/bac-calculator/types";

console.log("=================================================");
console.log("RANDOMIZED TESTING: BAC CALCULATOR");
console.log("=================================================");

let validPassed = 0;
let validFailed = 0;
let invalidHandled = 0;
let invalidFailed = 0;

// 1,000 Valid Randomized Cases
for (let i = 0; i < 1000; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const mode = ["widmark-standard", "seidl-anthropometric", "watson-tbw"][Math.floor(Math.random() * 3)] as any;
  const weightLbs = 90 + Math.random() * 260; // 90 to 350 lbs
  const heightFeet = 4 + Math.floor(Math.random() * 3); // 4, 5, 6
  const heightInches = Math.floor(Math.random() * 12);
  const hours = Math.random() * 12; // 0 to 12 hours
  const stomach = ["light", "empty", "full"][Math.floor(Math.random() * 3)] as any;
  
  const drinkCount = 1 + Math.floor(Math.random() * 6);
  const drinkList: DrinkEntry[] = [];
  for (let d = 0; d < drinkCount; d++) {
    drinkList.push({
      id: String(d),
      name: `Drink ${d}`,
      category: "beer",
      count: 1 + Math.floor(Math.random() * 3),
      volumeMl: 100 + Math.floor(Math.random() * 500),
      abvPercent: 3 + Math.random() * 15,
    });
  }

  const inputs: BacInputs = {
    mode,
    gender,
    unitSystem: "us",
    ageYears: 21 + Math.floor(Math.random() * 60),
    weightLbs,
    heightFeet,
    heightInches,
    weightKg: weightLbs * 0.453592,
    heightCm: (heightFeet * 12 + heightInches) * 2.54,
    timeSinceFirstDrinkHours: hours,
    timeSinceFirstDrinkMinutes: 0,
    stomachState: stomach,
    eliminationRateBeta: 0.015,
    drinks: drinkList,
  };

  const res = calculateBacCalculator(inputs);

  const isValidOutput = 
    !isNaN(res.currentBacPercent) &&
    !isNaN(res.peakBacPercent) &&
    !isNaN(res.hoursUntilSober000) &&
    isFinite(res.currentBacPercent) &&
    isFinite(res.peakBacPercent) &&
    isFinite(res.hoursUntilSober000) &&
    res.currentBacPercent >= 0 &&
    res.peakBacPercent >= 0 &&
    res.hoursUntilSober000 >= 0;

  if (isValidOutput) {
    validPassed++;
  } else {
    validFailed++;
  }
}

console.log(`Valid Cases: ${validPassed}/1000 passed, ${validFailed} failed.`);

// 250 Invalid Randomized Cases
for (let i = 0; i < 250; i++) {
  const invalidType = i % 5;
  let inputs: BacInputs = {
    mode: "widmark-standard",
    gender: "male",
    unitSystem: "us",
    ageYears: 30,
    weightLbs: 165,
    heightFeet: 5,
    heightInches: 10,
    weightKg: 75,
    heightCm: 178,
    timeSinceFirstDrinkHours: 2,
    timeSinceFirstDrinkMinutes: 0,
    stomachState: "light",
    eliminationRateBeta: 0.015,
    drinks: [{ id: "1", name: "Beer", category: "beer", count: 1, volumeMl: 355, abvPercent: 5.0 }],
  };

  if (invalidType === 0) {
    // Zero or negative weight
    inputs.weightLbs = -10 - Math.random() * 100;
  } else if (invalidType === 1) {
    // Negative elapsed hours
    inputs.timeSinceFirstDrinkHours = -1 - Math.random() * 10;
  } else if (invalidType === 2) {
    // Negative ABV
    inputs.drinks[0].abvPercent = -5 - Math.random() * 20;
  } else if (invalidType === 3) {
    // ABV > 100%
    inputs.drinks[0].abvPercent = 105 + Math.random() * 50;
  } else if (invalidType === 4) {
    // Negative volume
    inputs.drinks[0].volumeMl = -100 - Math.random() * 500;
  }

  const res = calculateBacCalculator(inputs);
  // Check if system rejects or safely marks invalid
  if ((res as any).isValid === false || (res as any).validationError) {
    invalidHandled++;
  } else {
    invalidFailed++;
  }
}

console.log(`Invalid Cases: ${invalidHandled}/250 handled, ${invalidFailed} unhandled/failed.`);
