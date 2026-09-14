import {
  SingleDieResult,
  DiceGroupRollResult,
  RollResult,
  ProbabilityPoint,
  DiceProbabilityStats,
  DiceRng,
  DiceTerm,
  ParsedDiceExpression,
} from "./types";

export type { DiceRng, DiceTerm, ParsedDiceExpression };

/**
 * Cryptographically Secure Pseudo-Random Number Generator (CSPRNG).
 * Uses window.crypto or globalThis.crypto with unbiased rejection sampling.
 * Falls back to Math.random() only if crypto is completely unavailable.
 */
export function secureRandomInt(min: number, max: number): number {
  if (min >= max) return min;
  const range = max - min + 1;

  const cryptoObj =
    typeof window !== "undefined" && window.crypto
      ? window.crypto
      : typeof globalThis !== "undefined" && globalThis.crypto
      ? globalThis.crypto
      : null;

  if (cryptoObj && cryptoObj.getRandomValues) {
    const maxUint = 0xffffffff;
    const limit = maxUint - (maxUint % range);
    const array = new Uint32Array(1);
    let randomValue: number;
    do {
      cryptoObj.getRandomValues(array);
      randomValue = array[0];
    } while (randomValue >= limit);
    return min + (randomValue % range);
  }

  return Math.floor(Math.random() * range) + min;
}

/**
 * Parses dice notation strings strictly and safely.
 * Does NOT silently fall back to 1d20 on malformed notation.
 */
