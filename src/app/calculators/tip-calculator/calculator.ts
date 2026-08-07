import { TipCalculatorOutputs } from "./types";

export function calculateTipCalculator(inputs: Record<string, any>): TipCalculatorOutputs {
  const bill = Math.max(0, Number(inputs.billAmount) || 85);
  const pct = Math.max(0, Number(inputs.tipPct) || 18) / 100;
  const ppl = Math.max(1, Number(inputs.peopleCount) || 3);
  const tip = bill * pct;
  const total = bill + tip;
  const perP = total / ppl;
  return { tipTotal: tip, grandTotal: total, perPersonTotal: perP };
}
