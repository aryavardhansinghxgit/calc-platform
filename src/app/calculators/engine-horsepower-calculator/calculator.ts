import {
  EngineCalcMode,
  DragModel,
  DrivetrainType,
  EnginePerformanceTier,
  AtmosphericConditions,
  EngineHorsepowerResult,
} from "./types";

export const MECHANICAL_HP_RPM_CONSTANT = 5252.113122; // 33,000 / (2 * PI)
export const METRIC_HP_CONSTANT = 7120.89;

export function getDrivetrainLossPercent(drivetrain: DrivetrainType): number {
  switch (drivetrain) {
    case "fwd_manual":
      return 11; // 11%
    case "rwd_manual":
      return 14; // 14%
    case "rwd_auto":
      return 17.5; // 17.5%
    case "awd":
      return 22; // 22%
    default:
      return 14;
  }
}

export function calculateSAECorrectionFactor(cond: AtmosphericConditions): number {
  if (!cond || !cond.enabled) return 1.0;
  if (!Number.isFinite(cond.tempF) || !Number.isFinite(cond.pressureInHg) || cond.pressureInHg <= 0) {
    return 1.0;
  }

  const tempC = ((cond.tempF - 32) * 5) / 9;
  const tempK = tempC + 273.15;
  if (tempK <= 0) return 1.0;

  // SAE J1349 standard formula normalized to reference 77°F (298.15 K) & 29.92 inHg
  const cf = 1.18 * (29.92 / cond.pressureInHg) * Math.sqrt(tempK / 298.15) - 0.18;
  return parseFloat(Math.max(0.5, Math.min(1.8, cf)).toFixed(3));
}

export function evaluateEngineTier(hpPerTon: number): {
  tier: EnginePerformanceTier;
  label: string;
} {
  if (hpPerTon < 100) {
    return { tier: "commuter", label: "Commuter Tier (<100 HP/ton)" };
  } else if (hpPerTon <= 220) {
    return { tier: "sport", label: "Sport Tier (100–220 HP/ton)" };
  } else if (hpPerTon <= 380) {
    return { tier: "track_day", label: "Track Day Spec (220–380 HP/ton)" };
  } else if (hpPerTon <= 650) {
    return { tier: "supercar", label: "Supercar Tier (380–650 HP/ton)" };
  } else {
    return { tier: "pro_dragster", label: "Pro Dragster (650+ HP/ton)" };
  }
}

