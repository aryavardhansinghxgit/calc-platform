import { GasMileageCalculatorOutputs } from "./types";

export function calculateGasMileageCalculator(inputs: Record<string, any>): GasMileageCalculatorOutputs {
  const start = Number(inputs.startOdometer) || 45000;
  const end = Math.max(start, Number(inputs.endOdometer) || 45350);
  const gals = Math.max(0.1, Number(inputs.gallonsFilled) || 12.5);
  const dist = end - start;
  const mpg = dist / gals;
  const l100 = mpg > 0 ? 235.215 / mpg : 0;
  return { mpg: parseFloat(mpg.toFixed(1)), l100km: parseFloat(l100.toFixed(1)) };
}
