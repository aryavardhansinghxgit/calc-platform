/**
 * High-Performance Fraction Mathematical Engine & Step Generator
 */

export interface Fraction {
  n: bigint;
  d: bigint;
}

export interface MixedFraction {
  w: bigint;
  n: bigint;
  d: bigint;
}

export interface StepByStepSolution {
  title: string;
  steps: { stepNumber: number; title: string; latex: string; explanation: string }[];
}

export interface FractionCalculationOutput {
  exactFraction: string;        // "11/12"
  simplifiedFraction: string;   // "11/12"
  mixedNumber: string;          // "0 11/12" or "1 3/4"
  decimal: string;              // "0.9166666667"
  recurringDecimal: string;     // "0.916(6)"
  percentage: string;           // "91.67%"
  gcd: string;                  // "1"
  lcm: string;                  // "24"
  steps: StepByStepSolution;
  equivalentFractions: string[];
  ratio: string;                // "11 : 12"
  isProper: boolean;
}

// -------------------------------------------------------------
// CORE HELPER FUNCTIONS (BIGINT SAFE)
// -------------------------------------------------------------

export function gcdBigInt(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x === 0n ? 1n : x;
}

export function lcmBigInt(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n;
  const g = gcdBigInt(a, b);
  return (a / g) * b;
}

export function simplifyFrac(n: bigint, d: bigint): Fraction {
  if (d === 0n) throw new Error("Denominator cannot be zero.");
  let num = n;
  let den = d;
  if (den < 0n) {
    num = -num;
    den = -den;
  }
  const g = gcdBigInt(num, den);
  return { n: num / g, d: den / g };
}

export function toMixed(n: bigint, d: bigint): MixedFraction {
  const simp = simplifyFrac(n, d);
  const w = simp.n / simp.d;
  const rem = simp.n % simp.d;
  return { w, n: rem < 0n ? -rem : rem, d: simp.d };
}

export function mixedToImproperFrac(w: bigint, n: bigint, d: bigint): Fraction {
  const sign = w < 0n ? -1n : 1n;
  const absW = w < 0n ? -w : w;
  const num = sign * (absW * d + n);
  return simplifyFrac(num, d);
}

// -------------------------------------------------------------
// DECIMAL & RECURRING DECIMAL CONVERTER
// -------------------------------------------------------------

export function decimalToFrac(decStr: string): Fraction {
  const clean = decStr.trim();
  if (clean.includes(".")) {
    const parts = clean.split(".");
    const intPart = BigInt(parts[0] || "0");
    const decPart = parts[1] || "";
    const len = BigInt(decPart.length);
    const denom = 10n ** len;
    const num = intPart * denom + BigInt(decPart);
    return simplifyFrac(num, denom);
  }
  return { n: BigInt(clean), d: 1n };
}

export function recurringDecimalToFrac(nonRepeat: string, repeat: string): Fraction {
  const dNon = BigInt(nonRepeat.length);
  const dRep = BigInt(repeat.length);

  const fullStr = nonRepeat + repeat;
  const valFull = BigInt(fullStr || "0");
  const valNon = BigInt(nonRepeat || "0");

  const num = valFull - valNon;
  const nines = "9".repeat(Number(dRep));
  const zeros = "0".repeat(Number(dNon));
  const denom = BigInt(nines + zeros);

  return simplifyFrac(num, denom);
}

// -------------------------------------------------------------
// CONTINUED FRACTIONS APPROXIMATION
// -------------------------------------------------------------

export function approximateFraction(val: number, maxDenom = 1000): Fraction {
  let m00 = 1n, m01 = 0n, m10 = 0n, m11 = 1n;
  let x = val;
  for (let i = 0; i < 20; i++) {
    const a = BigInt(Math.floor(x));
    const nextM00 = m01;
    const nextM01 = m00 + a * m01;
    const nextM10 = m11;
    const nextM11 = m10 + a * m11;

    if (nextM11 > BigInt(maxDenom)) break;

    m00 = nextM00; m01 = nextM01;
    m10 = nextM10; m11 = nextM11;

    const diff = x - Math.floor(x);
    if (diff < 1e-10) break;
    x = 1 / diff;
  }
  return simplifyFrac(m01, m11);
}

// -------------------------------------------------------------
// STEP-BY-STEP ARITHMETIC SOLVER
// -------------------------------------------------------------

