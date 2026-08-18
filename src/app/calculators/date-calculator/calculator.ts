import { calculateDateOffset } from "@/lib/calculator-engine/formulas/date-calculator";
import { DateCalculatorOutputs } from "./types";

export function calculateDateCalculator(inputs: Record<string, any>): DateCalculatorOutputs {
  try {
    const startDate = typeof inputs.startDate === "string" ? inputs.startDate : "2026-08-18";
    const operation = inputs.operation === "sub" ? "subtract" : "add";
    const years = Math.max(0, Number(inputs.years) || 0);
    const months = Math.max(0, Number(inputs.months) || 0);
    const weeks = Math.max(0, Number(inputs.weeks) || 0);
    const days = Math.max(0, Number(inputs.days) || 0);

    const result = calculateDateOffset({
      startDate,
      operation,
      years,
      months,
      weeks,
      days,
    });

    return {
      resultDate: result.targetDateStr,
      dayOfWeek: result.targetDayOfWeek,
    };
  } catch (err) {
    return {
      resultDate: "Invalid Date",
      dayOfWeek: "N/A",
    };
  }
}
