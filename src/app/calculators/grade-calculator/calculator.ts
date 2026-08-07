import { GradeCalculatorOutputs } from "./types";

export function calculateGradeCalculator(inputs: Record<string, any>): GradeCalculatorOutputs {
  const cur = Number(inputs.currentGrade) || 85;
  const target = Number(inputs.targetGrade) || 90;
  const w = Math.max(1, Number(inputs.finalWeight) || 20) / 100;
  const req = (target - cur * (1 - w)) / w;
  let verdict = "Achievable";
  if (req > 100) verdict = "Needs extra credit (>100%)";
  else if (req <= 0) verdict = "Target guaranteed!";
  return { requiredFinalScore: parseFloat(req.toFixed(1)), verdict };
}
