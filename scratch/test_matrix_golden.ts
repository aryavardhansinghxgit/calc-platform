import {
  Matrix,
  addMatrices,
  subtractMatrices,
  multiplyMatrices,
  hadamardProduct,
  kroneckerProduct,
  determinantMatrix,
  inverseMatrix,
  transposeMatrix,
  rankMatrix,
  traceMatrix,
  rrefMatrix,
  solveLinearSystem,
  matrixPower,
  computeEigenvalues2x2or3x3
} from '../src/app/calculators/matrix-calculator/matrix-logic';

console.log('--- RUNNING GOLDEN TEST CASES ---');

const A = [
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 0]
];

const B = [
  [2, 0, -1],
  [1, 3, 2],
  [0, -2, 1]
];

// 1. Multiplication A x B
const AxB = multiplyMatrices(A, B);
console.log('A x B:', JSON.stringify(AxB));
const expectedAxB = [
  [4, 0, 6],
  [1, -5, 6],
  [16, 18, 7]
];
console.log('Expected A x B:', JSON.stringify(expectedAxB));
console.log('A x B MATCH:', JSON.stringify(AxB) === JSON.stringify(expectedAxB));

// 2. Reverse Multiplication B x A
const BxA = multiplyMatrices(B, A);
console.log('B x A:', JSON.stringify(BxA));
const expectedBxA = [
  [-3, -2, 6],
  [11, 17, 15],
  [5, 4, -8]
];
console.log('Expected B x A:', JSON.stringify(expectedBxA));
console.log('B x A MATCH:', JSON.stringify(BxA) === JSON.stringify(expectedBxA));

// 3. Addition A + B
const AplusB = addMatrices(A, B);
console.log('A + B:', JSON.stringify(AplusB));
const expectedAplusB = [
  [3, 2, 2],
  [1, 4, 6],
  [5, 4, 1]
];
console.log('A + B MATCH:', JSON.stringify(AplusB) === JSON.stringify(expectedAplusB));

// 4. Subtraction A - B
const AminusB = subtractMatrices(A, B);
console.log('A - B:', JSON.stringify(AminusB));
const expectedAminusB = [
  [-1, 2, 4],
  [-1, -2, 2],
  [5, 8, -1]
];
console.log('A - B MATCH:', JSON.stringify(AminusB) === JSON.stringify(expectedAminusB));

// 5. Determinant
const detA = determinantMatrix(A);
console.log('det(A):', detA, 'Expected: 1, MATCH:', detA === 1);

const det2x2 = determinantMatrix([[1, 2], [3, 4]]);
console.log('det(2x2):', det2x2, 'Expected: -2, MATCH:', det2x2 === -2);

const detSingular = determinantMatrix([[1, 2], [2, 4]]);
console.log('det(singular):', detSingular, 'Expected: 0, MATCH:', detSingular === 0);

// 6. Inverse
const invA = inverseMatrix(A);
console.log('Inverse A:', JSON.stringify(invA));
const expectedInvA = [
  [-24, 18, 5],
  [20, -15, -4],
  [-5, 4, 1]
];
console.log('Inverse A MATCH:', JSON.stringify(invA) === JSON.stringify(expectedInvA));

// Multiply A x invA
const A_invA = multiplyMatrices(A, invA);
console.log('A x invA:', JSON.stringify(A_invA));
const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
console.log('A x invA is I3:', JSON.stringify(A_invA) === JSON.stringify(I3));

// 7. Transpose
const A2x3 = [
  [1, 2, 3],
  [4, 5, 6]
];
const transA2x3 = transposeMatrix(A2x3);
console.log('A^T (2x3 -> 3x2):', JSON.stringify(transA2x3));
const expectedTransA2x3 = [
  [1, 4],
  [2, 5],
  [3, 6]
];
console.log('Transpose MATCH:', JSON.stringify(transA2x3) === JSON.stringify(expectedTransA2x3));

// 8. Rank
const rankFull = rankMatrix(A);
console.log('Rank A:', rankFull, 'Expected: 3, MATCH:', rankFull === 3);

const rankDef = rankMatrix([
  [1, 2, 3],
  [2, 4, 6],
  [3, 6, 9]
]);
console.log('Rank Deficient:', rankDef, 'Expected: 1, MATCH:', rankDef === 1);

const rankZero = rankMatrix([
  [0, 0],
  [0, 0]
]);
console.log('Rank Zero Matrix:', rankZero, 'Expected: 0, MATCH:', rankZero === 0);

// 9. Trace
const trA = traceMatrix(A);
console.log('Trace A:', trA, 'Expected: 2, MATCH:', trA === 2);

// 10. Linear System Ax = b
const b = [1, 2, 3];
const sol = solveLinearSystem(A, b);
console.log('Linear System Ax = b:', JSON.stringify(sol));
console.log('Vector x:', sol.solutionVector, 'Expected: [27, -22, 6]');
const solMatches = sol.solutionVector &&
  sol.solutionVector[0] === 27 &&
  sol.solutionVector[1] === -22 &&
  sol.solutionVector[2] === 6;
console.log('System solution MATCH:', solMatches);

// Infinite solutions test
const A_inf = [[1, 2], [2, 4]];
const b_inf = [3, 6];
const sol_inf = solveLinearSystem(A_inf, b_inf);
console.log('Inf solutions:', sol_inf.solutionString);

// No solution test
const b_none = [3, 7];
const sol_none = solveLinearSystem(A_inf, b_none);
console.log('No solution:', sol_none.solutionString);
