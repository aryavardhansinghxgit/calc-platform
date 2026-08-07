import { PeriodCalculatorOutputs } from "./types";

export function calculatePeriodCalculator(inputs: Record<string, any>): PeriodCalculatorOutputs {
  const lmp = new Date(inputs.lastPeriod || "2026-08-01");
  const cycle = Number(inputs.cycleLength) || 28;
  if (isNaN(lmp.getTime())) return { nextPeriod: "N/A", followingPeriod: "N/A" };
  const p1 = new Date(lmp.getTime() + cycle * 86400000);
  const p2 = new Date(lmp.getTime() + cycle * 2 * 86400000);
  return {
    nextPeriod: p1.toISOString().split("T")[0],
    followingPeriod: p2.toISOString().split("T")[0]
  };
}