export function calculateFractionOperation(
  op: "+" | "-" | "*" | "/",
  n1: bigint,
  d1: bigint,
  n2: bigint,
  d2: bigint
): FractionCalculationOutput {
  const f1 = simplifyFrac(n1, d1);
  const f2 = simplifyFrac(n2, d2);
  let resultNum = 0n;
  let resultDen = 1n;
  const lcm = lcmBigInt(f1.d, f2.d);
  const steps: { stepNumber: number; title: string; latex: string; explanation: string }[] = [];

  if (op === "+") {
    const scale1 = lcm / f1.d;
    const scale2 = lcm / f2.d;
    const num1 = f1.n * scale1;
    const num2 = f2.n * scale2;
    resultNum = num1 + num2;
    resultDen = lcm;

    steps.push({
      stepNumber: 1,
      title: "Find Common Denominator",
      latex: `\\text{LCM}(${f1.d}, ${f2.d}) = ${lcm}`,
      explanation: `The least common multiple of ${f1.d} and ${f2.d} is ${lcm}.`,
    });
    steps.push({
      stepNumber: 2,
      title: "Convert Fractions to Common Denominator",
      latex: `\\frac{${f1.n} \\times ${scale1}}{${f1.d} \\times ${scale1}} + \\frac{${f2.n} \\times ${scale2}}{${f2.d} \\times ${scale2}} = \\frac{${num1}}{${lcm}} + \\frac{${num2}}{${lcm}}`,
      explanation: `Multiply numerators and denominators to get equivalent fractions over ${lcm}.`,
    });
    steps.push({
      stepNumber: 3,
      title: "Add Numerators",
      latex: `\\frac{${num1} + ${num2}}{${lcm}} = \\frac{${resultNum}}{${lcm}}`,
      explanation: `Add the converted numerators together while keeping the denominator ${lcm}.`,
    });
  } else if (op === "-") {
    const scale1 = lcm / f1.d;
    const scale2 = lcm / f2.d;
    const num1 = f1.n * scale1;
    const num2 = f2.n * scale2;
    resultNum = num1 - num2;
    resultDen = lcm;

    steps.push({
      stepNumber: 1,
      title: "Find Common Denominator",
      latex: `\\text{LCM}(${f1.d}, ${f2.d}) = ${lcm}`,
      explanation: `The least common multiple of ${f1.d} and ${f2.d} is ${lcm}.`,
    });
    steps.push({
      stepNumber: 2,
      title: "Convert Fractions to Common Denominator",
      latex: `\\frac{${f1.n} \\times ${scale1}}{${f1.d} \\times ${scale1}} - \\frac{${f2.n} \\times ${scale2}}{${f2.d} \\times ${scale2}} = \\frac{${num1}}{${lcm}} - \\frac{${num2}}{${lcm}}`,
      explanation: `Scale both fractions so they share the common denominator ${lcm}.`,
    });
    steps.push({
      stepNumber: 3,
      title: "Subtract Numerators",
      latex: `\\frac{${num1} - ${num2}}{${lcm}} = \\frac{${resultNum}}{${lcm}}`,
      explanation: `Subtract the second numerator from the first while keeping denominator ${lcm}.`,
    });
  } else if (op === "*") {
    resultNum = f1.n * f2.n;
    resultDen = f1.d * f2.d;

    steps.push({
      stepNumber: 1,
      title: "Multiply Numerators and Denominators",
      latex: `\\frac{${f1.n} \\times ${f2.n}}{${f1.d} \\times ${f2.d}} = \\frac{${resultNum}}{${resultDen}}`,
      explanation: `Multiply the numerators together (${f1.n} × ${f2.n} = ${resultNum}) and denominators together (${f1.d} × ${f2.d} = ${resultDen}).`,
    });
  } else if (op === "/") {
    resultNum = f1.n * f2.d;
    resultDen = f1.d * f2.n;

    steps.push({
      stepNumber: 1,
      title: "Reciprocal & Multiply",
      latex: `\\frac{${f1.n}}{${f1.d}} \\div \\frac{${f2.n}}{${f2.d}} = \\frac{${f1.n}}{${f1.d}} \\times \\frac{${f2.d}}{${f2.n}}`,
      explanation: `Multiply by the reciprocal of the second fraction (${f2.d}/${f2.n}).`,
    });
    steps.push({
      stepNumber: 2,
      title: "Multiply Across",
      latex: `\\frac{${f1.n} \\times ${f2.d}}{${f1.d} \\times ${f2.n}} = \\frac{${resultNum}}{${resultDen}}`,
      explanation: `Multiply top by top (${f1.n} × ${f2.d}) and bottom by bottom (${f1.d} × ${f2.n}).`,
    });
  }

  const finalSimp = simplifyFrac(resultNum, resultDen);
  const gcdVal = gcdBigInt(resultNum, resultDen);

  if (gcdVal > 1n) {
    steps.push({
      stepNumber: steps.length + 1,
      title: "Simplify Fraction",
      latex: `\\frac{${resultNum} \\div ${gcdVal}}{${resultDen} \\div ${gcdVal}} = \\frac{${finalSimp.n}}{${finalSimp.d}}`,
      explanation: `Divide numerator and denominator by their Greatest Common Divisor (${gcdVal}).`,
    });
  }

  const mixed = toMixed(finalSimp.n, finalSimp.d);
  if (mixed.w !== 0n && mixed.n !== 0n) {
    steps.push({
      stepNumber: steps.length + 1,
      title: "Convert to Mixed Number",
      latex: `\\frac{${finalSimp.n}}{${finalSimp.d}} = ${mixed.w} \\frac{${mixed.n}}{${mixed.d}}`,
      explanation: `Divide ${finalSimp.n} by ${finalSimp.d} to get quotient ${mixed.w} and remainder ${mixed.n}.`,
    });
  }

  const decNum = Number(finalSimp.n) / Number(finalSimp.d);
  const pct = (decNum * 100).toFixed(2) + "%";

  const equivalents = [2n, 3n, 4n, 5n, 10n].map(
    (mult) => `${finalSimp.n * mult}/${finalSimp.d * mult}`
  );

  return {
    exactFraction: `${resultNum}/${resultDen}`,
    simplifiedFraction: `${finalSimp.n}/${finalSimp.d}`,
    mixedNumber: mixed.w === 0n ? `${finalSimp.n}/${finalSimp.d}` : `${mixed.w} ${mixed.n}/${mixed.d}`,
    decimal: decNum.toString(),
    recurringDecimal: formatRecurringDec(Number(finalSimp.n), Number(finalSimp.d)),
    percentage: pct,
    gcd: gcdVal.toString(),
    lcm: lcm.toString(),
    steps: {
      title: `${f1.n}/${f1.d} ${op} ${f2.n}/${f2.d}`,
      steps,
    },
    equivalentFractions: equivalents,
    ratio: `${finalSimp.n} : ${finalSimp.d}`,
    isProper: Math.abs(Number(finalSimp.n)) < Math.abs(Number(finalSimp.d)),
  };
}

function formatRecurringDec(n: number, d: number): string {
  const val = (n / d).toFixed(6);
  return val;
}
