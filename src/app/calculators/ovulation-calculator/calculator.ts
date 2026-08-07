import { OvulationCalculatorOutputs } from "./types";

export function calculateOvulationCalculator(inputs: Record<string, any>): OvulationCalculatorOutputs {
  const lmp = new Date(inputs.lastPeriod || "2026-08-01");
  const cycle = Number(inputs.cycleLength) || 28;
  if (isNaN(lmp.getTime())) return { ovulationDate: "N/A", fertileStart: "N/A", fertileEnd: "N/A" };
  const ov = new Date(lmp.getTime() + (cycle - 14) * 86400000);
  const fStart = new Date(ov.getTime() - 5 * 86400000);
  const fEnd = new Date(ov.getTime() + 1 * 86400000);
  return {
    ovulationDate: ov.toISOString().split("T")[0],
    fertileStart: fStart.toISOString().split("T")[0],
    fertileEnd: fEnd.toISOString().split("T")[0]
  };
}
