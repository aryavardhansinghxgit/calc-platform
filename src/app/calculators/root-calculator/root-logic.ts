/**
 * Core mathematical engine for Root Calculator & Radical Simplifier Suite
 */

export interface PrimeFactor {
  factor: number;
  count: number;
}

export interface RadicalSimplification {
  coefficient: number;
  radicand: number;
  index: number;
  isPerfectPower: boolean;
  factorization: PrimeFactor[];
  latex: string;
  formattedText: string;
}

export interface ComplexNumber {
  real: number;
  imag: number;
  formatted: string;
  polarRadius: number;
  polarAngleRad: number;
  polarAngleDeg: number;
  polarFormatted: string;
}

export interface NewtonRaphsonStep {
  iteration: number;
  guess: number;
  nextGuess: number;
  error: number;
}

export interface LongDivisionStep {
  stepIndex: number;
  currentDigitPair: string;
  currentDividend: number;
  divisorBase: number;
  trialDigit: number;
  product: number;
  remainder: number;
  currentRoot: string;
}

export interface BoundsResult {
  lowerInteger: number;
  upperInteger: number;
  lowerPower: number;
  upperPower: number;
  expression: string;
}

export interface RationalizedFraction {
  numeratorCoefficient: number;
  numeratorRadicand: number;
  denominator: number;
  latex: string;
  formattedText: string;
}

/**
 * Perform prime factorization on a positive integer up to 10^12
 */
export function factorizeInteger(n: number): PrimeFactor[] {
  if (!Number.isInteger(n) || n <= 0) return [];
  let num = Math.abs(n);
  const factors: Map<number, number> = new Map();

  // Handle factor 2
  while (num % 2 === 0) {
    factors.set(2, (factors.get(2) || 0) + 1);
    num = Math.floor(num / 2);
  }

  // Handle odd factors
  let d = 3;
  while (d * d <= num) {
    while (num % d === 0) {
      factors.set(d, (factors.get(d) || 0) + 1);
      num = Math.floor(num / d);
    }
    d += 2;
  }

  if (num > 1) {
    factors.set(num, (factors.get(num) || 0) + 1);
  }

  const result: PrimeFactor[] = [];
  factors.forEach((count, factor) => {
    result.push({ factor, count });
  });

  return result.sort((a, b) => a.factor - b.factor);
}

/**
 * Simplify a radical ⁿ√x into a · ⁿ√b
 */
export function simplifyRadical(x: number, index: number = 2): RadicalSimplification {
  const n = Math.max(1, Math.round(index));
  
  if (x === 0) {
    return {
      coefficient: 0,
      radicand: 0,
      index: n,
      isPerfectPower: true,
      factorization: [],
      latex: "0",
      formattedText: "0"
    };
  }

  const isInteger = Number.isInteger(x) && x > 0 && x <= 1e12;

  if (!isInteger || n === 1) {
    return {
      coefficient: 1,
      radicand: x,
      index: n,
      isPerfectPower: false,
      factorization: [],
      latex: n === 2 ? `\\sqrt{${x}}` : `\\sqrt[${n}]{${x}}`,
      formattedText: n === 2 ? `√${x}` : `ⁿ√${x}`
    };
  }

  const factors = factorizeInteger(x);
  let coefficient = 1;
  let remainingRadicand = 1;

  for (const { factor, count } of factors) {
    const outsideCount = Math.floor(count / n);
    const insideCount = count % n;

    if (outsideCount > 0) {
      coefficient *= Math.pow(factor, outsideCount);
    }
    if (insideCount > 0) {
      remainingRadicand *= Math.pow(factor, insideCount);
    }
  }

  const isPerfectPower = remainingRadicand === 1;

  let latex = "";
  let formattedText = "";

  if (isPerfectPower) {
    latex = `${coefficient}`;
    formattedText = `${coefficient}`;
  } else if (coefficient === 1) {
    latex = n === 2 ? `\\sqrt{${remainingRadicand}}` : `\\sqrt[${n}]{${remainingRadicand}}`;
    formattedText = n === 2 ? `√${remainingRadicand}` : `${n === 3 ? "∛" : n === 4 ? "∜" : `${n}√`}${remainingRadicand}`;
  } else {
    latex = n === 2 ? `${coefficient}\\sqrt{${remainingRadicand}}` : `${coefficient}\\sqrt[${n}]{${remainingRadicand}}`;
    formattedText = n === 2 ? `${coefficient}√${remainingRadicand}` : `${coefficient} ${n === 3 ? "∛" : n === 4 ? "∜" : `${n}√`}${remainingRadicand}`;
  }

  return {
    coefficient,
    radicand: remainingRadicand,
    index: n,
    isPerfectPower,
    factorization: factors,
    latex,
    formattedText
  };
}

