import { VolumeCalculatorOutputs } from "./types";

export function calculateVolumeCalculator(inputs: Record<string, any>): VolumeCalculatorOutputs {
  const shape = inputs.shape || "cylinder";
  const r = Math.max(0, Number(inputs.dim1) || 5);
  const h = Math.max(0, Number(inputs.dim2) || 10);
  const d = Math.max(0, Number(inputs.dim3) || 4);
  let vol = 0, form = "";
  if (shape === "cylinder") { vol = Math.PI * r * r * h; form = "V = π × r² × h"; }
  else if (shape === "sphere") { vol = (4 / 3) * Math.PI * Math.pow(r, 3); form = "V = (4/3) × π × r³"; }
  else if (shape === "cone") { vol = (1 / 3) * Math.PI * r * r * h; form = "V = (1/3) × π × r² × h"; }
  else { vol = r * h * d; form = "V = l × w × h"; }
  return { volume: parseFloat(vol.toFixed(2)), formula: form };
}
