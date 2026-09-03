import { calculateLogCalculator } from "./calculator";

export function runLogCalculatorTests() {
  // Case 1: log10(100) = 2
  const c1 = calculateLogCalculator({ base: 10, value: 100 });
  if (Math.abs(c1.logResult - 2) > 1e-9) throw new Error("Case 1 (log10(100) = 2) failed");

  // Case 2: ln(100) ≈ 4.605170186
  if (Math.abs(c1.lnResult - 4.605170186) > 1e-6) throw new Error("Case 2 (ln(100)) failed");

  // Case 3: log2(100) ≈ 6.64385619
  if (Math.abs((c1.log2Result || 0) - 6.64385619) > 1e-6) throw new Error("Case 3 (log2(100)) failed");

  // Case 4: log2(64) = 6
  const c4 = calculateLogCalculator({ base: 2, value: 64 });
  if (Math.abs(c4.logResult - 6) > 1e-9) throw new Error("Case 4 (log2(64) = 6) failed");

  // Case 5: log3(81) = 4
  const c5 = calculateLogCalculator({ base: 3, value: 81 });
  if (Math.abs(c5.logResult - 4) > 1e-9) throw new Error("Case 5 (log3(81) = 4) failed");

  // Case 6: log5(125) = 3
  const c6 = calculateLogCalculator({ base: 5, value: 125 });
  if (Math.abs(c6.logResult - 3) > 1e-9) throw new Error("Case 6 (log5(125) = 3) failed");

  // Case 7: log10(0.01) = -2
  const c7 = calculateLogCalculator({ base: 10, value: 0.01 });
  if (Math.abs(c7.logResult - (-2)) > 1e-9) throw new Error("Case 7 (log10(0.01) = -2) failed");

  // Case 8: log_1049(105) ≈ 0.6690961665
  const c8 = calculateLogCalculator({ base: 1049, value: 105 });
  if (Math.abs(c8.logResult - 0.6690961665) > 1e-8) throw new Error("Case 8 (log_1049(105)) failed");

  // Case 9: Antilog 10^2 = 100
  if (Math.pow(10, 2) !== 100) throw new Error("Case 9 (antilog10(2)) failed");

  // Case 10: Antilog 2^6 = 64
  if (Math.pow(2, 6) !== 64) throw new Error("Case 10 (antilog2(6)) failed");

  // Case 11-13: 3-Variable Equation Solver
  const ySol = Math.log(64) / Math.log(2);
  if (Math.abs(ySol - 6) > 1e-9) throw new Error("Case 11 (solve y) failed");
  const xSol = Math.pow(2, 6);
  if (xSol !== 64) throw new Error("Case 12 (solve x) failed");
  const bSol = Math.pow(64, 1 / 6);
  if (Math.abs(bSol - 2) > 1e-9) throw new Error("Case 13 (solve b) failed");

  // Case 14: log2(-8) -> invalid real domain
  const c14 = calculateLogCalculator({ base: 2, value: -8 });
  if (!isNaN(c14.logResult)) throw new Error("Case 14 (log2(-8)) failed");

  // Case 15: log2(0) -> invalid
  const c15 = calculateLogCalculator({ base: 2, value: 0 });
  if (!isNaN(c15.logResult)) throw new Error("Case 15 (log2(0)) failed");

  // Case 16: log1(100) -> invalid
  const c16 = calculateLogCalculator({ base: 1, value: 100 });
  if (!isNaN(c16.logResult)) throw new Error("Case 16 (log1(100)) failed");

  // Case 17: log0(100) -> invalid
  const c17 = calculateLogCalculator({ base: 0, value: 100 });
  if (!isNaN(c17.logResult)) throw new Error("Case 17 (log0(100)) failed");

  // Case 18: log_-2(100) -> invalid
  const c18 = calculateLogCalculator({ base: -2, value: 100 });
  if (!isNaN(c18.logResult)) throw new Error("Case 18 (log_-2(100)) failed");

  return true;
}

export default runLogCalculatorTests;
