/**
 * Mathematical logic engine for Confidence Interval & Statistical Estimation Suite
 */

// High-precision approximation of Standard Normal Inverse CDF (Probit Function)
export function inverseNormalCDF(p: number): number {
  if (p <= 0.0) return -4.0;
  if (p >= 1.0) return 4.0;

  const q = p < 0.5 ? p : 1.0 - p;
  if (q <= 0) return 0;

  const t = Math.sqrt(-2.0 * Math.log(q));

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

// Student's t distribution Inverse CDF approximation using Hill / Cornish-Fisher Expansion
export function inverseStudentT(p: number, df: number): number {
  if (df <= 0) return inverseNormalCDF(p);
  if (df >= 1000) return inverseNormalCDF(p);

  const z = inverseNormalCDF(p);
  const z2 = z * z;
  const z3 = z2 * z;
  const z5 = z3 * z2;

  // Cornish-Fisher expansion terms for Student's t quantile
  const term1 = z;
  const term2 = (z3 + z) / (4.0 * df);
  const term3 = (5.0 * z5 + 16.0 * z3 + 3.0 * z) / (96.0 * df * df);
  const term4 = (3.0 * z5 + 19.0 * z3 + 17.0 * z) / (384.0 * df * df * df);

  return term1 + term2 + term3 + term4;
}

// Chi-Square Inverse CDF Approximation (Wilson-Hilferty transformation)
export function inverseChiSquare(p: number, df: number): number {
  if (df <= 0) return 0;
  const z = inverseNormalCDF(p);
  const term = 1.0 - (2.0 / (9.0 * df)) + z * Math.sqrt(2.0 / (9.0 * df));
  return Math.max(0.0001, df * Math.pow(term, 3));
}

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

export interface MeanCIResult {
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
  const n = Math.max(2, Math.round(nInput));
  const sd = Math.max(0.0001, sdInput);
  const cl = Math.max(50, Math.min(99.99, confidenceLevelPct)) / 100.0;
  const alpha = 1.0 - cl;
  const alphaHalf = alpha / 2.0;

  const df = n - 1;
  const useZ = knownSigma || n >= 30;
  const distType: "Z" | "t" = useZ ? "Z" : "t";

  const criticalValue = useZ
    ? Math.abs(inverseNormalCDF(1.0 - alphaHalf))
    : Math.abs(inverseStudentT(1.0 - alphaHalf, df));

  let se = sd / Math.sqrt(n);
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

  const apaCitation = `A ${(cl * 100).toFixed(0)}% confidence interval for the population mean was calculated as [${fmt(lowerBound)}, ${fmt(upperBound)}] (M = ${fmt(meanInput)}, SD = ${fmt(sd)}, N = ${n}, ME = ±${fmt(me)}).`;

  const stepText = `1. α = 1 - ${cl} = ${alpha.toFixed(4)}, α/2 = ${(alphaHalf).toFixed(4)} → Critical ${distType}* = ${fmt(criticalValue)} ${!useZ ? `(df = ${df})` : ""}.\n2. Standard Error SE = ${sd.toFixed(precision)} / √${n} ${fpcApplied ? `× FPC(${fpcFactor.toFixed(4)})` : ""} = ${fmt(se)}.\n3. Margin of Error ME = ${fmt(criticalValue)} × ${fmt(se)} = ±${fmt(me)}.\n4. CI = ${fmt(meanInput)} ± ${fmt(me)} = [${fmt(lowerBound)}, ${fmt(upperBound)}].`;

  return {
    mean: meanInput,
    sd,
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

export interface ProportionCIResult {
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
  stepText: string;
}

export function computeProportionCI(
  xInput: number,
  nInput: number,
  confidenceLevelPct: number = 95,
  precision: number = 4
): ProportionCIResult {
  const n = Math.max(1, Math.round(nInput));
  const x = Math.max(0, Math.min(n, Math.round(xInput)));
  const pHat = x / n;

  const cl = Math.max(50, Math.min(99.99, confidenceLevelPct)) / 100.0;
  const alphaHalf = (1.0 - cl) / 2.0;
  const z = Math.abs(inverseNormalCDF(1.0 - alphaHalf));

  // 1. Wald Standard Normal
  const waldSE = Math.sqrt((pHat * (1.0 - pHat)) / n);
  const waldME = z * waldSE;
  const waldLower = Math.max(0, pHat - waldME);
  const waldUpper = Math.min(1, pHat + waldME);

  // 2. Wilson Score Interval
  const z2 = z * z;
  const wilsonCenter = (pHat + z2 / (2 * n)) / (1 + z2 / n);
  const wilsonSpread = (z / (1 + z2 / n)) * Math.sqrt((pHat * (1 - pHat)) / n + z2 / (4 * n * n));
  const wilsonLower = Math.max(0, wilsonCenter - wilsonSpread);
  const wilsonUpper = Math.min(1, wilsonCenter + wilsonSpread);
  const wilsonME = (wilsonUpper - wilsonLower) / 2.0;

  // 3. Agresti-Coull (Plus Four)
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
    stepText
  };
}

export interface TwoMeansCIResult {
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
  const n1 = Math.max(2, Math.round(n1Input));
  const n2 = Math.max(2, Math.round(n2Input));
  const s1 = Math.max(0.0001, sd1);
  const s2 = Math.max(0.0001, sd2);

  const diff = mean1 - mean2;
  const cl = Math.max(50, Math.min(99.99, confidenceLevelPct)) / 100.0;
  const alphaHalf = (1.0 - cl) / 2.0;

  let df = 0;
  let seDiff = 0;

  if (equalVariances) {
    // Pooled Variance
    df = n1 + n2 - 2;
    const sp2 = ((n1 - 1) * s1 * s1 + (n2 - 1) * s2 * s2) / df;
    seDiff = Math.sqrt(sp2 * (1.0 / n1 + 1.0 / n2));
  } else {
    // Welch-Satterthwaite df
    const v1 = (s1 * s1) / n1;
    const v2 = (s2 * s2) / n2;
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
    mean1,
    sd1: s1,
    n1,
    mean2,
    sd2: s2,
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

export interface TwoProportionsCIResult {
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
  const n1 = Math.max(1, Math.round(n1Input));
  const x1 = Math.max(0, Math.min(n1, Math.round(x1Input)));
  const p1 = x1 / n1;

  const n2 = Math.max(1, Math.round(n2Input));
  const x2 = Math.max(0, Math.min(n2, Math.round(x2Input)));
  const p2 = x2 / n2;

  const diff = p1 - p2;
  const cl = Math.max(50, Math.min(99.99, confidenceLevelPct)) / 100.0;
  const alphaHalf = (1.0 - cl) / 2.0;
  const z = Math.abs(inverseNormalCDF(1.0 - alphaHalf));

  const seDiff = Math.sqrt((p1 * (1.0 - p1)) / n1 + (p2 * (1.0 - p2)) / n2);
  const me = z * seDiff;

  const lowerBound = Math.max(-1.0, diff - me);
  const upperBound = Math.min(1.0, diff + me);
  const isSignificant = (lowerBound > 0 && upperBound > 0) || (lowerBound < 0 && upperBound < 0);

  const fmt = (v: number) => v.toFixed(precision);
  const fmtPct = (v: number) => `${(v * 100).toFixed(2)}%`;

  const stepText = `p̂1 = ${x1}/${n1} = ${fmtPct(p1)}, p̂2 = ${x2}/${n2} = ${fmtPct(p2)}.\nDiff = ${fmtPct(diff)}, Critical Z* = ${fmt(z)}.\nSE(diff) = ${fmt(seDiff)}, ME = ±${fmtPct(me)}.\nCI = [${fmtPct(lowerBound)}, ${fmtPct(upperBound)}]. ${isSignificant ? "Statistically significant (Excludes 0)." : "Not statistically significant (Includes 0)."}`;

  return {
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

export interface VarianceCIResult {
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
}

export function computeVarianceCI(
  sdInput: number,
  nInput: number,
  confidenceLevelPct: number = 95,
  precision: number = 4
): VarianceCIResult {
  const n = Math.max(2, Math.round(nInput));
  const s = Math.max(0.0001, sdInput);
  const df = n - 1;

  const cl = Math.max(50, Math.min(99.99, confidenceLevelPct)) / 100.0;
  const alpha = 1.0 - cl;

  const chi2Lower = inverseChiSquare(alpha / 2.0, df);
  const chi2Upper = inverseChiSquare(1.0 - alpha / 2.0, df);

  const s2 = s * s;
  const varLower = (df * s2) / chi2Upper;
  const varUpper = (df * s2) / chi2Lower;

  const sdLower = Math.sqrt(varLower);
  const sdUpper = Math.sqrt(varUpper);

  return {
    s,
    n,
    confidenceLevel: cl * 100,
    df,
    chi2Lower: parseFloat(chi2Lower.toFixed(precision)),
    chi2Upper: parseFloat(chi2Upper.toFixed(precision)),
    varLower: parseFloat(varLower.toFixed(precision)),
    varUpper: parseFloat(varUpper.toFixed(precision)),
    sdLower: parseFloat(sdLower.toFixed(precision)),
    sdUpper: parseFloat(sdUpper.toFixed(precision))
  };
}
