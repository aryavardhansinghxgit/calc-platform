import { QuadraticFormulaCalculatorOutputs } from "./types";

export function calculateQuadraticFormulaCalculator(inputs: Record<string, any>): QuadraticFormulaCalculatorOutputs {
  const a = Number(inputs.coeffA) || 1;
  const b = Number(inputs.coeffB) || -5;
  const c = Number(inputs.coeffC) || 6;
  if (a === 0) return { root1: "Not quadratic (a=0)", root2: "N/A", discriminant: 0, vertex: "N/A" };
  const disc = b * b - 4 * a * c;
  let r1 = "", r2 = "";
  if (disc >= 0) {
    const x1 = (-b + Math.sqrt(disc)) / (2 * a);
    const x2 = (-b - Math.sqrt(disc)) / (2 * a);
    r1 = x1.toFixed(3);
    r2 = x2.toFixed(3);
  } else {
    const realPart = (-b / (2 * a)).toFixed(3);
    const imagPart = (Math.sqrt(-disc) / (2 * a)).toFixed(3);
    r1 = `${realPart} + ${imagPart}i`;
    r2 = `${realPart} - ${imagPart}i`;
  }
  const vertexH = (-b / (2 * a)).toFixed(2);
  const vertexK = (c - (b * b) / (4 * a)).toFixed(2);
  return { root1: r1, root2: r2, discriminant: disc, vertex: `(${vertexH}, ${vertexK})` };
}
