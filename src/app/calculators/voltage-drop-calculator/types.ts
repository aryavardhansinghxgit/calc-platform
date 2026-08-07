export interface VoltageDropCalculatorInputs {
  voltage?: number;
  currentAmps?: number;
  distanceFt?: number;
  wireGauge?: string;
}

export interface VoltageDropCalculatorOutputs {
  voltageDrop: number;
  voltageDropPct: number;
  endVoltage: number;
}
