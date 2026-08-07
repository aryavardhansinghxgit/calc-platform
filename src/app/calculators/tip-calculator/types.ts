export interface TipCalculatorInputs {
  billAmount?: number;
  tipPct?: number;
  peopleCount?: number;
}

export interface TipCalculatorOutputs {
  tipTotal: number;
  grandTotal: number;
  perPersonTotal: number;
}
