import {
  bigFactorial,
  bigPermutation,
  bigCombination,
  bigPermutationRep,
  bigCombinationRep,
  formatBigNumber,
  computeStandardCombinatorics,
  computeCircularPermutations,
  computeMultisetPermutations,
  computeDerangements,
  computePascalTriangle,
  computeHypergeometricProbability
} from "../src/app/calculators/permutation-combination-calculator/perm-comb-logic";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`FAIL: ${msg}`);
  }
}

console.log("Starting Randomized Mathematical Property Testing (10,000 cases)...");

// 1. Core Combinatorial Identities
for (let iter = 0; iter < 2000; iter++) {
  const n = Math.floor(Math.random() * 60); // 0 to 59
  const r = Math.floor(Math.random() * (n + 1)); // 0 to n

  // nC0 = 1
  assert(bigCombination(n, 0) === 1n, `nC0 = 1 for n=${n}`);
  // nCn = 1
  assert(bigCombination(n, n) === 1n, `nCn = 1 for n=${n}`);
  // nP0 = 1
  assert(bigPermutation(n, 0) === 1n, `nP0 = 1 for n=${n}`);
  // nPn = n!
  assert(bigPermutation(n, n) === bigFactorial(n), `nPn = n! for n=${n}`);

  // Symmetry: nCr = nC(n-r)
  const nCr = bigCombination(n, r);
  const nC_diff = bigCombination(n, n - r);
  assert(nCr === nC_diff, `nCr == nC(n-r) for n=${n}, r=${r}`);

  // nPr = nCr * r!
  const nPr = bigPermutation(n, r);
  const rFact = bigFactorial(r);
  assert(nPr === nCr * rFact, `nPr == nCr * r! for n=${n}, r=${r}`);

  // C(n,r) >= 0
  assert(nCr >= 0n, `nCr >= 0 for n=${n}, r=${r}`);

  // P(n,r) >= C(n,r) for r >= 1
  if (r >= 1) {
    assert(nPr >= nCr, `P(n,r) >= C(n,r) for n=${n}, r=${r}`);
  }

  // Permutation with repetition n^r >= nPr
  const nPrRep = bigPermutationRep(n, r);
  assert(nPrRep >= nPr, `n^r >= nPr for n=${n}, r=${r}`);

  // Combination with repetition C(n+r-1, r)
  if (n > 0) {
    const nCrRep = bigCombinationRep(n, r);
    assert(nCrRep >= nCr, `C^r >= C for n=${n}, r=${r}`);
  }
}

// 2. Pascal Row Sum: sum(C(n,k)) = 2^n
for (let n = 0; n <= 40; n++) {
  const row = computePascalTriangle(n, 0, "std");
  const expectedSum = 2n ** BigInt(n);
  assert(row.rowSum === expectedSum, `Pascal row sum 2^${n}`);
  let sumCoeffs = 0n;
  for (const c of row.rowCoeffs) {
    sumCoeffs += c;
  }
  assert(sumCoeffs === expectedSum, `Sum of Pascal coeffs for n=${n}`);
}

// 3. Derangements Recurrence: !n = (n - 1) * (!(n-1) + !(n-2))
let derangPrev2 = 1n; // !0 = 1
let derangPrev1 = 0n; // !1 = 0
for (let n = 2; n <= 40; n++) {
  const expectedDn = BigInt(n - 1) * (derangPrev1 + derangPrev2);
  const res = computeDerangements(n, "std");
  assert(res.subfactorial === expectedDn, `Derangement recurrence for n=${n}`);
  derangPrev2 = derangPrev1;
  derangPrev1 = expectedDn;
}

// 4. Hypergeometric Probability Distribution: sum P(X=k) over all valid k == 1
const testHyperParams = [
  { N: 52, K: 13, n: 5 },
  { N: 20, K: 7, n: 4 },
  { N: 30, K: 10, n: 8 },
  { N: 100, K: 40, n: 10 },
  { N: 10, K: 10, n: 5 },
  { N: 525, K: 13, n: 5 }
];

for (const p of testHyperParams) {
  const kMin = Math.max(0, p.n - (p.N - p.K));
  const kMax = Math.min(p.K, p.n);
  let totalFav = 0n;
  let totalProb = 0;
  for (let k = kMin; k <= kMax; k++) {
    const res = computeHypergeometricProbability(p.N, p.K, p.n, k);
    assert(res.probability >= 0 && res.probability <= 1, `0 <= P(X=${k}) <= 1 for N=${p.N}, K=${p.K}, n=${p.n}`);
    totalFav += res.favorableOutcomes;
    totalProb += res.probability;
  }
  const totalOutcomes = bigCombination(p.N, p.n);
  assert(totalFav === totalOutcomes, `Sum of favorable outcomes equals total outcomes for N=${p.N}, K=${p.K}, n=${p.n}`);
  assert(Math.abs(totalProb - 1.0) < 1e-4, `Sum of probabilities ≈ 1 for N=${p.N}, K=${p.K}, n=${p.n} (actual: ${totalProb})`);
}

// 5. Large Number & Extreme Boundary Audit
console.log("\nTesting Large Numbers...");
const largeCases = [
  { n: 20, r: 10 },
  { n: 50, r: 25 },
  { n: 100, r: 50 },
  { n: 200, r: 100 },
  { n: 500, r: 250 },
  { n: 1000, r: 500 }
];

for (const c of largeCases) {
  const resStd = computeStandardCombinatorics(c.n, c.r, "std");
  const resSci = computeStandardCombinatorics(c.n, c.r, "sci");
  const resLog = computeStandardCombinatorics(c.n, c.r, "log");

  assert(resStd.nPr > 0n, `Large nPr > 0 for n=${c.n}, r=${c.r}`);
  assert(resStd.nCr > 0n, `Large nCr > 0 for n=${c.n}, r=${c.r}`);
  assert(resStd.nPrRep > 0n, `Large nPrRep > 0 for n=${c.n}, r=${c.r}`);
  assert(resStd.nCrRep > 0n, `Large nCrRep > 0 for n=${c.n}, r=${c.r}`);

  // No NaN or Infinity in formatted strings
  assert(!resStd.nPrFormatted.includes("NaN") && !resStd.nPrFormatted.includes("Infinity"), `resStd nPr no NaN/Inf for n=${c.n}`);
  assert(!resSci.nPrFormatted.includes("NaN") && !resSci.nPrFormatted.includes("Infinity"), `resSci nPr no NaN/Inf for n=${c.n}`);
  assert(!resLog.nPrFormatted.includes("NaN") && !resLog.nPrFormatted.includes("Infinity"), `resLog nPr no NaN/Inf for n=${c.n}`);
}

console.log(`\nProperty Tests Completed: ${passedTests}/${totalTests} PASSED, ${failedTests} FAILED.`);
