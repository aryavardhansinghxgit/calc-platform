import { RoundingCalculatorOutputs } from "./types";
import { roundByPlaceValue } from "./rounding-logic";

export function calculateRoundingCalculator(inputs: Record<string, any>): RoundingCalculatorOutputs {
  const num = Number(inputs.number) || 0;
  const prec = Math.min(10, Math.max(-10, Number(inputs.precision) || 0));
  const rounded = roundByPlaceValue(num, prec, "halfUp");

  return {
    roundedValue: rounded,
    floorValue: Math.floor(num),
    ceilValue: Math.ceil(num)
  };
}
