import { HeatIndexCalculatorOutputs } from "./types";

export function calculateHeatIndexCalculator(inputs: Record<string, any>): HeatIndexCalculatorOutputs {
  const t = Math.max(80, Number(inputs.tempF) || 90);
  const r = Math.max(10, Number(inputs.humidityPct) || 65);
  const hi = -42.379 + 2.04901523 * t + 10.14333127 * r - 0.22475541 * t * r - 0.00683783 * t * t - 0.05481717 * r * r + 0.00122874 * t * t * r + 0.00085282 * t * r * r - 0.00000199 * t * t * r * r;
  let danger = "Caution";
  if (hi >= 125) danger = "Extreme Danger (Heat stroke imminent)";
  else if (hi >= 103) danger = "Danger (Heat cramps/exhaustion likely)";
  else if (hi >= 90) danger = "Extreme Caution";
  return { heatIndexF: parseFloat(hi.toFixed(1)), dangerLevel: danger };
}
