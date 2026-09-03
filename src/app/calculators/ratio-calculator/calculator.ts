import { RatioCalculatorOutputs } from "./types";

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function calculateRatioCalculator(inputs: Record<string, any>): RatioCalculatorOutputs {
  const target = (inputs.target || "D").toString().toUpperCase();
  const a = inputs.valA !== undefined ? Number(inputs.valA) : 3;
  const b = inputs.valB !== undefined ? Number(inputs.valB) : 4;
  const c = inputs.valC !== undefined ? Number(inputs.valC) : 6;
  const d = inputs.valD !== undefined ? Number(inputs.valD) : 8;

  let x = 0;

  if (target === "A") {
    // A / B = C / D => A = (B * C) / D
    if (d === 0 || isNaN(b) || isNaN(c) || isNaN(d)) {
      x = NaN;
    } else {
      x = (b * c) / d;
    }
  } else if (target === "B") {
    // A / B = C / D => B = (A * D) / C
    if (c === 0 || d === 0 || isNaN(a) || isNaN(c) || isNaN(d)) {
      x = NaN;
    } else {
      x = (a * d) / c;
    }
  } else if (target === "C") {
    // A / B = C / D => C = (A * D) / B
    if (b === 0 || isNaN(a) || isNaN(b) || isNaN(d)) {
      x = NaN;
    } else {
      x = (a * d) / b;
    }
  } else {
    // Solve D: A / B = C / D => D = (B * C) / A
    if (a === 0 || b === 0 || isNaN(a) || isNaN(b) || isNaN(c)) {
      x = NaN;
    } else {
      x = (b * c) / a;
    }
  }

  // Calculate simplified ratio of A : B (or default terms)
  const refA = !isNaN(a) && a !== 0 ? a : 3;
  const refB = !isNaN(b) && b !== 0 ? b : 4;
  const g = gcd(refA, refB);
  const simA = Math.round(refA) / g;
  const simB = Math.round(refB) / g;

  return {
    valX: isNaN(x) ? NaN : parseFloat(x.toFixed(4)),
    simplifiedRatio: `${simA} : ${simB}`,
    unitRate: refB !== 0 ? parseFloat((refA / refB).toFixed(4)) : undefined,
    gcd: g
  };
}

export default calculateRatioCalculator;
