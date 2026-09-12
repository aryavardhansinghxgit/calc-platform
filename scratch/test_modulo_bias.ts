import crypto from "crypto";

function secureRandomUint32(): number {
  return crypto.randomBytes(4).readUInt32BE(0);
}

function getUnbiasedIndex(poolSize: number): number {
  if (poolSize <= 0) return 0;
  if (poolSize === 1) return 0;
  // Use 32-bit rejection sampling
  const maxLimit = Math.floor(0x100000000 / poolSize) * poolSize;
  while (true) {
    const val = secureRandomUint32();
    if (val < maxLimit) {
      return val % poolSize;
    }
  }
}

// Chi-Square Uniformity Test
function chiSquareTest(poolSize: number, samples: number) {
  const counts = new Array(poolSize).fill(0);
  for (let i = 0; i < samples; i++) {
    const idx = getUnbiasedIndex(poolSize);
    counts[idx]++;
  }

  const expected = samples / poolSize;
  let chiSquare = 0;
  for (let i = 0; i < poolSize; i++) {
    const diff = counts[i] - expected;
    chiSquare += (diff * diff) / expected;
  }

  // Degrees of freedom = poolSize - 1
  const df = poolSize - 1;
  return { poolSize, samples, expected, chiSquare, df, counts: counts.slice(0, 5) };
}

console.log("Testing Modulo Bias & Chi-Square across pools (100,000 samples each)...");
const testPools = [3, 5, 7, 10, 26, 62, 94];
for (const p of testPools) {
  const res = chiSquareTest(p, 100000);
  console.log(`Pool ${p}: Chi2 = ${res.chiSquare.toFixed(2)}, df = ${res.df}, ratio = ${(res.chiSquare / res.df).toFixed(2)}`);
}
