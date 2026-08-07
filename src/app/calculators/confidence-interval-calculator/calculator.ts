import { ConfidenceIntervalCalculatorOutputs } from "./types";

export function calculateConfidenceIntervalCalculator(inputs: Record<string, any>): ConfidenceIntervalCalculatorOutputs {
  const mean = Number(inputs.mean) || 50;
  const s = Math.max(0.001, Number(inputs.sd) || 8);
  const n = Math.max(2, Number(inputs.sampleSize) || 100);
  const cl = inputs.confidenceLevel || "95";
  let z = 1.96;
  if (cl === "90") z = 1.645;
  else if (cl === "99") z = 2.576;
  const me = z * (s / Math.sqrt(n));
  const lower = (mean - me).toFixed(2);
  const upper = (mean + me).toFixed(2);
  return { marginError: parseFloat(me.toFixed(3)), intervalRange: `[${lower}, ${upper}]` };
}
