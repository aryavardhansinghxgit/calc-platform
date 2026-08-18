import { calculateDayOfWeek } from "@/lib/calculator-engine/formulas/day-of-week";
import { DayoftheWeekCalculatorOutputs } from "./types";

export function calculateDayoftheWeekCalculator(inputs: Record<string, any>): DayoftheWeekCalculatorOutputs {
  const d = new Date(inputs.targetDate || "1969-07-20");
  if (isNaN(d.getTime())) {
    return { dayOfWeek: "Invalid Date", isLeapYear: "N/A" };
  }

  const result = calculateDayOfWeek({
    year: d.getUTCFullYear(),
    month: d.getUTCMonth(),
    day: d.getUTCDate(),
  });

  return {
    dayOfWeek: result.dayName,
    isLeapYear: result.isLeapYear ? "Yes" : "No",
  };
}
