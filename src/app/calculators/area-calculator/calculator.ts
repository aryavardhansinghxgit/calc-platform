import { AreaCalculatorOutputs } from "./types";

export function calculateAreaCalculator(inputs: Record<string, any>): AreaCalculatorOutputs {
  const shape = inputs.shape || "rectangle";
  const d1 = Math.max(0, Number(inputs.dim1) || 10);
  const d2 = Math.max(0, Number(inputs.dim2) || 5);
  const d3 = Math.max(0, Number(inputs.dim3) || 4);
  let area = 0, form = "";
  if (shape === "rectangle") { area = d1 * d2; form = "A = w × h"; }
  else if (shape === "circle") { area = Math.PI * d1 * d1; form = "A = π × r²"; }
  else { area = ((d1 + d2) / 2) * d3; form = "A = ((a + b) / 2) × h"; }
  return { area: parseFloat(area.toFixed(2)), formula: form };
}
