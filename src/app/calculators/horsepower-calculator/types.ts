export type CalcMode = "torque_rpm" | "drag_strip" | "acceleration" | "unit_converter";
export type DragModel = "fox" | "hale" | "hunt";
export type DrivetrainType = "fwd_manual" | "rwd_manual" | "rwd_auto" | "awd";
export type PerformanceTier = "economy" | "sport" | "supercar" | "hypercar";

export type PowerUnit =
  | "hp_mechanical"
  | "hp_metric"
  | "hp_electrical"
  | "hp_boiler"
  | "kilowatt"
  | "watt"
  | "btu_hr"
  | "ft_lbs_sec";

export interface DynoCurvePoint {
  rpm: number;
  horsepower: number;
  torque: number;
}

export interface AtmosphericConditions {
  enabled: boolean;
  tempF: number; // default 77 F (25 C)
  pressureInHg: number; // default 29.92 inHg (1013 mbar)
  humidityPercent: number; // default 0%
  turbocharged: boolean;
}

export interface HorsepowerResult {
  crankBHP: number;
  wheelWHP: number;
  kilowatts: number;
  metricPS: number;
  torqueLbFt: number;
  torqueNm: number;
  rpm: number;
  drivetrainLossPercent: number;
  // Power-to-weight
  hpPerTon: number;
  lbPerHp: number;
  wattsPerKg: number;
  performanceTier: PerformanceTier;
  performanceTierLabel: string;
  // Drag Strip & Accel Mode
  estimatedET: number;
  estimatedTrapSpeedMph: number;
  estimatedZeroToSixtySec: number;
  // SAE Correction
  saeCorrectionFactor: number;
  correctedBHP: number;
  // Unit Converter Mode
  convertedValue: number;
  convertedUnitName: string;
  // Dyno Curve Points
  dynoCurve: DynoCurvePoint[];
}
