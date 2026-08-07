import { TargetHeartRateCalculatorOutputs } from "./types";

export function calculateTargetHeartRateCalculator(inputs: Record<string, any>): TargetHeartRateCalculatorOutputs {
  const age = Math.max(1, Number(inputs.age) || 30);
  const rhr = Math.max(20, Number(inputs.restingHR) || 65);
  const maxHR = Math.round(208 - 0.7 * age);
  const hrr = Math.max(10, maxHR - rhr);
  const getZone = (minP: number, maxP: number) => `${Math.round(rhr + hrr * minP)} - ${Math.round(rhr + hrr * maxP)} bpm`;
  return {
    maxHR,
    moderateZone: getZone(0.5, 0.7),
    vigorousZone: getZone(0.7, 0.85),
    peakZone: getZone(0.85, 1.0)
  };
}
