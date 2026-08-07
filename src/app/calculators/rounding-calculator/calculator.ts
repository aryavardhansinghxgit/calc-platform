import { RoundingCalculatorOutputs } from "./types";

export function calculateRoundingCalculator(inputs: Record<string, any>): RoundingCalculatorOutputs {
  const num = Number(inputs.number) || 0;
  const prec = Math.min(10, Math.max(-10, Number(inputs.precision) || 0));
  let rounded = num;
  if (prec >= 0) {
    const factor = Math.pow(10, prec);
    rounded = Math.round(num * factor) / factor;
  } else {
    const factor = Math.pow(10, Math.abs(prec));
    rounded = Math.round(num / factor) * factor;
  }
  return {
    roundedValue: rounded,
    floorValue: Math.floor(num),
    ceilValue: Math.ceil(num)
  };
}
