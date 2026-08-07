import { ResistorCalculatorOutputs } from "./types";

export function calculateResistorCalculator(inputs: Record<string, any>): ResistorCalculatorOutputs {
  const d1 = Number(inputs.band1) || 1;
  const d2 = Number(inputs.band2) || 0;
  const mult = Number(inputs.multiplier) || 100;
  const ohms = (d1 * 10 + d2) * mult;
  let formatted = `${ohms} Ω`;
  if (ohms >= 1000000) formatted = `${(ohms / 1000000).toFixed(1)} MΩ`;
  else if (ohms >= 1000) formatted = `${(ohms / 1000).toFixed(1)} kΩ`;
  return { resistanceOhms: ohms, formattedValue: formatted };
}