export function parseDiceExpression(exprString: string): ParsedDiceExpression {
  if (!exprString || typeof exprString !== "string") {
    return { terms: [], constantModifier: 0, isValid: false, error: "Empty or invalid expression" };
  }

  const trimmed = exprString.trim();
  if (!trimmed) {
    return { terms: [], constantModifier: 0, isValid: false, error: "Empty expression" };
  }

  // Reject consecutive operators (+-, ++, --, -+)
  const compact = trimmed.replace(/\s+/g, "");
  if (/[+\-]{2,}/.test(compact)) {
    return { terms: [], constantModifier: 0, isValid: false, error: "Consecutive operators (+ or -) are invalid" };
  }
  if (/[+\-]$/.test(trimmed)) {
    return { terms: [], constantModifier: 0, isValid: false, error: "Expression cannot end with an operator" };
  }

  // Reject decimal numbers anywhere in dice notation (e.g., 2.5d6, 2d6kh3.5)
  if (/\d+\.\d+/.test(compact)) {
    return { terms: [], constantModifier: 0, isValid: false, error: "Decimal values are not allowed in dice notation" };
  }

  // Token pattern matching each term:
  // Starts with optional sign (+ or -)
  // Followed by dice term (\d+)?d(\d+)(modifier)? OR an integer modifier (\d+)
  const termPattern = /^\s*([+-])?\s*(?:(\d+)?d(\d+)(kh\d+|kl\d+|dh\d+|dl\d+|!|r<=\d+|>=\d+)?|(\d+))\s*/i;

  let remaining = trimmed;
  const terms: DiceTerm[] = [];
  let constantModifier = 0;
  let hasParsedAnyTerm = false;

  while (remaining.length > 0) {
    const match = termPattern.exec(remaining);
    if (!match) {
      return {
        terms: [],
        constantModifier: 0,
        isValid: false,
        error: `Syntax error near: "${remaining}"`,
      };
    }

    const matchedStr = match[0];
    const signStr = match[1];
    const countStr = match[2];
    const sidesStr = match[3];
    const modStr = match[4];
    const constStr = match[5];

    const sign = signStr === "-" ? -1 : 1;

    // Check if integer constant modifier
    if (constStr !== undefined) {
      const val = parseInt(constStr, 10);
      constantModifier += sign * val;
      hasParsedAnyTerm = true;
    } else {
      // Dice term
      let count = 1;
      if (countStr !== undefined) {
        count = parseInt(countStr, 10);
      }

      if (signStr === "-") {
        return { terms: [], constantModifier: 0, isValid: false, error: "Negative dice count is not supported" };
      }
      if (count < 1 || count > 1000) {
        return { terms: [], constantModifier: 0, isValid: false, error: `Dice count must be between 1 and 1000: got ${count}` };
      }

      const sides = parseInt(sidesStr, 10);
      if (isNaN(sides) || sides < 2 || sides > 10000) {
        return { terms: [], constantModifier: 0, isValid: false, error: `Sides must be an integer between 2 and 10000: got ${sidesStr}` };
      }

      const term: DiceTerm = { count, sides, sign: 1 };

      if (modStr) {
        const lowerMod = modStr.toLowerCase();
        if (lowerMod.startsWith("kh")) {
          const k = parseInt(lowerMod.slice(2), 10);
          if (k < 1) {
            return { terms: [], constantModifier: 0, isValid: false, error: "keep-highest must be at least 1" };
          }
          if (k > count) {
            return { terms: [], constantModifier: 0, isValid: false, error: `Cannot keep ${k} dice from a pool of ${count}` };
          }
          term.keepHighest = k;
        } else if (lowerMod.startsWith("kl")) {
          const k = parseInt(lowerMod.slice(2), 10);
          if (k < 1) {
            return { terms: [], constantModifier: 0, isValid: false, error: "keep-lowest must be at least 1" };
          }
          if (k > count) {
            return { terms: [], constantModifier: 0, isValid: false, error: `Cannot keep ${k} dice from a pool of ${count}` };
          }
          term.keepLowest = k;
        } else if (lowerMod.startsWith("dh")) {
          const d = parseInt(lowerMod.slice(2), 10);
          if (d < 1 || d >= count) {
            return { terms: [], constantModifier: 0, isValid: false, error: `Cannot drop ${d} dice from a pool of ${count}` };
          }
          term.dropHighest = d;
        } else if (lowerMod.startsWith("dl")) {
          const d = parseInt(lowerMod.slice(2), 10);
          if (d < 1 || d >= count) {
            return { terms: [], constantModifier: 0, isValid: false, error: `Cannot drop ${d} dice from a pool of ${count}` };
          }
          term.dropLowest = d;
        } else if (lowerMod === "!") {
          term.exploding = true;
        } else if (lowerMod.startsWith("r<=")) {
          term.rerollBelow = parseInt(lowerMod.slice(4), 10);
        } else if (lowerMod.startsWith(">=")) {
          term.targetSuccess = parseInt(lowerMod.slice(2), 10);
        }
      }

      terms.push(term);
      hasParsedAnyTerm = true;
    }

    remaining = remaining.slice(matchedStr.length);
  }

  if (!hasParsedAnyTerm || terms.length === 0) {
    return { terms: [], constantModifier: 0, isValid: false, error: "No valid dice term specified in expression" };
  }

  return { terms, constantModifier, isValid: true };
}

/**
 * Rolls dice based on an expression string with optional deterministic RNG injection.
 */
