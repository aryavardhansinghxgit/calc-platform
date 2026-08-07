import { RoofingCalculatorOutputs } from "./types";

export function calculateRoofingCalculator(inputs: Record<string, any>): RoofingCalculatorOutputs {
  const l = Math.max(1, Number(inputs.houseLengthFt) || 40);
  const w = Math.max(1, Number(inputs.houseWidthFt) || 30);
  const pitchMult = Number(inputs.pitch) || 1.118;
  const baseArea = l * w;
  const roofArea = baseArea * pitchMult * 1.1; // 10% waste factor
  const squares = parseFloat((roofArea / 100).toFixed(2));
  const bundles = Math.ceil(squares * 3);
  return { roofSquares: squares, bundlesNeeded: bundles, totalAreaSqFt: Math.round(roofArea) };
}
