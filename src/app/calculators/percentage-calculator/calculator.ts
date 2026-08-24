import { PercentageCalculatorOutputs } from "./types";

export function calculatePercentageCalculator(inputs: Record<string, any>): PercentageCalculatorOutputs {
  const type = inputs.calcType || "what_is_x_pct_of_y";
  const x = Number(inputs.valueX);
  const y = Number(inputs.valueY);

  if (Number.isNaN(x) || Number.isNaN(y)) {
    return {
      result: 0,
      summary: "Invalid numerical input provided.",
      isValid: false,
    };
  }

  let res = 0;
  let summary = "";
  let steps = "";

  if (type === "what_is_x_pct_of_y") {
    // What is X% of Y? -> (X / 100) * Y
    res = (x / 100) * y;
    const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    summary = `${x}% of ${y} is ${cleanRes}`;
    steps = `${x}% of ${y} = (${x} / 100) × ${y} = ${(x / 100)} × ${y} = ${cleanRes}`;
    return { result: cleanRes, summary, steps, isValid: true };
  } 
  
  if (type === "x_is_what_pct_of_y") {
    // X is what % of Y? -> (X / Y) * 100
    if (y === 0) {
      return {
        result: NaN,
        summary: "Undefined: Base value (denominator) cannot be zero.",
        steps: `${x} ÷ 0 × 100 = Undefined (division by zero)`,
        isValid: false,
      };
    }
    res = (x / y) * 100;
    const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    summary = `${x} is ${cleanRes}% of ${y}`;
    steps = `(${x} ÷ ${y}) × 100 = ${(x / y)} × 100 = ${cleanRes}%`;
    return { result: cleanRes, summary, steps, isValid: true };
  }

  if (type === "x_is_y_pct_of_what") {
    // X is Y% of what? -> X / (Y / 100)
    if (y === 0) {
      return {
        result: NaN,
        summary: "Undefined: Percentage rate cannot be zero when finding the whole.",
        steps: `${x} ÷ (0 / 100) = Undefined (division by zero)`,
        isValid: false,
      };
    }
    res = x / (y / 100);
    const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    summary = `${x} is ${y}% of ${cleanRes}`;
    steps = `${x} ÷ (${y} / 100) = ${x} ÷ ${(y / 100)} = ${cleanRes}`;
    return { result: cleanRes, summary, steps, isValid: true };
  }

  if (type === "pct_difference") {
    // Percentage Difference between X and Y: |X - Y| / ((|X| + |Y|) / 2) * 100 or ((X + Y)/2)
    const diff = Math.abs(x - y);
    const avgMagnitude = (Math.abs(x) + Math.abs(y)) / 2;
    if (avgMagnitude === 0) {
      return {
        result: 0,
        summary: "Difference between 0 and 0 is 0%",
        steps: "|0 - 0| / 0 = 0%",
        isValid: true,
      };
    }
    res = (diff / avgMagnitude) * 100;
    const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    summary = `Percentage difference between ${x} and ${y} is ${cleanRes}%`;
    steps = `|${x} - ${y}| ÷ ((${x} + ${y}) / 2) × 100 = ${diff} ÷ ${avgMagnitude} × 100 = ${cleanRes}%`;
    return { result: cleanRes, summary, steps, isValid: true };
  }

  if (type === "pct_increase") {
    // X increased by Y% -> X * (1 + Y / 100)
    res = x * (1 + y / 100);
    const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    summary = `${x} increased by ${y}% is ${cleanRes}`;
    steps = `${x} × (1 + ${y} / 100) = ${x} × ${(1 + y / 100)} = ${cleanRes}`;
    return { result: cleanRes, summary, steps, isValid: true };
  }

  if (type === "pct_decrease") {
    // X decreased by Y% -> X * (1 - Y / 100)
    res = x * (1 - y / 100);
    const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
    summary = `${x} decreased by ${y}% is ${cleanRes}`;
    steps = `${x} × (1 - ${y} / 100) = ${x} × ${(1 - y / 100)} = ${cleanRes}`;
    return { result: cleanRes, summary, steps, isValid: true };
  }

  // Fallback: pct_change (Change from X to Y: ((Y - X) / X) * 100)
  if (x === 0) {
    return {
      result: NaN,
      summary: "Undefined: Starting value cannot be zero for percentage change.",
      steps: `(${y} - 0) ÷ 0 × 100 = Undefined (division by zero)`,
      isValid: false,
    };
  }
  res = ((y - x) / Math.abs(x)) * 100;
  const cleanRes = Number.isInteger(res) ? res : parseFloat(res.toFixed(8));
  summary = `Change from ${x} to ${y} is ${cleanRes}%`;
  steps = `(${y} - ${x}) ÷ |${x}| × 100 = ${y - x} ÷ ${Math.abs(x)} × 100 = ${cleanRes}%`;
  return { result: cleanRes, summary, steps, isValid: true };
}
