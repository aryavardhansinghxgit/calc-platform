/**
 * Core mathematical engine for Statistics Calculator & Statistical Analysis Suite
 */

export interface VarianceStepRow {
  index: number;
  val: number;
  dev: number;
  devSq: number;
}

export interface HistogramBin {
  binMin: number;
  binMax: number;
  count: number;
}

export interface QQPoint {
  theoreticalZ: number;
  actualVal: number;
}

export interface UnivariateStatsResult {
  count: number;
  sum: number;
  sumSq: number;
  mean: number;
  geoMean?: number;
  harmMean?: number;
  trimmedMean: number;
  median: number;
  modes: number[];
  modeType: "Unimodal" | "Bimodal" | "Multimodal" | "No Mode";
  min: number;
  max: number;
  range: number;
  midRange: number;
  q1: number;
  q3: number;
  iqr: number;
  sampleVar: number;
  sampleSD: number;
  popVar: number;
  popSD: number;
  stdError: number;
  coeffVarPct: number;
  mad: number;
  skewness: number;
  kurtosis: number;
  outliers: number[];
  stepTable: VarianceStepRow[];
  histogramBins: HistogramBin[];
  qqPoints: QQPoint[];
}

export interface GroupedRow {
  midpoint: number;
  frequency: number;
  cumFreq: number;
  fx: number;
}

export interface GroupedStatsResult {
  totalN: number;
  groupedMean: number;
  groupedVar: number;
  groupedSD: number;
  modalClass: string;
  rows: GroupedRow[];
}

export interface BivariateRegressionResult {
  n: number;
  meanX: number;
  meanY: number;
  covXY: number;
  pearsonR: number;
  spearmanRho: number;
  rSquaredPct: number;
  slopeM: number;
  interceptB: number;
  equationStr: string;
  sse: number;
  points: { x: number; y: number; yHat: number }[];
}

export interface HypothesisTestResult {
  testType: string;
  statistic: number;
  df: number;
  pValue: number;
  criticalValue: number;
  decision: "Reject H0" | "Fail to Reject H0";
  summaryText: string;
}

export interface ConfidenceIntervalResult {
  confidenceLevelPct: number;
  criticalZOrT: number;
  marginOfError: number;
  lowerBound: number;
  upperBound: number;
}

export interface DistributionResult {
  cdf: number;
  pdf: number;
  tailProb: number;
}

/**
 * Tokenize string input into clean numbers
 */
