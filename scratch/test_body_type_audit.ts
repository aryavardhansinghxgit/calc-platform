import { calculateBodyTypeCalculator } from "../src/app/calculators/body-type-calculator/calculator";
import { body_type_calculatorFaqs } from "../src/app/calculators/body-type-calculator/faq";

console.log("=================================================");
console.log("ADVERSARIAL QA AUDIT: BODY TYPE CALCULATOR");
console.log("=================================================");

let passed = 0;
let failed = 0;

function check(desc: string, condition: boolean, details?: any) {
  if (condition) {
    passed++;
    console.log(`✓ PASS: ${desc}`);
  } else {
    failed++;
    console.log(`❌ FAIL: ${desc}`);
    if (details) console.log(`   Details:`, details);
  }
}

// TEST 1: Default Female Example (from prompt & screenshot)
// Bust 36, Waist 26, High Hip 32, Low Hip 36, Height 66, Weight 140
const femaleDefault = calculateBodyTypeCalculator({
  mode: "female-fashion",
  gender: "female",
  unitSystem: "us",
  bustChestInches: 36,
  waistInches: 26,
  highHipInches: 32,
  hipInches: 36,
  heightInches: 66,
  weightLbs: 140,
});

check("Default Female Shape is Hourglass", femaleDefault.primaryShape === "Hourglass", femaleDefault.primaryShape);
check("Default Female WHR is 0.722", femaleDefault.whr === 0.722, femaleDefault.whr);
check("Default Female WHtR is 0.394", femaleDefault.whtr === 0.394, femaleDefault.whtr);
check("Default Female Somatotype is Mesomorph", femaleDefault.somatotype.dominantType === "Mesomorph", femaleDefault.somatotype);

// TEST 2: Shape Comparison Matrix - Is it dynamically calculated or hardcoded?
console.log("\n--- Checking Shape Match Matrix Dynamism ---");
const femaleRectangleInputs = calculateBodyTypeCalculator({
  mode: "female-fashion",
  gender: "female",
  unitSystem: "us",
  bustChestInches: 36,
  waistInches: 34, // Minimal waist curve
  highHipInches: 35,
  hipInches: 36,
  heightInches: 66,
  weightLbs: 140,
});

console.log("Rectangle inputs classified as:", femaleRectangleInputs.primaryShape);
console.log("Rectangle inputs shape comparisons:", femaleRectangleInputs.shapeComparisons);

check(
  "Rectangle primary shape classified as Rectangle (Banana)",
  femaleRectangleInputs.primaryShape.includes("Rectangle"),
  femaleRectangleInputs.primaryShape
);

// Look at the match percentage of the primary shape vs other shapes
const topMatch = femaleRectangleInputs.shapeComparisons[0];
check(
  "Top shape in matrix must match the primary shape or have highest match percentage",
  topMatch.shapeName.includes("Rectangle") && topMatch.matchPercentage >= 70,
  topMatch
);

// TEST 3: Male Frame Classification & Dead Code
console.log("\n--- Checking Male Frame Logic ---");
// Bodybuilder: Chest 46, Waist 32 (diff = 14 >= 8), Hip 38 (chest >= hip)
const maleBodybuilder = calculateBodyTypeCalculator({
  mode: "male-structure",
  gender: "male",
  unitSystem: "us",
  bustChestInches: 46,
  waistInches: 32,
  highHipInches: 34,
  hipInches: 38,
  heightInches: 70,
  weightLbs: 200,
});

console.log("Male Bodybuilder (Chest 46, Waist 32, Hip 38) classified as:", maleBodybuilder.primaryShape);
check(
  "Can Male Inverted Triangle ever be reached when chest >= hip?",
  maleBodybuilder.primaryShape === "Inverted Triangle",
  maleBodybuilder.primaryShape
);

// TEST 4: Input Validation with 0 and Negatives
console.log("\n--- Checking Input Validation (Zero & Negative Handling) ---");
const zeroWaist = calculateBodyTypeCalculator({
  mode: "female-fashion",
  gender: "female",
  unitSystem: "us",
  bustChestInches: 36,
  waistInches: 0,
  highHipInches: 32,
  hipInches: 36,
  heightInches: 66,
  weightLbs: 140,
});