export function rollDice(expression: string, customRng?: DiceRng): RollResult {
  const parsed = parseDiceExpression(expression);
  if (!parsed.isValid) {
    throw new Error(parsed.error || `Invalid dice expression: "${expression}"`);
  }

  const rng = customRng ?? secureRandomInt;
  const diceGroups: DiceGroupRollResult[] = [];
  let totalSum = parsed.constantModifier;
  let hasCritSuccess = false;
  let hasCritFumble = false;
  let successCountTotal = 0;
  let isTargetSuccessMode = false;

  parsed.terms.forEach((term) => {
    const rawRolls: SingleDieResult[] = [];

    for (let i = 0; i < term.count; i++) {
      let rollVal = rng(1, term.sides);
      let isRerolled = false;

      if (term.rerollBelow !== undefined && rollVal <= term.rerollBelow) {
        rollVal = rng(1, term.sides);
        isRerolled = true;
      }

      let isExploded = false;
      let finalVal = rollVal;
      let explodedRolls: number[] | undefined;

      if (term.exploding && rollVal === term.sides) {
        isExploded = true;
        explodedRolls = [rollVal];
        let extraRoll = rng(1, term.sides);
        explodedRolls.push(extraRoll);
        finalVal += extraRoll;
        // Hard safety cap at 1000 to prevent runaway loops
        while (extraRoll === term.sides && finalVal < 1000) {
          extraRoll = rng(1, term.sides);
          explodedRolls.push(extraRoll);
          finalVal += extraRoll;
        }
      }

      const isCritSuccess = term.sides >= 4 && rollVal === term.sides;
      const isCritFumble = term.sides >= 4 && rollVal === 1;

      if (isCritSuccess) hasCritSuccess = true;
      if (isCritFumble) hasCritFumble = true;

      rawRolls.push({
        dieType: `d${term.sides}`,
        sides: term.sides,
        rawRoll: rollVal,
        finalValue: finalVal,
        isKept: true,
        isCriticalSuccess: isCritSuccess,
        isCriticalFumble: isCritFumble,
        isExploded,
        explodedRolls,
        isRerolled,
      });
    }

    // Keep / Drop selection logic
    if (term.keepHighest !== undefined) {
      const k = Math.min(term.count, Math.max(1, term.keepHighest));
      const sorted = [...rawRolls].sort((a, b) => b.finalValue - a.finalValue);
      const keptSet = new Set(sorted.slice(0, k));
      rawRolls.forEach((r) => {
        r.isKept = keptSet.has(r);
      });
    } else if (term.keepLowest !== undefined) {
      const k = Math.min(term.count, Math.max(1, term.keepLowest));
      const sorted = [...rawRolls].sort((a, b) => a.finalValue - b.finalValue);
      const keptSet = new Set(sorted.slice(0, k));
      rawRolls.forEach((r) => {
        r.isKept = keptSet.has(r);
      });
    } else if (term.dropLowest !== undefined) {
      const d = Math.min(term.count - 1, Math.max(1, term.dropLowest));
      const sorted = [...rawRolls].sort((a, b) => a.finalValue - b.finalValue);
      const droppedSet = new Set(sorted.slice(0, d));
      rawRolls.forEach((r) => {
        r.isKept = !droppedSet.has(r);
      });
    } else if (term.dropHighest !== undefined) {
      const d = Math.min(term.count - 1, Math.max(1, term.dropHighest));
      const sorted = [...rawRolls].sort((a, b) => b.finalValue - a.finalValue);
      const droppedSet = new Set(sorted.slice(0, d));
      rawRolls.forEach((r) => {
        r.isKept = !droppedSet.has(r);
      });
    }

    let groupSubtotal = 0;
    rawRolls.forEach((r) => {
      if (r.isKept) {
        if (term.targetSuccess !== undefined) {
          isTargetSuccessMode = true;
          if (r.finalValue >= term.targetSuccess) {
            successCountTotal++;
            groupSubtotal++;
          }
        } else {
          groupSubtotal += r.finalValue;
        }
      }
    });

    totalSum += groupSubtotal * term.sign;

    diceGroups.push({
      expression: `${term.count}d${term.sides}`,
      count: term.count,
      sides: term.sides,
      modifier: parsed.constantModifier,
      rolls: rawRolls,
      subtotal: groupSubtotal,
    });
  });

  const now = new Date();
  const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return {
    expression,
    total: isTargetSuccessMode ? successCountTotal : totalSum,
    diceGroups,
    modifier: parsed.constantModifier,
    hasCritSuccess,
    hasCritFumble,
    successCount: isTargetSuccessMode ? successCountTotal : undefined,
    isTargetSuccessMode,
    timestamp,
  };
}

/**
 * Computes exact combinatorial PMF for order-statistic dice pools (e.g. 4d6kh3, 2d20kh1, 2d20kl1).
 */
