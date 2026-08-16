/**
 * Core mathematical engine for Mean, Median, Mode, Range & Central Tendency Suite
 */

export interface FreqItem {
  val: number;
  freq: number;
}

export interface StandardMMMResult {
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: number[];
  modeType: "Unimodal" | "Bimodal" | "Multimodal" | "No Mode";
  range: number;
  min: number;
  max: number;
  midrange: number;
  q1: number;
  q3: number;
  iqr: number;
  sampleVar: number;
  sampleSD: number;
  popVar: number;
  popSD: number;
  stdError: number;
  sortedData: number[];
  freqTable: FreqItem[];
  meanStepText: string;
  medianStepText: string;
  modeStepText: string;
}

export interface AdvancedMeansResult {
  weightedMean?: number;
  geometricMean?: number;
  harmonicMean?: number;
  trimmedMean: number;
  midrange: number;
  trimPct: number;
}

export interface GroupedMMMResult {
  totalN: number;
  groupedMean: number;
  modalClass: string;
  rows: { val: number; freq: number; cumFreq: number; fx: number }[];
}

export interface TargetMeanResult {
  currentCount: number;
  currentSum: number;
  currentMean: number;
  targetMean: number;
  totalN: number;
  neededTotalSum: number;
  neededScore: number;
  remainingCount: number;
  neededAvgPerRemaining: number;
  isAchievable: boolean;
}

