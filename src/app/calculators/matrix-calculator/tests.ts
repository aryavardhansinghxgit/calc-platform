import { calculateMatrixCalculator } from "./calculator";
import {
  multiplyMatrices,
  determinantMatrix,
  inverseMatrix,
  rrefMatrix,
  solveLinearSystem,
  computeEigenvalues2x2or3x3
} from "./matrix-logic";

export function runMatrixCalculatorTests() {
  // Test 1: 2x2 Determinant det([1 2; 3 4]) = -2
  const res1 = calculateMatrixCalculator({ a11: 1, a12: 2, a21: 3, a22: 4 });
  if (res1.detA !== -2) {
    throw new Error(`Expected det([1 2; 3 4]) = -2, got ${res1.detA}`);
  }

  // Test 2: Matrix Multiplication [1 2; 3 4] x [5 6; 7 8] = [19 22; 43 50]
  const mult = multiplyMatrices(
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
  );
  if (mult[0][0] !== 19 || mult[0][1] !== 22 || mult[1][0] !== 43 || mult[1][1] !== 50) {
    throw new Error(`Matrix multiplication failed: got ${JSON.stringify(mult)}`);
  }

  // Test 3: Matrix Inverse [2 4; 3 7] -> det 2, inv [3.5 -2; -1.5 1]
  const inv = inverseMatrix([[2, 4], [3, 7]]);
  if (inv[0][0] !== 3.5 || inv[0][1] !== -2 || inv[1][0] !== -1.5 || inv[1][1] !== 1) {
    throw new Error(`Matrix inverse failed: got ${JSON.stringify(inv)}`);
  }

  // Test 4: RREF of [[1, 2, 3], [4, 5, 6]]
  const { rref, rank } = rrefMatrix([[1, 2, 3], [4, 5, 6]]);
  if (rank !== 2 || rref[0][0] !== 1 || rref[1][1] !== 1) {
    throw new Error(`RREF failed: rank ${rank}, rref ${JSON.stringify(rref)}`);
  }

  // Test 5: Linear System Solver Ax = b ([2 1; 1 3], b=[5, 10] -> x=[1, 3])
  const sol = solveLinearSystem([[2, 1], [1, 3]], [5, 10]);
  if (!sol.hasSolution || !sol.isUnique || sol.solutionVector?.[0] !== 1 || sol.solutionVector?.[1] !== 3) {
    throw new Error(`Ax = b solver failed: got ${sol.solutionString}`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateMatrixCalculator({ a11: 0, a12: 0, a21: 0, a22: 0 });
  if (!resZero || typeof resZero.detA !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
