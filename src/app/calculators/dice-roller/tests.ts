import { rollDice, calculateProbabilityStats, secureRandomInt } from "./calculator";

export function runDiceRollerTests() {
  // Test 1: CSPRNG range bounds
  for (let i = 0; i < 50; i++) {
    const val = secureRandomInt(1, 6);
    if (val < 1 || val > 6) throw new Error("CSPRNG returned value out of bounds");
  }

  // Test 2: Roll standard d20
  const res1 = rollDice("1d20");
  if (!res1 || res1.total < 1 || res1.total > 20) throw new Error("1d20 roll failed");

  // Test 3: Roll 4d6kh3 notation
  const res2 = rollDice("4d6kh3 + 5");
  if (!res2 || res2.total < 8 || res2.total > 23) throw new Error("4d6kh3 + 5 roll failed");

  // Test 4: Probability stats math for 2d6
  const stats = calculateProbabilityStats(2, 6, 0);
  if (stats.min !== 2 || stats.max !== 12 || stats.mean !== 7) {
    throw new Error("2d6 probability math failed");
  }

  return true;
}
