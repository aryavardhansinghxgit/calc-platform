/**
 * Core mathematical engine for Probability Calculator & Solver
 */

export interface TwoEventResult {
  pA: number;
  pB: number;
  pNotA: number;
  pNotB: number;
  pIntersection: number; // P(A ∩ B)
  pUnion: number;        // P(A ∪ B)
  pXor: number;          // P(A Δ B)
  pNeither: number;      // P((A ∪ B)')
  pAnotB: number;        // P(A occur but NOT B)
  pBnotA: number;        // P(B occur but NOT A)
  pAGivenB: number;      // P(A | B)
  pBGivenA: number;      // P(B | A)
  oddsA: string;
  oddsB: string;
}

export interface SeriesEventsResult {
  pAAll: number;           // P(A occurring nA times) = pA^nA
  pANone: number;          // P(A NOT occurring) = (1 - pA)^nA
  pAAtLeastOne: number;    // P(A occurring) = 1 - (1 - pA)^nA
  pBAll: number;           // P(B occurring nB times) = pB^nB
  pBNone: number;          // P(B NOT occurring) = (1 - pB)^nB
  pBAtLeastOne: number;    // P(B occurring) = 1 - (1 - pB)^nB
  pBothExact: number;      // P(A nA times and B nB times)
  pNeither: number;        // P(neither A nor B)
  pBothAtLeastOne: number; // P(both A and B occurring)
  pAExactNotB: number;     // P(A nA times but not B)
  pBExactNotA: number;     // P(B nB times but not A)
  pAAtLeastOneNotB: number;// P(A occurring but not B)
  pBAtLeastOneNotA: number;// P(B occurring but not A)
}

export interface NormalDistributionResult {
  mean: number;
  stdDev: number;
  leftBound: number; // number or -Infinity
  rightBound: number; // number or Infinity
  leftBoundStr: string;
  rightBoundStr: string;
  probBetween: number;
  probOutside: number;
  probLessEqualLeft: number;
  probGreaterEqualRight: number;
}

export interface ConfidenceIntervalRow {
  confidence: number;
  confidenceStr: string;
  lowerBound: number;
  upperBound: number;
  rangeStr: string;
  nValue: number;
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
 * Mode 1: Probability of Two Independent Events
 */
export function computeTwoEventProbability(
  pAInput: string | number,
  pBInput: string | number
): TwoEventResult {
  const pA = parseProbabilityInput(pAInput);
  const pB = parseProbabilityInput(pBInput);

  const pNotA = 1 - pA;
  const pNotB = 1 - pB;

  const pIntersection = pA * pB;
  const pUnion = Math.min(1, pA + pB - pIntersection);
  const pXor = Math.max(0, pUnion - pIntersection);
  const pNeither = Math.max(0, (1 - pA) * (1 - pB));
  const pAnotB = pA * (1 - pB);
  const pBnotA = (1 - pA) * pB;

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
    pAnotB,
    pBnotA,
    pAGivenB,
    pBGivenA,
    oddsA: formatAsOdds(pA),
    oddsB: formatAsOdds(pB)
  };
}

/**
 * Mode 1.5: Probability Solver for Two Events
 * Solves for P(A) and P(B) given any 2 known input values among the 8 fields.
 */
