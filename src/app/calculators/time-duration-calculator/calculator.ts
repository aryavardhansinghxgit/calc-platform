import {
  calculateSameDayDuration,
  calculateCrossDateDuration,
} from "@/lib/calculator-engine/formulas/time-duration";
import { TimeDurationCalculatorOutputs } from "./types";

export function calculateTimeDurationCalculator(inputs: Record<string, any>): TimeDurationCalculatorOutputs {
  const parseTime = (str: string) => {
    const parts = String(str || "08:30").split(":").map(Number);
    return { hour: parts[0] || 0, minute: parts[1] || 0, second: parts[2] || 0 };
  };

  const start = parseTime(inputs.startTime);
  const end = parseTime(inputs.endTime);

  const startD = inputs.startDate ? new Date(inputs.startDate) : new Date();
  const endD = inputs.endDate ? new Date(inputs.endDate) : new Date();

  // If same date
  if (inputs.startDate && inputs.endDate && inputs.startDate === inputs.endDate) {
    const result = calculateSameDayDuration({
      startHour: start.hour,
      startMinute: start.minute,
      startSecond: start.second,
      endHour: end.hour,
      endMinute: end.minute,
      endSecond: end.second,
      is24Hour: true,
    });
    return {
      formattedDuration: result.formattedHms,
      totalHours: result.totalDecimalHours,
    };
  }

  // Cross date
  const result = calculateCrossDateDuration({
    startYear: startD.getFullYear(),
    startMonth: startD.getMonth(),
    startDay: startD.getDate(),
    startHour: start.hour,
    startMinute: start.minute,
    startSecond: start.second,
    endYear: endD.getFullYear(),
    endMonth: endD.getMonth(),
    endDay: endD.getDate(),
    endHour: end.hour,
    endMinute: end.minute,
    endSecond: end.second,
    is24Hour: true,
  });

  return {
    formattedDuration: result.formattedFull,
    totalHours: result.totalDecimalHours,
  };
}
