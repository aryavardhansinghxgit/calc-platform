/**
 * Core mathematical engine for Factor Calculator & Prime Factorization Suite
 */

export interface PrimeFactorCount {
  factor: number;
  count: number;
}

export interface FactorPair {
  a: number;
  b: number;
  formattedPositive: string;
  formattedNegative: string;
}

export interface DivisorAnalytics {
  number: number;
  divisorCount: number;         // d(n) or τ(n)
  divisorSum: number;           // σ(n)
  aliquotSum: number;           // s(n) = σ(n) - n
  classification: "Prime" | "Composite" | "Unit (1)" | "Zero";
  abundanceCategory: "Perfect" | "Abundant" | "Deficient" | "N/A";
  isPerfectSquare: boolean;
  isSquareFree: boolean;
}

export interface FactorTreeNode {
  id: string;
  value: number;
  isPrime: boolean;
  left?: FactorTreeNode;
  right?: FactorTreeNode;
}

export interface QuadraticFactoringResult {
  a: number;
  b: number;
  c: number;
  isFactorable: boolean;
  factoredString: string;
  roots: number[];
  p: number;
  q: number;
  r: number;
  s: number;
}

export interface DivisibilityRuleResult {
  divisor: number;
  isDivisible: boolean;
  ruleExplanation: string;
}

export interface FactorSummaryResult {
  number: number;
  factors: number[];
  negativeFactors: number[];
  factorPairs: FactorPair[];
  primeFactors: PrimeFactorCount[];
  expandedPrimeProduct: string;
  exponentialPrimeProduct: string;
  analytics: DivisorAnalytics;
  treeRoot?: FactorTreeNode;
}

/**
 * Get all positive divisors of n up to 10^12
 */