/**
 * Evaluate fractional power x^(m/n)
 */
export function evaluateFractionalExponent(base: number, num: number, den: number): {
  decimalValue: number;
  isNegative: boolean;
  latex: string;
  explanation: string;
  exactForm: string;
} {
  const n = Math.max(1, Math.round(den));
  const m = Math.round(num);

  if (base === 0) {
    return { decimalValue: 0, isNegative: false, latex: "0", explanation: "0 to any positive power is 0", exactForm: "0" };
  }

  let effectiveBase = base;
  let effectiveExponent = m / n;

  let val: number;
  if (base < 0 && n % 2 !== 0) {
    // Odd root of negative base
    const root = -Math.pow(Math.abs(base), 1 / n);
    val = Math.pow(root, m);
  } else {
    val = Math.pow(base, effectiveExponent);
  }

  const simp = Number.isInteger(base) && base > 0 ? simplifyRadical(Math.pow(base, Math.abs(m)), n) : null;
  let exactForm = val.toString();

  if (simp && simp.isPerfectPower) {
    exactForm = m < 0 ? `1 / ${simp.coefficient}` : `${simp.coefficient}`;
  } else if (simp) {
    exactForm = m < 0 ? `1 / (${simp.formattedText})` : simp.formattedText;
  }

  const latex = `(${base})^{\\frac{${m}}{${n}}} = ${Number.isNaN(val) ? "Undefined \\in \\mathbb{R}" : parseFloat(val.toFixed(10))}`;
  const explanation = `${base}^(${m}/${n}) is equivalent to taking the ${n}-th root of ${base} raised to the power ${m}.`;

  return {
    decimalValue: val,
    isNegative: val < 0,
    latex,
    explanation,
    exactForm
  };
}

/**
 * Rationalize denominator of a fraction under a radical: √(p/q) -> √(p*q^(n-1)) / q
 */
export function rationalizeDenominator(p: number, q: number, index: number = 2): RationalizedFraction {
  const n = Math.max(1, Math.round(index));
  if (q <= 0 || p < 0) {
    return {
      numeratorCoefficient: 1,
      numeratorRadicand: p,
      denominator: q,
      latex: `\\frac{\\sqrt[${n}]{${p}}}{${q}}`,
      formattedText: `√(${p})/${q}`
    };
  }

  // √(p/q) = √(p * q^(n-1)) / q
  const newRadicand = p * Math.pow(q, n - 1);
  const simp = simplifyRadical(newRadicand, n);

  const denominator = q;
  const numCoeff = simp.coefficient;
  const numRad = simp.radicand;

  // Simplify fraction numCoeff / denominator if possible
  const gcdVal = gcd(numCoeff, denominator);
  const finalNumCoeff = numCoeff / gcdVal;
  const finalDenom = denominator / gcdVal;

  let latex = "";
  let formattedText = "";

  if (numRad === 1) {
    latex = finalDenom === 1 ? `${finalNumCoeff}` : `\\frac{${finalNumCoeff}}{${finalDenom}}`;
    formattedText = finalDenom === 1 ? `${finalNumCoeff}` : `${finalNumCoeff}/${finalDenom}`;
  } else {
    const radStr = n === 2 ? `\\sqrt{${numRad}}` : `\\sqrt[${n}]{${numRad}}`;
    const radText = n === 2 ? `√${numRad}` : `ⁿ√${numRad}`;

    const numStr = finalNumCoeff === 1 ? radStr : `${finalNumCoeff}${radStr}`;
    const numTextStr = finalNumCoeff === 1 ? radText : `${finalNumCoeff}${radText}`;

    if (finalDenom === 1) {
      latex = numStr;
      formattedText = numTextStr;
    } else {
      latex = `\\frac{${numStr}}{${finalDenom}}`;
      formattedText = `(${numTextStr}) / ${finalDenom}`;
    }
  }

  return {
    numeratorCoefficient: finalNumCoeff,
    numeratorRadicand: numRad,
    denominator: finalDenom,
    latex,
    formattedText
  };
}

