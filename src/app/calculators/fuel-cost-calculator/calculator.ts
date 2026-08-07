import { FuelCostCalculatorOutputs } from "./types";

export function calculateFuelCostCalculator(inputs: Record<string, any>): FuelCostCalculatorOutputs {
  const d = Math.max(0, Number(inputs.distanceMiles) || 300);
  const mpg = Math.max(1, Number(inputs.mpg) || 28);
  const price = Math.max(0, Number(inputs.gasPrice) || 3.5);
  const gals = d / mpg;
  const cost = gals * price;
  const cpm = d > 0 ? cost / d : 0;
  return { totalFuelCost: cost, gallonsNeeded: parseFloat(gals.toFixed(1)), costPerMile: cpm };
}
