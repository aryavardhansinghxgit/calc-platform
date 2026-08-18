import { calculateIntradayHours } from "@/lib/calculator-engine/formulas/hours-calculator";
import { HoursCalculatorOutputs } from "./types";

export function calculateHoursCalculator(inputs: Record<string, any>): HoursCalculatorOutputs {
  const parseTime = (str: string) => {
    const parts = String(str || "08:30").split(":").map(Number);
    return { hour: parts[0] || 0, minute: parts[1] || 0 };
  };

  const start = parseTime(inputs.startTime);
  const end = parseTime(inputs.endTime);
  const breakMins = Math.max(0, Number(inputs.breakMins) || 0);

  const result = calculateIntradayHours({
    startHour: start.hour,
    startMinute: start.minute,
    endHour: end.hour,
    endMinute: end.minute,
    is24Hour: true,
    breakMinutes: breakMins,
  });

  return {
    totalHours: result.totalDecimalHours,
    formattedDuration: result.formattedHoursMinutes,
  };
}
