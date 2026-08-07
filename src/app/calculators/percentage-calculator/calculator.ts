import { PercentageCalculatorOutputs } from "./types";

export function calculatePercentageCalculator(inputs: Record<string, any>): PercentageCalculatorOutputs {
  const type = inputs.calcType || "what_is_x_pct_of_y";
  const x = Number(inputs.valueX) || 0;
  const y = Number(inputs.valueY) || 0;
  let res = 0;
  let summary = "";
  if (type === "what_is_x_pct_of_y") {
    res = (x / 100) * y;
    summary = `${x}% of ${y} is ${res}`;
  } else if (type === "x_is_what_pct_of_y") {
    res = y !== 0 ? (x / y) * 100 : 0;
    summary = `${x} is ${res.toFixed(2)}% of ${y}`;
  } else {
    res = x !== 0 ? ((y - x) / Math.abs(x)) * 100 : 0;
    summary = `Change from ${x} to ${y} is ${res.toFixed(2)}%`;
  }
  return { result: parseFloat(res.toFixed(4)), summary };
}
