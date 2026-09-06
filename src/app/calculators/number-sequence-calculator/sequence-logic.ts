/**
 * Core mathematical engine for Number Sequence Calculator & Series Suite
 * Features:
 * - Arithmetic, Geometric, Quadratic, Cubic, Quartic polynomial detection
 * - Exact floating-point geometric ratios and infinite sums
 * - Generalized additive recurrence (Fibonacci, Lucas, and custom starts)
 * - Clean polynomial formatting (no "1n² + (0)n + (1)" or "0n + 7")
 * - Insufficient data and ambiguity warnings
 * - Safe custom function evaluator a_n = f(n)
 */

export type SequenceType =
  | "arithmetic"
  | "geometric"
  | "quadratic"
  | "cubic"
  | "quartic"
  | "fibonacci"
  | "harmonic"
  | "unknown";

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
  notes?: string;
  ignoredTokens?: string[];
  polynomialCoeffs?: number[];
}

export interface FiniteDifferenceRow {
  level: number;
  name: string;
  values: number[];
  isConstant: boolean;
}

/**
 * Tokenize raw string input into clean numbers and record any ignored tokens
 */
export function parseSequenceInputWithValidation(raw: string): { numbers: number[]; ignoredTokens: string[] } {
  if (!raw || !raw.trim()) return { numbers: [], ignoredTokens: [] };
  const tokens = raw
    .replace(/,/g, " ")
    .replace(/\t/g, " ")
    .replace(/\n/g, " ")
    .split(/\s+/);

  const numbers: number[] = [];
  const ignoredTokens: string[] = [];

  for (const tok of tokens) {
    if (!tok) continue;
    const num = Number(tok);
    if (!Number.isNaN(num) && Number.isFinite(num)) {
      numbers.push(num);
    } else {
      ignoredTokens.push(tok);
    }
  }

  return { numbers, ignoredTokens };
}