export function calculateEngineHorsepower(
  mode: EngineCalcMode = "et_mode",
  drivetrain: DrivetrainType = "rwd_manual",
  dragModel: DragModel = "fox",
  // Mode 1: ET Mode
  quarterMileET: number = 12.0,
  // Mode 2: Trap Speed Mode
  trapSpeedMph: number = 115,
  // Weights (Mode 1 & 2)
  curbWeightLbs: number = 3500,
  driverWeightLbs: number = 180,
  // Mode 3: Torque & RPM Mode
  torqueInput: number = 400,
  torqueUnit: "lbft" | "nm" = "lbft",
  rpmInput: number = 5252,
  // Mode 4: Displacement & Boost Mode
  displacementLiters: number = 5.0,
  boostPsi: number = 10,
  vePercent: number = 85,
  staticCompressionRatio: number = 9.5,
  // Atmospheric Conditions
  atmosphere: AtmosphericConditions = {
    enabled: false,
    tempF: 77,
    pressureInHg: 29.92,
    humidityPercent: 0,
  },
  // Mode 5: 0-60 Time
  targetZeroToSixtySec: number = 4.2
): EngineHorsepowerResult {
  const lossPercent = getDrivetrainLossPercent(drivetrain);
  const lossFactor = 1 - lossPercent / 100;
  const saeFactor = calculateSAECorrectionFactor(atmosphere);

  let isValid = true;
  let errorMessage: string | undefined = undefined;

  // Weight validation
  if (!Number.isFinite(curbWeightLbs) || curbWeightLbs < 0 || !Number.isFinite(driverWeightLbs) || driverWeightLbs < 0) {
    isValid = false;
    errorMessage = "Vehicle curb weight and driver payload must be non-negative numbers.";
  }

  const totalWeightLbs = (Number.isFinite(curbWeightLbs) ? curbWeightLbs : 0) + (Number.isFinite(driverWeightLbs) ? driverWeightLbs : 0);

  let crankBHP = 0;
  let torqueLbFt = 0;
  let torqueNm = 0;
  let rpm = rpmInput;
  let airflowCFM = 0;
  let effectiveCR = staticCompressionRatio;

  if (mode === "et_mode") {
    if (!Number.isFinite(quarterMileET)) {
      isValid = false;
      errorMessage = "Please enter a valid quarter-mile elapsed time.";
    } else if (quarterMileET < 0) {
      isValid = false;
      errorMessage = "Elapsed time cannot be negative.";
    } else if (quarterMileET === 0) {
      isValid = false;
      errorMessage = "Elapsed time must be greater than zero.";
    } else if (totalWeightLbs <= 0) {
      isValid = false;
      errorMessage = "Total vehicle weight must be greater than zero.";
    } else {
      const et = quarterMileET;
      // Empirical Quarter-Mile Elapsed Time Formulas:
      // Hale model: HP = Weight / (ET / 5.825)^3
      // Fox model: HP = Weight / (ET / 5.71)^3
      // Hunt model: HP = Weight / (ET / 6.269)^3
      if (dragModel === "hale") {
        crankBHP = totalWeightLbs / Math.pow(et / 5.825, 3);
      } else if (dragModel === "hunt") {
        crankBHP = totalWeightLbs / Math.pow(et / 6.269, 3);
      } else {
        // Fox formula
        crankBHP = totalWeightLbs / Math.pow(et / 5.71, 3);
      }
      rpm = 6000;
      torqueLbFt = (crankBHP * MECHANICAL_HP_RPM_CONSTANT) / rpm;
      torqueNm = torqueLbFt * 1.355817948;
    }
  } else if (mode === "trap_speed") {
    if (!Number.isFinite(trapSpeedMph)) {
      isValid = false;
      errorMessage = "Please enter a valid finish line trap speed.";
    } else if (trapSpeedMph < 0) {
      isValid = false;
      errorMessage = "Trap speed cannot be negative.";
    } else if (trapSpeedMph === 0) {
      crankBHP = 0;
      rpm = 6000;
      torqueLbFt = 0;
      torqueNm = 0;
    } else if (totalWeightLbs <= 0) {
      isValid = false;
      errorMessage = "Total vehicle weight must be greater than zero.";
    } else {
      const speed = trapSpeedMph;
      // Trap Speed Formulas:
      // Fox: HP = Weight * (Speed / 234)^3
      // Hale: HP = Weight * (Speed / 230)^3
      // Hunt: HP = Weight * (Speed / 224)^3
      if (dragModel === "hale") {
        crankBHP = totalWeightLbs * Math.pow(speed / 230, 3);
      } else if (dragModel === "hunt") {
        crankBHP = totalWeightLbs * Math.pow(speed / 224, 3);
      } else {
        // Fox formula
        crankBHP = totalWeightLbs * Math.pow(speed / 234, 3);
      }
      rpm = 6000;
      torqueLbFt = (crankBHP * MECHANICAL_HP_RPM_CONSTANT) / rpm;
      torqueNm = torqueLbFt * 1.355817948;
    }
  } else if (mode === "torque_rpm") {
    if (!Number.isFinite(torqueInput) || !Number.isFinite(rpmInput)) {
      isValid = false;
      errorMessage = "Please enter valid numeric values for Torque and RPM.";
    } else if (torqueInput < 0 || rpmInput < 0) {
      isValid = false;
      errorMessage = "Torque and RPM cannot be negative.";
    } else if (torqueInput === 0 || rpmInput === 0) {
      crankBHP = 0;
      rpm = rpmInput;
      torqueLbFt = torqueUnit === "nm" ? 0 : torqueInput;
      torqueNm = torqueUnit === "nm" ? torqueInput : 0;
    } else {
      if (torqueUnit === "nm") {
        torqueNm = torqueInput;
        torqueLbFt = torqueInput / 1.355817948;
      } else {
        torqueLbFt = torqueInput;
        torqueNm = torqueInput * 1.355817948;
      }
      rpm = rpmInput;
      // HP = (Torque lb-ft * RPM) / 5252.113122
      crankBHP = (torqueLbFt * rpm) / MECHANICAL_HP_RPM_CONSTANT;
    }
  } else if (mode === "zero_to_sixty") {
    if (!Number.isFinite(targetZeroToSixtySec)) {
      isValid = false;
      errorMessage = "Please enter a valid 0–60 sprint time.";
    } else if (targetZeroToSixtySec < 0) {
      isValid = false;
      errorMessage = "Sprint time cannot be negative.";
    } else if (targetZeroToSixtySec === 0) {
      isValid = false;
      errorMessage = "Sprint time must be greater than zero.";
    } else if (totalWeightLbs <= 0) {
      isValid = false;
      errorMessage = "Total vehicle weight must be greater than zero.";
    } else {
      const weight = totalWeightLbs;
      const targetSec = targetZeroToSixtySec;
      // Required WHP ~ Weight * (2.5 / TargetSec)^2
      const reqWHP = weight * Math.pow(2.5 / targetSec, 2);
      crankBHP = reqWHP / Math.max(0.1, lossFactor);
      rpm = 6000;
      torqueLbFt = (crankBHP * MECHANICAL_HP_RPM_CONSTANT) / rpm;
      torqueNm = torqueLbFt * 1.355817948;
    }
  } else if (mode === "displacement_boost") {
    if (
      !Number.isFinite(displacementLiters) ||
      displacementLiters < 0 ||
      !Number.isFinite(boostPsi) ||
      boostPsi < 0 ||
      !Number.isFinite(vePercent) ||
      vePercent < 0 ||
      !Number.isFinite(staticCompressionRatio) ||
      staticCompressionRatio < 0
    ) {
      isValid = false;
      errorMessage = "Forced induction parameters must be non-negative numbers.";
    } else if (displacementLiters === 0 || vePercent === 0 || staticCompressionRatio === 0) {
      crankBHP = 0;
      torqueLbFt = 0;
      torqueNm = 0;
      airflowCFM = 0;
      effectiveCR = staticCompressionRatio;
    } else {
      const cid = displacementLiters * 61.023744;
      const boostMult = (boostPsi + 14.7) / 14.7;
      rpm = rpmInput > 0 ? rpmInput : 5252;
      // Airflow CFM = (CID * RPM * VE% / 3456) * BoostMult
      airflowCFM = ((cid * rpm * (vePercent / 100)) / 3456) * boostMult;
      crankBHP = airflowCFM * 1.45; // ~1.45 HP per CFM of inducted air
      torqueLbFt = (crankBHP * MECHANICAL_HP_RPM_CONSTANT) / rpm;
      torqueNm = torqueLbFt * 1.355817948;
      // Effective Compression Ratio under boost: Effective CR = Static CR * sqrt((Boost + 14.7) / 14.7)
      effectiveCR = staticCompressionRatio * Math.sqrt((boostPsi + 14.7) / 14.7);
    }
  }

  // If invalid, zero out calculated values safely
  if (!isValid) {
    crankBHP = 0;
    torqueLbFt = 0;
    torqueNm = 0;
    airflowCFM = 0;
  }

  // Wheel Horsepower
  const wheelWHP = crankBHP * lossFactor;
  const kilowatts = crankBHP * 0.745699872;
  const metricPS = crankBHP * (745.699872 / 735.49875);
  const correctedBHP = crankBHP * saeFactor;

  // Power-to-weight metrics (US short ton = 2000 lbs)
  const weightTons = totalWeightLbs > 0 ? totalWeightLbs / 2000 : 0;
  const hpPerTon = weightTons > 0 && crankBHP > 0 ? crankBHP / weightTons : 0;
  const lbPerHp = crankBHP > 0 && totalWeightLbs > 0 ? totalWeightLbs / crankBHP : 0;
  const wattsPerKg =
    totalWeightLbs > 0 && crankBHP > 0
      ? (kilowatts * 1000) / (totalWeightLbs * 0.45359237)
      : 0;

  const tierInfo = evaluateEngineTier(hpPerTon);

  // Estimated Drag Performance Metrics
  const estimatedET =
    crankBHP > 0 && totalWeightLbs > 0
      ? 5.825 * Math.cbrt(totalWeightLbs / crankBHP)
      : 0;
  const estimatedTrapSpeedMph =
    crankBHP > 0 && totalWeightLbs > 0
      ? 234 * Math.cbrt(crankBHP / totalWeightLbs)
      : 0;
  const estimatedZeroToSixtySec =
    wheelWHP > 0 && totalWeightLbs > 0
      ? 2.5 * Math.sqrt(totalWeightLbs / wheelWHP)
      : 0;

  // Semi-circle gauge angle (0 to 180 deg for 0 to 1000+ HP)
  const gaugeAngle = Math.min(180, Math.max(0, (crankBHP / 1000) * 180));

  return {
    crankBHP: Math.round(crankBHP),
    wheelWHP: Math.round(wheelWHP),
    kilowatts: parseFloat(kilowatts.toFixed(1)),
    metricPS: Math.round(metricPS),
    torqueLbFt: Math.round(torqueLbFt),
    torqueNm: Math.round(torqueNm),
    rpm: Math.round(rpm),
    drivetrainLossPercent: lossPercent,
    curbWeightLbs,
    driverWeightLbs,
    totalWeightLbs,
    hpPerTon: Math.round(hpPerTon),
    lbPerHp: parseFloat(lbPerHp.toFixed(2)),
    wattsPerKg: parseFloat(wattsPerKg.toFixed(1)),
    performanceTier: tierInfo.tier,
    performanceTierLabel: tierInfo.label,
    estimatedET: parseFloat(estimatedET.toFixed(2)),
    estimatedTrapSpeedMph: Math.round(estimatedTrapSpeedMph),
    estimatedZeroToSixtySec: parseFloat(estimatedZeroToSixtySec.toFixed(2)),
    effectiveCompressionRatio: parseFloat(effectiveCR.toFixed(2)),
    boostPsi: Number.isFinite(boostPsi) ? boostPsi : 0,
    airflowCFM: Math.round(airflowCFM),
    saeCorrectionFactor: saeFactor,
    correctedBHP: Math.round(correctedBHP),
    gaugeAngle,
    isValid,
    errorMessage,
  };
}

export function calculateEngineHorsepowerFromInputs(inputs: Record<string, any>): EngineHorsepowerResult {
  const et = Number(inputs.quarterMileET ?? inputs.et ?? 12.0);
  const curbWeight = Number(inputs.curbWeightLbs ?? inputs.weight ?? 3500);
  const driverWeight = Number(inputs.driverWeightLbs ?? 180);

  return calculateEngineHorsepower("et_mode", "rwd_manual", "fox", et, 115, curbWeight, driverWeight);
}
