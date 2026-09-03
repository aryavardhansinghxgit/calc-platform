import { QuadraticFormulaCalculatorOutputs } from "./types";

export function calculateQuadraticFormulaCalculator(inputs: Record<string, any>): QuadraticFormulaCalculatorOutputs {
  const parseVal = (v: any, fallback: number) => {
    if (v === undefined || v === null || v === "") return fallback;
    const num = Number(v);
    return isNaN(num) ? fallback : num;
  };

  const a = parseVal(inputs.coeffA ?? inputs.a, 1);
  const b = parseVal(inputs.coeffB ?? inputs.b, -5);
  const c = parseVal(inputs.coeffC ?? inputs.c, 6);

  if (a === 0) {
    if (b === 0) {
      if (c === 0) {
        return {
          root1: "Infinite solutions (0 = 0)",
          root2: "Identity",
          discriminant: 0,
          vertex: "N/A"
        };
      }
      return {
        root1: "No solution (Contradiction)",
        root2: "N/A",
        discriminant: 0,
        vertex: "N/A"
      };
    }
    const linRoot = (-c / b).toFixed(4);
    return {
      root1: `Linear: x = ${linRoot}`,
      root2: "N/A (a=0)",
      discriminant: 0,
      vertex: "N/A"
    };
  }

  const disc = b * b - 4 * a * c;
  let r1 = "";
  let r2 = "";

  if (disc > 0) {
    const sqrtDisc = Math.sqrt(disc);
    const x1 = (-b + sqrtDisc) / (2 * a);
    const x2 = (-b - sqrtDisc) / (2 * a);
    r1 = x1.toFixed(4);
    r2 = x2.toFixed(4);
  } else if (disc === 0) {
    const x = (-b / (2 * a)).toFixed(4);
    r1 = x;
    r2 = x;
  } else {
    const realPart = (-b / (2 * a)).toFixed(4);
    const imagPart = (Math.sqrt(-disc) / (2 * Math.abs(a))).toFixed(4);
    r1 = `${realPart} + ${imagPart}i`;
    r2 = `${realPart} - ${imagPart}i`;
  }

  const vertexH = (-b / (2 * a)).toFixed(4);
  const vertexK = (c - (b * b) / (4 * a)).toFixed(4);

  return {
    root1: r1,
    root2: r2,
    discriminant: disc,
    vertex: `(${vertexH}, ${vertexK})`
  };
}

export default calculateQuadraticFormulaCalculator;