export function parseSequenceInput(raw: string): number[] {
  return parseSequenceInputWithValidation(raw).numbers;
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
 * Simplify and format polynomial coefficients into clean standard mathematical notation:
 * - Omits 1 on leading powers (e.g. n² instead of 1n²)
 * - Omits -1 (e.g. -n² instead of -1n²)
 * - Omits terms with coefficient 0
 * - Constant sequences format as "7", not "0n + 7"
 * @param coeffs Coefficients in descending order: [c_k, c_{k-1}, ..., c_1, c_0]
 */
export function formatPolynomial(coeffs: number[], variable = "n"): string {
  const degree = coeffs.length - 1;
  const terms: string[] = [];

  for (let i = 0; i <= degree; i++) {
    const rawVal = coeffs[i];
    // Round close to integer if within floating-point tolerance
    const rounded = Math.abs(rawVal - Math.round(rawVal)) < 1e-9 ? Math.round(rawVal) : parseFloat(rawVal.toFixed(4));
    const power = degree - i;

    if (rounded === 0) continue;

    const absVal = Math.abs(rounded);
    const sign = rounded < 0 ? "-" : "+";

    let termStr = "";
    if (power === 0) {
      termStr = `${absVal}`;
    } else if (power === 1) {
      termStr = absVal === 1 ? variable : `${absVal}${variable}`;
    } else {
      const sup = power === 2 ? "²" : power === 3 ? "³" : power === 4 ? "⁴" : `^${power}`;
      termStr = absVal === 1 ? `${variable}${sup}` : `${absVal}${variable}${sup}`;
    }

    if (terms.length === 0) {
      terms.push(rounded < 0 ? `-${termStr}` : termStr);
    } else {
      terms.push(`${sign} ${termStr}`);
    }
  }

  if (terms.length === 0) return "0";
  return terms.join(" ");
}

/**
 * Evaluate polynomial at integer n
 */
export function evaluatePolynomial(coeffs: number[], n: number): number {
  let val = 0;
  const degree = coeffs.length - 1;
  for (let i = 0; i <= degree; i++) {
    val += coeffs[i] * Math.pow(n, degree - i);
  }
  return val;
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

  while (current.length > 1 && level <= 4) {
    const diffs: number[] = [];
    for (let i = 0; i < current.length - 1; i++) {
      diffs.push(parseFloat((current[i + 1] - current[i]).toFixed(6)));
    }

    const isConstant = diffs.every((d) => Math.abs(d - diffs[0]) < 1e-4);
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

/**
 * Automatic Sequence Pattern Detector
 */
export function detectSequencePattern(
  terms: number[],
  targetN: number = 10,
  ignoredTokens: string[] = []
): PatternAnalysisResult {
  if (terms.length === 0) {
    return {
      type: "unknown",
      typeName: "Empty Sequence",
      explicitFormula: "a_n = 0",
      recursiveFormula: "a_n = 0",
      firstTerm: 0,
      nextTerms: [],
      targetTerm: 0,
      partialSum: 0,
      notes: ignoredTokens.length > 0 ? `Invalid token(s) ignored: ${ignoredTokens.join(", ")}` : undefined,
      ignoredTokens
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
      partialSum: a1,
      notes: "A single term is insufficient to establish a mathematical pattern."
    };
  }

  // Handle 2 terms explicitly: Insufficient Data warning
  if (len === 2) {
    const d = terms[1] - terms[0];
    const explicitFormula = `a_n = ${formatPolynomial([d, a1 - d])}`;
    const targetTerm = a1 + (targetN - 1) * d;
    const partialSum = (targetN / 2) * (2 * a1 + (targetN - 1) * d);
    const nextTerms = [a1 + 2 * d, a1 + 3 * d, a1 + 4 * d];

    return {
      type: "arithmetic",
      typeName: "Candidate Arithmetic Sequence (Insufficient Data)",
      explicitFormula,
      recursiveFormula: `a_n = a_{n-1} ${d >= 0 ? "+" : "-"} ${Math.abs(d)}`,
      commonDiff: d,
      firstTerm: a1,
      nextTerms,
      targetTerm: parseFloat(targetTerm.toFixed(4)),
      partialSum: parseFloat(partialSum.toFixed(4)),
      notes: "Only 2 terms provided. Infinitely many polynomial or geometric rules can fit the same two points."
    };
  }

  // 1. Check Arithmetic Sequence (1st differences constant)
  const diffs1: number[] = [];
  for (let i = 0; i < len - 1; i++) {
    diffs1.push(terms[i + 1] - terms[i]);
  }

  const isArithmetic = diffs1.every((d) => Math.abs(d - diffs1[0]) < 1e-4);
  if (isArithmetic) {
    const d = diffs1[0];
    const constTerm = a1 - d;
    // Format formula cleanly: for d=0 (constant sequence), a_n = c
    const explicitFormula = d === 0 ? `a_n = ${a1}` : `a_n = ${formatPolynomial([d, constTerm])}`;
    const sign = d >= 0 ? "+" : "-";
    const absD = Math.abs(d);
    const recursiveFormula = d === 0 ? `a_n = a_{n-1}` : `a_n = a_{n-1} ${sign} ${absD}`;

    const targetTerm = a1 + (targetN - 1) * d;
    const partialSum = (targetN / 2) * (2 * a1 + (targetN - 1) * d);

    const nextTerms: number[] = [];
    for (let i = len + 1; i <= len + 5; i++) {
      nextTerms.push(a1 + (i - 1) * d);
    }

    return {
      type: "arithmetic",
      typeName: d === 0 ? "Constant Sequence" : "Arithmetic Sequence",
      explicitFormula,
      recursiveFormula,
      commonDiff: d,
      firstTerm: a1,
      nextTerms,
      targetTerm: parseFloat(targetTerm.toFixed(4)),
      partialSum: parseFloat(partialSum.toFixed(4)),
      polynomialCoeffs: [d, constTerm]
    };
  }

  // 2. Check Geometric Sequence (consecutive ratios constant, non-zero terms)
  if (terms.every((t) => t !== 0)) {
    const ratios: number[] = [];
    for (let i = 0; i < len - 1; i++) {
      ratios.push(terms[i + 1] / terms[i]);
    }

    const r = ratios[0];
    const isGeometric = ratios.every((val) => Math.abs(val - r) < 1e-4);

    if (isGeometric) {
      const rDisplay = Math.abs(r - Math.round(r)) < 1e-5 ? Math.round(r).toString() : parseFloat(r.toFixed(6)).toString();
      const explicitFormula = `a_n = ${a1} × (${rDisplay})^(n-1)`;
      const recursiveFormula = `a_n = ${rDisplay} × a_{n-1}`;

      const targetTerm = a1 * Math.pow(r, targetN - 1);
      const partialSum = Math.abs(r - 1) < 1e-9 ? a1 * targetN : (a1 * (1 - Math.pow(r, targetN))) / (1 - r);
      const isConvergent = Math.abs(r) < 1;
      const infiniteSum = isConvergent ? a1 / (1 - r) : undefined;

      const nextTerms: number[] = [];
      for (let i = len + 1; i <= len + 5; i++) {
        nextTerms.push(a1 * Math.pow(r, i - 1));
      }

      let notes: string | undefined;
      if (terms.length <= 4 && terms[0] === 1 && terms[1] === 2 && terms[2] === 4) {
        notes = "Detected candidate pattern: Geometric doubling (r = 2). Other polynomial or recurrence rules can also fit finite data.";
      }

      return {
        type: "geometric",
        typeName: "Geometric Sequence",
        explicitFormula,
        recursiveFormula,
        commonRatio: parseFloat(r.toFixed(6)),
        firstTerm: a1,
        nextTerms,
        targetTerm: parseFloat(targetTerm.toFixed(4)),
        partialSum: parseFloat(partialSum.toFixed(4)),
        infiniteSum: infiniteSum !== undefined ? parseFloat(infiniteSum.toFixed(4)) : undefined,
        isConvergent,
        notes
      };
    }
  }

  // 3. Check Quadratic Sequence (2nd differences constant)
  if (len >= 3) {
    const diffs2: number[] = [];
    for (let i = 0; i < diffs1.length - 1; i++) {
      diffs2.push(diffs1[i + 1] - diffs1[i]);
    }

    const isQuadratic = diffs2.every((d) => Math.abs(d - diffs2[0]) < 1e-4);
    if (isQuadratic) {
      const secondDiff = diffs2[0];
      const a = secondDiff / 2;
      const b = diffs1[0] - 3 * a;
      const c = a1 - a - b;

      const coeffs = [a, b, c];
      const explicitFormula = `a_n = ${formatPolynomial(coeffs)}`;
      const recursiveFormula = `a_n = a_{n-1} + ${formatPolynomial([secondDiff, diffs1[0] - secondDiff], "n")}`;

      const targetTerm = evaluatePolynomial(coeffs, targetN);

      let partialSum = 0;
      for (let i = 1; i <= targetN; i++) {
        partialSum += evaluatePolynomial(coeffs, i);
      }

      const nextTerms: number[] = [];
      for (let i = len + 1; i <= len + 5; i++) {
        nextTerms.push(evaluatePolynomial(coeffs, i));
      }

      return {
        type: "quadratic",
        typeName: "Quadratic Sequence",
        explicitFormula,
        recursiveFormula,
        firstTerm: a1,
        nextTerms,
        targetTerm: parseFloat(targetTerm.toFixed(4)),
        partialSum: parseFloat(partialSum.toFixed(4)),
        polynomialCoeffs: coeffs
      };
    }

    // 4. Check Cubic Sequence (3rd differences constant)
    if (len >= 4) {
      const diffs3: number[] = [];
      for (let i = 0; i < diffs2.length - 1; i++) {
        diffs3.push(diffs2[i + 1] - diffs2[i]);
      }

      const isCubic = diffs3.every((d) => Math.abs(d - diffs3[0]) < 1e-4);
      if (isCubic) {
        const d3 = diffs3[0];
        const a = d3 / 6;
        const b = (diffs2[0] - 12 * a) / 2;
        const c = diffs1[0] - 7 * a - 3 * b;
        const d = a1 - a - b - c;

        const coeffs = [a, b, c, d];
        const explicitFormula = `a_n = ${formatPolynomial(coeffs)}`;
        const recursiveFormula = `a_n = a_{n-1} + Δ²(n)`;

        const targetTerm = evaluatePolynomial(coeffs, targetN);

        let partialSum = 0;
        for (let i = 1; i <= targetN; i++) {
          partialSum += evaluatePolynomial(coeffs, i);
        }

        const nextTerms: number[] = [];
        for (let i = len + 1; i <= len + 5; i++) {
          nextTerms.push(evaluatePolynomial(coeffs, i));
        }

        return {
          type: "cubic",
          typeName: "Cubic Sequence (Degree 3 Polynomial)",
          explicitFormula,
          recursiveFormula,
          firstTerm: a1,
          nextTerms,
          targetTerm: parseFloat(targetTerm.toFixed(4)),
          partialSum: parseFloat(partialSum.toFixed(4)),
          polynomialCoeffs: coeffs
        };
      }

      // 5. Check Quartic Sequence (4th differences constant)
      if (len >= 5) {
        const diffs4: number[] = [];
        for (let i = 0; i < diffs3.length - 1; i++) {
          diffs4.push(diffs3[i + 1] - diffs3[i]);
        }

        const isQuartic = diffs4.every((d) => Math.abs(d - diffs4[0]) < 1e-4);
        if (isQuartic) {
          const d4 = diffs4[0];
          const a = d4 / 24;
          const b = (diffs3[0] - 36 * a) / 6;
          const c = (diffs2[0] - 14 * a - 6 * b) / 2;
          const d = diffs1[0] - 15 * a - 7 * b - 3 * c;
          const e = a1 - a - b - c - d;

          const coeffs = [a, b, c, d, e];
          const explicitFormula = `a_n = ${formatPolynomial(coeffs)}`;
          const recursiveFormula = `a_n = a_{n-1} + Δ³(n)`;

          const targetTerm = evaluatePolynomial(coeffs, targetN);

          let partialSum = 0;
          for (let i = 1; i <= targetN; i++) {
            partialSum += evaluatePolynomial(coeffs, i);
          }

          const nextTerms: number[] = [];
          for (let i = len + 1; i <= len + 5; i++) {
            nextTerms.push(evaluatePolynomial(coeffs, i));
          }

          return {
            type: "quartic",
            typeName: "Quartic Sequence (Degree 4 Polynomial)",
            explicitFormula,
            recursiveFormula,
            firstTerm: a1,
            nextTerms,
            targetTerm: parseFloat(targetTerm.toFixed(4)),
            partialSum: parseFloat(partialSum.toFixed(4)),
            polynomialCoeffs: coeffs
          };
        }
      }
    }
  }

  // 6. Check Additive Recurrence Sequence (a_n = a_{n-1} + a_{n-2})
  let isAdditiveRecurrence = true;
  for (let i = 2; i < len; i++) {
    if (Math.abs(terms[i] - (terms[i - 1] + terms[i - 2])) > 1e-4) {
      isAdditiveRecurrence = false;
      break;
    }
  }

  if (isAdditiveRecurrence && len >= 3) {
    const a2 = terms[1];

    // Compute terms iteratively using the true initial terms a1, a2
    const termSequence: number[] = [a1, a2];
    const maxGen = Math.max(targetN, len + 5);
    for (let i = 2; i < maxGen; i++) {
      termSequence.push(termSequence[i - 1] + termSequence[i - 2]);
    }

    const targetTerm = termSequence[targetN - 1];

    let partialSum = 0;
    for (let i = 0; i < targetN; i++) {
      partialSum += termSequence[i];
    }

    const nextTerms: number[] = [];
    for (let i = len; i < len + 5; i++) {
      nextTerms.push(termSequence[i]);
    }

    let typeName = "Fibonacci-type Recurrence Sequence";
    let explicitFormula = `a_n = a_{n-1} + a_{n-2} (with a₁ = ${a1}, a₂ = ${a2})`;

    if (a1 === 1 && a2 === 1) {
      typeName = "Fibonacci Sequence";
      explicitFormula = "F_n = [ Φⁿ - ψⁿ ] / √5";
    } else if (a1 === 1 && a2 === 3) {
      typeName = "Lucas Sequence";
      explicitFormula = "L_n = Φⁿ + ψⁿ";
    }

    return {
      type: "fibonacci",
      typeName,
      explicitFormula,
      recursiveFormula: "a_n = a_{n-1} + a_{n-2}",
      firstTerm: a1,
      nextTerms,
      targetTerm,
      partialSum
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
    partialSum: terms.reduce((acc, v) => acc + v, 0),
    notes: ignoredTokens.length > 0 ? `Non-numeric token(s) ignored: ${ignoredTokens.join(", ")}` : "No elementary arithmetic, geometric, polynomial, or Fibonacci recurrence pattern matched."
  };
}

/**
 * Safe Mathematical Expression Evaluator for Custom Function a_n = f(n)
 * Safely evaluates algebraic expressions of 'n' without eval()
 */
export function evaluateCustomFunction(
  expr: string,
  n: number
): number {
  if (!expr || !expr.trim()) return 0;

  // Clean expression and replace common mathematical aliases
  let clean = expr
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\^/g, "**")
    .replace(/(\d)n/g, "$1*n")
    .replace(/n(\d)/g, "n*$1")
    .replace(/\)\(/g, ")*(")
    .replace(/(\d)\(/g, "$1*(")
    .replace(/\)n/g, ")*n");

  // Validate expression contains only safe characters
  if (!/^[0-9n+\-*/().%*a-z]+$/.test(clean)) {
    throw new Error("Invalid characters in expression");
  }

  // Define safe math context
  const allowedMath: Record<string, (val: number) => number> = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    sqrt: Math.sqrt,
    abs: Math.abs,
    log: Math.log10,
    ln: Math.log,
    exp: Math.exp
  };

  // Safe tokenization / recursive descent parser
  let pos = 0;

  function peek(): string {
    return clean[pos] || "";
  }

  function get(): string {
    return clean[pos++] || "";
  }

  function parseExpression(): number {
    let result = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = get();
      const nextTerm = parseTerm();
      if (op === "+") result += nextTerm;
      else result -= nextTerm;
    }
    return result;
  }

  function parseTerm(): number {
    let result = parsePower();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const op = get();
      if (op === "*" && peek() === "*") {
        get(); // consume second '*'
        const exponent = parsePower();
        result = Math.pow(result, exponent);
      } else {
        const nextFactor = parsePower();
        if (op === "*") result *= nextFactor;
        else if (op === "/") {
          if (nextFactor === 0) throw new Error("Division by zero");
          result /= nextFactor;
        } else if (op === "%") {
          result %= nextFactor;
        }
      }
    }
    return result;
  }

  function parsePower(): number {
    const base = parseFactor();
    if (peek() === "*" && clean[pos + 1] === "*") {
      get();
      get();
      const exponent = parsePower(); // right-associative
      return Math.pow(base, exponent);
    }
    return base;
  }

  function parseFactor(): number {
    if (peek() === "-") {
      get();
      return -parseFactor();
    }
    if (peek() === "+") {
      get();
      return parseFactor();
    }

    if (peek() === "(") {
      get();
      const val = parseExpression();
      if (peek() === ")") get();
      return val;
    }

    // Check for variable n
    if (peek() === "n") {
      get();
      return n;
    }

    // Check for named functions (sin, cos, sqrt, etc.)
    for (const fn of Object.keys(allowedMath)) {
      if (clean.startsWith(fn, pos)) {
        pos += fn.length;
        if (peek() === "(") {
          get();
          const arg = parseExpression();
          if (peek() === ")") get();
          return allowedMath[fn](arg);
        }
      }
    }

    // Number literal
    let numStr = "";
    while (/[0-9.]/.test(peek())) {
      numStr += get();
    }

    if (numStr) {
      return parseFloat(numStr);
    }

    return 0;
  }

  const result = parseExpression();
  if (!Number.isFinite(result)) {
    throw new Error("Non-finite numerical result");
  }
  return result;
}

