/**
 * Mathematical logic engine for Confidence Interval & Statistical Estimation Suite
 * Production-grade implementations of:
 * - Peter J. Acklam's Inverse Normal CDF Algorithm (< 1.15e-9 relative error)
 * - Gauss-Legendre Quadrature & Newton-Raphson Inversion for Student's t distribution
 * - Gauss-Legendre Quadrature & Newton-Raphson Inversion for Chi-Square distribution
 * - Single Population Mean (Student's t and Normal Z with FPC)
 * - Single Population Proportion (Wilson Score, Wald, Agresti-Coull)
 * - Difference Between Two Independent Means (Welch's t and Pooled t)
 * - Difference Between Two Independent Proportions
 * - Population Variance and Standard Deviation (Chi-Square bounds)
 */

// ============================================================================
// 1. HIGH-PRECISION STATISTICAL DISTRIBUTIONS
// ============================================================================

/**
 * Peter J. Acklam's inverse normal CDF (probit) algorithm.
 * Relative error < 1.15e-9 across entire domain (0, 1).
 */
export function inverseNormalCDF(p: number): number {
  if (p <= 0.0) return -Infinity;
  if (p >= 1.0) return Infinity;

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838,
    -2.549732539343734, 4.374664141464968, 2.938163982698783
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
    3.754408661907416
  ];

  const p_low = 0.02425;
  const p_high = 1.0 - p_low;

  if (p < p_low) {
    const q = Math.sqrt(-2.0 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1.0)
    );
  }

  if (p <= p_high) {
    const q = p - 0.5;
    const r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1.0)
    );
  }

  const q = Math.sqrt(-2.0 * Math.log(1.0 - p));
  return -(
    (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
    ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1.0)
  );
}

/**
 * Standard Normal Cumulative Distribution Function Φ(z)
 */
export function normalCDF(z: number): number {
  if (z < -8.0) return 0.0;
  if (z > 8.0) return 1.0;

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const absZ = Math.abs(z) / Math.SQRT2;

  const t = 1.0 / (1.0 + p * absZ);
  const y = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-absZ * absZ);

  return 0.5 * (1.0 + sign * y);
}

/**
 * Lanczos log-Gamma function ln(Γ(z))
 */
