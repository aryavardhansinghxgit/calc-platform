export interface PregnancyWeightGainCalculatorInputs {
  preWeightKg?: number;
  heightCm?: number;
  week?: number;
}

export interface PregnancyWeightGainCalculatorOutputs {
  preBmi: number;
  recommendedGainTotal: string;
  targetGainWeek: string;
}
