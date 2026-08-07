import { LogCalculatorOutputs } from "./types";

export function calculateLogCalculator(inputs: Record<string, any>): LogCalculatorOutputs {
  const x = Math.max(0.00001, Number(inputs.value) || 100);
  const b = Math.max(0.00001, Number(inputs.base) || 10);
  const logRes = b !== 1 ? Math.log(x) / Math.log(b) : 0;
  return {
    logResult: parseFloat(logRes.toFixed(6)),
    lnResult: parseFloat(Math.log(x).toFixed(6)),
    log10Result: parseFloat(Math.log10(x).toFixed(6))
  };
}
