/**
 * Core mathematical engine for Z-Score & Normal Distribution Suite
 */

// High-precision approximation of Standard Normal CDF Φ(z) using Abramowitz & Stegun formula 7.1.26
export function normalCDF(z: number): number {
  if (!Number.isFinite(z)) {
    return z > 0 ? 1.0 : 0.0;
  }
  if (z === 0) return 0.5;
  if (z < -8.0) return 0.0;
  if (z > 8.0) return 1.0;

  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.SQRT2;

  // A&S formula 7.1.26 for erf(x)
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  const erf = sign * y;
  const res = 0.5 * (1.0 + erf);
  return Math.max(0.0, Math.min(1.0, res));
}

// High-precision Inverse Standard Normal CDF using Peter J. Acklam's algorithm (relative error < 1.15e-9)
export function inverseNormalCDF(p: number): number {
  if (p <= 0.0) return -Infinity;
  if (p >= 1.0) return Infinity;
  if (p === 0.5) return 0.0;

  // Coefficients in rational approximations
  const a = [
    -3.969683028665376e+01,
     2.209460984245205e+02,
    -2.759285104469687e+02,
     1.383577518672690e+02,
    -3.066479806614716e+01,
     2.506628277459239e+00
  ];

  const b = [
    -5.447609879822406e+01,
     1.615858368580409e+02,
    -1.556989798598866e+02,
     6.680131188771972e+01,
    -1.328068155288572e+01
  ];

  const c = [
    -7.784894002430293e-03,
    -3.223964580411365e-01,
    -2.400758277161838e+00,
    -2.549732539343734e+00,
     4.374664141464968e+00,
     2.938163982698783e+00
  ];

  const d = [
     7.784695709041462e-03,
     3.224671290700398e-01,
     2.445134137142996e+00,
     3.754408661907416e+00
  ];

  const p_low = 0.02425;
  const p_high = 1 - p_low;

  let q: number;

  // Rational approximation for lower region:
  if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
           ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }

  // Rational approximation for upper region:
  if (p > p_high) {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5]) /
            ((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1);
  }

  // Rational approximation for central region:
  q = p - 0.5;
  const r = q * q;
  return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q /
         (((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1);
}

// Standard Normal Probability Density Function φ(z)
export function normalPDF(z: number): number {
  if (!Number.isFinite(z)) return 0.0;
  return (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * z * z);
}

export interface StandardZResult {
  isValid: boolean;
  errorMessage?: string;
  rawScore: number;
  mean: number;
  sd: number;
  isSample: boolean;
  zScore: number;
  zScoreFormatted: string;
  leftTailP: number;
  leftTailPct: string;
  rightTailP: number;
  rightTailPct: string;
  betweenP: number;
  betweenPct: string;
  twoTailsP: number;
  twoTailsPct: string;
  percentileRank: string;
  stepText: string;
}

export function computeStandardZ(
  rawScore: number,
  mean: number,
  sd: number,
  isSample: boolean = false,
  precision: number = 4
): StandardZResult {
  const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(precision) : "—");
  const fmtPct = (v: number) => (Number.isFinite(v) ? `${(Math.max(0, Math.min(100, v * 100))).toFixed(2)}%` : "—");

  const meanSymbol = isSample ? "x̄" : "μ";
  const sdSymbol = isSample ? "s" : "σ";

  if (!Number.isFinite(sd) || sd <= 0) {
    return {
      isValid: false,
      errorMessage: "Standard deviation must be strictly greater than 0 (σ > 0).",
      rawScore,
      mean,
      sd,
      isSample,
      zScore: NaN,
      zScoreFormatted: "Undefined",
      leftTailP: NaN,
      leftTailPct: "Undefined",
      rightTailP: NaN,
      rightTailPct: "Undefined",
      betweenP: NaN,
      betweenPct: "Undefined",
      twoTailsP: NaN,
      twoTailsPct: "Undefined",
      percentileRank: "Undefined",
      stepText: `Z = (X - ${meanSymbol}) / ${sdSymbol} = (${rawScore} - ${mean}) / ${sd} → Undefined (division by non-positive SD)`
    };
  }

  const zScore = (rawScore - mean) / sd;

  const leftP = normalCDF(zScore);
  const rightP = Math.max(0.0, 1.0 - leftP);
  const absZ = Math.abs(zScore);
  const betweenP = Math.max(0.0, Math.min(1.0, normalCDF(absZ) - normalCDF(-absZ)));
  const twoTailsP = Math.max(0.0, Math.min(1.0, 2.0 * (1.0 - normalCDF(absZ))));

  const stepText = `Z = (X - ${meanSymbol}) / ${sdSymbol} = (${rawScore} - ${mean}) / ${sd} = ${(rawScore - mean).toFixed(precision)} / ${sd} = ${fmt(zScore)}`;

  return {
    isValid: true,
    rawScore,
    mean,
    sd,
    isSample,
    zScore,
    zScoreFormatted: fmt(zScore),
    leftTailP: parseFloat(leftP.toFixed(6)),
    leftTailPct: fmtPct(leftP),
    rightTailP: parseFloat(rightP.toFixed(6)),
    rightTailPct: fmtPct(rightP),
    betweenP: parseFloat(betweenP.toFixed(6)),
    betweenPct: fmtPct(betweenP),
    twoTailsP: parseFloat(twoTailsP.toFixed(6)),
    twoTailsPct: fmtPct(twoTailsP),
    percentileRank: fmtPct(leftP),
    stepText
  };
}

