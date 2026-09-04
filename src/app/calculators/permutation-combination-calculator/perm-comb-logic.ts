/**
 * Core mathematical engine for Permutation & Combination Calculator & Combinatorics Suite
 */

// Helper to calculate BigInt factorial
export function bigFactorial(n: number): bigint {
  if (n < 0) return 0n;
  if (n === 0 || n === 1) return 1n;
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

// Helper to calculate nPr = n! / (n - r)!
export function bigPermutation(n: number, r: number): bigint {
  if (n < 0 || r < 0 || r > n) return 0n;
  let result = 1n;
  for (let i = BigInt(n); i > BigInt(n - r); i--) {
    result *= i;
  }
  return result;
}

// Helper to calculate nCr = n! / (r! * (n - r)!)
export function bigCombination(n: number, r: number): bigint {
  if (n < 0 || r < 0 || r > n) return 0n;
  const k = Math.min(r, n - r);
  let num = 1n;
  let den = 1n;
  for (let i = 1n; i <= BigInt(k); i++) {
    num *= BigInt(n) - i + 1n;
    den *= i;
  }
  return num / den;
}

// Helper to calculate nPr with repetition = n^r
export function bigPermutationRep(n: number, r: number): bigint {
  if (n < 0 || r < 0) return 0n;
  return BigInt(n) ** BigInt(r);
}

// Helper to calculate nCr with repetition = (n + r - 1)C(r)
export function bigCombinationRep(n: number, r: number): bigint {
  if (n <= 0 || r < 0) return 0n;
  if (r === 0) return 1n;
  return bigCombination(n + r - 1, r);
}

// Format BigInt values for display: Standard, Scientific Notation, or Log10
export function formatBigNumber(val: bigint, mode: "std" | "sci" | "log" = "std"): string {
  if (val === 0n) return "0";
  const str = val.toString();

  if (mode === "log") {
    // High-precision log10 calculation for arbitrary BigInt values
    if (val < 0n) return "0";
    if (val === 1n) return "10^0.0000";
    const prefixStr = str.slice(0, 15);
    const prefixNum = Number(prefixStr);
    const logVal = Math.log10(prefixNum) + (str.length - prefixStr.length);
    return `10^${logVal.toFixed(4)}`;
  }

  if (mode === "sci") {
    if (str.length <= 1) return str;
    const rawDec = str.slice(1, 5);
    const mantissa = rawDec.length > 0 ? `${str[0]}.${rawDec}` : str[0];
    const exponent = str.length - 1;
    return `${mantissa} × 10^${exponent}`;
  }

  if (str.length > 24) {
    const rawDec = str.slice(1, 5);
    const mantissa = rawDec.length > 0 ? `${str[0]}.${rawDec}` : str[0];
    const exponent = str.length - 1;
    return `${mantissa} × 10^${exponent}`;
  }

  // Standard comma formatted string
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export interface StandardCombinatoricsResult {
  n: number;
  r: number;
  nPr: bigint;
  nPrFormatted: string;
  nPrRep: bigint;
  nPrRepFormatted: string;
  nCr: bigint;
  nCrFormatted: string;
  nCrRep: bigint;
  nCrRepFormatted: string;
  nPrSteps: string;
  nCrSteps: string;
  nPrRepSteps: string;
  nCrRepSteps: string;
}

export function computeStandardCombinatorics(
  n: number,
  r: number,
  formatMode: "std" | "sci" | "log" = "std"
): StandardCombinatoricsResult {
  const nPrVal = bigPermutation(n, r);
  const nPrRepVal = bigPermutationRep(n, r);
  const nCrVal = bigCombination(n, r);
  const nCrRepVal = bigCombinationRep(n, r);

  // Steps
  const nPrSteps = r <= n
    ? `P(${n}, ${r}) = ${n}! / (${n} - ${r})! = ${n}! / ${n - r}! = ${formatBigNumber(nPrVal, formatMode)}`
    : `P(${n}, ${r}) = 0 (Cannot choose ${r} items from ${n} without replacement)`;

  const nCrSteps = r <= n
    ? `C(${n}, ${r}) = ${n}! / [ ${r}! × (${n} - ${r})! ] = ${n}! / [ ${r}! × ${n - r}! ] = ${formatBigNumber(nCrVal, formatMode)}`
    : `C(${n}, ${r}) = 0 (Cannot choose ${r} items from ${n} without replacement)`;

  const nPrRepSteps = `P^r(${n}, ${r}) = ${n}^${r} = ${formatBigNumber(nPrRepVal, formatMode)}`;

  const nCrRepSteps = n > 0
    ? `C^r(${n}, ${r}) = (${n} + ${r} - 1)! / [ ${r}! × (${n} - 1)! ] = ${n + r - 1}C${r} = ${formatBigNumber(nCrRepVal, formatMode)}`
    : `C^r(${n}, ${r}) = 0`;

  return {
    n,
    r,
    nPr: nPrVal,
    nPrFormatted: formatBigNumber(nPrVal, formatMode),
    nPrRep: nPrRepVal,
    nPrRepFormatted: formatBigNumber(nPrRepVal, formatMode),
    nCr: nCrVal,
    nCrFormatted: formatBigNumber(nCrVal, formatMode),
    nCrRep: nCrRepVal,
    nCrRepFormatted: formatBigNumber(nCrRepVal, formatMode),
    nPrSteps,
    nCrSteps,
    nPrRepSteps,
    nCrRepSteps
  };
}

/**
 * Item List Generator for small sets (n <= 8, r <= 5)
 */
export function generateCombinationsList(n: number, r: number): string[] {
  if (n <= 0 || r <= 0 || r > n || n > 8 || r > 5) return [];
  const labels = ["A", "B", "C", "D", "E", "F", "G", "H"].slice(0, n);
  const result: string[] = [];

  function helper(start: number, current: string[]) {
    if (current.length === r) {
      result.push(current.join(""));
      return;
    }
    for (let i = start; i < n; i++) {
      helper(i + 1, [...current, labels[i]]);
    }
  }

  helper(0, []);
  return result;
}

export function generatePermutationsList(n: number, r: number): string[] {
  if (n <= 0 || r <= 0 || r > n || n > 8 || r > 5) return [];
  const labels = ["A", "B", "C", "D", "E", "F", "G", "H"].slice(0, n);
  const result: string[] = [];

  function helper(used: boolean[], current: string[]) {
    if (current.length === r) {
      result.push(current.join(""));
      return;
    }
    for (let i = 0; i < n; i++) {
      if (!used[i]) {
        used[i] = true;
        helper(used, [...current, labels[i]]);
        used[i] = false;
      }
    }
  }

  helper(new Array(n).fill(false), []);
  return result;
}

/**
 * Circular & Symmetry Permutation Suite
 */
export interface CircularResult {
  n: number;
  circularPerm: bigint;
  circularFormatted: string;
  necklacePerm: bigint;
  necklaceFormatted: string;
  explanation: string;
}

export function computeCircularPermutations(n: number, formatMode: "std" | "sci" | "log" = "std"): CircularResult {
  if (n <= 0) {
    return {
      n,
      circularPerm: 0n,
      circularFormatted: "0",
      necklacePerm: 0n,
      necklaceFormatted: "0",
      explanation: "Invalid set size n."
    };
  }

  const circularPerm = bigFactorial(n - 1);
  const necklacePerm = n > 2 ? circularPerm / 2n : circularPerm;

  const explanation = `For n = ${n} distinct items arranged in a circle, rotating the circle yields ${n} equivalent arrangements, so total distinct circular arrangements = (n - 1)! = ${n - 1}! = ${formatBigNumber(circularPerm, formatMode)}. For necklaces/beads where 3D flipping (reflection) is indistinguishable, divide by 2: (n - 1)! / 2 = ${formatBigNumber(necklacePerm, formatMode)}.`;

  return {
    n,
    circularPerm,
    circularFormatted: formatBigNumber(circularPerm, formatMode),
    necklacePerm,
    necklaceFormatted: formatBigNumber(necklacePerm, formatMode),
    explanation
  };
}

/**
 * Multiset / Duplicate Characters Permutation Engine
 */
export interface MultisetResult {
  inputStr: string;
  n: number;
  uniqueCharCount: number;
  freqTable: { char: string; count: number }[];
  totalPermutations: bigint;
  formattedPermutations: string;
  stepText: string;
}

export function computeMultisetPermutations(inputStr: string, formatMode: "std" | "sci" | "log" = "std"): MultisetResult {
  const cleanStr = inputStr.replace(/\s+/g, "").toUpperCase();
  if (!cleanStr) {
    return {
      inputStr,
      n: 0,
      uniqueCharCount: 0,
      freqTable: [],
      totalPermutations: 0n,
      formattedPermutations: "0",
      stepText: "Please enter a word or string of characters."
    };
  }

  const freqMap: Record<string, number> = {};
  for (const ch of cleanStr) {
    freqMap[ch] = (freqMap[ch] || 0) + 1;
  }

  const n = cleanStr.length;
  const freqTable = Object.keys(freqMap).map(ch => ({ char: ch, count: freqMap[ch] }));

  let num = bigFactorial(n);
  let den = 1n;
  const denFactors: string[] = [];

  for (const item of freqTable) {
    den *= bigFactorial(item.count);
    if (item.count > 1) {
      denFactors.push(`${item.count}! (${item.char})`);
    }
  }

  const totalPermutations = num / den;
  const formattedPermutations = formatBigNumber(totalPermutations, formatMode);

  const stepText = denFactors.length > 0
    ? `Distinct Permutations = n! / (n1! × n2! × ...) = ${n}! / [ ${denFactors.join(" × ")} ] = ${formattedPermutations}`
    : `All ${n} characters are unique. Permutations = ${n}! = ${formattedPermutations}`;

  return {
    inputStr: cleanStr,
    n,
    uniqueCharCount: freqTable.length,
    freqTable,
    totalPermutations,
    formattedPermutations,
    stepText
  };
}

/**
 * Derangements / Subfactorial (!n) Engine
 */
export interface DerangementResult {
  n: number;
  subfactorial: bigint;
  formattedSubfactorial: string;
  totalPermutations: bigint;
  proportionPct: number;
  explanation: string;
  sampleDerangements: string[];
}

export function computeDerangements(n: number, formatMode: "std" | "sci" | "log" = "std"): DerangementResult {
  if (n < 0) {
    return {
      n,
      subfactorial: 0n,
      formattedSubfactorial: "0",
      totalPermutations: 0n,
      proportionPct: 0,
      explanation: "Invalid n",
      sampleDerangements: []
    };
  }

  // Calculate !n using recursive relation !n = (n - 1) * (!(n - 1) + !(n - 2))
  let d0 = 1n; // !0 = 1
  let d1 = 0n; // !1 = 0
  let dn = n === 0 ? 1n : (n === 1 ? 0n : 0n);

  if (n >= 2) {
    let prev2 = 1n;
    let prev1 = 0n;
    for (let i = 2; i <= n; i++) {
      dn = BigInt(i - 1) * (prev1 + prev2);
      prev2 = prev1;
      prev1 = dn;
    }
  }

  const totalPerm = bigFactorial(n);
  const formattedSubfactorial = formatBigNumber(dn, formatMode);
  // High-precision percentage rounding to 2 decimal places
  const prop = totalPerm > 0n ? Number((dn * 1000000n) / totalPerm) / 10000 : 0;

  const explanation = `Subfactorial !${n} calculates permutations where no item stays in its original spot. !${n} = ${formattedSubfactorial} out of ${formatBigNumber(totalPerm, formatMode)} total permutations (${prop.toFixed(2)}% ≈ 1/e = 36.79%).`;

  // Sample derangements for n = 3 or 4
  const sampleDerangements: string[] = [];
  if (n === 3) {
    sampleDerangements.push("BCA", "CAB");
  } else if (n === 4) {
    sampleDerangements.push("BADC", "BCDA", "BDAC", "CADB", "CDAB", "CDBA", "DABC", "DCAB", "DCBA");
  }

  return {
    n,
    subfactorial: dn,
    formattedSubfactorial,
    totalPermutations: totalPerm,
    proportionPct: parseFloat(prop.toFixed(2)),
    explanation,
    sampleDerangements
  };
}

/**
 * Binomial Coefficient & Pascal's Triangle Inspector
 */
export interface PascalResult {
  n: number;
  k: number;
  binomCoeff: bigint;
  formattedBinom: string;
  rowCoeffs: bigint[];
  formattedRowCoeffs: string[];
  rowSum: bigint;
  formattedRowSum: string;
  symmetryText: string;
}

export function computePascalTriangle(n: number, k: number, formatMode: "std" | "sci" | "log" = "std"): PascalResult {
  const safeN = Math.max(0, n);
  const safeK = Math.max(0, Math.min(k, safeN));

  const binomCoeff = bigCombination(safeN, safeK);
  const formattedBinom = formatBigNumber(binomCoeff, formatMode);

  const rowCoeffs: bigint[] = [];
  const formattedRowCoeffs: string[] = [];
  for (let i = 0; i <= safeN; i++) {
    const c = bigCombination(safeN, i);
    rowCoeffs.push(c);
    formattedRowCoeffs.push(formatBigNumber(c, formatMode));
  }

  const rowSum = BigInt(2) ** BigInt(safeN);
  const formattedRowSum = formatBigNumber(rowSum, formatMode);

  const symmetryText = `C(${safeN}, ${safeK}) = C(${safeN}, ${safeN - safeK}) = ${formattedBinom}`;

  return {
    n: safeN,
    k: safeK,
    binomCoeff,
    formattedBinom,
    rowCoeffs,
    formattedRowCoeffs,
    rowSum,
    formattedRowSum,
    symmetryText
  };
}

/**
 * Combinatorial Hypergeometric Probability & Odds Engine
 */
export interface HypergeometricResult {
  N: number;
  K: number;
  n: number;
  k: number;
  totalOutcomes: bigint;
  favorableOutcomes: bigint;
  probability: number;
  probabilityPct: string;
  oddsRatioStr: string;
  stepText: string;
}

export function computeHypergeometricProbability(
  N: number,
  K: number,
  n: number,
  k: number
): HypergeometricResult {
  if (N <= 0 || K < 0 || n < 0 || k < 0 || K > N || n > N || k > K || k > n || (n - k) > (N - K)) {
    return {
      N,
      K,
      n,
      k,
      totalOutcomes: 0n,
      favorableOutcomes: 0n,
      probability: 0,
      probabilityPct: "0%",
      oddsRatioStr: "N/A",
      stepText: "Invalid hypergeometric parameters."
    };
  }

  const totalOutcomes = bigCombination(N, n);
  const favSuccess = bigCombination(K, k);
  const favFailure = bigCombination(N - K, n - k);
  const favorableOutcomes = favSuccess * favFailure;

  const prob = totalOutcomes > 0n ? Number((favorableOutcomes * 1000000n) / totalOutcomes) / 1000000 : 0;
  const probPct = `${(prob * 100).toFixed(4)}%`;
  const oddsOneIn = prob > 0 ? (1 / prob).toFixed(2) : "Infinity";
  const oddsRatioStr = prob > 0 ? `1 in ${Number(oddsOneIn).toLocaleString()}` : "0";

  const stepText = `P(X = ${k}) = [ C(${K}, ${k}) × C(${N - K}, ${n - k}) ] / C(${N}, ${n}) = [ ${favSuccess} × ${favFailure} ] / ${totalOutcomes} = ${prob.toFixed(6)}`;

  return {
    N,
    K,
    n,
    k,
    totalOutcomes,
    favorableOutcomes,
    probability: prob,
    probabilityPct: probPct,
    oddsRatioStr,
    stepText
  };
}
