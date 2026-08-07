import { WindChillCalculatorOutputs } from "./types";

export function calculateWindChillCalculator(inputs: Record<string, any>): WindChillCalculatorOutputs {
  const t = Number(inputs.tempF) || 30;
  const v = Math.max(3, Number(inputs.windMph) || 15);
  const wcF = 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);
  const wcC = (wcF - 32) * (5 / 9);
  return { windChillF: parseFloat(wcF.toFixed(1)), windChillC: parseFloat(wcC.toFixed(1)) };
}
