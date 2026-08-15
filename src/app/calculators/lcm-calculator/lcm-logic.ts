/**
 * Core mathematical engine for Least Common Multiple (LCM) Calculator & Factorization Suite
 */

export interface PrimeFactorCount {
  factor: number;
  count: number;
}

export interface NumberFactorization {
  num: number;
  factors: PrimeFactorCount[];
  formatted: string;
}

export interface DivisionGridRow {
  step: number;
  divisor: number;
  quotients: number[];
}

export interface ListingMultiplesData {
  num: number;
  multiples: number[];
}

export interface VennSetData {
  onlyIn: Map<number, PrimeFactorCount[]>; // prime factors unique to number i
  sharedAll: PrimeFactorCount[];           // prime factors shared by all numbers
  lcmTotal: PrimeFactorCount[];            // max prime powers forming LCM
}

export interface LcmCalculationResult {
  numbers: number[];
  lcm: number;
  gcf: number;
  product: number;
  productEqualsLcmGcf: boolean;
  factorizations: NumberFactorization[];
  maxPrimePowers: PrimeFactorCount[];
  lcmPrimeExpression: string;
  gcfPrimeExpression: string;
  lcdFractionExample: string;
  isBigIntOverflow: boolean;
}

/**
 * Parse input string into an array of positive integers
 */
export function parseNumbersInput(inputStr: string): number[] {
  if (!inputStr || !inputStr.trim()) return [];
  
  // Split by comma, space, or semicolon
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

  return Array.from(new Set(nums)); // unique integers
}

/**
 * Prime factorize a positive integer
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
 * Compute GCF of two numbers using Euclidean algorithm
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
 * Compute GCF of N numbers
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
 * Compute LCM of two numbers
 */
export function lcmTwo(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcfTwo(a, b);
}

/**
 * Compute LCM of N numbers
 */
export function calculateLCM(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcmTwo(result, numbers[i]);
  }
  return result;
}

/**
 * Compute complete LCM calculation summary
 */