export interface InverseZResult {
  isValid: boolean;
  errorMessage?: string;
  probInput: number;
  probType: "prob" | "conf" | "pct";
  tailType: "left" | "right" | "two";
  mean: number;
  sd: number;
  criticalZ: number;
  criticalZFormatted: string;
  rawValue: number;
  rawValueFormatted: string;
  marginOfError: number;
  marginOfErrorFormatted: string;
  explanation: string;
}

export function computeInverseZ(
  value: number,
  probType: "prob" | "conf" | "pct" = "conf",
  tailType: "left" | "right" | "two" = "two",
  mean: number = 0,
  sd: number = 1,
  precision: number = 4
): InverseZResult {
  const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(precision) : "—");

  if (!Number.isFinite(sd) || sd <= 0) {
    return {
      isValid: false,
      errorMessage: "Standard deviation must be strictly greater than 0.",
      probInput: value,
      probType,
      tailType,
      mean,
      sd,
      criticalZ: NaN,
      criticalZFormatted: "Undefined",
      rawValue: NaN,
      rawValueFormatted: "Undefined",
      marginOfError: NaN,
      marginOfErrorFormatted: "Undefined",
      explanation: "Standard deviation cannot be zero or negative."
    };
  }

  let p = value;
  let isOutOfRange = false;

  if (probType === "pct") {
    if (value <= 0 || value >= 100) isOutOfRange = true;
    p = value / 100.0;
  } else if (probType === "conf") {
    const confVal = value > 1 ? value : value * 100;
    if (confVal <= 0 || confVal >= 100) isOutOfRange = true;
    p = confVal / 100.0;
  } else {
    // prob mode (0 < p < 1)
    if (value <= 0 || value >= 1) isOutOfRange = true;
    p = value;
  }

  if (isOutOfRange || !Number.isFinite(p) || p <= 0 || p >= 1) {
    return {
      isValid: false,
      errorMessage: probType === "prob"
        ? "Probability must be strictly between 0 and 1 (exclusive)."
        : "Confidence level / percentile must be strictly between 0% and 100% (exclusive).",
      probInput: value,
      probType,
      tailType,
      mean,
      sd,
      criticalZ: NaN,
      criticalZFormatted: "Undefined",
      rawValue: NaN,
      rawValueFormatted: "Undefined",
      marginOfError: NaN,
      marginOfErrorFormatted: "Undefined",
      explanation: "Probability parameter is out of mathematical range (0, 1)."
    };
  }

  let critZ = 0;
  if (tailType === "left") {
    critZ = inverseNormalCDF(p);
  } else if (tailType === "right") {
    critZ = inverseNormalCDF(1.0 - p);
  } else {
    // Two-tailed confidence level alpha = 1 - p
    const alpha = 1.0 - p;
    critZ = Math.abs(inverseNormalCDF(1.0 - alpha / 2.0));
  }

  const rawVal = mean + critZ * sd;
  const me = Math.abs(critZ * sd);

  const explanation = tailType === "two"
    ? `For a ${(p * 100).toFixed(1)}% confidence level (two-tailed, α = ${(1 - p).toFixed(4)}), critical Z* = ±${fmt(critZ)}. Corresponding raw value X = ${fmt(rawVal)} with Margin of Error = ±${fmt(me)}.`
    : `For ${tailType}-tailed probability ${p.toFixed(4)}, critical Z = ${fmt(critZ)}. Corresponding raw value X = ${fmt(rawVal)}.`;

  return {
    isValid: true,
    probInput: value,
    probType,
    tailType,
    mean,
    sd,
    criticalZ: critZ,
    criticalZFormatted: fmt(critZ),
    rawValue: rawVal,
    rawValueFormatted: fmt(rawVal),
    marginOfError: me,
    marginOfErrorFormatted: fmt(me),
    explanation
  };
}