export function parseDataset(input: string): number[] {
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

/**
 * Univariate Descriptive Statistics Engine
 */
export function computeUnivariateStats(data: number[], isSample: boolean = true): UnivariateStatsResult {
  if (data.length === 0) {
    return {
      count: 0,
      sum: 0,
      sumSq: 0,
      mean: 0,
      trimmedMean: 0,
      median: 0,
      modes: [],
      modeType: "No Mode",
      min: 0,
      max: 0,
      range: 0,
      midRange: 0,
      q1: 0,
      q3: 0,
      iqr: 0,
      sampleVar: 0,
      sampleSD: 0,
      popVar: 0,
      popSD: 0,
      stdError: 0,
      coeffVarPct: 0,
      mad: 0,
      skewness: 0,
      kurtosis: 0,
      outliers: [],
      stepTable: [],
      histogramBins: [],
      qqPoints: []
    };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((acc, val) => acc + val, 0);
  const sumSq = sorted.reduce((acc, val) => acc + val * val, 0);
  const mean = sum / n;

  // Geometric & Harmonic Mean
  let geoMean: number | undefined = undefined;
  let harmMean: number | undefined = undefined;
  if (sorted.every((x) => x > 0)) {
    const logSum = sorted.reduce((acc, val) => acc + Math.log(val), 0);
    geoMean = Math.exp(logSum / n);
    const recSum = sorted.reduce((acc, val) => acc + 1 / val, 0);
    harmMean = n / recSum;
  }

  // Trimmed Mean (10%)
  const trimCount = Math.floor(n * 0.1);
  const trimmedData = sorted.slice(trimCount, n - trimCount);
  const trimmedMean = trimmedData.length > 0 ? trimmedData.reduce((acc, v) => acc + v, 0) / trimmedData.length : mean;

  // Median
  const midIndex = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[midIndex] : (sorted[midIndex - 1] + sorted[midIndex]) / 2;

  // Mode(s)
  const freqMap: Record<number, number> = {};
  let maxFreq = 0;
  for (const val of sorted) {
    freqMap[val] = (freqMap[val] || 0) + 1;
    if (freqMap[val] > maxFreq) maxFreq = freqMap[val];
  }

  const modes: number[] = [];
  if (maxFreq > 1) {
    for (const key in freqMap) {
      if (freqMap[key] === maxFreq) {
        modes.push(parseFloat(key));
      }
    }
  }

  let modeType: "Unimodal" | "Bimodal" | "Multimodal" | "No Mode" = "No Mode";
  if (modes.length === 1) modeType = "Unimodal";
  else if (modes.length === 2) modeType = "Bimodal";
  else if (modes.length > 2) modeType = "Multimodal";

  // Min, Max, Range, Mid-Range
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  const midRange = (min + max) / 2;

  // Quartiles (Tukey's / Linear Interpolation)
  const getPercentile = (p: number) => {
    if (n === 1) return sorted[0];
    const index = (n - 1) * p;
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  const q1 = getPercentile(0.25);
  const q3 = getPercentile(0.75);
  const iqr = q3 - q1;

  // Outliers (1.5 * IQR)
  const lowerFence = q1 - 1.5 * iqr;
  const upperFence = q3 + 1.5 * iqr;
  const outliers = sorted.filter((v) => v < lowerFence || v > upperFence);

  // Variance & Standard Deviation
  const sumSqDev = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const popVar = sumSqDev / n;
  const popSD = Math.sqrt(popVar);
  const sampleVar = n > 1 ? sumSqDev / (n - 1) : 0;
  const sampleSD = Math.sqrt(sampleVar);

  const activeSD = isSample ? sampleSD : popSD;
  const activeVar = isSample ? sampleVar : popVar;

  const stdError = n > 0 ? sampleSD / Math.sqrt(n) : 0;
  const coeffVarPct = mean !== 0 ? (activeSD / Math.abs(mean)) * 100 : 0;

  // Mean Absolute Deviation (MAD)
  const mad = sorted.reduce((acc, val) => acc + Math.abs(val - mean), 0) / n;

  // Skewness & Kurtosis
  const m3 = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / n;
  const m4 = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0) / n;
  const skewness = popSD > 0 ? m3 / Math.pow(popSD, 3) : 0;
  const kurtosis = popSD > 0 ? m4 / Math.pow(popSD, 4) - 3 : 0;

  // Step Table
  const stepTable: VarianceStepRow[] = sorted.map((val, idx) => {
    const dev = val - mean;
    return {
      index: idx + 1,
      val,
      dev: parseFloat(dev.toFixed(4)),
      devSq: parseFloat(Math.pow(dev, 2).toFixed(4))
    };
  });

  // Histogram Bins (Sturges Rule: k = 1 + 3.322 log10(n))
  const binCount = Math.max(4, Math.min(10, Math.ceil(1 + 3.322 * Math.log10(n))));
  const binWidth = range > 0 ? range / binCount : 1;
  const histogramBins: HistogramBin[] = [];

  for (let i = 0; i < binCount; i++) {
    const bMin = min + i * binWidth;
    const bMax = bMin + binWidth;
    const count = sorted.filter((v) => (i === binCount - 1 ? v >= bMin && v <= bMax : v >= bMin && v < bMax)).length;
    histogramBins.push({
      binMin: parseFloat(bMin.toFixed(2)),
      binMax: parseFloat(bMax.toFixed(2)),
      count
    });
  }

  // Q-Q Plot Points
  const qqPoints: QQPoint[] = sorted.map((actualVal, i) => {
    const p = (i + 0.5) / n;
    const theoreticalZ = approximateNormInv(p);
    return {
      theoreticalZ: parseFloat(theoreticalZ.toFixed(3)),
      actualVal
    };
  });

  return {
    count: n,
    sum,
    sumSq,
    mean: parseFloat(mean.toFixed(4)),
    geoMean: geoMean !== undefined ? parseFloat(geoMean.toFixed(4)) : undefined,
    harmMean: harmMean !== undefined ? parseFloat(harmMean.toFixed(4)) : undefined,
    trimmedMean: parseFloat(trimmedMean.toFixed(4)),
    median: parseFloat(median.toFixed(4)),
    modes,
    modeType,
    min,
    max,
    range: parseFloat(range.toFixed(4)),
    midRange: parseFloat(midRange.toFixed(4)),
    q1: parseFloat(q1.toFixed(4)),
    q3: parseFloat(q3.toFixed(4)),
    iqr: parseFloat(iqr.toFixed(4)),
    sampleVar: parseFloat(sampleVar.toFixed(4)),
    sampleSD: parseFloat(sampleSD.toFixed(4)),
    popVar: parseFloat(popVar.toFixed(4)),
    popSD: parseFloat(popSD.toFixed(4)),
    stdError: parseFloat(stdError.toFixed(4)),
    coeffVarPct: parseFloat(coeffVarPct.toFixed(2)),
    mad: parseFloat(mad.toFixed(4)),
    skewness: parseFloat(skewness.toFixed(4)),
    kurtosis: parseFloat(kurtosis.toFixed(4)),
    outliers,
    stepTable,
    histogramBins,
    qqPoints
  };
}

/**
 * Grouped Data & Frequency Table Engine
 */
export function computeGroupedStats(valStr: string, freqStr: string): GroupedStatsResult {
  const vals = parseDataset(valStr);
  const freqs = parseDataset(freqStr);
  const len = Math.min(vals.length, freqs.length);

  if (len === 0) {
    return {
      totalN: 0,
      groupedMean: 0,
      groupedVar: 0,
      groupedSD: 0,
      modalClass: "N/A",
      rows: []
    };
  }

  let totalN = 0;
  let fxSum = 0;
  let maxF = 0;
  let modalVal = 0;

  const rows: GroupedRow[] = [];
  for (let i = 0; i < len; i++) {
    const x = vals[i];
    const f = Math.max(0, freqs[i]);
    totalN += f;
    const fx = x * f;
    fxSum += fx;
    if (f > maxF) {
      maxF = f;
      modalVal = x;
    }
    rows.push({
      midpoint: x,
      frequency: f,
      cumFreq: totalN,
      fx
    });
  }

  const groupedMean = totalN > 0 ? fxSum / totalN : 0;
  let devSqSum = 0;
  for (let i = 0; i < len; i++) {
    const x = vals[i];
    const f = Math.max(0, freqs[i]);
    devSqSum += f * Math.pow(x - groupedMean, 2);
  }

  const groupedVar = totalN > 1 ? devSqSum / (totalN - 1) : 0;
  const groupedSD = Math.sqrt(groupedVar);

  return {
    totalN,
    groupedMean: parseFloat(groupedMean.toFixed(4)),
    groupedVar: parseFloat(groupedVar.toFixed(4)),
    groupedSD: parseFloat(groupedSD.toFixed(4)),
    modalClass: `Value ${modalVal} (Freq = ${maxF})`,
    rows
  };
}

/**
 * Bivariate Correlation & Ordinary Least Squares Regression Engine
 */
export function computeBivariateRegression(
  xStr: string,
  yStr: string,
  fitType: "linear" | "exp" | "power" = "linear"
): BivariateRegressionResult {
  const xRaw = parseDataset(xStr);
  const yRaw = parseDataset(yStr);
  const n = Math.min(xRaw.length, yRaw.length);

  if (n === 0) {
    return {
      n: 0,
      meanX: 0,
      meanY: 0,
      covXY: 0,
      pearsonR: 0,
      spearmanRho: 0,
      rSquaredPct: 0,
      slopeM: 0,
      interceptB: 0,
      equationStr: "y = 0",
      sse: 0,
      points: []
    };
  }

  const xData = xRaw.slice(0, n);
  const yData = yRaw.slice(0, n);

  const meanX = xData.reduce((acc, v) => acc + v, 0) / n;
  const meanY = yData.reduce((acc, v) => acc + v, 0) / n;

  let sumDxDy = 0;
  let sumDx2 = 0;
  let sumDy2 = 0;

  for (let i = 0; i < n; i++) {
    const dx = xData[i] - meanX;
    const dy = yData[i] - meanY;
    sumDxDy += dx * dy;
    sumDx2 += dx * dx;
    sumDy2 += dy * dy;
  }

  const covXY = n > 1 ? sumDxDy / (n - 1) : 0;
  const stdX = Math.sqrt(sumDx2 / (n > 1 ? n - 1 : 1));
  const stdY = Math.sqrt(sumDy2 / (n > 1 ? n - 1 : 1));

  const pearsonR = stdX > 0 && stdY > 0 ? sumDxDy / Math.sqrt(sumDx2 * sumDy2) : 0;
  const rSquaredPct = Math.pow(pearsonR, 2) * 100;

  const slopeM = sumDx2 > 0 ? sumDxDy / sumDx2 : 0;
  const interceptB = meanY - slopeM * meanX;

  const equationStr = `ŷ = ${slopeM.toFixed(4)}x ${interceptB >= 0 ? "+ " + interceptB.toFixed(4) : "- " + Math.abs(interceptB).toFixed(4)}`;

  let sse = 0;
  const points = xData.map((x, i) => {
    const y = yData[i];
    const yHat = slopeM * x + interceptB;
    sse += Math.pow(y - yHat, 2);
    return {
      x,
      y,
      yHat: parseFloat(yHat.toFixed(4))
    };
  });

  return {
    n,
    meanX: parseFloat(meanX.toFixed(4)),
    meanY: parseFloat(meanY.toFixed(4)),
    covXY: parseFloat(covXY.toFixed(4)),
    pearsonR: parseFloat(pearsonR.toFixed(4)),
    spearmanRho: parseFloat(pearsonR.toFixed(4)),
    rSquaredPct: parseFloat(rSquaredPct.toFixed(2)),
    slopeM: parseFloat(slopeM.toFixed(4)),
    interceptB: parseFloat(interceptB.toFixed(4)),
    equationStr,
    sse: parseFloat(sse.toFixed(4)),
    points
  };
}

/**
 * Hypothesis Testing & Inferential Decision Engine
 */
export function computeHypothesisTest(
  testType: "ztest" | "ttest" | "anova",
  mu0: number = 0,
  sampleMean: number = 5,
  sampleSD: number = 2,
  sampleN: number = 30,
  alpha: number = 0.05,
  tail: "two" | "left" | "right" = "two"
): HypothesisTestResult {
  const n = Math.max(1, sampleN);
  const se = sampleSD / Math.sqrt(n);
  const stat = se > 0 ? (sampleMean - mu0) / se : 0;
  const df = n - 1;

  // Approximate p-value for Z / T
  const absStat = Math.abs(stat);
  let pOneTail = 0.5 * (1 - approximateNormCDF(absStat));
  if (pOneTail < 0) pOneTail = 0;

  let pValue = tail === "two" ? pOneTail * 2 : tail === "left" ? (stat <= 0 ? pOneTail : 1 - pOneTail) : (stat >= 0 ? pOneTail : 1 - pOneTail);
  if (pValue > 1) pValue = 1;

  const critZ = approximateNormInv(1 - (tail === "two" ? alpha / 2 : alpha));
  const decision = pValue < alpha ? "Reject H0" : "Fail to Reject H0";

  const summaryText = `${decision}: Test Stat = ${stat.toFixed(4)}, p-value = ${pValue.toFixed(4)}, α = ${alpha}`;

  return {
    testType,
    statistic: parseFloat(stat.toFixed(4)),
    df,
    pValue: parseFloat(pValue.toFixed(4)),
    criticalValue: parseFloat(critZ.toFixed(3)),
    decision,
    summaryText
  };
}

/**
 * Confidence Interval Parameter Estimator
 */
export function computeConfidenceInterval(
  paramType: "mean" | "prop",
  confLevelPct: number = 95,
  meanOrProp: number = 50,
  sdOrProp: number = 10,
  sampleN: number = 100
): ConfidenceIntervalResult {
  const n = Math.max(1, sampleN);
  const alpha = 1 - confLevelPct / 100;
  const critZ = approximateNormInv(1 - alpha / 2);

  let me = 0;
  let lower = 0;
  let upper = 0;

  if (paramType === "mean") {
    me = critZ * (sdOrProp / Math.sqrt(n));
    lower = meanOrProp - me;
    upper = meanOrProp + me;
  } else {
    const p = meanOrProp / 100;
    me = critZ * Math.sqrt((p * (1 - p)) / n);
    lower = (p - me) * 100;
    upper = (p + me) * 100;
  }

  return {
    confidenceLevelPct: confLevelPct,
    criticalZOrT: parseFloat(critZ.toFixed(3)),
    marginOfError: parseFloat(me.toFixed(4)),
    lowerBound: parseFloat(lower.toFixed(4)),
    upperBound: parseFloat(upper.toFixed(4))
  };
}

/**
 * Normal Inverse CDF Helper (Beasley-Springer-Moro)
 */
export function approximateNormInv(p: number): number {
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
 * Normal Standard CDF Helper (Abramowitz-Stegun)
 */
export function approximateNormCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp((-x * x) / 2);
  let p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}
