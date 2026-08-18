import { calculateDaysBetween } from "@/lib/calculator-engine/formulas/day-counter";
import { DayCounterOutputs } from "./types";

export function calculateDayCounter(inputs: Record<string, any>): DayCounterOutputs {
  const d1 = new Date(inputs.startDate || "2026-01-01");
  const d2 = new Date(inputs.endDate || "2026-12-31");
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return { totalDays: 0, businessDays: 0, totalWeeks: 0 };
  }

  const result = calculateDaysBetween({
    startYear: d1.getUTCFullYear(),
    startMonth: d1.getUTCMonth(),
    startDay: d1.getUTCDate(),
    endYear: d2.getUTCFullYear(),
    endMonth: d2.getUTCMonth(),
    endDay: d2.getUTCDate(),
    includeEndDay: false,
    excludeHolidays: true,
  });

  return {
    totalDays: result.totalCalendarDays,
    businessDays: result.businessDays,
    totalWeeks: parseFloat((result.totalCalendarDays / 7).toFixed(1)),
  };
}
