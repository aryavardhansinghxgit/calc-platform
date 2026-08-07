import { SurfaceAreaCalculatorOutputs } from "./types";

export function calculateSurfaceAreaCalculator(inputs: Record<string, any>): SurfaceAreaCalculatorOutputs {
  const shape = inputs.shape || "cylinder";
  const r = Math.max(0, Number(inputs.dim1) || 4);
  const h = Math.max(0, Number(inputs.dim2) || 10);
  let sa = 0, form = "";
  if (shape === "cylinder") { sa = 2 * Math.PI * r * (r + h); form = "SA = 2πr(r + h)"; }
  else if (shape === "sphere") { sa = 4 * Math.PI * r * r; form = "SA = 4πr²"; }
  else { sa = 6 * r * r; form = "SA = 6s²"; }
  return { surfaceArea: parseFloat(sa.toFixed(2)), formula: form };
}
