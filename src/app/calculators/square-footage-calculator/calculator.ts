import { SquareFootageCalculatorOutputs } from "./types";

export function calculateSquareFootageCalculator(inputs: Record<string, any>): SquareFootageCalculatorOutputs {
  const l = Math.max(0, Number(inputs.lengthFt) || 12);
  const w = Math.max(0, Number(inputs.widthFt) || 15);
  const price = Math.max(0, Number(inputs.pricePerSqFt) || 5);
  const sqFt = l * w;
  const sqM = parseFloat((sqFt * 0.092903).toFixed(2));
  return { squareFeet: sqFt, squareMeters: sqM, totalCost: sqFt * price };
}
