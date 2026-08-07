import { GolfHandicapCalculatorOutputs } from "./types";

export function calculateGolfHandicapCalculator(inputs: Record<string, any>): GolfHandicapCalculatorOutputs {
  const score = Math.max(30, Number(inputs.adjustedScore) || 85);
  const rating = Math.max(30, Number(inputs.courseRating) || 72.1);
  const slope = Math.max(55, Number(inputs.slopeRating) || 125);
  const diff = ((score - rating) * 113) / slope;
  return { differential: parseFloat(diff.toFixed(1)), handicapIndex: parseFloat((diff * 0.96).toFixed(1)) };
}
