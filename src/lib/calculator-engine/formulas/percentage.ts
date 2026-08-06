/**
 * Pure Mathematical Logic for Percentage Calculation.
 */

export interface PercentageFormulaInput {
  value1: number;
  value2: number;
  mode?: "percentage_of" | "percentage_change" | "difference";
}

export interface PercentageFormulaResult {
  result: number;
  percentageChange?: number;
  difference?: number;
}

export function calculatePercentageFormula({
  value1,
  value2,
  mode = "percentage_of",
}: PercentageFormulaInput): PercentageFormulaResult {
  if (mode === "percentage_change") {
    if (value1 === 0) return { result: 0, percentageChange: 0 };
    const change = ((value2 - value1) / value1) * 100;
    return {
      result: change,
      percentageChange: change,
      difference: value2 - value1,
    };
  }

  if (mode === "difference") {
    const avg = (value1 + value2) / 2;
    if (avg === 0) return { result: 0, difference: 0 };
    const diffPercent = (Math.abs(value1 - value2) / avg) * 100;
    return {
      result: diffPercent,
      difference: Math.abs(value1 - value2),
    };
  }

  const percentageOf = (value1 / 100) * value2;
  return {
    result: percentageOf,
  };
}
