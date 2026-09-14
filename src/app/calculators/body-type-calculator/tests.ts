import { calculateBodyTypeCalculator } from "./calculator";

export function runBodyTypeCalculatorTests() {
  // Test 1: Valid Default Female
  const defaultInputs = {
    gender: "female",
    unitSystem: "us",
    bustChestInches: 36,
    waistInches: 26,
    highHipInches: 32,
    hipInches: 36,
    heightInches: 66,
    weightLbs: 140,
  };
  const res1 = calculateBodyTypeCalculator(defaultInputs);
  if (!res1.isValid) throw new Error("Default inputs marked invalid");
  if (res1.primaryShape !== "Hourglass") throw new Error(`Expected Hourglass, got ${res1.primaryShape}`);
  if (res1.whr !== 0.722) throw new Error(`Expected WHR 0.722, got ${res1.whr}`);
  if (res1.whtr !== 0.394) throw new Error(`Expected WHtR 0.394, got ${res1.whtr}`);
  if (!Array.isArray(res1.shapeComparisons) || res1.shapeComparisons.length === 0)
    throw new Error("Missing dynamic shape comparisons");
  if (res1.shapeComparisons[0].shapeName !== "Hourglass")
    throw new Error(`Expected Hourglass #1 match, got ${res1.shapeComparisons[0].shapeName}`);

  // Test 2: Rejection of zero inputs
  const zeroInputs = {
    bustChestInches: 36,
    waistInches: 0,
    highHipInches: 32,
    hipInches: 36,
    heightInches: 66,
    weightLbs: 140,
  };
  const res2 = calculateBodyTypeCalculator(zeroInputs);
  if (res2.isValid) throw new Error("Zero waist must be rejected as invalid");

  // Test 3: Rejection of negative inputs
  const negInputs = {
    bustChestInches: 36,
    waistInches: -26,
    highHipInches: 32,
    hipInches: 36,
    heightInches: 66,
    weightLbs: 140,
  };
  const res3 = calculateBodyTypeCalculator(negInputs);
  if (res3.isValid) throw new Error("Negative waist must be rejected as invalid");

  // Test 4: Rejection of NaN inputs
  const nanInputs = {
    bustChestInches: NaN,
    waistInches: 26,
    highHipInches: 32,
    hipInches: 36,
    heightInches: 66,
    weightLbs: 140,
  };
  const res4 = calculateBodyTypeCalculator(nanInputs);
  if (res4.isValid) throw new Error("NaN input must be rejected as invalid");

  // Test 5: Male Inverted Triangle (dead code test)
  const maleInputs = {
    gender: "male",
    unitSystem: "us",
    bustChestInches: 46,
    waistInches: 32,
    highHipInches: 34,
    hipInches: 38,
    heightInches: 70,
    weightLbs: 200,
  };
  const res5 = calculateBodyTypeCalculator(maleInputs);
  if (!res5.isValid) throw new Error("Valid male inputs marked invalid");
  if (res5.primaryShape !== "Inverted Triangle")
    throw new Error(`Expected Inverted Triangle for male bodybuilder, got ${res5.primaryShape}`);

  // Test 6: Dynamic Rectangle Shape Matrix Test
  const rectInputs = {
    gender: "female",
    unitSystem: "us",
    bustChestInches: 36,
    waistInches: 34,
    highHipInches: 35,
    hipInches: 36,
    heightInches: 66,
    weightLbs: 140,
  };
  const res6 = calculateBodyTypeCalculator(rectInputs);
  if (!res6.isValid) throw new Error("Valid rectangle inputs marked invalid");
  if (!res6.primaryShape.includes("Rectangle"))
    throw new Error(`Expected Rectangle, got ${res6.primaryShape}`);
  if (res6.shapeComparisons[0].shapeName !== "Rectangle (Banana)")
    throw new Error(`Expected Rectangle (Banana) #1 match in matrix, got ${res6.shapeComparisons[0].shapeName}`);

  return true;
}
