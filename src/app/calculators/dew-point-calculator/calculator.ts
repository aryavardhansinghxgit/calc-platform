import { DewPointCalculatorOutputs } from "./types";

export function calculateDewPointCalculator(inputs: Record<string, any>): DewPointCalculatorOutputs {
  const t = Number(inputs.tempC) || 25;
  const rh = Math.max(1, Number(inputs.humidityPct) || 60);
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * t) / (b + t)) + Math.log(rh / 100);
  const dp = (b * alpha) / (a - alpha);
  let comfort = "Comfortable";
  if (dp >= 24) comfort = "Severely Oppressive";
  else if (dp >= 20) comfort = "Muggy & Uncomfortable";
  else if (dp >= 16) comfort = "Humid";
  return { dewPointC: parseFloat(dp.toFixed(1)), comfortLevel: comfort };
}
