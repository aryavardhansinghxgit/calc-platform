import { PregnancyCalculatorOutputs } from "./types";

export function calculatePregnancyCalculator(inputs: Record<string, any>): PregnancyCalculatorOutputs {
  const lmpStr = inputs.lmpDate || "2026-01-01";
  const cycle = Number(inputs.cycleLength) || 28;
  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return { dueDate: "Invalid Date", gestationalAge: "N/A", trimester: "N/A", conceptionDate: "N/A" };
  const due = new Date(lmp.getTime() + (280 + (cycle - 28)) * 86400000);
  const conception = new Date(due.getTime() - 266 * 86400000);
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now.getTime() - lmp.getTime()) / 86400000));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  let trimester = "1st Trimester";
  if (weeks >= 28) trimester = "3rd Trimester";
  else if (weeks >= 13) trimester = "2nd Trimester";
  return {
    dueDate: due.toISOString().split("T")[0],
    gestationalAge: `${weeks} weeks, ${days} days`,
    trimester,
    conceptionDate: conception.toISOString().split("T")[0]
  };
}
