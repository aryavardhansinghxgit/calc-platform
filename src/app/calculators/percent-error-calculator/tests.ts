import { calculatePercentErrorCalculator } from "./calculator";

export function runPercentErrorCalculatorTests() {
  const defaultInputs = { expVal: 9.5, theoVal: 9.8 };
  const res1 = calculatePercentErrorCalculator(defaultInputs);
  if (Math.abs(res1.percentError - 3.061) > 0.001) throw new Error("Default percent error is incorrect");
  if (Math.abs(res1.absoluteError - 0.3) > 0.0001) throw new Error("Absolute error is incorrect");
  if (res1.signedPercentError >= 0) throw new Error("Underestimation should have a negative signed error");

  const exact = calculatePercentErrorCalculator({ expVal: 0, theoVal: 0.5 });
  if (exact.percentError !== 100 || exact.absoluteError !== 0.5) throw new Error("Zero observed value is incorrect");

  const negative = calculatePercentErrorCalculator({ expVal: -50, theoVal: -50 });
  if (negative.percentError !== 0 || negative.signedPercentError !== 0) throw new Error("Negative exact values are incorrect");

  let zeroDenominatorFailed = false;
  try {
    calculatePercentErrorCalculator({ expVal: 0, theoVal: 0 });
  } catch {
    zeroDenominatorFailed = true;
  }
  if (!zeroDenominatorFailed) throw new Error("Zero true value should be rejected");

  let invalidInputFailed = false;
  try {
    calculatePercentErrorCalculator({ expVal: null, theoVal: null });
  } catch {
    invalidInputFailed = true;
  }
  if (!invalidInputFailed) throw new Error("Missing values should be rejected");

  return true;
}
