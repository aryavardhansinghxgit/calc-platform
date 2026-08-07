export interface NumberSequenceCalculatorInputs {
  seqType?: string;
  firstTerm?: number;
  diffRatio?: number;
  termCount?: number;
}

export interface NumberSequenceCalculatorOutputs {
  nthTerm: number;
  sumN: number;
  sequencePreview: string;
}
