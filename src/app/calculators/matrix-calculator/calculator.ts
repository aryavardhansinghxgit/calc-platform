import { MatrixCalculatorOutputs } from "./types";

export function calculateMatrixCalculator(inputs: Record<string, any>): MatrixCalculatorOutputs {
  const a11 = Number(inputs.a11) || 1;
  const a12 = Number(inputs.a12) || 2;
  const a21 = Number(inputs.a21) || 3;
  const a22 = Number(inputs.a22) || 4;
  const det = a11 * a22 - a12 * a21;
  const trace = a11 + a22;
  const sq11 = a11 * a11 + a12 * a21;
  const sq12 = a11 * a12 + a12 * a22;
  const sq21 = a21 * a11 + a22 * a21;
  const sq22 = a21 * a12 + a22 * a22;
  return {
    detA: det,
    traceA: trace,
    matrixSquare: `[[${sq11}, ${sq12}], [${sq21}, ${sq22}]]`
  };
}
