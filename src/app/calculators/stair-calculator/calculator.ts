import { StairCalculatorOutputs } from "./types";

export function calculateStairCalculator(inputs: Record<string, any>): StairCalculatorOutputs {
  const rise = Math.max(1, Number(inputs.totalRiseInches) || 108);
  const target = Math.max(4, Number(inputs.targetRiserHeight) || 7.5);
  const steps = Math.round(rise / target);
  const exactRiser = parseFloat((rise / steps).toFixed(2));
  const totalRun = (steps - 1) * 10; // Standard 10 inch tread
  return { numberOfSteps: steps, exactRiserHeight: exactRiser, totalRunInches: totalRun };
}