export function solveTwoEvents(inputs: {
  pA?: string;
  pB?: string;
  pNotA?: string;
  pNotB?: string;
  pAandB?: string;
  pAorB?: string;
  pAxorB?: string;
  pNeither?: string;
}): { solved: boolean; result?: TwoEventResult; givenSummary?: string; steps?: string[] } {
  let knownPA: number | null = null;
  let knownPB: number | null = null;
  let knownAandB: number | null = null;
  let knownAorB: number | null = null;
  let knownAxorB: number | null = null;
  let knownNeither: number | null = null;

  const steps: string[] = [];

  if (inputs.pA && inputs.pA.trim() !== "") knownPA = parseProbabilityInput(inputs.pA);
  if (inputs.pNotA && inputs.pNotA.trim() !== "") knownPA = 1 - parseProbabilityInput(inputs.pNotA);

  if (inputs.pB && inputs.pB.trim() !== "") knownPB = parseProbabilityInput(inputs.pB);
  if (inputs.pNotB && inputs.pNotB.trim() !== "") knownPB = 1 - parseProbabilityInput(inputs.pNotB);

  if (inputs.pAandB && inputs.pAandB.trim() !== "") knownAandB = parseProbabilityInput(inputs.pAandB);
  if (inputs.pAorB && inputs.pAorB.trim() !== "") knownAorB = parseProbabilityInput(inputs.pAorB);
  if (inputs.pAxorB && inputs.pAxorB.trim() !== "") knownAxorB = parseProbabilityInput(inputs.pAxorB);
  if (inputs.pNeither && inputs.pNeither.trim() !== "") knownNeither = parseProbabilityInput(inputs.pNeither);

  // If neither P(A) nor P(B) known, infer from relations
  let pa = knownPA;
  let pb = knownPB;

  if (pa !== null && pb !== null) {
    steps.push(`Given: P(A) = ${pa} and P(B) = ${pb}`);
  } else if (pa !== null && knownAandB !== null) {
    pb = pa > 0 ? knownAandB / pa : 0;
    steps.push(`Given: P(A) = ${pa} & P(A∩B) = ${knownAandB}`);
    steps.push(`P(B) = P(A∩B) / P(A) = ${knownAandB} / ${pa} = ${pb}`);
  } else if (pb !== null && knownAandB !== null) {
    pa = pb > 0 ? knownAandB / pb : 0;
    steps.push(`Given: P(B) = ${pb} & P(A∩B) = ${knownAandB}`);
    steps.push(`P(A) = P(A∩B) / P(B) = ${knownAandB} / ${pb} = ${pa}`);
  } else if (pa !== null && knownAorB !== null) {
    pb = pa < 1 ? (knownAorB - pa) / (1 - pa) : 0;
    steps.push(`Given: P(A) = ${pa} & P(A∪B) = ${knownAorB}`);
    steps.push(`P(B) = (P(A∪B) - P(A)) / (1 - P(A)) = (${knownAorB} - ${pa}) / (1 - ${pa}) = ${pb}`);
  } else if (pb !== null && knownAorB !== null) {
    pa = pb < 1 ? (knownAorB - pb) / (1 - pb) : 0;
    steps.push(`Given: P(B) = ${pb} & P(A∪B) = ${knownAorB}`);
    steps.push(`P(A) = (P(A∪B) - P(B)) / (1 - P(B)) = (${knownAorB} - ${pb}) / (1 - ${pb}) = ${pa}`);
  } else if (knownAandB !== null && knownAorB !== null) {
    const sum = knownAorB + knownAandB;
    const prod = knownAandB;
    const disc = sum * sum - 4 * prod;
    if (disc >= 0) {
      pa = (sum + Math.sqrt(disc)) / 2;
      pb = (sum - Math.sqrt(disc)) / 2;
      if (pa > 1 || pb < 0) {
        const tmp = pa; pa = pb; pb = tmp;
      }
      steps.push(`Given: P(A∩B) = ${knownAandB} & P(A∪B) = ${knownAorB}`);
      steps.push(`P(A) + P(B) = P(A∪B) + P(A∩B) = ${sum}`);
      steps.push(`P(A) × P(B) = ${prod}`);
      steps.push(`Solving quadratic gives P(A) = ${pa}, P(B) = ${pb}`);
    }
  } else if (knownAandB !== null && knownNeither !== null) {
    const sum = 1 + knownAandB - knownNeither;
    const prod = knownAandB;
    const disc = sum * sum - 4 * prod;
    if (disc >= 0) {
      pa = (sum + Math.sqrt(disc)) / 2;
      pb = (sum - Math.sqrt(disc)) / 2;
      steps.push(`Given: P(A∩B) = ${knownAandB} & P((A∪B)') = ${knownNeither}`);
      steps.push(`Solving quadratic gives P(A) = ${pa}, P(B) = ${pb}`);
    }
  }

  if (pa === null || pb === null || Number.isNaN(pa) || Number.isNaN(pb)) {
    // Default fallback to 0.5 and 0.4 if unsolvable
    pa = pa !== null ? pa : 0.5;
    pb = pb !== null ? pb : 0.4;
  }

  const result = computeTwoEventProbability(pa, pb);

  if (steps.length === 0) {
    steps.push(`Given: P(A) = ${result.pA} & P(B) = ${result.pB}`);
  }

  steps.push(`P(A∪B) = P(A) + P(B) - P(A∩B) = ${result.pA} + ${result.pB} - ${result.pIntersection} = ${result.pUnion}`);
  steps.push(`P(AΔB) = P(A) + P(B) - 2P(A∩B) = ${result.pA} + ${result.pB} - 2×${result.pIntersection} = ${result.pXor}`);
  steps.push(`P(A') = 1 - P(A) = 1 - ${result.pA} = ${result.pNotA}`);
  steps.push(`P(B') = 1 - P(B) = 1 - ${result.pB} = ${result.pNotB}`);
  steps.push(`P((A∪B)') = 1 - P(A∪B) = 1 - ${result.pUnion} = ${result.pNeither}`);

  return {
    solved: true,
    result,
    givenSummary: steps[0],
    steps
  };
}

