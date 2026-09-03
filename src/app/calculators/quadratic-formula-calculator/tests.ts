import { calculateQuadraticFormulaCalculator } from "./calculator";

export function runQuadraticFormulaCalculatorTests() {
  // Case 1: a=1, b=-5, c=6 (Real distinct roots 3 and 2)
  const res1 = calculateQuadraticFormulaCalculator({ a: 1, b: -5, c: 6 });
  if (res1.discriminant !== 1) throw new Error("Case 1 discriminant failed");
  if (res1.root1 !== "3.0000" || res1.root2 !== "2.0000") throw new Error("Case 1 roots failed");
  if (res1.vertex !== "(2.5000, -0.2500)") throw new Error("Case 1 vertex failed");

  // Case 2: a=16, b=-5, c=6 (Complex conjugate roots 0.1563 ± 0.5921i)
  const res2 = calculateQuadraticFormulaCalculator({ a: 16, b: -5, c: 6 });
  if (res2.discriminant !== -359) throw new Error("Case 2 discriminant failed");
  if (!res2.root1.includes("0.1563") || !res2.root1.includes("0.5921i")) throw new Error("Case 2 root 1 failed");
  if (!res2.root2.includes("0.1563") || !res2.root2.includes("0.5921i")) throw new Error("Case 2 root 2 failed");
  if (res2.vertex !== "(0.1563, 5.6094)") throw new Error("Case 2 vertex failed");

  // Case 3: a=1, b=-6, c=9 (Repeated root 3)
  const res3 = calculateQuadraticFormulaCalculator({ a: 1, b: -6, c: 9 });
  if (res3.discriminant !== 0) throw new Error("Case 3 discriminant failed");
  if (res3.root1 !== "3.0000" || res3.root2 !== "3.0000") throw new Error("Case 3 repeated root failed");
  if (res3.vertex !== "(3.0000, 0.0000)") throw new Error("Case 3 vertex failed");

  // Case 4: a=-1, b=4, c=5 (Downward parabola, roots -1 and 5)
  const res4 = calculateQuadraticFormulaCalculator({ a: -1, b: 4, c: 5 });
  if (res4.discriminant !== 36) throw new Error("Case 4 discriminant failed");
  if (res4.root1 !== "-1.0000" || res4.root2 !== "5.0000") throw new Error("Case 4 roots failed");
  if (res4.vertex !== "(2.0000, 9.0000)") throw new Error("Case 4 vertex failed");

  // Case 5: a=2, b=4, c=-3 (Irrational roots Δ=40)
  const res5 = calculateQuadraticFormulaCalculator({ a: 2, b: 4, c: -3 });
  if (res5.discriminant !== 40) throw new Error("Case 5 discriminant failed");
  if (res5.root1 !== "0.5811" || res5.root2 !== "-2.5811") throw new Error("Case 5 roots failed");
  if (res5.vertex !== "(-1.0000, -5.0000)") throw new Error("Case 5 vertex failed");

  // Case 6: a=0, b=5, c=-10 (Linear degeneration)
  const res6 = calculateQuadraticFormulaCalculator({ a: 0, b: 5, c: -10 });
  if (!res6.root1.includes("2.0000")) throw new Error("Case 6 linear degeneration failed");

  // Case 7: a=0, b=0, c=0 (Infinite solutions)
  const res7 = calculateQuadraticFormulaCalculator({ a: 0, b: 0, c: 0 });
  if (!res7.root1.includes("Infinite")) throw new Error("Case 7 infinite solutions failed");

  // Case 8: a=0, b=0, c=5 (No solution contradiction)
  const res8 = calculateQuadraticFormulaCalculator({ a: 0, b: 0, c: 5 });
  if (!res8.root1.includes("No solution")) throw new Error("Case 8 no solution failed");

  return true;
}

export default runQuadraticFormulaCalculatorTests;
