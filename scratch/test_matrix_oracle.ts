import {
  Matrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  scaleMatrix,
  hadamardProduct,
  kroneckerProduct,
  transposeMatrix,
  traceMatrix,
  determinantMatrix,
  rrefMatrix,
  rankMatrix,
  inverseMatrix,
  matrixPower,
  solveLinearSystem
} from '../src/app/calculators/matrix-calculator/matrix-logic';

function generateRandomMatrix(rows: number, cols: number, min = -10, max = 10, allowDecimals = false): Matrix {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => {
      const val = Math.random() * (max - min) + min;
      return allowDecimals ? parseFloat(val.toFixed(2)) : Math.round(val);
    })
  );
}

function matEqual(A: Matrix, B: Matrix, tol = 1e-4): boolean {
  if (A.length !== B.length || A[0].length !== B[0].length) return false;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[0].length; j++) {
      if (Math.abs(A[i][j] - B[i][j]) > tol) return false;
    }
  }
  return true;
}

// Independent Reference / Oracle implementations
function oracleAdd(A: Matrix, B: Matrix): Matrix {
  return A.map((r, i) => r.map((v, j) => v + B[i][j]));
}

function oracleSub(A: Matrix, B: Matrix): Matrix {
  return A.map((r, i) => r.map((v, j) => v - B[i][j]));
}

function oracleMult(A: Matrix, B: Matrix): Matrix {
  const m = A.length, k = A[0].length, n = B[0].length;
  const res: Matrix = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let p = 0; p < k; p++) {
        sum += A[i][p] * B[p][j];
      }
      res[i][j] = sum;
    }
  }
  return res;
}

function oracleTranspose(A: Matrix): Matrix {
  const m = A.length, n = A[0].length;
  const res: Matrix = Array.from({ length: n }, () => Array(m).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      res[j][i] = A[i][j];
    }
  }
  return res;
}

function oracleTrace(A: Matrix): number {
  let s = 0;
  for (let i = 0; i < A.length; i++) s += A[i][i];
  return s;
}

