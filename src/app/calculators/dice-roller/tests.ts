import {
  rollDice,
  calculateProbabilityStats,
  secureRandomInt,
  parseDiceExpression,
} from "./calculator";

function createMockRng(sequence: number[]): (min: number, max: number) => number {
  let idx = 0;
  return () => sequence[idx++];
}

export function runDiceRollerTests() {
  // Test 1: CSPRNG range bounds
  for (let i = 0; i < 50; i++) {
    const val = secureRandomInt(1, 6);
    if (val < 1 || val > 6) throw new Error("CSPRNG returned value out of bounds");
  }

  // Test 2: Deterministic Golden G1 (2d6 -> 9)
  const g1 = rollDice("2d6", createMockRng([5, 4]));
  if (g1.total !== 9) throw new Error(`G1 failed: expected 9, got ${g1.total}`);

  // Test 3: Deterministic Golden G2 (2d6+3 -> 12)
  const g2 = rollDice("2d6+3", createMockRng([5, 4]));
  if (g2.total !== 12) throw new Error(`G2 failed: expected 12, got ${g2.total}`);

  // Test 4: Deterministic Golden G8 (2d20kh1 -> 15)
  const g8 = rollDice("2d20kh1", createMockRng([7, 15]));
  if (g8.total !== 15) throw new Error(`G8 failed: expected 15, got ${g8.total}`);

  // Test 5: Deterministic Golden G9 (2d20kl1 -> 7)
  const g9 = rollDice("2d20kl1", createMockRng([7, 15]));
  if (g9.total !== 7) throw new Error(`G9 failed: expected 7, got ${g9.total}`);

  // Test 6: Deterministic Golden G10 (4d6kh3 -> 13)
  const g10 = rollDice("4d6kh3", createMockRng([6, 4, 3, 2]));
  if (g10.total !== 13) throw new Error(`G10 failed: expected 13, got ${g10.total}`);

  // Test 7: Deterministic Golden G11 (1d6! -> 10)
  const g11 = rollDice("1d6!", createMockRng([6, 4]));
  if (g11.total !== 10) throw new Error(`G11 failed: expected 10, got ${g11.total}`);

  // Test 8: Deterministic Golden G12 (1d6!+3 -> 13)
  const g12 = rollDice("1d6!+3", createMockRng([6, 4]));
  if (g12.total !== 13) throw new Error(`G12 failed: expected 13, got ${g12.total}`);

  // Test 9: Probability stats math for 2d6
  const stats2d6 = calculateProbabilityStats(2, 6, 0);
  if (stats2d6.min !== 2 || stats2d6.max !== 12 || stats2d6.mean !== 7 || stats2d6.rawSum !== 1.0) {
    throw new Error("2d6 probability math failed");
  }

  // Test 10: Advanced PMF for 4d6kh3
  const stats4d6kh3 = calculateProbabilityStats(4, 6, 0, { keepHighest: 3 });
  if (stats4d6kh3.min !== 3 || stats4d6kh3.max !== 18 || Math.abs(stats4d6kh3.mean - 12.2446) > 0.001) {
    throw new Error("4d6kh3 probability math failed");
  }

  // Test 11: Parser validation rejection
  const invalidTest = parseDiceExpression("2d0");
  if (invalidTest.isValid) throw new Error("Parser failed to reject invalid expression 2d0");

  return true;
}
