import {
  CalcMode,
  DragModel,
  DrivetrainType,
  PerformanceTier,
  PowerUnit,
  DynoCurvePoint,
  AtmosphericConditions,
  HorsepowerResult,
} from "./types";

export const MECHANICAL_HP_RPM_CONSTANT = 5252.113122; // 33,000 / (2 * PI)
export const METRIC_HP_CONSTANT = 7120.89; // 5252.113 * 1.355818

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

export function evaluatePerformanceTier(hpPerTon: number): {
  tier: PerformanceTier;
  label: string;
} {
  if (hpPerTon < 100) {
    return { tier: "economy", label: "Economy Commuter (<100 HP/ton)" };
  } else if (hpPerTon <= 250) {
    return { tier: "sport", label: "Sport Sedan / Performance Coupe (100–250 HP/ton)" };
  } else if (hpPerTon <= 500) {
    return { tier: "supercar", label: "Exotic Supercar (250–500 HP/ton)" };
  } else {
    return { tier: "hypercar", label: "Ultra Hypercar (500+ HP/ton)" };
  }
}

export function convertPowerToWatts(value: number, unit: PowerUnit): number {
  if (!Number.isFinite(value)) return 0;
  switch (unit) {
    case "hp_mechanical":
      return value * 745.699872;
    case "hp_metric":
      return value * 735.49875;
    case "hp_electrical":
      return value * 746.0;
    case "hp_boiler":
      return value * 9809.5;
    case "kilowatt":
      return value * 1000.0;
    case "watt":
      return value;
    case "btu_hr":
      return value * 0.293071;
    case "ft_lbs_sec":
      return value * 1.355817948;
    default:
      return value * 745.699872;
  }
}

export function convertWattsToPower(watts: number, unit: PowerUnit): number {
  if (!Number.isFinite(watts)) return 0;
  switch (unit) {
    case "hp_mechanical":
      return watts / 745.699872;
    case "hp_metric":
      return watts / 735.49875;
    case "hp_electrical":
      return watts / 746.0;
    case "hp_boiler":
      return watts / 9809.5;
    case "kilowatt":
      return watts / 1000.0;
    case "watt":
      return watts;
    case "btu_hr":
      return watts / 0.293071;
    case "ft_lbs_sec":
      return watts / 1.355817948;
    default:
      return watts / 745.699872;
  }
}

export function generateDynoCurve(
  peakHp: number,
  peakTorqueLbFt: number,
  targetRpm: number = 5252,
  redlineRpm: number = 8000
): DynoCurvePoint[] {
  const points: DynoCurvePoint[] = [];
  const step = 250;

  if (peakHp <= 0 && peakTorqueLbFt <= 0) {
    for (let rpm = 1000; rpm <= redlineRpm; rpm += step) {
      points.push({ rpm, horsepower: 0, torque: 0 });
    }
    return points;
  }

  // Center peak torque around targetRpm (between 2500 and 6500 RPM)
  const peakTorqueRpm = Math.max(2500, Math.min(6500, targetRpm > 0 ? targetRpm : 4500));

  for (let rpm = 1000; rpm <= redlineRpm; rpm += step) {
    // Dynamic Gaussian-based realistic engine torque curve
    const diff = (rpm - peakTorqueRpm) / 3200;
    const torqueMult = Math.max(0.35, Math.exp(-diff * diff));

    const torque = Math.max(0, Math.round(peakTorqueLbFt * torqueMult));
    // Horsepower = (Torque * RPM) / MECHANICAL_HP_RPM_CONSTANT
    const horsepower = Math.max(0, Math.round((torque * rpm) / MECHANICAL_HP_RPM_CONSTANT));

    points.push({ rpm, horsepower, torque });
  }

  return points;
}

