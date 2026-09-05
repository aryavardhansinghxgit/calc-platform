/**
 * Core mathematical engine for Matrix Calculator & Linear Algebra Suite
 */

export type Matrix = number[][];

export interface LinearSystemResult {
  hasSolution: boolean;
  isUnique: boolean;
  solutionVector?: number[];
  solutionString: string;
}

export interface EigenvalueResult {
  eigenvalues: number[];
  characteristicPolynomial: string;
  isReal: boolean;
}

/**
 * Helper to create an m x n matrix filled with 0s
 */
export function createZeroMatrix(rows: number, cols: number): Matrix {
  const m = Math.max(1, Math.min(10, rows));
  const n = Math.max(1, Math.min(10, cols));
  return Array.from({ length: m }, () => Array(n).fill(0));
}

/**
 * Create Identity Matrix I_n
 */
export function createIdentityMatrix(n: number): Matrix {
  const dim = Math.max(1, Math.min(10, n));
  const mat = createZeroMatrix(dim, dim);
  for (let i = 0; i < dim; i++) {
    mat[i][i] = 1;
  }
  return mat;
}

/**
 * Create Random Integer Matrix (values from -10 to 10)
 */
export function createRandomMatrix(rows: number, cols: number): Matrix {
  const m = Math.max(1, Math.min(10, rows));
  const n = Math.max(1, Math.min(10, cols));
  return Array.from({ length: m }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 21) - 10)
  );
}

/**
 * Matrix Addition (A + B)
 */
export function addMatrices(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  if (B.length !== rows || B[0].length !== cols) {
    throw new Error("Dimension Mismatch: Matrices must have identical dimensions for addition.");
  }
  return A.map((row, i) => row.map((val, j) => val + B[i][j]));
}

/**
 * Matrix Subtraction (A - B)
 */
export function subtractMatrices(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  if (B.length !== rows || B[0].length !== cols) {
    throw new Error("Dimension Mismatch: Matrices must have identical dimensions for subtraction.");
  }
  return A.map((row, i) => row.map((val, j) => val - B[i][j]));
}

/**
 * Scalar Multiplication (k * A)
 */
export function scaleMatrix(A: Matrix, k: number): Matrix {
  return A.map((row) => row.map((val) => val * k));
}

/**
 * Matrix Multiplication (A x B)
 */
export function multiplyMatrices(A: Matrix, B: Matrix): Matrix {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;

  if (colsA !== rowsB) {
    throw new Error(`Dimension Mismatch: Columns of A (${colsA}) must equal Rows of B (${rowsB}).`);
  }

  const C = createZeroMatrix(rowsA, colsB);
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += A[i][k] * B[k][j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}

/**
 * Hadamard Element-wise Product (A o B)
 */
export function hadamardProduct(A: Matrix, B: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  if (B.length !== rows || B[0].length !== cols) {
    throw new Error("Dimension Mismatch for Hadamard Product.");
  }
  return A.map((row, i) => row.map((val, j) => val * B[i][j]));
}

/**
 * Kronecker Tensor Product (A ⊗ B)
 */
export function kroneckerProduct(A: Matrix, B: Matrix): Matrix {
  const rowsA = A.length;
  const colsA = A[0].length;
  const rowsB = B.length;
  const colsB = B[0].length;

  const C = createZeroMatrix(rowsA * rowsB, colsA * colsB);

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsA; j++) {
      for (let p = 0; p < rowsB; p++) {
        for (let q = 0; q < colsB; q++) {
          C[i * rowsB + p][j * colsB + q] = A[i][j] * B[p][q];
        }
      }
    }
  }
  return C;
}

/**
 * Matrix Transpose (A^T)
 */
export function transposeMatrix(A: Matrix): Matrix {
  const rows = A.length;
  const cols = A[0].length;
  const T = createZeroMatrix(cols, rows);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      T[j][i] = A[i][j];
    }
  }
  return T;
}

/**
 * Matrix Trace (sum of main diagonal elements)
 */
export function traceMatrix(A: Matrix): number {
  const rows = A.length;
  const cols = A[0].length;
  if (rows !== cols) return NaN;
  let sum = 0;
  for (let i = 0; i < rows; i++) {
    sum += A[i][i];
  }
  return sum;
}