export function getAllPositiveFactors(n: number): number[] {
  if (n <= 0) return [];
  const factors: number[] = [];
  const limit = Math.floor(Math.sqrt(n));

  for (let i = 1; i <= limit; i++) {
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
 * Group divisors into factor pairs
 */
export function getFactorPairs(n: number): FactorPair[] {
  const allFactors = getAllPositiveFactors(n);
  const pairs: FactorPair[] = [];
  const seen = new Set<number>();

  for (const f of allFactors) {
    if (seen.has(f)) continue;
    const partner = n / f;
    seen.add(f);
    seen.add(partner);

    const a = Math.min(f, partner);
    const b = Math.max(f, partner);

    pairs.push({
      a,
      b,
      formattedPositive: `${a} × ${b} = ${n}`,
      formattedNegative: `(-${a}) × (-${b}) = ${n}`
    });
  }

  return pairs.sort((x, y) => x.a - y.a);
}

/**
 * Prime factorize n into prime power counts
 */
export function getPrimeFactorization(n: number): PrimeFactorCount[] {
  if (n <= 1) return [];
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
 * Compute Divisor Analytics & Number Classifications
 */
export function computeDivisorAnalytics(n: number): DivisorAnalytics {
  if (n <= 0) {
    return {
      number: n,
      divisorCount: 0,
      divisorSum: 0,
      aliquotSum: 0,
      classification: "Zero",
      abundanceCategory: "N/A",
      isPerfectSquare: false,
      isSquareFree: false
    };
  }

  if (n === 1) {
    return {
      number: 1,
      divisorCount: 1,
      divisorSum: 1,
      aliquotSum: 0,
      classification: "Unit (1)",
      abundanceCategory: "Deficient",
      isPerfectSquare: true,
      isSquareFree: true
    };
  }

  const primePowers = getPrimeFactorization(n);
  
  // Divisor count d(n) = ∏ (α_i + 1)
  let divisorCount = 1;
  for (const { count } of primePowers) {
    divisorCount *= (count + 1);
  }

  // Divisor sum σ(n) = ∏ (p^(α+1) - 1) / (p - 1)
  let divisorSum = 1;
  for (const { factor, count } of primePowers) {
    divisorSum *= (Math.pow(factor, count + 1) - 1) / (factor - 1);
  }

  const aliquotSum = divisorSum - n;

  // Classification: Prime vs Composite
  const isPrime = primePowers.length === 1 && primePowers[0].count === 1;
  const classification = isPrime ? "Prime" : "Composite";

  // Abundance: Perfect (s=n), Abundant (s>n), Deficient (s<n)
  let abundanceCategory: "Perfect" | "Abundant" | "Deficient" | "N/A" = "Deficient";
  if (aliquotSum === n) abundanceCategory = "Perfect";
  else if (aliquotSum > n) abundanceCategory = "Abundant";

  // Square & Square-free status
  const sqrtVal = Math.round(Math.sqrt(n));
  const isPerfectSquare = sqrtVal * sqrtVal === n;
  const isSquareFree = primePowers.every((p) => p.count === 1);

  return {
    number: n,
    divisorCount,
    divisorSum,
    aliquotSum,
    classification,
    abundanceCategory,
    isPerfectSquare,
    isSquareFree
  };
}

/**
 * Generate hierarchical Factor Tree nodes for n
 */
export function generateFactorTree(n: number, idPrefix: string = "node"): FactorTreeNode {
  const isPr = isPrimeNumber(n);

  if (isPr || n <= 3) {
    return {
      id: `${idPrefix}-${n}`,
      value: n,
      isPrime: true
    };
  }

  // Find smallest non-trivial divisor
  let divisor = 2;
  while (n % divisor !== 0 && divisor * divisor <= n) {
    divisor++;
  }

  if (n % divisor !== 0) divisor = n;

  const partner = n / divisor;

  return {
    id: `${idPrefix}-${n}`,
    value: n,
    isPrime: false,
    left: generateFactorTree(divisor, `${idPrefix}-L`),
    right: generateFactorTree(partner, `${idPrefix}-R`)
  };
}

function isPrimeNumber(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/**
 * Factor Quadratic Trinomial ax^2 + bx + c -> (px + q)(rx + s)
 */
export function factorQuadraticTrinomial(a: number, b: number, c: number): QuadraticFactoringResult {
  // Guard against non-quadratic linear or constant cases when a === 0
  if (a === 0) {
    if (b !== 0) {
      const root = -c / b;
      const bStr = b === 1 ? "x" : b === -1 ? "-x" : `${b}x`;
      const cStr = c === 0 ? "" : c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
      return {
        a, b, c,
        isFactorable: false,
        factoredString: `Linear expression: ${bStr}${cStr} = 0 (Not quadratic)`,
        roots: [Number(root.toFixed(4))],
        p: 0, q: b, r: 0, s: c
      };
    } else if (c !== 0) {
      return {
        a, b, c,
        isFactorable: false,
        factoredString: `Constant equation: ${c} = 0 (No solution)`,
        roots: [],
        p: 0, q: 0, r: 0, s: c
      };
    } else {
      return {
        a, b, c,
        isFactorable: false,
        factoredString: "0 = 0 (Identity — Infinitely many solutions)",
        roots: [],
        p: 0, q: 0, r: 0, s: 0
      };
    }
  }

  const disc = b * b - 4 * a * c;

  if (disc < 0) {
    return {
      a, b, c,
      isFactorable: false,
      factoredString: "Irreducible over Real Integers (Discriminant < 0)",
      roots: [],
      p: a, q: 0, r: 1, s: 0
    };
  }

  const sqrtDisc = Math.round(Math.sqrt(disc));
  if (sqrtDisc * sqrtDisc !== disc) {
    const r1 = (-b + Math.sqrt(disc)) / (2 * a);
    const r2 = (-b - Math.sqrt(disc)) / (2 * a);
    return {
      a, b, c,
      isFactorable: false,
      factoredString: "Irreducible over Integers (Discriminant not perfect square)",
      roots: [Number(r1.toFixed(4)), Number(r2.toFixed(4))],
      p: a, q: 0, r: 1, s: 0
    };
  }

  // Integer roots r1, r2 = (-b ± sqrtDisc) / (2a)
  // (a x^2 + b x + c) = a (x - r1)(x - r2)
  // Express as (p x + q)(r x + s)
  const root1Num = -b + sqrtDisc;
  const root1Den = 2 * a;
  const root2Num = -b - sqrtDisc;
  const root2Den = 2 * a;

  const gcd1 = gcdVal(Math.abs(root1Num), Math.abs(root1Den));
  const p = Math.abs(root1Den / gcd1);
  const q = - (root1Num / gcd1);

  const gcd2 = gcdVal(Math.abs(root2Num), Math.abs(root2Den));
  const r = Math.abs(root2Den / gcd2);
  const s = - (root2Num / gcd2);

  // Check scale multiplier
  const currentLeadCoeff = p * r;
  const scale = a / currentLeadCoeff;

  let factoredString = "";
  const part1 = formatLinearTerm(p, q);
  const part2 = formatLinearTerm(r, s);

  if (part1 === part2) {
    if (scale === 1) {
      factoredString = `${part1}²`;
    } else if (scale === -1) {
      factoredString = `-${part1}²`;
    } else {
      factoredString = `${scale}${part1}²`;
    }
  } else {
    if (scale === 1) {
      factoredString = `${part1}${part2}`;
    } else if (scale === -1) {
      factoredString = `-${part1}${part2}`;
    } else {
      factoredString = `${scale}${part1}${part2}`;
    }
  }

  const rawRoots = [(-b + sqrtDisc) / (2 * a), (-b - sqrtDisc) / (2 * a)];
  const uniqueRoots = sqrtDisc === 0 ? [rawRoots[0]] : rawRoots;

  return {
    a, b, c,
    isFactorable: true,
    factoredString,
    roots: uniqueRoots.map(v => Number(v.toFixed(4))),
    p, q, r, s
  };
}

function formatLinearTerm(coef: number, constTerm: number): string {
  const coefStr = coef === 1 ? "x" : coef === -1 ? "-x" : `${coef}x`;
  if (constTerm === 0) return `(${coefStr})`;
  const sign = constTerm > 0 ? "+" : "-";
  return `(${coefStr} ${sign} ${Math.abs(constTerm)})`;
}

function gcdVal(a: number, b: number): number {
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
 * Check Divisibility Rules for divisors 2 through 19
 */
export function checkDivisibilityRules(n: number): DivisibilityRuleResult[] {
  const num = Math.abs(n);
  const str = num.toString();
  const digits = str.split("").map(Number);
  const lastDigit = digits[digits.length - 1];
  const sumDigits = digits.reduce((acc, d) => acc + d, 0);

  const rules: DivisibilityRuleResult[] = [
    {
      divisor: 2,
      isDivisible: num % 2 === 0,
      ruleExplanation: `Last digit is ${lastDigit} (${num % 2 === 0 ? "even" : "odd"}).`
    },
    {
      divisor: 3,
      isDivisible: sumDigits % 3 === 0,
      ruleExplanation: `Sum of digits is ${digits.join("+")} = ${sumDigits} (${sumDigits % 3 === 0 ? "divisible by 3" : "not divisible by 3"}).`
    },
    {
      divisor: 4,
      isDivisible: num % 4 === 0,
      ruleExplanation: `Last two digits formed number ${num % 100} (${num % 4 === 0 ? "divisible by 4" : "not divisible by 4"}).`
    },
    {
      divisor: 5,
      isDivisible: lastDigit === 0 || lastDigit === 5,
      ruleExplanation: `Last digit is ${lastDigit} (${lastDigit === 0 || lastDigit === 5 ? "ends in 0 or 5" : "does not end in 0 or 5"}).`
    },
    {
      divisor: 6,
      isDivisible: num % 6 === 0,
      ruleExplanation: `Must be divisible by both 2 and 3 (${num % 6 === 0 ? "passes both" : "fails"}).`
    },
    {
      divisor: 7,
      isDivisible: num % 7 === 0,
      ruleExplanation: `Remainder ${num} mod 7 = ${num % 7} (${num % 7 === 0 ? "divisible by 7" : "remainder " + (num % 7)}).`
    },
    {
      divisor: 8,
      isDivisible: num % 8 === 0,
      ruleExplanation: `Last three digits formed number ${num % 1000} (${num % 8 === 0 ? "divisible by 8" : "not divisible by 8"}).`
    },
    {
      divisor: 9,
      isDivisible: sumDigits % 9 === 0,
      ruleExplanation: `Sum of digits is ${sumDigits} (${sumDigits % 9 === 0 ? "divisible by 9" : "not divisible by 9"}).`
    },
    {
      divisor: 10,
      isDivisible: lastDigit === 0,
      ruleExplanation: `Last digit is ${lastDigit} (${lastDigit === 0 ? "ends in 0" : "does not end in 0"}).`
    },
    {
      divisor: 11,
      isDivisible: num % 11 === 0,
      ruleExplanation: `Alternating digit sum difference = ${num % 11 === 0 ? "multiple of 11" : "remainder " + (num % 11)}.`
    },
    {
      divisor: 12,
      isDivisible: num % 12 === 0,
      ruleExplanation: `Must be divisible by both 3 and 4 (${num % 12 === 0 ? "passes both" : "fails"}).`
    },
    {
      divisor: 13,
      isDivisible: num % 13 === 0,
      ruleExplanation: `Remainder ${num} mod 13 = ${num % 13} (${num % 13 === 0 ? "divisible by 13" : "remainder " + (num % 13)}).`
    }
  ];

  return rules;
}

/**
 * Complete Factor Summary for input N
 */
export function computeFactorSummary(n: number): FactorSummaryResult {
  const absN = Math.abs(Math.round(n)) || 1;
  const factors = getAllPositiveFactors(absN);
  const negativeFactors = factors.map((f) => -f).sort((a, b) => a - b);
  const factorPairs = getFactorPairs(absN);
  const primeFactors = getPrimeFactorization(absN);
  const analytics = computeDivisorAnalytics(absN);
  const treeRoot = generateFactorTree(absN);

  const expanded = primeFactors
    .flatMap((p) => Array(p.count).fill(p.factor))
    .join(" × ");

  const exponential = primeFactors
    .map((p) => `${p.factor}${p.count > 1 ? `^${p.count}` : ""}`)
    .join(" × ");

  return {
    number: absN,
    factors,
    negativeFactors,
    factorPairs,
    primeFactors,
    expandedPrimeProduct: expanded || `${absN}`,
    exponentialPrimeProduct: exponential || `${absN}`,
    analytics,
    treeRoot
  };
}