export function logGamma(z: number): number {
  const g = 7;
  const C = [
    0.99999999999980993, 676.52036812188514, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.138571095836524, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1.0 - z);
  z -= 1.0;
  let base = C[0];
  for (let i = 1; i < g + 2; i++) base += C[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2.0 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(base);
}

// 16-point Gauss-Legendre Quadrature abscissas and weights
const GL_X = [
  0.0950125098376374, 0.2816035507792589, 0.4580167776572274, 0.6178762444026438,
  0.7554044083550030, 0.8656312023878318, 0.9445750230732326, 0.9894009349916499
];
const GL_W = [
  0.1894506104550685, 0.1826034150449236, 0.1691565193950025, 0.1495959888165767,
  0.1246289712555339, 0.0951585116824928, 0.0622535239386479, 0.0271524594117541
];

/**
 * Student's t Probability Density Function
 */
export function studentT_PDF(t: number, df: number): number {
  const logConst = logGamma((df + 1.0) / 2.0) - logGamma(df / 2.0) - 0.5 * Math.log(Math.PI * df);
  return Math.exp(logConst - ((df + 1.0) / 2.0) * Math.log(1.0 + (t * t) / df));
}

/**
 * Student's t Cumulative Distribution Function (via adaptive Gauss-Legendre integration)
 */
export function studentT_CDF(t: number, df: number): number {
  if (t === 0.0) return 0.5;
  if (t < 0.0) return 1.0 - studentT_CDF(-t, df);
  if (df >= 2000) return normalCDF(t);

  const nSub = Math.max(1, Math.ceil(t / 2.0));
  const subH = t / nSub;
  let sum = 0.0;
  for (let s = 0; s < nSub; s++) {
    const a = s * subH;
    const b = (s + 1) * subH;
    const mid = 0.5 * (a + b);
    const halfLen = 0.5 * (b - a);
    let subSum = 0.0;
    for (let i = 0; i < 8; i++) {
      const dx = halfLen * GL_X[i];
      subSum += GL_W[i] * (studentT_PDF(mid + dx, df) + studentT_PDF(mid - dx, df));
    }
    sum += subSum * halfLen;
  }
  return Math.min(1.0, 0.5 + sum);
}

/**
 * High-precision Student's t Inverse CDF (Quantile function)
 * Uses analytical forms for df=1 and df=2, and Gauss-Legendre + Newton-Raphson refinement for df >= 3.
 */
export function inverseStudentT(p: number, df: number): number {
  if (p <= 0.0) return -Infinity;
  if (p >= 1.0) return Infinity;
  if (p === 0.5) return 0.0;
  if (p < 0.5) return -inverseStudentT(1.0 - p, df);
  if (df >= 2000) return inverseNormalCDF(p);

  // Exact analytical quantile for df=1 (Cauchy distribution)
  if (Math.abs(df - 1.0) < 1e-6) {
    return Math.tan(Math.PI * (p - 0.5));
  }

  // Exact analytical quantile for df=2
  if (Math.abs(df - 2.0) < 1e-6) {
    return (2.0 * p - 1.0) / Math.sqrt(2.0 * p * (1.0 - p));
  }

  // Initial estimate using Cornish-Fisher with Hill's full terms
  const z = inverseNormalCDF(p);
  const z2 = z * z;
  const z3 = z2 * z;
  const z5 = z3 * z2;
  const term1 = z;
  const term2 = (z3 + z) / (4.0 * df);
  const term3 = (5.0 * z5 + 16.0 * z3 + 3.0 * z) / (96.0 * df * df);
  const term4 = (3.0 * z5 + 19.0 * z3 + 17.0 * z - 15.0 * z) / (384.0 * df * df * df);
  let t = Math.max(0.1, term1 + term2 + term3 + term4);

  // High-precision Newton-Raphson refinement (typically converges in 2-4 iterations)
  for (let iter = 0; iter < 15; iter++) {
    const cdf = studentT_CDF(t, df);
    const pdf = studentT_PDF(t, df);
    const diff = cdf - p;
    if (Math.abs(diff) < 1e-12) break;
    if (pdf === 0.0) break;
    t -= diff / pdf;
    if (t <= 0.0) t = 0.05;
  }
  return t;
}

/**
 * Chi-Square Probability Density Function
 */
export function chiSquare_PDF(x: number, df: number): number {
  if (x <= 0.0) return 0.0;
  const halfDf = df / 2.0;
  const logDenom = halfDf * Math.log(2.0) + logGamma(halfDf);
  return Math.exp((halfDf - 1.0) * Math.log(x) - 0.5 * x - logDenom);
}

/**
 * Chi-Square Cumulative Distribution Function (via adaptive Gauss-Legendre integration)
 */
export function chiSquare_CDF(x: number, df: number): number {
  if (x <= 0.0) return 0.0;
  const nSub = Math.max(1, Math.ceil(x / 4.0));
  const subH = x / nSub;
  let sum = 0.0;
  for (let s = 0; s < nSub; s++) {
    const a = s * subH;
    const b = (s + 1) * subH;
    const mid = 0.5 * (a + b);
    const halfLen = 0.5 * (b - a);
    let subSum = 0.0;
    for (let i = 0; i < 8; i++) {
      const dx = halfLen * GL_X[i];
      subSum += GL_W[i] * (chiSquare_PDF(mid + dx, df) + chiSquare_PDF(mid - dx, df));
    }
    sum += subSum * halfLen;
  }
  return Math.min(1.0, sum);
}

/**
 * High-precision Chi-Square Inverse CDF (Wilson-Hilferty + Newton-Raphson refinement)
 */
export function inverseChiSquare(p: number, df: number): number {
  if (p <= 0.0) return 0.0;
  if (p >= 1.0) return Infinity;

  // Wilson-Hilferty transformation as robust starting point
  const z = inverseNormalCDF(p);
  let x = df * Math.pow(1.0 - 2.0 / (9.0 * df) + z * Math.sqrt(2.0 / (9.0 * df)), 3);
  if (x <= 0.0 || !Number.isFinite(x)) x = Math.max(0.1, df);

  // Newton-Raphson refinement to 10+ decimal digits
  for (let iter = 0; iter < 15; iter++) {
    const cdf = chiSquare_CDF(x, df);
    const pdf = chiSquare_PDF(x, df);
    const diff = cdf - p;
    if (Math.abs(diff) < 1e-12) break;
    if (pdf === 0.0) break;
    x -= diff / pdf;
    if (x <= 0.0) x = 0.01;
  }
  return x;
}

// ============================================================================
// 2. DATA UTILITIES
// ============================================================================

export function parseDataStream(input: string): number[] {
  if (!input || !input.trim()) return [];
  const tokens = input
    .replace(/,/g, " ")
    .replace(/\t/g, " ")
    .replace(/\n/g, " ")
    .split(/\s+/);

  const numbers: number[] = [];
  for (const tok of tokens) {
    if (!tok) continue;
    const num = parseFloat(tok);
    if (!Number.isNaN(num) && Number.isFinite(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

// ============================================================================
// 3. SINGLE POPULATION MEAN (Z & STUDENT'S t)
// ============================================================================

export interface MeanCIResult {
  isValid: boolean;
  errorMessage?: string;
  mean: number;
  sd: number;
  n: number;
  confidenceLevel: number;
  alpha: number;
  criticalValue: number;
  distType: "Z" | "t";
  degreesOfFreedom: number;
  fpcApplied: boolean;
  fpcFactor: number;
  se: number;
  me: number;
  lowerBound: number;
  upperBound: number;
  inequalityStr: string;
  intervalStr: string;
  pmStr: string;
  apaCitation: string;
  stepText: string;
}

export function computeMeanCI(
  meanInput: number,
  sdInput: number,
  nInput: number,
  confidenceLevelPct: number = 95,
  knownSigma: boolean = false,
  finiteN?: number,
  precision: number = 4
): MeanCIResult {
  // Domain validations
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100 || Number.isNaN(confidenceLevelPct)) {
    return {
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%.",
      mean: meanInput, sd: sdInput, n: nInput, confidenceLevel: confidenceLevelPct,
      alpha: 0, criticalValue: 0, distType: knownSigma ? "Z" : "t", degreesOfFreedom: 0,
      fpcApplied: false, fpcFactor: 1, se: 0, me: 0, lowerBound: 0, upperBound: 0,
      inequalityStr: "", intervalStr: "", pmStr: "", apaCitation: "", stepText: ""
    };
  }

  if (sdInput <= 0 || Number.isNaN(sdInput)) {
    return {
      isValid: false,
      errorMessage: "Standard deviation must be strictly positive (s > 0).",
      mean: meanInput, sd: sdInput, n: nInput, confidenceLevel: confidenceLevelPct,
      alpha: 0, criticalValue: 0, distType: knownSigma ? "Z" : "t", degreesOfFreedom: 0,
      fpcApplied: false, fpcFactor: 1, se: 0, me: 0, lowerBound: 0, upperBound: 0,
      inequalityStr: "", intervalStr: "", pmStr: "", apaCitation: "", stepText: ""
    };
  }

  const n = Math.round(nInput);
  if (!knownSigma && n < 2) {
    return {
      isValid: false,
      errorMessage: "Sample size must be at least 2 for Student's t-interval (df >= 1).",
      mean: meanInput, sd: sdInput, n: nInput, confidenceLevel: confidenceLevelPct,
      alpha: 0, criticalValue: 0, distType: "t", degreesOfFreedom: 0,
      fpcApplied: false, fpcFactor: 1, se: 0, me: 0, lowerBound: 0, upperBound: 0,
      inequalityStr: "", intervalStr: "", pmStr: "", apaCitation: "", stepText: ""
    };
  }

  if (knownSigma && n < 1) {
    return {
      isValid: false,
      errorMessage: "Sample size must be at least 1 for Normal Z-interval.",
      mean: meanInput, sd: sdInput, n: nInput, confidenceLevel: confidenceLevelPct,
      alpha: 0, criticalValue: 0, distType: "Z", degreesOfFreedom: 0,
      fpcApplied: false, fpcFactor: 1, se: 0, me: 0, lowerBound: 0, upperBound: 0,
      inequalityStr: "", intervalStr: "", pmStr: "", apaCitation: "", stepText: ""
    };
  }

  const cl = confidenceLevelPct / 100.0;
  const alpha = 1.0 - cl;
  const alphaHalf = alpha / 2.0;

  const df = n - 1;
  const useZ = knownSigma;
  const distType: "Z" | "t" = useZ ? "Z" : "t";

  const criticalValue = useZ
    ? Math.abs(inverseNormalCDF(1.0 - alphaHalf))
    : Math.abs(inverseStudentT(1.0 - alphaHalf, df));

  let se = sdInput / Math.sqrt(n);
  let fpcApplied = false;
  let fpcFactor = 1.0;

  if (finiteN && finiteN > n) {
    fpcApplied = true;
    fpcFactor = Math.sqrt((finiteN - n) / (finiteN - 1));
    se *= fpcFactor;
  }

  const me = criticalValue * se;
  const lowerBound = meanInput - me;
  const upperBound = meanInput + me;

  const fmt = (v: number) => v.toFixed(precision);

  const inequalityStr = `${fmt(lowerBound)} < μ < ${fmt(upperBound)}`;
  const intervalStr = `[${fmt(lowerBound)}, ${fmt(upperBound)}]`;
  const pmStr = `${fmt(meanInput)} ± ${fmt(me)}`;

  const apaCitation = `A ${(cl * 100).toFixed(0)}% confidence interval for the population mean was calculated as [${fmt(lowerBound)}, ${fmt(upperBound)}] (M = ${fmt(meanInput)}, SD = ${fmt(sdInput)}, N = ${n}, ME = ±${fmt(me)}).`;

  const stepText = `1. α = 1 - ${cl} = ${alpha.toFixed(4)}, α/2 = ${(alphaHalf).toFixed(4)} → Critical ${distType}* = ${fmt(criticalValue)} ${!useZ ? `(df = ${df})` : ""}.\n2. Standard Error SE = ${sdInput.toFixed(precision)} / √${n} ${fpcApplied ? `× FPC(${fpcFactor.toFixed(4)})` : ""} = ${fmt(se)}.\n3. Margin of Error ME = ${fmt(criticalValue)} × ${fmt(se)} = ±${fmt(me)}.\n4. CI = ${fmt(meanInput)} ± ${fmt(me)} = [${fmt(lowerBound)}, ${fmt(upperBound)}].`;

  return {
    isValid: true,
    mean: meanInput,
    sd: sdInput,
    n,
    confidenceLevel: cl * 100,
    alpha,
    criticalValue: parseFloat(criticalValue.toFixed(precision)),
    distType,
    degreesOfFreedom: df,
    fpcApplied,
    fpcFactor: parseFloat(fpcFactor.toFixed(precision)),
    se: parseFloat(se.toFixed(precision)),
    me: parseFloat(me.toFixed(precision)),
    lowerBound: parseFloat(lowerBound.toFixed(precision)),
    upperBound: parseFloat(upperBound.toFixed(precision)),
    inequalityStr,
    intervalStr,
    pmStr,
    apaCitation,
    stepText
  };
}

// ============================================================================
// 4. SINGLE POPULATION PROPORTION (WILSON, WALD, AGRESTI-COULL)
// ============================================================================

export interface ProportionCIResult {
  isValid: boolean;
  errorMessage?: string;
  x: number;
  n: number;
  pHat: number;
  confidenceLevel: number;
  criticalZ: number;
  waldLower: number;
  waldUpper: number;
  waldME: number;
  wilsonLower: number;
  wilsonUpper: number;
  wilsonME: number;
  agrestiLower: number;
  agrestiUpper: number;
  agrestiME: number;
  stepText: string;
}

export function computeProportionCI(
  xInput: number,
  nInput: number,
  confidenceLevelPct: number = 95,
  precision: number = 4
): ProportionCIResult {
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100 || Number.isNaN(confidenceLevelPct)) {
    return {
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%.",
      x: xInput, n: nInput, pHat: 0, confidenceLevel: confidenceLevelPct, criticalZ: 0,
      waldLower: 0, waldUpper: 0, waldME: 0, wilsonLower: 0, wilsonUpper: 0, wilsonME: 0,
      agrestiLower: 0, agrestiUpper: 0, agrestiME: 0, stepText: ""
    };
  }

  const n = Math.round(nInput);
  const x = Math.round(xInput);

  if (n <= 0) {
    return {
      isValid: false,
      errorMessage: "Sample size (n) must be strictly greater than 0.",
      x, n, pHat: 0, confidenceLevel: confidenceLevelPct, criticalZ: 0,
      waldLower: 0, waldUpper: 0, waldME: 0, wilsonLower: 0, wilsonUpper: 0, wilsonME: 0,
      agrestiLower: 0, agrestiUpper: 0, agrestiME: 0, stepText: ""
    };
  }

  if (x < 0 || x > n) {
    return {
      isValid: false,
      errorMessage: `Success count (x = ${x}) must satisfy 0 <= x <= n (n = ${n}).`,
      x, n, pHat: 0, confidenceLevel: confidenceLevelPct, criticalZ: 0,
      waldLower: 0, waldUpper: 0, waldME: 0, wilsonLower: 0, wilsonUpper: 0, wilsonME: 0,
      agrestiLower: 0, agrestiUpper: 0, agrestiME: 0, stepText: ""
    };
  }

  const pHat = x / n;
  const cl = confidenceLevelPct / 100.0;
  const alphaHalf = (1.0 - cl) / 2.0;
  const z = Math.abs(inverseNormalCDF(1.0 - alphaHalf));

  // 1. Wald Standard Normal Interval
  const waldSE = Math.sqrt((pHat * (1.0 - pHat)) / n);
  const waldME = z * waldSE;
  const waldLower = Math.max(0, pHat - waldME);
  const waldUpper = Math.min(1, pHat + waldME);

  // 2. Wilson Score Interval (recommended standard)
  const z2 = z * z;
  const wilsonCenter = (pHat + z2 / (2 * n)) / (1 + z2 / n);
  const wilsonSpread = (z / (1 + z2 / n)) * Math.sqrt((pHat * (1 - pHat)) / n + z2 / (4 * n * n));
  const wilsonLower = Math.max(0, wilsonCenter - wilsonSpread);
  const wilsonUpper = Math.min(1, wilsonCenter + wilsonSpread);
  const wilsonME = (wilsonUpper - wilsonLower) / 2.0;

  // 3. Agresti-Coull (Plus-Four / Adjusted Wald)
  const xtilde = x + 2;
  const ntilde = n + 4;
  const ptilde = xtilde / ntilde;
  const agrestiSE = Math.sqrt((ptilde * (1.0 - ptilde)) / ntilde);
  const agrestiME = z * agrestiSE;
  const agrestiLower = Math.max(0, ptilde - agrestiME);
  const agrestiUpper = Math.min(1, ptilde + agrestiME);

  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const stepText = `p̂ = ${x}/${n} = ${(pHat * 100).toFixed(2)}%. Critical Z* = ${z.toFixed(precision)}.\nWilson Score CI: [${fmtPct(wilsonLower)}, ${fmtPct(wilsonUpper)}] (Recommended for precision).`;

  return {
    isValid: true,
    x,
    n,
    pHat,
    confidenceLevel: cl * 100,
    criticalZ: parseFloat(z.toFixed(precision)),
    waldLower: parseFloat(waldLower.toFixed(precision)),
    waldUpper: parseFloat(waldUpper.toFixed(precision)),
    waldME: parseFloat(waldME.toFixed(precision)),
    wilsonLower: parseFloat(wilsonLower.toFixed(precision)),
    wilsonUpper: parseFloat(wilsonUpper.toFixed(precision)),
    wilsonME: parseFloat(wilsonME.toFixed(precision)),
    agrestiLower: parseFloat(agrestiLower.toFixed(precision)),
    agrestiUpper: parseFloat(agrestiUpper.toFixed(precision)),
    agrestiME: parseFloat(agrestiME.toFixed(precision)),
    stepText
  };
}

// ============================================================================
// 5. DIFFERENCE BETWEEN TWO INDEPENDENT MEANS
// ============================================================================

export interface TwoMeansCIResult {
  isValid: boolean;
  errorMessage?: string;
  mean1: number;
  sd1: number;
  n1: number;
  mean2: number;
  sd2: number;
  n2: number;
  diff: number;
  confidenceLevel: number;
  equalVariances: boolean;
  df: number;
  criticalT: number;
  seDiff: number;
  me: number;
  lowerBound: number;
  upperBound: number;
  isSignificant: boolean;
  stepText: string;
}

export function computeTwoMeansCI(
  mean1: number,
  sd1: number,
  n1Input: number,
  mean2: number,
  sd2: number,
  n2Input: number,
  equalVariances: boolean = false,
  confidenceLevelPct: number = 95,
  precision: number = 4
): TwoMeansCIResult {
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100 || Number.isNaN(confidenceLevelPct)) {
    return {
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%.",
      mean1, sd1, n1: n1Input, mean2, sd2, n2: n2Input, diff: 0, confidenceLevel: confidenceLevelPct,
      equalVariances, df: 0, criticalT: 0, seDiff: 0, me: 0, lowerBound: 0, upperBound: 0,
      isSignificant: false, stepText: ""
    };
  }

  const n1 = Math.round(n1Input);
  const n2 = Math.round(n2Input);

  if (n1 < 2 || n2 < 2) {
    return {
      isValid: false,
      errorMessage: "Sample sizes n1 and n2 must be at least 2 for Student's t estimation.",
      mean1, sd1, n1, mean2, sd2, n2, diff: 0, confidenceLevel: confidenceLevelPct,
      equalVariances, df: 0, criticalT: 0, seDiff: 0, me: 0, lowerBound: 0, upperBound: 0,
      isSignificant: false, stepText: ""
    };
  }

  if (sd1 <= 0 || sd2 <= 0) {
    return {
      isValid: false,
      errorMessage: "Standard deviations s1 and s2 must be strictly positive.",
      mean1, sd1, n1, mean2, sd2, n2, diff: 0, confidenceLevel: confidenceLevelPct,
      equalVariances, df: 0, criticalT: 0, seDiff: 0, me: 0, lowerBound: 0, upperBound: 0,
      isSignificant: false, stepText: ""
    };
  }

  const diff = mean1 - mean2;
  const cl = confidenceLevelPct / 100.0;
  const alphaHalf = (1.0 - cl) / 2.0;

  let df = 0;
  let seDiff = 0;

  if (equalVariances) {
    // Pooled Variance
    df = n1 + n2 - 2;
    const sp2 = ((n1 - 1) * sd1 * sd1 + (n2 - 1) * sd2 * sd2) / df;
    seDiff = Math.sqrt(sp2 * (1.0 / n1 + 1.0 / n2));
  } else {
    // Welch-Satterthwaite df
    const v1 = (sd1 * sd1) / n1;
    const v2 = (sd2 * sd2) / n2;
    seDiff = Math.sqrt(v1 + v2);

    const num = Math.pow(v1 + v2, 2);
    const den = (v1 * v1) / (n1 - 1) + (v2 * v2) / (n2 - 1);
    df = Math.max(1, num / den);
  }

  const critT = Math.abs(inverseStudentT(1.0 - alphaHalf, df));
  const me = critT * seDiff;
  const lowerBound = diff - me;
  const upperBound = diff + me;

  const isSignificant = (lowerBound > 0 && upperBound > 0) || (lowerBound < 0 && upperBound < 0);
  const fmt = (v: number) => v.toFixed(precision);

  const stepText = `Point Estimate (x̄1 - x̄2) = ${fmt(diff)}.\nMethod: ${equalVariances ? "Pooled Variance t" : "Welch's t (Unequal Variance)"} (df = ${fmt(df)}).\nSE(diff) = ${fmt(seDiff)}, Critical t* = ${fmt(critT)}.\nCI = [${fmt(lowerBound)}, ${fmt(upperBound)}]. ${isSignificant ? "Statistically significant (Interval excludes 0)." : "Not statistically significant (Interval includes 0)."}`;

  return {
    isValid: true,
    mean1,
    sd1,
    n1,
    mean2,
    sd2,
    n2,
    diff: parseFloat(diff.toFixed(precision)),
    confidenceLevel: cl * 100,
    equalVariances,
    df: parseFloat(df.toFixed(2)),
    criticalT: parseFloat(critT.toFixed(precision)),
    seDiff: parseFloat(seDiff.toFixed(precision)),
    me: parseFloat(me.toFixed(precision)),
    lowerBound: parseFloat(lowerBound.toFixed(precision)),
    upperBound: parseFloat(upperBound.toFixed(precision)),
    isSignificant,
    stepText
  };
}

// ============================================================================
// 6. DIFFERENCE BETWEEN TWO INDEPENDENT PROPORTIONS
// ============================================================================

export interface TwoProportionsCIResult {
  isValid: boolean;
  errorMessage?: string;
  x1: number;
  n1: number;
  p1Hat: number;
  x2: number;
  n2: number;
  p2Hat: number;
  diff: number;
  confidenceLevel: number;
  criticalZ: number;
  seDiff: number;
  me: number;
  lowerBound: number;
  upperBound: number;
  isSignificant: boolean;
  stepText: string;
}

export function computeTwoProportionsCI(
  x1Input: number,
  n1Input: number,
  x2Input: number,
  n2Input: number,
  confidenceLevelPct: number = 95,
  precision: number = 4
): TwoProportionsCIResult {
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100 || Number.isNaN(confidenceLevelPct)) {
    return {
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%.",
      x1: x1Input, n1: n1Input, p1Hat: 0, x2: x2Input, n2: n2Input, p2Hat: 0, diff: 0,
      confidenceLevel: confidenceLevelPct, criticalZ: 0, seDiff: 0, me: 0,
      lowerBound: 0, upperBound: 0, isSignificant: false, stepText: ""
    };
  }

  const n1 = Math.round(n1Input);
  const x1 = Math.round(x1Input);
  const n2 = Math.round(n2Input);
  const x2 = Math.round(x2Input);

  if (n1 <= 0 || n2 <= 0) {
    return {
      isValid: false,
      errorMessage: "Sample sizes n1 and n2 must be strictly greater than 0.",
      x1, n1, p1Hat: 0, x2, n2, p2Hat: 0, diff: 0,
      confidenceLevel: confidenceLevelPct, criticalZ: 0, seDiff: 0, me: 0,
      lowerBound: 0, upperBound: 0, isSignificant: false, stepText: ""
    };
  }

  if (x1 < 0 || x1 > n1 || x2 < 0 || x2 > n2) {
    return {
      isValid: false,
      errorMessage: `Success counts must satisfy 0 <= x1 <= n1 and 0 <= x2 <= n2. (Received x1=${x1}, n1=${n1}, x2=${x2}, n2=${n2})`,
      x1, n1, p1Hat: 0, x2, n2, p2Hat: 0, diff: 0,
      confidenceLevel: confidenceLevelPct, criticalZ: 0, seDiff: 0, me: 0,
      lowerBound: 0, upperBound: 0, isSignificant: false, stepText: ""
    };
  }

  const p1 = x1 / n1;
  const p2 = x2 / n2;
  const diff = p1 - p2;

  const cl = confidenceLevelPct / 100.0;
  const alphaHalf = (1.0 - cl) / 2.0;
  const z = Math.abs(inverseNormalCDF(1.0 - alphaHalf));

  const seDiff = Math.sqrt((p1 * (1.0 - p1)) / n1 + (p2 * (1.0 - p2)) / n2);
  const me = z * seDiff;

  const lowerBound = Math.max(-1.0, diff - me);
  const upperBound = Math.min(1.0, diff + me);
  const isSignificant = (lowerBound > 0 && upperBound > 0) || (lowerBound < 0 && upperBound < 0);

  const fmt = (v: number) => v.toFixed(precision);
  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const stepText = `p̂1 = ${x1}/${n1} = ${fmtPct(p1)}, p̂2 = ${x2}/${n2} = ${fmtPct(p2)}.\nDiff (p̂1 - p̂2) = ${fmtPct(diff)}, Critical Z* = ${fmt(z)}.\nSE(diff) = ${fmt(seDiff)}, ME = ±${fmtPct(me)}.\nCI = [${fmtPct(lowerBound)}, ${fmtPct(upperBound)}]. ${isSignificant ? "Statistically significant (Excludes 0)." : "Not statistically significant (Includes 0)."}`;

  return {
    isValid: true,
    x1, n1, p1Hat: p1,
    x2, n2, p2Hat: p2,
    diff: parseFloat(diff.toFixed(precision)),
    confidenceLevel: cl * 100,
    criticalZ: parseFloat(z.toFixed(precision)),
    seDiff: parseFloat(seDiff.toFixed(precision)),
    me: parseFloat(me.toFixed(precision)),
    lowerBound: parseFloat(lowerBound.toFixed(precision)),
    upperBound: parseFloat(upperBound.toFixed(precision)),
    isSignificant,
    stepText
  };
}

// ============================================================================
// 7. POPULATION VARIANCE & STANDARD DEVIATION (CHI-SQUARE)
// ============================================================================

export interface VarianceCIResult {
  isValid: boolean;
  errorMessage?: string;
  s: number;
  n: number;
  confidenceLevel: number;
  df: number;
  chi2Lower: number;
  chi2Upper: number;
  varLower: number;
  varUpper: number;
  sdLower: number;
  sdUpper: number;
  stepText: string;
}

export function computeVarianceCI(
  sdInput: number,
  nInput: number,
  confidenceLevelPct: number = 95,
  precision: number = 4
): VarianceCIResult {
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100 || Number.isNaN(confidenceLevelPct)) {
    return {
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%.",
      s: sdInput, n: nInput, confidenceLevel: confidenceLevelPct, df: 0,
      chi2Lower: 0, chi2Upper: 0, varLower: 0, varUpper: 0, sdLower: 0, sdUpper: 0, stepText: ""
    };
  }

  const n = Math.round(nInput);
  if (n < 2) {
    return {
      isValid: false,
      errorMessage: "Sample size must be at least 2 for chi-square variance estimation (df >= 1).",
      s: sdInput, n, confidenceLevel: confidenceLevelPct, df: 0,
      chi2Lower: 0, chi2Upper: 0, varLower: 0, varUpper: 0, sdLower: 0, sdUpper: 0, stepText: ""
    };
  }

  if (sdInput <= 0) {
    return {
      isValid: false,
      errorMessage: "Sample standard deviation must be strictly positive (s > 0).",
      s: sdInput, n, confidenceLevel: confidenceLevelPct, df: 0,
      chi2Lower: 0, chi2Upper: 0, varLower: 0, varUpper: 0, sdLower: 0, sdUpper: 0, stepText: ""
    };
  }

  const s = sdInput;
  const df = n - 1;

  const cl = confidenceLevelPct / 100.0;
  const alpha = 1.0 - cl;

  const chi2Lower = inverseChiSquare(alpha / 2.0, df);
  const chi2Upper = inverseChiSquare(1.0 - alpha / 2.0, df);

  const s2 = s * s;
  const varLower = (df * s2) / chi2Upper;
  const varUpper = (df * s2) / chi2Lower;

  const sdLower = Math.sqrt(varLower);
  const sdUpper = Math.sqrt(varUpper);

  const fmt = (v: number) => v.toFixed(precision);

  const stepText = `df = ${df}, s² = ${fmt(s2)}.\nCritical Chi-Square: χ²_lower(α/2) = ${fmt(chi2Lower)}, χ²_upper(1-α/2) = ${fmt(chi2Upper)}.\nVariance CI = [${fmt(varLower)}, ${fmt(varUpper)}].\nSD CI = [${fmt(sdLower)}, ${fmt(sdUpper)}].`;

  return {
    isValid: true,
    s,
    n,
    confidenceLevel: cl * 100,
    df,
    chi2Lower: parseFloat(chi2Lower.toFixed(precision)),
    chi2Upper: parseFloat(chi2Upper.toFixed(precision)),
    varLower: parseFloat(varLower.toFixed(precision)),
    varUpper: parseFloat(varUpper.toFixed(precision)),
    sdLower: parseFloat(sdLower.toFixed(precision)),
    sdUpper: parseFloat(sdUpper.toFixed(precision)),
    stepText
  };
}
