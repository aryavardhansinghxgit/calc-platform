import { calculateTimeMath } from "@/lib/calculator-engine/formulas/time-calculator";
import { TimeCalculatorOutputs } from "./types";

export function calculateTimeCalculator(inputs: Record<string, any>): TimeCalculatorOutputs {
  const h1 = Number(inputs.h1) || 0;
  const m1 = Number(inputs.m1) || 0;
  const s1 = Number(inputs.s1) || 0;
  const d1 = Number(inputs.d1) || 0;

  const h2 = Number(inputs.h2) || 0;
  const m2 = Number(inputs.m2) || 0;
  const s2 = Number(inputs.s2) || 0;
  const d2 = Number(inputs.d2) || 0;

  const op = inputs.operation === "-" ? "-" : "+";

  const result = calculateTimeMath(
    { days: d1, hours: h1, minutes: m1, seconds: s1 },
    op,
    { days: d2, hours: h2, minutes: m2, seconds: s2 }
  );

  return {
    resultTime: result.formattedString,
    totalHours: result.decimalHours,
  };
}
