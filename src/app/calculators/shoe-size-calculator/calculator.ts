import { ShoeSizeConversionCalculatorOutputs } from "./types";

export function calculateShoeSizeConversionCalculator(inputs: Record<string, any>): ShoeSizeConversionCalculatorOutputs {
  const cm = Math.max(10, Number(inputs.footCm) || 26);
  const isMen = inputs.gender !== "women";
  const us = isMen ? (cm - 18) * 1.5 : (cm - 17) * 1.5;
  const uk = us - 1;
  const eu = (cm + 1.5) * 1.5;
  return {
    usSize: `US ${parseFloat(us.toFixed(1))}`,
    ukSize: `UK ${parseFloat(uk.toFixed(1))}`,
    euSize: `EU ${Math.round(eu)}`
  };
}