/**
 * Series Convergence Tester for Custom Function
 */
export function analyzeSeriesConvergence(
  fn: (n: number) => number
): { isConvergent: boolean | null; limitTerm: number; summary: string } {
  const t100 = fn(100);
  const t1000 = fn(1000);
  const t5000 = fn(5000);

  // Check nth-term test for divergence: if lim a_n != 0, series MUST diverge
  if (Math.abs(t5000) > 1e-4) {
    return {
      isConvergent: false,
      limitTerm: t5000,
      summary: "Divergent by Nth-Term Test: lim (n→∞) a_n ≠ 0"
    };
  }

  // Ratio test check: |a_{n+1} / a_n|
  const r = Math.abs(fn(1001) / (fn(1000) || 1e-9));
  if (r < 0.99) {
    return {
      isConvergent: true,
      limitTerm: 0,
      summary: `Likely Convergent (Ratio Test: r ≈ ${r.toFixed(4)} < 1)`
    };
  } else if (r > 1.01) {
    return {
      isConvergent: false,
      limitTerm: t5000,
      summary: `Divergent (Ratio Test: r ≈ ${r.toFixed(4)} > 1)`
    };
  }

  // Inconclusive for slow harmonic-like series (e.g. 1/n)
  return {
    isConvergent: null,
    limitTerm: t5000,
    summary: "Slow asymptotic behavior (e.g., Harmonic-type comparison required)"
  };
}
