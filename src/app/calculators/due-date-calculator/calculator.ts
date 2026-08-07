import { DueDateCalculatorOutputs } from "./types";

export function calculateDueDateCalculator(inputs: Record<string, any>): DueDateCalculatorOutputs {
  const lmpStr = inputs.lmpDate || "2026-01-01";
  const cycle = Number(inputs.cycleLength) || 28;
  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return { dueDate: "Invalid Date", daysRemaining: 0 };
  const due = new Date(lmp.getTime() + (280 + (cycle - 28)) * 86400000);
  const now = new Date();
  const remaining = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / 86400000));
  return { dueDate: due.toISOString().split("T")[0], daysRemaining: remaining };
}
