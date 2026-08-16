/**
 * Core mathematical engine for Z-Score & Normal Distribution Suite
 */

// High-precision approximation of Standard Normal CDF Φ(z) using Abramowitz & Stegun formula
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
  const x = Math.abs(z) / Math.SQRT2;

  // A&S formula 7.1.26 for erf(x)
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  const erf = sign * y;
  return 0.5 * (1.0 + erf);
}

// Inverse Standard Normal CDF (Probit Function) for Critical Z-Scores
export function inverseNormalCDF(p: number): number {
  if (p <= 0.0) return -4.0;
  if (p >= 1.0) return 4.0;

  // Rational approximation for lower/upper region
  const q = p < 0.5 ? p : 1.0 - p;
  if (q <= 0) return 0;

  const t = Math.sqrt(-2.0 * Math.log(q));

  // Coefficients for rational approximation
  const c0 = 2.515517;
  const c1 = 0.802853;
  const c2 = 0.010328;
  const d1 = 1.432788;
  const d2 = 0.189269;
  const d3 = 0.001308;

  const num = (c2 * t + c1) * t + c0;
  const den = ((d3 * t + d2) * t + d1) * t + 1.0;
  const x = t - num / den;

  return p < 0.5 ? -x : x;
}

// Standard Normal Probability Density Function φ(z)
export function normalPDF(z: number): number {
  return (1.0 / Math.sqrt(2.0 * Math.PI)) * Math.exp(-0.5 * z * z);
}

export interface StandardZResult {
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
  const safeSD = sd > 0 ? sd : 1.0;
  const zScore = (rawScore - mean) / safeSD;

  const leftP = normalCDF(zScore);
  const rightP = 1.0 - leftP;
  const absZ = Math.abs(zScore);
  const betweenP = normalCDF(absZ) - normalCDF(-absZ);
  const twoTailsP = 2.0 * (1.0 - normalCDF(absZ));

  const fmt = (v: number) => v.toFixed(precision);
  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const meanSymbol = isSample ? "x̄" : "μ";
  const sdSymbol = isSample ? "s" : "σ";

  const stepText = `Z = (X - ${meanSymbol}) / ${sdSymbol} = (${rawScore} - ${mean}) / ${safeSD} = ${(rawScore - mean).toFixed(precision)} / ${safeSD} = ${fmt(zScore)}`;

  return {
    rawScore,
    mean,
    sd: safeSD,
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
  const safeSD = sd > 0 ? sd : 1.0;
  let p = value;

  if (probType === "pct") {
    p = value / 100.0;
  } else if (probType === "conf") {
    p = value > 1 ? value / 100.0 : value;
  }

  p = Math.max(0.0001, Math.min(0.9999, p));

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

  const rawVal = mean + critZ * safeSD;
  const me = critZ * safeSD;

  const fmt = (v: number) => v.toFixed(precision);

  const explanation = tailType === "two"
    ? `For a ${(p * 100).toFixed(1)}% confidence level (two-tailed), critical Z* = ±${fmt(critZ)}. Corresponding raw value X = ${fmt(rawVal)} with Margin of Error = ±${fmt(me)}.`
    : `For ${tailType}-tailed probability ${p.toFixed(4)}, critical Z = ${fmt(critZ)}. Corresponding raw value X = ${fmt(rawVal)}.`;

  return {
    probInput: value,
    probType,
    tailType,
    mean,
    sd: safeSD,
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
  const safeSD = sd > 0 ? sd : 1.0;
  const lowerX = Math.min(x1, x2);
  const upperX = Math.max(x1, x2);

  const z1 = (lowerX - mean) / safeSD;
  const z2 = (upperX - mean) / safeSD;

  const cdf1 = normalCDF(z1);
  const cdf2 = normalCDF(z2);
  const areaBetween = cdf2 - cdf1;
  const areaOutside = 1.0 - areaBetween;

  const fmt = (v: number) => v.toFixed(precision);
  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const stepText = `Z1 = (${lowerX} - ${mean}) / ${safeSD} = ${fmt(z1)}, Z2 = (${upperX} - ${mean}) / ${safeSD} = ${fmt(z2)}. Area = P(${fmt(z1)} ≤ Z ≤ ${fmt(z2)}) = ${cdf2.toFixed(4)} - ${cdf1.toFixed(4)} = ${fmt(areaBetween)}`;

  return {
    x1: lowerX,
    x2: upperX,
    mean,
    sd: safeSD,
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
}

export function parseBatchData(input: string): number[] {
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

export function computeBatchZ(input: string, precision: number = 4): BatchZResult {
  const data = parseBatchData(input);
  if (data.length === 0) {
    return { count: 0, mean: 0, median: 0, variance: 0, sd: 0, items: [] };
  }

  const n = data.length;
  const sorted = [...data].sort((a, b) => a - b);
  const sum = data.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  const mid = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const sumSqDev = data.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const variance = n > 1 ? sumSqDev / (n - 1) : 0;
  const sd = Math.sqrt(variance);

  const safeSD = sd > 0 ? sd : 1.0;

  const fmt = (v: number) => v.toFixed(precision);
  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const items: BatchZItem[] = data.map((val) => {
    const z = (val - mean) / safeSD;
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
    items
  };
}
