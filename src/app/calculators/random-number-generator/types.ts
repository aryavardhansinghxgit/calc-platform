export interface RandomNumberGeneratorInputs {
  min?: number;
  max?: number;
  count?: number;
}

export interface RandomNumberGeneratorOutputs {
  generatedList: string;
  average: number;
  sum: number;
}
