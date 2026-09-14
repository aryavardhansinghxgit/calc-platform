import { calculateBodyTypeCalculator } from "../src/app/calculators/body-type-calculator/calculator";

console.log("--> Running 1,000 Randomized Valid Cases...");
let validPassed = 0;
for (let i = 0; i < 1000; i++) {
  const gender = Math.random() > 0.5 ? "female" : "male";
  const bust = 25 + Math.random() * 40; // 25 to 65
  const waist = 18 + Math.random() * 35; // 18 to 53
  const highHip = waist + Math.random() * 15; // waist to waist+15
  const hip = waist + 2 + Math.random() * 25; // waist+2 to waist+27
  const height = 55 + Math.random() * 25; // 55 to 80
  const weight = 90 + Math.random() * 200; // 90 to 290

  const res = calculateBodyTypeCalculator({
    gender,
    bustChestInches: bust,
    waistInches: waist,
    highHipInches: highHip,
    hipInches: hip,
    heightInches: height,
    weightLbs: weight,
  });

  if (
    !isNaN(res.whr) &&
    !isNaN(res.whtr) &&
    isFinite(res.whr) &&
    isFinite(res.whtr) &&
    res.primaryShape &&
    res.somatotype &&
    res.somatotype.dominantType
  ) {
    validPassed++;
  }
}
console.log(`✓ Valid Randomized Cases Passed: ${validPassed}/1000`);

console.log("--> Running 250 Invalid Randomized Cases...");
let invalidHandled = 0;
for (let i = 0; i < 250; i++) {
  const badWaist = Math.random() > 0.5 ? 0 : -(1 + Math.random() * 30);
  const badHeight = Math.random() > 0.5 ? 0 : -(10 + Math.random() * 50);

  const res = calculateBodyTypeCalculator({
    bustChestInches: 36,
    waistInches: badWaist,
    highHipInches: 32,
    hipInches: 36,
    heightInches: badHeight,
    weightLbs: 140,
  });

  // If badWaist is 0, does it silently become 26?
  if (badWaist === 0 && res.waistInches === 26) {
    // Silent fallback bug!
  } else if (badWaist < 0 && res.whr < 0) {
    // Unvalidated negative bug!
  } else {
    invalidHandled++;
  }
}
console.log(`Invalid Cases Handled Correctly: ${invalidHandled}/250 (Expected 0 handled because of silent fallback & negative bugs!)`);