function gcd(a: number, b: number): number {
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
 * Generate Newton-Raphson iterations for finding ⁿ√S
 * Formula: x_{k+1} = 1/n * ((n - 1) * x_k + S / (x_k^(n - 1)))
 */
export function calculateNewtonRaphson(S: number, n: number = 2, maxIter: number = 8): NewtonRaphsonStep[] {
  if (S <= 0 || n <= 0) return [];
  const steps: NewtonRaphsonStep[] = [];

  // Initial guess x0: S / n or 1
  let x = Math.max(1, S / n);
  const target = Math.pow(S, 1 / n);

  for (let k = 0; k < maxIter; k++) {
    const nextX = (1 / n) * ((n - 1) * x + S / Math.pow(x, n - 1));
    const error = Math.abs(nextX - target);

    steps.push({
      iteration: k + 1,
      guess: x,
      nextGuess: nextX,
      error
    });

    if (error < 1e-15 || Math.abs(nextX - x) < 1e-15) {
      break;
    }
    x = nextX;
  }

  return steps;
}

/**
 * Long Division Square Root Algorithm steps for integer S
 */
export function calculateLongDivisionSquareRoot(S: number): LongDivisionStep[] {
  if (!Number.isInteger(S) || S <= 0 || S > 99999999) return [];

  const str = S.toString();
  // Group digits in pairs from right to left
  const pairs: string[] = [];
  let len = str.length;
  if (len % 2 !== 0) {
    pairs.push(str[0]);
    for (let i = 1; i < len; i += 2) {
      pairs.push(str.substring(i, i + 2));
    }
  } else {
    for (let i = 0; i < len; i += 2) {
      pairs.push(str.substring(i, i + 2));
    }
  }

  const steps: LongDivisionStep[] = [];
  let currentRoot = "";
  let remainder = 0;

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const dividend = remainder * 100 + parseInt(pair, 10);
    const divisorBase = currentRoot === "" ? 0 : parseInt(currentRoot, 10) * 2 * 10;

    let trialDigit = 0;
    if (divisorBase === 0) {
      while ((trialDigit + 1) * (trialDigit + 1) <= dividend) {
        trialDigit++;
      }
    } else {
      while ((divisorBase + trialDigit + 1) * (trialDigit + 1) <= dividend && trialDigit < 9) {
        trialDigit++;
      }
    }

    const actualDivisor = divisorBase === 0 ? trialDigit : divisorBase + trialDigit;
    const product = actualDivisor * trialDigit;
    remainder = dividend - product;
    currentRoot += trialDigit.toString();

    steps.push({
      stepIndex: i + 1,
      currentDigitPair: pair,
      currentDividend: dividend,
      divisorBase,
      trialDigit,
      product,
      remainder,
      currentRoot
    });
  }

  return steps;
}

/**
 * Calculate complex roots for negative numbers or complex powers
 */
export function calculateComplexRoots(x: number, n: number = 2): ComplexNumber[] {
  if (x >= 0 && n % 2 !== 0) return [];

  const r = Math.pow(Math.abs(x), 1 / n);
  const theta = x < 0 ? Math.PI : 0;
  const roots: ComplexNumber[] = [];

  for (let k = 0; k < n; k++) {
    const angle = (theta + 2 * Math.PI * k) / n;
    const real = r * Math.cos(angle);
    const imag = r * Math.sin(angle);
    const angleDeg = (angle * 180) / Math.PI;

    const realStr = Math.abs(real) < 1e-12 ? "" : parseFloat(real.toFixed(6)).toString();
    const imagAbs = Math.abs(imag);
    const imagStr = imagAbs < 1e-12 ? "" : `${imagAbs === 1 ? "" : parseFloat(imagAbs.toFixed(6))}i`;

    let formatted = "0";
    if (realStr && imagStr) {
      formatted = `${realStr} ${imag >= 0 ? "+" : "-"} ${imagStr}`;
    } else if (imagStr) {
      formatted = `${imag < 0 ? "-" : ""}${imagStr}`;
    } else if (realStr) {
      formatted = realStr;
    }

    roots.push({
      real,
      imag,
      formatted,
      polarRadius: r,
      polarAngleRad: angle,
      polarAngleDeg: angleDeg,
      polarFormatted: `${parseFloat(r.toFixed(6))} ∠ ${parseFloat(angleDeg.toFixed(2))}°`
    });
  }

  return roots;
}

/**
 * Compute integer bounds k^n <= x < (k+1)^n
 */
export function calculateBounds(x: number, n: number = 2): BoundsResult | null {
  if (x < 0 || n <= 0) return null;
  const exact = Math.pow(x, 1 / n);
  const lower = Math.floor(exact);
  const upper = Math.ceil(exact);

  if (lower === upper) {
    return {
      lowerInteger: lower,
      upperInteger: upper,
      lowerPower: Math.pow(lower, n),
      upperPower: Math.pow(upper, n),
      expression: `${lower}^${n} = ${x}`
    };
  }

  const lowerPow = Math.pow(lower, n);
  const upperPow = Math.pow(upper, n);

  return {
    lowerInteger: lower,
    upperInteger: upper,
    lowerPower: lowerPow,
    upperPower: upperPow,
    expression: `${lower} < ${n === 2 ? "√" : `${n}√`}${x} < ${upper} (since ${lowerPow} < ${x} < ${upperPow})`
  };
}
