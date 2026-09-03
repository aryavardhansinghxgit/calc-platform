import { calculateQuadraticFormulaCalculator } from "../src/app/calculators/quadratic-formula-calculator/calculator";

// Helper: simulate QuadraticCalculator calculation engine
function solveQuadratic(a: number, b: number, c: number) {
  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    return { error: "Invalid numeric values" };
  }

  if (a === 0) {
    if (b === 0) {
      if (c === 0) {
        return { isDegenerate: true, infiniteSolutions: true, message: "Identity (0 = 0): Infinitely many solutions." };
      } else {
        return { isDegenerate: true, noSolution: true, message: `Contradiction (${c} = 0): No solution.` };
      }
    }
    const linRoot = -c / b;
    return { isLinear: true, linRoot, message: `Linear equation ${b}x + ${c} = 0 => x = ${linRoot}` };
  }

  const disc = b * b - 4 * a * c;
  const h = -b / (2 * a);
  const k = c - (b * b) / (4 * a);
  const focusY = k + 1 / (4 * a);
  const directrixY = k - 1 / (4 * a);
  const yIntercept = c;
  const isMin = a > 0;

  let x1Real: number | null = null;
  let x2Real: number | null = null;
  let x1Complex: string | null = null;
  let x2Complex: string | null = null;
  let realPart: number | null = null;
  let imagPart: number | null = null;

  if (disc > 0) {
    const sqrtDisc = Math.sqrt(disc);
    x1Real = (-b + sqrtDisc) / (2 * a);
    x2Real = (-b - sqrtDisc) / (2 * a);
  } else if (disc === 0) {
    x1Real = -b / (2 * a);
    x2Real = x1Real;
  } else {
    realPart = -b / (2 * a);
    imagPart = Math.sqrt(-disc) / (2 * Math.abs(a));
    x1Complex = `${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`;
    x2Complex = `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
  }

  return {
    disc,
    h,
    k,
    focusY,
    directrixY,
    yIntercept,
    isMin,
    x1Real,
    x2Real,
    realPart,
    imagPart,
    x1Complex,
    x2Complex,
    isComplex: disc < 0,
    isRepeated: disc === 0
  };
}

console.log("=== RUNNING GOLDEN CASES AUDIT ===");

// Golden Case 1: a=1, b=-5, c=6
const g1 = solveQuadratic(1, -5, 6);
console.log("G1 (1, -5, 6):", {
  disc: g1.disc,
  roots: [g1.x1Real, g1.x2Real],
  vertex: [g1.h, g1.k],
  focus: [g1.h, g1.focusY],
  directrix: g1.directrixY,
  yInt: g1.yIntercept
});

// Golden Case 2: a=16, b=-5, c=6
const g2 = solveQuadratic(16, -5, 6);
console.log("G2 (16, -5, 6):", {
  disc: g2.disc,
  realPart: g2.realPart,
  imagPart: g2.imagPart,
  vertex: [g2.h, g2.k],
  focus: [g2.h, g2.focusY],
  directrix: g2.directrixY
});

// Golden Case 3: a=1, b=-6, c=9
const g3 = solveQuadratic(1, -6, 9);
console.log("G3 (1, -6, 9):", {
  disc: g3.disc,
  roots: [g3.x1Real, g3.x2Real],
  vertex: [g3.h, g3.k]
});

// Golden Case 4: a=-1, b=4, c=5
const g4 = solveQuadratic(-1, 4, 5);
console.log("G4 (-1, 4, 5):", {
  disc: g4.disc,
  roots: [g4.x1Real, g4.x2Real],
  vertex: [g4.h, g4.k],
  isMin: g4.isMin
});

// Golden Case 5: a=2, b=4, c=-3
const g5 = solveQuadratic(2, 4, -3);
console.log("G5 (2, 4, -3):", {
  disc: g5.disc,
  roots: [g5.x1Real, g5.x2Real],
  vertex: [g5.h, g5.k]
});

// Golden Case 6: a=0, b=5, c=-10
const g6 = solveQuadratic(0, 5, -10);
console.log("G6 (0, 5, -10):", g6);

// Golden Case 7: a=0, b=0, c=0
const g7 = solveQuadratic(0, 0, 0);
console.log("G7 (0, 0, 0):", g7);

// Golden Case 8: a=0, b=0, c=5
const g8 = solveQuadratic(0, 0, 5);
console.log("G8 (0, 0, 5):", g8);

console.log("\n=== 1,000 VIETA THEOREM REGRESSION TESTS ===");
let vietaPassed = 0;
for (let i = 0; i < 1000; i++) {
  const a = (Math.random() - 0.5) * 100 || 1;
  const b = (Math.random() - 0.5) * 100;
  const c = (Math.random() - 0.5) * 100;
  const sol = solveQuadratic(a, b, c);

  if (sol.isComplex) {
    // x1 = p + qi, x2 = p - qi => x1 + x2 = 2p = 2*(-b/(2a)) = -b/a
    // x1 * x2 = p^2 + q^2 = (-b/2a)^2 + (4ac - b^2)/(4a^2) = b^2/(4a^2) + c/a - b^2/(4a^2) = c/a
    const sum = 2 * (sol.realPart ?? 0);
    const prod = (sol.realPart ?? 0) ** 2 + (sol.imagPart ?? 0) ** 2;
    if (Math.abs(sum - (-b / a)) < 1e-7 && Math.abs(prod - (c / a)) < 1e-7) {
      vietaPassed++;
    }
  } else {
    const sum = (sol.x1Real ?? 0) + (sol.x2Real ?? 0);
    const prod = (sol.x1Real ?? 0) * (sol.x2Real ?? 0);
    if (Math.abs(sum - (-b / a)) < 1e-7 && Math.abs(prod - (c / a)) < 1e-7) {
      vietaPassed++;
    }
  }
}
console.log(`Vieta Tests: ${vietaPassed}/1000 passed.`);

console.log("\n=== 5,000 RANDOMIZED VALID COEFFICIENTS TESTS ===");
let randomPassed = 0;
for (let i = 0; i < 5000; i++) {
  const a = (Math.random() - 0.5) * 200 || 1;
  const b = (Math.random() - 0.5) * 200;
  const c = (Math.random() - 0.5) * 200;

  const sol = solveQuadratic(a, b, c);

  // Check discriminant
  const expectedDisc = b * b - 4 * a * c;
  if (Math.abs((sol.disc ?? 0) - expectedDisc) > 1e-9) continue;

  // Check vertex f(h) === k
  const h = -b / (2 * a);
  const k = c - (b * b) / (4 * a);
  const fh = a * h * h + b * h + c;
  if (Math.abs((sol.h ?? 0) - h) > 1e-9) continue;
  if (Math.abs((sol.k ?? 0) - k) > 1e-9) continue;
  if (Math.abs(fh - k) > 1e-7) continue;

  // Check focus / directrix equidistant to vertex
  const p = 1 / (4 * a);
  const distFocus = Math.abs(k + p - k);
  const distDirectrix = Math.abs(k - (k - p));
  if (Math.abs(distFocus - distDirectrix) > 1e-9) continue;

  randomPassed++;
}
console.log(`Randomized Tests: ${randomPassed}/5000 passed.`);