/**
 * Determinant of Square Matrix det(A)
 */
export function determinantMatrix(A: Matrix): number {
  const n = A.length;
  if (n !== A[0].length) {
    throw new Error("Determinant is defined only for square matrices.");
  }

  if (n === 1) return A[0][0];
  if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];

  if (n === 3) {
    return (
      A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
      A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
      A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0])
    );
  }

  // Gaussian Elimination with Partial Pivoting for n >= 4 (O(n³) vs O(n!) Laplace)
  const mat = A.map((r) => [...r]);
  let sign = 1;
  let det = 1;

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    let maxVal = Math.abs(mat[i][i]);
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(mat[k][i]) > maxVal) {
        maxVal = Math.abs(mat[k][i]);
        maxRow = k;
      }
    }

    if (maxVal < 1e-12) return 0;

    if (maxRow !== i) {
      const tmp = mat[i];
      mat[i] = mat[maxRow];
      mat[maxRow] = tmp;
      sign = -sign;
    }

    const pivot = mat[i][i];
    det *= pivot;

    for (let k = i + 1; k < n; k++) {
      const factor = mat[k][i] / pivot;
      for (let j = i; j < n; j++) {
        mat[k][j] -= factor * mat[i][j];
      }
    }
  }

  const result = sign * det;
  const isAllInt = A.every((r) => r.every((v) => Number.isInteger(v)));
  if (isAllInt && Math.abs(result - Math.round(result)) < 1e-6) {
    return Math.round(result);
  }
  return parseFloat(result.toFixed(6));
}

/**
 * Reduced Row Echelon Form (RREF) using Gauss-Jordan Elimination
 */
export function rrefMatrix(A: Matrix): { rref: Matrix; rank: number } {
  const rows = A.length;
  const cols = A[0].length;
  // Deep clone
  const mat: Matrix = A.map((r) => [...r]);

  let lead = 0;
  let rank = 0;

  for (let r = 0; r < rows; r++) {
    if (cols <= lead) break;
    let i = r;

    while (Math.abs(mat[i][lead]) < 1e-10) {
      i++;
      if (rows === i) {
        i = r;
        lead++;
        if (cols === lead) break;
      }
    }

    if (cols === lead) break;

    // Swap rows
    const temp = mat[i];
    mat[i] = mat[r];
    mat[r] = temp;

    // Scale pivot row to 1
    const val = mat[r][lead];
    if (Math.abs(val) > 1e-10) {
      for (let j = 0; j < cols; j++) {
        mat[r][j] /= val;
      }
      rank++;
    }

    // Eliminate column elements above and below
    for (let k = 0; k < rows; k++) {
      if (k !== r) {
        const factor = mat[k][lead];
        for (let j = 0; j < cols; j++) {
          mat[k][j] -= factor * mat[r][j];
        }
      }
    }

    lead++;
  }

  // Clean tiny floating point inaccuracies (-0 -> 0)
  const cleaned = mat.map((row) =>
    row.map((val) => (Math.abs(val) < 1e-10 ? 0 : parseFloat(val.toFixed(6))))
  );

  return { rref: cleaned, rank };
}

/**
 * Matrix Rank
 */
export function rankMatrix(A: Matrix): number {
  return rrefMatrix(A).rank;
}

/**
 * Inverse Matrix A^(-1)
 */
export function inverseMatrix(A: Matrix): Matrix {
  const n = A.length;
  if (n !== A[0].length) {
    throw new Error("Inverse is defined only for square matrices.");
  }

  const det = determinantMatrix(A);
  if (Math.abs(det) < 1e-10) {
    throw new Error("Singular Matrix: Determinant is 0; Inverse does not exist.");
  }

  if (n === 2) {
    const invDet = 1 / det;
    return [
      [A[1][1] * invDet, -A[0][1] * invDet],
      [-A[1][0] * invDet, A[0][0] * invDet]
    ];
  }

  // Gauss-Jordan [A | I] -> [I | A^-1]
  const augmented: Matrix = A.map((row, i) => [
    ...row,
    ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  ]);

  const { rref } = rrefMatrix(augmented);
  const inv: Matrix = rref.map((row) => row.slice(n));

  return inv;
}

