import { MatrixCalculatorOutputs } from "./types";
import { determinantMatrix, traceMatrix, multiplyMatrices } from "./matrix-logic";

export function calculateMatrixCalculator(inputs: Record<string, any>): MatrixCalculatorOutputs {
  const a11 = Number(inputs.a11) || 1;
  const a12 = Number(inputs.a12) || 2;
  const a21 = Number(inputs.a21) || 3;
  const a22 = Number(inputs.a22) || 4;

  const A = [
    [a11, a12],
    [a21, a22]
  ];

  const det = determinantMatrix(A);
  const trace = traceMatrix(A);
  const sq = multiplyMatrices(A, A);

  return {
    detA: det,
    traceA: trace,
    matrixSquare: `[[${sq[0][0]}, ${sq[0][1]}], [${sq[1][0]}, ${sq[1][1]}]]`
  };
}
