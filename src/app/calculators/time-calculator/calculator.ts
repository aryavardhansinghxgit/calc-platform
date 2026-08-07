import { TimeCalculatorOutputs } from "./types";

export function calculateTimeCalculator(inputs: Record<string, any>): TimeCalculatorOutputs {
  const sec1 = (Number(inputs.h1) || 0) * 3600 + (Number(inputs.m1) || 0) * 60;
  const sec2 = (Number(inputs.h2) || 0) * 3600 + (Number(inputs.m2) || 0) * 60;
  const totalSec = inputs.operation === "-" ? Math.max(0, sec1 - sec2) : sec1 + sec2;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const dec = parseFloat((totalSec / 3600).toFixed(2));
  return { resultTime: `${h} hours, ${m} minutes`, totalHours: dec };
}
