function calculateConstrainedSearchSpace(categorySizes: number[], L: number): { log10: number; entropy: number; formatted: string } {
  const k = categorySizes.length;
  if (k === 0 || L <= 0) return { log10: 0, entropy: 0, formatted: "0" };
  if (L < k) return { log10: 0, entropy: 0, formatted: "0" };

  const N = categorySizes.reduce((a, b) => a + b, 0);
  
  // If k === 1, every character trivially belongs to the category
  if (k === 1) {
    const entropy = L * Math.log2(N);
    const log10 = L * Math.log10(N);
    const exp = Math.floor(log10);
    const mant = Math.pow(10, log10 - exp);
    return {
      log10,
      entropy: Math.round(entropy),
      formatted: log10 > 12 ? `~${mant.toFixed(2)}e+${exp}` : Math.round(Math.pow(10, log10)).toLocaleString()
    };
  }

  // Use BigInt for exact integer arithmetic when L is moderate, or log scaling for large
  // For L <= 128 and N <= 94, BigInt handles exact values without overflow!
  let totalWays = 0n;
  const numSubsets = 1 << k;

  for (let mask = 0; mask < numSubsets; mask++) {
    let subsetSum = 0;
    let bitCount = 0;
    for (let i = 0; i < k; i++) {
      if ((mask & (1 << i)) !== 0) {
        subsetSum += categorySizes[i];
        bitCount++;
      }
    }
    const remainingPool = BigInt(N - subsetSum);
    const term = remainingPool ** BigInt(L);
    if (bitCount % 2 === 0) {
      totalWays += term;
    } else {
      totalWays -= term;
    }
  }

  if (totalWays <= 0n) {
    return { log10: 0, entropy: 0, formatted: "0" };
  }

  // Convert BigInt to log10 and entropy
  const s = totalWays.toString();
  const digits = s.length;
  const prefix = parseFloat(s.substring(0, 15));
  const log10 = (digits - 15) + Math.log10(prefix);
  const entropy = log10 * Math.LOG2E / Math.LOG10E; // log2(totalWays)
  const exp = digits - 1;
  const mant = prefix / Math.pow(10, 14);

  return {
    log10,
    entropy: Math.round(entropy),
    formatted: exp >= 12 ? `~${mant.toFixed(2)}e+${exp}` : Number(totalWays).toLocaleString()
  };
}

console.log("Standard 94^16 unconstrained:", {
  entropy: Math.round(16 * Math.log2(94)),
  space: `~${(Math.pow(10, 16 * Math.log10(94) - Math.floor(16 * Math.log10(94)))).toFixed(2)}e+${Math.floor(16 * Math.log10(94))}`
});

console.log("Constrained (require all 4 categories [26, 26, 10, 32]):",
  calculateConstrainedSearchSpace([26, 26, 10, 32], 16)
);

console.log("Constrained (require all 4 categories [26, 26, 10, 25]):",
  calculateConstrainedSearchSpace([26, 26, 10, 25], 16)
);
