/**
 * Core mathematical engine for Probability Calculator & Combinatorics Suite
 */

export interface TwoEventResult {
  pA: number;
  pB: number;
  pNotA: number;
  pNotB: number;
  pIntersection: number; // P(A ∩ B)
  pUnion: number;        // P(A ∪ B)
  pXor: number;          // P(A XOR B)
  pNeither: number;      // P((A ∪ B)')
  pAGivenB: number;      // P(A | B)
  pBGivenA: number;      // P(B | A)
  oddsA: string;
  oddsB: string;
}

export interface SeriesResult {
  pAll: number;
  pNone: number;
  pAtLeastOne: number;
}

export interface BayesResult {
  posteriorA: number; // P(A | B)
  posteriorNotA: number; // P(A' | B)
  tpPct: number;
  fpPct: number;
  fnPct: number;
  tnPct: number;
  ppvPct: number;
  npvPct: number;
}

export interface BinomialResult {
  pExact: number;     // P(X = k)
  pLessEqual: number; // P(X <= k)
  pGreaterEqual: number; // P(X >= k)
  expectedValue: number; // E[X] = np
  variance: number;   // Var(X) = np(1-p)
  pmfList: { k: number; p: number }[];
}

export interface CombinatoricsResult {
  permutations: string; // P(n, r)
  combinations: string; // C(n, r)
  factorialN: string;   // n!
}

/**
 * Parse raw decimal (0.5), percentage (50%), or fraction (1/6) into float 0 <= P <= 1
 */
export function parseProbabilityInput(input: string | number): number {
  if (typeof input === "number") {
    if (input < 0) return 0;
    if (input > 1) return Math.min(1, input / 100);
    return input;
  }

  const str = input.trim();
  if (!str) return 0;

  if (str.includes("/")) {
    const parts = str.split("/");
    const num = parseFloat(parts[0]);
    const den = parseFloat(parts[1]);
    if (!Number.isNaN(num) && !Number.isNaN(den) && den !== 0) {
      return Math.min(1, Math.max(0, num / den));
    }
  }

  if (str.endsWith("%")) {
    const num = parseFloat(str.replace("%", ""));
    if (!Number.isNaN(num)) {
      return Math.min(1, Math.max(0, num / 100));
    }
  }

  const num = parseFloat(str);
  if (Number.isNaN(num)) return 0;
  if (num > 1) return Math.min(1, num / 100);
  return Math.min(1, Math.max(0, num));
}

/**
 * Format decimal to simplified fraction (e.g. 0.166667 -> "1/6")
 */
export function formatAsFraction(val: number): string {
  if (val <= 0) return "0";
  if (val >= 1) return "1";

  const tolerance = 1e-6;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = val;

  do {
    const a = Math.floor(b);
    let aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    aux = k1;
    k1 = a * k1 + k2;
    k2 = aux;
    b = 1 / (b - a);
  } while (Math.abs(val - h1 / k1) > val * tolerance && k1 < 10000);

  return `${h1}/${k1}`;
}

/**
 * Format probability as Odds Ratio (Odds in Favor)
 */
export function formatAsOdds(val: number): string {
  if (val <= 0) return "0 : 1";
  if (val >= 1) return "1 : 0";
  const oddsFav = val / (1 - val);
  return `${oddsFav.toFixed(2)} : 1`;
}

/**
 * Mode 1: Two-Event Boolean Set Operations (A and B)
 */
export function computeTwoEventProbability(
  pAInput: string | number,
  pBInput: string | number,
  relationType: "independent" | "exclusive" | "dependent" = "independent",
  customIntersection?: number
): TwoEventResult {
  const pA = parseProbabilityInput(pAInput);
  const pB = parseProbabilityInput(pBInput);

  const pNotA = 1 - pA;
  const pNotB = 1 - pB;

  let pIntersection = 0;
  if (relationType === "independent") {
    pIntersection = pA * pB;
  } else if (relationType === "exclusive") {
    pIntersection = 0;
  } else if (customIntersection !== undefined) {
    pIntersection = Math.min(pA, pB, Math.max(0, customIntersection));
  } else {
    pIntersection = pA * pB;
  }

  const pUnion = Math.min(1, pA + pB - pIntersection);
  const pXor = Math.max(0, pUnion - pIntersection);
  const pNeither = Math.max(0, 1 - pUnion);

  const pAGivenB = pB > 0 ? pIntersection / pB : 0;
  const pBGivenA = pA > 0 ? pIntersection / pA : 0;

  return {
    pA,
    pB,
    pNotA,
    pNotB,
    pIntersection,
    pUnion,
    pXor,
    pNeither,
    pAGivenB,
    pBGivenA,
    oddsA: formatAsOdds(pA),
    oddsB: formatAsOdds(pB)
  };
}

