import { GPACalculatorOutputs } from "./types";

export function calculateGPACalculator(inputs: Record<string, any>): GPACalculatorOutputs {
  const g1 = Number(inputs.g1) || 4;
  const c1 = Number(inputs.c1) || 3;
  const g2 = Number(inputs.g2) || 3;
  const c2 = Number(inputs.c2) || 4;
  const totalPts = g1 * c1 + g2 * c2;
  const totalCreds = c1 + c2;
  const gpa = totalCreds > 0 ? totalPts / totalCreds : 0;
  return { gpa: parseFloat(gpa.toFixed(2)), totalCredits: totalCreds };
}
