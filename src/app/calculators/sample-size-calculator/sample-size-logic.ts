/**
 * Core mathematical engine for Sample Size Calculator & Statistical Power Analysis Suite
 * Precision implementation with Peter J. Acklam's inverse normal CDF algorithm
 */

export interface SurveySampleResult {
  uncorrectedN: number;
  sampleSize: number;
  fpcApplied: boolean;
  zScore: number;
  marginOfErrorPct: number;
  confidenceLevelPct: number;
  populationN?: number;
  invitedTarget: number;
  responseRatePct: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface ContinuousMeanSampleResult {
  sampleSize: number;
  uncorrectedN: number;
  zScore: number;
  confidenceLevelPct: number;
  precisionE: number;
  sd: number;
  fpcApplied: boolean;
  populationN?: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface PowerAnalysisResult {
  nPerGroup: number;
  totalN: number;
  zAlpha: number;
  zBeta: number;
  alphaPct: number;
  powerPct: number;
  effectSizeD: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface ABTestSampleResult {
  sampleSizePerVariant: number;
  totalSampleSize: number;
  zAlpha: number;
  zBeta: number;
  absDiffPct: number;
  relativeUpliftPct: number;
  powerPct: number;
  alphaPct: number;
  p1Pct: number;
  p2Pct: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface ReverseMOEResult {
  moe: number;
  moeFormatted: string;
  sampleN: number;
  confidenceLevelPct: number;
  populationN?: number;
  fpcApplied: boolean;
  zScore: number;
  isValid: boolean;
  errorMessage?: string;
}

export interface PowerCurvePoint {
  sampleSize: number;
  power: number;
}

/**
 * Peter J. Acklam's algorithm for Inverse Normal Cumulative Distribution Function.
 * Relative error is bounded: |error| < 1.15e-9 across (0, 1).
 */
export function acklamInverseNormalCDF(p: number): number {
  if (p <= 0 || p >= 1) return NaN;
  if (p === 0.5) return 0.0;

  // Coefficients for lower and upper regions
  const c = [
    -7.784894002430293e-3,
    -3.223964580411365e-1,
    -2.400758277161838e0,
    -2.549732539343734e0,
    4.374664141464968e0,
    2.938163982698783e0
  ];
  const d = [
    7.784695709041462e-3,
    3.224671290700398e-1,
    2.445134137142996e0,
    3.754408661907416e0
  ];

  // Coefficients for central region
  const a = [
    -3.969683028665376e1,
    2.209460984245205e2,
    -2.759285104469687e2,
    1.38357751867269e2,
    -3.066479806614716e1,
    2.506628277459239e0
  ];
  const b = [
    -5.447609879822406e1,
    1.615858368580409e2,
    -1.556989798598866e2,
    6.680131188771972e1,
    -1.328068155288572e1
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  if (p < pLow) {
    // Rational approximation for lower region
    const q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else if (p <= pHigh) {
    // Rational approximation for central region
    const q = p - 0.5;
    const r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  } else {
    // Rational approximation for upper region (symmetric)
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
}

/**
 * Standard Normal Cumulative Distribution Function Φ(z)
 */
export function normalCDF(z: number): number {
  if (z === 0) return 0.5;
  if (z < -8) return 0.0;
  if (z > 8) return 1.0;

  // Abramowitz & Stegun approximation (Formula 7.1.26)
  const sign = z < 0 ? -1 : 1;
  const absZ = Math.abs(z);
  const t = 1.0 / (1.0 + 0.2316419 * absZ);
  const d = 0.3989422804014327; // 1 / sqrt(2 * PI)
  const poly =
    1.0 -
    d *
      Math.exp((-absZ * absZ) / 2.0) *
      t *
      (0.31938153 +
        t *
          (-0.356563782 +
            t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));

  return sign === 1 ? poly : 1.0 - poly;
}

/**
 * Two-sided critical Z-score for a given confidence level percentage.
 * Exact standard checkpoints:
 * 90% -> 1.644854
 * 95% -> 1.959964
 * 99% -> 2.575829
 */
export function getZScore(confidenceLevelPct: number): number {
  if (Math.abs(confidenceLevelPct - 99) < 0.01) return 2.57583;
  if (Math.abs(confidenceLevelPct - 95) < 0.01) return 1.95996;
  if (Math.abs(confidenceLevelPct - 90) < 0.01) return 1.64485;
  if (Math.abs(confidenceLevelPct - 80) < 0.01) return 1.28155;
  if (Math.abs(confidenceLevelPct - 99.9) < 0.01) return 3.29053;

  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100) return NaN;

  const alpha = (100 - confidenceLevelPct) / 100;
  const p = 1 - alpha / 2;
  return Math.abs(acklamInverseNormalCDF(p));
}

/**
 * One-sided critical Z-score for statistical power (1 - beta).
 * Checkpoints:
 * 80% -> 0.84162
 * 90% -> 1.28155
 * 95% -> 1.64485
 * 99% -> 2.32635
 */
export function getZForPower(powerPct: number): number {
  if (Math.abs(powerPct - 80) < 0.01) return 0.84162;
  if (Math.abs(powerPct - 90) < 0.01) return 1.28155;
  if (Math.abs(powerPct - 95) < 0.01) return 1.64485;
  if (Math.abs(powerPct - 99) < 0.01) return 2.32635;

  if (powerPct <= 0 || powerPct >= 100) return NaN;

  return Math.abs(acklamInverseNormalCDF(powerPct / 100));
}

/**
 * Mode 1: Survey & Proportion Sample Size (Cochran's Formula + Finite Population Correction)
 * n0 = (Z^2 * p * (1 - p)) / e^2
 * If finite population N > 0:
 * n = n0 / [1 + (n0 - 1) / N]
 * Final required sample = ceil(n)
 */
export function computeSurveySampleSize(
  confidenceLevelPct: number = 95,
  marginOfErrorPct: number = 5,
  propPct: number = 50,
  populationN?: number,
  responseRatePct: number = 100
): SurveySampleResult {
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100) {
    return {
      uncorrectedN: 0,
      sampleSize: 0,
      fpcApplied: false,
      zScore: 0,
      marginOfErrorPct,
      confidenceLevelPct,
      invitedTarget: 0,
      responseRatePct,
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%"
    };
  }

  if (marginOfErrorPct <= 0 || marginOfErrorPct >= 100) {
    return {
      uncorrectedN: 0,
      sampleSize: 0,
      fpcApplied: false,
      zScore: 0,
      marginOfErrorPct,
      confidenceLevelPct,
      invitedTarget: 0,
      responseRatePct,
      isValid: false,
      errorMessage: "Margin of error must be strictly between 0% and 100%"
    };
  }

  if (propPct <= 0 || propPct >= 100) {
    return {
      uncorrectedN: 0,
      sampleSize: 0,
      fpcApplied: false,
      zScore: 0,
      marginOfErrorPct,
      confidenceLevelPct,
      invitedTarget: 0,
      responseRatePct,
      isValid: false,
      errorMessage: "Expected population proportion must be strictly between 0% and 100%"
    };
  }

  if (responseRatePct <= 0 || responseRatePct > 100) {
    return {
      uncorrectedN: 0,
      sampleSize: 0,
      fpcApplied: false,
      zScore: 0,
      marginOfErrorPct,
      confidenceLevelPct,
      invitedTarget: 0,
      responseRatePct,
      isValid: false,
      errorMessage: "Response rate must be strictly between 1% and 100%"
    };
  }

  if (populationN !== undefined && (isNaN(populationN) || populationN <= 0)) {
    return {
      uncorrectedN: 0,
      sampleSize: 0,
      fpcApplied: false,
      zScore: 0,
      marginOfErrorPct,
      confidenceLevelPct,
      invitedTarget: 0,
      responseRatePct,
      isValid: false,
      errorMessage: "Population size N must be a positive integer greater than 0"
    };
  }

  const z = getZScore(confidenceLevelPct);
  const e = marginOfErrorPct / 100;
  const p = propPct / 100;

  // Unrounded continuous Cochran n0
  const uncorrectedNRaw = (z * z * p * (1 - p)) / (e * e);
  const uncorrectedN = Math.ceil(uncorrectedNRaw);

  let sampleSize = uncorrectedN;
  let fpcApplied = false;

  if (populationN !== undefined && populationN > 0) {
    // Apply FPC to continuous n0 to avoid double-ceiling distortion:
    // n = n0 / [1 + (n0 - 1) / N]
    const fpcRaw = uncorrectedNRaw / (1 + (uncorrectedNRaw - 1) / populationN);
    sampleSize = Math.min(populationN, Math.ceil(fpcRaw));
    fpcApplied = true;
  }

  const respRate = responseRatePct / 100;
  const invitedTarget = Math.ceil(sampleSize / respRate);

  return {
    uncorrectedN,
    sampleSize,
    fpcApplied,
    zScore: parseFloat(z.toFixed(4)),
    marginOfErrorPct,
    confidenceLevelPct,
    populationN,
    invitedTarget,
    responseRatePct,
    isValid: true
  };
}

/**
 * Mode 2: Continuous Mean / Standard Deviation Sample Size
 * n = (Z * sigma / E)^2
 */
export function computeContinuousMeanSampleSize(
  confidenceLevelPct: number = 95,
  precisionE: number = 2,
  sd: number = 10,
  populationN?: number
): ContinuousMeanSampleResult {
  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100) {
    return {
      sampleSize: 0,
      uncorrectedN: 0,
      zScore: 0,
      confidenceLevelPct,
      precisionE,
      sd,
      fpcApplied: false,
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%"
    };
  }

  if (sd <= 0) {
    return {
      sampleSize: 0,
      uncorrectedN: 0,
      zScore: 0,
      confidenceLevelPct,
      precisionE,
      sd,
      fpcApplied: false,
      isValid: false,
      errorMessage: "Standard deviation must be strictly greater than 0 (σ > 0)"
    };
  }

  if (precisionE <= 0) {
    return {
      sampleSize: 0,
      uncorrectedN: 0,
      zScore: 0,
      confidenceLevelPct,
      precisionE,
      sd,
      fpcApplied: false,
      isValid: false,
      errorMessage: "Desired margin of error E must be greater than 0"
    };
  }

  const z = getZScore(confidenceLevelPct);
  const rawN = Math.pow((z * sd) / precisionE, 2);
  const uncorrectedN = Math.ceil(rawN);
  let sampleSize = uncorrectedN;
  let fpcApplied = false;

  if (populationN !== undefined && populationN > 0) {
    const fpcRaw = rawN / (1 + (rawN - 1) / populationN);
    sampleSize = Math.min(populationN, Math.ceil(fpcRaw));
    fpcApplied = true;
  }

  return {
    sampleSize,
    uncorrectedN,
    zScore: parseFloat(z.toFixed(4)),
    confidenceLevelPct,
    precisionE,
    sd,
    fpcApplied,
    populationN,
    isValid: true
  };
}

/**
 * Mode 3: Power Analysis & Hypothesis Testing (t-test / Cohen's d)
 * nPerGroup = 2 * ((Z_alpha + Z_beta) / d)^2
 */
export function computePowerAnalysisSampleSize(
  alphaPct: number = 5,
  powerPct: number = 80,
  effectSizeD: number = 0.5
): PowerAnalysisResult {
  if (alphaPct <= 0 || alphaPct >= 100) {
    return {
      nPerGroup: 0,
      totalN: 0,
      zAlpha: 0,
      zBeta: 0,
      alphaPct,
      powerPct,
      effectSizeD,
      isValid: false,
      errorMessage: "Significance level alpha must be strictly between 0% and 100%"
    };
  }

  if (powerPct <= 0 || powerPct >= 100) {
    return {
      nPerGroup: 0,
      totalN: 0,
      zAlpha: 0,
      zBeta: 0,
      alphaPct,
      powerPct,
      effectSizeD,
      isValid: false,
      errorMessage: "Statistical power must be strictly between 1% and 99%"
    };
  }

  if (effectSizeD <= 0) {
    return {
      nPerGroup: 0,
      totalN: 0,
      zAlpha: 0,
      zBeta: 0,
      alphaPct,
      powerPct,
      effectSizeD,
      isValid: false,
      errorMessage: "Effect size (Cohen's d) must be strictly greater than 0"
    };
  }

  const zAlpha = getZScore(100 - alphaPct);
  const zBeta = getZForPower(powerPct);
  const nRaw = 2 * Math.pow((zAlpha + zBeta) / effectSizeD, 2);
  const nPerGroup = Math.ceil(nRaw);

  return {
    nPerGroup,
    totalN: nPerGroup * 2,
    zAlpha: parseFloat(zAlpha.toFixed(4)),
    zBeta: parseFloat(zBeta.toFixed(4)),
    alphaPct,
    powerPct,
    effectSizeD,
    isValid: true
  };
}

/**
 * Mode 4: Two Proportions / A/B Testing Sample Size (Unpooled Normal Approximation)
 * n = (Z_alpha/2 + Z_beta)^2 * [p1*(1-p1) + p2*(1-p2)] / (p1 - p2)^2
 */
export function computeABTestSampleSize(
  p1Pct: number = 3.0,
  p2Pct: number = 3.5,
  alphaPct: number = 5,
  powerPct: number = 80
): ABTestSampleResult {
  const p1 = p1Pct / 100;
  const p2 = p2Pct / 100;
  const absDiff = Math.abs(p1 - p2);

  if (absDiff <= 0) {
    return {
      sampleSizePerVariant: 0,
      totalSampleSize: 0,
      zAlpha: 0,
      zBeta: 0,
      absDiffPct: 0,
      relativeUpliftPct: 0,
      powerPct,
      alphaPct,
      p1Pct,
      p2Pct,
      isValid: false,
      errorMessage: "Baseline (P1) and Variant (P2) conversion rates cannot be identical"
    };
  }

  if (p1 <= 0 || p1 >= 1 || p2 <= 0 || p2 >= 1) {
    return {
      sampleSizePerVariant: 0,
      totalSampleSize: 0,
      zAlpha: 0,
      zBeta: 0,
      absDiffPct: 0,
      relativeUpliftPct: 0,
      powerPct,
      alphaPct,
      p1Pct,
      p2Pct,
      isValid: false,
      errorMessage: "Conversion rates must be strictly between 0.01% and 99.99%"
    };
  }

  if (powerPct <= 0 || powerPct >= 100) {
    return {
      sampleSizePerVariant: 0,
      totalSampleSize: 0,
      zAlpha: 0,
      zBeta: 0,
      absDiffPct: 0,
      relativeUpliftPct: 0,
      powerPct,
      alphaPct,
      p1Pct,
      p2Pct,
      isValid: false,
      errorMessage: "Statistical power must be strictly between 1% and 99%"
    };
  }

  // Two-sided critical Z for alpha
  const zAlpha = getZScore(100 - alphaPct);
  // One-sided critical Z for beta
  const zBeta = getZForPower(powerPct);

  const varianceSum = p1 * (1 - p1) + p2 * (1 - p2);
  const rawN = (Math.pow(zAlpha + zBeta, 2) * varianceSum) / (absDiff * absDiff);
  const nPerVariant = Math.ceil(rawN);
  const relativeUplift = (absDiff / p1) * 100;

  return {
    sampleSizePerVariant: nPerVariant,
    totalSampleSize: nPerVariant * 2,
    zAlpha: parseFloat(zAlpha.toFixed(4)),
    zBeta: parseFloat(zBeta.toFixed(4)),
    absDiffPct: parseFloat((absDiff * 100).toFixed(2)),
    relativeUpliftPct: parseFloat(relativeUplift.toFixed(2)),
    powerPct,
    alphaPct,
    p1Pct,
    p2Pct,
    isValid: true
  };
}

/**
 * Mode 6: Reverse Margin of Error Solver
 * E = Z * sqrt[p*(1-p)/n] * FPC
 */
export function computeReverseMarginOfError(
  sampleN: number,
  confidenceLevelPct: number = 95,
  propPct: number = 50,
  populationN?: number
): ReverseMOEResult {
  if (sampleN <= 0 || !Number.isFinite(sampleN)) {
    return {
      moe: 0,
      moeFormatted: "0.00%",
      sampleN,
      confidenceLevelPct,
      fpcApplied: false,
      zScore: 0,
      isValid: false,
      errorMessage: "Completed sample size must be an integer of at least 1"
    };
  }

  if (confidenceLevelPct <= 0 || confidenceLevelPct >= 100) {
    return {
      moe: 0,
      moeFormatted: "0.00%",
      sampleN,
      confidenceLevelPct,
      fpcApplied: false,
      zScore: 0,
      isValid: false,
      errorMessage: "Confidence level must be strictly between 0% and 100%"
    };
  }

  const z = getZScore(confidenceLevelPct);
  const p = propPct / 100;

  let moe = z * Math.sqrt((p * (1 - p)) / sampleN);
  let fpcApplied = false;

  if (populationN !== undefined && populationN > 0) {
    if (sampleN >= populationN) {
      return {
        moe: 0.0,
        moeFormatted: "±0.00%",
        sampleN,
        confidenceLevelPct,
        populationN,
        fpcApplied: true,
        zScore: parseFloat(z.toFixed(4)),
        isValid: true
      };
    }
    const fpc = Math.sqrt((populationN - sampleN) / (populationN - 1));
    moe *= fpc;
    fpcApplied = true;
  }

  const moePct = parseFloat((moe * 100).toFixed(2));

  return {
    moe: moePct,
    moeFormatted: `±${moePct.toFixed(2)}%`,
    sampleN,
    confidenceLevelPct,
    populationN,
    fpcApplied,
    zScore: parseFloat(z.toFixed(4)),
    isValid: true
  };
}

/**
 * Generate Mathematically Exact Points for Statistical Power Curve (Sample Size vs Power 1-β)
 * Evaluates actual normal cumulative distribution function across varying n
 */
export function generatePowerCurvePoints(
  effectSizeD: number = 0.5,
  alphaPct: number = 5,
  maxSampleN: number = 200
): PowerCurvePoint[] {
  const points: PowerCurvePoint[] = [];
  const zAlpha = getZScore(100 - alphaPct);
  const step = Math.max(5, Math.floor(maxSampleN / 20));

  for (let n = 5; n <= maxSampleN; n += step) {
    // Non-central normal parameter for two-sample test
    const zBeta = effectSizeD * Math.sqrt(n / 2) - zAlpha;
    const power = Math.min(1.0, Math.max(0.0, normalCDF(zBeta)));
    points.push({ sampleSize: n, power: parseFloat(power.toFixed(3)) });
  }

  return points;
}

/**
 * APA Methodology Paragraph Generator
 */
export function generateAPAMethodologyParagraph(
  res: SurveySampleResult,
  designType: string = "Survey"
): string {
  if (!res.isValid) return "";
  return `To achieve a ${res.confidenceLevelPct}% confidence level with a ±${res.marginOfErrorPct}% margin of error, a minimum sample size of N = ${res.sampleSize.toLocaleString()} completed responses is required (Cochran's formula${res.fpcApplied ? `, adjusted for a finite population of N = ${res.populationN?.toLocaleString()}` : ""}). Assuming a target response rate of ${res.responseRatePct}%, a gross recruitment target of N = ${res.invitedTarget.toLocaleString()} potential participants should be invited.`;
}
