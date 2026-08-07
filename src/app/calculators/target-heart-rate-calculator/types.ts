export interface TargetHeartRateCalculatorInputs {
  age?: number;
  restingHR?: number;
}

export interface TargetHeartRateCalculatorOutputs {
  maxHR: number;
  moderateZone: string;
  vigorousZone: string;
  peakZone: string;
}
