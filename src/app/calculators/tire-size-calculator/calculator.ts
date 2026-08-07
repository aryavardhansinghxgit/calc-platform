import { TireSizeCalculatorOutputs } from "./types";

export function calculateTireSizeCalculator(inputs: Record<string, any>): TireSizeCalculatorOutputs {
  const w = Math.max(100, Number(inputs.widthMm) || 225);
  const aspect = Math.max(20, Number(inputs.aspectRatio) || 45) / 100;
  const rim = Math.max(10, Number(inputs.rimDiameterInches) || 17);
  const sidewallInches = (w * aspect) / 25.4;
  const diam = rim + 2 * sidewallInches;
  const circ = Math.PI * diam;
  return {
    tireDiameterInches: parseFloat(diam.toFixed(2)),
    sidewallHeightInches: parseFloat(sidewallInches.toFixed(2)),
    circumferenceInches: parseFloat(circ.toFixed(2))
  };
}
