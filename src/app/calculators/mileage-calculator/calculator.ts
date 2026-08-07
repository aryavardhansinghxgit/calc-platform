import { MileageCalculatorOutputs } from "./types";

export function calculateMileageCalculator(inputs: Record<string, any>): MileageCalculatorOutputs {
  const d = Math.max(0, Number(inputs.distanceMiles) || 120);
  const rate = Math.max(0, Number(inputs.irsRate) || 0.67);
  const reimb = d * rate;
  return { reimbursement: reimb, distanceKm: parseFloat((d * 1.60934).toFixed(1)) };
}
