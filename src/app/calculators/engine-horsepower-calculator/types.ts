export type EngineCalcMode = "et_mode" | "trap_speed" | "torque_rpm" | "displacement_boost";
export type DragModel = "fox" | "hale" | "hunt";
export type DrivetrainType = "fwd_manual" | "rwd_manual" | "rwd_auto" | "awd";
export type EnginePerformanceTier = "commuter" | "sport" | "track_day" | "supercar" | "pro_dragster";

export interface AtmosphericConditions {
  enabled: boolean;
  tempF: number;
  pressureInHg: number;
  humidityPercent: number;
}

export interface EngineHorsepowerResult {
  crankBHP: number;
  wheelWHP: number;
  kilowatts: number;
  metricPS: number;
  torqueLbFt: number;
  torqueNm: number;
  rpm: number;
  drivetrainLossPercent: number;
  // Payload & Weights
  curbWeightLbs: number;
  driverWeightLbs: number;
  totalWeightLbs: number;
  // Power-to-weight
  hpPerTon: number;
  lbPerHp: number;
  wattsPerKg: number;
  performanceTier: EnginePerformanceTier;
  performanceTierLabel: string;
  // Drag Strip & Accel Mode
  estimatedET: number;
  estimatedTrapSpeedMph: number;
  estimatedZeroToSixtySec: number;
  // Forced Induction (Boost)
  effectiveCompressionRatio: number;
  boostPsi: number;
  airflowCFM: number;
  // SAE Correction
  saeCorrectionFactor: number;
  correctedBHP: number;
  // Gauge Visual Angle (0 to 180 deg)
  gaugeAngle: number;
}
