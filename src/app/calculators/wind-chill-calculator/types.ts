export interface WindChillCalculatorInputs {
  tempF?: number;
  windMph?: number;
}

export interface WindChillCalculatorOutputs {
  windChillF: number;
  windChillC: number;
}
