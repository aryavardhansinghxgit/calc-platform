/**
 * Core mathematical engine for Sample Size Calculator & Statistical Power Analysis Suite
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
}

export interface ABTestSampleResult {
  sampleSizePerVariant: number;
  totalSampleSize: number;
  zAlpha: number;
  zBeta: number;
  mdePct: number;
  powerPct: number;
  invitedTarget: number;
}

export interface PowerCurvePoint {
  sampleSize: number;
  power: number;
}

/**
 * Z-Score Lookup / Normal Inverse CDF for standard confidence levels
 */
export function getZScore(confidenceLevelPct: number): number {
  if (Math.abs(confidenceLevelPct - 99) < 0.5) return 2.57583;
  if (Math.abs(confidenceLevelPct - 95) < 0.5) return 1.95996;
  if (Math.abs(confidenceLevelPct - 90) < 0.5) return 1.64485;
  if (Math.abs(confidenceLevelPct - 80) < 0.5) return 1.28155;
  if (Math.abs(confidenceLevelPct - 99.9) < 0.5) return 3.29053;

  // Approximate for custom values
  const alpha = 1 - confidenceLevelPct / 100;
  return Math.abs(approximateNormInv(1 - alpha / 2));
}

/**
 * Z-Score for Statistical Power (1 - beta)
 */
export function getZForPower(powerPct: number): number {
  if (Math.abs(powerPct - 80) < 0.5) return 0.84162;
  if (Math.abs(powerPct - 90) < 0.5) return 1.28155;
  if (Math.abs(powerPct - 95) < 0.5) return 1.64485;
  if (Math.abs(powerPct - 99) < 0.5) return 2.32635;

  const beta = 1 - powerPct / 100;
  return Math.abs(approximateNormInv(1 - beta));
}

/**
 * Beasley-Springer-Moro Approximation for Normal Inverse CDF
 */
function approximateNormInv(p: number): number {
  if (p <= 0 || p >= 1) return 0;
  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239e0
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1
  ];

  const q = p - 0.5;
  if (Math.abs(q) < 0.42) {
    const r = q * q;
    return (
      (q *
        (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5])) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  }

  const r = p < 0.5 ? p : 1 - p;
  const s = Math.sqrt(-2 * Math.log(r));
  let x =
    s -
    (2.515517 + 0.802853 * s + 0.010328 * s * s) /
      (1 + 1.432788 * s + 0.189269 * s * s + 0.001308 * s * s * s);
  return p < 0.5 ? -x : x;
}

/**
 * Mode 1: Survey & Proportion Sample Size (Cochran's Formula + FPC)
 */
export function computeSurveySampleSize(
  confidenceLevelPct: number = 95,
  marginOfErrorPct: number = 5,
  propPct: number = 50,
  populationN?: number,
  responseRatePct: number = 100
): SurveySampleResult {
  const z = getZScore(confidenceLevelPct);
  const e = marginOfErrorPct / 100;
  const p = propPct / 100;

  if (e <= 0) throw new Error("Margin of Error must be greater than 0");

  const uncorrectedN = Math.ceil((z * z * p * (1 - p)) / (e * e));
  let sampleSize = uncorrectedN;
  let fpcApplied = false;

  if (populationN && populationN > 0) {
    sampleSize = Math.ceil(uncorrectedN / (1 + (uncorrectedN - 1) / populationN));
    fpcApplied = true;
  }

  const respRate = Math.max(1, responseRatePct) / 100;
  const invitedTarget = Math.ceil(sampleSize / respRate);

  return {
    uncorrectedN,
    sampleSize,
    fpcApplied,
    zScore: parseFloat(z.toFixed(3)),
    marginOfErrorPct,
    confidenceLevelPct,
    populationN,
    invitedTarget
  };
}

/**
 * Mode 2: Continuous Mean / Standard Deviation Sample Size
 */
export function computeContinuousMeanSampleSize(
  confidenceLevelPct: number = 95,
  precisionE: number = 2,
  sd: number = 10
): number {
  const z = getZScore(confidenceLevelPct);
  if (precisionE <= 0) return 0;
  return Math.ceil(Math.pow((z * sd) / precisionE, 2));
}

