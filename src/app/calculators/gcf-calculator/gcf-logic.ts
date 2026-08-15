/**
 * Core mathematical engine for Greatest Common Factor (GCF) Calculator & Factorization Suite
 */

export interface PrimeFactorCount {
  factor: number;
  count: number;
}

export interface NumberFactorization {
  num: number;
  factors: PrimeFactorCount[];
  formatted: string;
  allFactors: number[];
  isSquareFree: boolean;
}

export interface EuclideanDivisionStep {
  step: number;
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  equation: string;
}

export interface EuclideanSubtractionStep {
  step: number;
  a: number;
  b: number;
  difference: number;
}

export interface BezoutResult {
  a: number;
  b: number;
  gcf: number;
  x: number;
  y: number;
  identityStr: string;
  steps: Array<{ step: number; x: number; y: number; r: number; q: number }>;
}

export interface DivisionGridRow {
  step: number;
  divisor: number;
  quotients: number[];
}

export interface GcfCalculationResult {
  numbers: number[];
  gcf: number;
  lcm: number;
  isCoprime: boolean;
  product: number;
  productEqualsGcfLcm: boolean;
  simplifiedRatio: string;
  factorizations: NumberFactorization[];
  sharedFactorsIntersection: number[];
  gcfPrimeExpression: string;
  lcmPrimeExpression: string;
}

/**
 * Parse input string into an array of positive integers
 */
export function parseGcfNumbersInput(inputStr: string): number[] {
  if (!inputStr || !inputStr.trim()) return [];
  const rawParts = inputStr.split(/[\s,;]+/);
  const nums: number[] = [];

  for (const part of rawParts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const val = Math.abs(parseInt(trimmed, 10));
    if (!Number.isNaN(val) && val > 0 && val <= 1e12) {
      nums.push(val);
    }
  }

  return Array.from(new Set(nums));
}

/**
 * Get all positive integer factors of n
 */
export function getAllFactors(n: number): number[] {
  if (n <= 0) return [];
  const factors: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i * i !== n) {
        factors.push(n / i);
      }
    }
  }
  return factors.sort((a, b) => a - b);
}

/**
 * Prime factorize n
 */
export function factorizeNumber(n: number): PrimeFactorCount[] {
  if (n <= 0) return [];
  let num = n;
  const map: Map<number, number> = new Map();

  while (num % 2 === 0) {
    map.set(2, (map.get(2) || 0) + 1);
    num = Math.floor(num / 2);
  }

  let d = 3;
  while (d * d <= num) {
    while (num % d === 0) {
      map.set(d, (map.get(d) || 0) + 1);
      num = Math.floor(num / d);
    }
    d += 2;
  }

  if (num > 1) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const result: PrimeFactorCount[] = [];
  map.forEach((count, factor) => {
    result.push({ factor, count });
  });

  return result.sort((a, b) => a.factor - b.factor);
}

/**
 * GCF of two numbers
 */
export function gcfTwo(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

/**
 * GCF of N numbers
 */
export function calculateGCF(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = gcfTwo(result, numbers[i]);
    if (result === 1) break;
  }
  return result;
}

/**
 * LCM of N numbers
 */
export function calculateLCM(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = Math.abs(result * numbers[i]) / gcfTwo(result, numbers[i]);
  }
  return result;
}

/**
 * Compute GCF calculation summary
 */
