import { calculateDaysBetween, isValidCalendarDate } from "@/lib/calculator-engine/formulas/day-counter";
import { DayCounterOutputs } from "./types";

function parseDateParts(str: string): { year: number; month: number; day: number } | null {
  if (!str || typeof str !== "string") return null;
  const parts = str.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return { year: parts[0], month: parts[1] - 1, day: parts[2] };
}

export function calculateDayCounter(inputs: Record<string, any>): DayCounterOutputs {
  const p1 = parseDateParts(inputs.startDate || "2026-01-01");
  const p2 = parseDateParts(inputs.endDate || "2026-12-31");

  if (!p1 || !p2) {
    return { totalDays: 0, businessDays: 0, totalWeeks: 0 };
  }

  const v1 = isValidCalendarDate(p1.year, p1.month, p1.day);
  const v2 = isValidCalendarDate(p2.year, p2.month, p2.day);

  if (!v1.isValid || !v2.isValid) {
    return { totalDays: 0, businessDays: 0, totalWeeks: 0 };
  }

  const result = calculateDaysBetween({
    startYear: p1.year,
    startMonth: p1.month,
    startDay: p1.day,
    endYear: p2.year,
    endMonth: p2.month,
    endDay: p2.day,
    includeEndDay: false,
    excludeHolidays: true,
  });

  if (!result.isValid) {
    return { totalDays: 0, businessDays: 0, totalWeeks: 0 };
  }

  return {
    totalDays: result.totalCalendarDays,
    businessDays: result.businessDays,
    totalWeeks: parseFloat((result.totalCalendarDays / 7).toFixed(1)),
  };
}