/**
 * Mode 3: Power Analysis & Hypothesis Testing (t-test / Cohen's d)
 */
export function computePowerAnalysisSampleSize(
  alphaPct: number = 5,
  powerPct: number = 80,
  effectSizeD: number = 0.5
): number {
  const zAlpha = getZScore(100 - alphaPct);
  const zBeta = getZForPower(powerPct);
  if (effectSizeD <= 0) return 0;

  const nPerGroup = 2 * Math.pow((zAlpha + zBeta) / effectSizeD, 2);
  return Math.ceil(nPerGroup);
}

/**
 * Mode 4: Two Proportions / A/B Testing Sample Size
 */
export function computeABTestSampleSize(
  p1Pct: number = 3.0,
  p2Pct: number = 3.5,
  alphaPct: number = 5,
  powerPct: number = 80
): ABTestSampleResult {
  const zAlpha = getZScore(100 - alphaPct);
  const zBeta = getZForPower(powerPct);

  const p1 = p1Pct / 100;
  const p2 = p2Pct / 100;
  const diff = Math.abs(p1 - p2);

  if (diff <= 0) {
    return {
      sampleSizePerVariant: 0,
      totalSampleSize: 0,
      zAlpha: parseFloat(zAlpha.toFixed(3)),
      zBeta: parseFloat(zBeta.toFixed(3)),
      mdePct: 0,
      powerPct,
      invitedTarget: 0
    };
  }

  const pAvg = (p1 + p2) / 2;
  const nPerVariant = Math.ceil(
    (Math.pow(zAlpha + zBeta, 2) * (p1 * (1 - p1) + p2 * (1 - p2))) / (diff * diff)
  );

  return {
    sampleSizePerVariant: nPerVariant,
    totalSampleSize: nPerVariant * 2,
    zAlpha: parseFloat(zAlpha.toFixed(3)),
    zBeta: parseFloat(zBeta.toFixed(3)),
    mdePct: parseFloat((diff * 100).toFixed(2)),
    powerPct,
    invitedTarget: nPerVariant * 2
  };
}

/**
 * Mode 6: Reverse Margin of Error Solver
 */
export function computeReverseMarginOfError(
  sampleN: number,
  confidenceLevelPct: number = 95,
  propPct: number = 50,
  populationN?: number
): number {
  if (sampleN <= 0) return 0;
  const z = getZScore(confidenceLevelPct);
  const p = propPct / 100;

  let moe = z * Math.sqrt((p * (1 - p)) / sampleN);

  if (populationN && populationN > sampleN) {
    const fpc = Math.sqrt((populationN - sampleN) / (populationN - 1));
    moe *= fpc;
  }

  return parseFloat((moe * 100).toFixed(2));
}

/**
 * Generate Points for Statistical Power Curve (Sample Size vs Power 1-β)
 */
export function generatePowerCurvePoints(effectSizeD: number = 0.5, alphaPct: number = 5): PowerCurvePoint[] {
  const points: PowerCurvePoint[] = [];
  const zAlpha = getZScore(100 - alphaPct);

  for (let n = 10; n <= 200; n += 10) {
    const zBeta = (effectSizeD * Math.sqrt(n / 2)) - zAlpha;
    const power = Math.min(1.0, Math.max(0.0, 0.5 * (1 + Math.min(1, Math.max(-1, zBeta / 2)))));
    points.push({ sampleSize: n, power: parseFloat(power.toFixed(2)) });
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
  return `To achieve a ${res.confidenceLevelPct}% confidence level with a ±${res.marginOfErrorPct}% margin of error, a minimum sample size of N = ${res.sampleSize} completed responses is required (Cochran's formula${res.fpcApplied ? `, adjusted for a finite population of N = ${res.populationN?.toLocaleString()}` : ""}). Assuming a target response rate, a gross recruitment target of N = ${res.invitedTarget} potential participants should be invited.`;
}
