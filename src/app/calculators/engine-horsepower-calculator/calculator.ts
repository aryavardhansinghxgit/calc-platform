import {
  EngineCalcMode,
  DragModel,
  DrivetrainType,
  EnginePerformanceTier,
  AtmosphericConditions,
  EngineHorsepowerResult,
} from "./types";

export function getDrivetrainLossPercent(drivetrain: DrivetrainType): number {
  switch (drivetrain) {
    case "fwd_manual":
      return 11;
    case "rwd_manual":
      return 14;
    case "rwd_auto":
      return 17.5;
    case "awd":
      return 22;
    default:
      return 15;
  }
}

export function calculateSAECorrectionFactor(cond: AtmosphericConditions): number {
  if (!cond.enabled) return 1.0;
  const pMbar = cond.pressureInHg * 33.8639;
  const tempC = ((cond.tempF - 32) * 5) / 9;

  const cf = 1.18 * (990 / pMbar) * Math.sqrt((tempC + 273.15) / 298.15) - 0.18;
  return parseFloat(Math.max(0.7, Math.min(1.4, cf)).toFixed(3));
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
  }
): EngineHorsepowerResult {
  const lossPercent = getDrivetrainLossPercent(drivetrain);
  const lossFactor = 1 - lossPercent / 100;
  const saeFactor = calculateSAECorrectionFactor(atmosphere);

  const totalWeightLbs = Math.max(500, curbWeightLbs + driverWeightLbs);

  let crankBHP = 0;
  let torqueLbFt = 0;
  let torqueNm = 0;
  let rpm = rpmInput;
  let airflowCFM = 0;

  if (mode === "et_mode") {
    const et = Math.max(6.0, quarterMileET);
    if (dragModel === "hale") {
      // Hale formula: HP = Weight / (ET / 5.825)^3
      crankBHP = totalWeightLbs / Math.pow(et / 5.825, 3);
    } else if (dragModel === "hunt") {
      // Hunt formula: HP = Weight * (228 / ET)^3
      crankBHP = totalWeightLbs * Math.pow(228 / et, 3);
    } else {
      // Fox formula: HP = Weight * (234 / ET)^3
      crankBHP = totalWeightLbs * Math.pow(234 / et, 3);
    }
    rpm = 6000;
    torqueLbFt = (crankBHP * 5252.11) / rpm;
    torqueNm = torqueLbFt * 1.355818;
  } else if (mode === "trap_speed") {
    const speed = Math.max(30, trapSpeedMph);
    if (dragModel === "hale") {
      crankBHP = totalWeightLbs * Math.pow(speed / 230, 3);
    } else if (dragModel === "hunt") {
      crankBHP = totalWeightLbs * Math.pow(speed / 228, 3);
    } else {
      // Fox formula: HP = Weight * (Speed / 234)^3
      crankBHP = totalWeightLbs * Math.pow(speed / 234, 3);
    }
    rpm = 6000;
    torqueLbFt = (crankBHP * 5252.11) / rpm;
    torqueNm = torqueLbFt * 1.355818;
  } else if (mode === "torque_rpm") {
    if (torqueUnit === "nm") {
      torqueNm = torqueInput;
      torqueLbFt = torqueInput / 1.355818;
    } else {
      torqueLbFt = torqueInput;
      torqueNm = torqueInput * 1.355818;
    }
    rpm = Math.max(100, rpmInput);
    crankBHP = (torqueLbFt * rpm) / 5252.11;
  } else if (mode === "displacement_boost") {
    const cid = displacementLiters * 61.0237;
    const boostMult = (boostPsi + 14.7) / 14.7;
    rpm = Math.max(1000, rpmInput || 6000);
    // CFM = (CID * RPM * VE% / 3456) * BoostMult
    airflowCFM = ((cid * rpm * (vePercent / 100)) / 3456) * boostMult;
    crankBHP = airflowCFM * 1.45; // ~1.45 to 1.5 HP per CFM
    torqueLbFt = (crankBHP * 5252.11) / rpm;
    torqueNm = torqueLbFt * 1.355818;
  }

  // Wheel Horsepower
  const wheelWHP = crankBHP * lossFactor;
  const kilowatts = crankBHP * 0.745699872;
  const metricPS = crankBHP * 1.0138697;
  const correctedBHP = crankBHP * saeFactor;

  // Effective Compression Ratio under boost: Effective CR = Static CR * sqrt((Boost + 14.7) / 14.7)
  const effectiveCompressionRatio = staticCompressionRatio * Math.sqrt((boostPsi + 14.7) / 14.7);

  // Power-to-weight metrics
  const weightTons = totalWeightLbs / 2000;
  const hpPerTon = weightTons > 0 ? crankBHP / weightTons : 0;
  const lbPerHp = crankBHP > 0 ? totalWeightLbs / crankBHP : 0;
  const wattsPerKg = totalWeightLbs > 0 ? (kilowatts * 1000) / (totalWeightLbs * 0.453592) : 0;

  const tierInfo = evaluateEngineTier(hpPerTon);

  // Estimated Drag Performance Metrics
  const estimatedET = crankBHP > 0 ? 5.825 * Math.cbrt(totalWeightLbs / crankBHP) : 0;
  const estimatedTrapSpeedMph = crankBHP > 0 ? 234 * Math.cbrt(crankBHP / totalWeightLbs) : 0;
  const estimatedZeroToSixtySec = wheelWHP > 0 ? 2.5 * Math.sqrt(totalWeightLbs / wheelWHP) : 0;

  // Semi-circle gauge angle (0 to 180 deg for 0 to 1000 HP)
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
    effectiveCompressionRatio: parseFloat(effectiveCompressionRatio.toFixed(2)),
    boostPsi,
    airflowCFM: Math.round(airflowCFM),
    saeCorrectionFactor: saeFactor,
    correctedBHP: Math.round(correctedBHP),
    gaugeAngle,
  };
}

export function calculateEngineHorsepowerFromInputs(inputs: Record<string, any>): EngineHorsepowerResult {
  const et = Number(inputs.quarterMileET || inputs.et || 12.0);
  const curbWeight = Number(inputs.curbWeightLbs || inputs.weight || 3500);
  const driverWeight = Number(inputs.driverWeightLbs || 180);

  return calculateEngineHorsepower("et_mode", "rwd_manual", "fox", et, 115, curbWeight, driverWeight);
}
