import { TriangleCalculatorOutputs } from "./types";
import { solveUniversalTriangle } from "./triangle-logic";

export function calculateTriangleCalculator(inputs: Record<string, any>): TriangleCalculatorOutputs {
  const rawA = inputs.sideA !== undefined && inputs.sideA !== null && inputs.sideA !== "" ? Number(inputs.sideA) : undefined;
  const rawB = inputs.sideB !== undefined && inputs.sideB !== null && inputs.sideB !== "" ? Number(inputs.sideB) : undefined;
  const rawC = inputs.sideC !== undefined && inputs.sideC !== null && inputs.sideC !== "" ? Number(inputs.sideC) : undefined;

  if (
    rawA === undefined || rawB === undefined || rawC === undefined ||
    isNaN(rawA) || isNaN(rawB) || isNaN(rawC) ||
    rawA <= 0 || rawB <= 0 || rawC <= 0
  ) {
    return { area: 0, perimeter: 0, angleA: 0 };
  }

  const res = solveUniversalTriangle(rawA, rawB, rawC, undefined, undefined, undefined, 4);
  if (!res.success || res.solutions.length === 0) {
    return { area: 0, perimeter: rawA + rawB + rawC, angleA: 0 };
  }

  const s = res.solutions[0];
  return {
    area: s.area,
    perimeter: s.perimeter,
    angleA: s.A_deg
  };
}
