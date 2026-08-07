export interface HeatIndexCalculatorInputs {
  tempF?: number;
  humidityPct?: number;
}

export interface HeatIndexCalculatorOutputs {
  heatIndexF: number;
  dangerLevel: string;
}
