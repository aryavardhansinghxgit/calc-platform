import { PregnancyConceptionCalculatorOutputs } from "./types";

export function calculatePregnancyConceptionCalculator(inputs: Record<string, any>): PregnancyConceptionCalculatorOutputs {
  const dueStr = inputs.dueDate || "2026-10-08";
  const due = new Date(dueStr);
  if (isNaN(due.getTime())) return { conceptionDate: "Invalid Date", fertileWindow: "N/A" };
  const conc = new Date(due.getTime() - 266 * 86400000);
  const windowStart = new Date(conc.getTime() - 3 * 86400000);
  const windowEnd = new Date(conc.getTime() + 2 * 86400000);
  return {
    conceptionDate: conc.toISOString().split("T")[0],
    fertileWindow: `${windowStart.toISOString().split("T")[0]} to ${windowEnd.toISOString().split("T")[0]}`
  };
}
