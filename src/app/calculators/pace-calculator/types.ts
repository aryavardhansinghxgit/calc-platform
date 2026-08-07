export interface PaceCalculatorInputs {
  distanceKm?: number;
  timeHours?: number;
  timeMinutes?: number;
  timeSeconds?: number;
}

export interface PaceCalculatorOutputs {
  paceKm: string;
  paceMile: string;
  speedKmh: number;
  speedMph: number;
}
