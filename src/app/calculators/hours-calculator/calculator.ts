import { HoursCalculatorOutputs } from "./types";

export function calculateHoursCalculator(inputs: Record<string, any>): HoursCalculatorOutputs {
  const parseTime = (str: string) => {
    const parts = String(str || "09:00").split(":").map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  };
  const start = parseTime(inputs.startTime);
  let end = parseTime(inputs.endTime);
  if (end < start) end += 24 * 60; // Overnight
  const brk = Math.max(0, Number(inputs.breakMins) || 0);
  const netMins = Math.max(0, end - start - brk);
  const hrs = parseFloat((netMins / 60).toFixed(2));
  const h = Math.floor(netMins / 60);
  const m = netMins % 60;
  return { totalHours: hrs, formattedDuration: `${h} hrs ${m} mins` };
}