/**
 * Mode 2: Probability of a Series of Independent Events
 */
export function computeSeriesEvents(
  pAInput: string | number,
  repeatAInput: number,
  pBInput: string | number,
  repeatBInput: number
): SeriesEventsResult {
  const pA = parseProbabilityInput(pAInput);
  const nA = Math.max(1, Math.floor(repeatAInput || 1));
  const pB = parseProbabilityInput(pBInput);
  const nB = Math.max(1, Math.floor(repeatBInput || 1));

  const pAAll = Math.pow(pA, nA);
  const pANone = Math.pow(1 - pA, nA);
  const pAAtLeastOne = 1 - pANone;

  const pBAll = Math.pow(pB, nB);
  const pBNone = Math.pow(1 - pB, nB);
  const pBAtLeastOne = 1 - pBNone;

  const pBothExact = pAAll * pBAll;
  const pNeither = pANone * pBNone;
  const pBothAtLeastOne = pAAtLeastOne * pBAtLeastOne;

  const pAExactNotB = pAAll * pBNone;
  const pBExactNotA = pANone * pBAll;

  const pAAtLeastOneNotB = pAAtLeastOne * pBNone;
  const pBAtLeastOneNotA = pANone * pBAtLeastOne;

  return {
    pAAll,
    pANone,
    pAAtLeastOne,
    pBAll,
    pBNone,
    pBAtLeastOne,
    pBothExact,
    pNeither,
    pBothAtLeastOne,
    pAExactNotB,
    pBExactNotA,
    pAAtLeastOneNotB,
    pBAtLeastOneNotA
  };
}

/**
 * Standard Normal Cumulative Distribution Function Φ(z)
 * Accurate Abramowitz & Stegun 26.2.17 approximation
 */
export function normalCDF(x: number, mean: number = 0, stdDev: number = 1): number {
  if (stdDev <= 0) return x >= mean ? 1 : 0;
  const z = (x - mean) / stdDev;
  if (z < -8) return 0;
  if (z > 8) return 1;

  const absZ = Math.abs(z);
  const p = 0.2316419;
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;

  const t = 1 / (1 + p * absZ);
  const poly = t * (b1 + t * (b2 + t * (b3 + t * (b4 + t * b5))));
  const pdf = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * absZ * absZ);
  const cdfAbs = 1 - pdf * poly;

  return z >= 0 ? cdfAbs : 1 - cdfAbs;
}

/**
 * Inverse Normal Cumulative Distribution Function (Probits)
 * Acklam's algorithm
 */
export function inverseNormalCDF(p: number): number {
  if (p <= 0) return -Infinity;
  if (p >= 1) return Infinity;
  if (p === 0.5) return 0;

  const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
  const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
  const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
  const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];

  const p_low = 0.02425;
  const p_high = 1 - p_low;
  let q: number, r: number;

  if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  } else if (p <= p_high) {
    q = p - 0.5;
    r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
}

/**
 * Mode 3: Probability of a Normal Distribution
 */
export function computeNormalDistribution(
  meanInput: number = 0,
  stdDevInput: number = 1,
  leftBoundStr: string = "-1",
  rightBoundStr: string = "1"
): NormalDistributionResult {
  const mean = Number.isNaN(meanInput) ? 0 : meanInput;
  const stdDev = Number.isNaN(stdDevInput) || stdDevInput <= 0 ? 1 : stdDevInput;

  let leftBound = -1;
  const lbTrim = (leftBoundStr || "").trim().toLowerCase();
  if (lbTrim === "-inf" || lbTrim === "-infinity") {
    leftBound = -Infinity;
  } else {
    const val = parseFloat(lbTrim);
    leftBound = Number.isNaN(val) ? -1 : val;
  }

  let rightBound = 1;
  const rbTrim = (rightBoundStr || "").trim().toLowerCase();
  if (rbTrim === "inf" || rbTrim === "infinity" || rbTrim === "+inf") {
    rightBound = Infinity;
  } else {
    const val = parseFloat(rbTrim);
    rightBound = Number.isNaN(val) ? 1 : val;
  }

  const cdfLeft = leftBound === -Infinity ? 0 : normalCDF(leftBound, mean, stdDev);
  const cdfRight = rightBound === Infinity ? 1 : normalCDF(rightBound, mean, stdDev);

  const probBetween = Math.max(0, cdfRight - cdfLeft);
  const probOutside = Math.max(0, 1 - probBetween);
  const probLessEqualLeft = cdfLeft;
  const probGreaterEqualRight = Math.max(0, 1 - cdfRight);

  return {
    mean,
    stdDev,
    leftBound,
    rightBound,
    leftBoundStr: lbTrim === "-inf" ? "-inf" : leftBound.toString(),
    rightBoundStr: rbTrim === "inf" ? "inf" : rightBound.toString(),
    probBetween,
    probOutside,
    probLessEqualLeft,
    probGreaterEqualRight
  };
}

