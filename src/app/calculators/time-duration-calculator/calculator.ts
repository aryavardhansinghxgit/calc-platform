import { TimeDurationCalculatorOutputs } from "./types";

export function calculateTimeDurationCalculator(inputs: Record<string, any>): TimeDurationCalculatorOutputs {
  const dt1 = new Date(`${inputs.startDate || "2026-08-01"}T${inputs.startTime || "08:00"}:00`);
  const dt2 = new Date(`${inputs.endDate || "2026-08-07"}T${inputs.endTime || "17:30"}:00`);
  if (isNaN(dt1.getTime()) || isNaN(dt2.getTime())) return { formattedDuration: "Invalid Input", totalHours: 0 };
  const diffMs = Math.max(0, dt2.getTime() - dt1.getTime());
  const totalMins = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMins / (24 * 60));
  const hrs = Math.floor((totalMins % (24 * 60)) / 60);
  const mins = totalMins % 60;
  return {
    formattedDuration: `${days} days, ${hrs} hours, ${mins} minutes`,
    totalHours: parseFloat((diffMs / 3600000).toFixed(2))
  };
}
