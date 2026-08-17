/**
 * Core mathematical engine for Number Sequence Calculator & Series Suite
 */

export type SequenceType = "arithmetic" | "geometric" | "quadratic" | "cubic" | "fibonacci" | "harmonic" | "unknown";

export interface PatternAnalysisResult {
  type: SequenceType;
  typeName: string;
  explicitFormula: string;
  recursiveFormula: string;
  commonDiff?: number;
  commonRatio?: number;
  firstTerm: number;
  nextTerms: number[];
  targetTerm: number;
  partialSum: number;
  infiniteSum?: number;
  isConvergent?: boolean;
}

export interface FiniteDifferenceRow {
  level: number;
  name: string;
  values: number[];
  isConstant: boolean;
}

/**
 * Tokenize raw string input into clean numbers
 */
export function parseSequenceInput(raw: string): number[] {
  if (!raw || !raw.trim()) return [];
  const tokens = raw
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
 * Compute Binet's Golden Ratio Formula for Fibonacci N-th Term
 */
export function computeFibonacciBinet(n: number): number {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  const phi = (1 + Math.sqrt(5)) / 2;
  const psi = (1 - Math.sqrt(5)) / 2;
  return Math.round((Math.pow(phi, n) - Math.pow(psi, n)) / Math.sqrt(5));
}

/**
 * Automatic Sequence Pattern Detector
 */
export function detectSequencePattern(terms: number[], targetN: number = 10): PatternAnalysisResult {
  if (terms.length === 0) {
    return {
      type: "unknown",
      typeName: "Empty Sequence",
      explicitFormula: "a_n = 0",
      recursiveFormula: "a_n = 0",
      firstTerm: 0,
      nextTerms: [],
      targetTerm: 0,
      partialSum: 0
    };
  }

  const a1 = terms[0];
  const len = terms.length;

  if (len === 1) {
    return {
      type: "unknown",
      typeName: "Single Term",
      explicitFormula: `a_n = ${a1}`,
      recursiveFormula: `a_n = ${a1}`,
      firstTerm: a1,
      nextTerms: [a1],
      targetTerm: a1,
      partialSum: a1
    };
  }

  // 1. Check Arithmetic Sequence (1st differences constant)
  const diffs1: number[] = [];
  for (let i = 0; i < len - 1; i++) {
    diffs1.push(parseFloat((terms[i + 1] - terms[i]).toFixed(6)));
  }

  const isArithmetic = diffs1.every((d) => Math.abs(d - diffs1[0]) < 1e-6);
  if (isArithmetic) {
    const d = diffs1[0];
    const sign = d >= 0 ? "+" : "-";
    const absD = Math.abs(d);
    const constTerm = parseFloat((a1 - d).toFixed(4));
    const constSign = constTerm >= 0 ? "+" : "-";

    const explicitFormula = constTerm === 0 ? `a_n = ${d}n` : `a_n = ${d}n ${constSign} ${Math.abs(constTerm)}`;
    const recursiveFormula = `a_n = a_{n-1} ${sign} ${absD}`;

    const targetTerm = a1 + (targetN - 1) * d;
    const partialSum = (targetN / 2) * (2 * a1 + (targetN - 1) * d);

    const nextTerms: number[] = [];
    for (let i = len + 1; i <= len + 5; i++) {
      nextTerms.push(a1 + (i - 1) * d);
    }

    return {
      type: "arithmetic",
      typeName: "Arithmetic Sequence",
      explicitFormula,
      recursiveFormula,
      commonDiff: d,
      firstTerm: a1,
      nextTerms,
      targetTerm: parseFloat(targetTerm.toFixed(4)),
      partialSum: parseFloat(partialSum.toFixed(4))
    };
  }

  // 2. Check Geometric Sequence (consecutive ratios constant)
  if (terms.every((t) => t !== 0)) {
    const ratios: number[] = [];
    for (let i = 0; i < len - 1; i++) {
      ratios.push(parseFloat((terms[i + 1] / terms[i]).toFixed(6)));
    }

    const isGeometric = ratios.every((r) => Math.abs(r - ratios[0]) < 1e-5);
    if (isGeometric) {
      const r = ratios[0];
      const explicitFormula = `a_n = ${a1} × (${r})^(n-1)`;
      const recursiveFormula = `a_n = ${r} × a_{n-1}`;

      const targetTerm = a1 * Math.pow(r, targetN - 1);
      const partialSum = r === 1 ? a1 * targetN : a1 * (1 - Math.pow(r, targetN)) / (1 - r);
      const isConvergent = Math.abs(r) < 1;
      const infiniteSum = isConvergent ? a1 / (1 - r) : undefined;

      const nextTerms: number[] = [];
      for (let i = len + 1; i <= len + 5; i++) {
        nextTerms.push(a1 * Math.pow(r, i - 1));
      }

      return {
        type: "geometric",
        typeName: "Geometric Sequence",
        explicitFormula,
        recursiveFormula,
        commonRatio: r,
        firstTerm: a1,
        nextTerms,
        targetTerm: parseFloat(targetTerm.toFixed(4)),
        partialSum: parseFloat(partialSum.toFixed(4)),
        infiniteSum: infiniteSum ? parseFloat(infiniteSum.toFixed(4)) : undefined,
        isConvergent
      };
    }
  }

  // 3. Check Quadratic Sequence (2nd differences constant)
  if (len >= 3) {
    const diffs2: number[] = [];
    for (let i = 0; i < diffs1.length - 1; i++) {
      diffs2.push(parseFloat((diffs1[i + 1] - diffs1[i]).toFixed(6)));
    }

    const isQuadratic = diffs2.every((d) => Math.abs(d - diffs2[0]) < 1e-5);
    if (isQuadratic) {
      const secondDiff = diffs2[0];
      const a = secondDiff / 2;
      const b = diffs1[0] - 3 * a;
      const c = a1 - a - b;

      const explicitFormula = `a_n = ${a}n² + (${b})n + (${c})`;
      const recursiveFormula = `a_n = a_{n-1} + ${diffs1[0]} + ${(targetN - 2) * secondDiff}`;

      const getTerm = (n: number) => a * n * n + b * n + c;
      const targetTerm = getTerm(targetN);

      let partialSum = 0;
      for (let i = 1; i <= targetN; i++) {
        partialSum += getTerm(i);
      }

      const nextTerms: number[] = [];
      for (let i = len + 1; i <= len + 5; i++) {
        nextTerms.push(getTerm(i));
      }

      return {
        type: "quadratic",
        typeName: "Quadratic Sequence",
        explicitFormula,
        recursiveFormula,
        firstTerm: a1,
        nextTerms,
        targetTerm: parseFloat(targetTerm.toFixed(4)),
        partialSum: parseFloat(partialSum.toFixed(4))
      };
    }
  }

  // 4. Check Fibonacci / Recurrence Sequence
  let isFib = true;
  for (let i = 2; i < len; i++) {
    if (Math.abs(terms[i] - (terms[i - 1] + terms[i - 2])) > 1e-5) {
      isFib = false;
      break;
    }
  }

  if (isFib && len >= 3) {
    const targetTerm = computeFibonacciBinet(targetN);
    const nextTerms: number[] = [];
    for (let i = len + 1; i <= len + 5; i++) {
      nextTerms.push(computeFibonacciBinet(i));
    }

    return {
      type: "fibonacci",
      typeName: "Fibonacci / Recurrence Sequence",
      explicitFormula: "a_n = [ (1+√5)^n - (1-√5)^n ] / (2^n × √5)",
      recursiveFormula: "a_n = a_{n-1} + a_{n-2}",
      firstTerm: a1,
      nextTerms,
      targetTerm,
      partialSum: computeFibonacciBinet(targetN + 2) - 1
    };
  }

  // Fallback Unknown Pattern
  return {
    type: "unknown",
    typeName: "Custom / Unclassified Sequence",
    explicitFormula: "a_n = f(n)",
    recursiveFormula: "a_n = f(a_{n-1})",
    firstTerm: a1,
    nextTerms: [],
    targetTerm: terms[terms.length - 1] || 0,
    partialSum: terms.reduce((acc, v) => acc + v, 0)
  };
}

/**
 * Generate Method of Finite Differences Table
 */
export function generateFiniteDifferenceTable(terms: number[]): FiniteDifferenceRow[] {
  const table: FiniteDifferenceRow[] = [];
  if (terms.length === 0) return table;

  table.push({
    level: 0,
    name: "Sequence Terms (a_n)",
    values: [...terms],
    isConstant: false
  });

  let current = [...terms];
  let level = 1;

  while (current.length > 1 && level <= 3) {
    const diffs: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      diffs.push(parseFloat((current[i + 1] - current[i]).toFixed(4)));
    }

    const isConstant = diffs.every((d) => Math.abs(d - diffs[0]) < 1e-5);
    table.push({
      level,
      name: `Level ${level} Differences (Δ^${level})`,
      values: diffs,
      isConstant
    });

    if (isConstant) break;
    current = diffs;
    level++;
  }

  return table;
}
