import {
  SingleDieResult,
  DiceGroupRollResult,
  RollResult,
  ProbabilityPoint,
  DiceProbabilityStats,
} from "./types";

/**
 * Cryptographically Secure Pseudo-Random Number Generator (CSPRNG).
 * Uses window.crypto.getRandomValues if available, falling back to Math.random().
 */
export function secureRandomInt(min: number, max: number): number {
  if (min >= max) return min;
  const range = max - min + 1;

  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const maxUint = 0xffffffff;
    const limit = maxUint - (maxUint % range);
    const array = new Uint32Array(1);
    let randomValue: number;
    do {
      window.crypto.getRandomValues(array);
      randomValue = array[0];
    } while (randomValue >= limit);
    return min + (randomValue % range);
  }

  return Math.floor(Math.random() * range) + min;
}

export interface DiceTerm {
  count: number;
  sides: number;
  keepHighest?: number;
  keepLowest?: number;
  dropHighest?: number;
  dropLowest?: number;
  exploding?: boolean;
  rerollMin?: number;
  targetSuccess?: number;
  sign: number; // 1 or -1
}

/**
 * Parses dice notation strings (e.g., "4d6kh3 + 5", "2d20kl1 - 2", "3d6!", "5d10>=8").
 */
export function parseDiceExpression(exprString: string): {
  diceTerms: DiceTerm[];
  constantModifier: number;
} {
  const cleanExpr = exprString.replace(/\s+/g, "").toLowerCase();
  const diceTerms: DiceTerm[] = [];
  let constantModifier = 0;

  // Regex pattern matching terms like +4d6kh3, -2d20!, +5, etc.
  const termRegex = /([+-])?(\d+)?d(\d+)(kh\d+|kl\d+|dh\d+|dl\d+|!|r<=\d+|>=\d+)?|([+-]?\d+)/g;
  let match: RegExpExecArray | null;

  while ((match = termRegex.exec(cleanExpr)) !== null) {
    const termStr = match[0];
    if (!termStr) continue;

    const sign = match[1] === "-" ? -1 : 1;

    // Check if simple integer constant modifier
    if (match[4] !== undefined) {
      constantModifier += parseInt(match[4], 10);
      continue;
    }

    const count = match[2] ? parseInt(match[2], 10) : 1;
    const sides = parseInt(match[3], 10);
    const modifierStr: string = match[4] || "";

    const term: DiceTerm = {
      count: Math.min(100, Math.max(1, count)),
      sides: Math.min(1000, Math.max(1, sides)),
      sign,
    };

    if (modifierStr.startsWith("kh")) {
      term.keepHighest = parseInt(modifierStr.slice(2), 10);
    } else if (modifierStr.startsWith("kl")) {
      term.keepLowest = parseInt(modifierStr.slice(2), 10);
    } else if (modifierStr.startsWith("dh")) {
      term.dropHighest = parseInt(modifierStr.slice(2), 10);
    } else if (modifierStr.startsWith("dl")) {
      term.dropLowest = parseInt(modifierStr.slice(2), 10);
    } else if (modifierStr === "!") {
      term.exploding = true;
    } else if (modifierStr.startsWith("r<=")) {
      term.rerollMin = parseInt(modifierStr.slice(4), 10);
    } else if (modifierStr.startsWith(">=")) {
      term.targetSuccess = parseInt(modifierStr.slice(2), 10);
    }

    diceTerms.push(term);
  }

  // Fallback if no dice term matched
  if (diceTerms.length === 0) {
    diceTerms.push({ count: 1, sides: 20, sign: 1 });
  }

  return { diceTerms, constantModifier };
}

/**
 * Rolls dice based on an expression string.
 */
export function rollDice(expression: string): RollResult {
  const { diceTerms, constantModifier } = parseDiceExpression(expression);
  const diceGroups: DiceGroupRollResult[] = [];
  let totalSum = constantModifier;
  let hasCritSuccess = false;
  let hasCritFumble = false;
  let successCountTotal = 0;
  let isTargetSuccessMode = false;

  diceTerms.forEach((term) => {
    const rawRolls: SingleDieResult[] = [];

    for (let i = 0; i < term.count; i++) {
      let rollVal = secureRandomInt(1, term.sides);
      let isRerolled = false;

      if (term.rerollMin !== undefined && rollVal <= term.rerollMin) {
        rollVal = secureRandomInt(1, term.sides);
        isRerolled = true;
      }

      let isExploded = false;
      let finalVal = rollVal;

      if (term.exploding && rollVal === term.sides) {
        isExploded = true;
        let extraRoll = secureRandomInt(1, term.sides);
        finalVal += extraRoll;
        while (extraRoll === term.sides && finalVal < 1000) {
          extraRoll = secureRandomInt(1, term.sides);
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
        isRerolled,
      });
    }

    // Handle Keep / Drop logic
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
      modifier: constantModifier,
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
    modifier: constantModifier,
    hasCritSuccess,
    hasCritFumble,
    successCount: isTargetSuccessMode ? successCountTotal : undefined,
    isTargetSuccessMode,
    timestamp,
  };
}

/**
 * Computes exact PMF, Mean, Variance, StdDev for a given dice pool (e.g. m * dN + C).
 */
export function calculateProbabilityStats(count: number, sides: number, modifier: number = 0): DiceProbabilityStats {
  const m = Math.min(20, Math.max(1, count));
  const n = Math.min(100, Math.max(1, sides));

  const min = m + modifier;
  const max = m * n + modifier;

  // Single die expected value and variance
  const meanSingle = (n + 1) / 2;
  const varSingle = (n * n - 1) / 12;

  const mean = m * meanSingle + modifier;
  const variance = m * varSingle;
  const stdDev = parseFloat(Math.sqrt(variance).toFixed(2));
  const median = parseFloat(mean.toFixed(1));

  // Compute PMF distribution via polynomial convolution
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

  // Build probability mass points
  let cumulative = 0;
  const pmf: ProbabilityPoint[] = [];

  for (let val = m; val <= m * n; val++) {
    const prob = dist[val] || 0;
    const percent = parseFloat((prob * 100).toFixed(2));
    cumulative += percent;

    pmf.push({
      value: val + modifier,
      probability: parseFloat(prob.toFixed(4)),
      percent,
      cumulative: parseFloat(Math.min(100, cumulative).toFixed(2)),
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