export function computeGcfSummary(numbers: number[]): GcfCalculationResult {
  if (numbers.length === 0) {
    return {
      numbers: [],
      gcf: 0,
      lcm: 0,
      isCoprime: false,
      product: 0,
      productEqualsGcfLcm: false,
      simplifiedRatio: "",
      factorizations: [],
      sharedFactorsIntersection: [],
      gcfPrimeExpression: "1",
      lcmPrimeExpression: "0"
    };
  }

  const gcf = calculateGCF(numbers);
  const lcm = calculateLCM(numbers);
  const isCoprime = gcf === 1;

  let product = 1;
  for (const n of numbers) product *= n;
  const productEqualsGcfLcm = numbers.length === 2 ? product === gcf * lcm : false;

  const simplifiedRatio = numbers.map((n) => n / gcf).join(" : ");

  // Factorizations
  const factorizations: NumberFactorization[] = numbers.map((num) => {
    const factors = factorizeNumber(num);
    const allFacs = getAllFactors(num);
    const isSquareFree = factors.every((f) => f.count === 1);
    const formatted = factors
      .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
      .join(" × ");
    return { num, factors, formatted: formatted || `${num}`, allFactors: allFacs, isSquareFree };
  });

  // Shared factors intersection
  let intersection: number[] = factorizations[0] ? [...factorizations[0].allFactors] : [];
  for (let i = 1; i < factorizations.length; i++) {
    const currentSet = new Set(factorizations[i].allFactors);
    intersection = intersection.filter((x) => currentSet.has(x));
  }

  // Prime expressions
  const minPowersMap: Map<number, number> = new Map();
  const maxPowersMap: Map<number, number> = new Map();

  if (factorizations.length > 0) {
    factorizations[0].factors.forEach(({ factor }) => {
      let minCount = Number.MAX_SAFE_INTEGER;
      let presentInAll = true;

      for (const fObj of factorizations) {
        const found = fObj.factors.find((x) => x.factor === factor);
        if (!found) {
          presentInAll = false;
          break;
        }
        minCount = Math.min(minCount, found.count);
      }

      if (presentInAll && minCount > 0) {
        minPowersMap.set(factor, minCount);
      }
    });

    factorizations.forEach(({ factors }) => {
      factors.forEach(({ factor, count }) => {
        maxPowersMap.set(factor, Math.max(maxPowersMap.get(factor) || 0, count));
      });
    });
  }

  const gcfPrimePowers: PrimeFactorCount[] = [];
  minPowersMap.forEach((count, factor) => gcfPrimePowers.push({ factor, count }));
  gcfPrimePowers.sort((a, b) => a.factor - b.factor);
  const gcfPrimeExpression = gcfPrimePowers.length > 0
    ? gcfPrimePowers.map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`).join(" × ")
    : "1";

  const lcmPrimePowers: PrimeFactorCount[] = [];
  maxPowersMap.forEach((count, factor) => lcmPrimePowers.push({ factor, count }));
  lcmPrimePowers.sort((a, b) => a.factor - b.factor);
  const lcmPrimeExpression = lcmPrimePowers
    .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
    .join(" × ");

  return {
    numbers,
    gcf,
    lcm,
    isCoprime,
    product,
    productEqualsGcfLcm,
    simplifiedRatio,
    factorizations,
    sharedFactorsIntersection: intersection,
    gcfPrimeExpression,
    lcmPrimeExpression: lcmPrimeExpression || "1"
  };
}

/**
 * Generate Euclidean Algorithm Division Steps for 2 or N numbers
 */
export function generateEuclideanDivisionSteps(numbers: number[]): {
  divisionSteps: EuclideanDivisionStep[];
  subtractionSteps: EuclideanSubtractionStep[];
  overallSummaryText: string[];
} {
  if (numbers.length < 2) {
    return { divisionSteps: [], subtractionSteps: [], overallSummaryText: ["Requires at least 2 numbers."] };
  }

  const divisionSteps: EuclideanDivisionStep[] = [];
  const subtractionSteps: EuclideanSubtractionStep[] = [];
  const overallSummaryText: string[] = [];

  let a = Math.max(numbers[0], numbers[1]);
  let b = Math.min(numbers[0], numbers[1]);
  let stepCount = 1;

  // Division method for first pair
  while (b > 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    const eq = `${a} = ${b} × ${q} + ${r}`;

    divisionSteps.push({
      step: stepCount++,
      dividend: a,
      divisor: b,
      quotient: q,
      remainder: r,
      equation: eq
    });

    a = b;
    b = r;
  }

  const gcfPair1 = a;

  // Subtraction method for first pair (up to 12 steps max)
  let subA = Math.max(numbers[0], numbers[1]);
  let subB = Math.min(numbers[0], numbers[1]);
  let subStep = 1;
  while (subA !== subB && subStep <= 12) {
    const diff = subA - subB;
    subtractionSteps.push({
      step: subStep++,
      a: subA,
      b: subB,
      difference: diff
    });
    if (diff > subB) {
      subA = diff;
    } else {
      subA = subB;
      subB = diff;
    }
  }

  let finalGcf = gcfPair1;
  overallSummaryText.push(`Pair 1: GCF(${numbers[0]}, ${numbers[1]}) = ${gcfPair1}`);

  for (let i = 2; i < numbers.length; i++) {
    const nextNum = numbers[i];
    const prevGcf = finalGcf;
    finalGcf = gcfTwo(prevGcf, nextNum);
    overallSummaryText.push(`Step ${i}: GCF(${prevGcf}, ${nextNum}) = ${finalGcf}`);
  }

  return { divisionSteps, subtractionSteps, overallSummaryText };
}

/**
 * Extended Euclidean Algorithm & Bézout's Identity: a·x + b·y = GCF(a, b)
 */
export function generateBezoutIdentity(a: number, b: number): BezoutResult {
  let old_r = a, r = b;
  let old_s = 1, s = 0;
  let old_t = 0, t = 1;

  const steps: Array<{ step: number; x: number; y: number; r: number; q: number }> = [];
  let stepIdx = 1;

  while (r !== 0) {
    const q = Math.floor(old_r / r);

    steps.push({
      step: stepIdx++,
      x: old_s,
      y: old_t,
      r: old_r,
      q
    });

    let temp = old_r - q * r;
    old_r = r;
    r = temp;

    temp = old_s - q * s;
    old_s = s;
    s = temp;

    temp = old_t - q * t;
    old_t = t;
    t = temp;
  }

  const gcfVal = old_r;
  const x = old_s;
  const y = old_t;
  const identityStr = `${a} × (${x}) + ${b} × (${y}) = ${gcfVal}`;

  return {
    a,
    b,
    gcf: gcfVal,
    x,
    y,
    identityStr,
    steps
  };
}

/**
 * Common Division Grid / Ladder (Cake) Method for GCF
 */
export function generateDivisionGridMethod(numbers: number[]): {
  rows: DivisionGridRow[];
  sharedDivisors: number[];
  finalQuotients: number[];
  gcfProductExpression: string;
} {
  if (numbers.length === 0) {
    return { rows: [], sharedDivisors: [], finalQuotients: [], gcfProductExpression: "1" };
  }

  let currentQuotients = [...numbers];
  const rows: DivisionGridRow[] = [];
  const sharedDivisors: number[] = [];
  let stepIndex = 1;

  while (true) {
    let sharedDivisor = 0;
    const maxVal = Math.min(...currentQuotients);

    for (let p = 2; p <= maxVal; p++) {
      if (currentQuotients.every((q) => q % p === 0)) {
        sharedDivisor = p;
        break;
      }
    }

    if (sharedDivisor === 0) break;

    sharedDivisors.push(sharedDivisor);
    const nextQuotients = currentQuotients.map((q) => q / sharedDivisor);

    rows.push({
      step: stepIndex++,
      divisor: sharedDivisor,
      quotients: [...currentQuotients]
    });

    currentQuotients = nextQuotients;
  }

  const gcfProductExpression = sharedDivisors.length > 0 ? sharedDivisors.join(" × ") : "1";

  return {
    rows,
    sharedDivisors,
    finalQuotients: currentQuotients,
    gcfProductExpression
  };
}