export interface OutlierSkewnessResult {
  skewness: number;
  skewnessShape: "Symmetric" | "Right-Skewed (Positive)" | "Left-Skewed (Negative)";
  lowerFence: number;
  upperFence: number;
  outliers: number[];
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
 * Standard Raw Data Stream Engine (Mean, Median, Mode & Range)
 */
export function computeStandardMMM(data: number[], isSample: boolean = true): StandardMMMResult {
  if (data.length === 0) {
    return {
      count: 0,
      sum: 0,
      mean: 0,
      median: 0,
      modes: [],
      modeType: "No Mode",
      range: 0,
      min: 0,
      max: 0,
      midrange: 0,
      q1: 0,
      q3: 0,
      iqr: 0,
      sampleVar: 0,
      sampleSD: 0,
      popVar: 0,
      popSD: 0,
      stdError: 0,
      sortedData: [],
      freqTable: [],
      meanStepText: "No data provided.",
      medianStepText: "No data provided.",
      modeStepText: "No data provided."
    };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const sum = sorted.reduce((acc, v) => acc + v, 0);
  const mean = sum / n;

  // Median Calculation
  const mid = Math.floor(n / 2);
  let median = 0;
  let medianStepText = "";

  if (n % 2 !== 0) {
    median = sorted[mid];
    medianStepText = `n = ${n} (odd). The median is the single middle value at position (${n}+1)/2 = ${mid + 1}: Median = ${median}`;
  } else {
    median = (sorted[mid - 1] + sorted[mid]) / 2;
    medianStepText = `n = ${n} (even). The median is the average of two middle values at positions ${mid} and ${mid + 1}: (${sorted[mid - 1]} + ${sorted[mid]}) / 2 = ${median}`;
  }

  // Mode Calculation
  const freqMap: Record<number, number> = {};
  let maxFreq = 0;
  for (const v of sorted) {
    freqMap[v] = (freqMap[v] || 0) + 1;
    if (freqMap[v] > maxFreq) maxFreq = freqMap[v];
  }

  const freqTable: FreqItem[] = [];
  for (const key in freqMap) {
    freqTable.push({ val: parseFloat(key), freq: freqMap[key] });
  }
  freqTable.sort((a, b) => b.freq - a.freq || a.val - b.val);

  const modes: number[] = [];
  if (maxFreq > 1) {
    for (const item of freqTable) {
      if (item.freq === maxFreq) {
        modes.push(item.val);
      }
    }
  }

  let modeType: "Unimodal" | "Bimodal" | "Multimodal" | "No Mode" = "No Mode";
  if (modes.length === 1) modeType = "Unimodal";
  else if (modes.length === 2) modeType = "Bimodal";
  else if (modes.length > 2) modeType = "Multimodal";

  const modeStepText = modes.length > 0
    ? `Highest frequency is ${maxFreq} (occurring for: ${modes.join(", ")}). Classification: ${modeType}.`
    : `All numbers occur with equal frequency (1). Classification: No Mode.`;

  // Range, Min, Max, Midrange
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  const midrange = (min + max) / 2;

  // Quartiles
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

  // Variance & SD
  const sumSqDev = sorted.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0);
  const popVar = sumSqDev / n;
  const popSD = Math.sqrt(popVar);
  const sampleVar = n > 1 ? sumSqDev / (n - 1) : 0;
  const sampleSD = Math.sqrt(sampleVar);
  const stdError = n > 0 ? sampleSD / Math.sqrt(n) : 0;

  const meanStepText = `Mean x̄ = Sum / Count = ${sum.toFixed(4)} / ${n} = ${mean.toFixed(4)}`;

  return {
    count: n,
    sum: parseFloat(sum.toFixed(4)),
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(median.toFixed(4)),
    modes,
    modeType,
    range: parseFloat(range.toFixed(4)),
    min,
    max,
    midrange: parseFloat(midrange.toFixed(4)),
    q1: parseFloat(q1.toFixed(4)),
    q3: parseFloat(q3.toFixed(4)),
    iqr: parseFloat(iqr.toFixed(4)),
    sampleVar: parseFloat(sampleVar.toFixed(4)),
    sampleSD: parseFloat(sampleSD.toFixed(4)),
    popVar: parseFloat(popVar.toFixed(4)),
    popSD: parseFloat(popSD.toFixed(4)),
    stdError: parseFloat(stdError.toFixed(4)),
    sortedData: sorted,
    freqTable,
    meanStepText,
    medianStepText,
    modeStepText
  };
}

/**
 * Advanced Means Suite
 */
export function computeAdvancedMeans(
  dataStr: string,
  weightStr: string,
  trimPct: number = 10
): AdvancedMeansResult {
  const data = parseDataset(dataStr);
  const weights = parseDataset(weightStr);

  if (data.length === 0) {
    return { trimmedMean: 0, midrange: 0, trimPct };
  }

  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const min = sorted[0];
  const max = sorted[n - 1];
  const midrange = (min + max) / 2;

  // Weighted Mean
  let weightedMean: number | undefined = undefined;
  if (weights.length > 0) {
    const len = Math.min(data.length, weights.length);
    let wxSum = 0;
    let wSum = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.max(0, weights[i]);
      wxSum += data[i] * w;
      wSum += w;
    }
    if (wSum > 0) {
      weightedMean = wxSum / wSum;
    }
  }

  // Geometric & Harmonic Mean
  let geometricMean: number | undefined = undefined;
  let harmonicMean: number | undefined = undefined;
  if (sorted.every((x) => x > 0)) {
    const logSum = sorted.reduce((acc, v) => acc + Math.log(v), 0);
    geometricMean = Math.exp(logSum / n);
    const recSum = sorted.reduce((acc, v) => acc + 1 / v, 0);
    harmonicMean = n / recSum;
  }

  // Trimmed Mean
  const trimCount = Math.floor((n * trimPct) / 100);
  const trimmed = sorted.slice(trimCount, n - trimCount);
  const trimmedMean = trimmed.length > 0 ? trimmed.reduce((acc, v) => acc + v, 0) / trimmed.length : sorted.reduce((acc, v) => acc + v, 0) / n;

  return {
    weightedMean: weightedMean !== undefined ? parseFloat(weightedMean.toFixed(4)) : undefined,
    geometricMean: geometricMean !== undefined ? parseFloat(geometricMean.toFixed(4)) : undefined,
    harmonicMean: harmonicMean !== undefined ? parseFloat(harmonicMean.toFixed(4)) : undefined,
    trimmedMean: parseFloat(trimmedMean.toFixed(4)),
    midrange: parseFloat(midrange.toFixed(4)),
    trimPct
  };
}

