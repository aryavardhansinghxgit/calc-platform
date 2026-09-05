import { calculateRandomNumberGenerator } from "./calculator";
import {
  generateRandomBasicEngine,
  generateRandomComprehensiveEngine,
  generateSecureBigIntInRange,
  scaleDecimalToPrecision,
  formatScaledBigIntToDecimal
} from "@/components/calculator/random-number-generator/random-engine";

export function runRandomNumberGeneratorTests() {
  // 1. [1, 100] integer range
  for (let i = 0; i < 1000; i++) {
    const res = generateRandomBasicEngine("1", "100");
    if (!res.success || !res.result) throw new Error("Basic [1, 100] failed to generate");
    const val = Number(res.result);
    if (!Number.isInteger(val) || val < 1 || val > 100) {
      throw new Error(`Basic [1, 100] produced out-of-range value: ${res.result}`);
    }
  }

  // 2. [-100, -1] negative range
  for (let i = 0; i < 1000; i++) {
    const res = generateRandomBasicEngine("-100", "-1");
    if (!res.success || !res.result) throw new Error("Basic [-100, -1] failed");
    const val = Number(res.result);
    if (!Number.isInteger(val) || val < -100 || val > -1) {
      throw new Error(`Basic [-100, -1] produced out-of-range value: ${res.result}`);
    }
  }

  // 3. [-50, 50] cross-zero range
  let sawZero = false;
  for (let i = 0; i < 2000; i++) {
    const res = generateRandomBasicEngine("-50", "50");
    if (!res.success || !res.result) throw new Error("Basic [-50, 50] failed");
    const val = Number(res.result);
    if (val === 0) sawZero = true;
    if (!Number.isInteger(val) || val < -50 || val > 50) {
      throw new Error(`Basic [-50, 50] produced out-of-range value: ${res.result}`);
    }
  }
  if (!sawZero) throw new Error("Cross-zero range failed to ever generate 0");

  // 4. [42, 42] single-value range
  for (let i = 0; i < 100; i++) {
    const res = generateRandomBasicEngine("42", "42");
    if (!res.success || res.result !== "42") {
      throw new Error(`Single-value [42, 42] failed, got: ${res.result}`);
    }
  }

  // 5. Reversed limits [100, 1]
  const revRes = generateRandomBasicEngine("100", "1");
  if (revRes.success || !revRes.error?.includes("less than or equal")) {
    throw new Error("Reversed limits failed to return validation error");
  }

  // 6. Fractional limits in integer mode [1.5, 9.8]
  const fracRes = generateRandomBasicEngine("1.5", "9.8");
  if (fracRes.success || !fracRes.error?.includes("whole-number")) {
    throw new Error("Fractional limits in integer mode failed to reject with whole-number message");
  }

  // 7. Exact zero range [0, 0]
  const zeroRes = generateRandomBasicEngine("0", "0");
  if (!zeroRes.success || zeroRes.result !== "0") {
    throw new Error(`Zero range [0, 0] failed, got: ${zeroRes.result}`);
  }

  // 8. [0, 10] range
  for (let i = 0; i < 100; i++) {
    const res = generateRandomBasicEngine("0", "10");
    const val = Number(res.result);
    if (val < 0 || val > 10) throw new Error(`[0, 10] out of bounds: ${val}`);
  }

  // 9. MAX_SAFE_INTEGER endpoints
  const safeL = "9007199254740990";
  const safeU = "9007199254740991";
  for (let i = 0; i < 50; i++) {
    const res = generateRandomBasicEngine(safeL, safeU);
    if (!res.success || (res.result !== safeL && res.result !== safeU)) {
      throw new Error(`MAX_SAFE_INTEGER test failed: ${res.result}`);
    }
  }

  // 10. Huge 39-digit endpoints beyond MAX_SAFE_INTEGER
  const bigL = "123456789012345678901234567890123456789";
  const bigU = "123456789012345678901234567890123456999";
  for (let i = 0; i < 50; i++) {
    const res = generateRandomBasicEngine(bigL, bigU);
    if (!res.success || !res.result) throw new Error("BigInt generation failed");
    if (res.result.includes("e") || res.result.includes("+")) {
      throw new Error(`BigInt generation corrupted with scientific notation: ${res.result}`);
    }
    const val = BigInt(res.result);
    if (val < BigInt(bigL) || val > BigInt(bigU)) {
      throw new Error(`BigInt generation out of range: ${res.result}`);
    }
  }

  // 11. 100-digit endpoints
  const d100L = "1" + "0".repeat(99);
  const d100U = "1" + "0".repeat(98) + "9";
  const res100 = generateRandomBasicEngine(d100L, d100U);
  if (!res100.success || !res100.result || BigInt(res100.result) < BigInt(d100L) || BigInt(res100.result) > BigInt(d100U)) {
    throw new Error("100-digit generation failed");
  }

  // 12. Decimal [0.5, 1.2] with precision 50: verify uniformity and no boundary clamping spike
  const decComp = generateRandomComprehensiveEngine("0.5", "1.2", 100, "decimal", 50);
  if (!decComp.success || !decComp.results || decComp.results.length !== 100) {
    throw new Error("Decimal comprehensive generation failed");
  }
  let clampCount = 0;
  for (const item of decComp.results) {
    if (item.startsWith("0.50000000000000000000000000000000000000000000000000")) {
      clampCount++;
    }
    const parts = item.split(".");
    if (parts.length !== 2 || parts[1].length !== 50) {
      throw new Error(`Precision mismatch: expected 50 digits, got ${item}`);
    }
  }
  // Clamp count should be negligible (at most 1 in 100, certainly not > 50%)
  if (clampCount > 2) {
    throw new Error(`Defect DEF-RNG-03 detected: boundary clamp spike observed (${clampCount}/100)`);
  }

  // 13. High-precision decimal 999 digits
  const dec999 = generateRandomComprehensiveEngine("1", "2", 1, "decimal", 999);
  if (!dec999.success || !dec999.results || dec999.results[0].split(".")[1]?.length !== 999) {
    throw new Error("999-digit precision generation failed");
  }

  // 14. Zero preservation in calculator.ts
  const calcZero = calculateRandomNumberGenerator({ min: 0, max: 0, count: 5 });
  if (calcZero.generatedList !== "0, 0, 0, 0, 0" || calcZero.sum !== 0) {
    throw new Error(`DEF-RNG-07 detected in calculator.ts zero handling: got ${calcZero.generatedList}`);
  }

  // 15. Chi-Square goodness-of-fit test on [1, 10] (100,000 samples)
  const N = 100000;
  const k = 10;
  const counts: Record<number, number> = {};
  for (let i = 1; i <= k; i++) counts[i] = 0;

  for (let i = 0; i < N; i++) {
    const sampled = Number(generateSecureBigIntInRange(1n, 10n));
    counts[sampled] = (counts[sampled] || 0) + 1;
  }

  const expected = N / k;
  let chiSquare = 0;
  for (let i = 1; i <= k; i++) {
    chiSquare += Math.pow(counts[i] - expected, 2) / expected;
  }
  // Critical value for df=9 at alpha=0.01 is 21.666
  if (chiSquare > 21.666) {
    throw new Error(`Chi-Square uniformity test failed: chiSquare = ${chiSquare}`);
  }

  return true;
}
