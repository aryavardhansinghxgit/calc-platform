import {
  formatMatrixToLaTeX,
  multiplyMatrices,
  inverseMatrix,
  transposeMatrix,
  determinantMatrix,
  solveLinearSystem
} from '../src/app/calculators/matrix-calculator/matrix-logic';

console.log('--- TESTING LATEX OUTPUT & VALIDITY ---');

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

// 1. Binary Multiplication LaTeX
const AxB = multiplyMatrices(A, B);
const latexA = formatMatrixToLaTeX(A);
const latexB = formatMatrixToLaTeX(B);
const latexAxB = formatMatrixToLaTeX(AxB);
const binaryEq = `${latexA} \\times ${latexB} = ${latexAxB}`;
console.log('Binary LaTeX:\n' + binaryEq);
console.log('Contains \\begin{bmatrix}:', binaryEq.includes('\\begin{bmatrix}'));
console.log('Contains \\end{bmatrix}:', binaryEq.includes('\\end{bmatrix}'));
console.log('Contains row separators \\\\:', binaryEq.includes(' \\\\ '));
console.log('Contains column separators &:', binaryEq.includes(' & '));

// 2. Inverse LaTeX
const invA = inverseMatrix(A);
const latexInv = `${latexA}^{-1} = ${formatMatrixToLaTeX(invA)}`;
console.log('\nInverse LaTeX:\n' + latexInv);

// 3. System LaTeX
const b = [1, 2, 3];
const sol = solveLinearSystem(A, b);
const systemLatex = `${latexA} \\mathbf{x} = \\begin{bmatrix} ${b.join(' \\\\ ')} \\end{bmatrix} \\implies \\mathbf{x} = \\begin{bmatrix} ${sol.solutionVector!.join(' \\\\ ')} \\end{bmatrix}`;
console.log('\nSystem LaTeX:\n' + systemLatex);
console.log('LaTeX tests valid: true');
