export interface SpeedCalculatorInputs {
  distanceKm?: number;
  timeHours?: number;
}

export interface SpeedCalculatorOutputs {
  speedKmh: number;
  speedMph: number;
  speedMs: number;
}
