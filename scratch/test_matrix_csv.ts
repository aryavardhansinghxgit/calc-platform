import {
  formatMatrixToCSV,
  multiplyMatrices,
  inverseMatrix,
  solveLinearSystem
} from '../src/app/calculators/matrix-calculator/matrix-logic';

console.log('--- TESTING CSV EXPORT FORMATTING & INTEGRITY ---');

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

// 1. Binary CSV
const AxB = multiplyMatrices(A, B);
const csvBinary = formatMatrixToCSV(AxB);
console.log('CSV Binary:\n' + csvBinary);

// Parse CSV
const rowsBinary = csvBinary.trim().split('\n').map(r => r.split(',').map(Number));
console.log('Parsed Binary rows:', rowsBinary);
console.log('CSV Binary matches expected matrix:', JSON.stringify(rowsBinary) === JSON.stringify(AxB));

// 2. Unary Inverse CSV
const invA = inverseMatrix(A);
const csvInv = formatMatrixToCSV(invA);
console.log('\nCSV Inverse:\n' + csvInv);
const rowsInv = csvInv.trim().split('\n').map(r => r.split(',').map(Number));
console.log('CSV Inverse matches expected matrix:', JSON.stringify(rowsInv) === JSON.stringify(invA));

// 3. Linear System CSV
const b = [1, 2, 3];
const sol = solveLinearSystem(A, b);
const csvSystem = `Variable,Value\n${sol.solutionVector!.map((v, i) => `x${i + 1},${v}`).join('\n')}`;
console.log('\nCSV System:\n' + csvSystem);
const lines = csvSystem.trim().split('\n');
console.log('Header:', lines[0]);
console.log('Row 1:', lines[1]);
console.log('Row 2:', lines[2]);
console.log('Row 3:', lines[3]);
console.log('CSV System valid:', lines.length === 4 && lines[0] === 'Variable,Value');