export function calculateHorsepower(
  mode: CalcMode = "torque_rpm",
  drivetrain: DrivetrainType = "rwd_manual",
  dragModel: DragModel = "fox",
  // Mode 1 inputs
  torqueInput: number = 400, // lb-ft or N-m
  torqueUnit: "lbft" | "nm" = "lbft",
  rpmInput: number = 5252,
  // Mode 2 inputs (Drag strip)
  vehicleWeightLbs: number = 3500,
  quarterMileET: number = 12.0, // seconds
  trapSpeedMph: number = 115, // mph
  useETMethod: boolean = true,
  // Mode 3 inputs (0-60 Acceleration)
  targetZeroToSixtySec: number = 4.5,
  cd: number = 0.32,
  frontalAreaSqFt: number = 22.0,
  // Mode 4 Converter inputs
  fromValue: number = 300,
  fromUnit: PowerUnit = "hp_mechanical",
  toUnit: PowerUnit = "kilowatt",
  // Atmospheric
  atmosphere: AtmosphericConditions = {
    enabled: false,
    tempF: 77,
    pressureInHg: 29.92,
    humidityPercent: 0,
    turbocharged: false,
  }
): HorsepowerResult {
  const lossPercent = getDrivetrainLossPercent(drivetrain);
  const lossFactor = 1 - lossPercent / 100;
  const saeFactor = calculateSAECorrectionFactor(atmosphere);

  // Validate inputs
  let isValid = true;
  let errorMessage: string | undefined = undefined;

  // Check general inputs
  if (
    !Number.isFinite(vehicleWeightLbs) ||
    vehicleWeightLbs < 0
  ) {
    isValid = false;
    errorMessage = "Vehicle weight must be a positive number.";
  }

  let crankBHP = 0;
  let torqueLbFt = 0;
  let torqueNm = 0;
  let rpm = rpmInput;

  if (mode === "torque_rpm") {
    if (!Number.isFinite(torqueInput) || !Number.isFinite(rpmInput)) {
      isValid = false;
      errorMessage = "Please enter valid numeric values for Torque and RPM.";
    } else if (torqueInput < 0 || rpmInput < 0) {
      isValid = false;
      errorMessage = "Torque and RPM cannot be negative.";
    } else if (torqueInput === 0 || rpmInput === 0) {
      // Explicit 0 handling
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
  } else if (mode === "drag_strip") {
    const weight = vehicleWeightLbs;
    if (useETMethod) {
      if (!Number.isFinite(quarterMileET)) {
        isValid = false;
        errorMessage = "Please enter a valid quarter-mile elapsed time.";
      } else if (quarterMileET < 0) {
        isValid = false;
        errorMessage = "Elapsed time cannot be negative.";
      } else if (quarterMileET === 0) {
        isValid = false;
        errorMessage = "Elapsed time must be greater than zero.";
      } else if (weight <= 0) {
        isValid = false;
        errorMessage = "Vehicle weight must be greater than zero.";
      } else {
        const et = quarterMileET;
        // Empirical Drag ET Formulas:
        // Hale model: HP = Weight / (ET / 5.825)^3
        // Fox model: HP = Weight / (ET / 5.71)^3  (gives 377 HP for 3500 lb / 12 sec)
        // Hunt model: HP = Weight / (ET / 6.269)^3
        if (dragModel === "hale") {
          crankBHP = weight / Math.pow(et / 5.825, 3);
        } else if (dragModel === "hunt") {
          crankBHP = weight / Math.pow(et / 6.269, 3);
        } else {
          // Fox model ET formula
          crankBHP = weight / Math.pow(et / 5.71, 3);
        }
      }
    } else {
      if (!Number.isFinite(trapSpeedMph)) {
        isValid = false;
        errorMessage = "Please enter a valid trap speed.";
      } else if (trapSpeedMph < 0) {
        isValid = false;
        errorMessage = "Trap speed cannot be negative.";
      } else if (trapSpeedMph === 0) {
        crankBHP = 0;
      } else if (weight <= 0) {
        isValid = false;
        errorMessage = "Vehicle weight must be greater than zero.";
      } else {
        const speed = trapSpeedMph;
        // Trap speed formulas:
        // Fox: HP = Weight * (Speed / 234)^3
        // Hunt: HP = Weight * (Speed / 224)^3
        // Hale: HP = Weight * (Speed / 230)^3
        if (dragModel === "fox") {
          crankBHP = weight * Math.pow(speed / 234, 3);
        } else if (dragModel === "hunt") {
          crankBHP = weight * Math.pow(speed / 224, 3);
        } else {
          crankBHP = weight * Math.pow(speed / 230, 3);
        }
      }
    }
    rpm = 6000;
    torqueLbFt = crankBHP > 0 ? (crankBHP * MECHANICAL_HP_RPM_CONSTANT) / rpm : 0;
    torqueNm = torqueLbFt * 1.355817948;
  } else if (mode === "acceleration") {
    if (!Number.isFinite(targetZeroToSixtySec)) {
      isValid = false;
      errorMessage = "Please enter a valid 0–60 sprint time.";
    } else if (targetZeroToSixtySec < 0) {
      isValid = false;
      errorMessage = "Sprint time cannot be negative.";
    } else if (targetZeroToSixtySec === 0) {
      isValid = false;
      errorMessage = "Sprint time must be greater than zero.";
    } else if (vehicleWeightLbs <= 0) {
      isValid = false;
      errorMessage = "Vehicle weight must be greater than zero.";
    } else {
      const weight = vehicleWeightLbs;
      const targetSec = targetZeroToSixtySec;
      // Empirical required WHP for 0-60 sprint time: WHP ~ Weight * (2.5 / TargetSec)^2
      const reqWHP = weight * Math.pow(2.5 / targetSec, 2);
      crankBHP = reqWHP / Math.max(0.1, lossFactor);
      rpm = 6000;
      torqueLbFt = (crankBHP * MECHANICAL_HP_RPM_CONSTANT) / rpm;
      torqueNm = torqueLbFt * 1.355817948;
    }
  } else if (mode === "unit_converter") {
    if (!Number.isFinite(fromValue)) {
      isValid = false;
      errorMessage = "Please enter a valid number to convert.";
    } else if (fromValue < 0) {
      isValid = false;
      errorMessage = "Power value cannot be negative.";
    } else {
      const watts = convertPowerToWatts(fromValue, fromUnit);
      const mechanicalHp = convertWattsToPower(watts, "hp_mechanical");
      crankBHP = mechanicalHp;
      rpm = 5252;
      torqueLbFt = crankBHP;
      torqueNm = torqueLbFt * 1.355817948;
    }
  }

  // If invalid, zero out calculated values safely
  if (!isValid) {
    crankBHP = 0;
    torqueLbFt = 0;
    torqueNm = 0;
  }

  // Wheel Horsepower
  const wheelWHP = crankBHP * lossFactor;
  const kilowatts = crankBHP * 0.745699872;
  const metricPS = crankBHP * (745.699872 / 735.49875); // ~1.0138697
  const correctedBHP = crankBHP * saeFactor;

  // Power-to-weight metrics (US short ton = 2000 lbs)
  const weightTons = vehicleWeightLbs > 0 ? vehicleWeightLbs / 2000 : 0;
  const hpPerTon = weightTons > 0 && crankBHP > 0 ? crankBHP / weightTons : 0;
  const lbPerHp = crankBHP > 0 && vehicleWeightLbs > 0 ? vehicleWeightLbs / crankBHP : 0;
  const wattsPerKg =
    vehicleWeightLbs > 0 && crankBHP > 0
      ? (kilowatts * 1000) / (vehicleWeightLbs * 0.45359237)
      : 0;

  const tierInfo = evaluatePerformanceTier(hpPerTon);

  // Drag strip estimation outputs (using Hale's ET constant 5.825 and Fox's trap speed constant 234)
  const estimatedET =
    crankBHP > 0 && vehicleWeightLbs > 0
      ? 5.825 * Math.cbrt(vehicleWeightLbs / crankBHP)
      : 0;
  const estimatedTrapSpeedMph =
    crankBHP > 0 && vehicleWeightLbs > 0
      ? 234 * Math.cbrt(crankBHP / vehicleWeightLbs)
      : 0;
  const estimatedZeroToSixtySec =
    wheelWHP > 0 && vehicleWeightLbs > 0
      ? 2.5 * Math.sqrt(vehicleWeightLbs / wheelWHP)
      : 0;

  // Unit Converter mode output
  let convertedVal = 0;
  let convertedName = "";
  if (mode === "unit_converter" && isValid) {
    const watts = convertPowerToWatts(fromValue, fromUnit);
    convertedVal = convertWattsToPower(watts, toUnit);

    switch (toUnit) {
      case "hp_mechanical":
        convertedName = "Mechanical HP (hp)";
        break;
      case "hp_metric":
        convertedName = "Metric HP (PS / CV)";
        break;
      case "hp_electrical":
        convertedName = "Electrical HP (hp(E))";
        break;
      case "hp_boiler":
        convertedName = "Boiler HP (hp(S))";
        break;
      case "kilowatt":
        convertedName = "Kilowatts (kW)";
        break;
      case "watt":
        convertedName = "Watts (W)";
        break;
      case "btu_hr":
        convertedName = "BTU / Hour";
        break;
      case "ft_lbs_sec":
        convertedName = "ft-lb / sec";
        break;
    }
  }

  // Generate Dyno Curve Data Points
  const dynoCurve = generateDynoCurve(
    Math.round(crankBHP),
    Math.round(torqueLbFt),
    Math.round(rpm)
  );

  return {
    crankBHP: Math.round(crankBHP),
    wheelWHP: Math.round(wheelWHP),
    kilowatts: parseFloat(kilowatts.toFixed(1)),
    metricPS: Math.round(metricPS),
    torqueLbFt: Math.round(torqueLbFt),
    torqueNm: Math.round(torqueNm),
    rpm: Math.round(rpm),
    drivetrainLossPercent: lossPercent,
    hpPerTon: Math.round(hpPerTon),
    lbPerHp: parseFloat(lbPerHp.toFixed(2)),
    wattsPerKg: parseFloat(wattsPerKg.toFixed(1)),
    performanceTier: tierInfo.tier,
    performanceTierLabel: tierInfo.label,
    estimatedET: parseFloat(estimatedET.toFixed(2)),
    estimatedTrapSpeedMph: Math.round(estimatedTrapSpeedMph),
    estimatedZeroToSixtySec: parseFloat(estimatedZeroToSixtySec.toFixed(2)),
    saeCorrectionFactor: saeFactor,
    correctedBHP: Math.round(correctedBHP),
    convertedValue: parseFloat(convertedVal.toFixed(2)),
    convertedUnitName: convertedName,
    dynoCurve,
    isValid,
    errorMessage,
  };
}

export function calculateHorsepowerFromInputs(inputs: Record<string, any>): HorsepowerResult {
  const torque = Number(inputs.torque ?? inputs.torqueLbFt ?? 400);
  const rpm = Number(inputs.rpm ?? 5252);
  const weight = Number(inputs.weight ?? inputs.vehicleWeightLbs ?? 3500);

  return calculateHorsepower("torque_rpm", "rwd_manual", "fox", torque, "lbft", rpm, weight);
}
