import { LogCalculatorOutputs } from "./types";

function parseVal(val: any, fallback: number): number {
  if (val === undefined || val === null || val === "" || isNaN(Number(val))) {
    return fallback;
  }
  return Number(val);
}

export function calculateLogCalculator(inputs: Record<string, any>): LogCalculatorOutputs {
  const x = parseVal(inputs.value ?? inputs.number ?? inputs.argument, 100);
  const b = parseVal(inputs.base, 10);

  // Validate standard positive real domain: x > 0, b > 0, b !== 1
  if (x <= 0 || b <= 0 || Math.abs(b - 1) < 1e-12 || isNaN(x) || isNaN(b)) {
    return {
      logResult: NaN,
      lnResult: x > 0 ? Math.log(x) : NaN,
      log10Result: x > 0 ? Math.log10(x) : NaN,
      log2Result: x > 0 ? Math.log2(x) : NaN
    };
  }

  const lnX = Math.log(x);
  const lnB = Math.log(b);
  const logRes = lnX / lnB;

  return {
    logResult: logRes,
    lnResult: lnX,
    log10Result: Math.log10(x),
    log2Result: Math.log2(x)
  };
}

export default calculateLogCalculator;
