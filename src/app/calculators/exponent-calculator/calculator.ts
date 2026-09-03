import { ExponentCalculatorOutputs } from "./types";

function parseVal(val: any, fallback: number): number {
  if (val === undefined || val === null || val === "" || isNaN(Number(val))) {
    return fallback;
  }
  return Number(val);
}

export function calculateExponentCalculator(inputs: Record<string, any>): ExponentCalculatorOutputs {
  const b = parseVal(inputs.base, 2);
  const n = parseVal(inputs.exponent, 10);

  let res: number;
  let isComplex = false;
  let complexStr = "";

  if (b === 0) {
    if (n > 0) {
      res = 0;
    } else if (n < 0) {
      res = NaN; // Division by zero: 1 / 0
    } else {
      // 0^0 is commonly 1 in algebra/combinatorics
      res = 1;
    }
  } else if (b < 0) {
    if (Number.isInteger(n)) {
      res = Math.pow(b, n);
    } else {
      // Non-integer exponent with negative base
      isComplex = true;
      const mag = Math.pow(Math.abs(b), n);
      let realPart = mag * Math.cos(n * Math.PI);
      let imagPart = mag * Math.sin(n * Math.PI);
      if (Math.abs(realPart) < 1e-12) realPart = 0;
      if (Math.abs(imagPart) < 1e-12) imagPart = 0;
      res = realPart;
      complexStr = `${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`;
    }
  } else {
    res = Math.pow(b, n);
  }

  let scientificNotation = "";
  if (isComplex) {
    scientificNotation = complexStr;
  } else if (!isNaN(res) && isFinite(res)) {
    scientificNotation = res.toExponential(4);
  } else if (isNaN(res)) {
    scientificNotation = "Undefined (Domain Error)";
  } else {
    scientificNotation = res > 0 ? "+Infinity" : "-Infinity";
  }

  return {
    result: isNaN(res) ? 0 : res,
    scientificNotation
  };
}

export default calculateExponentCalculator;