function computeExactKeepPmf(
  count: number,
  sides: number,
  keepCount: number,
  isLowest: boolean,
  modifier: number = 0
): DiceProbabilityStats {
  const k = Math.min(count, Math.max(1, keepCount));
  const totalOutcomes = Math.pow(sides, count);
  const freqMap: Record<number, number> = {};

  const currentRolls: number[] = new Array(count);

  function enumerate(dieIdx: number) {
    if (dieIdx === count) {
      const sorted = [...currentRolls].sort((a, b) => (isLowest ? a - b : b - a));
      let sum = 0;
      for (let i = 0; i < k; i++) {
        sum += sorted[i];
      }
      freqMap[sum] = (freqMap[sum] || 0) + 1;
      return;
    }
    for (let face = 1; face <= sides; face++) {
      currentRolls[dieIdx] = face;
      enumerate(dieIdx + 1);
    }
  }

  enumerate(0);

  const sortedSums = Object.keys(freqMap).map(Number).sort((a, b) => a - b);
  const min = sortedSums[0] + modifier;
  const max = sortedSums[sortedSums.length - 1] + modifier;

  let sumX = 0;
  let sumX2 = 0;
  const pmf: ProbabilityPoint[] = [];
  let cumulative = 0;
  let rawSum = 0;

  for (let idx = 0; idx < sortedSums.length; idx++) {
    const s = sortedSums[idx];
    const countMatch = freqMap[s];
    const rawProb = countMatch / totalOutcomes;
    rawSum += rawProb;
    const valWithMod = s + modifier;
    const percent = parseFloat((rawProb * 100).toFixed(2));
    cumulative += percent;
    sumX += valWithMod * rawProb;
    sumX2 += valWithMod * valWithMod * rawProb;

    pmf.push({
      value: valWithMod,
      rawProbability: rawProb,
      probability: parseFloat(rawProb.toFixed(4)),
      percent,
      cumulative: idx === sortedSums.length - 1 ? 100.0 : parseFloat(Math.min(100, cumulative).toFixed(2)),
    });
  }

  const mean = sumX;
  const variance = sumX2 - mean * mean;
  const stdDev = Math.sqrt(variance);

  return {
    min,
    max,
    mean: parseFloat(mean.toFixed(4)),
    variance: parseFloat(variance.toFixed(4)),
    stdDev: parseFloat(stdDev.toFixed(2)),
    median: parseFloat(mean.toFixed(1)),
    pmf,
    rawSum: 1.0,
    isSimulated: false,
  };
}

/**
 * Empirical Monte Carlo simulation for exploding dice (e.g. 3d6!).
 */
function computeSimulatedExplodingPmf(
  count: number,
  sides: number,
  modifier: number = 0
): DiceProbabilityStats {
  const TRIALS = 50000;
  const freqMap: Record<number, number> = {};

  for (let i = 0; i < TRIALS; i++) {
    let rollSum = 0;
    for (let d = 0; d < count; d++) {
      let val = Math.floor(Math.random() * sides) + 1;
      let totalDie = val;
      while (val === sides && totalDie < 500) {
        val = Math.floor(Math.random() * sides) + 1;
        totalDie += val;
      }
      rollSum += totalDie;
    }
    freqMap[rollSum] = (freqMap[rollSum] || 0) + 1;
  }

  const sortedSums = Object.keys(freqMap).map(Number).sort((a, b) => a - b);
  const min = sortedSums[0] + modifier;
  const max = sortedSums[sortedSums.length - 1] + modifier;

  let sumX = 0;
  let sumX2 = 0;
  const pmf: ProbabilityPoint[] = [];
  let cumulative = 0;

  for (let idx = 0; idx < sortedSums.length; idx++) {
    const s = sortedSums[idx];
    const countMatch = freqMap[s];
    const rawProb = countMatch / TRIALS;
    const valWithMod = s + modifier;
    const percent = parseFloat((rawProb * 100).toFixed(2));
    cumulative += percent;
    sumX += valWithMod * rawProb;
    sumX2 += valWithMod * valWithMod * rawProb;

    pmf.push({
      value: valWithMod,
      rawProbability: rawProb,
      probability: parseFloat(rawProb.toFixed(4)),
      percent,
      cumulative: idx === sortedSums.length - 1 ? 100.0 : parseFloat(Math.min(100, cumulative).toFixed(2)),
    });
  }

  const mean = sumX;
  const variance = sumX2 - mean * mean;
  const stdDev = Math.sqrt(variance);

  return {
    min,
    max,
    mean: parseFloat(mean.toFixed(2)),
    variance: parseFloat(variance.toFixed(2)),
    stdDev: parseFloat(stdDev.toFixed(2)),
    median: parseFloat(mean.toFixed(1)),
    pmf,
    rawSum: 1.0,
    isSimulated: true,
  };
}

