import { SpeedCalculatorOutputs } from "./types";

export function calculateSpeedCalculator(inputs: Record<string, any>): SpeedCalculatorOutputs {
  const d = Math.max(0, Number(inputs.distanceKm) || 150);
  const t = Math.max(0.001, Number(inputs.timeHours) || 2);
  const kmh = d / t;
  const mph = kmh / 1.60934;
  const ms = kmh / 3.6;
  return { speedKmh: parseFloat(kmh.toFixed(2)), speedMph: parseFloat(mph.toFixed(2)), speedMs: parseFloat(ms.toFixed(2)) };
}
