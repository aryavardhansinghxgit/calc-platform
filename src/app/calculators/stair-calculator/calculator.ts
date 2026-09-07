import { StairCalculatorOutputs } from "./types";
import { parseCarpentryDimension } from "@/lib/calculator-engine/formulas/stair";

export function calculateStairCalculator(inputs: Record<string, any>): StairCalculatorOutputs {
  const parsedRise = parseCarpentryDimension(inputs.totalRiseInches);
  const parsedTarget = parseCarpentryDimension(inputs.targetRiserHeight);
  const rise = !isNaN(parsedRise) && parsedRise > 0 ? parsedRise : 108;
  const target = !isNaN(parsedTarget) && parsedTarget > 0 ? parsedTarget : 7.5;
  const steps = Math.max(1, Math.ceil(rise / target));
  const exactRiser = parseFloat((rise / steps).toFixed(2));
  const totalRun = Math.max(1, steps - 1) * 10; // Standard 10 inch tread
  return { numberOfSteps: steps, exactRiserHeight: exactRiser, totalRunInches: totalRun };
}