export interface IntervalZResult {
  isValid: boolean;
  errorMessage?: string;
  x1: number;
  x2: number;
  mean: number;
  sd: number;
  z1: number;
  z1Formatted: string;
  z2: number;
  z2Formatted: string;
  areaBetween: number;
  areaBetweenPct: string;
  areaOutside: number;
  areaOutsidePct: string;
  stepText: string;
}

export function computeIntervalZ(
  x1: number,
  x2: number,
  mean: number,
  sd: number,
  precision: number = 4
): IntervalZResult {
  const fmt = (v: number) => (Number.isFinite(v) ? v.toFixed(precision) : "—");
  const fmtPct = (v: number) => (Number.isFinite(v) ? `${(v * 100).toFixed(2)}%` : "—");

  if (!Number.isFinite(sd) || sd <= 0) {
    return {
      isValid: false,
      errorMessage: "Standard deviation must be strictly greater than 0.",
      x1,
      x2,
      mean,
      sd,
      z1: NaN,
      z1Formatted: "Undefined",
      z2: NaN,
      z2Formatted: "Undefined",
      areaBetween: NaN,
      areaBetweenPct: "Undefined",
      areaOutside: NaN,
      areaOutsidePct: "Undefined",
      stepText: "Undefined (standard deviation must be positive)."
    };
  }

  const lowerX = Math.min(x1, x2);
  const upperX = Math.max(x1, x2);

  const z1 = (lowerX - mean) / sd;
  const z2 = (upperX - mean) / sd;

  const cdf1 = normalCDF(z1);
  const cdf2 = normalCDF(z2);
  const areaBetween = Math.max(0.0, Math.min(1.0, cdf2 - cdf1));
  const areaOutside = Math.max(0.0, Math.min(1.0, 1.0 - areaBetween));

  const stepText = `Z1 = (${lowerX} - ${mean}) / ${sd} = ${fmt(z1)}, Z2 = (${upperX} - ${mean}) / ${sd} = ${fmt(z2)}. Area = P(${fmt(z1)} ≤ Z ≤ ${fmt(z2)}) = ${cdf2.toFixed(4)} - ${cdf1.toFixed(4)} = ${fmt(areaBetween)}`;

  return {
    isValid: true,
    x1: lowerX,
    x2: upperX,
    mean,
    sd,
    z1,
    z1Formatted: fmt(z1),
    z2,
    z2Formatted: fmt(z2),
    areaBetween: parseFloat(areaBetween.toFixed(6)),
    areaBetweenPct: fmtPct(areaBetween),
    areaOutside: parseFloat(areaOutside.toFixed(6)),
    areaOutsidePct: fmtPct(areaOutside),
    stepText
  };
}

export interface BatchZItem {
  val: number;
  zScore: number;
  zScoreFormatted: string;
  percentilePct: string;
}

export interface BatchZResult {
  count: number;
  mean: number;
  median: number;
  variance: number;
  sd: number;
  items: BatchZItem[];
  invalidTokens: string[];
}

export function parseBatchData(input: string): { numbers: number[]; invalidTokens: string[] } {
  if (!input || !input.trim()) return { numbers: [], invalidTokens: [] };
  const tokens = input
    .replace(/,/g, " ")
    .replace(/\t/g, " ")
    .replace(/\n/g, " ")
    .split(/\s+/);

  const numbers: number[] = [];
  const invalidTokens: string[] = [];
  for (const tok of tokens) {
    if (!tok) continue;
    const num = parseFloat(tok);
    if (!Number.isNaN(num) && Number.isFinite(num)) {
      numbers.push(num);
    } else {
      invalidTokens.push(tok);
    }
  }
  return { numbers, invalidTokens };
}

export function computeBatchZ(input: string, precision: number = 4): BatchZResult {
  const { numbers: data, invalidTokens } = parseBatchData(input);
  if (data.length === 0) {
    return { count: 0, mean: 0, median: 0, variance: 0, sd: 0, items: [], invalidTokens };
  }

  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const sum = data.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  const mid = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const sumSqDev = data.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  // Sample variance and standard deviation (Bessel's correction n - 1)
  const variance = n > 1 ? sumSqDev / (n - 1) : 0;
  const sd = Math.sqrt(variance);

  const safeSD = sd > 0 ? sd : 1.0;

  const fmt = (v: number) => v.toFixed(precision);
  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const items: BatchZItem[] = data.map((val) => {
    const z = sd > 0 ? (val - mean) / sd : 0;
    const p = normalCDF(z);
    return {
      val,
      zScore: z,
      zScoreFormatted: fmt(z),
      percentilePct: fmtPct(p)
    };
  });

  return {
    count: n,
    mean: parseFloat(mean.toFixed(precision)),
    median: parseFloat(median.toFixed(precision)),
    variance: parseFloat(variance.toFixed(precision)),
    sd: parseFloat(sd.toFixed(precision)),
    items,
    invalidTokens
  };
}
