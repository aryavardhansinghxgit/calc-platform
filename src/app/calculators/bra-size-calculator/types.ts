export interface BraSizeCalculatorInputs {
  underbustInches?: number;
  bustInches?: number;
}

export interface BraSizeCalculatorOutputs {
  braSize: string;
  bandSize: number;
  cupLetter: string;
}