console.log("Zero waist input waistInches result:", zeroWaist.waistInches);
check(
  "Zero waist must NOT silently fall back to default 26",
  zeroWaist.waistInches !== 26, // Should be rejected, NaN or marked invalid, not 26!
  zeroWaist.waistInches
);

const negativeWaist = calculateBodyTypeCalculator({
  mode: "female-fashion",
  gender: "female",
  unitSystem: "us",
  bustChestInches: 36,
  waistInches: -26,
  highHipInches: 32,
  hipInches: 36,
  heightInches: 66,
  weightLbs: 140,
});

console.log("Negative waist WHR result:", negativeWaist.whr);
check(
  "Negative waist must NOT produce a valid positive or negative ratio",
  isNaN(negativeWaist.whr) || negativeWaist.whr === 0,
  negativeWaist.whr
);

// TEST 5: Metric Conversion Equivalence
console.log("\n--- Checking Metric Conversion Equivalence ---");
const metricDefault = calculateBodyTypeCalculator({
  mode: "female-fashion",
  gender: "female",
  unitSystem: "metric",
  bustChestCm: 91.44,
  waistCm: 66.04,
  highHipCm: 81.28,
  hipCm: 91.44,
  heightCm: 167.64,
  weightKg: 63.5,
});

check("Metric Female Shape is Hourglass", metricDefault.primaryShape === "Hourglass", metricDefault.primaryShape);
check("Metric WHR matches Imperial (0.722)", Math.abs(metricDefault.whr - femaleDefault.whr) < 0.005, {
  imperial: femaleDefault.whr,
  metric: metricDefault.whr,
});
check("Metric WHtR matches Imperial (0.394)", Math.abs(metricDefault.whtr - femaleDefault.whtr) < 0.005, {
  imperial: femaleDefault.whtr,
  metric: metricDefault.whtr,
});
check(
  "Metric Somatotype matches Imperial",
  metricDefault.somatotype.dominantType === femaleDefault.somatotype.dominantType,
  {
    imperial: femaleDefault.somatotype.dominantType,
    metric: metricDefault.somatotype.dominantType,
  }
);

// TEST 6: Female Shape Boundary Testing
console.log("\n--- Checking Female Shape Boundary Transitions ---");
// Hourglass: (Bust - Hip) <= 1 && (Hip - Bust) < 3.6 && (Bust - Waist >= 9 || Hip - Waist >= 10)
// Case A: Bust 36, Hip 36, Waist 27.0 -> Bust - Waist = 9.0 (Hourglass)
const hgAt9 = calculateBodyTypeCalculator({
  gender: "female",
  bustChestInches: 36,
  waistInches: 27,
  highHipInches: 32,
  hipInches: 36,
  heightInches: 66,
  weightLbs: 140,
});
check("Bust-Waist = 9.0 is Hourglass", hgAt9.primaryShape === "Hourglass", hgAt9.primaryShape);

// Case B: Bust 36, Hip 36, Waist 27.1 -> Bust - Waist = 8.9 (Should fall to Rectangle!)
const hgAt8_9 = calculateBodyTypeCalculator({
  gender: "female",
  bustChestInches: 36,
  waistInches: 27.1,
  highHipInches: 32,
  hipInches: 36,
  heightInches: 66,
  weightLbs: 140,
});
check("Bust-Waist = 8.9 is Rectangle", hgAt8_9.primaryShape === "Rectangle (Banana)", hgAt8_9.primaryShape);

// TEST 7: Spoon vs Hourglass Priority
// If Hip - Bust = 2.5, Hip - Waist = 11, HighHip / Waist = 1.25 >= 1.193
// High-hip shelf is clearly present!
const spoonCandidate = calculateBodyTypeCalculator({
  gender: "female",
  bustChestInches: 36,
  waistInches: 26,
  highHipInches: 33, // 33/26 = 1.269 >= 1.193
  hipInches: 38.5, // Hip - Bust = 2.5 (between 2 and 3.6)
  heightInches: 66,
  weightLbs: 140,
});
console.log("Spoon Candidate classified as:", spoonCandidate.primaryShape);

console.log("\n=================================================");
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log("=================================================");
