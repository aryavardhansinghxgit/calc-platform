export interface ResistorCalculatorInputs {
  band1?: string;
  band2?: string;
  multiplier?: string;
}

export interface ResistorCalculatorOutputs {
  resistanceOhms: number;
  formattedValue: string;
}