/**
 * Generate Confidence Intervals Table for Normal Distribution
 */
export function generateConfidenceIntervalsTable(
  mean: number = 0,
  stdDev: number = 1
): ConfidenceIntervalRow[] {
  const levels = [
    { conf: 0.6828, nFix: 1 },
    { conf: 0.80 },
    { conf: 0.90 },
    { conf: 0.95 },
    { conf: 0.98 },
    { conf: 0.99 },
    { conf: 0.995 },
    { conf: 0.998 },
    { conf: 0.999 },
    { conf: 0.9999 },
    { conf: 0.99999 }
  ];

  return levels.map((item) => {
    const conf = item.conf;
    let n = item.nFix !== undefined ? item.nFix : inverseNormalCDF(0.5 + conf / 2);
    if (Number.isNaN(n) || !Number.isFinite(n)) n = 0;

    const lower = mean - n * stdDev;
    const upper = mean + n * stdDev;

    return {
      confidence: conf,
      confidenceStr: conf.toString(),
      lowerBound: lower,
      upperBound: upper,
      rangeStr: `${lower.toFixed(5)} - ${upper.toFixed(5)}`,
      nValue: n
    };
  });
}

/**
 * Multi-event & Bayes helper functions for backward compatibility
 */
export function computeMultiEventSeries(pAInput: string | number, nTrials: number) {
  const res = computeSeriesEvents(pAInput, nTrials, "0.3", 1);
  return {
    pAll: res.pAAll,
    pNone: res.pANone,
    pAtLeastOne: res.pAAtLeastOne
  };
}

export function computeBayesTheorem(priorA = 0.01, sensitivity = 0.99, falsePositive = 0.05) {
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

  return { posteriorA, posteriorNotA, tpPct, fpPct, fnPct, tnPct, ppvPct, npvPct };
}

export function computeBinomialDistribution(n: number, pInput: string | number, k: number) {
  const p = parseProbabilityInput(pInput);
  const trials = Math.max(1, Math.floor(n));
  const targetK = Math.max(0, Math.min(trials, Math.floor(k)));

  const pmfList: { k: number; p: number }[] = [];
  let pExact = 0;
  let pLessEqual = 0;
  let pGreaterEqual = 0;

  for (let i = 0; i <= trials; i++) {
    const prob = combinationsNum(trials, i) * Math.pow(p, i) * Math.pow(1 - p, trials - i);
    pmfList.push({ k: i, p: prob });

    if (i === targetK) pExact = prob;
    if (i <= targetK) pLessEqual += prob;
    if (i >= targetK) pGreaterEqual += prob;
  }

  return {
    pExact,
    pLessEqual,
    pGreaterEqual,
    expectedValue: trials * p,
    variance: trials * p * (1 - p),
    pmfList
  };
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

export function computeCombinatorics(n: number, r: number) {
  if (n < 0 || r < 0 || r > n) {
    return { permutations: "0", combinations: "0", factorialN: "0" };
  }

  let factN = 1n;
  for (let i = 1n; i <= BigInt(n); i++) factN *= i;

  let perm = 1n;
  for (let i = BigInt(n - r + 1); i <= BigInt(n); i++) perm *= i;

  const k = Math.min(r, n - r);
  let num = 1n, den = 1n;
  for (let i = 1n; i <= BigInt(k); i++) {
    num *= BigInt(n) - i + 1n;
    den *= i;
  }

  return {
    permutations: perm.toString(),
    combinations: (num / den).toString(),
    factorialN: factN.toString()
  };
}
