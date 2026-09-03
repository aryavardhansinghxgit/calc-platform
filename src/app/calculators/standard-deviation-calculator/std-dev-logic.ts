/**
 * Core mathematical engine for Standard Deviation Calculator & Descriptive Statistics Suite
 */

export interface StepTableRow {
  index: number;
  val: number;
  dev: number;
  devSq: number;
}

export interface DescriptiveStats {
  count: number;
  sum: number;
  mean: number;
  sumSqDev: number; // SS = ∑(x_i - mean)^2
  sampleVar: number;
  sampleSD: number;
  popVar: number;
  popSD: number;
  stdError: number;
  coeffVar: number; // CV %
  mad: number;      // Mean Absolute Deviation
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  iqr: number;
  range: number;
  mode: number[];
  skewness: number;
  kurtosis: number;
  outliers: number[];
  ci95Lower: number;
  ci95Upper: number;
  stepTable: StepTableRow[];
}

export interface FrequencyItem {
  val: number;
  freq: number;
}

export interface TwoDatasetComparison {
  statsA: DescriptiveStats;
  statsB: DescriptiveStats;
  fRatio: number;
  pooledSD: number;
}

/**
 * Parse raw string input into array of clean numbers
 * Supports commas, spaces, tabs, newlines, and mixed delimiters
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
 * Compute Complete Descriptive Statistics Metrics
 */
export function computeDescriptiveStats(data: number[], isSample: boolean = true): DescriptiveStats {
  if (data.length === 0) {
    return createEmptyStats();
  }

  const sorted = [...data].sort((a, b) => a - b);
  const count = data.length;
  const sum = data.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;

  // Sum of Squared Deviations (SS) & MAD
  // We iterate over the original data sequence to preserve user row order in the step table
  let sumSqDev = 0;
  let sumAbsDev = 0;
  const stepTable: StepTableRow[] = [];

  for (let i = 0; i < count; i++) {
    const v = data[i];
    const dev = v - mean;
    const devSq = dev * dev;
    sumSqDev += devSq;
    sumAbsDev += Math.abs(dev);

    stepTable.push({
      index: i + 1,
      val: v,
      dev: Number(dev.toFixed(8)),
      devSq: Number(devSq.toFixed(8))
    });
  }

  // Variances & Standard Deviations (Bessel's correction n - 1 for sample)
  const sampleVar = count > 1 ? sumSqDev / (count - 1) : 0;
  const sampleSD = Math.sqrt(sampleVar);
  const popVar = count > 0 ? sumSqDev / count : 0;
  const popSD = Math.sqrt(popVar);

  const activeSD = isSample ? sampleSD : popSD;

  // Standard Error & CV
  // SE: sample SD / sqrt(N) in sample mode; pop SD / sqrt(N) in population mode
  const stdError = count > 0 ? (isSample ? (count > 1 ? sampleSD / Math.sqrt(count) : 0) : popSD / Math.sqrt(count)) : 0;
  const coeffVar = (mean !== 0 && !isNaN(activeSD) && (isSample ? count > 1 : count > 0)) ? (activeSD / Math.abs(mean)) * 100 : 0;
  const mad = sumAbsDev / count;

  // Min, Max, Range
  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  // Quartiles & Median (Linear interpolation p(n-1))
  const median = getPercentile(sorted, 0.5);
  const q1 = getPercentile(sorted, 0.25);
  const q3 = getPercentile(sorted, 0.75);
  const iqr = q3 - q1;

  // Mode
  const mode = getMode(sorted);

  // Outliers (Tukey 1.5xIQR Rule)
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  const outliers = sorted.filter((v) => v < lowerBound || v > upperBound);

  // Skewness & Kurtosis (Sample unbiased estimators if count > 2, otherwise population moments)
  let m3 = 0;
  let m4 = 0;
  for (const v of sorted) {
    const dev = v - mean;
    m3 += Math.pow(dev, 3);
    m4 += Math.pow(dev, 4);
  }
  m3 /= count;
  m4 /= count;

  const skewness = popSD !== 0 ? m3 / Math.pow(popSD, 3) : 0;
  const kurtosis = popSD !== 0 ? m4 / Math.pow(popSD, 4) - 3 : 0; // Excess Kurtosis

  // 95% Confidence Interval for Mean (Z = 1.96)
  const marginOfError = 1.96 * stdError;
  const ci95Lower = mean - marginOfError;
  const ci95Upper = mean + marginOfError;

  return {
    count,
    sum,
    mean,
    sumSqDev,
    sampleVar,
    sampleSD,
    popVar,
    popSD,
    stdError,
    coeffVar,
    mad,
    min,
    q1,
    median,
    q3,
    max,
    iqr,
    range,
    mode,
    skewness,
    kurtosis,
    outliers,
    ci95Lower,
    ci95Upper,
    stepTable
  };
}

/**
 * Compute Grouped / Frequency Table Stats
 */
export function computeFrequencyStats(items: FrequencyItem[], isSample: boolean = true): DescriptiveStats {
  const expandedData: number[] = [];
  for (const item of items) {
    if (item.freq > 0) {
      for (let i = 0; i < item.freq; i++) {
        expandedData.push(item.val);
      }
    }
  }
  return computeDescriptiveStats(expandedData, isSample);
}

/**
 * Compare Two Datasets
 */
export function compareTwoDatasets(dataA: number[], dataB: number[]): TwoDatasetComparison {
  const statsA = computeDescriptiveStats(dataA, true);
  const statsB = computeDescriptiveStats(dataB, true);

  const varA = statsA.sampleVar;
  const varB = statsB.sampleVar;
  const fRatio = varB !== 0 ? varA / varB : (varA === 0 ? 1 : Infinity);

  const dfA = Math.max(0, statsA.count - 1);
  const dfB = Math.max(0, statsB.count - 1);
  const totalDf = dfA + dfB;
  const pooledVar = totalDf > 0 ? (dfA * varA + dfB * varB) / totalDf : 0;
  const pooledSD = Math.sqrt(pooledVar);

  return { statsA, statsB, fRatio, pooledSD };
}

function getPercentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return sorted[0];

  const pos = (sorted.length - 1) * p;
  const base = Math.floor(pos);
  const rest = pos - base;

  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  }
  return sorted[base];
}

function getMode(sorted: number[]): number[] {
  if (sorted.length === 0) return [];
  const counts = new Map<number, number>();
  let maxFreq = 0;

  for (const v of sorted) {
    const c = (counts.get(v) || 0) + 1;
    counts.set(v, c);
    if (c > maxFreq) maxFreq = c;
  }

  if (maxFreq === 1) return []; // No mode if all frequencies are 1

  const modes: number[] = [];
  counts.forEach((freq, val) => {
    if (freq === maxFreq) modes.push(val);
  });

  return modes.sort((a, b) => a - b);
}

function createEmptyStats(): DescriptiveStats {
  return {
    count: 0,
    sum: 0,
    mean: 0,
    sumSqDev: 0,
    sampleVar: 0,
    sampleSD: 0,
    popVar: 0,
    popSD: 0,
    stdError: 0,
    coeffVar: 0,
    mad: 0,
    min: 0,
    q1: 0,
    median: 0,
    q3: 0,
    max: 0,
    iqr: 0,
    range: 0,
    mode: [],
    skewness: 0,
    kurtosis: 0,
    outliers: [],
    ci95Lower: 0,
    ci95Upper: 0,
    stepTable: []
  };
}
