import { calculateExponentCalculator } from "./calculator";

export function runExponentCalculatorTests() {
  // Case 1: 2^10 = 1024
  const res1 = calculateExponentCalculator({ base: 2, exponent: 10 });
  if (res1.result !== 1024) throw new Error("Case 1 (2^10 = 1024) failed");

  // Case 2: 2^0 = 1
  const res2 = calculateExponentCalculator({ base: 2, exponent: 0 });
  if (res2.result !== 1) throw new Error("Case 2 (2^0 = 1) failed");

  // Case 3: 0^2 = 0
  const res3 = calculateExponentCalculator({ base: 0, exponent: 2 });
  if (res3.result !== 0) throw new Error("Case 3 (0^2 = 0) failed");

  // Case 4: 0^0 = 1
  const res4 = calculateExponentCalculator({ base: 0, exponent: 0 });
  if (res4.result !== 1) throw new Error("Case 4 (0^0 = 1) failed");

  // Case 5: 0^-1 = undefined
  const res5 = calculateExponentCalculator({ base: 0, exponent: -1 });
  if (!res5.scientificNotation.includes("Undefined")) throw new Error("Case 5 (0^-1 undefined) failed");

  // Case 6: 2^-3 = 0.125
  const res6 = calculateExponentCalculator({ base: 2, exponent: -3 });
  if (res6.result !== 0.125) throw new Error("Case 6 (2^-3 = 0.125) failed");

  // Case 7: (-2)^2 = 4
  const res7 = calculateExponentCalculator({ base: -2, exponent: 2 });
  if (res7.result !== 4) throw new Error("Case 7 ((-2)^2 = 4) failed");

  // Case 8: (-2)^3 = -8
  const res8 = calculateExponentCalculator({ base: -2, exponent: 3 });
  if (res8.result !== -8) throw new Error("Case 8 ((-2)^3 = -8) failed");

  // Case 9: (-4)^0.5 = complex
  const res9 = calculateExponentCalculator({ base: -4, exponent: 0.5 });
  if (!res9.scientificNotation.includes("i")) throw new Error("Case 9 ((-4)^0.5 complex) failed");

  return true;
}

export default runExponentCalculatorTests;
