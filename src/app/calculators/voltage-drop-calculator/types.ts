export interface VoltageDropCalculatorInputs {
  voltage?: number;
  currentAmps?: number;
  distance?: number;
  distanceUnit?: "ft" | "m";
  wireMaterial?: "copper" | "aluminum";
  wireSize?: string;
  wireType?: "awg" | "metric";
  conduitMaterial?: "pvc" | "steel" | "aluminum";
  powerFactor?: number;
  conductorsPerPhase?: number;
  phase?: "dc" | "ac_single" | "ac_three";
  mode?: "nec" | "estimated" | "custom";
  customResistance?: number;
  customReactance?: number;
  customResistanceUnit?: "ft" | "m";
  customReactanceUnit?: "ft" | "m";
  targetDropPct?: number;
}

export interface VoltageDropCalculatorOutputs {
  voltageDrop: number;
  voltageDropPct: number;
  endVoltage: number;
  startingVoltage: number;
  current: number;
  distance: number;
  distanceUnit: "ft" | "m";
  pf: number;
  phase: string;
  wireSize: string;
  wireMaterial: string;
  conductors: number;
  r: number;
  x: number;
  z: number;
  formulaBreakdown?: string;
}