/**
 * Computes exact or simulated PMF, Mean, Variance, StdDev for a given dice pool or expression.
 */
export function calculateProbabilityStats(
  count: number,
  sides: number,
  modifier: number = 0,
  options?: {
    keepHighest?: number;
    keepLowest?: number;
    dropLowest?: number;
    dropHighest?: number;
    exploding?: boolean;
  }
): DiceProbabilityStats {
  const m = Math.min(20, Math.max(1, count));
  const n = Math.min(100, Math.max(1, sides));

  // Handle exploding dice simulation
  if (options?.exploding) {
    return computeSimulatedExplodingPmf(m, n, modifier);
  }

  // Handle keep-highest order statistic
  if (options?.keepHighest !== undefined) {
    const k = Math.min(m, Math.max(1, options.keepHighest));
    if (Math.pow(n, m) <= 200000) {
      return computeExactKeepPmf(m, n, k, false, modifier);
    }
  }

  // Handle drop-lowest (equivalent to keepHighest = count - dropLowest)
  if (options?.dropLowest !== undefined) {
    const k = Math.max(1, m - options.dropLowest);
    if (Math.pow(n, m) <= 200000) {
      return computeExactKeepPmf(m, n, k, false, modifier);
    }
  }

  // Handle keep-lowest order statistic
  if (options?.keepLowest !== undefined) {
    const k = Math.min(m, Math.max(1, options.keepLowest));
    if (Math.pow(n, m) <= 200000) {
      return computeExactKeepPmf(m, n, k, true, modifier);
    }
  }

  // Standard multi-dice sum PMF via polynomial convolution
  const min = m + modifier;
  const max = m * n + modifier;

  const meanSingle = (n + 1) / 2;
  const varSingle = (n * n - 1) / 12;

  const mean = m * meanSingle + modifier;
  const variance = m * varSingle;
  const stdDev = parseFloat(Math.sqrt(variance).toFixed(2));
  const median = parseFloat(mean.toFixed(1));

  let dist: number[] = [1];
  for (let i = 0; i < m; i++) {
    const nextDist = new Array(dist.length + n).fill(0);
    for (let j = 0; j < dist.length; j++) {
      for (let k = 1; k <= n; k++) {
        nextDist[j + k] += dist[j] / n;
      }
    }
    dist = nextDist;
  }

  let cumulative = 0;
  const pmf: ProbabilityPoint[] = [];

  for (let val = m; val <= m * n; val++) {
    const rawProb = dist[val] || 0;
    const percent = parseFloat((rawProb * 100).toFixed(2));
    cumulative += percent;

    pmf.push({
      value: val + modifier,
      rawProbability: rawProb,
      probability: parseFloat(rawProb.toFixed(4)),
      percent,
      cumulative: val === m * n ? 100.0 : parseFloat(Math.min(100, cumulative).toFixed(2)),
    });
  }

  return {
    min,
    max,
    mean: parseFloat(mean.toFixed(2)),
    variance: parseFloat(variance.toFixed(2)),
    stdDev,
    median,
    pmf,
    rawSum: 1.0,
    isSimulated: false,
  };
}

/**
 * Calculator engine bridge function for CalculatorModuleDefinition.
 */
export function calculateDiceRollerFromInputs(inputs: Record<string, any>) {
  const count = Number(inputs.diceCount) || 2;
  const sides = Number(inputs.diceSides) || 6;
  const modifier = Number(inputs.modifier) || 0;

  const stats = calculateProbabilityStats(count, sides, modifier);

  return {
    mean: stats.mean,
    minMax: `${stats.min} – ${stats.max}`,
    stdDev: stats.stdDev,
  };
}
