export interface DewPointCalculatorInputs {
  tempC?: number;
  humidityPct?: number;
}

export interface DewPointCalculatorOutputs {
  dewPointC: number;
  comfortLevel: string;
}