export function computeLcmSummary(numbers: number[]): LcmCalculationResult {
  if (numbers.length === 0) {
    return {
      numbers: [],
      lcm: 0,
      gcf: 0,
      product: 0,
      productEqualsLcmGcf: false,
      factorizations: [],
      maxPrimePowers: [],
      lcmPrimeExpression: "0",
      gcfPrimeExpression: "0",
      lcdFractionExample: "",
      isBigIntOverflow: false
    };
  }

  const gcf = calculateGCF(numbers);
  const lcm = calculateLCM(numbers);

  // Compute product of all numbers
  let product = 1;
  let isOverflow = false;
  for (const n of numbers) {
    product *= n;
    if (product > Number.MAX_SAFE_INTEGER) {
      isOverflow = true;
    }
  }

  // Check identity: product == LCM * GCF (strictly holds for 2 numbers)
  const productEqualsLcmGcf = numbers.length === 2 ? product === lcm * gcf : false;

  // Factorizations
  const factorizations: NumberFactorization[] = numbers.map((num) => {
    const factors = factorizeNumber(num);
    const formatted = factors
      .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
      .join(" × ");
    return { num, factors, formatted: formatted || `${num}` };
  });

  // Collect max prime powers across all numbers
  const maxPowersMap: Map<number, number> = new Map();
  const minPowersMap: Map<number, number> = new Map();

  factorizations.forEach(({ factors }) => {
    factors.forEach(({ factor, count }) => {
      maxPowersMap.set(factor, Math.max(maxPowersMap.get(factor) || 0, count));
    });
  });

  // Calculate GCF prime powers (primes common to ALL numbers with min count)
  if (factorizations.length > 0) {
    const firstFactors = factorizations[0].factors;
    firstFactors.forEach(({ factor }) => {
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
  }

  const maxPrimePowers: PrimeFactorCount[] = [];
  maxPowersMap.forEach((count, factor) => {
    maxPrimePowers.push({ factor, count });
  });
  maxPrimePowers.sort((a, b) => a.factor - b.factor);

  const lcmPrimeExpression = maxPrimePowers
    .map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`)
    .join(" × ");

  const gcfPrimePowers: PrimeFactorCount[] = [];
  minPowersMap.forEach((count, factor) => {
    gcfPrimePowers.push({ factor, count });
  });
  gcfPrimePowers.sort((a, b) => a.factor - b.factor);

  const gcfPrimeExpression = gcfPrimePowers.length > 0
    ? gcfPrimePowers.map((f) => `${f.factor}${f.count > 1 ? `^${f.count}` : ""}`).join(" × ")
    : "1";

  // Least Common Denominator (LCD) fraction example
  const fractionStr = numbers.slice(0, 3).map((n) => `1/${n}`).join(" + ");
  const numeratorsStr = numbers.slice(0, 3).map((n) => `${lcm / n}`).join(" + ");
  const numeratorSum = numbers.slice(0, 3).reduce((acc, n) => acc + lcm / n, 0);
  const lcdFractionExample = `${fractionStr} = (${numeratorsStr}) / ${lcm} = ${numeratorSum}/${lcm}`;

  return {
    numbers,
    lcm,
    gcf,
    product,
    productEqualsLcmGcf,
    factorizations,
    maxPrimePowers,
    lcmPrimeExpression: lcmPrimeExpression || "1",
    gcfPrimeExpression,
    lcdFractionExample,
    isBigIntOverflow: isOverflow
  };
}

/**
 * Generate Common Division / Ladder (Cake) Method steps
 */
export function generateDivisionGridMethod(numbers: number[]): {
  rows: DivisionGridRow[];
  outerDivisors: number[];
  finalQuotients: number[];
  lcmProductExpression: string;
} {
  if (numbers.length === 0) {
    return { rows: [], outerDivisors: [], finalQuotients: [], lcmProductExpression: "0" };
  }

  let currentQuotients = [...numbers];
  const rows: DivisionGridRow[] = [];
  const outerDivisors: number[] = [];
  let stepIndex = 1;

  while (true) {
    // Find smallest prime p that divides at least two numbers (or at least one number if all remaining are prime)
    let chosenDivisor = 0;

    for (let p = 2; p <= Math.max(...currentQuotients); p++) {
      // Check if p is prime
      if (!isPrime(p)) continue;
      const countDivided = currentQuotients.filter((q) => q % p === 0).length;
      if (countDivided >= 2) {
        chosenDivisor = p;
        break;
      }
    }

    // If no prime divides >= 2 numbers, check if any prime divides >= 1 number > 1
    if (chosenDivisor === 0) {
      for (let p = 2; p <= Math.max(...currentQuotients); p++) {
        if (!isPrime(p)) continue;
        if (currentQuotients.some((q) => q % p === 0 && q > 1)) {
          chosenDivisor = p;
          break;
        }
      }
    }

    if (chosenDivisor === 0 || currentQuotients.every((q) => q === 1)) {
      break;
    }

    outerDivisors.push(chosenDivisor);
    const nextQuotients = currentQuotients.map((q) => (q % chosenDivisor === 0 ? q / chosenDivisor : q));

    rows.push({
      step: stepIndex++,
      divisor: chosenDivisor,
      quotients: [...currentQuotients]
    });

    currentQuotients = nextQuotients;
  }

  const remaining = currentQuotients.filter((q) => q > 1);
  const allFactors = [...outerDivisors, ...remaining];
  const lcmProductExpression = allFactors.join(" × ");

  return {
    rows,
    outerDivisors,
    finalQuotients: currentQuotients,
    lcmProductExpression: lcmProductExpression || "1"
  };
}

function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Generate Listing Multiples (Brute Force) data
 */
export function generateListMultiplesMethod(numbers: number[], count: number = 10): {
  listData: ListingMultiplesData[];
  targetLcm: number;
} {
  const targetLcm = calculateLCM(numbers);

  const listData: ListingMultiplesData[] = numbers.map((num) => {
    const mults: number[] = [];
    let current = num;
    while (current <= targetLcm || mults.length < count) {
      mults.push(current);
      if (current === targetLcm && mults.length >= 5) break;
      current += num;
      if (mults.length >= 30) break; // cap for UI rendering
    }
    return { num, multiples: mults };
  });

  return { listData, targetLcm };
}

/**
 * Generate Euclidean GCF formula steps
 */
export function generateGCFFormulaMethod(numbers: number[]): {
  stepsText: string[];
  pairwiseCalculations: Array<{ a: number; b: number; gcf: number; lcm: number; formula: string }>;
} {
  const stepsText: string[] = [];
  const pairwiseCalculations: Array<{ a: number; b: number; gcf: number; lcm: number; formula: string }> = [];

  if (numbers.length < 2) {
    return { stepsText: ["LCM requires at least two numbers."], pairwiseCalculations: [] };
  }

  let runningLcm = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    const b = numbers[i];
    const gcfVal = gcfTwo(runningLcm, b);
    const nextLcm = (runningLcm * b) / gcfVal;

    const formula = `LCM(${runningLcm}, ${b}) = (${runningLcm} × ${b}) / GCF(${runningLcm}, ${b}) = ${runningLcm * b} / ${gcfVal} = ${nextLcm}`;
    pairwiseCalculations.push({
      a: runningLcm,
      b,
      gcf: gcfVal,
      lcm: nextLcm,
      formula
    });

    stepsText.push(`Step ${i}: GCF(${runningLcm}, ${b}) = ${gcfVal} ⟹ LCM = (${runningLcm} × ${b}) / ${gcfVal} = ${nextLcm}`);
    runningLcm = nextLcm;
  }

  return { stepsText, pairwiseCalculations };
}