/**
 * Mode 2: Multi-Event Series & Complement Rules (N Trials)
 */
export function computeMultiEventSeries(pAInput: string | number, nTrials: number): SeriesResult {
  const pA = parseProbabilityInput(pAInput);
  const n = Math.max(1, Math.floor(nTrials));

  const pAll = Math.pow(pA, n);
  const pNone = Math.pow(1 - pA, n);
  const pAtLeastOne = 1 - pNone;

  return { pAll, pNone, pAtLeastOne };
}

/**
 * Mode 3: Bayes' Theorem & Diagnostic Confusion Matrix
 */
export function computeBayesTheorem(
  priorA: number = 0.01,        // Base rate P(A) e.g. 1%
  sensitivity: number = 0.99,   // True Positive Rate P(B|A) e.g. 99%
  falsePositive: number = 0.05  // False Positive Rate P(B|A') e.g. 5%
): BayesResult {
  const pA = Math.max(0, Math.min(1, priorA));
  const pNotA = 1 - pA;
  const pBGivenA = Math.max(0, Math.min(1, sensitivity));
  const pBGivenNotA = Math.max(0, Math.min(1, falsePositive));

  const pB = pBGivenA * pA + pBGivenNotA * pNotA;
  const posteriorA = pB > 0 ? (pBGivenA * pA) / pB : 0;
  const posteriorNotA = 1 - posteriorA;

  const tpPct = pBGivenA * pA * 100;
  const fpPct = pBGivenNotA * pNotA * 100;
  const fnPct = (1 - pBGivenA) * pA * 100;
  const tnPct = (1 - pBGivenNotA) * pNotA * 100;

  const ppvPct = tpPct + fpPct > 0 ? (tpPct / (tpPct + fpPct)) * 100 : 0;
  const npvPct = tnPct + fnPct > 0 ? (tnPct / (tnPct + fnPct)) * 100 : 0;

  return {
    posteriorA,
    posteriorNotA,
    tpPct,
    fpPct,
    fnPct,
    tnPct,
    ppvPct,
    npvPct
  };
}

/**
 * Mode 4: Binomial Distribution Solver P(X = k)
 */
export function computeBinomialDistribution(n: number, pInput: string | number, k: number): BinomialResult {
  const p = parseProbabilityInput(pInput);
  const trials = Math.max(1, Math.floor(n));
  const targetK = Math.max(0, Math.min(trials, Math.floor(k)));

  const pmfList: { k: number; p: number }[] = [];
  let pExact = 0;
  let pLessEqual = 0;
  let pGreaterEqual = 0;

  for (let i = 0; i <= trials; i++) {
    const prob = binomialPMF(trials, p, i);
    pmfList.push({ k: i, p: prob });

    if (i === targetK) pExact = prob;
    if (i <= targetK) pLessEqual += prob;
    if (i >= targetK) pGreaterEqual += prob;
  }

  const expectedValue = trials * p;
  const variance = trials * p * (1 - p);

  return {
    pExact,
    pLessEqual,
    pGreaterEqual,
    expectedValue,
    variance,
    pmfList
  };
}

function binomialPMF(n: number, p: number, k: number): number {
  if (k < 0 || k > n) return 0;
  const comb = combinationsNum(n, k);
  return comb * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function combinationsNum(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  if (r === 0 || r === n) return 1;
  const k = Math.min(r, n - r);
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = (c * (n - i + 1)) / i;
  }
  return c;
}

/**
 * Mode 5: BigInt Permutations and Combinations
 */
export function computeCombinatorics(n: number, r: number): CombinatoricsResult {
  if (n < 0 || r < 0 || r > n) {
    return { permutations: "0", combinations: "0", factorialN: "0" };
  }

  let factN = 1n;
  for (let i = 1n; i <= BigInt(n); i++) {
    factN *= i;
  }

  let perm = 1n;
  for (let i = BigInt(n - r + 1); i <= BigInt(n); i++) {
    perm *= i;
  }

  const k = Math.min(r, n - r);
  let num = 1n;
  let den = 1n;
  for (let i = 1n; i <= BigInt(k); i++) {
    num *= BigInt(n) - i + 1n;
    den *= i;
  }
  const comb = num / den;

  return {
    permutations: perm.toString(),
    combinations: comb.toString(),
    factorialN: factN.toString()
  };
}