/**
 * Matrix Power A^k
 */
export function matrixPower(A: Matrix, k: number): Matrix {
  const n = A.length;
  if (n !== A[0].length) {
    throw new Error("Matrix Power is defined only for square matrices.");
  }

  if (k === 0) return createIdentityMatrix(n);
  if (k < 0) {
    const inv = inverseMatrix(A);
    return matrixPower(inv, Math.abs(k));
  }

  let result = createIdentityMatrix(n);
  let base = A;
  let p = k;

  while (p > 0) {
    if (p % 2 === 1) result = multiplyMatrices(result, base);
    base = multiplyMatrices(base, base);
    p = Math.floor(p / 2);
  }

  return result;
}

/**
 * Solve System of Linear Equations Ax = b
 */
export function solveLinearSystem(A: Matrix, b: number[]): LinearSystemResult {
  const rows = A.length;
  const cols = A[0].length;

  if (b.length !== rows) {
    throw new Error("Constants vector b length must match rows of A.");
  }

  const augmented: Matrix = A.map((row, i) => [...row, b[i]]);
  const { rref, rank } = rrefMatrix(augmented);

  // Check rank condition
  const rankA = rankMatrix(A);

  if (rankA < rank) {
    return {
      hasSolution: false,
      isUnique: false,
      solutionString: "No Solution (Inconsistent System)"
    };
  }

  if (rankA === cols) {
    const solutionVector = rref.slice(0, cols).map((row) => row[cols]);
    const solStr = solutionVector.map((val, i) => `x${i + 1} = ${val}`).join(", ");
    return {
      hasSolution: true,
      isUnique: true,
      solutionVector,
      solutionString: `Unique Solution: ${solStr}`
    };
  }

  return {
    hasSolution: true,
    isUnique: false,
    solutionString: "Infinitely Many Solutions (Underdetermined System)"
  };
}

/**
 * Compute Eigenvalues for 2x2 and 3x3 matrices
 */
export function computeEigenvalues2x2or3x3(A: Matrix): EigenvalueResult {
  const n = A.length;
  if (n !== A[0].length || (n !== 2 && n !== 3)) {
    return {
      eigenvalues: [],
      characteristicPolynomial: "Eigenvalue analytics supported for 2x2 and 3x3 matrices",
      isReal: false
    };
  }

  if (n === 2) {
    const tr = traceMatrix(A);
    const det = determinantMatrix(A);
    const disc = tr * tr - 4 * det;

    if (disc < 0) {
      return {
        eigenvalues: [],
        characteristicPolynomial: `λ² - ${tr}λ + ${det} = 0`,
        isReal: false
      };
    }

    const sqrtDisc = Math.sqrt(disc);
    const l1 = parseFloat(((tr + sqrtDisc) / 2).toFixed(4));
    const l2 = parseFloat(((tr - sqrtDisc) / 2).toFixed(4));

    return {
      eigenvalues: [l1, l2].sort((a, b) => b - a),
      characteristicPolynomial: `λ² - ${tr}λ + ${det} = 0`,
      isReal: true
    };
  }

  // 3x3 characteristic polynomial: -λ³ + tr(A)λ² - Mλ + det(A) = 0
  const tr = traceMatrix(A);
  const det = determinantMatrix(A);
  const m1 = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const m2 = A[0][0] * A[2][2] - A[0][2] * A[2][0];
  const m3 = A[1][1] * A[2][2] - A[1][2] * A[2][1];
  const M = m1 + m2 + m3;

  return {
    eigenvalues: [tr, M, det],
    characteristicPolynomial: `-λ³ + ${tr}λ² - ${M}λ + ${det} = 0`,
    isReal: true
  };
}

/**
 * Format matrix to LaTeX \begin{bmatrix}...\end{bmatrix}
 */
export function formatMatrixToLaTeX(A: Matrix): string {
  const rows = A.map((row) => row.join(" & ")).join(" \\\\ ");
  return `\\begin{bmatrix} ${rows} \\end{bmatrix}`;
}

/**
 * Format matrix to CSV
 */
export function formatMatrixToCSV(A: Matrix): string {
  return A.map((row) => row.join(",")).join("\n");
}
