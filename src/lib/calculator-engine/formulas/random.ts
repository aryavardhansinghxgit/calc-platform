/**
 * High-Performance Random Number Generator & Statistical Engine
 */

export interface StepByStepSolution {
  title: string;
  steps: { stepNumber: number; title: string; latex: string; explanation: string }[];
}

export interface RandomGenerationOutput {
  numbers: number[];
  formattedString: string;
  count: number;
  min: number;
  max: number;
  mean: number;
  median: number;
  stdDev: number;
  histogramBins: { binLabel: string; count: number }[];
  steps: StepByStepSolution;
}

// -------------------------------------------------------------
// CORE RANDOM GENERATORS & STATISTICAL ANALYSIS
// -------------------------------------------------------------

/** 1. Standard Pseudo-Random & Cryptographic Random Integer */
export function generateRandomNumbers(
  min: number,
  max: number,
  count: number,
  type: "integer" | "decimal",
  precision: number,
  unique: boolean,
  sort: "none" | "asc" | "desc",
  useCrypto: boolean
): RandomGenerationOutput {
  const safeCount = Math.min(10000, Math.max(1, Math.round(count || 1)));
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  const results: number[] = [];
  const range = upper - lower;

  if (unique && type === "integer" && safeCount > Math.floor(range) + 1) {
    throw new Error(`Cannot generate ${safeCount} unique integers in range [${lower}, ${upper}]. Maximum possible unique integers is ${Math.floor(range) + 1}.`);
  }

  const generatedSet = new Set<number>();
  let attempts = 0;
  const maxAttempts = safeCount * 100;

  while (results.length < safeCount && attempts < maxAttempts) {
    attempts++;
    let val: number;

    if (useCrypto && typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const frac = array[0] / (0xffffffff + 1);
      val = lower + frac * range;
    } else {
      val = lower + Math.random() * range;
    }

    if (type === "integer") {
      val = Math.floor(val);
      if (val > upper) val = upper;
    } else {
      val = parseFloat(val.toFixed(precision));
    }

    if (unique) {
      if (!generatedSet.has(val)) {
        generatedSet.add(val);
        results.push(val);
      }
    } else {
      results.push(val);
    }
  }

  if (sort === "asc") {
    results.sort((a, b) => a - b);
  } else if (sort === "desc") {
    results.sort((a, b) => b - a);
  }

  // Statistical calculations
  const actualMin = results.length > 0 ? Math.min(...results) : 0;
  const actualMax = results.length > 0 ? Math.max(...results) : 0;
  const sum = results.reduce((acc, curr) => acc + curr, 0);
  const mean = results.length > 0 ? sum / results.length : 0;

  const sortedForMedian = [...results].sort((a, b) => a - b);
  const mid = Math.floor(sortedForMedian.length / 2);
  const median = sortedForMedian.length % 2 !== 0
    ? sortedForMedian[mid] || 0
    : ((sortedForMedian[mid - 1] || 0) + (sortedForMedian[mid] || 0)) / 2;

  const variance = results.length > 0
    ? results.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0) / results.length
    : 0;
  const stdDev = Math.sqrt(variance);

  // Generate 5 histogram bins
  const binsCount = Math.min(5, Math.max(2, Math.ceil(Math.sqrt(results.length))));
  const binStep = range / binsCount || 1;
  const bins: { binLabel: string; count: number }[] = [];

  for (let i = 0; i < binsCount; i++) {
    const binStart = lower + i * binStep;
    const binEnd = i === binsCount - 1 ? upper : lower + (i + 1) * binStep;
    const binItems = results.filter((n) => n >= binStart && (i === binsCount - 1 ? n <= binEnd : n < binEnd));
    bins.push({
      binLabel: `${binStart.toFixed(1)}–${binEnd.toFixed(1)}`,
      count: binItems.length,
    });
  }

  return {
    numbers: results,
    formattedString: results.join(", "),
    count: results.length,
    min: actualMin,
    max: actualMax,
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(median.toFixed(4)),
    stdDev: parseFloat(stdDev.toFixed(4)),
    histogramBins: bins,
    steps: {
      title: `Generated ${results.length} ${type}s between ${lower} and ${upper}`,
      steps: [
        {
          stepNumber: 1,
          title: "Define Range Bounds",
          latex: `\\text{Lower} = ${lower}, \\quad \\text{Upper} = ${upper}, \\quad N = ${safeCount}`,
          explanation: `Set the lower bound (${lower}), upper bound (${upper}), and sample count (${safeCount}).`,
        },
        {
          stepNumber: 2,
          title: "Execute PRNG Sampler",
          latex: useCrypto ? `\\text{Mode: Cryptographically Secure (WebCrypto)}` : `\\text{Mode: Uniform PRNG}`,
          explanation: useCrypto
            ? `Utilized hardware-seeded cryptographically secure WebCrypto API (getRandomValues).`
            : `Utilized standard uniform pseudo-random number distribution.`,
        },
        {
          stepNumber: 3,
          title: "Statistical Summary",
          latex: `\\mu = ${mean.toFixed(2)}, \\quad \\sigma = ${stdDev.toFixed(2)}, \\quad [\\text{Min}, \\text{Max}] = [${actualMin}, ${actualMax}]`,
          explanation: `Calculated sample mean (μ = ${mean.toFixed(2)}) and standard deviation (σ = ${stdDev.toFixed(2)}).`,
        },
      ],
    },
  };
}

/** 2. Gaussian / Normal Distribution Sampler (Box-Muller Transform) */
export function generateGaussianNumbers(mean: number, stdDev: number, count: number): number[] {
  const results: number[] = [];
  for (let i = 0; i < count; i += 2) {
    let u1 = Math.random();
    let u2 = Math.random();
    while (u1 === 0) u1 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);

    results.push(parseFloat((mean + z0 * stdDev).toFixed(4)));
    if (results.length < count) {
      results.push(parseFloat((mean + z1 * stdDev).toFixed(4)));
    }
  }
  return results;
}