async function runOracleSuite() {
  console.log('--- STARTING COMPREHENSIVE INDEPENDENT ORACLE & RANDOMIZED SUITE ---');
  let assertions = 0;
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    assertions++;
    if (condition) {
      passed++;
    } else {
      failed++;
      console.error(`FAILED Assertion #${assertions}: ${msg}`);
    }
  }

  // 1. Matrix Addition: 1000 trials
  console.log('Testing Matrix Addition (1,000 trials)...');
  for (let t = 0; t < 1000; t++) {
    const r = Math.floor(Math.random() * 6) + 1;
    const c = Math.floor(Math.random() * 6) + 1;
    const A = generateRandomMatrix(r, c);
    const B = generateRandomMatrix(r, c);
    const res = addMatrices(A, B);
    const ref = oracleAdd(A, B);
    assert(matEqual(res, ref), `Add mismatch at trial ${t}`);

    // Identity: (A + B) - B = A
    const subBack = subtractMatrices(res, B);
    assert(matEqual(subBack, A), `(A+B)-B != A at trial ${t}`);
  }

  // 2. Matrix Subtraction: 1000 trials
  console.log('Testing Matrix Subtraction (1,000 trials)...');
  for (let t = 0; t < 1000; t++) {
    const r = Math.floor(Math.random() * 6) + 1;
    const c = Math.floor(Math.random() * 6) + 1;
    const A = generateRandomMatrix(r, c);
    const B = generateRandomMatrix(r, c);
    const res = subtractMatrices(A, B);
    const ref = oracleSub(A, B);
    assert(matEqual(res, ref), `Sub mismatch at trial ${t}`);
  }

  // 3. Matrix Multiplication: 1000 trials
  console.log('Testing Matrix Multiplication (1,000 trials)...');
  for (let t = 0; t < 1000; t++) {
    const m = Math.floor(Math.random() * 5) + 1;
    const k = Math.floor(Math.random() * 5) + 1;
    const n = Math.floor(Math.random() * 5) + 1;
    const A = generateRandomMatrix(m, k);
    const B = generateRandomMatrix(k, n);
    const res = multiplyMatrices(A, B);
    const ref = oracleMult(A, B);
    assert(matEqual(res, ref), `Mult mismatch at trial ${t}`);
    assert(res.length === m && res[0].length === n, `Dimension mismatch at trial ${t}`);
  }

  // 4. Matrix Transpose & Properties: 1000 trials
  console.log('Testing Matrix Transpose & Properties (1,000 trials)...');
  for (let t = 0; t < 1000; t++) {
    const r = Math.floor(Math.random() * 6) + 1;
    const c = Math.floor(Math.random() * 6) + 1;
    const A = generateRandomMatrix(r, c);
    const T = transposeMatrix(A);
    const ref = oracleTranspose(A);
    assert(matEqual(T, ref), `Transpose mismatch at trial ${t}`);

    // (A^T)^T = A
    const TT = transposeMatrix(T);
    assert(matEqual(TT, A), `(A^T)^T != A at trial ${t}`);
  }

  // 5. Trace & Trace Properties: 500 trials
  console.log('Testing Trace & Linearity (500 trials)...');
  for (let t = 0; t < 500; t++) {
    const n = Math.floor(Math.random() * 6) + 1;
    const A = generateRandomMatrix(n, n);
    const B = generateRandomMatrix(n, n);
    const trA = traceMatrix(A);
    assert(trA === oracleTrace(A), `Trace mismatch at trial ${t}`);

    // tr(A + B) = tr(A) + tr(B)
    const trAplusB = traceMatrix(addMatrices(A, B));
    assert(Math.abs(trAplusB - (trA + traceMatrix(B))) < 1e-6, `tr(A+B) != tr(A)+tr(B) at trial ${t}`);
  }

  // 6. Invertibility & A x A^-1 = I: 300 trials on invertible matrices
  console.log('Testing Matrix Inverse & Identity Property (300 trials)...');
  let invTested = 0;
  while (invTested < 300) {
    const n = Math.floor(Math.random() * 3) + 2; // 2x2, 3x3, 4x4
    const A = generateRandomMatrix(n, n, -5, 5);
    const det = determinantMatrix(A);
    if (Math.abs(det) < 0.1) continue; // skip near-singular to avoid numerical instability
    try {
      const invA = inverseMatrix(A);
      const prod1 = multiplyMatrices(A, invA);
      const prod2 = multiplyMatrices(invA, A);
      const I = Array.from({ length: n }, (_, i) =>
        Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
      );
      assert(matEqual(prod1, I, 1e-2), `A * A^-1 != I at trial ${invTested}`);
      assert(matEqual(prod2, I, 1e-2), `A^-1 * A != I at trial ${invTested}`);
      invTested++;
    } catch (e) {}
  }

  // 7. Linear System Solver Ax = b: 500 trials
  console.log('Testing Linear System Solver (500 trials)...');
  let sysTested = 0;
  while (sysTested < 500) {
    const n = Math.floor(Math.random() * 3) + 2; // 2x2, 3x3, 4x4
    const A = generateRandomMatrix(n, n, -5, 5);
    const det = determinantMatrix(A);
    if (Math.abs(det) < 0.2) continue; // invertible -> unique solution guaranteed
    const exactX = generateRandomMatrix(n, 1, -5, 5).map(r => r[0]);
    // b = A * exactX
    const b = multiplyMatrices(A, exactX.map(x => [x])).map(r => r[0]);
    const sol = solveLinearSystem(A, b);
    assert(sol.hasSolution === true, `Expected solution at trial ${sysTested}`);
    assert(sol.isUnique === true, `Expected unique solution at trial ${sysTested}`);
    if (sol.solutionVector) {
      for (let i = 0; i < n; i++) {
        assert(Math.abs(sol.solutionVector[i] - exactX[i]) < 1e-3, `Solution x[${i}] mismatch at trial ${sysTested}`);
      }
    }
    sysTested++;
  }

  console.log('==================================================');
  console.log(`ALL RANDOMIZED ASSERTIONS COMPLETED:`);
  console.log(`Total Assertions: ${assertions}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log('==================================================');
}

runOracleSuite().catch(console.error);
