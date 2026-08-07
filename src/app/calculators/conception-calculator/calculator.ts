import { ConceptionCalculatorOutputs } from "./types";

export function calculateConceptionCalculator(inputs: Record<string, any>): ConceptionCalculatorOutputs {
  const due = new Date(inputs.dueDate || "2026-10-08");
  if (isNaN(due.getTime())) return { conceptionDate: "N/A", lmpDate: "N/A" };
  const conc = new Date(due.getTime() - 266 * 86400000);
  const lmp = new Date(due.getTime() - 280 * 86400000);
  return {
    conceptionDate: conc.toISOString().split("T")[0],
    lmpDate: lmp.toISOString().split("T")[0]
  };
}