/**
 * Grouped Data / Frequency Table Mode
 */
export function computeGroupedMMM(valStr: string, freqStr: string): GroupedMMMResult {
  const vals = parseDataset(valStr);
  const freqs = parseDataset(freqStr);
  const len = Math.min(vals.length, freqs.length);

  if (len === 0) {
    return { totalN: 0, groupedMean: 0, modalClass: "N/A", rows: [] };
  }

  let totalN = 0;
  let fxSum = 0;
  let maxF = 0;
  let modalVal = 0;

  const rows: { val: number; freq: number; cumFreq: number; fx: number }[] = [];
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
      val: x,
      freq: f,
      cumFreq: totalN,
      fx
    });
  }

  const groupedMean = totalN > 0 ? fxSum / totalN : 0;

  return {
    totalN,
    groupedMean: parseFloat(groupedMean.toFixed(4)),
    modalClass: `Value ${modalVal} (Freq = ${maxF})`,
    rows
  };
}

/**
 * Target Mean Solver ("What Score Do I Need?")
 */
export function computeTargetMean(
  currentStr: string,
  targetMean: number,
  totalN: number
): TargetMeanResult {
  const current = parseDataset(currentStr);
  const currentCount = current.length;
  const currentSum = current.reduce((acc, v) => acc + v, 0);
  const currentMean = currentCount > 0 ? currentSum / currentCount : 0;

  const neededTotalSum = totalN * targetMean;
  const neededScore = neededTotalSum - currentSum;
  const remainingCount = Math.max(1, totalN - currentCount);
  const neededAvgPerRemaining = neededScore / remainingCount;
  const isAchievable = neededAvgPerRemaining <= 100 && neededAvgPerRemaining >= 0;

  return {
    currentCount,
    currentSum: parseFloat(currentSum.toFixed(2)),
    currentMean: parseFloat(currentMean.toFixed(2)),
    targetMean,
    totalN,
    neededTotalSum: parseFloat(neededTotalSum.toFixed(2)),
    neededScore: parseFloat(neededScore.toFixed(2)),
    remainingCount,
    neededAvgPerRemaining: parseFloat(neededAvgPerRemaining.toFixed(2)),
    isAchievable
  };
}

/**
 * Outlier Detection & Skewness Inspector
 */
export function computeOutlierSkewness(data: number[]): OutlierSkewnessResult {
  if (data.length === 0) {
    return {
      skewness: 0,
      skewnessShape: "Symmetric",
      lowerFence: 0,
      upperFence: 0,
      outliers: []
    };
  }

  const stats = computeStandardMMM(data, true);
  const n = stats.sortedData.length;
  const mean = stats.mean;
  const popSD = stats.popSD;

  // Tukey 1.5 * IQR Fences
  const lowerFence = stats.q1 - 1.5 * stats.iqr;
  const upperFence = stats.q3 + 1.5 * stats.iqr;
  const outliers = stats.sortedData.filter((v) => v < lowerFence || v > upperFence);

  // Pearson's Skewness
  const m3 = stats.sortedData.reduce((acc, v) => acc + Math.pow(v - mean, 3), 0) / n;
  const skewness = popSD > 0 ? m3 / Math.pow(popSD, 3) : 0;

  let skewnessShape: "Symmetric" | "Right-Skewed (Positive)" | "Left-Skewed (Negative)" = "Symmetric";
  if (skewness > 0.5) skewnessShape = "Right-Skewed (Positive)";
  else if (skewness < -0.5) skewnessShape = "Left-Skewed (Negative)";

  return {
    skewness: parseFloat(skewness.toFixed(4)),
    skewnessShape,
    lowerFence: parseFloat(lowerFence.toFixed(4)),
    upperFence: parseFloat(upperFence.toFixed(4)),
    outliers
  };
}
